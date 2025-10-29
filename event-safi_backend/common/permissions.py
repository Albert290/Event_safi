from rest_framework import permissions


class IsProvider(permissions.BasePermission):
    """Check if user has a service provider profile"""
    
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'provider_profile')
        )


class IsProviderOwner(permissions.BasePermission):
    """Check if user owns the provider profile"""
    
    def has_object_permission(self, request, view, obj):
        # obj is ServiceProvider
        return obj.user == request.user


class IsOwner(permissions.BasePermission):
    """Check if user owns the resource"""
    
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or obj == request.user