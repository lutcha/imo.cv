# Backend Specification - imo.cv

## Django Project Structure

```
backend/
├── core/                 # Tenant, User, middleware, settings
├── properties/           # Property, Feature; views, serializers, filters, search
├── crm/                  # Lead, Interaction; views, serializers, pipeline
├── analytics/            # models, views, pricing_engine, market_data
├── whatsapp/             # views, webhooks, templates, client
├── utils/                # geolocation, currency, validators
└── celery_app.py
```

## Multi-Tenant (django-tenants)

- SHARED_APPS: django_tenants, core, contenttypes, auth, sessions, messages, staticfiles, billing, market_analytics.
- TENANT_APPS: contenttypes, auth, properties, crm, analytics, whatsapp.
- TENANT_MODEL: core.Tenant. Domain: core.Domain. PUBLIC_SCHEMA_URLCONF: core.urls_public.
- Tenant fields: name, subdomain, subscription_plan, subscription_active, subscription_expires_at, active_islands, max_properties, max_leads; auto_create_schema, auto_drop_schema True.

## Key Models

### Property (properties)

- title, description, property_type, status; island, municipality, neighborhood, address; location (PointField SRID 4326); price, currency, price_history (JSON); area_m2, bedrooms, bathrooms, year_built; features (JSON); verified, verified_at, verified_by; photos (JSON), virtual_tour_url; created_at, updated_at, created_by. Indexes: (island, property_type, status), price, created_at.

### Lead (crm)

- property FK; name, phone, email, message; source (whatsapp, website, etc.); stage (new, contacted, visit_scheduled, proposal_sent, negotiation, closed_won, closed_lost); qualification_score, score_factors (JSON); assigned_to; created_at, updated_at, last_contacted_at, next_followup_at. Indexes: (stage, assigned_to), created_at, qualification_score.

## API (summary)

- Auth: POST login, register, refresh (JWT).
- Properties: GET/POST list, GET/PUT/PATCH/DELETE detail; GET search with query params (island, municipality, property_type, min/max price, area, bedrooms, bathrooms, features, radius, point, sort). Response: results + aggregations + heatmap_data.
- Leads: CRUD + pipeline, scoring.

## Celery

- Beat: warm_up_cache (hourly), aggregate_daily_metrics (2 AM), send_price_alerts (9 AM), cleanup_inactive_users (Sunday 3 AM). Tasks: cache top properties by island, price ranges; saved-search price alerts (email/WhatsApp).

## WhatsApp

- Webhook: verify signature; on messages → create/update Lead, log Interaction, optional welcome; update lead score.
- Client: send text, send template (name, language, components); use WhatsApp API URL + token + phone_number_id.

## Database

- Indexes: composite (island, municipality, property_type, status), spatial on location, price, GinIndex on title+description. Use select_related/prefetch_related to avoid N+1.
