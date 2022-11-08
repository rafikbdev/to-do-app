from rest_framework import generics, permissions, authentication
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import UserSerializer, AuthTokenSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CreateAuthTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        "Retrieve and return the authenticated user."
        return self.request.user
