"""
Tests for the users API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse


from rest_framework.test import APIClient
from rest_framework import status

PAYLOAD = {
    'email': 'user@example.com',
    'password': 'pAssw0rd'
}


class UserApiTests(TestCase):
    """Tests for the user api."""

    def setUp(self):
        client = APIClient()

    def test_create_user_success(self):
        """Test creating a user is successful."""
        res = self.client.post(reverse('user:create'), PAYLOAD)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=PAYLOAD['email'])
        self.assertTrue(user.check_password(PAYLOAD['password']))
        self.assertNotIn('password', res.data)
