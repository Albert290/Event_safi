from rest_framework import serializers
from .models import Event, EventType
from bookings.serializers import BookingSerializer

class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ['id', 'name', 'description']

class EventSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True)
    event_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=EventType.objects.all()
    )

    class Meta:
        model = Event
        fields = ['id', 'user', 'event_type', 'title', 'description', 'date', 'location', 'status', 'budget', 'created_at', 'updated_at', 'bookings']
        read_only_fields = ['user'] # User is set from the request, not the body