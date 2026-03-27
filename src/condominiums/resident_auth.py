"""
Autenticação OTP (One-Time Password) para Moradores de Condomínios.
Login sem password — apenas código temporário enviado via WhatsApp.

Fluxo:
1. Morador insere telefone
2. Sistema gera OTP de 6 dígitos
3. OTP guardado em cache (Redis) com TTL 10 minutos
4. OTP enviado via WhatsApp
5. Morador insere código
6. Sistema valida e devolve JWT de morador
"""
import random
import logging
from datetime import timedelta
from typing import Optional, Tuple

from django.core.cache import cache
from django.utils import timezone
from rest_framework import serializers, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from condominiums.models import Unit, Condominium
from condominiums.notifications import WhatsAppNotificationService

logger = logging.getLogger(__name__)

# Configurações OTP
OTP_LENGTH = 6
OTP_EXPIRY_MINUTES = 10
OTP_PREFIX = 'otp_condominium_'


def generate_otp() -> str:
    """Gera código OTP de 6 dígitos."""
    return ''.join(random.choices('0123456789', k=OTP_LENGTH))


def get_otp_cache_key(phone: str, condominium_id: str) -> str:
    """Gera chave única para cache do OTP."""
    return f"{OTP_PREFIX}{condominium_id}_{phone}"


def store_otp(phone: str, condominium_id: str, otp: str) -> None:
    """
    Guarda OTP em cache com TTL.
    
    Em produção, usar Redis:
    - settings.CACHES['default'] = {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
      }
    """
    key = get_otp_cache_key(phone, condominium_id)
    expiry = timedelta(minutes=OTP_EXPIRY_MINUTES)
    cache.set(key, otp, timeout=expiry.seconds)
    logger.info(f"OTP guardado para {phone} (condomínio: {condominium_id})")


def get_stored_otp(phone: str, condominium_id: str) -> Optional[str]:
    """Recupera OTP do cache."""
    key = get_otp_cache_key(phone, condominium_id)
    return cache.get(key)


def delete_otp(phone: str, condominium_id: str) -> None:
    """Remove OTP do cache após validação."""
    key = get_otp_cache_key(phone, condominium_id)
    cache.delete(key)


def create_resident_jwt(unit: Unit) -> dict:
    """
    Cria JWT token para morador.
    
    Payload inclui:
    - unit_id: UUID da unidade
    - condominium_id: UUID do condomínio
    - role: 'resident'
    - resident_name: nome do morador
    """
    refresh = RefreshToken()
    
    # Custom claims
    refresh['unit_id'] = str(unit.id)
    refresh['condominium_id'] = str(unit.condominium.id)
    refresh['role'] = 'resident'
    refresh['resident_name'] = unit.owner_name
    
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'unit_id': str(unit.id),
        'condominium_id': str(unit.condominium.id),
        'role': 'resident',
    }


# =============================================================================
# Serializers
# =============================================================================

class RequestOTPSerializer(serializers.Serializer):
    """Serializer para pedido de OTP — suporta telefone (WhatsApp) ou email."""
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    condominium_id = serializers.UUIDField(required=True)

    def validate(self, attrs):
        phone = attrs.get('phone', '').strip()
        email = attrs.get('email', '').strip()
        if not phone and not email:
            raise serializers.ValidationError("Telefone ou email obrigatório.")
        if phone and len(phone) < 7:
            raise serializers.ValidationError({"phone": "Telefone inválido"})
        attrs['phone'] = phone
        attrs['email'] = email
        return attrs

    def validate_condominium_id(self, value):
        try:
            Condominium.objects.get(id=value, is_active=True)
        except Condominium.DoesNotExist:
            raise serializers.ValidationError("Condomínio não encontrado ou inativo")
        return value


class VerifyOTPSerializer(serializers.Serializer):
    """Serializer para validação de OTP — suporta telefone ou email."""
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    condominium_id = serializers.UUIDField(required=True)
    otp = serializers.CharField(max_length=10, required=True)

    def validate(self, attrs):
        phone = attrs.get('phone', '').strip()
        email = attrs.get('email', '').strip()
        if not phone and not email:
            raise serializers.ValidationError("Telefone ou email obrigatório.")
        attrs['phone'] = phone
        attrs['email'] = email
        return attrs

    def validate_otp(self, value):
        if not value or len(value) < OTP_LENGTH:
            raise serializers.ValidationError(f"OTP deve ter {OTP_LENGTH} dígitos")
        return value


