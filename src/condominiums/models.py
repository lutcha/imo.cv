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
    manager = models.ForeignKey(
        'core.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_condominiums',
        help_text='Síndico/gestor responsável pelo condomínio',
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['is_active']),
            models.Index(fields=['manager']),
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
    # Campos de gestão da ordem de serviço (Sprint 3-A)
    assigned_to_name = models.CharField(
        max_length=255,
        blank=True,
        help_text='Nome do prestador de serviço'
    )
    assigned_to_phone = models.CharField(
        max_length=20,
        blank=True,
        help_text='Telefone do prestador'
    )
    estimated_cost_cve = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text='Custo estimado em CVE'
    )
    actual_cost_cve = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text='Custo real final em CVE'
    )
    resolved_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text='Data de resolução'
    )
    resolution_notes = models.TextField(
        blank=True,
        help_text='Notas sobre a resolução'
    )
    photos = models.JSONField(
        default=list,
        blank=True,
        help_text='Lista de URLs de fotos'
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


# =============================================================================
# Sprint 2-A: Reservas de Espaços Comuns
# =============================================================================

class CommonArea(models.Model):
    """Espaço comum reservável (piscina, salão, ginásio, etc.)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='common_areas'
    )
    name = models.CharField(
        max_length=255,
        help_text='Ex: Piscina, Salão de Festas, Ginásio, Churrasqueira'
    )
    capacity = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text='Capacidade máxima de pessoas'
    )
    rules = models.TextField(
        blank=True,
        help_text='Regras de utilização (ex: máx 2h, horário 8h-22h)'
    )
    requires_payment = models.BooleanField(
        default=False,
        help_text='Se esta área requer pagamento para reserva'
    )
    price_cve = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text='Tarifa de reserva em CVE'
    )
    is_outdoor = models.BooleanField(
        default=False,
        help_text='Se a área é ao ar livre (para integração com meteorologia)'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['condominium', 'name']
        indexes = [
            models.Index(fields=['condominium', 'is_active']),
        ]

    def __str__(self):
        return f"{self.condominium.name} – {self.name}"

    def clean(self):
        """Validar que price_cve só é preenchido se requires_payment=True."""
        from django.core.exceptions import ValidationError
        if self.requires_payment and not self.price_cve:
            raise ValidationError({
                'price_cve': 'Preço é obrigatório quando requires_payment=True'
            })


class Reservation(models.Model):
    """Reserva de um espaço comum por um residente."""
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pendente'
        CONFIRMED = 'CONFIRMED', 'Confirmada'
        CANCELLED = 'CANCELLED', 'Cancelada'
        COMPLETED = 'COMPLETED', 'Concluída'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    common_area = models.ForeignKey(
        CommonArea,
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        related_name='reservations',
        help_text='Unidade que está a fazer a reserva'
    )
    resident_name = models.CharField(
        max_length=255,
        help_text='Nome do residente que fará a reserva'
    )
    resident_phone = models.CharField(
        max_length=20,
        help_text='Telefone/WhatsApp do residente'
    )
    start_datetime = models.DateTimeField(help_text='Data e hora de início')
    end_datetime = models.DateTimeField(help_text='Data e hora de fim')
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    notes = models.TextField(
        blank=True,
        help_text='Notas adicionais da reserva'
    )
    paid_amount_cve = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text='Valor pago pela reserva (se aplicável)'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_datetime']
        indexes = [
            models.Index(fields=['common_area', 'status']),
            models.Index(fields=['common_area', 'start_datetime']),
            models.Index(fields=['unit', 'status']),
        ]

    def __str__(self):
        return f"{self.common_area.name} – {self.resident_name} ({self.start_datetime})"

    def clean(self):
        """Validações de integridade da reserva."""
        from django.core.exceptions import ValidationError
        
        # start_datetime deve ser menor que end_datetime
        if self.start_datetime and self.end_datetime:
            if self.start_datetime >= self.end_datetime:
                raise ValidationError({
                    'end_datetime': 'Data de fim deve ser posterior à data de início'
                })
        
        # Verificar sobreposição de reservas para a mesma área
        if self.common_area_id and self.start_datetime and self.end_datetime:
            overlapping = Reservation.objects.filter(
                common_area_id=self.common_area_id,
                status__in=[Status.PENDING, Status.CONFIRMED],
                start_datetime__lt=self.end_datetime,
                end_datetime__gt=self.start_datetime,
            )
            # Excluir a própria reserva se estiver a editar
            if self.pk:
                overlapping = overlapping.exclude(pk=self.pk)
            
            if overlapping.exists():
                raise ValidationError({
                    'start_datetime': 'Já existe uma reserva neste período para esta área'
                })


# =============================================================================
# Sprint 8: Assembleia e Votação Digital
# =============================================================================

class Assembly(models.Model):
    """Assembleia de condóminos (AG ordinária ou extraordinária)."""

    class Status(models.TextChoices):
        SCHEDULED = 'SCHEDULED', 'Agendada'
        OPEN = 'OPEN', 'Em Curso'
        CLOSED = 'CLOSED', 'Encerrada'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    condominium = models.ForeignKey(
        Condominium,
        on_delete=models.CASCADE,
        related_name='assemblies',
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    scheduled_at = models.DateTimeField(help_text='Data e hora prevista da assembleia')
    quorum_pct = models.PositiveSmallIntegerField(
        default=51,
        help_text='Percentagem mínima de unidades para validar o quórum (0-100)',
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.SCHEDULED,
    )
    minutes = models.TextField(blank=True, help_text='Acta da assembleia (pós-encerramento)')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-scheduled_at']
        indexes = [
            models.Index(fields=['condominium', 'status']),
            models.Index(fields=['condominium', 'scheduled_at']),
        ]

    def __str__(self):
        return f"{self.title} ({self.condominium.name})"


class AssemblyTopic(models.Model):
    """Ponto da ordem do dia de uma assembleia."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assembly = models.ForeignKey(
        Assembly,
        on_delete=models.CASCADE,
        related_name='topics',
    )
    order = models.PositiveSmallIntegerField(default=0, help_text='Ordem de apresentação')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    requires_vote = models.BooleanField(
        default=True,
        help_text='Se True, os condóminos podem votar neste ponto',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']
        indexes = [
            models.Index(fields=['assembly', 'order']),
        ]

    def __str__(self):
        return f"{self.assembly.title} — {self.title}"


class AssemblyVote(models.Model):
    """Voto de uma unidade num ponto da ordem do dia."""

    class Choice(models.TextChoices):
        YES = 'YES', 'Sim'
        NO = 'NO', 'Não'
        ABSTAIN = 'ABSTAIN', 'Abstenção'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.ForeignKey(
        AssemblyTopic,
        on_delete=models.CASCADE,
        related_name='votes',
    )
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        related_name='assembly_votes',
    )
    choice = models.CharField(max_length=10, choices=Choice.choices)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [('topic', 'unit')]  # uma unidade, um voto por ponto
        indexes = [
            models.Index(fields=['topic']),
            models.Index(fields=['unit']),
        ]

    def __str__(self):
        return f"{self.unit.identifier} → {self.choice} ({self.topic.title})"
