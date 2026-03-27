from rest_framework import serializers
from .models import Agency


class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = [
            'id', 'name', 'slug', 'nif', 'is_verified',
            'subscription_plan', 'logo', 'website', 'email',
            'phone', 'rating', 'created_at'
        ]
        read_only_fields = ['id', 'is_verified', 'rating', 'created_at']


class AgencyMeSerializer(serializers.ModelSerializer):
    """Serializer para o perfil da agência editável pelo próprio agente."""
    subscription_plan_display = serializers.CharField(
        source='get_subscription_plan_display', read_only=True
    )
    docs_approved = serializers.BooleanField(read_only=True)

    class Meta:
        model = Agency
        fields = [
            'id', 'name', 'slug', 'nif',
            'email', 'phone', 'website', 'logo',
            'is_verified', 'docs_approved',
            'subscription_plan', 'subscription_plan_display',
            'rating', 'created_at', 'updated_at',
        ]
        read_only_fields = [
            'id', 'slug', 'nif',
            'is_verified', 'docs_approved',
            'subscription_plan',
            'rating', 'created_at', 'updated_at',
        ]
