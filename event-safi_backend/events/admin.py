
from django.contrib import admin
from .models import Event, EventType

@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'event_type', 'date', 'location')
    list_filter = ('event_type', 'date', 'location')
    search_fields = ('title', 'user__email')
