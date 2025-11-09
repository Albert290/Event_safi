from django.db import models
from django.conf import settings
from services.models import ServiceCategory
import uuid

class Vendor(models.Model):
    """A vendor who provides services for events"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vendor_profile')
    business_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    categories = models.ManyToManyField(ServiceCategory, related_name='vendors', blank=True)
    profile_picture = models.ImageField(upload_to='vendor_profiles/', null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    is_verified = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.business_name