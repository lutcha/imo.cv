from django.contrib import admin
from .models import CRMInteraction

@admin.register(CRMInteraction)
class CRMInteractionAdmin(admin.ModelAdmin):
    list_display = ('lead', 'interaction_type', 'summary', 'interaction_date')
    list_filter = ('interaction_type', 'interaction_date')
    search_fields = ('summary', 'description', 'lead__full_name')
    ordering = ('-interaction_date',)
