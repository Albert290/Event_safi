from rest_framework import serializers
from .models import Booking
from services.serializers import ServiceSerializer
from services.models import Service
from events.models import Event

class BookingSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.UUIDField(write_only=True)
    event_id = serializers.UUIDField(write_only=True)
    
    # Read-only fields for display
    event_title = serializers.CharField(source='event.title', read_only=True)
    event_date = serializers.DateTimeField(source='event.date', read_only=True)
    vendor_name = serializers.CharField(source='service.vendor.business_name', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'event', 'service', 'service_id', 'event_id', 'status', 'agreed_price', 
                 'notes', 'created_at', 'updated_at', 'event_title', 'event_date', 'vendor_name']
        read_only_fields = ['id', 'created_at', 'updated_at', 'event', 'service']

    def create(self, validated_data):
        service_id = validated_data.pop('service_id')
        event_id = validated_data.pop('event_id')
        
        # Get the actual objects
        service = Service.objects.get(id=service_id)
        event = Event.objects.get(id=event_id)
        
        # Create the booking
        booking = Booking.objects.create(
            service=service,
            event=event,
            **validated_data
        )
        return booking