# accounts/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserRegistrationView,
    LoginView,
    LogoutView,
    UserProfileView,
    DashboardView,
)

app_name = 'accounts'

urlpatterns = [
    # Authentication
    path('register/user/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Profile management
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]