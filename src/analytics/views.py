from django.utils import timezone
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from properties.models import Property
from leads.models import Lead


def _trend(current, previous):
    """Returns trend direction and absolute percentage change."""
    if previous == 0:
        return {'trend': 'neutral', 'change': 0}
    pct = round((current - previous) / previous * 100)
    return {
        'trend': 'up' if current >= previous else 'down',
        'change': abs(pct),
    }


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard(request):
    """
    Returns KPI counts + month-over-month trends for the agent dashboard.
    """
    user = request.user
    now = timezone.now()

    if getattr(user, 'role', None) == 'SYSTEM_ADMIN':
        properties_qs = Property.objects.all()
        leads_qs = Lead.objects.all()
    elif getattr(user, 'agency', None):
        properties_qs = Property.objects.filter(agent_responsible=user)
        leads_qs = Lead.objects.filter(assigned_to=user)
    else:
        properties_qs = Property.objects.filter(agent_responsible=user)
        leads_qs = Lead.objects.filter(assigned_to=user)

    if now.month == 1:
        prev_year, prev_month = now.year - 1, 12
    else:
        prev_year, prev_month = now.year, now.month - 1

    total_properties = properties_qs.count()
    active_leads = leads_qs.exclude(
        status__in=[Lead.Status.NEGOCIO_FECHADO, Lead.Status.PERDIDO]
    ).count()
    closed_deals_month = leads_qs.filter(
        status=Lead.Status.NEGOCIO_FECHADO,
        updated_at__year=now.year,
        updated_at__month=now.month,
    ).count()

    new_leads_this_month = leads_qs.filter(
        created_at__year=now.year,
        created_at__month=now.month,
    ).count()
    new_leads_prev_month = leads_qs.filter(
        created_at__year=prev_year,
        created_at__month=prev_month,
    ).count()
    closed_prev_month = leads_qs.filter(
        status=Lead.Status.NEGOCIO_FECHADO,
        updated_at__year=prev_year,
        updated_at__month=prev_month,
    ).count()

    leads_trend = _trend(new_leads_this_month, new_leads_prev_month)
    closed_trend = _trend(closed_deals_month, closed_prev_month)

    return Response({
        'total_properties': total_properties,
        'active_leads': active_leads,
        'active_leads_trend': leads_trend['trend'],
        'active_leads_change': leads_trend['change'],
        'closed_deals_month': closed_deals_month,
        'closed_deals_trend': closed_trend['trend'],
        'closed_deals_change': closed_trend['change'],
        'revenue_month': 0,
    })
