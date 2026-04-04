import csv
from django.http import HttpResponse
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
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

    @action(detail=False, methods=['get'], url_path='export')
    def export_csv(self, request):
        leads = self.get_queryset()

        status_filter = request.query_params.get('status')
        from_date = request.query_params.get('from')
        if status_filter:
            leads = leads.filter(status=status_filter)
        if from_date:
            leads = leads.filter(created_at__date__gte=from_date)

        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="leads.csv"'
        response.write('\ufeff')  # BOM para Excel abrir correctamente

        writer = csv.writer(response)
        writer.writerow(['Nome', 'Email', 'Telefone', 'Estado', 'Prioridade',
                         'Fonte', 'Notas', 'Data'])

        for lead in leads:
            writer.writerow([
                lead.full_name,
                lead.email,
                lead.phone,
                lead.get_status_display(),
                lead.get_priority_display(),
                lead.source,
                lead.notes,
                lead.created_at.strftime('%Y-%m-%d'),
            ])

        return response
