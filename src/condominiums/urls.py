from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CondominiumViewSet,
    UnitViewSet,
    FeeViewSet,
    MaintenanceRequestViewSet,
    NoticeViewSet,
)

router = DefaultRouter(trailing_slash=False)
router.register(r'', CondominiumViewSet, basename='condominium')

urlpatterns = [
    path('', include(router.urls)),
    path(
        '<uuid:condominium_pk>/units/',
        UnitViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-units-list',
    ),
    path(
        '<uuid:condominium_pk>/units/<uuid:unit_pk>/',
        UnitViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-unit-detail',
    ),
    path(
        '<uuid:condominium_pk>/fees/',
        FeeViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-fees-list',
    ),
    path(
        '<uuid:condominium_pk>/fees/<uuid:fee_pk>/',
        FeeViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-fee-detail',
    ),
    path(
        '<uuid:condominium_pk>/maintenance-requests/',
        MaintenanceRequestViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-maintenance-list',
    ),
    path(
        '<uuid:condominium_pk>/maintenance-requests/<uuid:request_pk>/',
        MaintenanceRequestViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-maintenance-detail',
    ),
    path(
        '<uuid:condominium_pk>/notices/',
        NoticeViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='condominium-notices-list',
    ),
    path(
        '<uuid:condominium_pk>/notices/<uuid:notice_pk>/',
        NoticeViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='condominium-notice-detail',
    ),
]
