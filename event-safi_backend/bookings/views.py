
from rest_framework import viewsets
from .models import Booking
from .serializers import BookingSerializer
from common.permissions import IsOwner
from rest_framework.permissions import IsAuthenticated

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        This view should return a list of all the bookings
        for the currently authenticated user.
        - If the user is a vendor, it returns bookings for their services.
        - If the user is a regular user, it returns bookings for their events.
        """
        user = self.request.user
        
        try:
            # Check if the user is a vendor
            vendor_profile = user.vendor_profile
            return Booking.objects.filter(service__vendor=vendor_profile)
        except user.vendor_profile.RelatedObjectDoesNotExist:
            # The user is a regular user
            return Booking.objects.filter(event__user=user)
