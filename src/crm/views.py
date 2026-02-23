from rest_framework import viewsets, permissions
from .models import CRMInteraction
from .serializers import CRMInteractionSerializer

class CRMInteractionViewSet(viewsets.ModelViewSet):
    queryset = CRMInteraction.objects.all()
    serializer_class = CRMInteractionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = CRMInteraction.objects.all()

        # Filter by lead_id if provided in query params
        lead_id = self.request.query_params.get('lead', None)
        if lead_id:
            qs = qs.filter(lead_id=lead_id)

        # Non-admin: only interactions for leads assigned to this user
        if getattr(user, 'role', None) != 'SYSTEM_ADMIN':
            qs = qs.filter(lead__assigned_to=user)

        return qs

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)
