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
    cover_photo = models.ImageField(upload_to='vendor_covers/', null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    
    # Social Media Links
    facebook_url = models.URLField(max_length=500, blank=True)
    instagram_url = models.URLField(max_length=500, blank=True)
    twitter_url = models.URLField(max_length=500, blank=True)
    linkedin_url = models.URLField(max_length=500, blank=True)
    website_url = models.URLField(max_length=500, blank=True)
    
    is_verified = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']  # Newest vendors first

    def __str__(self):
        return self.business_name

class VendorPhoto(models.Model):
    """Gallery photos for a vendor"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='vendor_gallery/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f'{self.vendor.business_name} - Photo {self.order}'