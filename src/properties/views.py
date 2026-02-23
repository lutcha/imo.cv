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
            if self.request.query_params.get('managed', None):
                qs = Property.objects.for_agency(self.request.user.agency)

        params = self.request.query_params

        island = params.get('island')
        if island:
            qs = qs.filter(island=island)

        listing_type = params.get('listing_type')
        if listing_type:
            # Map frontend values (sale/rent) to model values (VENDA/ARRENDAMENTO)
            listing_type_map = {
                'sale': 'VENDA', 'rent': 'ARRENDAMENTO', 'vacation': 'FERIAS',
                'VENDA': 'VENDA', 'ARRENDAMENTO': 'ARRENDAMENTO', 'FERIAS': 'FERIAS',
            }
            qs = qs.filter(listing_type=listing_type_map.get(listing_type, listing_type))

        property_type = params.get('property_type')
        if property_type:
            qs = qs.filter(property_type=property_type)

        price_min = params.get('price_min')
        if price_min:
            qs = qs.filter(price__gte=price_min)

        price_max = params.get('price_max')
        if price_max:
            qs = qs.filter(price__lte=price_max)

        min_area = params.get('min_area')
        if min_area:
            qs = qs.filter(area_total__gte=min_area)

        max_area = params.get('max_area')
        if max_area:
            qs = qs.filter(area_total__lte=max_area)

        bedrooms = params.get('bedrooms')
        if bedrooms:
            qs = qs.filter(rooms__gte=bedrooms)

        return qs

    def perform_create(self, serializer):
        # Automatically assign the property to the user's agency on creation
        if self.request.user.is_authenticated and self.request.user.agency:
            serializer.save(agency=self.request.user.agency, agent_responsible=self.request.user)
        else:
            serializer.save()
