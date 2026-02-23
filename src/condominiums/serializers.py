"""
Serializers para a API de Gestão de Condomínios.
Validação defensiva: amount >= 0, datas, choices.
"""
from rest_framework import serializers
from .models import Condominium, Unit, Fee, MaintenanceRequest, Notice


class CondominiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condominium
        fields = [
            'id', 'name', 'address', 'island', 'municipality',
            'currency', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


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
