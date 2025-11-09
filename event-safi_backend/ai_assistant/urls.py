
from django.urls import path
from .views import AIRecommenderView

urlpatterns = [
    path('recommendations/', AIRecommenderView.as_view(), name='ai-recommender'),
]
