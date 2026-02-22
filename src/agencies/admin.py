from django.contrib import admin
from .models import Agency

@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'nif', 'subscription_plan', 'is_verified', 'created_at')
    search_fields = ('name', 'nif', 'email')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('subscription_plan', 'is_verified', 'docs_approved')
