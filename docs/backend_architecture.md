# Arquitetura Backend & Dados – imo.cv

## 1. Escolha do Stack Tecnológico

### Backend Framework: **Python + Django + Django REST Framework**

**Justificação:**
- O projeto já está iniciado em **Django 5.0**, com boa integração com **PostgreSQL** e **PostGIS** via `django.contrib.gis`.
- **Django ORM** simplifica multi-tenancy por `tenant_id`, migrations e auditoria.
- **Django REST Framework (DRF)** oferece serializers, permissões, throttling e documentação (CoreAPI/OpenAPI) com pouco código.
- Ecossistema maduro para auth (JWT, OAuth2), Celery para tarefas assíncronas (alertas, AVM) e Django Channels se no futuro for preciso WebSockets.
- Equipa em Cabo Verde pode mais facilmente encontrar recursos em Python/Django do que em Node/Nest ou Ruby.

**Alternativas consideradas:**
- **NestJS (Node.js):** Bom para APIs muito granulares e equipas JS-fullstack; menos conveniente para modelos de dados complexos e geo (PostGIS) sem camada extra.
- **Ruby on Rails:** Excelente produtividade, mas ecossistema geo menos forte que Django+PostGIS.

---

### Base de Dados: **PostgreSQL + PostGIS**

**Justificação:**
- **PostgreSQL:** Dados estruturados (utilizadores, agências, imóveis, leads), ACID, JSONB para atributos flexíveis dos imóveis, full-text search nativo.
- **PostGIS (extensão):** Queries geo nativas: “imóveis dentro de polígono”, “raio X km”, “ordenar por distância”, heatmaps e índices espaciais (GiST). Essencial para pesquisa geo avançada e AVM por zona.
- **Uma única base** com discriminação por `agency_id` (tenant) simplifica backups, migrações e relatórios cross-tenant para o marketplace público.

**MongoDB:** Não é necessária na fase inicial. Se no futuro houver necessidade de documentos não estruturados (ex.: histórico de alterações de preço em formato livre), PostgreSQL com **JSONB** cobre a maioria dos casos. MongoDB pode ser considerada mais tarde para logs de eventos ou cache de recomendações.

---

### APIs: **REST + GraphQL**

**Justificação:**
- **REST (DRF)** para operações clássicas e estáveis: CRUD de imóveis, criação de leads, auth. Facilita cache, rate limiting e integrações externas (webhooks, parceiros).
- **GraphQL (Graphene-Django)** para o frontend do marketplace e do CRM: o cliente pede exatamente os campos que precisa (lista de imóveis com apenas título, preço, thumbnail e coordenadas), reduzindo over-fetching e número de requests. Ideal para ecrãs com muitos filtros e dados relacionados (imóvel + agência + agente).
- Estratégia: **REST para escrita e operações críticas; GraphQL para leitura e experiências ricas no frontend.**

---

## 2. Arquitetura Multi-tenant

### Estratégia: **Single database, row-level isolation (tenant_id / agency_id)**

- **Uma única base de dados** PostgreSQL.
- Todas as tabelas “privadas” à agência têm uma chave estrangeira **`agency_id`** (tenant). Ex.: `properties`, `leads`, `crm_interactions`, e utilizadores ligados a agências.
- **Isolamento:**
  - Em cada request, o backend identifica o tenant (via JWT, subdomínio ou header `X-Agency-Id` para API keys).
  - Middleware ou mixin em todas as views/querysets garante **filtro implícito** por `agency_id`. Nenhum endpoint de CRM ou gestão de imóveis devolve ou altera dados de outra agência.
- **Vantagens:** Operação simples, um backup, migrações únicas, fácil fazer analytics e índice de preços sobre todo o dataset (marketplace). Desvantagem: exigência disciplinar de nunca esquecer o filtro por tenant (abordagem com **DefaultManager** e **get_queryset** no DRF reduz o risco).

**Alternativa não escolhida:** *Schema-per-tenant* (ex.: django-tenant-schemas). Daria isolamento forte por schema, mas complica migrações, backups e queries globais (ex.: pesquisa pública de todos os imóveis). Pode ser reavaliada se requisitos de compliance exigirem isolamento físico por agência.

### Identificação do tenant

- **Utilizador autenticado (agente/admin):** `request.user.agency_id` → todas as queries filtradas por essa agência.
- **API pública (marketplace):** Sem tenant; acesso apenas a dados públicos (imóveis publicados, agências verificadas).
- **Comprador final:** Não é tenant; quando contacta um agente, cria-se um **Lead** no contexto da agência do imóvel.

---

## 3. Modelagem de Dados (Principais Entidades)

### 3.1 Utilizadores e papéis

- **User (AbstractUser ou extensão):** email, nome, telefone, role (enum: `buyer`, `agent`, `agency_admin`, `platform_admin`), `agency_id` (nullable para compradores e superuser). Campos de auditoria: `created_at`, `updated_at`.
- **Agentes** e **agency_admin** têm `agency_id` preenchido; **buyer** e **platform_admin** podem ter `agency_id` null.

### 3.2 Agências (Tenants)

