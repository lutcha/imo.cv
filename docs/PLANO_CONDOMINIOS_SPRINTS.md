# Plano de Desenvolvimento — Módulo de Condomínios imo.cv
**Data:** 2026-03-19 · **Versão:** 1.1 · **Sprint cadência:** 1 prompt = 1 entregável atómico

---

## Status Real (2026-03-19)

| Sprint | Entregável | Estado | Notas |
|--------|-----------|--------|-------|
| S0-A | Migrations + seed data | ✅ Completo | 10 condos, 129 units, 712 fees, CommonAreas, Reservations |
| S0-B | Tipos TypeScript | ✅ Completo | `web/types/condominium.ts` — 223 linhas |
| S0-C | API Client frontend | ✅ Completo | `web/lib/api/condominiums.ts` — com Common Areas e Reservations |
| S1-A | FeeTracker real | ✅ Completo | useQuery + unitsMap O(1), skeleton, currency formatting |
| S1-B | Dashboard agente conectado | ✅ Completo | 3 queries paralelas, quick access cards reais |
| S1-C | Página detalhe condomínio | ✅ Completo | 5 tabs, lazy queries, ReservationCalendar integrado |
| S1-D | Formulário criar/editar | ✅ Completo | Modal + Zod + createMutation/updateMutation separados |
| Fix-1 | URL `/availability/` em falta | ✅ Corrigido | `urls.py` manual path adicionado |
| Fix-2 | `date.replace()` erro 500 | ✅ Corrigido | `datetime.combine()` em `views.py` |
| Fix-3 | TypeScript `address?: string` | ✅ Corrigido | `type Payload` + `tsc --noEmit` limpo |
| **S2** | Reservas UI (Sprint 2-A) | ✅ Completo | Models + ViewSets + ReservationCalendar existem |
| **S3+** | Manutenções enriquecidas | 🔲 Pendente | |
| **S4+** | Avisos + moeda | 🔲 Pendente | |
| **S5+** | WhatsApp notifs | 🔲 Pendente | |
| **S6+** | Portal do morador | 🔲 Pendente | `src/condominiums/resident_auth.py` + URLs já existem |
| **S7+** | Seed data enriquecido | 🔲 Pendente | |
| **S8+** | Assembly/Votação | 🔲 Pendente | |
| **S9+** | Marketplace + AVM | 🔲 Pendente | |

### Pendente imediato
- [ ] Botão "Adicionar Condomínio" na dashboard lista → abrir `CondominiumForm` modal

---

---

## Estado Actual (Diagnóstico)

### ✅ O que está feito (não tocar sem razão)
| Componente | Estado | Ficheiros |
|-----------|--------|-----------|
| 5 modelos Django | ✅ Completo | `src/condominiums/models.py` |
| 5 serializers DRF | ✅ Completo | `src/condominiums/serializers.py` |
| 5 ViewSets + URLs | ✅ Completo | `src/condominiums/views.py`, `urls.py` |
| Django Admin | ✅ Completo | `src/condominiums/admin.py` |
| Seed data (3 condos) | ✅ Completo | `src/core/management/commands/seed_demo_data.py` |
| 4 páginas frontend | ✅ Estrutura | mock data, sem API |
| FeeTracker component | ✅ UI | mock data, sem API |
| Landing page pública | ✅ Completo | `web/app/(public)/solucoes/condominios/` |

### ❌ O que falta (bloqueadores críticos primeiro)
| Gap | Impacto | Sprint |
|-----|---------|--------|
| **Migrations nunca rodaram** | Tabelas não existem em DB | S0 |
| **Sem `condominiums.ts` API client** | Frontend não pode chamar API | S0 |
| **Sem `condominium.ts` types** | Sem TypeScript, sem autocomplete | S0 |
| FeeTracker ligado a mock | Dashboard não mostra dados reais | S1 |
| Sem modelo `CommonArea` + `Reservation` | Feature core do UCondo | S2 |
| Sem página de detalhe condomínio | Não dá para gerir um condo | S1 |
| Sem formulários criar/editar | Não dá para adicionar dados | S1 |
| Manutenções sem UI funcional | Listadas mas não geríveis | S3 |
| Sem avisos/comunicados UI | Listados mas sem formulário | S4 |
| Sem integração WhatsApp notifs | Canal primário em CV (92%) | S5 |
| Sem portal do morador | Moradores não têm acesso | S6 |
| Seed data pobre (3 condos) | Demo não impressiona | S7 |
| Tests.py vazio | Código sem cobertura | cada sprint |

