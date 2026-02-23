# Plano de implementação: CRM e Gestão de Condomínios (frontend)

Análise do estado atual e próximos passos a nível de frontend.

---

## 1. CRM (área agente)

### 1.1 Estado atual

**Backend (Django)**
- `api/leads/` – CRUD de leads (list, get, PATCH, POST). Status e prioridade alinhados ao Kanban.
- `api/crm/` – `CRMInteraction` ViewSet: interações por lead (tipo: CHAMADA, EMAIL, WHATSAPP, REUNIAO, VISITA, OUTRO), com summary, description, interaction_date, follow_up_date. Filtro por `?lead=<id>`. **Nota:** O modelo `CRMInteraction` não tem campo `agency`; a view usa `agency` em `perform_create` e `get_queryset` – pode ser necessário alinhar o modelo (ex.: agency via lead) ou remover filtro por agency.
- `api/analytics/` – **Não existe atualmente** no backend (não há rota em `imocv/urls.py`). O frontend espera GET `/analytics/dashboard/` para KPIs; será necessário criar a app/endpoint no Django ou usar dados derivados de leads/properties.

**Frontend (Next.js)**
- **Dashboard** (`/agente`): 4 KpiCards com valores "—"; texto indica API GET `/api/v1/analytics/dashboard/`. Não há chamada real à API.
- **Leads** (`/agente/leads`): Lista de leads via `useLeads()`; `PipelineKanban` com arrastar largar; texto indica PATCH leads/:id. O Kanban já mapeia estágios para status e faz update (verificar se `onLeadUpdate` está ligado à mutation).
- **Imóveis** (`/agente/imoveis`): Lista e “Adicionar imóvel”; fluxo de registo multi-step implementado.
- **Interações CRM**: Não existe UI para listar ou criar interações (chamada, e-mail, reunião) por lead. Não há página de detalhe de lead nem chamadas a `api/crm/`.

### 1.2 O que falta (CRM frontend)

| Item | Prioridade | Descrição |
|------|------------|-----------|
| Dashboard KPIs reais | Alta | Chamar API de analytics (confirmar path: `/api/analytics/dashboard/` ou `/api/crm/...`) e preencher os 4 KpiCards. Tratar loading e erro. |
| Lead detail page | Alta | Página `/agente/leads/[id]` com dados do lead, histórico de interações e formulário para nova interação. |
| API client CRM | Alta | Criar `lib/api/crm.ts`: list interactions (`?lead=id`), create interaction. Tipos para `CRMInteraction`. |
| Kanban → PATCH lead | Média | Garantir que, ao mover cartão, se faz PATCH do lead com o novo status (mapear estágio → status do backend). |
| i18n área agente | Média | Passar textos do dashboard, leads e (futura) página de detalhe para chaves i18n (PT/EN/FR). |
| Novo lead (modal ou página) | Baixa | Botão “Novo lead” com formulário (nome, email, telefone, origem, imóvel de interesse) e POST `/api/leads/`. |

### 1.3 Próximos passos CRM (ordem sugerida)

1. **Confirmar backend**: Verificar se existe rota de analytics (dashboard) e path exato; corrigir `CRMInteraction` (agency) se necessário.
2. **Dashboard**: Integrar `analyticsApi.getDashboardStats()` no dashboard do agente; mostrar totais em KpiCards; loading/erro.
3. **API CRM no frontend**: `crmApi.list(leadId)`, `crmApi.create(payload)`; tipos para interação.
4. **Página detalhe do lead**: Rota `/agente/leads/[id]`; mostrar lead + lista de interações + formulário “Nova interação” (tipo, resumo, descrição, data de follow-up).
5. **Kanban**: Garantir que o drag-and-drop dispara PATCH do lead com o status correto (mapeamento estágio ↔ status).
6. **i18n**: Extrair strings do dashboard e leads para `translations/*.json`.

---

## 2. Gestão de condomínios

### 2.1 Estado atual

**Backend**
- Não existe app “condomínios” nas URLs do projeto (`api/agencies/`, `api/properties/`, `api/leads/`, `api/crm/`). Não há modelos de unidade, quota, assembleia, avisos, etc.

**Frontend**
- **`(agency)/[subdomain]`**: Layout e página por subdomínio pensados para **agência imobiliária** (montra de imóveis da agência), não para gestão de condomínio. O comentário no código fala em “agency info by subdomain” e “our properties”. Não há menção a unidades, quotas ou administração de condomínio.

**Referência Stitch**
- Os ecrãs “Condo Management”, “Finances & Fee Invoicing”, “Maintenance Requests” (stitch/stitch-screens) são um produto de **gestão de condomínios** (unidades, receitas, avisos, manutenção). Esse fluxo não está implementado nem no backend nem no frontend atuais.

### 2.2 Conclusão sobre condomínios

- **Gestão de condomínios** (unidades, quotas, avisos, manutenção, finanças) está **fora do âmbito atual** do projeto.
- O grupo de rotas `(agency)/[subdomain]` serve a **montra da agência** (página pública por subdomínio), não um painel de administração de condomínio.

### 2.3 Opções para o futuro (condomínios)

Se for produto desejado mais à frente:

1. **Backend**: Novo app (ex.: `condominiums` ou `condos`) com modelos: Condominium, Unit, Fee/Quota, MaintenanceRequest, etc., e APIs REST.
2. **Frontend**: Nova área (ex.: `/condominio` ou subdomínio dedicado) com:
   - Dashboard (resumo financeiro, avisos, pedidos de manutenção),
   - Gestão de unidades e proprietários,
   - Módulo financeiro (quotas, pagamentos),
   - Módulo de manutenção (pedidos, estados),
   - Avisos e comunicações.
3. **Reutilização**: Autenticação e layout base podem ser alinhados com a área agente, mas a lógica de negócio e as APIs são específicas de condomínio.

Nada disto está no plano de implementação imediato; pode ser registado como **roadmap futuro** quando houver prioridade de produto e backend.

---

## 3. Resumo

| Área | Estado | Ação recomendada |
|------|--------|-------------------|
| **CRM (leads + interações)** | Leads e Kanban existem; faltam dashboard com KPIs reais, detalhe do lead e interações (API + UI) | Implementar conforme secção 1.3 (dashboard → API CRM → página lead → Kanban PATCH → i18n). |
| **Condomínios** | Não existe backend nem fluxo de gestão de condomínio | Manter como roadmap futuro; não iniciar implementação frontend sem API e modelos de condomínio. |
| **(agency)/[subdomain]** | Montra da agência por subdomínio (imóveis) | Manter como está; não confundir com “gestão de condomínios”. |

---

## 4. Ficheiros úteis (CRM)

- Backend: `src/crm/models.py`, `src/crm/views.py`, `src/crm/urls.py`, `src/leads/`
- Frontend: `web/app/(agent)/agente/page.tsx`, `web/app/(agent)/agente/leads/page.tsx`, `web/components/dashboard/PipelineKanban.tsx`, `web/lib/api/leads.ts`, `web/lib/api/analytics.ts`, `web/lib/hooks/useLeads.ts`
- A criar: `web/lib/api/crm.ts`, `web/app/(agent)/agente/leads/[id]/page.tsx`, tipos para interações
