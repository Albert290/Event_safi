from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'vendor', 'rating')
    list_filter = ('rating',)
    search_fields = ('user__email', 'event__title', 'vendor__business_name')