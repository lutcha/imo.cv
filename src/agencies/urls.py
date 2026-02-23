from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgencyViewSet

router = DefaultRouter()  # default trailing_slash='/' works with skipTrailingSlashRedirect:true
router.register(r'', AgencyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
