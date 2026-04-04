"""
Testes para o app condominiums.
Executar em ambiente com BD configurada (ex.: Docker com PostGIS).
"""
from django.test import TestCase

# Placeholder: testes unitários e de API devem ser adicionados quando o ambiente
# tiver BD e tenant disponíveis (schema isolation).
# Ex.: test_condominium_serializer_validates_choices, test_fee_amount_non_negative,
# test_unit_unique_per_condominium, test_api_condominium_list_requires_auth.
class CondominiumsAppTestCase(TestCase):
    def test_app_config(self):
        from django.apps import apps
        config = apps.get_app_config('condominiums')
        self.assertEqual(config.verbose_name, 'Gestão de Condomínios')


# ── pytest-style tests added below ───────────────────────────────────────────

import pytest


class TestCondominiumModel:
    """Smoke tests for the Condominium model fields and defaults."""

    def test_condominium_has_required_fields(self):
        from condominiums.models import Condominium
        fields = [f.name for f in Condominium._meta.get_fields()]
        assert 'name' in fields
        assert 'is_active' in fields
        assert 'island' in fields
        assert 'currency' in fields

    def test_condominium_default_is_active(self):
        field = __import__('condominiums.models', fromlist=['Condominium']).Condominium._meta.get_field('is_active')
        assert field.default is True

    def test_condominium_default_currency_is_cve(self):
        from condominiums.models import Condominium
        field = Condominium._meta.get_field('currency')
        assert field.default == Condominium.Currency.CVE

    def test_condominium_str_returns_name(self):
        from condominiums.models import Condominium
        condo = Condominium.__new__(Condominium)
        condo.name = 'Residencial Palmeiras'
        result = Condominium.__str__(condo)
        assert result == 'Residencial Palmeiras'


class TestFeeModel:
    """Smoke tests for the Fee model choices and defaults."""

    def test_fee_status_choices_contain_paid(self):
        from condominiums.models import Fee
        statuses = [s[0] for s in Fee.Status.choices]
        assert 'PAID' in statuses

    def test_fee_status_choices_contain_overdue(self):
        from condominiums.models import Fee
        statuses = [s[0] for s in Fee.Status.choices]
        assert 'OVERDUE' in statuses

    def test_fee_default_status_is_pending(self):
        from condominiums.models import Fee
        field = Fee._meta.get_field('status')
        assert field.default == Fee.Status.PENDING


class TestReservationConflict:
    """Reservation.clean() must raise ValidationError for overlapping bookings."""

    @pytest.mark.django_db
    def test_non_overlapping_reservation_is_valid(self):
        """A reservation that does not overlap an existing one must not raise."""
        from django.core.exceptions import ValidationError
        from condominiums.models import Condominium, Unit, CommonArea, Reservation

        condo = Condominium.objects.create(name='Condo Test')
        unit = Unit.objects.create(condominium=condo, identifier='A1')
        area = CommonArea.objects.create(condominium=condo, name='Piscina')

        from datetime import datetime
        from django.utils import timezone

        Reservation.objects.create(
            common_area=area,
            unit=unit,
            resident_name='Alice',
            resident_phone='2389910001',
            start_datetime=datetime(2025, 6, 1, 8, 0, tzinfo=timezone.utc),
            end_datetime=datetime(2025, 6, 1, 10, 0, tzinfo=timezone.utc),
        )

        r2 = Reservation(
            common_area=area,
            unit=unit,
            resident_name='Bob',
            resident_phone='2389910002',
            start_datetime=datetime(2025, 6, 1, 11, 0, tzinfo=timezone.utc),
            end_datetime=datetime(2025, 6, 1, 13, 0, tzinfo=timezone.utc),
        )
        # Must not raise
        try:
            r2.clean()
        except ValidationError:
            pytest.fail("clean() raised ValidationError for a non-overlapping reservation.")

    @pytest.mark.django_db
    def test_overlapping_reservation_raises_validation_error(self):
        """A reservation that overlaps an existing confirmed booking must raise ValidationError."""
        from django.core.exceptions import ValidationError
        from condominiums.models import Condominium, Unit, CommonArea, Reservation

        condo = Condominium.objects.create(name='Condo Conflict')
        unit = Unit.objects.create(condominium=condo, identifier='B2')
        area = CommonArea.objects.create(condominium=condo, name='Salão de Festas')

        from datetime import datetime
        from django.utils import timezone

        Reservation.objects.create(
            common_area=area,
            unit=unit,
            resident_name='Carlos',
            resident_phone='2389910003',
            start_datetime=datetime(2025, 7, 1, 10, 0, tzinfo=timezone.utc),
            end_datetime=datetime(2025, 7, 1, 12, 0, tzinfo=timezone.utc),
            status=Reservation.Status.CONFIRMED,
        )

        overlapping = Reservation(
            common_area=area,
            unit=unit,
            resident_name='Diana',
            resident_phone='2389910004',
            start_datetime=datetime(2025, 7, 1, 11, 0, tzinfo=timezone.utc),
            end_datetime=datetime(2025, 7, 1, 13, 0, tzinfo=timezone.utc),
        )

        with pytest.raises(ValidationError):
            overlapping.clean()

    @pytest.mark.django_db
    def test_end_before_start_raises_validation_error(self):
        """A reservation where end_datetime <= start_datetime must raise ValidationError."""
        from django.core.exceptions import ValidationError
        from condominiums.models import Condominium, Unit, CommonArea, Reservation

        condo = Condominium.objects.create(name='Condo Order')
        unit = Unit.objects.create(condominium=condo, identifier='C3')
        area = CommonArea.objects.create(condominium=condo, name='Ginásio')

        from datetime import datetime
        from django.utils import timezone

        bad = Reservation(
            common_area=area,
            unit=unit,
            resident_name='Eve',
            resident_phone='2389910005',
            start_datetime=datetime(2025, 8, 1, 14, 0, tzinfo=timezone.utc),
            end_datetime=datetime(2025, 8, 1, 12, 0, tzinfo=timezone.utc),
        )
        with pytest.raises(ValidationError):
            bad.clean()


class TestMaintenanceRequestModel:
    """Smoke tests for MaintenanceRequest choices and defaults."""

    def test_status_choices_contain_open_and_resolved(self):
        from condominiums.models import MaintenanceRequest
        statuses = [s[0] for s in MaintenanceRequest.Status.choices]
        assert 'OPEN' in statuses
        assert 'RESOLVED' in statuses

    def test_priority_choices_contain_urgent(self):
        from condominiums.models import MaintenanceRequest
        priorities = [p[0] for p in MaintenanceRequest.Priority.choices]
        assert 'URGENT' in priorities

    def test_default_status_is_open(self):
        from condominiums.models import MaintenanceRequest
        field = MaintenanceRequest._meta.get_field('status')
        assert field.default == MaintenanceRequest.Status.OPEN
