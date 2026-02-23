"""
Modelos para Gestão de Condomínios.
Isolados por tenant (schema); utilizados por agências para gerir condomínios, unidades, quotas, avisos e manutenção.
"""
from django.db import models
from django.conf import settings
import uuid


class Condominium(models.Model):
    """Edifício/condomínio gerido pela agência (tenant)."""
    class Island(models.TextChoices):
        SANTIAGO = 'SANTIAGO', 'Santiago'
        SAL = 'SAL', 'Sal'
        BOA_VISTA = 'BOA_VISTA', 'Boa Vista'
        SAO_VICENTE = 'SAO_VICENTE', 'São Vicente'
        SANTO_ANTAO = 'SAO_ANTAO', 'Santo Antão'
        FOGO = 'FOGO', 'Fogo'
        SAO_NICOLAU = 'SAO_NICOLAU', 'São Nicolau'
        MAIO = 'MAIO', 'Maio'
        BRAVA = 'BRAVA', 'Brava'

    class Currency(models.TextChoices):
        CVE = 'CVE', 'CVE'
        EUR = 'EUR', 'EUR'
        USD = 'USD', 'USD'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=500, blank=True)
    island = models.CharField(
        max_length=20,
        choices=Island.choices,
        default=Island.SANTIAGO
    )
    municipality = models.CharField(max_length=100, blank=True)
    currency = models.CharField(
        max_length=3,
        choices=Currency.choices,
        default=Currency.CVE
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return self.name


class Unit(models.Model):
    """Fração/unidade dentro de um condomínio."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='units'
    )
    identifier = models.CharField(max_length=50)  # ex: "A101", "R/C Esq."
    floor = models.PositiveSmallIntegerField(null=True, blank=True)
    area_m2 = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    owner_name = models.CharField(max_length=255, blank=True)
    owner_phone = models.CharField(max_length=20, blank=True)
    owner_email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['condominium', 'floor', 'identifier']
        unique_together = [('condominium', 'identifier')]
        indexes = [
            models.Index(fields=['condominium']),
        ]

    def __str__(self):
        return f"{self.condominium.name} – {self.identifier}"


class Fee(models.Model):
    """Quota / mensalidade (por unidade ou comum ao condomínio)."""
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pendente'
        PAID = 'PAID', 'Pago'
        OVERDUE = 'OVERDUE', 'Em atraso'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='fees'
    )
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        related_name='fees',
        null=True,
        blank=True
    )  # null = quota comum / global
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default='CVE')
    due_date = models.DateField()
    period = models.CharField(max_length=7)  # ex: "2025-01" (YYYY-MM)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-due_date', 'unit']
        indexes = [
            models.Index(fields=['condominium', 'status']),
            models.Index(fields=['condominium', 'due_date']),
            models.Index(fields=['unit', 'period']),
        ]

    def __str__(self):
        unit_str = self.unit.identifier if self.unit else 'Comum'
        return f"{self.condominium.name} – {unit_str} – {self.period}"


class MaintenanceRequest(models.Model):
    """Pedido de manutenção (unidade ou área comum)."""
    class Status(models.TextChoices):
        OPEN = 'OPEN', 'Aberto'
        IN_PROGRESS = 'IN_PROGRESS', 'Em progresso'
        RESOLVED = 'RESOLVED', 'Resolvido'

    class Priority(models.TextChoices):
        LOW = 'LOW', 'Baixa'
        MEDIUM = 'MEDIUM', 'Média'
        HIGH = 'HIGH', 'Alta'
        URGENT = 'URGENT', 'Urgente'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='maintenance_requests'
    )
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        related_name='maintenance_requests',
        null=True,
        blank=True
    )  # null = área comum
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.OPEN
    )
    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reported_maintenance_requests'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['condominium', 'status']),
            models.Index(fields=['condominium', 'priority']),
        ]

    def __str__(self):
        return f"{self.condominium.name} – {self.title}"


class Notice(models.Model):
    """Aviso / comunicação do condomínio."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='notices'
    )
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        indexes = [
            models.Index(fields=['condominium']),
        ]

    def __str__(self):
        return f"{self.condominium.name} – {self.title}"
