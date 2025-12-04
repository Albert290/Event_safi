from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Count, Sum, Avg
from .models import Vendor, VendorPhoto
from .serializers import VendorSerializer, VendorRegistrationSerializer, VendorPhotoSerializer, VendorUpdateSerializer
from accounts.serializers import UserSerializer
from common.permissions import IsVendorOwner
from bookings.models import Booking
from payments.models import Payment
from reviews.models import Review

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'retrieve']:
            # Allow anyone to view vendors
            permission_classes = [AllowAny]
        else:
            # Require authentication and ownership for other actions
            permission_classes = [IsAuthenticated, IsVendorOwner]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def dashboard(self, request):
        """Get vendor dashboard statistics"""
        try:
            vendor = request.user.vendor_profile
        except AttributeError:
            return Response({'error': 'User is not a vendor'}, status=status.HTTP_400_BAD_REQUEST)

        # Get bookings for this vendor
        bookings = Booking.objects.filter(service__vendor=vendor)
        
        # Calculate stats
        total_bookings = bookings.count()
        pending_bookings = bookings.filter(status='pending').count()
        confirmed_bookings = bookings.filter(status='confirmed').count()
        completed_bookings = bookings.filter(status='completed').count()
        
        # Calculate revenue from payments
        payments = Payment.objects.filter(booking__service__vendor=vendor, status='completed')
        total_revenue = payments.aggregate(total=Sum('amount'))['total'] or 0
        
        # Get reviews
        reviews = Review.objects.filter(vendor=vendor)
        total_reviews = reviews.count()
        avg_rating = reviews.aggregate(avg=Avg('rating'))['avg'] or 0
        
        # Get services count
        total_services = vendor.services.filter(availability_status=True).count()
        
        # Recent bookings
        recent_bookings = bookings.select_related('event', 'service').order_by('-created_at')[:5]
        recent_bookings_data = []
        for booking in recent_bookings:
            recent_bookings_data.append({
                'id': booking.id,
                'event_title': booking.event.title,
                'service_name': booking.service.name,
                'status': booking.status,
                'created_at': booking.created_at,
                'agreed_price': booking.agreed_price
            })

        return Response({
            'total_bookings': total_bookings,
            'pending_bookings': pending_bookings,
            'confirmed_bookings': confirmed_bookings,
            'completed_bookings': completed_bookings,
            'total_revenue': float(total_revenue),
            'total_reviews': total_reviews,
            'average_rating': round(float(avg_rating), 1) if avg_rating else 0,
            'total_services': total_services,
            'recent_bookings': recent_bookings_data
        })

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_photo(self, request, pk=None):
        """Upload a photo to vendor gallery"""
        vendor = self.get_object()
        
        # Check if user owns this vendor profile
        if request.user != vendor.user:
            return Response(
                {'error': 'You do not have permission to upload photos for this vendor'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = VendorPhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(vendor=vendor)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='delete-photo/(?P<photo_id>[^/.]+)')
    def delete_photo(self, request, pk=None, photo_id=None):
        """Delete a photo from vendor gallery"""
        vendor = self.get_object()
        
        if request.user != vendor.user:
            return Response(
                {'error': 'You do not have permission to delete photos for this vendor'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            photo = VendorPhoto.objects.get(id=photo_id, vendor=vendor)
            photo.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except VendorPhoto.DoesNotExist:
            return Response(
                {'error': 'Photo not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['patch'], parser_classes=[MultiPartParser, FormParser])
    def update_profile(self, request, pk=None):
        """Update vendor profile including photos and social media"""
        vendor = self.get_object()
        
        if request.user != vendor.user:
            return Response(
                {'error': 'You do not have permission to update this vendor profile'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = VendorUpdateSerializer(vendor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Return full vendor data with VendorSerializer
            return Response(VendorSerializer(vendor).data)
        # Log errors for debugging
        print("Validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VendorRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VendorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            vendor = serializer.save()
            user = vendor.user
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'vendor_profile': VendorSerializer(vendor).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)