from rest_framework import serializers
from .models import Vendor, VendorPhoto
from accounts.serializers import UserRegistrationSerializer, UserSerializer
from accounts.models import User
from services.models import ServiceCategory

class VendorPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorPhoto
        fields = ['id', 'image', 'caption', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']

class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        from services.models import Service
        model = Service
        fields = ['id', 'name', 'description', 'price_range', 'availability_status', 'rating', 'category_name']

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )
    gallery = VendorPhotoSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Vendor
        fields = '__all__'

class VendorUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating vendor profile - only includes editable fields"""
    
    class Meta:
        model = Vendor
        fields = [
            'business_name', 'description', 'profile_picture', 'cover_photo',
            'phone_number', 'address', 'facebook_url', 'instagram_url',
            'twitter_url', 'linkedin_url', 'website_url'
        ]
        # All fields are optional for partial updates
        extra_kwargs = {field: {'required': False} for field in fields}

class VendorRegistrationSerializer(serializers.ModelSerializer):
    user = UserRegistrationSerializer()
    categories = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Vendor
        fields = ['user', 'business_name', 'description', 'phone_number', 'address', 'categories',
                  'facebook_url', 'instagram_url', 'twitter_url', 'linkedin_url', 'website_url']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        category_names = validated_data.pop('categories', [])
        
        user_serializer = UserRegistrationSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        
        vendor = Vendor.objects.create(user=user, **validated_data)
        
        if category_names:
            categories = ServiceCategory.objects.filter(name__in=category_names)
            vendor.categories.set(categories)
            
        return vendor