from django.contrib.auth import get_user_model
from django.test import TestCase


class UserManagerTests(TestCase):

    def test_create_normal_user(self):
        """Test creating a normal user."""
        User = get_user_model()
        user = User.objects.create_user(email='user@example.com', password='pAssword')
        self.assertEqual(user.email, 'user@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

        try:
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='pAssword')

    def test_create_superuser(self):
        """Test creating a admin."""
        User = get_user_model()
        admin_user = User.objects.create_superuser(email="admin@example.com", password="pAssword")
        self.assertEqual(admin_user.email, "admin@example.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

        try:
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False
            )
