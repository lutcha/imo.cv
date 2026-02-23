# 🏗️ Plano de Agentes – Arquitetura imo.cv

**Documento do Arquiteto/Supervisor/Engenheiro Sénior**  
Base: [ARQUITETURA_LÓGICA_DA_PLATAFORMA_v02.md](./ARQUITETURA_LÓGICA_DA_PLATAFORMA_v02.md) e [INSTRUÇÕES_DEFENSIVAS_PARA_ARQUITETURA.md](./INSTRUÇÕES_DEFENSIVAS_PARA_ARQUITETURA.md).

---

## 1. Análise: O que já está vs. o que falta

### 1.1 Camadas da plataforma (Arquitetura v02)

| Camada | Descrição | Estado | Observações |
|--------|-----------|--------|-------------|
| **1. Marketplace público** | imo.cv – compradores, pesquisa, detalhe, contacto | ✅ Parcial | Home, search, property/[id], contact, about. Falta: credito-habitacao página dedicada (existe CreditSimulator em componente). |
| **2. CRM agentes** | subdomínio.agente.imo.cv – leads, imóveis | ✅ Parcial | Rotas (dashboard)/agente/*: dashboard, imóveis, novo, leads, [id], crm, condominios, configuracoes. Falta: clients, team, billing; subdomínio real (hoje path /agente). |
| **3. Módulos especializados** | Férias, Novas Construções, Condomínios | ⚠️ Parcial | **Condomínios**: backend (condominiums app) + frontend páginas agente/condominios e admin/condominios. **Férias/Obras**: só rotas públicas ferias, obras-novas (conteúdo a completar). **Novas Construções**: sem app Django dedicado. |
| **4. Ferramentas financeiras** | Simulador crédito, bancos | ⚠️ Parcial | CreditSimulator.tsx completo (cálculo + lead). Falta: API financiamento, integração bancos, página pública /credito-habitacao. |
| **5. Backoffice Admin** | admin.imo.cv – CMS, agências, faturação | ✅ Parcial | (admin)/admin: dashboard, agentes, condominios, imoveis, configuracoes. Falta: faturação, analytics avançado, CMS (banners/SEO), segurança/auditoria. |

### 1.2 Backend (Django)

| Área | Estado | Gap / melhoria |
|------|--------|-----------------|
| **Apps existentes** | core, agencies, properties, leads, crm, analytics, condominiums | Falta: short_term_rental, new_developments, financing, admin_portal (ou endpoints em core/agencies). |
| **Property** | Tipos: APARTAMENTO, MORADIA, TERRENO, COMERCIAL. ListingType: VENDA, ARRENDAMENTO, FERIAS. PostGIS location. | Arquitetura v02 pede property_type unificado (residential, land, commercial, short_term_rental, new_development, condominium_unit) + usage + type_specific_data (JSON). Alinhar com checklist defensivo (migração com testes e rollback). |
| **Multi-tenant** | Middleware por subdomínio referido nos agentes; estrutura atual por path (/agente). | Confirmar se django-tenants está em uso ou apenas agencies; documentar estratégia (subdomain vs path) e isolamento. |
| **Condomínios** | Condominium, Unit, Fee, MaintenanceRequest, Notice. | Conforme arquitetura. Falta: reserva áreas comuns, votação digital, relatórios financeiros automáticos. |
| **APIs** | auth, agencies, properties, leads, crm, analytics, condominiums | Falta: WhatsApp webhook explícito, feature flags API, health para rollback. |

### 1.3 Frontend (Next.js)

| Área | Estado | Gap / melhoria |
|------|--------|-----------------|
| **Rotas** | (public), (dashboard)/agente, (admin)/admin, (agency)/[subdomain] | Ferias, obras-novas existem; credito-habitacao não como rota dedicada. |
| **Componentes** | Header, Footer, SearchBar, PropertyCard, PropertyList, SearchFilters, CreditSimulator, PipelineKanban, FeeTracker, etc. | Defensivo: AdaptiveImage (qualidade por rede), fallback Mapbox estático, Server/Client explícito para evitar hydration. |
| **i18n** | PT/EN/FR, LocaleContext, server.ts, translations | Ok. Reforçar CVE/pt-CV em formatação (alinhar a CV_LOCALIZATION_GUARD). |
| **Performance** | Suspense, lazy, imagens com priority/sizes, PPR referido no roadmap | Falta: feature flags (NEXT_PUBLIC_FF_*), estratégia offline (cache crítico, queue de leads). |

### 1.4 Instruções defensivas – o que não está implementado

| Item defensivo | Estado | Ação |
|----------------|--------|------|
| Feature flags (opt-in) | ❌ | Introduzir NEXT_PUBLIC_FF_* e, se necessário, API de flags no backend. |
| Rollback &lt; 5 min | ❌ | Script rollback.sh + (opcional) RollbackGuard com métricas. |
| Checklist impacto (Fase 1–3) | ❌ | Documentar em RULE ou checklist por PR. |
| Server/Client explícito (hydration) | ⚠️ | Revisar páginas críticas (property, search) e isolar client components. |
| Turbopack / webpack fallback | ⚠️ | next.config: manter webpack; turbopack só dev (conforme doc). |
| Versionar rotas críticas (canary) | ❌ | middleware canary para /property → /v2/property quando houver nova versão. |
| AdaptiveImage (3G/4G) | ❌ | Componente qualidade por effectiveType. |
| OfflineStrategy (cache + queue leads) | ❌ | Service Worker/cache crítico + queueLead (IndexedDB) + fallback WhatsApp→SMS. |
| CV_LOCALIZATION_GUARD | ❌ | validateCurrencyCVE, validateMunicipality (lib/validation). |
| Testes obrigatórios (E2E, multi-tenant, resiliência) | ⚠️ | Aumentar cobertura; testes de isolamento tenant e fallbacks. |
| Monitorização pós-deploy (48h) | ❌ | PostDeployHealthCheck (tipos + alertas). |
| Protocolo crise 5 min | ❌ | Runbook + template comunicação. |

---

## 2. Priorização estratégica (Cabo Verde)

Conforme arquitetura v02:

1. **CRM + Marketplace** – base já existe; consolidar e defender.
2. **Arrendamento Férias** – alto valor; completar fluxo e dados.
3. **Novas Construções** – projetos + unidades; novo módulo.
4. **Condomínios** – já iniciado; completar quotas, avisos, relatórios.
5. **Simulador + bancos** – página pública + API financiamento.

Em paralelo: **defensivo** (feature flags, rollback, testes, offline, CVE/concelhos).

---

## 3. Plano por agente

### 3.1 Supervisor

**Objetivo:** Coordenar agentes, auditar qualidade, aplicar princípios defensivos e escalar ao arquiteto humano quando necessário.

**Tarefas (prioridade ordem):**

1. **Dashboard de saúde**
   - Manter/expandir checklist do `supervisor.md` (system health, 3G, WhatsApp, tenants).
   - Adicionar métricas do doc defensivo: errorRate, LCP/TTI 3G/4G, leadConversion, whatsappDelivery.
   - Definir onde ler métricas (Sentry, logs, ou endpoint `/api/health` com agregados).

2. **Checklist defensivo por PR**
   - Criar checklist (em `.cursor/rules` ou `docs/`) baseado nas Fases 1–3 do doc defensivo (impacto, preparação, staging).
   - Exigir: “Testes existentes? Rollback documentado? Feature flag se feature nova?”.

3. **Escalação**
   - Usar critérios já definidos no supervisor (DB, multi-tenant, infra, WhatsApp) para marcar tarefas que precisam de aprovação humana antes de implementar.

4. **Relatório semanal**
   - Gerar resumo: saúde, progresso por agente, riscos, escalações pendentes (usar template do supervisor.md).

**Entregáveis:** Checklist de PR defensivo; template de health dashboard; regra de quando escalar.

---

### 3.2 Backend Engineer

**Objetivo:** Alinhar modelos e APIs à arquitetura v02 e às instruções defensivas, sem quebrar o que funciona.

**Tarefas (por fases):**

**Fase 1 – Defensivo e fundação**
1. **Health & rollback**
   - Endpoint `GET /api/health` (DB, Redis, opcional Celery) para script de rollback e monitorização.
   - Documentar rollback: desativar flags, reverter containers, limpar cache (conforme doc).

2. **Feature flags (API)**
   - Modelo ou config (DB/env) para flags (ex: `new_search_v2`, `avm_beta`).
   - Endpoint (protegido) para admin desativar flags (para rollback).

3. **Testes multi-tenant e resiliência**
   - Teste de isolamento: agência A não vê imóveis/leads da agência B (como no exemplo do doc).
   - Testes de fallback: se Redis indisponível, resposta ainda válida (ex: sem cache).

**Fase 2 – Modelo de dados (incremental)**
4. **Property – alinhar à v02**
   - Sem remover nada em produção: adicionar campos ou tipos gradualmente (ex: `usage`, `type_specific_data`).
   - Migração com plano de rollback e testes de regressão antes de alterar esquema em tabelas grandes.

5. **Módulos novos (quando aprovado)**
   - `short_term_rental`: modelos (seasonality, min_nights, etc.) e API mínima.
   - `new_developments`: projeto + unidades (ou estender Property com type_specific_data).
   - `financing`: API para simulador (cálculo) e endpoint “pré-aprovação” (lead para banco).

**Fase 3 – Integrações**
6. **WhatsApp**
   - Webhook documentado e estável; fallback para SMS (se aplicável) e métricas de entrega.
7. **Localização CV**
   - Validação de concelhos por ilha (backend): reutilizável por API e pelo frontend (lib/validation).

**Entregáveis:** `/api/health`; feature flags API; testes tenant + resiliência; migração Property planeada; apps ou endpoints para short_term, new_developments, financing.

---

### 3.3 Frontend Engineer

**Objetivo:** Completar fluxos da arquitetura, melhorar performance 3G e aplicar padrões defensivos (Server/Client, fallbacks, flags).

**Tarefas:**

1. **Defensivo**
   - **Feature flags:** Ler `NEXT_PUBLIC_FF_*` (e eventualmente API) e usar em features novas (ex: nova busca, AVM).
   - **Server/Client:** Garantir que páginas com dados do servidor não usam `window`/browser em Server Components; isolar em `'use client'` com props (ex: lista de imóveis).
   - **next.config:** Manter webpack; turbopack só dev; build de produção sempre com webpack até validação.

2. **Performance e rede**
   - **AdaptiveImage:** Componente que ajusta `quality` (e opcionalmente `sizes`) consoante `navigator.connection.effectiveType` (2g/3g/4g).
   - **Mapbox:** Fallback para mapa estático ou lista quando Mapbox falhar ou estiver lento (timeout).

3. **Offline e Cabo Verde**
   - **Cache crítico:** Lista de ilhas/concelhos e offline.html (ou equivalente) em cache (Service Worker ou fetch cache).
   - **Queue de leads:** Se offline, guardar lead em IndexedDB e enviar quando online; toast “Guardado, enviaremos quando a internet voltar”.
   - **CV localization:** `lib/validation/cv-localization.ts` – formatar CVE (sem decimais), validar concelho por ilha; usar em formulários e exibição.

4. **Rotas e fluxos**
   - Página pública **/credito-habitacao** que usa o CreditSimulator (já existe componente).
   - **Férias** e **Obras novas:** Conteúdo e fluxos mínimos (listagem/detalhe) quando os backends existirem.
   - Formulário **novo imóvel** por tipologia (residencial/terreno/comercial/férias/novo projeto) quando o modelo backend suportar.

