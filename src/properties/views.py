from rest_framework import viewsets, permissions, filters
from rest_framework_gis.filters import DistanceToPointFilter
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().prefetch_related('media')
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, DistanceToPointFilter]
    
    # DistanceToPointFilter allows queries like ?dist=1000&point=-23.50,14.91
    distance_filter_field = 'location'
    distance_filter_convert_meters = True
    
    search_fields = ['title', 'description', 'address']

    def get_queryset(self):
        qs = super().get_queryset()
        
        # Marketplace Logic: Only show published properties to the public
        if self.action in ['list', 'retrieve'] and not self.request.user.is_staff:
            qs = qs.filter(status='PUBLICADO')
            
        # Backoffice Logic: Filter by Agency for Agency Users
        if self.request.user.is_authenticated and hasattr(self.request.user, 'agency') and self.request.user.agency:
            # If the user is an agent, they can see all their agency's properties (even drafts)
            if self.request.query_params.get('managed', None):
                qs = Property.objects.for_agency(self.request.user.agency)
                
        return qs

    def perform_create(self, serializer):
        # Automatically assign the property to the user's agency on creation
        if self.request.user.is_authenticated and self.request.user.agency:
            serializer.save(agency=self.request.user.agency, agent_responsible=self.request.user)
        else:
            serializer.save()
