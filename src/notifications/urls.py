from django.urls import re_path
from . import views

urlpatterns = [
    # read-all must come before the pk pattern to avoid collision
    re_path(r'^read-all/?$', views.mark_all_read, name='notifications-read-all'),
    re_path(r'^(?P<pk>\d+)/read/?$', views.mark_read, name='notifications-read'),
    re_path(r'^$', views.list_notifications, name='notifications-list'),
]
