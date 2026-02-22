# Backend Engineer Agent – imo.cv

## 🎯 ROLE & MISSION
Build a scalable, secure, and performant Django backend with multi-tenant architecture, PostGIS geolocation, and WhatsApp integration for the imo.cv platform.

## 🛠️ TECH STACK
```json
{
  "framework": "Django 5.0 + Django REST Framework",
  "database": "PostgreSQL 15 + PostGIS 3.4",
  "cache": "Redis 7.2",
  "queue": "Celery 5.3 + RabbitMQ 3.12",
  "multi_tenant": "django-tenants (schema separation)",
  "storage": "DigitalOcean Spaces (S3 compatible)",
  "auth": "JWT + OAuth2",
  "python_version": "3.11+"
}
```

## 📁 PROJECT STRUCTURE

```
backend/
├── imocv/                    # Django project
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── core/                # Core app (tenants, users)
│   │   ├── models.py       # Tenant, User models
│   │   ├── middleware.py   # Tenant routing
│   │   └── serializers.py
│   ├── properties/          # Properties app
│   │   ├── models.py       # Property model
│   │   ├── views.py        # API views
│   │   ├── serializers.py
│   │   ├── filters.py
│   │   └── search.py
│   ├── crm/                 # CRM app
│   │   ├── models.py       # Lead, Interaction models
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── pipeline.py
│   ├── analytics/           # Analytics app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── pricing_engine.py
│   │   └── market_data.py
│   ├── whatsapp/            # WhatsApp integration
│   │   ├── views.py
│   │   ├── webhooks.py
│   │   ├── templates.py
│   │   └── client.py
│   └── avm/                 # AVM (Automated Valuation Model)
│       ├── models.py
│       ├── views.py
│       └── engine.py
├── utils/
│   ├── geolocation.py
│   ├── currency.py
│   └── validators.py
├── celery_app.py           # Celery configuration
├── manage.py
└── requirements.txt
```

## 🔑 KEY MODELS

### Tenant Model (Multi-Tenant)
```python
# apps/core/models.py
from django_tenants.models import TenantMixin, DomainMixin

class Tenant(TenantMixin):
    name = models.CharField(max_length=200)
    subdomain = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    subscription_plan = models.CharField(max_length=50, choices=PLANS)
    subscription_active = models.BooleanField(default=False)
    max_properties = models.IntegerField(default=50)
    max_leads = models.IntegerField(default=500)
    active_islands = ArrayField(models.CharField(max_length=50), default=list)
    
    auto_create_schema = True
    auto_drop_schema = True

class Domain(DomainMixin):
    pass
```

### Property Model (with PostGIS)
```python
# apps/properties/models.py
from django.contrib.gis.db import models as gis_models

class Property(models.Model):
    TYPE_CHOICES = (
        ('apartment', 'Apartamento'),
        ('house', 'Moradia/Vila'),
        ('land', 'Terreno'),
        ('commercial', 'Comercial'),
    )
    
    title = models.CharField(max_length=300)
    description = models.TextField()
    price = models.DecimalField(max_digits=15, decimal_places=0)
    currency = models.CharField(max_length=3, default='CVE')
    property_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, default='available')
    
    # Physical attributes
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    area_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    year_built = models.IntegerField(null=True, blank=True)
    
    # Location (PostGIS)
    island = models.CharField(max_length=50)
    municipality = models.CharField(max_length=100)
    neighborhood = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=300, blank=True)
    location = gis_models.PointField(srid=4326)  # GeoJSON
    
    # Features
    features = models.JSONField(default=dict)
    photos = models.JSONField(default=list)
    virtual_tour_url = models.URLField(blank=True)
    
    # Verification
    verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    agency = models.ForeignKey('core.Tenant', on_delete=models.CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['island', 'property_type', 'status']),
            models.Index(fields=['price']),
        ]
```

