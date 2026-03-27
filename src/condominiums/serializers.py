"""
Serializers para a API de Gestão de Condomínios.
Validação defensiva: amount >= 0, datas, choices.
"""
from rest_framework import serializers
from .models import Condominium, Unit, Fee, MaintenanceRequest, Notice, CommonArea, Reservation, Assembly, AssemblyTopic, AssemblyVote


class CondominiumSerializer(serializers.ModelSerializer):
    manager_name = serializers.SerializerMethodField()

    class Meta:
        model = Condominium
        fields = [
            'id', 'name', 'address', 'island', 'municipality',
            'currency', 'manager', 'manager_name', 'is_active',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_manager_name(self, obj):
        if obj.manager:
            return obj.manager.get_full_name() or obj.manager.email
        return None


class UnitSerializer(serializers.ModelSerializer):
    condominium_name = serializers.ReadOnlyField(source='condominium.name')

    class Meta:
        model = Unit
        fields = [
            'id', 'condominium', 'condominium_name', 'identifier', 'floor',
            'area_m2', 'owner_name', 'owner_phone', 'owner_email',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_identifier(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Identificador da unidade é obrigatório.")
        return value.strip()

    def validate_area_m2(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Área não pode ser negativa.")
        return value


class FeeSerializer(serializers.ModelSerializer):
    condominium_name = serializers.ReadOnlyField(source='condominium.name')
    unit_identifier = serializers.ReadOnlyField(source='unit.identifier', default=None)

    class Meta:
        model = Fee
        fields = [
            'id', 'condominium', 'condominium_name', 'unit', 'unit_identifier',
            'amount', 'currency', 'due_date', 'period', 'status',
            'paid_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_amount(self, value):
        if value is None or value < 0:
            raise serializers.ValidationError("Montante deve ser >= 0.")
        return value

    def validate(self, attrs):
        condominium = attrs.get('condominium')
        unit = attrs.get('unit')
        if unit and unit.condominium_id != condominium.id:
            raise serializers.ValidationError({
                'unit': "A unidade deve pertencer ao condomínio indicado."
            })
        return attrs


class MaintenanceRequestSerializer(serializers.ModelSerializer):
    condominium_name = serializers.ReadOnlyField(source='condominium.name')
    unit_identifier = serializers.ReadOnlyField(source='unit.identifier', default=None)

    class Meta:
        model = MaintenanceRequest
        fields = [
            'id', 'condominium', 'condominium_name', 'unit', 'unit_identifier',
            'title', 'description', 'status', 'priority', 'reported_by',
            # Campos de gestão (Sprint 3-A)
            'assigned_to_name', 'assigned_to_phone',
            'estimated_cost_cve', 'actual_cost_cve',
            'resolved_at', 'resolution_notes', 'photos',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Título é obrigatório.")
        return value.strip()


class NoticeSerializer(serializers.ModelSerializer):
    condominium_name = serializers.ReadOnlyField(source='condominium.name')

    class Meta:
        model = Notice
        fields = [
            'id', 'condominium', 'condominium_name', 'title', 'body',
            'published_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Título é obrigatório.")
        return value.strip()


# =============================================================================
# Sprint 2-A: Serializers para Reservas
# =============================================================================

class CommonAreaSerializer(serializers.ModelSerializer):
    condominium_name = serializers.ReadOnlyField(source='condominium.name')

    class Meta:
        model = CommonArea
        fields = [
            'id', 'condominium', 'condominium_name', 'name', 'capacity',
            'rules', 'requires_payment', 'price_cve', 'is_outdoor',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        requires_payment = attrs.get('requires_payment', False)
        price_cve = attrs.get('price_cve')
        if requires_payment and not price_cve:
            raise serializers.ValidationError({
                'price_cve': 'Preço é obrigatório quando requires_payment=True'
            })
        return attrs


class ReservationSerializer(serializers.ModelSerializer):
    common_area_name = serializers.ReadOnlyField(source='common_area.name')
    unit_identifier = serializers.ReadOnlyField(source='unit.identifier', default=None)

    class Meta:
        model = Reservation
        fields = [
            'id', 'common_area', 'common_area_name', 'unit', 'unit_identifier',
            'resident_name', 'resident_phone', 'start_datetime', 'end_datetime',
            'status', 'notes', 'paid_amount_cve', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        start_datetime = attrs.get('start_datetime')
        end_datetime = attrs.get('end_datetime')
        
        # Validar que start < end
        if start_datetime and end_datetime and start_datetime >= end_datetime:
            raise serializers.ValidationError({
                'end_datetime': 'Data de fim deve ser posterior à data de início'
            })
        
        # Validar sobreposição de reservas
        if 'common_area' in attrs and start_datetime and end_datetime:
            common_area = attrs['common_area']
            overlapping = Reservation.objects.filter(
                common_area=common_area,
                status__in=['PENDING', 'CONFIRMED'],
                start_datetime__lt=end_datetime,
                end_datetime__gt=start_datetime,
            )
            # Excluir a própria reserva se estiver a editar
            if self.instance:
                overlapping = overlapping.exclude(pk=self.instance.pk)
            
            if overlapping.exists():
                raise serializers.ValidationError({
                    'start_datetime': 'Já existe uma reserva neste período para esta área'
                })

        return attrs


# =============================================================================
# Sprint 8: Serializers para Assembleia e Votação
# =============================================================================

class AssemblyVoteSerializer(serializers.ModelSerializer):
    unit_identifier = serializers.ReadOnlyField(source='unit.identifier')

    class Meta:
        model = AssemblyVote
        fields = ['id', 'topic', 'unit', 'unit_identifier', 'choice', 'voted_at']
        read_only_fields = ['id', 'voted_at']


class AssemblyTopicSerializer(serializers.ModelSerializer):
    vote_yes = serializers.SerializerMethodField()
    vote_no = serializers.SerializerMethodField()
    vote_abstain = serializers.SerializerMethodField()
    total_votes = serializers.SerializerMethodField()
    my_vote = serializers.SerializerMethodField()

    class Meta:
        model = AssemblyTopic
        fields = [
            'id', 'assembly', 'order', 'title', 'description', 'requires_vote',
            'vote_yes', 'vote_no', 'vote_abstain', 'total_votes', 'my_vote',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def _votes(self, obj):
        # Cache on request so we don't hit DB once per field per topic
        request = self.context.get('request')
        cache_attr = f'_votes_{obj.pk}'
        if not hasattr(request, cache_attr):
            qs = list(obj.votes.values('choice', 'unit_id'))
            setattr(request, cache_attr, qs)
        return getattr(request, cache_attr)

    def get_vote_yes(self, obj):
        return sum(1 for v in self._votes(obj) if v['choice'] == 'YES')

    def get_vote_no(self, obj):
        return sum(1 for v in self._votes(obj) if v['choice'] == 'NO')

    def get_vote_abstain(self, obj):
        return sum(1 for v in self._votes(obj) if v['choice'] == 'ABSTAIN')

    def get_total_votes(self, obj):
        return len(self._votes(obj))

    def get_my_vote(self, obj):
        """Returns the choice the requesting user's unit cast, or null."""
        request = self.context.get('request')
        if not request:
            return None
        unit_id = getattr(request.auth, 'get', lambda k, d=None: None)('unit_id') if request.auth else None
        if not unit_id:
            return None
        for v in self._votes(obj):
            if str(v['unit_id']) == str(unit_id):
                return v['choice']
        return None


class AssemblySerializer(serializers.ModelSerializer):
    topics = AssemblyTopicSerializer(many=True, read_only=True)
    topics_count = serializers.SerializerMethodField()
    total_units = serializers.SerializerMethodField()

    class Meta:
        model = Assembly
        fields = [
            'id', 'condominium', 'title', 'description', 'scheduled_at',
            'quorum_pct', 'status', 'minutes',
            'topics', 'topics_count', 'total_units',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_topics_count(self, obj):
        return obj.topics.count()

    def get_total_units(self, obj):
        return Unit.objects.filter(condominium=obj.condominium).count()

    def validate_quorum_pct(self, value):
        if not (1 <= value <= 100):
            raise serializers.ValidationError("quorum_pct deve estar entre 1 e 100.")
        return value
