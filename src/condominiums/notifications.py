"""
Serviço de Notificações WhatsApp para Condomínios.
Integração com WhatsApp Business API para envio de mensagens automáticas.

Fontes de dados CV:
- 92% dos cabo-verdianos usam WhatsApp como canal primário de comunicação
- Formato telefone CV: +238 XXX XXXX
"""
import logging
from typing import Optional
from datetime import datetime
from django.conf import settings
from django.utils import timezone

logger = logging.getLogger(__name__)


class WhatsAppNotificationService:
    """
    Serviço para envio de notificações via WhatsApp.
    
    Em produção, integrar com:
    - Twilio WhatsApp API: https://www.twilio.com/whatsapp
    - Meta WhatsApp Business API: https://business.whatsapp.com/
    - Zenvia: https://www.zenvia.com/ (presente em África)
    
    Para demo: simula envio com logging.
    """
    
    @staticmethod
    def _format_phone_cape_verde(phone: str) -> str:
        """
        Formata número de telefone de Cabo Verde para formato internacional.
        Ex: '+238 991 23 45' → '+2389912345'
        """
        if not phone:
            return None
        
        # Remove espaços e caracteres especiais
        cleaned = ''.join(c for c in phone if c.isdigit() or c == '+')
        
        # Garante que começa com +238
        if cleaned.startswith('+238'):
            return cleaned
        elif cleaned.startswith('238'):
            return '+' + cleaned
        elif cleaned.startswith('9') and len(cleaned) == 7:
            return '+238' + cleaned
        else:
            logger.warning(f'Formato de telefone inválido: {phone}')
            return None
    
    @staticmethod
    def _send_message(to_phone: str, message: str) -> bool:
        """
        Envia mensagem WhatsApp.
        
        Em produção, usar API real:
        ```
        from twilio.rest import Client
        
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        
        message = client.messages.create(
            from_='whatsapp:+14155238886',  # Twilio sandbox
            body=message,
            to=f'whatsapp:{to_phone}'
        )
        ```
        
        Para demo: apenas log.
        """
        try:
            # TODO: Implementar com API real em produção
            logger.info(f"[WhatsApp] Para: {to_phone}")
            logger.info(f"[WhatsApp] Mensagem: {message[:200]}...")
            
            # Simular sucesso
            return True
            
        except Exception as e:
            logger.error(f"Erro ao enviar WhatsApp: {e}")
            return False
    
    @classmethod
    def send_fee_reminder(cls, fee) -> bool:
        """
        Envia lembrete de quota em atraso.
        
        Template:
        "Olá {owner_name}! A sua quota do {condo_name} no valor de {amount} CVE
        venceu em {due_date}. Por favor regularize. imo.cv"
        """
        if not fee.unit or not fee.unit.owner_phone:
            logger.warning(f"Fee {fee.id} sem telefone para notificação")
            return False
        
        phone = cls._format_phone_cape_verde(fee.unit.owner_phone)
        if not phone:
            return False
        
        # Formatar valor
        amount_str = f"{int(fee.amount):,}".replace(',', ' ')
        
        # Formatar data
        due_date_str = fee.due_date.strftime('%d/%m/%Y')
        
        message = (
            f"Olá {fee.unit.owner_name}!\n\n"
            f"A sua quota do {fee.condominium.name} no valor de {amount_str} CVE "
            f"venceu em {due_date_str}.\n\n"
            f"Por favor regularize a sua situação.\n\n"
            f"Obrigado,\n"
            f"{fee.condominium.name}\n"
            f"imo.cv"
        )
        
        return cls._send_message(phone, message)
    
    @classmethod
    def send_reservation_confirmed(cls, reservation) -> bool:
        """
        Envia confirmação de reserva de área comum.
        
        Template:
        "Reserva confirmada! {area_name} — {date} {start_time}-{end_time}.
        Código: {reservation_id[:8]}"
        """
        phone = cls._format_phone_cape_verde(reservation.resident_phone)
        if not phone:
            return False
        
        # Formatar data e hora
        date_str = reservation.start_datetime.strftime('%d/%m/%Y')
        start_time = reservation.start_datetime.strftime('%H:%M')
        end_time = reservation.end_datetime.strftime('%H:%M')
        
        # Código curto da reserva
        code = str(reservation.id)[:8].replace('-', '')
        
        message = (
            f"✅ Reserva confirmada!\n\n"
            f"{reservation.common_area.name}\n"
            f"{date_str} — {start_time} às {end_time}\n\n"
            f"Código: {code}\n\n"
            f"Boa estadia!\n"
            f"{reservation.common_area.condominium.name}"
        )
        
        return cls._send_message(phone, message)
    
    @classmethod
    def send_reservation_reminder(cls, reservation) -> bool:
        """
        Envia lembrete de reserva 24h antes.
        """
        phone = cls._format_phone_cape_verde(reservation.resident_phone)
        if not phone:
            return False
        
        date_str = reservation.start_datetime.strftime('%d/%m/%Y')
        start_time = reservation.start_datetime.strftime('%H:%M')
        
        message = (
            f"⏰ Lembrete de Reserva\n\n"
            f"Amanhã tem reserva em {reservation.common_area.name}\n"
            f"{date_str} às {start_time}\n\n"
            f"Não se esqueça!\n"
            f"{reservation.common_area.condominium.name}"
        )
        
        return cls._send_message(phone, message)
    
    @classmethod
    def send_maintenance_update(cls, maintenance) -> bool:
        """
        Envia atualização de estado de manutenção.
        
        Template:
        "Actualização da manutenção #{id}: {status_display}.
        {resolution_notes if resolved}"
        """
        # Se não há telefone atribuído, não envia
        if not maintenance.assigned_to_phone:
            return False
        
        phone = cls._format_phone_cape_verde(maintenance.assigned_to_phone)
        if not phone:
            return False
        
        status_labels = {
            'OPEN': 'Aberto',
            'IN_PROGRESS': 'Em Progresso',
            'RESOLVED': 'Resolvido',
        }
        status_display = status_labels.get(maintenance.status, maintenance.status)
        
        message = (
            f"🔧 Actualização da Manutenção\n\n"
            f"#{maintenance.id}: {maintenance.title}\n"
            f"Estado: {status_display}\n"
        )
        
        if maintenance.status == 'RESOLVED' and maintenance.resolution_notes:
            message += f"\nNotas: {maintenance.resolution_notes}\n"
        
        message += f"\n{maintenance.condominium.name}"
        
        return cls._send_message(phone, message)
    
    @classmethod
    def send_notice(cls, notice, recipient_phone: str, recipient_name: str) -> bool:
        """
        Envia aviso/comunicado do condomínio.
        
        Template:
        "{condo_name}: {title}\n\n{body}"
        """
        phone = cls._format_phone_cape_verde(recipient_phone)
        if not phone:
            return False
        
        message = (
            f"📢 {notice.condominium.name}\n\n"
            f"*{notice.title}*\n\n"
            f"{notice.body}\n\n"
            f"imo.cv"
        )
        
        return cls._send_message(phone, message)
    
    @classmethod
    def send_otp(cls, phone: str, otp_code: str, expires_minutes: int = 10) -> bool:
        """
        Envia código OTP para autenticação de morador.
        
        Template:
        "imo.cv: Seu código de acesso é {code}. Válido por {minutes} minutos."
        """
        formatted_phone = cls._format_phone_cape_verde(phone)
        if not formatted_phone:
            return False
        
        message = (
            f"🔐 imo.cv\n\n"
            f"Seu código de acesso é: *{otp_code}*\n\n"
            f"Válido por {expires_minutes} minutos.\n\n"
            f"Não partilhe este código com ninguém."
        )
        
        return cls._send_message(formatted_phone, message)


