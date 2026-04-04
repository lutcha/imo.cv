from django.urls import re_path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CondominiumViewSet,
    UnitViewSet,
    FeeViewSet,
    MaintenanceRequestViewSet,
    NoticeViewSet,
    CommonAreaViewSet,
    ReservationViewSet,
    AssemblyViewSet,
    AssemblyTopicViewSet,
    AssemblyVoteViewSet,
    MonthlyReportView,
    exchange_rates,
    public_condominiums,
)
from .resident_auth import (
    request_otp,
    verify_otp,
    logout_resident,
    resident_dashboard,
    dev_get_otp,
)

# UUID pattern — captures the standard 8-4-4-4-12 hyphenated format.
# Using re_path throughout so every URL accepts an optional trailing slash.
# This is required because Next.js rewrites strip trailing slashes before
# forwarding to Django, and APPEND_SLASH = False prevents auto-redirect.
UUID = r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

router = DefaultRouter(trailing_slash=False)
router.register(r'', CondominiumViewSet, basename='condominium')

urlpatterns = [
    # Explicit retrieve/update/delete with optional trailing slash
    # (router with trailing_slash=False generates ^{pk}$ which misses trailing slash)
    re_path(
        rf'^(?P<pk>{UUID})/?$',
        CondominiumViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}),
        name='condominium-detail',
    ),
    re_path(r'^', include(router.urls)),
    # Units
    re_path(
        rf'^(?P<condominium_pk>{UUID})/units/?$',
        UnitViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-units-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/units/(?P<unit_pk>{UUID})/?$',
        UnitViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-unit-detail',
    ),
    # Fees
    re_path(
        rf'^(?P<condominium_pk>{UUID})/fees/?$',
        FeeViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-fees-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/fees/(?P<fee_pk>{UUID})/?$',
        FeeViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-fee-detail',
    ),
    # Maintenance Requests
    re_path(
        rf'^(?P<condominium_pk>{UUID})/maintenance-requests/?$',
        MaintenanceRequestViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-maintenance-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/maintenance-requests/(?P<request_pk>{UUID})/?$',
        MaintenanceRequestViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-maintenance-detail',
    ),
    # Notices
    re_path(
        rf'^(?P<condominium_pk>{UUID})/notices/?$',
        NoticeViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-notices-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/notices/(?P<notice_pk>{UUID})/?$',
        NoticeViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-notice-detail',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/notices/(?P<notice_pk>{UUID})/send-whatsapp/?$',
        NoticeViewSet.as_view({'post': 'send_whatsapp'}),
        name='condominium-notice-send-whatsapp',
    ),
    # Common Areas (Sprint 2-A)
    re_path(
        rf'^(?P<condominium_pk>{UUID})/common-areas/?$',
        CommonAreaViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-common-areas-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/common-areas/(?P<pk>{UUID})/?$',
        CommonAreaViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-common-area-detail',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/common-areas/(?P<pk>{UUID})/availability/?$',
        CommonAreaViewSet.as_view({'get': 'availability'}),
        name='condominium-common-area-availability',
    ),
    # Reservations
    re_path(
        rf'^(?P<condominium_pk>{UUID})/common-areas/(?P<common_area_pk>{UUID})/reservations/?$',
        ReservationViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-reservations-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/common-areas/(?P<common_area_pk>{UUID})/reservations/(?P<reservation_pk>{UUID})/?$',
        ReservationViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-reservation-detail',
    ),
    # Analytics (Sprint 7-B)
    re_path(
        rf'^(?P<pk>{UUID})/analytics/?$',
        CondominiumViewSet.as_view({'get': 'analytics'}),
        name='condominium-analytics',
    ),
    # Relatório Mensal PDF (Sprint 9)
    re_path(
        rf'^(?P<pk>{UUID})/report/?$',
        MonthlyReportView.as_view(),
        name='condominium-monthly-report',
    ),
    # Assembleia e Votação (Sprint 8)
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/?$',
        AssemblyViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-assemblies-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/(?P<assembly_pk>{UUID})/?$',
        AssemblyViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-assembly-detail',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/(?P<assembly_pk>{UUID})/open/?$',
        AssemblyViewSet.as_view({'post': 'open_assembly'}),
        name='condominium-assembly-open',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/(?P<assembly_pk>{UUID})/close/?$',
        AssemblyViewSet.as_view({'post': 'close_assembly'}),
        name='condominium-assembly-close',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/(?P<assembly_pk>{UUID})/topics/?$',
        AssemblyTopicViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-assembly-topics-list',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/(?P<assembly_pk>{UUID})/topics/(?P<topic_pk>{UUID})/?$',
        AssemblyTopicViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-assembly-topic-detail',
    ),
    re_path(
        rf'^(?P<condominium_pk>{UUID})/assemblies/(?P<assembly_pk>{UUID})/topics/(?P<topic_pk>{UUID})/votes/?$',
        AssemblyVoteViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-assembly-topic-votes',
    ),
    # Exchange Rates (Sprint 4-A)
    re_path(r'^exchange-rates/?$', exchange_rates, name='exchange-rates'),
    # Public list for resident login — no auth required (Sprint 6)
    re_path(r'^public/?$', public_condominiums, name='public-condominiums'),
    # Resident Authentication & Dashboard (Sprint 5/6)
    re_path(r'^resident/request-otp/?$', request_otp, name='resident-request-otp'),
    re_path(r'^resident/verify-otp/?$', verify_otp, name='resident-verify-otp'),
    re_path(r'^resident/logout/?$', logout_resident, name='resident-logout'),
    re_path(r'^resident/dashboard/?$', resident_dashboard, name='resident-dashboard'),
    re_path(r'^resident/dev-otp/?$', dev_get_otp, name='resident-dev-otp'),
]
