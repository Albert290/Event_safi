
from rest_framework import viewsets
from .models import Review
from .serializers import ReviewSerializer
from common.permissions import IsOwner
from rest_framework.permissions import IsAuthenticated

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        This view should return a list of all the reviews
        created by the currently authenticated user.
        """
        return Review.objects.filter(user=self.request.user)
