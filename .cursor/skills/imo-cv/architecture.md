# Arquitetura do Sistema - imo.cv

## Multi-Tenant Architecture (django-tenants)

### Estratégia

- **Schema separation**: Cada agência = schema separado no PostgreSQL
- **Shared database**: Mesma instância PostgreSQL
- **Routing**: Baseado em subdomínio (agencia1.imo.cv)

### Schema Structure

```
public schema (shared)
├── tenants_tenant (lista de todos tenants)
├── auth_user (superusers only)
├── market_analytics (dados agregados)
└── billing (informações de pagamento)

tenant_schema (isolado por agência)
├── auth_user (users da agência)
├── properties_property
├── crm_lead
├── crm_interaction
├── analytics_agentperformance
└── custom tables...
```

## API Architecture

### Endpoints Principais

```
/api/v1/
├── auth/                    # Autenticação
│   ├── login/
│   ├── register/
│   ├── logout/
│   └── refresh/
├── properties/              # Propriedades
│   ├── /                    # GET (search), POST (create)
│   ├── /{id}/               # GET, PUT, PATCH, DELETE
│   ├── /search/             # Busca avançada
│   └── /types/              # Tipos disponíveis
├── leads/                   # CRM - Leads
│   ├── /                    # GET, POST
│   ├── /{id}/               # GET, PUT, PATCH, DELETE
│   ├── /pipeline/           # Pipeline stages
│   └── /scoring/            # Lead scoring
├── analytics/               # Analytics
│   ├── /market/             # Market data
│   ├── /agent/              # Agent performance
│   └── /pricing/            # Pricing recommendations
├── whatsapp/                # WhatsApp Integration
│   ├── /send/
│   ├── /webhook/
│   └── /templates/
└── tenants/                 # Tenant management
    ├── /                    # GET (list), POST (create)
    ├── /{id}/               # GET, PUT, PATCH, DELETE
    └── /current/            # Current tenant info
```

## Data Flow

### Busca de Propriedades

```
User → Next.js Frontend → API Gateway → Property Service
                                              ↓
                                        PostGIS Query
                                              ↓
                                        Redis Cache
                                              ↓
                                        Elasticsearch (future)
                                              ↓
                                        Response → Frontend → User
```

### Lead Capture via WhatsApp

```
User WhatsApp → WhatsApp Business API → Webhook Endpoint
                                              ↓
                                        Lead Creation
                                              ↓
                                        Lead Scoring (ML)
                                              ↓
                                        Notification to Agent
                                              ↓
                                        CRM Update
```

## Security Layers

1. **Network Level**: Cloudflare WAF + DDoS protection
2. **API Level**: JWT authentication + rate limiting
3. **Data Level**: Tenant isolation + encryption at rest
4. **Application Level**: Input validation + CSRF protection