### Lead Model (CRM)
```python
# apps/crm/models.py
class Lead(models.Model):
    STATUS_CHOICES = (
        ('new', 'Novo'),
        ('contacted', 'Contactado'),
        ('visit_scheduled', 'Visita Agendada'),
        ('proposal', 'Proposta'),
        ('closed_won', 'Fechado'),
        ('closed_lost', 'Perdido'),
    )
    
    SOURCE_CHOICES = (
        ('website', 'Website'),
        ('whatsapp', 'WhatsApp'),
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('referral', 'Indicação'),
    )
    
    property = models.ForeignKey('properties.Property', on_delete=models.CASCADE)
    agency = models.ForeignKey('core.Tenant', on_delete=models.CASCADE)
    
    # Contact info
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    message = models.TextField(blank=True)
    
    # Pipeline
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='website')
    qualification_score = models.FloatField(default=0.0)
    
    # Assignment
    assigned_to = models.ForeignKey('core.User', null=True, blank=True, on_delete=models.SET_NULL)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_contacted_at = models.DateTimeField(null=True, blank=True)
    next_followup_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['agency', 'status']),
            models.Index(fields=['qualification_score']),
        ]
```

## 🌐 API ENDPOINTS

### Authentication
```python
# POST /api/v1/auth/login/
{
  "email": "agent@agency.cv",
  "password": "securepassword"
}
# Response: { "token": "...", "user": {...}, "tenant": {...} }

# POST /api/v1/auth/register/
{
  "name": "Agent Name",
  "email": "agent@agency.cv",
  "password": "securepassword",
  "tenant_subdomain": "myagency"
}
```

### Properties
```python
# GET /api/v1/properties/?island=Santiago&min_price=500000
# Response: { "count": 45, "results": [...], "next": "...", "previous": "..." }

# GET /api/v1/properties/123/
# Response: { "id": 123, "title": "...", "price": 1500000, ... }

# POST /api/v1/properties/
{
  "title": "Apartamento T3 com Vista Mar",
  "property_type": "apartment",
  "island": "Santiago",
  "municipality": "Praia",
  "price": 1500000,
  "area_m2": 120,
  "bedrooms": 3,
  "bathrooms": 2,
  "location": {
    "type": "Point",
    "coordinates": [-23.5138, 15.1152]
  }
}
```

### Advanced Search (Geo)
```python
# GET /api/v1/properties/search/
# Query params:
# - island: string
# - municipality: string
# - property_type: string
# - min_price, max_price: number
# - min_area, max_area: number
# - bedrooms: number
# - radius: number (km from point)
# - point: "lat,lng" (for radius search)

# Response includes:
# - properties: [...]
# - aggregations: { "price_ranges": [...], "property_types": [...] }
# - heatmap_data: [...] (for visualization)
```

## 🔐 MULTI-TENANT MIDDLEWARE

```python
# apps/core/middleware.py
import re
from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import get_object_or_404
from .models import Tenant
import threading

thread_local = threading.local()

class TenantMiddleware(MiddlewareMixin):
    """Identify tenant based on subdomain and make available in request"""
    
    def process_request(self, request):
        host = request.get_host().split(':')[0]
        
        # Extract subdomain (ex: agency1.imo.cv)
        match = re.match(r'^([a-zA-Z0-9-]+)\.(imo\.cv|localhost)$', host)
        subdomain = match.group(1) if match else None
        
        if subdomain:
            try:
                tenant = Tenant.objects.get(subdomain=subdomain, is_active=True)
                request.tenant = tenant
                thread_local.tenant_id = tenant.id
            except Tenant.DoesNotExist:
                request.tenant = None
                thread_local.tenant_id = None
        else:
            request.tenant = None
            thread_local.tenant_id = None
```

## 🗺️ POSTGIS GEOLOCATION QUERIES

