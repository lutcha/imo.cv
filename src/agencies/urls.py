from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgencyViewSet, AgencyMeView

router = DefaultRouter()
router.register(r'', AgencyViewSet)

urlpatterns = [
    path('me/', AgencyMeView.as_view(), name='agency-me'),
    path('', include(router.urls)),
]
