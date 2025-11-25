#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Service, ServiceCategory
from vendors.models import Vendor

print("🔍 Checking database data...")
print(f"Service Categories: {ServiceCategory.objects.count()}")
print(f"Vendors: {Vendor.objects.count()}")
print(f"Services: {Service.objects.count()}")

print("\n📋 Service Categories:")
for category in ServiceCategory.objects.all():
    print(f"  - {category.name}")

print("\n🏢 Vendors:")
for vendor in Vendor.objects.all():
    print(f"  - {vendor.business_name}")

print("\n🛍️ Services:")
for service in Service.objects.all():
    print(f"  - {service.name} by {service.vendor.business_name} ({service.category.name})")