---

## Fontes de Dados Reais para Demo

> Dados públicos gratuitos para enriquecer seed e tornar a demo credível.

| Fonte | URL | Dados úteis | Sprint |
|-------|-----|-------------|--------|
| **INE Cabo Verde** | https://ine.cv | Nº fogos por ilha, população por município | S7 |
| **BCV (Banco de CV)** | https://www.bcv.cv/taxas-cambio | Taxas CVE/EUR/USD em tempo real | S7 |
| **INMG (Meteorologia CV)** | https://www.inmg.gov.cv | Previsão chuva por ilha (reservas ar livre) | S2 |
| **ANAC (Aviação)** | https://www.asa.cv | Chegadas turísticas Sal/Boa Vista (sazonalidade) | S7 |
| **OpenStreetMap / Nominatim** | https://nominatim.openstreetmap.org | Geocodificação de moradas em Cabo Verde | S0 |
| **Câmara Municipal Praia** | https://www.cm-praia.cv | Nomes reais de bairros/ruas de Santiago | S7 |
| **Câmara Municipal São Vicente** | https://www.cmsv.cv | Bairros do Mindelo | S7 |
| **ExchangeRate-API (free)** | https://api.exchangerate-api.com/v4/latest/CVE | Câmbio CVE sem autenticação | S4 |

---

## Sprints Detalhados

---

### 🔴 SPRINT 0 — Fundação (Desbloqueador)
**Objetivo:** Ligar o backend ao frontend. Sem isto, nada funciona.
**Agente principal:** `@agent-backend-engineer` + `@agent-frontend-engineer`
**Skills:** `django-multi-tenant`, `nextjs-architecture`
**Regra defensiva:** Não alterar modelos existentes. Apenas migrations + camada de API.

#### Prompt S0-A — Migrations + Verificação
```
@agent-backend-engineer
Cria as migrations para o módulo de condomínios e verifica que correm no schema demo.

FICHEIROS A CRIAR (não modificar nada existente):
- src/condominiums/migrations/0001_initial.py

VERIFICAR (apenas leitura, não alterar):
- src/condominiums/models.py — modelos existentes
- src/imocv/settings.py — TENANT_APPS inclui 'condominiums'

COMANDOS para correr depois:
docker exec imocv_backend python manage.py makemigrations condominiums
docker exec imocv_backend python manage.py migrate_schemas --tenant

TESTAR:
- Confirmar que tabelas condominiums_condominium, condominiums_unit, condominiums_fee,
  condominiums_maintenancerequest, condominiums_notice existem no schema 'demo'
- Correr seed: docker exec imocv_backend python manage.py seed_demo_data
- Confirmar GET /api/condominiums/ retorna 3 condomínios
```

#### Prompt S0-B — Tipos TypeScript
```
@agent-frontend-engineer
Cria o ficheiro de tipos TypeScript para o módulo de condomínios.

CRIAR: web/types/condominium.ts

NÃO MODIFICAR: web/types/property.ts, web/types/user.ts (só lê para consistência de padrão)

TIPOS A CRIAR (espelhar models.py):
- Island enum (9 ilhas CV)
- Currency enum (CVE, EUR, USD)
- CondominiumStatus, FeeStatus, MaintenancePriority, MaintenanceStatus
- Condominium, Unit, Fee, MaintenanceRequest, Notice interfaces
- Tipos de resposta paginada: PaginatedResponse<T>
- Tipos de formulário: CreateCondominiumForm, CreateUnitForm, CreateFeeForm

Consistência: seguir padrão de web/types/property.ts para snake_case vs camelCase.
```

