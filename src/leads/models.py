from django.db import models
from properties.models import Property
from django.conf import settings

import uuid

class Lead(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class Status(models.TextChoices):
        NOVO = 'NOVO', 'Novo'
        CONTACTADO = 'CONTACTADO', 'Contactado'
        QUALIFICADO = 'QUALIFICADO', 'Qualificado'
        VISITA_AGENDADA = 'VISITA_AGENDADA', 'Visita Agendada'
        PROPOSTA_FEITA = 'PROPOSTA_FEITA', 'Proposta Feita'
        NEGOCIO_FECHADO = 'NEGOCIO_FECHADO', 'Negócio Fechado'
        PERDIDO = 'PERDIDO', 'Perdido'

    class Priority(models.TextChoices):
        BAIXA = 'BAIXA', 'Baixa'
        MEDIA = 'MEDIA', 'Média'
        ALTA = 'ALTA', 'Alta'

    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    # Context (Property of interest)
    property = models.ForeignKey(
        Property, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='leads'
    )
    
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.NOVO
    )
    
    priority = models.CharField(
        max_length=10, 
        choices=Priority.choices, 
        default=Priority.MEDIA
    )
    
    # Internal management
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_leads'
    )
    
    notes = models.TextField(blank=True)
    source = models.CharField(max_length=100, default='Marketplace') # Ex: Facebook, Google, Direto
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.get_status_display()}"
