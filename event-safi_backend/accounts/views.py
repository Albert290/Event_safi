# accounts/views.py
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login

from .models import User, ServiceProvider
from .serializers import (
    UserRegistrationSerializer,
    ServiceProviderRegistrationSerializer,
    LoginSerializer,
    UserSerializer,
    ServiceProviderSerializer
)
from common.permissions import IsProviderOwner


class UserRegistrationView(APIView):
    """Register a regular user"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProviderRegistrationView(APIView):
    """Register a service provider"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = ServiceProviderRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            provider = serializer.save()
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(provider.user)
            
            return Response({
                'provider': ServiceProviderSerializer(provider).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """Login for both users and providers"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Check if user is a provider
            is_provider = hasattr(user, 'provider_profile')
            
            response_data = {
                'user': UserSerializer(user).data,
                'is_provider': is_provider,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }
            
            if is_provider:
                response_data['provider'] = ServiceProviderSerializer(user.provider_profile).data
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class ProviderProfileView(generics.RetrieveUpdateAPIView):
    """Get and update provider profile"""
    serializer_class = ServiceProviderSerializer
    permission_classes = [permissions.IsAuthenticated, IsProviderOwner]
    
    def get_object(self):
        return self.request.user.provider_profile


class LogoutView(APIView):
    """Logout - blacklist refresh token"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)