#### Prompt S0-C — API Client Frontend
```
@agent-frontend-engineer
Cria o cliente API para condomínios. Seguir exactamente o padrão de web/lib/api/properties.ts.

LER PRIMEIRO (não modificar):
- web/lib/api/properties.ts — padrão de referência
- web/lib/api/client.ts — funções base apiFetch, BASE_URL

CRIAR: web/lib/api/condominiums.ts

FUNÇÕES A IMPLEMENTAR:
- listCondominiums(params?): GET /api/condominiums/
- getCondominium(id): GET /api/condominiums/{id}/
- createCondominium(data): POST /api/condominiums/
- updateCondominium(id, data): PATCH /api/condominiums/{id}/
- listUnits(condominiumId): GET /api/condominiums/{id}/units/
- createUnit(condominiumId, data): POST /api/condominiums/{id}/units/
- listFees(condominiumId, filters?): GET /api/condominiums/{id}/fees/ + query params
- updateFeeStatus(condominiumId, feeId, status): PATCH
- listMaintenance(condominiumId): GET /api/condominiums/{id}/maintenance-requests/
- createMaintenance(condominiumId, data): POST
- updateMaintenance(condominiumId, id, data): PATCH
- listNotices(condominiumId): GET /api/condominiums/{id}/notices/
- createNotice(condominiumId, data): POST
```

---

### 🟠 SPRINT 1 — Dashboard Funcional
**Objetivo:** A página do agente mostra dados reais do backend.
**Agente principal:** `@agent-frontend-engineer`
**Skills:** `nextjs-architecture`
**Regra defensiva:** FeeTracker mantém o mesmo UI — só substituir mock por React Query.

#### Prompt S1-A — FeeTracker real
```
@agent-frontend-engineer
Liga o componente FeeTracker à API real. Manter 100% do UI existente.

MODIFICAR: web/components/condominiums/FeeTracker.tsx
- Substituir mock data por useQuery (TanStack Query)
- Usar listFees() de web/lib/api/condominiums.ts
- Manter skeleton loading com mesmo layout durante fetch
- Manter badges de status (Pago/Pendente/Em Atraso)
- Tratar erro de API com fallback UI (não crash)

NÃO MODIFICAR: estrutura visual, classes CSS, ícones

PROPS A ADICIONAR: condominiumId: string (obrigatório)
```

#### Prompt S1-B — Página dashboard agente conectada
```
@agent-frontend-engineer
Actualiza a página do dashboard do agente para usar dados reais.

MODIFICAR: web/app/(dashboard)/agente/condominios/page.tsx
- Quick access cards: buscar de listCondominiums() — contar condos activos, total unidades
- FeeTracker: passar condominiumId do primeiro condomínio (se só houver 1) ou picker
- "Próximas Manutenções": buscar de listMaintenance() + filtrar status=OPEN
- Manter layout e design 100% igual

NÃO CRIAR nova página — modificar apenas o que existe
```

#### Prompt S1-C — Página de detalhe do condomínio
```
@agent-frontend-engineer + @agent-ux-ui-designer
Cria a página de detalhe de um condomínio no CRM do agente.

CRIAR: web/app/(dashboard)/agente/condominios/[id]/page.tsx

SECÇÕES (mobile-first, Tailwind):
1. Header: nome, ilha, badge de estado, total unidades
2. Tabs: "Unidades" | "Pagamentos" | "Manutenções" | "Avisos"
3. Tab Unidades: tabela de units com owner_name, floor, area_m2, status
4. Tab Pagamentos: FeeTracker component existente (passar condominiumId)
5. Tab Manutenções: lista com priority badge + status + assigned_to
6. Tab Avisos: lista de notices com published_at

Design System: usar trust-blue, hope-green, dream-gold (ver design-system skill)
3G: lazy-load cada tab, skeleton states
```

#### Prompt S1-D — Formulário criar/editar condomínio
```
@agent-frontend-engineer
Cria formulário para criar e editar um condomínio.

CRIAR: web/components/condominiums/CondominiumForm.tsx (modal ou drawer)

CAMPOS (seguir modelos Django):
- name (obrigatório)
- island (select com 9 ilhas CV)
- municipality (text, obrigatório)
- address (textarea)
- currency (select: CVE/EUR/USD, default CVE)
- is_active (toggle)

VALIDAÇÃO: React Hook Form + Zod
SUBMIT: createCondominium() ou updateCondominium() dependendo de props
FEEDBACK: toast de sucesso/erro, fechar modal após sucesso
```

---

