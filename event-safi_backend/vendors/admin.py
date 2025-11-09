from django.contrib import admin
from .models import Vendor

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'user', 'is_verified')
    list_filter = ('is_verified',)
    search_fields = ('business_name', 'user__email')