from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('event', 'service', 'status', 'agreed_price', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('event__title', 'service__name')