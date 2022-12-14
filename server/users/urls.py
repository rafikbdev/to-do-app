from django.urls import path

from users import views

app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('token/', views.CreateAuthTokenView.as_view(), name='token'),
    path('update/', views.ManageUserView.as_view(), name='update'),
]
