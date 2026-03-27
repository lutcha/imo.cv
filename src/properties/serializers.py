from rest_framework import serializers
from django.contrib.gis.geos import Point
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

    # Writable location input — accepts GeoJSON Point dict
    location_geojson_input = serializers.JSONField(write_only=True, required=False)

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
            'is_verified', 'location_geojson', 'location_geojson_input', 'media',
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

    def create(self, validated_data):
        geojson = validated_data.pop('location_geojson_input', None)
        if geojson and geojson.get('type') == 'Point':
            coords = geojson['coordinates']
            validated_data['location'] = Point(coords[0], coords[1], srid=4326)
        elif 'location' not in validated_data:
            # Default to Praia city centre if no location provided
            validated_data['location'] = Point(-23.5133, 14.9177, srid=4326)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        geojson = validated_data.pop('location_geojson_input', None)
        if geojson and geojson.get('type') == 'Point':
            coords = geojson['coordinates']
            validated_data['location'] = Point(coords[0], coords[1], srid=4326)
        return super().update(instance, validated_data)
