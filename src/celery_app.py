"""
Celery application for imo.cv.
Broker: Redis (docker: imocv_redis:6379)
"""
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'imocv.settings')

app = Celery('imocv')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# ---------------------------------------------------------------------------
# Beat schedule — periodic tasks
# ---------------------------------------------------------------------------

app.conf.beat_schedule = {
    # Daily at 09:00 Cape Verde time (UTC-1 → 10:00 UTC)
    'overdue-fee-reminders-daily': {
        'task': 'condominiums.tasks.send_overdue_fee_reminders',
        'schedule': crontab(hour=10, minute=0),
    },
    # Every hour — publish scheduled notices
    'send-scheduled-notices-hourly': {
        'task': 'condominiums.tasks.send_scheduled_notices',
        'schedule': crontab(minute=0),
    },
    # Daily at 08:00 UTC — reservation reminders for tomorrow
    'reservation-reminders-daily': {
        'task': 'condominiums.tasks.send_reservation_reminders',
        'schedule': crontab(hour=8, minute=0),
    },
}
