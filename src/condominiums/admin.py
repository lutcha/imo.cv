from django.contrib import admin
from .models import Condominium, Unit, Fee, MaintenanceRequest, Notice


@admin.register(Condominium)
class CondominiumAdmin(admin.ModelAdmin):
    list_display = ('name', 'island', 'municipality', 'currency', 'is_active', 'created_at')
    list_filter = ('island', 'currency', 'is_active')
    search_fields = ('name', 'address', 'municipality')
    ordering = ('name',)


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ('identifier', 'condominium', 'floor', 'area_m2', 'owner_name', 'created_at')
    list_filter = ('condominium',)
    search_fields = ('identifier', 'owner_name', 'owner_email')
    raw_id_fields = ('condominium',)
    ordering = ('condominium', 'floor', 'identifier')


@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display = ('condominium', 'unit', 'period', 'amount', 'currency', 'due_date', 'status', 'paid_at')
    list_filter = ('condominium', 'status', 'period')
    search_fields = ('period',)
    raw_id_fields = ('condominium', 'unit')
    date_hierarchy = 'due_date'
    ordering = ('-due_date',)


@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ('title', 'condominium', 'unit', 'status', 'priority', 'created_at')
    list_filter = ('condominium', 'status', 'priority')
    search_fields = ('title', 'description')
    raw_id_fields = ('condominium', 'unit', 'reported_by')
    ordering = ('-created_at',)


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'condominium', 'published_at', 'created_at')
    list_filter = ('condominium',)
    search_fields = ('title', 'body')
    raw_id_fields = ('condominium',)
    date_hierarchy = 'published_at'
    ordering = ('-published_at', '-created_at')
