from django.contrib.gis import admin
from .models import Property, PropertyMedia

class PropertyMediaInline(admin.TabularInline):
    model = PropertyMedia
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.GISModelAdmin):
    list_display = ('title', 'island', 'property_type', 'status', 'price', 'is_verified')
    list_filter = ('island', 'property_type', 'status', 'is_verified')
    search_fields = ('title', 'address', 'description')
    inlines = [PropertyMediaInline]
    
    # Map configuration for GeoDjango Admin
    default_lat = 14.9177  # Praia, Cape Verde
    default_lon = -23.5092
    default_zoom = 12
