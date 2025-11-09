import random
from django.core.management.base import BaseCommand
from django.db import transaction
from accounts.models import User
from events.models import EventType
from services.models import ServiceCategory, Service
from vendors.models import Vendor

class Command(BaseCommand):
    help = 'Populates the database with sample data for event types, services, and vendors.'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        # Order of deletion matters to avoid foreign key constraint errors
        Service.objects.all().delete()
        Vendor.objects.all().delete()
        ServiceCategory.objects.all().delete()
        EventType.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()

        self.stdout.write("Creating sample data...")

        # Create Users for Vendors
        vendor_users_data = [
            {'email': 'catering@safi.com', 'name': 'Safi Catering'},
            {'email': 'photos@perfect.com', 'name': 'Picha Perfect'},
            {'email': 'venue@grandhall.com', 'name': 'The Grand Hall'},
            {'email': 'dj@jazzy.com', 'name': 'DJ Jazzy'},
            {'email': 'flowers@power.com', 'name': 'Flower Power'},
        ]
        vendor_users = {}
        for user_data in vendor_users_data:
            user, created = User.objects.get_or_create(
                email=user_data['email'],
                defaults={'name': user_data['name']}
            )
            if created:
                user.set_password('password123')
                user.save()
            vendor_users[user_data['name']] = user
            self.stdout.write(f"Created user: {user.email}")

        # Create Event Types
        event_types = ['Wedding', 'Birthday Party', 'Corporate Event', 'Conference', 'Baby Shower']
        for event_type_name in event_types:
            EventType.objects.get_or_create(name=event_type_name)
            self.stdout.write(f"Created event type: {event_type_name}")

        # Create Service Categories
        service_categories_data = {
            'Catering': 'Food and beverage services.',
            'Photography': 'Event photography and videography.',
            'Venues': 'Event space and location rentals.',
            'Music & Entertainment': 'DJs, live bands, and performers.',
            'Decorations': 'Floral arrangements, lighting, and decor.',
            'Planning': 'Full-service event planning and coordination.'
        }
        service_categories = {}
        for name, desc in service_categories_data.items():
            category, _ = ServiceCategory.objects.get_or_create(name=name, defaults={'description': desc})
            service_categories[name] = category
            self.stdout.write(f"Created service category: {name}")

        # Create Vendors
        vendors_data = [
            {
                'user': vendor_users['Safi Catering'],
                'business_name': 'Safi Catering',
                'description': 'Exquisite catering for all occasions. We bring the flavor to your event.',
                'categories': [service_categories['Catering']],
                'phone_number': '0712345678',
                'address': '123 Foodie Lane, Nairobi',
                'is_verified': True,
            },
            {
                'user': vendor_users['Picha Perfect'],
                'business_name': 'Picha Perfect Studios',
                'description': 'Capturing your most precious moments with artistry and professionalism.',
                'categories': [service_categories['Photography']],
                'phone_number': '0787654321',
                'address': '456 Lens Avenue, Nairobi',
                'is_verified': True,
            },
            {
                'user': vendor_users['The Grand Hall'],
                'business_name': 'The Grand Hall',
                'description': 'A stunning and versatile venue for weddings, conferences, and corporate events.',
                'categories': [service_categories['Venues']],
                'phone_number': '0722000111',
                'address': '789 Prestige Plaza, Nairobi',
                'is_verified': False,
            },
            {
                'user': vendor_users['DJ Jazzy'],
                'business_name': 'DJ Jazzy Entertainment',
                'description': 'Keeping the party alive with the best music selection and energy.',
                'categories': [service_categories['Music & Entertainment']],
                'phone_number': '0733444555',
                'address': '101 Beat Street, Nairobi',
                'is_verified': True,
            },
            {
                'user': vendor_users['Flower Power'],
                'business_name': 'Flower Power Decor',
                'description': 'Beautiful and creative floral designs to transform your event space.',
                'categories': [service_categories['Decorations'], service_categories['Planning']],
                'phone_number': '0744555666',
                'address': '202 Blossom Road, Nairobi',
                'is_verified': False,
            }
        ]
        vendors = {}
        for data in vendors_data:
            categories = data.pop('categories')
            vendor, _ = Vendor.objects.get_or_create(user=data['user'], defaults=data)
            vendor.categories.set(categories)
            vendors[vendor.business_name] = vendor
            self.stdout.write(f"Created vendor: {vendor.business_name}")

        # Create Services
        services_data = [
            {'vendor': vendors['Safi Catering'], 'category': service_categories['Catering'], 'name': 'Wedding Buffet Package', 'price_range': 'KES 2,500 - 4,000 per person'},
            {'vendor': vendors['Safi Catering'], 'category': service_categories['Catering'], 'name': 'Corporate Lunch Box', 'price_range': 'KES 1,000 - 1,500 per person'},
            {'vendor': vendors['Picha Perfect Studios'], 'category': service_categories['Photography'], 'name': 'Full-Day Wedding Photography', 'price_range': 'KES 80,000 - 120,000'},
            {'vendor': vendors['Picha Perfect Studios'], 'category': service_categories['Photography'], 'name': 'Event Photoshoot (3 hours)', 'price_range': 'KES 25,000'},
            {'vendor': vendors['The Grand Hall'], 'category': service_categories['Venues'], 'name': 'Main Ballroom Rental (Full Day)', 'price_range': 'KES 150,000'},
            {'vendor': vendors['DJ Jazzy Entertainment'], 'category': service_categories['Music & Entertainment'], 'name': 'Wedding DJ Package (6 hours)', 'price_range': 'KES 45,000'},
            {'vendor': vendors['Flower Power Decor'], 'category': service_categories['Decorations'], 'name': 'Complete Wedding Decor', 'price_range': 'KES 100,000 - 250,000'},
        ]

        for data in services_data:
            Service.objects.get_or_create(
                vendor=data['vendor'],
                name=data['name'],
                defaults={
                    'category': data['category'],
                    'description': f"High-quality {data['name'].lower()} service.",
                    'price_range': data['price_range'],
                    'availability_status': True
                }
            )
            self.stdout.write(f"Created service: {data['name']}")

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data.'))