5. **Acessibilidade e i18n**
   - Manter skip link, landmarks, formato CVE em pt-CV; revisar labels e mensagens de erro em PT/EN/FR.

**Entregáveis:** Feature flags no frontend; AdaptiveImage; fallback mapa; queue de leads offline; cv-localization; página credito-habitacao; revisão Server/Client nas rotas críticas.

---

### 3.4 QA Tester

**Objetivo:** Garantir regressão, segurança, isolamento multi-tenant e resiliência antes de cada deploy.

**Tarefas:**

1. **E2E críticos**
   - Fluxo: Homepage → Busca → Detalhe → Contacto (WhatsApp ou formulário).
   - Fluxo agente: Login → Dashboard → Imóveis → Novo imóvel (ou edição) → Leads/Pipeline.
   - Fluxo condomínios: Listar condomínios → Unidades/Quotas (conforme UI existente).

2. **Performance**
   - Lighthouse em rede 3G simulada (LCP &lt; 2.5s, TTI &lt; 4s conforme doc).
   - Acessibilidade (WCAG 2.1 AA) em páginas principais.

3. **Segurança**
   - Filtros de busca: SQL injection e XSS (descrição/imóvel).
   - CSRF em formulários de contacto e lead.
   - Isolamento: testes que garantem que agência B não acede a dados da agência A (API + UI).

