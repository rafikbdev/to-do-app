from django.urls import path

from users import views

app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('update/', views.ManageUserView.as_view(), name='update'),
]