### 🟡 SPRINT 2 — Reservas de Espaços Comuns (Feature Core)
**Objetivo:** Implementar o sistema de reservas end-to-end (backend + frontend).
**Agente principal:** `@agent-backend-engineer` + `@agent-frontend-engineer`
**Skills:** `django-multi-tenant`, `nextjs-architecture`
**Regra defensiva:** Adicionar novos modelos — não alterar modelos existentes.

#### Prompt S2-A — Modelos CommonArea + Reservation (backend)
```
@agent-backend-engineer
Adiciona modelos CommonArea e Reservation ao módulo de condomínios.

MODIFICAR: src/condominiums/models.py (APENAS ADICIONAR ao fim, não alterar modelos existentes)

MODELO CommonArea:
- id (UUID)
- condominium (FK → Condominium)
- name (CharField: ex. "Piscina", "Salão de Festas", "Ginásio", "Churrasqueira")
- capacity (IntegerField, nullable)
- rules (TextField, nullable — ex. "máx 2h por reserva, horário 8h-22h")
- requires_payment (BooleanField, default False)
- price_cve (DecimalField nullable — tarifa de reserva em CVE)
- is_active (BooleanField)
- created_at, updated_at

MODELO Reservation:
- id (UUID)
- common_area (FK → CommonArea)
- unit (FK → Unit — quem reserva)
- resident_name (CharField — nome do residente)
- resident_phone (CharField — WhatsApp number)
- start_datetime (DateTimeField)
- end_datetime (DateTimeField)
- status (PENDING / CONFIRMED / CANCELLED / COMPLETED)
- notes (TextField nullable)
- created_at, updated_at

CONSTRAINTS:
- Não permitir reservas sobrepostas para a mesma área (validar em clean())
- start_datetime < end_datetime

MIGRATION: criar 0002_commonarea_reservation.py
REGISTAR no admin.py com list_display útil
```

#### Prompt S2-B — API endpoints para reservas (backend)
```
@agent-backend-engineer
Cria ViewSets e URLs para CommonArea e Reservation.

MODIFICAR: src/condominiums/serializers.py — adicionar CommonAreaSerializer, ReservationSerializer
MODIFICAR: src/condominiums/views.py — adicionar CommonAreaViewSet, ReservationViewSet
MODIFICAR: src/condominiums/urls.py — registar rotas nested

ROTAS A ADICIONAR:
/api/condominiums/{pk}/common-areas/                     → CRUD áreas comuns
/api/condominiums/{pk}/common-areas/{area_pk}/reservations/ → CRUD reservas

VALIDAÇÃO no serializer:
- Verificar sobreposição de horários (query para reservas existentes na mesma área)
- Verificar que unit pertence ao condominium

ACTION customizada: GET /common-areas/{id}/availability/?date=YYYY-MM-DD
- Retorna slots livres e ocupados para um dia
```

#### Prompt S2-C — Calendário de reservas (frontend)
```
@agent-frontend-engineer + @agent-ux-ui-designer
Cria o componente de calendário de reservas de espaços comuns.

CRIAR: web/components/condominiums/ReservationCalendar.tsx

FUNCIONALIDADE:
- Selector de área comum (dropdown com áreas do condomínio)
- Vista semanal: grid 7 dias × slots de hora (8h-22h)
- Slots coloridos: verde=livre, vermelho=ocupado, amarelo=pendente
- Click num slot livre → modal para criar reserva
- Formulário de reserva: unit selector, resident_name, start/end time, notes
- Cancelar reserva existente (click + confirmar)

ADAPTAR PARA CV:
- Mostrar previsão de chuva INMG se área for outdoor (campo is_outdoor no modelo)
- Aviso: "Previsão de chuva — reserva pode ser afectada"

3G: skeleton enquanto carrega, lazy-load calendário
Design System: cores trust-blue para confirmado, dream-gold para pendente

CRIAR TAMBÉM: web/lib/api/condominiums.ts — adicionar funções:
- listCommonAreas(condominiumId)
- getAvailability(areaId, date)
- createReservation(areaId, data)
- cancelReservation(areaId, reservationId)
```

---

### 🟡 SPRINT 3 — Gestão de Manutenções (UI Funcional)
**Objetivo:** Transformar a lista de manutenções (mock) num sistema real de ordens de serviço.
**Agente principal:** `@agent-frontend-engineer` + `@agent-backend-engineer`

