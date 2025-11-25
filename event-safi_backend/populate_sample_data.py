#!/usr/bin/env python
import os
import django
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User
from vendors.models import Vendor
from services.models import ServiceCategory, Service
from events.models import EventType

def create_sample_data():
    print("🚀 Creating sample data for Event Safi platform...")
    
    # Create Event Types
    event_types_data = [
        {'name': 'Wedding', 'description': 'Wedding ceremonies and receptions'},
        {'name': 'Birthday Party', 'description': 'Birthday celebrations for all ages'},
        {'name': 'Corporate Event', 'description': 'Business meetings, conferences, and corporate functions'},
        {'name': 'Harambee', 'description': 'Fundraising and community events'},
        {'name': 'Graduation Party', 'description': 'Graduation celebrations'},
        {'name': 'Baby Shower', 'description': 'Baby shower celebrations'},
    ]
    
    for event_data in event_types_data:
        event_type, created = EventType.objects.get_or_create(
            name=event_data['name'],
            defaults={'description': event_data['description']}
        )
        if created:
            print(f"✅ Created event type: {event_type.name}")
    
    # Create Service Categories
    categories_data = [
        {'name': 'Photography', 'description': 'Professional photography services'},
        {'name': 'Videography', 'description': 'Professional videography and filming'},
        {'name': 'Catering', 'description': 'Food and beverage services'},
        {'name': 'DJ & Music', 'description': 'DJ services and live music'},
        {'name': 'Decoration', 'description': 'Event decoration and styling'},
        {'name': 'MC Services', 'description': 'Master of ceremony services'},
        {'name': 'Sound & AV', 'description': 'Sound systems and audio-visual equipment'},
        {'name': 'Transportation', 'description': 'Event transportation services'},
        {'name': 'Security', 'description': 'Event security services'},
        {'name': 'Flowers', 'description': 'Floral arrangements and bouquets'},
    ]
    
    for cat_data in categories_data:
        category, created = ServiceCategory.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )
        if created:
            print(f"✅ Created service category: {category.name}")
    
    # Create Vendor Users and Vendors
    vendors_data = [
        {
            'user': {'email': 'photos@snapmoments.com', 'name': 'Snap Moments Photography', 'phone': '+254712345678'},
            'business_name': 'Snap Moments Photography',
            'description': 'Professional wedding and event photography with 5+ years experience',
            'categories': ['Photography'],
            'is_verified': True,
            'rating': Decimal('4.8')
        },
        {
            'user': {'email': 'info@deliciousbites.com', 'name': 'Delicious Bites Catering', 'phone': '+254723456789'},
            'business_name': 'Delicious Bites Catering',
            'description': 'Premium catering services for all types of events',
            'categories': ['Catering'],
            'is_verified': True,
            'rating': Decimal('4.6')
        },
        {
            'user': {'email': 'dj@beatmasters.com', 'name': 'Beat Masters DJ', 'phone': '+254734567890'},
            'business_name': 'Beat Masters Entertainment',
            'description': 'Professional DJ services with premium sound equipment',
            'categories': ['DJ & Music', 'Sound & AV'],
            'is_verified': True,
            'rating': Decimal('4.7')
        },
        {
            'user': {'email': 'info@elegantdecor.com', 'name': 'Elegant Decor', 'phone': '+254745678901'},
            'business_name': 'Elegant Event Decorations',
            'description': 'Creative event decoration and styling services',
            'categories': ['Decoration', 'Flowers'],
            'is_verified': True,
            'rating': Decimal('4.5')
        },
        {
            'user': {'email': 'mc@proeventmc.com', 'name': 'Pro Event MC', 'phone': '+254756789012'},
            'business_name': 'Professional Event MC Services',
            'description': 'Experienced master of ceremony for all events',
            'categories': ['MC Services'],
            'is_verified': True,
            'rating': Decimal('4.9')
        },
        {
            'user': {'email': 'video@cinemaworks.com', 'name': 'Cinema Works', 'phone': '+254767890123'},
            'business_name': 'Cinema Works Videography',
            'description': 'Cinematic videography and live streaming services',
            'categories': ['Videography', 'Sound & AV'],
            'is_verified': True,
            'rating': Decimal('4.4')
        }
    ]
    
    for vendor_data in vendors_data:
        # Create user
        user_data = vendor_data['user']
        user, created = User.objects.get_or_create(
            email=user_data['email'],
            defaults={
                'name': user_data['name'],
                'phone': user_data['phone']
            }
        )
        if created:
            user.set_password('vendor123')  # Default password
            user.save()
            print(f"✅ Created vendor user: {user.email}")
        
        # Create vendor
        vendor, created = Vendor.objects.get_or_create(
            user=user,
            defaults={
                'business_name': vendor_data['business_name'],
                'description': vendor_data['description'],
                'is_verified': vendor_data['is_verified'],
                'rating': vendor_data['rating']
            }
        )
        
        if created:
            # Add categories
            categories = ServiceCategory.objects.filter(name__in=vendor_data['categories'])
            vendor.categories.set(categories)
            print(f"✅ Created vendor: {vendor.business_name}")
    
    # Create Services
    services_data = [
        # Photography Services
        {
            'vendor_email': 'photos@snapmoments.com',
            'category': 'Photography',
            'name': 'Wedding Photography Package',
            'description': 'Complete wedding photography with 300+ edited photos, online gallery, and USB drive',
            'price_range': 'KSh 25,000 - 50,000',
            'rating': Decimal('4.8')
        },
        {
            'vendor_email': 'photos@snapmoments.com',
            'category': 'Photography',
            'name': 'Event Photography',
            'description': 'Professional event photography for corporate events, parties, and celebrations',
            'price_range': 'KSh 15,000 - 30,000',
            'rating': Decimal('4.7')
        },
        
        # Catering Services
        {
            'vendor_email': 'info@deliciousbites.com',
            'category': 'Catering',
            'name': 'Wedding Catering Package',
            'description': 'Full wedding catering with appetizers, main course, desserts, and beverages',
            'price_range': 'KSh 800 - 1,500 per person',
            'rating': Decimal('4.6')
        },
        {
            'vendor_email': 'info@deliciousbites.com',
            'category': 'Catering',
            'name': 'Corporate Lunch Catering',
            'description': 'Professional corporate catering for meetings and conferences',
            'price_range': 'KSh 500 - 1,000 per person',
            'rating': Decimal('4.5')
        },
        
        # DJ Services
        {
            'vendor_email': 'dj@beatmasters.com',
            'category': 'DJ & Music',
            'name': 'Wedding DJ Package',
            'description': 'Complete DJ service with premium sound system, lighting, and music for 8 hours',
            'price_range': 'KSh 20,000 - 35,000',
            'rating': Decimal('4.7')
        },
        {
            'vendor_email': 'dj@beatmasters.com',
            'category': 'Sound & AV',
            'name': 'Sound System Rental',
            'description': 'Professional sound system rental with microphones and mixing equipment',
            'price_range': 'KSh 8,000 - 15,000',
            'rating': Decimal('4.6')
        },
        
        # Decoration Services
        {
            'vendor_email': 'info@elegantdecor.com',
            'category': 'Decoration',
            'name': 'Wedding Decoration Package',
            'description': 'Complete wedding decoration including altar, reception, and floral arrangements',
            'price_range': 'KSh 30,000 - 80,000',
            'rating': Decimal('4.5')
        },
        {
            'vendor_email': 'info@elegantdecor.com',
            'category': 'Flowers',
            'name': 'Bridal Bouquet & Flowers',
            'description': 'Beautiful bridal bouquets and floral arrangements for weddings',
            'price_range': 'KSh 5,000 - 15,000',
            'rating': Decimal('4.4')
        },
        
        # MC Services
        {
            'vendor_email': 'mc@proeventmc.com',
            'category': 'MC Services',
            'name': 'Wedding MC Services',
            'description': 'Professional wedding MC to guide your special day smoothly',
            'price_range': 'KSh 10,000 - 20,000',
            'rating': Decimal('4.9')
        },
        {
            'vendor_email': 'mc@proeventmc.com',
            'category': 'MC Services',
            'name': 'Corporate Event MC',
            'description': 'Professional MC for corporate events, conferences, and business functions',
            'price_range': 'KSh 8,000 - 15,000',
            'rating': Decimal('4.8')
        },
        
        # Videography Services
        {
            'vendor_email': 'video@cinemaworks.com',
            'category': 'Videography',
            'name': 'Wedding Videography',
            'description': 'Cinematic wedding videography with highlight reel and full ceremony recording',
            'price_range': 'KSh 35,000 - 70,000',
            'rating': Decimal('4.4')
        },
        {
            'vendor_email': 'video@cinemaworks.com',
            'category': 'Videography',
            'name': 'Event Live Streaming',
            'description': 'Professional live streaming services for events and conferences',
            'price_range': 'KSh 15,000 - 25,000',
            'rating': Decimal('4.3')
        }
    ]
    
    for service_data in services_data:
        vendor = Vendor.objects.get(user__email=service_data['vendor_email'])
        category = ServiceCategory.objects.get(name=service_data['category'])
        
        service, created = Service.objects.get_or_create(
            vendor=vendor,
            name=service_data['name'],
            defaults={
                'category': category,
                'description': service_data['description'],
                'price_range': service_data['price_range'],
                'rating': service_data['rating'],
                'availability_status': True
            }
        )
        
        if created:
            print(f"✅ Created service: {service.name} by {vendor.business_name}")
    
    print("\n🎉 Sample data creation completed!")
    print("\n📊 Summary:")
    print(f"   • Event Types: {EventType.objects.count()}")
    print(f"   • Service Categories: {ServiceCategory.objects.count()}")
    print(f"   • Vendors: {Vendor.objects.count()}")
    print(f"   • Services: {Service.objects.count()}")
    
    print("\n🔐 Admin Access:")
    print("   • URL: http://127.0.0.1:8000/admin/")
    print("   • Email: admin@eventsafi.com")
    print("   • Password: admin123")
    
    print("\n👥 Sample Vendor Accounts:")
    for vendor_data in vendors_data:
        print(f"   • {vendor_data['user']['email']} (Password: vendor123)")

if __name__ == '__main__':
    create_sample_data()