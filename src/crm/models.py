from django.db import models
from leads.models import Lead
from django.conf import settings

import uuid

class CRMInteraction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class InteractionType(models.TextChoices):
        CHAMADA = 'CHAMADA', 'Chamada Telefónica'
        EMAIL = 'EMAIL', 'E-mail'
        WHATSAPP = 'WHATSAPP', 'WhatsApp'
        REUNIAO = 'REUNIAO', 'Reunião Presencial'
        VISITA = 'VISITA', 'Visita ao Imóvel'
        OUTRO = 'OUTRO', 'Outro'

    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        related_name='interactions'
    )
    
    agent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='crm_interactions'
    )
    
    interaction_type = models.CharField(
        max_length=20,
        choices=InteractionType.choices,
        default=InteractionType.CHAMADA
    )
    
    summary = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    interaction_date = models.DateTimeField(auto_now_add=True)
    follow_up_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-interaction_date']

    def __str__(self):
        return f"{self.interaction_type} with {self.lead.full_name}"
