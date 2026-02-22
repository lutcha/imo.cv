from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CRMInteractionViewSet

router = DefaultRouter()
router.register(r'', CRMInteractionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
