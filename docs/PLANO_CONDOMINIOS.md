# Plano: Gestão de Condomínios (imo.cv)

Plano atualizado para o módulo de **Gestão de Condomínios**, alinhado com o [PLANO_CRM_E_CONDOMINIOS_FRONTEND.md](PLANO_CRM_E_CONDOMINIOS_FRONTEND.md) e com os ecrãs de referência (stitch-screens: Condo Management, Finances, Maintenance).

---

## 1. Âmbito e premissas

- **Backend**: Não existia app de condomínios (unidades, quotas, avisos, manutenção). Este plano implementa o app Django `condominiums` como base para o produto.
- **Frontend**: A rota `(agency)/[subdomain]` é para **montra da agência** (página pública por subdomínio), **não** para gestão de condomínio. A área de gestão de condomínio será futura (nova área, ex.: `/condominio` ou subdomínio dedicado).
- **Ecrãs stitch**: Condo Management Dashboard, Finances & Fee Invoicing, Maintenance Requests são tratados como **roadmap futuro** — exigem primeiro este backend e depois frontend dedicado.

---

## 2. Fase 1 – Backend (prioridade atual)

### 2.1 App Django `condominiums`

- **Localização**: `src/condominiums/`
- **Multi-tenant**: Incluído em `TENANT_APPS`; dados isolados por schema (por agência/tenant).
- **Modelos** (implementação defensiva, campos mínimos necessários):

| Modelo | Descrição | Campos principais |
|--------|-----------|-------------------|
| **Condominium** | Edifício/condomínio gerido | name, address, island, municipality, currency (CVE/EUR), is_active, created_at, updated_at |
| **Unit** | Fração/unidade | condominium FK, identifier (ex: "A101"), floor, area_m2, owner_name, owner_phone, owner_email (opcional), created_at, updated_at |
| **Fee** | Quota / mensalidade | condominium FK, unit FK (null = quota comum), amount, currency, due_date, period (ex: "2025-01"), status (PENDING, PAID, OVERDUE), paid_at, created_at, updated_at |
| **MaintenanceRequest** | Pedido de manutenção | condominium FK, unit FK (null = área comum), title, description, status (OPEN, IN_PROGRESS, RESOLVED), priority (LOW, MEDIUM, HIGH, URGENT), reported_by (User FK, opcional), created_at, updated_at |
| **Notice** | Aviso / comunicação | condominium FK, title, body, published_at (nullable), created_at, updated_at |

- **API REST** (versionada, autenticada):
  - `GET/POST /api/v1/condominiums/` — listar / criar condomínio
  - `GET/PUT/PATCH/DELETE /api/v1/condominiums/{id}/` — detalhe
  - `GET/POST /api/v1/condominiums/{id}/units/` — unidades
  - `GET/POST /api/v1/condominiums/{id}/fees/` — quotas (com filtros period, status, unit)
  - `GET/POST /api/v1/condominiums/{id}/maintenance-requests/` — pedidos de manutenção
  - `GET/POST /api/v1/condominiums/{id}/notices/` — avisos

- **Segurança**: `IsAuthenticated`; filtro por tenant implícito (schema). Nenhum dado de outro tenant acessível.
- **Defensivo**: Validação em serializers (amount ≥ 0, datas, choices); índices em (condominium_id, status), (condominium_id, due_date); sem remoção em cascata de dados críticos sem lógica explícita.

### 2.2 Integração no projeto

- Registar `condominiums` em `INSTALLED_APPS` e em `TENANT_APPS`.
- Incluir `path('api/condominiums/', include('condominiums.urls'))` em `imocv/urls.py`.
- **Migrations**: `python manage.py makemigrations condominiums` e `migrate` (ou `migrate_schemas` conforme django-tenants). Executar num ambiente com PostgreSQL + PostGIS/GDAL (ex.: Docker); em Windows sem OSGeo4W, usar Docker ou definir `GDAL_LIBRARY_PATH` no `.env`.

### 2.3 Documentação e testes

- Docstrings nos models e nas views; opcional: breve secção em `backend-spec` ou doc de API.
- Testes unitários para models e serializers; testes de API para list/detail/create (condominium, unit, fee, maintenance, notice) por tenant.

---

## 3. Fase 2 – Frontend (roadmap futuro)

- **Não** reutilizar `(agency)/[subdomain]` para gestão de condomínio; essa rota permanece para montra da agência.
- Nova área dedicada, por exemplo:
  - `/condominio` (por tenant) ou subdomínio específico para condomínios.
- Ecrãs a desenvolver depois do backend estável:
  - Dashboard (resumo: unidades, ocupação, pedidos pendentes, pagamentos em atraso) — alinhado ao stitch “Condo Management Dashboard”.
  - Unidades e proprietários (lista, detalhe, edição).
  - Finanças (quotas, pagamentos, histórico) — alinhado ao stitch “Finances & Fee Invoicing”.
  - Manutenção (pedidos, estados, prioridades) — alinhado ao stitch “Maintenance Requests”.
  - Avisos e comunicações.
- Autenticação e layout base podem ser alinhados à área agente; as APIs e fluxos são específicos do app `condominiums`.

---

## 4. Resumo de decisões

| Item | Decisão |
|------|--------|
| Backend condomínios | Novo app `condominiums` com Condominium, Unit, Fee, MaintenanceRequest, Notice. |
| Multi-tenant | App em TENANT_APPS; isolamento por schema. |
| Frontend (agency)/[subdomain] | Mantido apenas para montra da agência; não usar para gestão de condomínio. |
| Ecrãs stitch (condo, finanças, manutenção) | Roadmap futuro; implementar após API de condomínios estável. |
| Rota API | `/api/condominiums/` (ou `/api/v1/condominiums/` conforme versionamento do projeto). |

---

## 5. Ficheiros criados/modificados (Fase 1)

- **Criados**: `src/condominiums/` (apps, models, admin, serializers, views, urls), `docs/PLANO_CONDOMINIOS.md`.
- **Modificados**: `src/imocv/settings.py` (INSTALLED_APPS, TENANT_APPS), `src/imocv/urls.py` (include condominiums.urls).
