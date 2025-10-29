from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, ServiceProvider

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = fields = ['email', 'name', 'phone', 'password', 'password_confirm']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            phone=validated_data.get('phone', '')
        )
        return user


class ServiceProviderRegistrationSerializer(serializers.Serializer):
    # User fields
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    # Provider fields
    business_name = serializers.CharField(max_length=255)
    category = serializers.UUIDField()
    description = serializers.CharField()
    location = serializers.CharField(max_length=255)
    base_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already registered")
        
        return data
    
    def create(self, validated_data):
        from services.models import Category
        
        # Create user
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            phone=validated_data['phone']
        )
        
        # Create provider profile
        category = Category.objects.get(id=validated_data['category'])
        provider = ServiceProvider.objects.create(
            user=user,
            category=category,
            business_name=validated_data['business_name'],
            phone=validated_data['phone'],
            description=validated_data['description'],
            location=validated_data['location'],
            base_price=validated_data['base_price']
        )
        
        return provider


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("Account is disabled")
        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'profile_picture', 'created_at']
        read_only_fields = ['id', 'email', 'created_at']


class ServiceProviderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = ServiceProvider
        fields = [
            'id', 'user', 'category', 'category_name', 'business_name',
            'phone', 'description', 'location', 'base_price', 'currency',
            'is_verified', 'avg_rating', 'total_reviews', 'created_at'
        ]
        read_only_fields = ['id', 'is_verified', 'avg_rating', 'total_reviews', 'created_at']
