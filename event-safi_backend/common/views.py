from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from events.models import Event
from vendors.models import Vendor
from services.models import Service
from events.serializers import EventSerializer
from vendors.serializers import VendorSerializer
from services.serializers import ServiceSerializer


class SearchResultsPagination(PageNumberPagination):
    """Custom pagination for search results"""
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class UnifiedSearchView(APIView):
    """
    Unified search endpoint that searches across events, vendors, and services.
    
    Query Parameters:
    - q: Search query string (required)
    - type: Filter by type (optional): 'all', 'events', 'vendors', 'services'
    - page: Page number for pagination
    - page_size: Results per page (max 50)
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        query = request.query_params.get('q', '').strip()
        search_type = request.query_params.get('type', 'all').lower()
        
        if not query:
            return Response({
                'error': 'Search query parameter "q" is required'
            }, status=400)
        
        results = {
            'query': query,
            'events': [],
            'vendors': [],
            'services': [],
            'counts': {
                'events': 0,
                'vendors': 0,
                'services': 0,
                'total': 0
            }
        }
        
        # Search Events
        if search_type in ['all', 'events']:
            events = Event.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(location__icontains=query) |
                Q(event_type__name__icontains=query)
            ).distinct()[:20]  # Limit to 20 results per category
            
            results['events'] = EventSerializer(events, many=True).data
            results['counts']['events'] = events.count()
        
        # Search Vendors
        if search_type in ['all', 'vendors']:
            vendors = Vendor.objects.filter(
                Q(business_name__icontains=query) |
                Q(description__icontains=query) |
                Q(address__icontains=query) |
                Q(categories__name__icontains=query)
            ).distinct()[:20]
            
            results['vendors'] = VendorSerializer(vendors, many=True).data
            results['counts']['vendors'] = vendors.count()
        
        # Search Services
        if search_type in ['all', 'services']:
            services = Service.objects.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(category__name__icontains=query) |
                Q(vendor__business_name__icontains=query)
            ).distinct()[:20]
            
            results['services'] = ServiceSerializer(services, many=True).data
            results['counts']['services'] = services.count()
        
        # Calculate total count
        results['counts']['total'] = (
            results['counts']['events'] +
            results['counts']['vendors'] +
            results['counts']['services']
        )
        
        return Response(results)