#### Prompt S3-A — Backend: adicionar campos a MaintenanceRequest
```
@agent-backend-engineer
Enriquece o modelo MaintenanceRequest com campos necessários para gestão real.

MODIFICAR: src/condominiums/models.py (apenas adicionar campos, não remover nada)

CAMPOS A ADICIONAR a MaintenanceRequest:
- assigned_to_name (CharField nullable — nome do prestador)
- assigned_to_phone (CharField nullable)
- estimated_cost_cve (DecimalField nullable)
- actual_cost_cve (DecimalField nullable)
- resolved_at (DateTimeField nullable)
- resolution_notes (TextField nullable)
- photos (JSONField default=[] — lista de URLs de fotos)

MIGRATION: 0003_maintenancerequest_fields.py
PRIORIDADE: MAINTENANCE_IMPACT_PRIORITY definido como property do modelo:
  water_supply > electricity > security > elevator > common_areas > aesthetics
```

#### Prompt S3-B — UI: lista e detalhe de manutenções
```
@agent-frontend-engineer + @agent-ux-ui-designer
Cria o sistema de gestão de manutenções no dashboard do agente.

CRIAR: web/components/condominiums/MaintenanceList.tsx
- Lista com: prioridade badge (cores), título, unidade, estado, data
- Filtros: por status (OPEN/IN_PROGRESS/RESOLVED), por prioridade
- Prioridade visual: URGENT=vermelho, HIGH=laranja, MEDIUM=amarelo, LOW=cinza
- Sort por prioridade de impacto (water_supply primeiro)

CRIAR: web/components/condominiums/MaintenanceForm.tsx (modal)
- Campos: title, description, priority, unit (select), assigned_to_name, phone, estimated_cost

INTEGRAR na tab "Manutenções" da página [id]/page.tsx do sprint anterior
```

---

### 🟢 SPRINT 4 — Avisos, Comunicados e Moeda
**Objetivo:** Sistema de comunicação + suporte multi-moeda com câmbio real.
**Agente principal:** `@agent-frontend-engineer` + `@agent-backend-engineer`

#### Prompt S4-A — Backend: câmbio CVE em tempo real
```
@agent-backend-engineer
Adiciona serviço de câmbio que usa ExchangeRate-API (gratuita, sem auth).

CRIAR: src/utils/currency.py (ou enriquecer se existir)

FUNÇÃO: get_exchange_rates() → dict {EUR: float, USD: float}
- Chamar https://api.exchangerate-api.com/v4/latest/CVE
- Cache Redis por 1h (evitar rate limit)
- Fallback hard-coded se API falhar: EUR: 0.00906, USD: 0.00982

CRIAR: src/condominiums/tasks.py (Celery)
- @shared_task: refresh_exchange_rates() — actualizar cache a cada hora

ENDPOINT: GET /api/condominiums/exchange-rates/
- Retorna {CVE: 1, EUR: x, USD: x, updated_at: ISO datetime}
```

#### Prompt S4-B — UI: formulário de avisos + comunicados
```
@agent-frontend-engineer
Cria sistema de avisos/comunicados no dashboard.

CRIAR: web/components/condominiums/NoticeForm.tsx (modal)
- Campos: title, body (textarea com preview), published_at (date picker)
- Preview em tempo real do aviso
- Botão "Enviar agora" vs "Agendar para data"

CRIAR: web/components/condominiums/NoticeList.tsx
- Lista de avisos com published_at, título, excerpt
- Badge "Publicado" / "Agendado"
- Botão para apagar

INTEGRAR na tab "Avisos" da página [id]/page.tsx
```

#### Prompt S4-C — UI: selector de moeda no FeeTracker
```
@agent-frontend-engineer
Adiciona conversão de moeda ao FeeTracker (sem alterar estrutura).

MODIFICAR: web/components/condominiums/FeeTracker.tsx
- Adicionar dropdown moeda no header (CVE/EUR/USD)
- Buscar taxas de /api/condominiums/exchange-rates/
- Mostrar valores convertidos (ex. "5.500 CVE ≈ 49,83 €")
- CVE: sem decimais | EUR/USD: 2 decimais
- Usar formatCVE() para CVE, formatEUR() para EUR
```

