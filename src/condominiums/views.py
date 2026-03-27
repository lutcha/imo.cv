"""
API ViewSets para Gestão de Condomínios.
Isolamento por tenant (schema); IsAuthenticated.
"""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.core.cache import cache
from datetime import datetime, time
import urllib.request
import json as _json

from .models import Condominium, Unit, Fee, MaintenanceRequest, Notice, CommonArea, Reservation, Assembly, AssemblyTopic, AssemblyVote
from .permissions import IsCondominiumManagerOrAdmin, IsCondominiumManagerOrAdminAction
from .serializers import (
    CondominiumSerializer,
    UnitSerializer,
    FeeSerializer,
    MaintenanceRequestSerializer,
    NoticeSerializer,
    CommonAreaSerializer,
    ReservationSerializer,
    AssemblySerializer,
    AssemblyTopicSerializer,
    AssemblyVoteSerializer,
)


class CondominiumNestedMixin:
    """
    Mixin para ViewSets aninhados sob /<condominium_pk>/.
    Injeta automaticamente o condominium nos dados de criação antes da
    validação do serializer, evitando o erro "Este campo é obrigatório."
    """
    def _get_condominium_from_url(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True,
        )

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['condominium'] = str(self._get_condominium_from_url().id)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CondominiumViewSet(viewsets.ModelViewSet):
    """CRUD de condomínios (tenant-scoped via schema)."""
    queryset = Condominium.objects.all()
    serializer_class = CondominiumSerializer
    permission_classes = [IsCondominiumManagerOrAdmin]
    lookup_url_kwarg = 'pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_queryset(self):
        return Condominium.objects.filter(is_active=True)

    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        """
        GET /api/condominiums/{pk}/analytics/
        KPIs + chart data para o dashboard do síndico.
        """
        from django.db.models import Count, Sum, Q
        from datetime import date
        from .models import Unit, Fee, MaintenanceRequest, CommonArea, Reservation

        condo = self.get_object()
        today = date.today()

        # ── Payment rate by month (last 6 months) ──────────────────────────
        monthly_payments = []
        for i in range(5, -1, -1):
            month_offset = today.month - i - 1
            year_offset = today.year + (month_offset // 12)
            month = month_offset % 12 + 1
            if month == 0:
                month = 12
                year_offset -= 1
            period = f'{year_offset}-{month:02d}'
            fees_q = Fee.objects.filter(condominium=condo, period=period)
            total = fees_q.count()
            paid = fees_q.filter(status='PAID').count()
            rate = round(paid / total * 100) if total else 0
            monthly_payments.append({
                'period': period,
                'paid': paid,
                'pending': fees_q.filter(status='PENDING').count(),
                'overdue': fees_q.filter(status='OVERDUE').count(),
                'total': total,
                'rate': rate,
            })

        # ── Current month summary ───────────────────────────────────────────
        current_period = f'{today.year}-{today.month:02d}'
        current_fees = Fee.objects.filter(condominium=condo, period=current_period)
        paid_count = current_fees.filter(status='PAID').count()
        total_count = current_fees.count()
        paid_amount = current_fees.filter(status='PAID').aggregate(
            total=Sum('amount')
        )['total'] or 0
        expected_amount = current_fees.aggregate(total=Sum('amount'))['total'] or 0

        # ── Fee status distribution (all time) ─────────────────────────────
        fee_distribution = list(
            Fee.objects.filter(condominium=condo)
            .values('status')
            .annotate(count=Count('id'))
        )

        # ── Maintenance by priority ─────────────────────────────────────────
        maintenance_by_priority = list(
            MaintenanceRequest.objects.filter(condominium=condo)
            .values('priority')
            .annotate(count=Count('id'))
            .order_by('priority')
        )

        open_this_month = MaintenanceRequest.objects.filter(
            condominium=condo,
            status='OPEN',
            created_at__year=today.year,
            created_at__month=today.month,
        ).count()
        resolved_this_month = MaintenanceRequest.objects.filter(
            condominium=condo,
            status='RESOLVED',
            resolved_at__year=today.year,
            resolved_at__month=today.month,
        ).count()

        # ── Common area occupancy (last 30 days) ────────────────────────────
        from datetime import timedelta
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        area_occupancy = []
        for area in CommonArea.objects.filter(condominium=condo, is_active=True):
            confirmed = Reservation.objects.filter(
                common_area=area,
                status__in=['CONFIRMED', 'COMPLETED'],
                start_datetime__gte=thirty_days_ago,
            ).count()
            # Possible slots: 14 h/day × 30 days
            possible = 14 * 30
            area_occupancy.append({
                'name': area.name,
                'confirmed': confirmed,
                'occupancy_pct': round(confirmed / possible * 100, 1),
            })

        # Sort by most reserved
        area_occupancy.sort(key=lambda x: x['confirmed'], reverse=True)

        return Response({
            'kpis': {
                'payment_rate_current': round(paid_count / total_count * 100) if total_count else 0,
                'paid_amount_cve': float(paid_amount),
                'expected_amount_cve': float(expected_amount),
                'open_maintenance': open_this_month,
                'resolved_maintenance': resolved_this_month,
                'top_area': area_occupancy[0]['name'] if area_occupancy else None,
            },
            'monthly_payments': monthly_payments,
            'fee_distribution': fee_distribution,
            'maintenance_by_priority': maintenance_by_priority,
            'area_occupancy': area_occupancy,
        })


class UnitViewSet(CondominiumNestedMixin, viewsets.ModelViewSet):
    """CRUD de unidades; filtrado por condominium_id na URL."""
    serializer_class = UnitSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'unit_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return Unit.objects.filter(condominium_id=self.kwargs['condominium_pk'])

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())