4. **Resiliência**
   - API indisponível: mensagem clara e sem crash.
   - Mapbox falha: fallback ativo (mapa estático ou sem mapa).
   - Redis/backend lento: timeout e mensagem adequada.

5. **Automação**
   - Integrar E2E (ex: Playwright) no CI; pelo menos um smoke por canal (público, agente, admin).

**Entregáveis:** Suites E2E (público, agente, condomínios); testes de segurança (injection, XSS, CSRF, tenant); testes de resiliência; relatório Lighthouse 3G; passos no checklist do Supervisor.

---

### 3.5 DevOps Engineer

**Objetivo:** Infraestrutura estável, rollback rápido e monitorização pós-deploy.

**Tarefas:**

1. **Rollback &lt; 5 minutos**
   - Script `rollback.sh` (ou equivalente): desativar feature flags, reverter containers (imagem previous), limpar cache Redis, validar health.
   - Testar o script em staging e documentar no runbook.

2. **Feature flags em produção**
   - Mecanismo para desativar flags via API ou env (conforme backend); integração com script de rollback.

3. **Monitorização 48h pós-deploy**
   - Dashboard ou alertas para: uptime, errorRate, LCP/TTI (frontend), whatsappDelivery, leadConversion (se disponível).
   - Alertas automáticos: errorRate &gt; 5%, LCP &gt; 3s (4G) – com possível trigger de rollback ou notificação.

