from rest_framework import serializers
from .models import CRMInteraction

class CRMInteractionSerializer(serializers.ModelSerializer):
    agent_name = serializers.ReadOnlyField(source='agent.get_full_name')
    lead_name = serializers.ReadOnlyField(source='lead.full_name')

    class Meta:
        model = CRMInteraction
        fields = [
            'id', 'lead', 'lead_name', 'agent', 'agent_name', 
            'interaction_type', 'summary', 'description', 
            'interaction_date', 'follow_up_date'
        ]
        read_only_fields = ['id', 'interaction_date']
