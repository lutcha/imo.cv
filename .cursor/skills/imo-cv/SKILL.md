---
name: imo-cv
description: Provides project knowledge for imo.cv, the Cabo Verde real estate platform. Use when building or modifying imo.cv features, Django/Next.js code, multi-tenant architecture, property/CRM models, Mapbox maps, WhatsApp integration, design system (colors/typography/CVE), 3G performance, or when the user mentions imo.cv, Cabo Verde, or imobiliária.
---

# imo.cv – Project Knowledge

Use this skill whenever working on the **imo.cv** codebase (Cabo Verde real estate platform). It defines stack, architecture, design system, frontend/backend specs, and supervisor/defensive guidelines.

## When to Use

- Implementing or changing **features** (properties, search, CRM, leads, analytics, WhatsApp).
- Writing **Django** (DRF, PostGIS, django-tenants) or **Next.js** (App Router, TypeScript, Tailwind) code.
- Working with **multi-tenant** routing, schemas, or shared vs tenant apps.
- Applying **design system** (colors, spacing, buttons, dark mode) or **localization** (CVE/EUR/USD, pt-CV dates, municipalities).
- Optimizing for **3G** (bundle size, LCP, code splitting, lazy loading).
- Planning **migrations**, **deploys**, or **incidents** (escalation, defensive development).

## Quick Reference

| Need | Read |
|------|------|
| Vision, stack, market | [project-overview.md](project-overview.md) |
| Versions (Django, Next, PostGIS, etc.) | [tech-stack.md](tech-stack.md) |
| Multi-tenant, API layout, data flow | [architecture.md](architecture.md) |
| Colors, typography, components, CVE/date format | [design-system.md](design-system.md) |
| App structure, components, performance, i18n | [frontend-spec.md](frontend-spec.md) |
| Django apps, models, API, Celery, WhatsApp | [backend-spec.md](backend-spec.md) |
| Checklists, escalation, defensive dev | [supervisor-guidelines.md](supervisor-guidelines.md) |
| Currency, dates, municipalities CV | [localization.md](localization.md) |

## Core Constraints

- **Stack**: Backend Django 5 + DRF + PostGIS; Frontend Next.js 14 (App Router) + TypeScript + Tailwind; DB PostgreSQL 15 + PostGIS; multi-tenant via django-tenants (schema per tenant).
- **Geography**: Cabo Verde (9 islands). Use municipality/island lists and CVE/EUR formatting from design-system and localization refs.
- **Performance**: 3G-friendly – main bundle &lt; 150KB, LCP &lt; 2.5s; use code splitting, lazy loading, React Query.
- **Changes**: Follow defensive development and supervisor guidelines for DB/multi-tenant/infra/WhatsApp changes; escalate when criteria in supervisor-guidelines are met.

## Workflow

1. **Identify domain** (e.g. new API endpoint, new UI component, migration, WhatsApp).
2. **Open the relevant reference** from the table above.
3. **Apply specs** (models, endpoints, design tokens, CVE formatting, etc.).
4. **For risky changes** (schema, multi-tenant, infra): check [supervisor-guidelines.md](supervisor-guidelines.md) for approval level and escalation.

## Reference Files (one level deep)

All detailed specs live in the same directory as this SKILL.md:

- [project-overview.md](project-overview.md) – Vision, stack, architecture summary, market.
- [tech-stack.md](tech-stack.md) – Backend, frontend, infra, mobile versions.
- [architecture.md](architecture.md) – Multi-tenant schemas, API tree, data flow, security.
- [design-system.md](design-system.md) – Colors, typography, spacing, components, dark mode.
- [frontend-spec.md](frontend-spec.md) – App structure, key components, performance, i18n.
- [backend-spec.md](backend-spec.md) – Django layout, tenant setup, Property/Lead models, API, Celery, WhatsApp.
- [supervisor-guidelines.md](supervisor-guidelines.md) – Daily checklists, decision framework, escalation, defensive dev.
- [localization.md](localization.md) – CVE/EUR/USD, dates, municipalities Cabo Verde.

Read only the files needed for the current task to keep context small.
