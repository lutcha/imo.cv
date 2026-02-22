# imo.cv - Plataforma Imobiliária Cabo Verde

## Visão

Tornar-se a infraestrutura digital oficial do mercado imobiliário cabo-verdiano.

## Stack Principal

- Backend: Django 5.0 + DRF + PostGIS
- Frontend: Next.js 14 + TypeScript + Tailwind
- Database: PostgreSQL 15 + PostGIS 3.4
- Maps: Mapbox GL JS
- Infra: DigitalOcean + Cloudflare CDN
- Multi-tenant: django-tenants (schema separation)

## Arquitetura

- Marketplace público + CRM multi-tenant
- Data Intelligence (pricing engine, analytics)
- Trust Layer (verified agents/properties)
- WhatsApp Business API integration

## Mercado

- Foco em Cabo Verde (9 ilhas)
- Agentes imobiliários como clientes pagantes
- Compradores/investidores como usuários finais
- Monetização: subscriptions + success fees + add-ons
