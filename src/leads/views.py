from rest_framework import viewsets, permissions, filters
from .models import Lead
from .serializers import LeadSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'email', 'phone', 'notes']
    ordering_fields = ['created_at', 'priority', 'status']

    def get_queryset(self):
        user = self.request.user
        # System admins can see everything, agency users only their agency's leads
        if user.role == 'SYSTEM_ADMIN':
            return Lead.objects.all()
        if hasattr(user, 'agency') and user.agency:
            return Lead.objects.for_agency(user.agency)
        return Lead.objects.none()

    def perform_create(self, serializer):
        # If created via API by an authenticated agent
        if self.request.user.is_authenticated and hasattr(self.request.user, 'agency'):
            serializer.save(agency=self.request.user.agency)
        else:
            # This handles public lead capture (need to ensure agency is provided in data)
            serializer.save()
