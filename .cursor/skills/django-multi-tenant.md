---
name: django-multi-tenant
description: Covers django-tenants schema-per-tenant setup, Tenant/Domain models, middleware routing by subdomain, and tenant-scoped queries for imo.cv. Use when working with multi-tenant logic, tenant isolation, or subdomain routing.
---

# Django Multi-Tenant – imo.cv

Reference: [Backend Engineer Agent](../agents/backend-engineer.md) for full implementation.

## When to Use

- Adding or changing tenant/subdomain logic.
- Writing queries that must be tenant-scoped.
- Changing tenant routing (e.g. subdomain vs path).
- Planning migrations that affect tenant schemas.

## Key Concepts

- **Tenant**: One agency; has `subdomain`, `max_properties`, `max_leads`, `active_islands`.
- **Domain**: Links host (e.g. `agency1.imo.cv`) to a Tenant.
- **Middleware**: Resolves tenant from `request.get_host()`; sets `request.tenant` and thread-local tenant id.
- **Schema**: Each tenant has its own PostgreSQL schema; shared app for Tenant/Domain.

## Rules

- All tenant-specific data (Property, Lead, etc.) lives in tenant schema.
- Always filter by tenant (or use tenant connection) in views/serializers.
- Escalate to Supervisor for changes to tenant isolation or routing (see [Supervisor](../agents/supervisor.md)).
