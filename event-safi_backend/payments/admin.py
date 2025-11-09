
from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('booking', 'amount', 'status')
    list_filter = ('status',)
    search_fields = ('booking__event__title', 'booking__service__name')
