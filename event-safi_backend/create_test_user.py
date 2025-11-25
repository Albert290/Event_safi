#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

def create_test_user():
    """Create a test user for booking services"""
    
    # Check if test user already exists
    if User.objects.filter(email='test@example.com').exists():
        print("✅ Test user already exists!")
        print("   Email: test@example.com")
        print("   Password: testpass123")
        return
    
    # Create test user
    user = User.objects.create_user(
        email='test@example.com',
        name='Test User',
        phone='+254700000000',
        password='testpass123'
    )
    
    print("✅ Test user created successfully!")
    print("   Email: test@example.com")
    print("   Password: testpass123")
    print("   Name: Test User")
    print("\n🔗 You can now login at: http://localhost:3000/login")

if __name__ == '__main__':
    create_test_user()