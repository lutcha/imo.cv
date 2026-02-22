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
            
        if user.role == 'SYSTEM_ADMIN':
            return qs
            
        if hasattr(user, 'agency') and user.agency:
            return qs.filter(agency=user.agency)
            
        return CRMInteraction.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated and hasattr(self.request.user, 'agency'):
            serializer.save(
                agency=self.request.user.agency,
                agent=self.request.user
            )
        else:
            serializer.save(agent=self.request.user)
