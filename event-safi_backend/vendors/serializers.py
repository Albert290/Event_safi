from rest_framework import serializers
from .models import Vendor
from accounts.serializers import UserRegistrationSerializer, UserSerializer
from accounts.models import User
from services.models import ServiceCategory

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )

    class Meta:
        model = Vendor
        fields = '__all__'

class VendorRegistrationSerializer(serializers.ModelSerializer):
    user = UserRegistrationSerializer()
    categories = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Vendor
        fields = ['user', 'business_name', 'description', 'phone_number', 'address', 'categories']

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