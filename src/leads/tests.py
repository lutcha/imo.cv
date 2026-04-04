import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


# ── Model tests (no DB needed — test pure class-level logic) ──────────────────

class TestLeadModelChoices:
    """Validate that the Status and Priority TextChoices contain the required values."""

    def test_status_choices_contain_required_values(self):
        from leads.models import Lead
        statuses = [s[0] for s in Lead.Status.choices]
        assert 'NOVO' in statuses
        assert 'NEGOCIO_FECHADO' in statuses
        assert 'PERDIDO' in statuses

    def test_priority_choices_contain_required_values(self):
        from leads.models import Lead
        priorities = [p[0] for p in Lead.Priority.choices]
        assert 'BAIXA' in priorities
        assert 'ALTA' in priorities

    def test_default_status_is_novo(self):
        from leads.models import Lead
        field = Lead._meta.get_field('status')
        assert field.default == Lead.Status.NOVO

    def test_default_priority_is_media(self):
        from leads.models import Lead
        field = Lead._meta.get_field('priority')
        assert field.default == Lead.Priority.MEDIA


class TestLeadStrRepresentation:
    """Lead.__str__ must include the full name of the contact."""

    def test_str_includes_full_name(self):
        from leads.models import Lead
        lead = Lead.__new__(Lead)
        lead.full_name = 'João Silva'
        lead.status = Lead.Status.NOVO
        # Call __str__ via the actual implementation (avoids relying on DB)
        result = Lead.__str__(lead)
        assert 'João Silva' in result

    def test_str_includes_status_display(self):
        from leads.models import Lead
        lead = Lead.__new__(Lead)
        lead.full_name = 'Maria Fonseca'
        lead.status = Lead.Status.QUALIFICADO
        result = Lead.__str__(lead)
        assert 'Qualificado' in result


# ── API tests — authentication guard ─────────────────────────────────────────

@pytest.mark.django_db
class TestLeadAPIAuth:
    """Unauthenticated requests to lead endpoints must be rejected."""

    def test_list_requires_auth(self, client):
        """GET /api/leads/ without a token must return 401 or 403."""
        response = client.get('/api/leads/')
        assert response.status_code in (401, 403)

    def test_export_requires_auth(self, client):
        """GET /api/leads/export/ without a token must return 401 or 403."""
        response = client.get('/api/leads/export/')
        assert response.status_code in (401, 403)

    def test_create_requires_auth(self, client):
        """POST /api/leads/ without a token must return 401 or 403."""
        response = client.post('/api/leads/', data={}, content_type='application/json')
        assert response.status_code in (401, 403)
