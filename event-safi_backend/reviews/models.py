
from django.db import models
from django.conf import settings
from events.models import Event
from vendors.models import Vendor
from services.models import Service
import uuid

class Review(models.Model):
    """A review for a service provided by a vendor at an event"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reviews')
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='reviews')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    rating = models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)])
    text = models.TextField()
    image = models.ImageField(upload_to='review_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Review by {self.user.name} for {self.vendor.business_name}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Update the average rating for the associated service
        if self.service:
            service_reviews = self.service.reviews.all()
            self.service.rating = service_reviews.aggregate(models.Avg('rating'))['rating__avg']
            self.service.save()

        # Update the average rating for the vendor
        vendor_reviews = self.vendor.reviews.all()
        self.vendor.rating = vendor_reviews.aggregate(models.Avg('rating'))['rating__avg']
        self.vendor.save()
