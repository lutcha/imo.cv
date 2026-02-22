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