class FeeViewSet(CondominiumNestedMixin, viewsets.ModelViewSet):
    """CRUD de quotas; filtrado por condominium_id na URL."""
    serializer_class = FeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'fee_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        qs = Fee.objects.filter(condominium_id=self.kwargs['condominium_pk'])
        period = self.request.query_params.get('period')
        if period:
            qs = qs.filter(period=period)
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        unit_id = self.request.query_params.get('unit')
        if unit_id:
            qs = qs.filter(unit_id=unit_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())


class MaintenanceRequestViewSet(CondominiumNestedMixin, viewsets.ModelViewSet):
    """CRUD de pedidos de manutenção; filtrado por condominium_id na URL."""
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'request_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return MaintenanceRequest.objects.filter(
            condominium_id=self.kwargs['condominium_pk']
        )

    def perform_create(self, serializer):
        serializer.save(
            condominium=self.get_condominium(),
            reported_by=self.request.user
        )


class NoticeViewSet(CondominiumNestedMixin, viewsets.ModelViewSet):
    """CRUD de avisos; filtrado por condominium_id na URL."""
    serializer_class = NoticeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'notice_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return Notice.objects.filter(
            condominium_id=self.kwargs['condominium_pk']
        )

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())

    @action(detail=True, methods=['post'], url_path='send-whatsapp')
    def send_whatsapp(self, request, condominium_pk=None, notice_pk=None):
        """
        POST /api/condominiums/{pk}/notices/{notice_pk}/send-whatsapp/
        Envia o aviso via WhatsApp para todos os proprietários com telefone.
        """
        notice = self.get_object()
        from .models import Unit
        from .notifications import WhatsAppNotificationService

        units = Unit.objects.filter(
            condominium_id=condominium_pk,
            owner_phone__isnull=False,
        ).exclude(owner_phone='')

        sent, failed = 0, 0
        for unit in units:
            try:
                ok = WhatsAppNotificationService.send_notice(
                    notice,
                    recipient_phone=unit.owner_phone,
                    recipient_name=unit.owner_name or 'Proprietário',
                )
                if ok:
                    sent += 1
                else:
                    failed += 1
            except Exception:
                failed += 1

        return Response({'sent': sent, 'failed': failed, 'total': units.count()})


# =============================================================================
# Sprint 2-A: ViewSets para Reservas de Espaços Comuns
# =============================================================================

