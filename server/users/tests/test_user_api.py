"""
Tests for the users API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')

PAYLOAD = {
    'email': 'user@example.com',
    'password': 'pAssw0rd'
}

def create_user(email, password):
    return get_user_model().objects.create_user(
        email=email,
        password=password
    )


class UserApiTests(TestCase):
    """Tests for the user api."""

    def setUp(self):
        client = APIClient()

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
