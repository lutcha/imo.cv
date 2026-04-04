from django.db.models.signals import post_save
from django.dispatch import receiver
from leads.models import Lead
from core.models import Notification


@receiver(post_save, sender=Lead)
def notify_new_lead(sender, instance, created, **kwargs):
    if created and instance.assigned_to:
        Notification.objects.create(
            user=instance.assigned_to,
            type=Notification.Type.NEW_LEAD,
            title=f'Novo lead: {instance.full_name}',
            body=f'Fonte: {instance.source}',
            action_url=f'/agente/leads/{instance.id}',
        )
