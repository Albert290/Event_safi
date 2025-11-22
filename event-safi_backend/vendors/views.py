from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Vendor, VendorPhoto
from .serializers import VendorSerializer, VendorRegistrationSerializer, VendorPhotoSerializer
from accounts.serializers import UserSerializer
from common.permissions import IsVendorOwner

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [IsVendorOwner, IsAuthenticated]

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
        
        serializer = VendorSerializer(vendor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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