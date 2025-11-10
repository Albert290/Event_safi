
from django.urls import path
from .views import AIRecommenderView, ResetAIChatView

urlpatterns = [
    path('recommendations/', AIRecommenderView.as_view(), name='ai-recommender'),
     path("recommendations/reset/", ResetAIChatView.as_view(), name="ai-recommender-reset"),
]
