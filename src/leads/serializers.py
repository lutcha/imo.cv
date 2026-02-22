from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    property_title = serializers.ReadOnlyField(source='property.title')
    assigned_to_name = serializers.ReadOnlyField(source='assigned_to.get_full_name')

    class Meta:
        model = Lead
        fields = [
            'id', 'agency', 'full_name', 'email', 'phone', 
            'property', 'property_title', 'status', 'priority', 
            'assigned_to', 'assigned_to_name', 'notes', 'source', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
