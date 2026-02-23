from django.utils import timezone
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from properties.models import Property
from leads.models import Lead


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard(request):
    """
    Returns KPI counts for the agent dashboard.
    - total_properties: count of properties (assigned to user or agency)
    - active_leads: leads not closed (exclude NEGOCIO_FECHADO, PERDIDO)
    - closed_deals_month: leads with status NEGOCIO_FECHADO updated this month
    - revenue_month: placeholder (no deal amount on Lead model)
    """
    user = request.user
    now = timezone.now()

    # Properties: filter by agent_responsible for agents; all for system admin
    if getattr(user, 'role', None) == 'SYSTEM_ADMIN':
        properties_qs = Property.objects.all()
        leads_qs = Lead.objects.all()
    elif getattr(user, 'agency', None):
        # Agency users: properties of their agency (via agency relation if exists)
        # Property has no agency FK in current model; use agent_responsible
        properties_qs = Property.objects.filter(agent_responsible=user)
        # Leads: filter by assigned_to for consistency
        leads_qs = Lead.objects.filter(assigned_to=user)
    else:
        properties_qs = Property.objects.filter(agent_responsible=user)
        leads_qs = Lead.objects.filter(assigned_to=user)

    total_properties = properties_qs.count()
    active_leads = leads_qs.exclude(
        status__in=[Lead.Status.NEGOCIO_FECHADO, Lead.Status.PERDIDO]
    ).count()
    closed_deals_month = leads_qs.filter(
        status=Lead.Status.NEGOCIO_FECHADO,
        updated_at__year=now.year,
        updated_at__month=now.month,
    ).count()
    # No revenue field on Lead; return 0
    revenue_month = 0

    return Response({
        'total_properties': total_properties,
        'active_leads': active_leads,
        'closed_deals_month': closed_deals_month,
        'revenue_month': revenue_month,
    })
