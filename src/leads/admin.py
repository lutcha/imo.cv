from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'status', 'priority', 'property', 'created_at')
    list_filter = ('status', 'priority', 'source')
    search_fields = ('full_name', 'email', 'phone', 'notes')
    ordering = ('-created_at',)
