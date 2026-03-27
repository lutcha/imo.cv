from django.db import models
from django.contrib.auth.models import AbstractUser
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
