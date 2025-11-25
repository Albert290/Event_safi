#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

# Create superuser
email = 'admin@eventsafi.com'
password = 'admin123'
name = 'Event Safi Admin'

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(
        email=email,
        password=password,
        name=name
    )
    print(f"✅ Superuser created successfully!")
    print(f"📧 Email: {email}")
    print(f"🔑 Password: {password}")
    print(f"🌐 Admin URL: http://127.0.0.1:8000/admin/")
else:
    print(f"⚠️  Superuser with email {email} already exists!")
    print(f"🌐 Admin URL: http://127.0.0.1:8000/admin/")