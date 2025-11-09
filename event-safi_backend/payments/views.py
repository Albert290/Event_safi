
from rest_framework import viewsets
from .models import Payment
from .serializers import PaymentSerializer
from common.permissions import IsOwner
from rest_framework.permissions import IsAuthenticated

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        This view should return a list of all the payments
        for the currently authenticated user.
        """
        return Payment.objects.filter(booking__event__user=self.request.user)
