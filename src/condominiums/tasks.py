"""
Celery tasks para notificações de condomínio.

Periodicidade (ver celery_app.py beat_schedule):
- send_overdue_fee_reminders: diário às 09h00 (hora CV)
- send_scheduled_notices:     de hora em hora
- send_reservation_reminders: diário às 08h00 UTC
"""
import logging
from datetime import timedelta

from celery import shared_task
from django.utils import timezone

logger = logging.getLogger(__name__)


@shared_task(name='condominiums.tasks.send_overdue_fee_reminders', bind=True, max_retries=2)
def send_overdue_fee_reminders(self):
    """
    Envia lembretes WhatsApp para quotas em atraso há mais de 3 dias.
    Retorna número de mensagens enviadas com sucesso.
    """
    from .models import Fee
    from .notifications import WhatsAppNotificationService

    three_days_ago = timezone.now().date() - timedelta(days=3)
    overdue_fees = (
        Fee.objects
        .filter(status='OVERDUE', due_date__lt=three_days_ago)
        .select_related('unit', 'condominium')
    )

    sent, failed = 0, 0
    for fee in overdue_fees:
        try:
            if WhatsAppNotificationService.send_fee_reminder(fee):
                sent += 1
            else:
                failed += 1
        except Exception as exc:
            logger.error('send_overdue_fee_reminders: fee %s error: %s', fee.id, exc)
            failed += 1

    logger.info('send_overdue_fee_reminders: sent=%d failed=%d', sent, failed)
    return {'sent': sent, 'failed': failed}


@shared_task(name='condominiums.tasks.send_scheduled_notices', bind=True, max_retries=2)
def send_scheduled_notices(self):
    """
    Publica avisos agendados cujo published_at já passou e envia WhatsApp
    para todos os proprietários de unidades do condomínio.
    """
    from .models import Notice, Unit
    from .notifications import WhatsAppNotificationService

    now = timezone.now()

    # Avisos cujo published_at chegou mas ainda não foram enviados
    # (usamos um campo proxy: se published_at <= now, considera publicado)
    pending_notices = Notice.objects.filter(
        published_at__lte=now,
        published_at__gt=now - timedelta(hours=1),  # janela da última hora
    ).select_related('condominium')

    sent, failed = 0, 0
    for notice in pending_notices:
        units = Unit.objects.filter(
            condominium=notice.condominium,
            owner_phone__isnull=False,
        ).exclude(owner_phone='')

        for unit in units:
            try:
                ok = WhatsAppNotificationService.send_notice(
                    notice,
                    recipient_phone=unit.owner_phone,
                    recipient_name=unit.owner_name or 'Proprietário',
                )
                if ok:
                    sent += 1
                else:
                    failed += 1
            except Exception as exc:
                logger.error(
                    'send_scheduled_notices: notice %s unit %s error: %s',
                    notice.id, unit.id, exc,
                )
                failed += 1

    logger.info('send_scheduled_notices: sent=%d failed=%d', sent, failed)
    return {'sent': sent, 'failed': failed}


@shared_task(name='condominiums.tasks.send_reservation_reminders', bind=True, max_retries=2)
def send_reservation_reminders(self):
    """
    Envia lembretes de reservas para o dia seguinte.
    """
    from .models import Reservation
    from .notifications import WhatsAppNotificationService

    now = timezone.now()
    tomorrow_start = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow_end = tomorrow_start.replace(hour=23, minute=59, second=59)

    reservations = Reservation.objects.filter(
        start_datetime__range=(tomorrow_start, tomorrow_end),
        status__in=['PENDING', 'CONFIRMED'],
    ).select_related('common_area__condominium')

    sent, failed = 0, 0
    for res in reservations:
        try:
            if WhatsAppNotificationService.send_reservation_reminder(res):
                sent += 1
            else:
                failed += 1
        except Exception as exc:
            logger.error('send_reservation_reminders: reservation %s error: %s', res.id, exc)
            failed += 1

    logger.info('send_reservation_reminders: sent=%d failed=%d', sent, failed)
    return {'sent': sent, 'failed': failed}


# ---------------------------------------------------------------------------
# One-shot tasks (triggered by signals)
# ---------------------------------------------------------------------------

@shared_task(name='condominiums.tasks.notify_reservation_confirmed')
def notify_reservation_confirmed(reservation_id: str):
    """Envia confirmação imediata quando uma reserva é confirmada."""
    from .models import Reservation
    from .notifications import WhatsAppNotificationService

    try:
        reservation = Reservation.objects.select_related(
            'common_area__condominium'
        ).get(id=reservation_id)
        WhatsAppNotificationService.send_reservation_confirmed(reservation)
    except Exception as exc:
        logger.error('notify_reservation_confirmed: %s error: %s', reservation_id, exc)


@shared_task(name='condominiums.tasks.notify_maintenance_update')
def notify_maintenance_update(maintenance_id: str):
    """Envia actualização de manutenção ao prestador."""
    from .models import MaintenanceRequest
    from .notifications import WhatsAppNotificationService

    try:
        maintenance = MaintenanceRequest.objects.select_related('condominium').get(
            id=maintenance_id
        )
        WhatsAppNotificationService.send_maintenance_update(maintenance)
    except Exception as exc:
        logger.error('notify_maintenance_update: %s error: %s', maintenance_id, exc)
