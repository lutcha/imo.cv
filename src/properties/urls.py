from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

router = DefaultRouter()  # default trailing_slash='/' works with skipTrailingSlashRedirect:true
router.register(r'', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