---

### 🟢 SPRINT 5 — Notificações WhatsApp
**Objetivo:** Notificar moradores via WhatsApp (canal principal em CV).
**Agente principal:** `@agent-backend-engineer`
**Skills:** `whatsapp-integration`

#### Prompt S5-A — Backend: WhatsApp para condomínios
```
@agent-backend-engineer
Integra WhatsApp Business API para notificações de condomínio.

LER: .claude/skills/whatsapp-integration/SKILL.md — seguir padrões ali definidos

CRIAR: src/condominiums/notifications.py

FUNÇÕES A IMPLEMENTAR:
1. send_fee_reminder(fee) — aviso de quota em atraso
   Template: "Olá {owner_name}! A sua quota do {condo_name} no valor de {amount} CVE
   venceu em {due_date}. Por favor regularize. imo.cv"

2. send_reservation_confirmed(reservation) — confirmação de reserva
   Template: "Reserva confirmada! {area_name} — {date} {start_time}-{end_time}.
   Código: {reservation_id[:8]}"

3. send_maintenance_update(request) — actualização de ordem de serviço
   Template: "Actualização da manutenção #{id}: {status_display}.
   {resolution_notes if resolved}"

4. send_notice(notice, unit) — aviso do condomínio
   Template: "{condo_name}: {title}\n\n{body}"

CELERY TASKS: criar tasks que chamam estas funções
- task: send_overdue_fee_reminders() — correr diariamente às 9h
- task: send_scheduled_notices() — correr de hora em hora

DEFENSIVO: verificar se resident_phone existe antes de enviar
Usar try/except — falha no WhatsApp não deve bloquear operação
```

---

### 🔵 SPRINT 6 — Portal do Morador
**Objetivo:** Interface simplificada para moradores (não agentes).
**Agente principal:** `@agent-frontend-engineer` + `@agent-ux-ui-designer`
**Skills:** `nextjs-architecture`

#### Prompt S6-A — Backend: auth para moradores
```
@agent-backend-engineer
Adiciona autenticação simplificada para moradores (sem password — só WhatsApp OTP).

CRIAR: src/condominiums/resident_auth.py
- Gerar OTP de 6 dígitos
- Guardar OTP em Redis com TTL 10min
- POST /api/condominiums/resident/request-otp/ → enviar OTP via WhatsApp
- POST /api/condominiums/resident/verify-otp/ → devolver JWT de morador

JWT payload para morador: {unit_id, condominium_id, role: "resident"}

CRIAR: src/condominiums/resident_views.py
- ResidentFeeView: GET /api/resident/fees/ — quotas do próprio unit
- ResidentReservationView: CRUD reservas do próprio unit
- ResidentMaintenanceView: criar e ver manutenções do próprio unit
- ResidentNoticesView: ver avisos do condomínio

DEFENSIVO: morador só vê dados do seu próprio unit (filtro no queryset)
```

#### Prompt S6-B — Portal frontend do morador
```
@agent-frontend-engineer + @agent-ux-ui-designer
Cria o portal do morador — UI minimalista, mobile-first, 3G-optimized.

CRIAR: web/app/(resident)/morador/page.tsx (landing/login com OTP)
CRIAR: web/app/(resident)/morador/dashboard/page.tsx

DASHBOARD DO MORADOR (simples, não complexo):
1. Card: "As Minhas Quotas" — lista das últimas 3 + estado
2. Card: "Reservas" — próximas reservas + botão nova reserva (mini calendário)
3. Card: "Manutenções" — abrir pedido + ver estado das minhas
4. Card: "Avisos" — últimos 5 comunicados do condomínio

UI: muito simples, cores claras, botões grandes (mobile-first)
Bundle máximo: 200KB (utilizadores em 3G)
Login: input telefone → receber OTP → entrar
```

---

### 🔵 SPRINT 7 — Dados Demo Ricos (Web Scraping + Seed)
**Objetivo:** Demo impressionante com dados reais de Cabo Verde.
**Agente principal:** `@agent-data-scientist` + `@agent-backend-engineer`