- **Agency:** nome, slug, NIF, morada, ilha, contacto, logo, plano (free/pro), verificado (trust layer), `created_at`, `updated_at`.

### 3.3 Imóveis (Listagens)

- **Property:** `agency_id`, tipo (venda/arrendamento/férias), tipologia (T1, T2, moradia…), título, descrição, preço, moeda, área_util, área_bruta, quartos, casas_de_banho, geolocalização (Point com PostGIS), morada, ilha, concelho, freguesia/bairro, ano_construcao, estado (rascunho/publicado/vendido/arrendado), destaque, `created_at`, `updated_at`, `published_at`. Índices: agency_id, estado, location (espacial), preço.

### 3.4 Leads

- **Lead:** `agency_id`, `property_id` (nullable), origem (formulário/whatsapp/email), nome_contacto, email, telefone, mensagem, estado (novo/contactado/visita/proposta/fechado), `created_at`, `updated_at`. Permite registar interessados mesmo sem imóvel específico (lead “geral”).

### 3.5 Interações CRM

- **CrmInteraction:** `agency_id`, `lead_id`, tipo (nota/chamada/visita/email/tarefa), conteúdo (texto ou JSON), data_agendada (para tarefas/visitas), utilizador que registou, `created_at`, `updated_at`. Suporta pipeline (estado do lead pode ser atualizado via interação).

### 3.6 Auditoria

- Em todas as tabelas: **`created_at`**, **`updated_at`** (e onde fizer sentido `created_by` / `updated_by`). Para propriedades e leads, considerar tabela de **histórico de preços** (price_history) para AVM e relatórios.

---

## 4. Lógica de Negócio e APIs

### 4.1 API de Pesquisa Geo

- **Endpoint (REST):** `GET /api/v1/properties/search/`  
  Parâmetros: `lat`, `lon`, `radius_km` **ou** `polygon` (GeoJSON), mais filtros (tipo, preço_min, preço_max, tipologia, quartos).
- **Lógica:** Query PostGIS: `Property.objects.filter(location__distance_lte=(point, D(km=radius)))` ou `location__within=polygon`, com filtros de negócio. Ordenação por distância ou relevância.
- **GraphQL:** Query `properties(search: GeoSearchInput!)` com os mesmos critérios, devolvendo lista de nós `Property` (campos escolhidos pelo cliente).

### 4.2 API de Gestão de Imóveis (CRUD)

- **Endpoints REST:** `GET/POST /api/v1/properties/`, `GET/PATCH/DELETE /api/v1/properties/{id}/`.
- **Permissões:** Apenas utilizadores com role `agent` ou `agency_admin` da **mesma agência** do imóvel podem editar/apagar. Leitura pública para imóveis com estado `published`.
- **Validações:** Preço > 0, coordenadas dentro de Cabo Verde (opcional), campos obrigatórios conforme tipo de negócio.

### 4.3 API de Leads

- **Criar lead (público):** `POST /api/v1/leads/` com `property_id` (ou null), nome, email, telefone, mensagem. Backend associa à agência do imóvel (ou à agência indicada). Rate limiting por IP/email para evitar spam.
- **CRM (agentes):** `GET/PATCH /api/v1/leads/` e `.../leads/{id}/` com filtro implícito por `agency_id`; apenas a agência dona do lead pode ver/editar.

### 4.4 API de Recomendação Inicial

- **Endpoint:** `GET /api/v1/recommendations/` (ou GraphQL `recommendations(limit: Int)`).
- **Input:** Utilizador autenticado (opcional) ou session/cookie com favoritos e últimas pesquisas.
- **Lógica simples (v1):**  
  - Se tiver favoritos: imóveis semelhantes (mesma ilha/tipologia, faixa de preço próxima) excluindo já favoritados.  
  - Se tiver pesquisas recentes: últimos imóveis que correspondam aos mesmos filtros.  
  - Fallback: imóveis publicados recentemente ou mais visualizados, por ilha.
- **Evolução:** Mais tarde integrar histórico de visualizações e modelo de scoring (collaborative/content-based).

---

## 5. Segurança e Boas Práticas

- **Autenticação:** JWT para SPA (refresh + access tokens); cookies HttpOnly como alternativa para maior segurança.
- **Tenant em cada request:** Nunca confiar em `agency_id` vindo do cliente para escritas; usar sempre `request.user.agency_id` ou token.
- **Rate limiting:** Em endpoints públicos (pesquisa, criação de lead) para abusos e scraping.
- **CORS e CSP:** Configurados em produção para o domínio do frontend.
- **Dados sensíveis:** Telefones e emails de leads só acessíveis à agência dona; nunca expor em APIs públicas.

---

## 6. Próximos Passos (Roadmap Técnico)

1. Configurar PostgreSQL + PostGIS e migrar de SQLite para desenvolvimento.
2. Implementar modelos (core, properties, leads, crm) e migrations.
3. Implementar autenticação JWT e middleware de tenant.
4. Implementar endpoints REST (geo search, CRUD imóveis, leads, recomendações).
5. Adicionar GraphQL (Graphene-Django) para queries de leitura do marketplace e CRM.
6. Testes unitários e de integração para garantia de isolamento por tenant.
