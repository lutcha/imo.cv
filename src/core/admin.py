from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Agency Info', {'fields': ('role', 'agency', 'is_verified', 'phone')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Agency Info', {'fields': ('role', 'agency', 'is_verified', 'phone')}),
    )
    list_display = ('username', 'email', 'role', 'agency', 'is_staff')
    list_filter = ('role', 'agency', 'is_staff', 'is_superuser')