#### Prompt S7-A — Recolher dados reais de CV para seed
```
@agent-data-scientist
Usa WebSearch/WebFetch para recolher dados reais de Cabo Verde para enriquecer a seed data.

RECOLHER (pesquisar na web):
1. INE CV (https://ine.cv): nomes reais de bairros de Praia, Mindelo, Sal
2. Câmara Municipal Praia: ruas reais de condomínios residenciais
3. Sites imobiliários CV: nomes típicos de condomínios em Sal, Santiago, São Vicente
4. BCV: taxas de câmbio actuais CVE/EUR
5. Nomes comuns em Cabo Verde: lista de 30 nomes próprios (moradores realistas)
6. Empresas de serviços em CV: 5 prestadores de manutenção reais

COM ESTES DADOS, actualizar: src/core/management/commands/seed_demo_data.py

SEED ENRIQUECIDA:
- 8 condomínios (Santiago: 3, Sal: 2, São Vicente: 2, Boa Vista: 1)
- 10-15 unidades por condomínio
- 6 meses de fees (histórico realista: 85% paid, 10% pending, 5% overdue)
- 3 áreas comuns por condomínio (piscina, salão, ginásio/churrasqueira)
- 5 reservas por área
- 3 manutenções por condomínio (mix de estados e prioridades)
- 2 avisos por condomínio
- Nomes de moradores cabo-verdianos reais
- Números de telefone CV (+238 XXX XXXX)
- Moradias com ruas reais de Santiago/Sal
```

#### Prompt S7-B — Dashboard de analytics (síndico)
```
@agent-frontend-engineer + @agent-data-scientist
Cria dashboard com métricas e gráficos para o síndico.

CRIAR: web/app/(dashboard)/agente/condominios/[id]/analytics/page.tsx

CHARTS (recharts — já no projecto):
1. Taxa de pagamento por mês (últimos 6 meses) — line chart
2. Distribuição de estados de pagamento — pie chart (Pago/Pendente/Em Atraso)
3. Manutenções por prioridade — bar chart
4. Ocupação de áreas comuns (% de slots usados) — bar chart por área

KPIs:
- % de pagamento do mês actual
- Total arrecadado vs esperado (em CVE)
- Nº de manutenções abertas / resolvidas este mês
- Área comum mais reservada

DADOS: calcular no backend com endpoint GET /api/condominiums/{id}/analytics/
```

---

### 🟣 SPRINT 8 — Assembleia e Votação Digital
**Objetivo:** Sistema de assembleias e votações online.
**Agente principal:** `@agent-backend-engineer` + `@agent-frontend-engineer`

#### Prompt S8-A — Modelo Assembly + Vote (backend)
```
@agent-backend-engineer
Adiciona modelo de assembleias e votações.

CRIAR modelos em src/condominiums/models.py (adicionar ao fim):

MODELO Assembly:
- condominium (FK), title, description, scheduled_at, status (DRAFT/OPEN/CLOSED)
- quorum_percentage (IntegerField, default=50)
- minutes_document_url (URLField nullable — acta em PDF)

MODELO AssemblyTopic:
- assembly (FK), title, description, order (IntegerField)
- vote_type (YES_NO / MULTIPLE_CHOICE / INFORMATIONAL)
- options (JSONField — para MULTIPLE_CHOICE)

MODELO AssemblyVote:
- topic (FK), unit (FK), choice (CharField), voted_at
- UNIQUE TOGETHER (topic, unit) — um voto por unidade por tópico

ENDPOINTS:
- CRUD assembleias
- POST /assemblies/{id}/open/ — abrir votação
- POST /assemblies/{id}/close/ — fechar + gerar acta
- POST /topics/{id}/vote/ — votar (autenticado como unit/morador)
- GET /topics/{id}/results/ — resultados em tempo real

MIGRATION: 0005_assembly_vote.py
```

---

### ⬛ SPRINT 9 — Integração Marketplace + AVM
**Objetivo:** Condomínio ligado ao marketplace e ao modelo de valorização.
**Agente principal:** `@agent-data-scientist` + `@agent-backend-engineer`