# =============================================================================
# API Views
# =============================================================================

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def request_otp(request):
    """
    POST /api/condominiums/resident/request-otp/
    
    Solicita código OTP para autenticação de morador.
    
    Body:
    {
        "phone": "+238 991 23 45",
        "condominium_id": "uuid-do-condominio"
    }
    
    Response:
    {
        "success": true,
        "message": "Código enviado para +238 9** *** 45"
    }
    """
    serializer = RequestOTPSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    phone = serializer.validated_data['phone']
    email = serializer.validated_data.get('email', '')
    condominium_id = serializer.validated_data['condominium_id']

    channel = 'email' if email and not phone else 'whatsapp'
    identifier = email if channel == 'email' else phone

    # Lookup unit by phone or email
    if channel == 'email':
        unit = Unit.objects.filter(
            condominium_id=condominium_id,
            owner_email=email
        ).first()
    else:
        unit = Unit.objects.filter(
            condominium_id=condominium_id,
            owner_phone=phone
        ).first()

    if not unit:
        # Por segurança, não revelar se o contacto existe ou não
        return Response({
            'success': True,
            'message': 'Se o contacto estiver registado, receberá o código.',
        })

    # Gerar e guardar OTP (keyed by identifier, not always phone)
    otp = generate_otp()
    store_otp(identifier, str(condominium_id), otp)

    if channel == 'email':
        # Em produção: enviar email via SendGrid / SES
        # Em dev: apenas log
        logger.info(f"[DEV] OTP para {email}: {otp}")
        try:
            from django.core.mail import send_mail
            from django.conf import settings as django_settings
            send_mail(
                subject='O seu código de acesso — imo.cv',
                message=f'O seu código de acesso é: {otp}\nExpira em {OTP_EXPIRY_MINUTES} minutos.',
                from_email=getattr(django_settings, 'DEFAULT_FROM_EMAIL', 'noreply@imo.cv'),
                recipient_list=[email],
                fail_silently=True,
            )
        except Exception as e:
            logger.error(f"Erro ao enviar email OTP: {e}")
        masked = email[:2] + '***' + email[email.index('@'):] if '@' in email else email[:2] + '***'
        message = f'Código enviado para {masked}'
    else:
        try:
            WhatsAppNotificationService.send_otp(phone, otp, OTP_EXPIRY_MINUTES)
            logger.info(f"OTP enviado para {phone}")
        except Exception as e:
            logger.error(f"Erro ao enviar OTP WhatsApp: {e}")
        masked_phone = phone[:-2] + '**' if len(phone) > 2 else '***'
        message = f'Código enviado para {masked_phone}'

    return Response({
        'success': True,
        'message': message,
        'expires_in_minutes': OTP_EXPIRY_MINUTES,
        'channel': channel,
    })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_otp(request):
    """
    POST /api/condominiums/resident/verify-otp/
    
    Valida código OTP e devolve JWT de morador.
    
    Body:
    {
        "phone": "+238 991 23 45",
        "condominium_id": "uuid-do-condominio",
        "otp": "123456"
    }
    
    Response:
    {
        "access": "eyJ...",
        "refresh": "eyJ...",
        "unit_id": "uuid",
        "condominium_id": "uuid",
        "role": "resident",
        "resident_name": "Carlos Silva"
    }
    """
    serializer = VerifyOTPSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    phone = serializer.validated_data['phone']
    email = serializer.validated_data.get('email', '')
    condominium_id = serializer.validated_data['condominium_id']
    otp = serializer.validated_data['otp']

    # Determine channel + identifier (must match what was used at request time)
    channel = 'email' if email and not phone else 'whatsapp'
    identifier = email if channel == 'email' else phone

    # Recuperar OTP guardado
    stored_otp = get_stored_otp(identifier, str(condominium_id))

    if not stored_otp:
        return Response(
            {'error': 'Código expirado ou inválido. Solicite novo código.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validar OTP
    if otp != stored_otp:
        return Response(
            {'error': 'Código inválido. Tente novamente.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Encontrar unidade
    if channel == 'email':
        unit = Unit.objects.filter(
            condominium_id=condominium_id,
            owner_email=email
        ).select_related('condominium').first()
    else:
        unit = Unit.objects.filter(
            condominium_id=condominium_id,
            owner_phone=phone
        ).select_related('condominium').first()

    if not unit:
        return Response(
            {'error': 'Unidade não encontrada.'},
            status=status.HTTP_404_NOT_FOUND
        )

    # OTP válido — remover do cache
    delete_otp(identifier, str(condominium_id))
    
    # Criar JWT
    tokens = create_resident_jwt(unit)
    
    return Response({
        'success': True,
        **tokens,
        'resident_name': unit.owner_name,
        'unit_identifier': unit.identifier,
    })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def dev_get_otp(request):
    """
    POST /api/condominiums/resident/dev-otp/
    DEBUG ONLY — returns the current OTP from cache for a given phone + condominium.
    Returns 403 in production (DEBUG=False).
    """
    from django.conf import settings
    if not settings.DEBUG:
        return Response({'error': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
    phone = request.data.get('phone', '')
    email = request.data.get('email', '')
    condominium_id = request.data.get('condominium_id')
    identifier = email if (email and not phone) else phone
    if not identifier or not condominium_id:
        return Response({'error': 'phone or email, and condominium_id required'}, status=status.HTTP_400_BAD_REQUEST)
    otp = get_stored_otp(identifier, str(condominium_id))
    if not otp:
        return Response({'error': 'No OTP found — request one first'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'otp': otp})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_resident(request):
    """
    POST /api/condominiums/resident/logout/
    
    Invalida tokens do morador.
    """
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        
        return Response({'success': True})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


# =============================================================================
# Resident Views (dados do morador)
# =============================================================================

class IsResidentPermission(permissions.BasePermission):
    """Permissão apenas para residentes autenticados."""
    
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role == 'resident'
        )


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def resident_dashboard(request):
    """
    GET /api/condominiums/resident/dashboard/
    
    Retorna dados do dashboard do morador:
    - Últimas quotas
    - Próximas reservas
    - Estado de manutenções
    - Últimos avisos
    """
    from condominiums.models import Fee, Reservation, MaintenanceRequest, Notice
    
    # Extrair unit_id do JWT (simplejwt AccessToken object)
    try:
        unit_id = request.auth.get('unit_id') if request.auth else None
    except Exception:
        unit_id = None

    if not unit_id:
        return Response(
            {'error': 'Token inválido ou sem unit_id'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        unit = Unit.objects.get(id=unit_id)
    except Unit.DoesNotExist:
        return Response(
            {'error': 'Unidade não encontrada'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Últimas quotas (3)
    fees = Fee.objects.filter(
        unit=unit
    ).order_by('-due_date')[:3]
    
    # Próximas reservas
    from datetime import datetime
    reservations = Reservation.objects.filter(
        unit=unit,
        start_datetime__gte=datetime.now(),
        status__in=['PENDING', 'CONFIRMED']
    ).order_by('start_datetime')[:3]
    
    # Minhas manutenções
    maintenances = MaintenanceRequest.objects.filter(
        unit=unit
    ).order_by('-created_at')[:3]
    
    # Últimos avisos do condomínio
    notices = Notice.objects.filter(
        condominium=unit.condominium,
        published_at__lte=datetime.now()
    ).order_by('-published_at')[:5]
    
    return Response({
        'unit': {
            'identifier': unit.identifier,
            'condominium_name': unit.condominium.name,
        },
        'fees': [
            {
                'id': str(fee.id),
                'period': fee.period,
                'amount': str(fee.amount),
                'currency': fee.currency,
                'status': fee.status,
                'due_date': fee.due_date.isoformat(),
            }
            for fee in fees
        ],
        'reservations': [
            {
                'id': str(res.id),
                'common_area_name': res.common_area.name,
                'start_datetime': res.start_datetime.isoformat(),
                'end_datetime': res.end_datetime.isoformat(),
                'status': res.status,
            }
            for res in reservations
        ],
        'maintenances': [
            {
                'id': str(maint.id),
                'title': maint.title,
                'status': maint.status,
                'priority': maint.priority,
                'created_at': maint.created_at.isoformat(),
            }
            for maint in maintenances
        ],
        'notices': [
            {
                'id': str(notice.id),
                'title': notice.title,
                'published_at': notice.published_at.isoformat() if notice.published_at else None,
            }
            for notice in notices
        ],
    })