# =============================================================================
# Tasks Celery para envio assíncrono
# =============================================================================

def send_fee_reminder_task(fee_id: str) -> bool:
    """Task Celery para enviar lembrete de quota."""
    try:
        from condominiums.models import Fee
        fee = Fee.objects.get(id=fee_id)
        return WhatsAppNotificationService.send_fee_reminder(fee)
    except Fee.DoesNotExist:
        logger.error(f"Fee {fee_id} não encontrado")
        return False
    except Exception as e:
        logger.error(f"Erro na task: {e}")
        return False


def send_reservation_reminder_task() -> int:
    """
    Task Celery para enviar lembretes de reservas nas próximas 24h.
    Retorna número de mensagens enviadas.
    """
    from condominiums.models import Reservation
    from datetime import timedelta
    
    now = timezone.now()
    tomorrow = now + timedelta(days=1)
    tomorrow_end = tomorrow.replace(hour=23, minute=59, second=59)
    
    # Reservas para amanhã
    reservations = Reservation.objects.filter(
        start_datetime__range=[tomorrow, tomorrow_end],
        status__in=['PENDING', 'CONFIRMED']
    )
    
    sent_count = 0
    for res in reservations:
        if WhatsAppNotificationService.send_reservation_reminder(res):
            sent_count += 1
    
    return sent_count


def send_overdue_fees_reminder_task() -> int:
    """
    Task Celery para enviar lembretes de quotas em atraso.
    Correr diariamente às 9h.
    """
    from condominiums.models import Fee
    from datetime import timedelta
    
    # Quotas em atraso há mais de 3 dias
    three_days_ago = timezone.now().date() - timedelta(days=3)
    overdue_fees = Fee.objects.filter(
        status='OVERDUE',
        due_date__lt=three_days_ago
    ).select_related('unit', 'condominium')
    
    sent_count = 0
    for fee in overdue_fees:
        if WhatsAppNotificationService.send_fee_reminder(fee):
            sent_count += 1
    
    return sent_count
