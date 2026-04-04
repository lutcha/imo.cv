from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django_tenants.models import TenantMixin, DomainMixin
import uuid

class User(AbstractUser):
    class Role(models.TextChoices):
        SYSTEM_ADMIN = 'SYSTEM_ADMIN', 'System Admin'
        AGENCY_ADMIN = 'AGENCY_ADMIN', 'Agency Admin'
        AGENT = 'AGENT', 'Agent'
        CONDOMINIUM_MANAGER = 'CONDOMINIUM_MANAGER', 'Gestor de Condomínio'
        BUYER = 'BUYER', 'Buyer'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.BUYER
    )
    agency = models.ForeignKey(
        'agencies.Agency',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )
    
    is_verified = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return self.username

class TenantManager(models.Manager):
    def for_agency(self, agency):
        return self.get_queryset().filter(agency=agency)

class TenantModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # DEPRECATED: This will be replaced by schema-level isolation
    agency = models.ForeignKey(
        'agencies.Agency',
        on_delete=models.CASCADE,
        related_name="%(class)s_related"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = TenantManager()

    class Meta:
        abstract = True

class Client(TenantMixin):
    name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)

    # default true, schema will be automatically created and synced when it is saved
    auto_create_schema = True

class Domain(DomainMixin):
    pass


class Notification(models.Model):
    class Type(models.TextChoices):
        NEW_LEAD     = 'NEW_LEAD', 'Novo Lead'
        LEAD_UPDATED = 'LEAD_UPDATED', 'Lead Actualizado'
        RESERVATION  = 'RESERVATION', 'Nova Reserva'
        MAINTENANCE  = 'MAINTENANCE', 'Manutenção'
        FEE_OVERDUE  = 'FEE_OVERDUE', 'Quota em Atraso'

    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    type       = models.CharField(max_length=30, choices=Type.choices)
    title      = models.CharField(max_length=200)
    body       = models.TextField(blank=True)
    is_read    = models.BooleanField(default=False)
    action_url = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.type} — {self.title}'
