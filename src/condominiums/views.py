"""
API ViewSets para Gestão de Condomínios.
Isolamento por tenant (schema); IsAuthenticated.
"""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Condominium, Unit, Fee, MaintenanceRequest, Notice
from .serializers import (
    CondominiumSerializer,
    UnitSerializer,
    FeeSerializer,
    MaintenanceRequestSerializer,
    NoticeSerializer,
)


class CondominiumViewSet(viewsets.ModelViewSet):
    """CRUD de condomínios (tenant-scoped via schema)."""
    queryset = Condominium.objects.all()
    serializer_class = CondominiumSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_queryset(self):
        return Condominium.objects.filter(is_active=True)


class UnitViewSet(viewsets.ModelViewSet):
    """CRUD de unidades; filtrado por condominium_id na URL."""
    serializer_class = UnitSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'unit_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return Unit.objects.filter(condominium_id=self.kwargs['condominium_pk'])

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())


class FeeViewSet(viewsets.ModelViewSet):
    """CRUD de quotas; filtrado por condominium_id na URL."""
    serializer_class = FeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'fee_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        qs = Fee.objects.filter(condominium_id=self.kwargs['condominium_pk'])
        period = self.request.query_params.get('period')
        if period:
            qs = qs.filter(period=period)
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        unit_id = self.request.query_params.get('unit')
        if unit_id:
            qs = qs.filter(unit_id=unit_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())


class MaintenanceRequestViewSet(viewsets.ModelViewSet):
    """CRUD de pedidos de manutenção; filtrado por condominium_id na URL."""
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'request_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return MaintenanceRequest.objects.filter(
            condominium_id=self.kwargs['condominium_pk']
        )

    def perform_create(self, serializer):
        serializer.save(
            condominium=self.get_condominium(),
            reported_by=self.request.user
        )


class NoticeViewSet(viewsets.ModelViewSet):
    """CRUD de avisos; filtrado por condominium_id na URL."""
    serializer_class = NoticeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'notice_pk'
    lookup_value_regex = '[0-9a-f-]+'

    def get_condominium(self):
        return get_object_or_404(
            Condominium,
            pk=self.kwargs['condominium_pk'],
            is_active=True
        )

    def get_queryset(self):
        return Notice.objects.filter(
            condominium_id=self.kwargs['condominium_pk']
        )

    def perform_create(self, serializer):
        serializer.save(condominium=self.get_condominium())