4. **Staging**
   - Deploy em staging com flag desativada; validação humana antes de ativar em produção; canary (ex: 5% tráfego) quando aplicável.

5. **Backups e saúde**
   - Backups de DB testados (restore); health check do PostgreSQL/PostGIS e Redis no `/api/health`.

**Entregáveis:** rollback.sh testado; runbook de rollback; alertas e métricas pós-deploy; integração health check no pipeline.

---

### 3.6 UX/UI Designer

**Objetivo:** Consistência visual, acessibilidade e experiência em 3G/mobile (Cabo Verde).

**Tarefas:**

1. **Design system**
   - Consolidar tokens (cores, tipografia, espaçamento) em um único sítio (ex: globals.css ou documento) alinhado ao UX/UI agent; manter paleta “trust + hope + dream” e teal existente.

2. **Mobile (thumb-friendly)**
   - Revisar botões e inputs: tamanho de toque (min 44px), espaçamento; sem alterar contrato dos componentes existentes.

3. **Estados de rede e erro**
   - Estados para: carregamento (skeleton), offline (mensagem + queue de leads), erro de API (retry + mensagem clara).
   - Microcopy em PT/EN/FR para “Sem conexão”, “Guardado para enviar depois”, “Tente novamente”.

4. **Fluxos novos**
   - Wireframes ou especificação para: /credito-habitacao, listagem/detalhe Férias e Obras novas, formulário de imóvel por tipologia (quando existir).

