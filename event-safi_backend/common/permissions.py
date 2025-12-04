from rest_framework import permissions

class IsEventOwner(permissions.BasePermission):
    """Allow only event owners to edit their events"""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class IsVendorOwner(permissions.BasePermission):
    """Allow only vendor owners to edit their listings"""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view or edit it.
    Assumes the model instance has a 'user' attribute.
    """
    def has_object_permission(self, request, view, obj):
        # For a booking, the owner is the user who created the event
        if hasattr(obj, 'event'):
            return obj.event.user == request.user
        # For a payment, the owner is the user who made the booking
        if hasattr(obj, 'booking'):
            return obj.booking.event.user == request.user
        # For a review, the owner is the user who wrote it
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return False

class IsBookingParticipant(permissions.BasePermission):
    """
    Custom permission for bookings.
    Allows both the event owner (client) AND the vendor (service provider) to view/edit bookings.
    """
    def has_object_permission(self, request, view, obj):
        # Allow if user is the event owner (client who made the booking)
        if hasattr(obj, 'event') and obj.event.user == request.user:
            return True
        
        # Allow if user is the vendor who owns the service being booked
        if hasattr(obj, 'service'):
            try:
                vendor_profile = request.user.vendor_profile
                return obj.service.vendor == vendor_profile
            except AttributeError:
                pass
        
        return False