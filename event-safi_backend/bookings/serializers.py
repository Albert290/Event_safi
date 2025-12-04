from rest_framework import serializers
from .models import Booking
from services.serializers import ServiceSerializer
from services.models import Service
from events.models import Event

class BookingSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.UUIDField(write_only=True, required=False)
    event_id = serializers.UUIDField(write_only=True, required=False)
    
    # Read-only fields for display
    event_title = serializers.CharField(source='event.title', read_only=True)
    event_date = serializers.DateTimeField(source='event.date', read_only=True)
    event_location = serializers.CharField(source='event.location', read_only=True, allow_null=True)
    vendor_name = serializers.CharField(source='service.vendor.business_name', read_only=True)
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['id', 'event_id', 'service', 'service_id', 'status', 'agreed_price', 
                 'notes', 'created_at', 'updated_at', 'event_title', 'event_date', 
                 'event_location', 'vendor_name', 'client_name']
        read_only_fields = ['id', 'created_at', 'updated_at', 'service']

    def get_client_name(self, obj):
        """Get the client/event owner's name"""
        try:
            user = obj.event.user
            return user.get_full_name() or user.username or user.email
        except:
            return "Client"

    def create(self, validated_data):
        service_id = validated_data.pop('service_id', None)
        event_id = validated_data.pop('event_id', None)
        
        if not service_id or not event_id:
            raise serializers.ValidationError("Both service_id and event_id are required")
        
        # Get the actual objects
        try:
            service = Service.objects.get(id=service_id)
            event = Event.objects.get(id=event_id)
        except Service.DoesNotExist:
            raise serializers.ValidationError("Service not found")
        except Event.DoesNotExist:
            raise serializers.ValidationError("Event not found")
        
        # Create the booking
        booking = Booking.objects.create(
            service=service,
            event=event,
            **validated_data
        )
        return booking