class CommonAreaViewSet(CondominiumNestedMixin, viewsets.ModelViewSet):
    """CRUD de áreas comuns; filtrado por condominium_id na URL."""
    serializer_class = CommonAreaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return CommonArea.objects.filter(
            condominium_id=self.kwargs['condominium_pk'],
            is_active=True
        )

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())

    @action(detail=True, methods=['get'])
    def availability(self, request, condominium_pk=None, pk=None):
        """
        Retorna slots de disponibilidade para uma área num determinado dia.
        Query params: date=YYYY-MM-DD
        """
        date_str = request.query_params.get('date')
        if not date_str:
            return Response(
                {'error': 'Parâmetro date é obrigatório (YYYY-MM-DD)'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {'error': 'Formato de data inválido. Use YYYY-MM-DD'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        common_area = self.get_object()
        
        # Reservas existentes para este dia
        reservations = Reservation.objects.filter(
            common_area=common_area,
            status__in=['PENDING', 'CONFIRMED'],
            start_datetime__date=target_date,
        ).order_by('start_datetime')
        
        # Slots ocupados
        occupied_slots = [
            {
                'id': res.id,
                'start': res.start_datetime.isoformat(),
                'end': res.end_datetime.isoformat(),
                'status': res.status,
                'resident_name': res.resident_name,
            }
            for res in reservations
        ]
        
        # Slots livres (simplificado: 8h-22h, slots de 1h)
        free_slots = []
        for hour in range(8, 22):
            slot_start = datetime.combine(target_date, time(hour, 0, 0))
            slot_end = datetime.combine(target_date, time(hour + 1, 0, 0))
            
            # Verificar se este slot está ocupado
            is_occupied = any(
                res['start'] <= slot_start.isoformat() and res['end'] > slot_start.isoformat()
                for res in occupied_slots
            )
            
            if not is_occupied:
                free_slots.append({
                    'start': slot_start.isoformat(),
                    'end': slot_end.isoformat(),
                })
        
        return Response({
            'date': date_str,
            'common_area': common_area.name,
            'free_slots': free_slots,
            'occupied_slots': occupied_slots,
        })


class ReservationViewSet(viewsets.ModelViewSet):
    """CRUD de reservas; filtrado por condominium_id e common_area_id na URL."""
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'reservation_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_common_area(self):
        return get_object_or_404(
            CommonArea,
            pk=self.kwargs['common_area_pk'],
            condominium_id=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return Reservation.objects.filter(
            common_area_id=self.kwargs['common_area_pk']
        )

    def perform_create(self, serializer):
        serializer.save(common_area=self.get_common_area())


# =============================================================================
# Exchange Rates  (GET /api/condominiums/exchange-rates/)
# =============================================================================

_FALLBACK_RATES = {'EUR': 0.00906, 'USD': 0.00982}
_CACHE_KEY = 'cve_exchange_rates'
_CACHE_TTL = 3600  # 1 hour


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def public_condominiums(request):
    """
    GET /api/condominiums/public/
    Lista pública de condomínios activos (nome + id) para o login do morador.
    Não requer autenticação.
    """
    from .models import Condominium
    condos = Condominium.objects.filter(is_active=True).values('id', 'name', 'island', 'municipality')
    return Response(list(condos))


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def exchange_rates(request):
    """
    Retorna taxas de câmbio CVE → EUR/USD.
    Fonte: ExchangeRate-API (gratuita, sem auth).
    Cache: 1 hora (locmem ou Redis se configurado).
    """
    cached = cache.get(_CACHE_KEY)
    if cached:
        return Response(cached)

    rates = _FALLBACK_RATES.copy()
    updated_at = datetime.utcnow().isoformat() + 'Z'
    source = 'fallback'

    try:
        url = 'https://api.exchangerate-api.com/v4/latest/CVE'
        with urllib.request.urlopen(url, timeout=4) as resp:
            payload = _json.loads(resp.read())
        r = payload.get('rates', {})
        if r.get('EUR') and r.get('USD'):
            rates = {'EUR': round(r['EUR'], 6), 'USD': round(r['USD'], 6)}
            updated_at = payload.get('date', updated_at)
            source = 'live'
    except Exception:
        pass  # serve fallback silently

    data = {
        'CVE': 1,
        'EUR': rates['EUR'],
        'USD': rates['USD'],
        'updated_at': updated_at,
        'source': source,
    }
    cache.set(_CACHE_KEY, data, _CACHE_TTL)
    return Response(data)


# =============================================================================
# Sprint 8: ViewSets para Assembleia e Votação
# =============================================================================

class AssemblyViewSet(CondominiumNestedMixin, viewsets.ModelViewSet):
    """CRUD de assembleias; filtrado por condominium_id na URL."""
    serializer_class = AssemblySerializer
    permission_classes = [IsCondominiumManagerOrAdminAction]
    lookup_url_kwarg = 'assembly_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True,
        )

    def get_queryset(self):
        return Assembly.objects.filter(
            condominium_id=self.kwargs['condominium_pk']
        ).prefetch_related('topics__votes')

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())

    @action(detail=True, methods=['post'], url_path='open')
    def open_assembly(self, request, condominium_pk=None, assembly_pk=None):
        """Muda status para OPEN (começa a votação)."""
        assembly = self.get_object()
        if assembly.status != 'SCHEDULED':
            return Response(
                {'error': 'Apenas assembleias agendadas podem ser abertas.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        assembly.status = 'OPEN'
        assembly.save(update_fields=['status', 'updated_at'])
        return Response(AssemblySerializer(assembly, context={'request': request}).data)

    @action(detail=True, methods=['post'], url_path='close')
    def close_assembly(self, request, condominium_pk=None, assembly_pk=None):
        """Muda status para CLOSED e guarda acta."""
        assembly = self.get_object()
        if assembly.status != 'OPEN':
            return Response(
                {'error': 'Apenas assembleias em curso podem ser encerradas.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        assembly.status = 'CLOSED'
        assembly.minutes = request.data.get('minutes', '')
        assembly.save(update_fields=['status', 'minutes', 'updated_at'])
        return Response(AssemblySerializer(assembly, context={'request': request}).data)


class AssemblyTopicViewSet(viewsets.ModelViewSet):
    """CRUD de pontos da ordem do dia."""
    serializer_class = AssemblyTopicSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'topic_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_assembly(self):
        return get_object_or_404(
            Assembly,
            pk=self.kwargs['assembly_pk'],
            condominium_id=self.kwargs['condominium_pk'],
        )

    def get_queryset(self):
        return AssemblyTopic.objects.filter(
            assembly_id=self.kwargs['assembly_pk']
        ).prefetch_related('votes')

    def perform_create(self, serializer):
        serializer.save(assembly=self.get_assembly())


class AssemblyVoteViewSet(viewsets.ModelViewSet):
    """Cast / update / delete vote on a topic."""
    serializer_class = AssemblyVoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'vote_pk'
    lookup_value_regex = '[0-9a-f-]+'
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_topic(self):
        return get_object_or_404(
            AssemblyTopic,
            pk=self.kwargs['topic_pk'],
            assembly__condominium_id=self.kwargs['condominium_pk'],
        )

    def get_queryset(self):
        return AssemblyVote.objects.filter(
            topic_id=self.kwargs['topic_pk']
        ).select_related('unit')

    def create(self, request, *args, **kwargs):
        topic = self.get_topic()
        # Validate assembly is OPEN
        if topic.assembly.status != 'OPEN':
            return Response(
                {'error': 'A votação só é permitida enquanto a assembleia está em curso.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Upsert: if the unit already voted, update the choice
        unit_id = request.data.get('unit')
        existing = AssemblyVote.objects.filter(topic=topic, unit_id=unit_id).first()
        if existing:
            existing.choice = request.data.get('choice', existing.choice)
            existing.save(update_fields=['choice'])
            return Response(AssemblyVoteSerializer(existing).data)
        serializer = self.get_serializer(data={**request.data, 'topic': str(topic.pk)})
        serializer.is_valid(raise_exception=True)
        serializer.save(topic=topic)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
