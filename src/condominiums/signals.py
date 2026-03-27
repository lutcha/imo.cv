"""
Django signals para condomínios.
Dispara notificações WhatsApp assíncronas via Celery após eventos de modelo.

Defensivo: falhas de task nunca propagam exceção ao request original.
"""
import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Reservation, MaintenanceRequest

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Reservation)
def reservation_post_save(sender, instance, created, **kwargs):
    """
    - Criada com status CONFIRMED → envia confirmação imediata
    - Actualizada para CONFIRMED (de outro estado) → envia confirmação
    """
    if instance.status != 'CONFIRMED':
        return

    try:
        from .tasks import notify_reservation_confirmed
        notify_reservation_confirmed.delay(str(instance.id))
    except Exception as exc:
        # Never let a failed Celery dispatch break the request
        logger.error('reservation_post_save signal error: %s', exc)


@receiver(post_save, sender=MaintenanceRequest)
def maintenance_post_save(sender, instance, created, **kwargs):
    """
    Notifica o prestador quando o estado de uma manutenção muda.
    Só envia se assigned_to_phone estiver preenchido.
    """
    if not instance.assigned_to_phone:
        return

    try:
        from .tasks import notify_maintenance_update
        notify_maintenance_update.delay(str(instance.id))
    except Exception as exc:
        logger.error('maintenance_post_save signal error: %s', exc)
