
from rest_framework import viewsets, mixins
from .models import Event, EventType
from .serializers import EventSerializer, EventTypeSerializer
from common.permissions import IsEventOwner

class EventTypeViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                       viewsets.GenericViewSet):
    """
    A read-only endpoint to view event types.
    """
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    permission_classes = [] # Allow any to view event types


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsEventOwner]

    def get_queryset(self):
        """
        This view should return a list of all the events
        for the currently authenticated user.
        """
        return self.request.user.events.all()

    def perform_create(self, serializer):
        """Associate the event with the logged-in user."""
        serializer.save(user=self.request.user)
