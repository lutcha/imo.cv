import pytest
from rest_framework.test import APIClient


@pytest.mark.django_db
class TestAnalyticsDashboardAuth:
    """Unauthenticated requests must be rejected."""

    def test_dashboard_requires_auth(self, client):
        """GET /api/analytics/dashboard/ without a token must return 401 or 403."""
        response = client.get('/api/analytics/dashboard/')
        assert response.status_code in (401, 403)


@pytest.mark.django_db
class TestAnalyticsDashboardResponse:
    """Authenticated requests must receive the four KPI keys."""

    def test_dashboard_returns_expected_keys(self, django_user_model):
        """With an authenticated user the dashboard returns all expected KPI fields."""
        user = django_user_model.objects.create_user(
            username='test_agent',
            email='test@imo.cv',
            password='testpass123',
        )
        api = APIClient()
        api.force_authenticate(user=user)

        response = api.get('/api/analytics/dashboard/')

        assert response.status_code == 200
        data = response.json()
        assert 'total_properties' in data
        assert 'active_leads' in data
        assert 'closed_deals_month' in data
        assert 'revenue_month' in data
        assert 'active_leads_trend' in data

    def test_dashboard_numeric_fields_are_non_negative(self, django_user_model):
        """All integer KPI values must be zero or positive for a fresh user."""
        user = django_user_model.objects.create_user(
            username='test_agent2',
            email='test2@imo.cv',
            password='testpass123',
        )
        api = APIClient()
        api.force_authenticate(user=user)

        response = api.get('/api/analytics/dashboard/')

        assert response.status_code == 200
        data = response.json()
        assert data['total_properties'] >= 0
        assert data['active_leads'] >= 0
        assert data['closed_deals_month'] >= 0
        assert data['revenue_month'] >= 0

    def test_dashboard_trend_field_is_valid_string(self, django_user_model):
        """active_leads_trend must be one of the three expected string values."""
        user = django_user_model.objects.create_user(
            username='test_agent3',
            email='test3@imo.cv',
            password='testpass123',
        )
        api = APIClient()
        api.force_authenticate(user=user)

        response = api.get('/api/analytics/dashboard/')

        assert response.status_code == 200
        assert response.json()['active_leads_trend'] in ('up', 'down', 'neutral')
