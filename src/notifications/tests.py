import pytest
from rest_framework.test import APIClient
from core.models import Notification


@pytest.mark.django_db
class TestNotificationsAPIAuth:
    """Unauthenticated requests to the notifications endpoint must be rejected."""

    def test_list_requires_auth(self, client):
        response = client.get('/api/notifications/')
        assert response.status_code in (401, 403)


@pytest.mark.django_db
class TestNotificationsListEmpty:
    """A new user with no notifications receives an empty list."""

    def test_list_returns_empty_for_new_user(self, django_user_model):
        user = django_user_model.objects.create_user(
            username='notif_test',
            email='notif@imo.cv',
            password='pass123',
        )
        api = APIClient()
        api.force_authenticate(user=user)

        response = api.get('/api/notifications/')

        assert response.status_code == 200
        assert response.json() == []


@pytest.mark.django_db
class TestNotificationsMarkRead:
    """Creating a notification and marking it as read via the API."""

    def test_create_and_mark_read(self, django_user_model):
        user = django_user_model.objects.create_user(
            username='notif_test2',
            email='notif2@imo.cv',
            password='pass123',
        )
        notif = Notification.objects.create(
            user=user,
            type=Notification.Type.NEW_LEAD,
            title='Novo lead recebido',
        )
        assert not notif.is_read, "Notification must be unread immediately after creation."

        api = APIClient()
        api.force_authenticate(user=user)
        resp = api.post(f'/api/notifications/{notif.pk}/read/')

        assert resp.status_code == 204
        notif.refresh_from_db()
        assert notif.is_read, "Notification must be marked as read after the API call."

    def test_mark_all_read(self, django_user_model):
        """POST /api/notifications/read-all/ marks every unread notification as read."""
        user = django_user_model.objects.create_user(
            username='notif_test3',
            email='notif3@imo.cv',
            password='pass123',
        )
        for i in range(3):
            Notification.objects.create(
                user=user,
                type=Notification.Type.MAINTENANCE,
                title=f'Aviso {i}',
            )

        api = APIClient()
        api.force_authenticate(user=user)
        resp = api.post('/api/notifications/read-all/')

        assert resp.status_code == 204
        unread_count = Notification.objects.filter(user=user, is_read=False).count()
        assert unread_count == 0, "All notifications must be read after mark-all-read."

    def test_mark_read_does_not_affect_other_users(self, django_user_model):
        """Marking one user's notifications must not change another user's notifications."""
        owner = django_user_model.objects.create_user(
            username='owner',
            email='owner@imo.cv',
            password='pass123',
        )
        other = django_user_model.objects.create_user(
            username='other',
            email='other@imo.cv',
            password='pass123',
        )
        notif_other = Notification.objects.create(
            user=other,
            type=Notification.Type.NEW_LEAD,
            title='Other user notif',
        )

        api = APIClient()
        api.force_authenticate(user=owner)
        api.post('/api/notifications/read-all/')

        notif_other.refresh_from_db()
        assert not notif_other.is_read, "Another user's notifications must remain unaffected."


@pytest.mark.django_db
class TestNotificationsTypeChoices:
    """Notification.Type TextChoices must include the core event types."""

    def test_type_choices_contain_new_lead(self):
        types = [t[0] for t in Notification.Type.choices]
        assert 'NEW_LEAD' in types

    def test_type_choices_contain_reservation(self):
        types = [t[0] for t in Notification.Type.choices]
        assert 'RESERVATION' in types

    def test_type_choices_contain_fee_overdue(self):
        types = [t[0] for t in Notification.Type.choices]
        assert 'FEE_OVERDUE' in types