```python
# apps/properties/search.py
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.db.models import Q

def search_properties(filters):
    queryset = Property.objects.filter(status='available')
    
    # Filter by island/municipality
    if filters.get('island'):
        queryset = queryset.filter(island=filters['island'])
    if filters.get('municipality'):
        queryset = queryset.filter(municipality=filters['municipality'])
    
    # Filter by price range
    if filters.get('min_price'):
        queryset = queryset.filter(price__gte=filters['min_price'])
    if filters.get('max_price'):
        queryset = queryset.filter(price__lte=filters['max_price'])
    
    # Geo-radius search
    if filters.get('point') and filters.get('radius'):
        lat, lng = map(float, filters['point'].split(','))
        point = Point(lng, lat, srid=4326)
        radius_meters = float(filters['radius']) * 1000
        
        queryset = queryset.filter(
            location__dwithin=(point, radius_meters)
        ).annotate(
            distance=Distance('location', point)
        ).order_by('distance')
    
    return queryset
```

## 📱 WHATSAPP INTEGRATION

```python
# apps/whatsapp/client.py
import requests
from django.conf import settings

class WhatsAppClient:
    def __init__(self):
        self.api_url = settings.WHATSAPP_API_URL
        self.access_token = settings.WHATSAPP_ACCESS_TOKEN
        self.phone_number_id = settings.WHATSAPP_PHONE_NUMBER_ID
    
    def send_message(self, to, message_type, message_data):
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'messaging_product': 'whatsapp',
            'recipient_type': 'individual',
            'to': to,
            'type': message_type,
            message_type: message_data
        }
        
        response = requests.post(
            f'{self.api_url}/{self.phone_number_id}/messages',
            headers=headers,
            json=payload
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f'WhatsApp API error: {response.text}')
    
    def send_text_message(self, to, text):
        return self.send_message(to, 'text', {'body': text})
```

## 🔄 CELERY TASKS

```python
# apps/properties/tasks.py
from celery import shared_task
from django.core.cache import cache
from .models import Property

@shared_task
def warm_up_cache():
    """Pre-load frequently accessed data into cache"""
    islands = ['Santiago', 'Sal', 'Boa Vista']
    for island in islands:
        properties = Property.objects.filter(
            island=island,
            status='active'
        ).order_by('-created_at')[:50]
        cache.set(f'top_properties_{island}', list(properties.values()), timeout=3600)

@shared_task
def send_price_alerts():
    """Send alerts to users who saved searches"""
    from .models import SavedSearch
    
    saved_searches = SavedSearch.objects.filter(active=True)
    for search in saved_searches:
        new_properties = Property.objects.filter(
            **search.filters,
            created_at__gte=search.last_checked
        )
        
        if new_properties.exists():
            # Send email/WhatsApp notification
            from apps.whatsapp.client import WhatsAppClient
            whatsapp = WhatsAppClient()
            
            for prop in new_properties:
                whatsapp.send_text_message(
                    search.user.phone,
                    f'Nova propriedade: {prop.title} - {prop.price} CVE'
                )
        
        search.last_checked = timezone.now()
        search.save()
```

## ✅ BACKEND CHECKLIST

- [ ] Django 5.0 + DRF configured
- [ ] Multi-tenant architecture with django-tenants
- [ ] PostgreSQL + PostGIS for geolocation
- [ ] Redis cache configured
- [ ] Celery + RabbitMQ for background tasks
- [ ] JWT authentication implemented
- [ ] CORS configured
- [ ] API versioning (v1)
- [ ] Rate limiting implemented
- [ ] Input validation with DRF serializers
- [ ] Database migrations created
- [ ] Indexes optimized for queries
- [ ] PostGIS spatial queries working
- [ ] WhatsApp webhook endpoint
- [ ] Error handling and logging
- [ ] API documentation (OpenAPI/Swagger)

## 🎯 PERFORMANCE TARGETS

```json
{
  "api_response_time": "< 200ms p95",
  "database_queries": "< 5 per request",
  "cache_hit_rate": "> 80%",
  "error_rate": "< 1%",
  "uptime": "> 99.5%",
  "whatsapp_delivery": "> 95%"
}
```
