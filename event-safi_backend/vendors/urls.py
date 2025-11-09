
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorViewSet, VendorRegistrationView

router = DefaultRouter()
router.register(r'vendors', VendorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/vendor/', VendorRegistrationView.as_view(), name='vendor-register'),
]
