from rest_framework import serializers
from .models import Property, PropertyMedia


class PropertyMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyMedia
        fields = ['id', 'file', 'is_main', 'order']


class PropertySerializer(serializers.ModelSerializer):
    media = PropertyMediaSerializer(many=True, read_only=True)
    location_geojson = serializers.SerializerMethodField()
    bedrooms = serializers.IntegerField(source='rooms', read_only=True)
    listing_type_display = serializers.SerializerMethodField()
    property_type_display = serializers.SerializerMethodField()
    featured = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'description',
            'listing_type', 'listing_type_display',
            'property_type', 'property_type_display',
            'status', 'featured',
            'price', 'currency',
            'island', 'municipality', 'address',
            'area_total', 'area_util', 'bedrooms', 'bathrooms',
            'year_built', 'has_garage', 'amenities',
            'is_verified', 'location_geojson', 'media',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'is_verified', 'created_at', 'updated_at']

    def get_location_geojson(self, obj):
        if obj.location:
            return {
                'type': 'Point',
                'coordinates': [obj.location.x, obj.location.y],
            }
        return None

    def get_listing_type_display(self, obj):
        return obj.get_listing_type_display()

    def get_property_type_display(self, obj):
        return obj.get_property_type_display()

    def get_featured(self, obj):
        return obj.is_verified
