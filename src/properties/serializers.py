from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from .models import Property, PropertyMedia

class PropertyMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyMedia
        fields = ['id', 'file', 'is_main', 'order']

class PropertySerializer(GeoFeatureModelSerializer):
    media = PropertyMediaSerializer(many=True, read_only=True)
    agency_name = serializers.ReadOnlyField(source='agency.name')

    class Meta:
        model = Property
        geo_field = 'location'
        fields = [
            'id', 'agency', 'agency_name', 'title', 'description', 
            'property_type', 'status', 'price', 'currency', 
            'address', 'area_total', 'area_util', 'rooms', 
            'bathrooms', 'year_built', 'has_garage', 'amenities', 
            'is_verified', 'media', 'created_at'
        ]
        read_only_fields = ['id', 'is_verified', 'created_at']
