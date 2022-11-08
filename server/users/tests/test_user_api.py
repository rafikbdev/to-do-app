"""
Tests for the users API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')
UPDATE_USER_URL = reverse('user:update')

PAYLOAD = {
    'email': 'user@example.com',
    'password': 'pAssw0rd'
}

def create_user(email, password):
    return get_user_model().objects.create_user(
        email=email,
        password=password
    )


class PublicUserAPITests(TestCase):
    """Tests for the unauthorized users API."""

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        """Test creating a user is successful."""
        res = self.client.post(CREATE_USER_URL, PAYLOAD)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=PAYLOAD['email'])
        self.assertTrue(user.check_password(PAYLOAD['password']))
        self.assertNotIn('password', res.data)

    def test_creating_user_with_existing_email_error(self):
        """Test creating user with existing email error."""
        create_user(email='user@example.com', password='differentpass')
        res = self.client.post(CREATE_USER_URL, PAYLOAD)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_to_short_error(self):
        """Test an error is returned if password is less then 5 chars."""
        payload = {
            'email': 'user@example.com',
            'password': 'pAss'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)


class PrivateUserAPITests(TestCase):
    """Tests for authorized users."""

    def setUp(self):
        self.user = create_user(
            email=PAYLOAD['email'],
            password=PAYLOAD['password']
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_update_user_profile(self):
        payload = {'email': 'new@example.com', 'password': 'newPass123'}

        res = self.client.patch(UPDATE_USER_URL, payload)
        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.email, payload['email'])
        self.assertTrue(self.user.check_password(payload['password']))
