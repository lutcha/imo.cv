"""
URL configuration for imocv project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView
from core.auth_views import login_view

# Use re_path with optional trailing slash so the Next.js proxy works:
# Next.js 308-redirects /api/backend/foo/ → /api/backend/foo (strips slash),
# the rewrite forwards to /api/foo (no slash), so Django must accept both.
urlpatterns = [
    path('admin/', admin.site.urls),
    # Auth
    re_path(r'^api/auth/login/?$', login_view, name='auth-login'),
    re_path(r'^api/auth/refresh/?$', TokenRefreshView.as_view(), name='auth-refresh'),
    # App APIs
    re_path(r'^api/agencies/?', include('agencies.urls')),
    re_path(r'^api/properties/?', include('properties.urls')),
    re_path(r'^api/leads/?', include('leads.urls')),
    re_path(r'^api/crm/?', include('crm.urls')),
    re_path(r'^api/analytics/?', include('analytics.urls')),
    re_path(r'^api/condominiums/?', include('condominiums.urls')),
    re_path(r'^api/notifications/?', include('notifications.urls')),
]