5. **Acessibilidade**
   - Revisar contraste, foco, labels; garantir que novos componentes seguem WCAG 2.1 AA.

**Entregáveis:** Documento de design system atualizado; guia de estados (loading/offline/erro); especificação de fluxos novos; checklist a11y para novos componentes.

---

### 3.7 Data Scientist (AVM)

**Objetivo:** AVM (estimativa de preço) e métricas de mercado sem comprometer estabilidade.

**Tarefas:**

1. **Feature flag**
   - AVM em produção apenas atrás de flag (ex: `avm_beta`); desativável no rollback.

2. **Dados e modelo**
   - Pipeline a partir de Property (e transações se houver); feature store e modelo (hedónico + comparables ou XGBoost) conforme data-scientist.md.
   - Validação por ilha e intervalo de confiança (AVMU).

3. **API e UX**
   - Endpoint de estimativa (ex: POST /api/avm/estimate) com input de características do imóvel; resposta: ponto + intervalo + comparáveis.
   - Frontend: uso opcional no detalhe de imóvel ou no formulário de novo imóvel (agente), sempre com indicação “Estimativa” e flag.

4. **Métricas**
   - Log de uso do AVM e erro médio (quando houver preços realizados); não expor dados sensíveis.

**Entregáveis:** AVM atrás de feature flag; API de estimativa; documentação de features e métricas de qualidade.

---

## 4. Ordem de execução sugerida (Arquiteto)

1. **Imediato (todas as equipas)**  
   - Introduzir **feature flags** (backend + frontend) e **checklist defensivo** no processo (Supervisor).  
   - **Health endpoint** e **rollback script** (Backend + DevOps).  
   - **Testes de isolamento multi-tenant** e um **E2E smoke** (Backend + QA).

2. **Curto prazo (1–2 sprints)**  
   - **AdaptiveImage**, **fallback mapa**, **queue leads offline**, **cv-localization** (Frontend).  
   - **Runbook crise 5 min** e **alertas pós-deploy** (DevOps + Supervisor).  
   - **Página /credito-habitacao** e pequenas melhorias em Férias/Obras (Frontend + Backend se necessário).

3. **Médio prazo (arquitetura v02)**  
   - Alinhar **Property** ao modelo unificado (com migração defensiva).  
   - Completar **Condomínios** (reservas, relatórios).  
   - Módulos **short_term_rental** e **new_developments** (Backend + Frontend).  
   - **AVM** em beta com flag (Data Scientist + Backend + Frontend).

4. **Contínuo**  
   - Revisão trimestral do doc defensivo; atualizar com lições de incidentes.  
   - Supervisor: relatório semanal e auditoria de qualidade.

---

## 5. Referências

- **Arquitetura:** [ARQUITETURA_LÓGICA_DA_PLATAFORMA_v02.md](./ARQUITETURA_LÓGICA_DA_PLATAFORMA_v02.md)  
- **Defensivo:** [INSTRUÇÕES_DEFENSIVAS_PARA_ARQUITETURA.md](./INSTRUÇÕES_DEFENSIVAS_PARA_ARQUITETURA.md)  
- **Frontend:** [FRONTEND_AGENT_ROADMAP.md](./FRONTEND_AGENT_ROADMAP.md)  
- **Agentes:** `.cursor/agents/` (supervisor, backend-engineer, frontend-engineer, qa-tester, devops-engineer, ux-ui-designer, data-scientist)

---

*Documento vivo: atualizar conforme decisões do Arquiteto e lições de cada sprint.*
