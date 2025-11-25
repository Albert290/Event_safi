from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ServiceCategory, Service
from .serializers import ServiceCategorySerializer, ServiceSerializer

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]  # Categories are public

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_permissions(self):
        """
        Allow anyone to view services, but require authentication for modifications
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filter services based on user type and query parameters
        """
        queryset = Service.objects.all()
        
        # If user is authenticated and is a vendor, show only their services for list action when no vendor param
        if (self.request.user.is_authenticated and 
            hasattr(self.request.user, 'vendor_profile') and 
            self.action == 'list' and 
            not self.request.query_params.get('vendor')):
            return queryset.filter(vendor=self.request.user.vendor_profile)
        
        # For modification actions, always filter by vendor
        if (self.request.user.is_authenticated and 
            hasattr(self.request.user, 'vendor_profile') and
            self.action in ['create', 'update', 'partial_update', 'destroy']):
            return queryset.filter(vendor=self.request.user.vendor_profile)
        
        # For public access or when vendor param is specified
        vendor_id = self.request.query_params.get('vendor', None)
        if vendor_id:
            queryset = queryset.filter(vendor_id=vendor_id)
            
        return queryset

    def perform_create(self, serializer):
        """
        Automatically set the vendor when creating a service
        """
        if hasattr(self.request.user, 'vendor_profile'):
            serializer.save(vendor=self.request.user.vendor_profile)
        else:
            raise PermissionError("Only vendors can create services")