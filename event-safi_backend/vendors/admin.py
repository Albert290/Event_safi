from django.contrib import admin
from .models import Vendor, VendorPhoto

class VendorPhotoInline(admin.TabularInline):
    model = VendorPhoto
    extra = 1
    fields = ('image', 'caption', 'order')

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'user', 'is_verified', 'rating')
    list_filter = ('is_verified',)
    search_fields = ('business_name', 'user__email')
    inlines = [VendorPhotoInline]

@admin.register(VendorPhoto)
class VendorPhotoAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'caption', 'order', 'created_at')
    list_filter = ('vendor',)
    ordering = ['vendor', 'order']