#### Prompt S9-A — Publicar unidades do condo no marketplace
```
@agent-backend-engineer
Liga unidades de condomínio ao marketplace de imóveis.

ADICIONAR ao modelo Unit:
- is_for_sale (BooleanField, default False)
- is_for_rent (BooleanField, default False)
- asking_price_cve (DecimalField nullable)
- property_listing (FK → Property, nullable — ligação ao marketplace)

ENDPOINT: POST /api/condominiums/{id}/units/{unit_id}/publish/
- Cria (ou actualiza) um Property no marketplace com dados da Unit
- Preenche automaticamente: island, municipality, area_m2, property_type=apartment
- Retorna o URL da listagem

DEFENSIVO: verificar que o agente tem permissão (é o gestor do condomínio)
```

#### Prompt S9-B — Valorização AVM para unidades
```
@agent-data-scientist
Integra o AVM para valorizar unidades de condomínio.

LER: .claude/skills/avm-models/SKILL.md — seguir pipeline ali definido

ADICIONAR endpoint: GET /api/condominiums/{id}/units/{unit_id}/valuation/
- Chamar AVMPipeline.predict() com dados da unit
- Retornar: estimated_price, price_per_m2, confidence, range_p10, range_p90

ADICIONAR ao dashboard do síndico: card "Valor Estimado do Portfólio"
- Soma das valuations de todas as unidades
- Comparação com período anterior (% de valorização)
```

---

## Matriz de Agentes por Sprint

| Sprint | backend-engineer | frontend-engineer | ux-ui-designer | data-scientist | devops | qa-tester | supervisor |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| S0 Fundação | ✅ | ✅ | — | — | — | ✅ | — |
| S1 Dashboard | — | ✅ | ✅ | — | — | ✅ | — |
| S2 Reservas | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| S3 Manutenções | ✅ | ✅ | ✅ | — | — | ✅ | — |
| S4 Avisos + Moeda | ✅ | ✅ | — | — | — | ✅ | — |
| S5 WhatsApp | ✅ | — | — | — | — | ✅ | ✅ |
| S6 Portal Morador | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| S7 Demo Data | ✅ | ✅ | — | ✅ | — | — | — |
| S8 Assembleia | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| S9 Marketplace+AVM | ✅ | ✅ | — | ✅ | — | ✅ | ✅ |

## Skills por Sprint

| Sprint | django-multi-tenant | nextjs-arch | postgres-postgis | whatsapp | avm-models | design-system |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| S0 | ✅ | ✅ | — | — | — | — |
| S1 | — | ✅ | — | — | — | ✅ |
| S2 | ✅ | ✅ | — | — | — | ✅ |
| S3 | ✅ | ✅ | — | — | — | ✅ |
| S4 | ✅ | ✅ | — | — | — | — |
| S5 | ✅ | — | — | ✅ | — | — |
| S6 | ✅ | ✅ | — | ✅ | — | ✅ |
| S7 | ✅ | ✅ | ✅ | — | ✅ | — |
| S8 | ✅ | ✅ | — | — | — | ✅ |
| S9 | ✅ | ✅ | ✅ | — | ✅ | — |

---

## Checklist Defensivo (aplicar em cada sprint)

- [ ] Ler ficheiros existentes antes de modificar
- [ ] Nunca apagar campos de modelos existentes (só adicionar)
- [ ] Migrations sempre aditivas (sem `RunSQL DROP`)
- [ ] API client usa try/catch — falhas não crasham UI
- [ ] WhatsApp notifications em try/except — não bloqueiam operação
- [ ] Tenant isolation verificado: todos os querysets filtram por condominium do tenant
- [ ] Testar em 3G antes de marcar como done
- [ ] Supervisor review antes de S2, S5, S6 (dados sensíveis de moradores)

---

## Ordem de Execução Recomendada

```
S0-A → S0-B → S0-C (em paralelo B+C)
  ↓
S1-A → S1-B → S1-C → S1-D (sequencial — cada um depende do anterior)
  ↓
S2-A → S2-B → S2-C (A+B em paralelo, C depois)
  ↓
S3-A → S3-B (A antes de B)
  ↓
S4-A → S4-B → S4-C (A antes de C)
  ↓
S5-A (depois de S4-A)
  ↓
S7-A → S7-B (A antes de B — seed data enriquece demo)
  ↓
S6-A → S6-B (A antes de B)
  ↓
S8-A → (S8-B — não detalhado ainda)
  ↓
S9-A → S9-B (A antes de B)
```

**Próximo prompt a executar: `S0-A` — Migrations e verificação do backend.**
