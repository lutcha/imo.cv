# Tickets granulares – Backend e Frontend (imo.cv)

Tarefas em formato **issue/ticket** para backlog. Cada item pode ser copiado para GitHub Issues, GitLab, Jira, etc.

**Convenções:**
- **Prioridade:** P0 = crítico, P1 = alto, P2 = médio, P3 = baixo
- **Estimativa:** S = 1–2h, M = 2–4h, L = 4–8h, XL = 1–2 dias
- **Labels sugeridos:** `backend` | `frontend`, `defensivo`, `arquitetura`, `testes`, `api`, `ux`

---

# PARTE 1 – BACKEND ENGINEER

## Fase 1 – Defensivo e fundação

---

### BE-001 [P0] Endpoint GET /api/health (DB + Redis)

**Descrição:** Criar endpoint de health check para rollback e monitorização. Deve responder rápido e indicar estado de dependências críticas.

**Critérios de aceitação:**
- [ ] `GET /api/health` retorna 200 com body JSON.
- [ ] Body inclui: `{ "status": "ok"|"degraded"|"error", "checks": { "database": "ok"|"error", "redis": "ok"|"error"|"unavailable" } }`.
- [ ] Se PostgreSQL não responder (timeout 2s), `database: "error"` e status global `degraded` ou `error`.
- [ ] Se Redis não responder (timeout 1s), `redis: "unavailable"`; status global pode permanecer `ok` (app funciona sem cache).
- [ ] Endpoint não requer autenticação (para load balancer / script de rollback).
- [ ] Documentado em README ou docs (URL e significado dos status).

**Estimativa:** M  
**Labels:** `backend`, `defensivo`, `api`

---

### BE-002 [P1] Health: check opcional Celery

**Descrição:** Incluir no health check um indicador opcional do estado do Celery (worker ativo ou fila), se Celery estiver configurado.

**Critérios de aceitação:**
- [ ] Se Celery estiver em uso, `checks.celery` presente: `"ok"` ou `"error"` (ex.: ping worker ou inspecionar fila).
- [ ] Se Celery não estiver configurado, `checks.celery` ausente ou `"skipped"`.
- [ ] Falha do Celery não faz o health global falhar (apenas `degraded` se for o caso).

**Estimativa:** S  
**Labels:** `backend`, `defensivo`, `api`  
**Depende de:** BE-001

---

### BE-003 [P0] Modelo e storage de Feature Flags

**Descrição:** Introduzir persistência de feature flags (DB ou config) para permitir rollback sem redeploy. Flags ex.: `new_search_v2`, `avm_beta`, `emergency_mode`.

**Critérios de aceitação:**
- [ ] Modelo ou tabela (ex.: `FeatureFlag`: name, enabled, updated_at) ou uso de django-constance/env com override em DB.
- [ ] Valores default documentados (ex.: todas desativadas).
- [ ] Migração criada e reversível.

**Estimativa:** M  
**Labels:** `backend`, `defensivo`, `arquitetura`

---

### BE-004 [P0] API de leitura de Feature Flags (pública para frontend)

**Descrição:** Endpoint para o frontend obter o estado das feature flags (sem dados sensíveis).

**Critérios de aceitação:**
- [ ] `GET /api/config/feature-flags/` ou `GET /api/feature-flags/` retorna JSON: `{ "new_search_v2": false, "avm_beta": false, ... }`.
- [ ] Endpoint público (ou com auth mínima) e cacheável (Cache-Control curto, ex.: 60s).
- [ ] Não expõe chaves ou segredos.

**Estimativa:** S  
**Labels:** `backend`, `defensivo`, `api`  
**Depende de:** BE-003

---

### BE-005 [P1] API de escrita de Feature Flags (admin)

**Descrição:** Endpoint protegido para ativar/desativar flags (rollback rápido).

**Critérios de aceitação:**
- [ ] `POST /api/admin/feature-flags/` ou `PATCH` com body `{ "flags": { "new_search_v2": false } }` apenas para utilizadores admin/superuser.
- [ ] Retorna 403 se não autorizado.
- [ ] Após alteração, cache do endpoint de leitura invalidado ou TTL curto.

**Estimativa:** S  
**Labels:** `backend`, `defensivo`, `api`  
**Depende de:** BE-003

---

### BE-006 [P0] Teste de isolamento multi-tenant – Properties

**Descrição:** Teste automatizado que garante: agência B não consegue ver nem alterar imóveis da agência A.

**Critérios de aceitação:**
- [ ] Teste cria Agency A e Agency B, cria Property associada a A.
- [ ] Request autenticado como utilizador da Agency B para `GET /api/properties/{id_da_prop_A}` retorna 404 ou 403.
- [ ] Request como Agency B para listar properties não inclui propriedades de A.
- [ ] Documentado onde correm os testes (pytest/comando).

**Estimativa:** M  
**Labels:** `backend`, `testes`, `defensivo`

---

### BE-007 [P0] Teste de isolamento multi-tenant – Leads

**Descrição:** Teste automatizado que garante: agência B não acede a leads da agência A.

**Critérios de aceitação:**
- [ ] Criar Lead associado à Agency A.
- [ ] Request como Agency B para esse lead retorna 404 ou 403.
- [ ] Listagem de leads para Agency B não inclui leads de A.

**Estimativa:** S  
**Labels:** `backend`, `testes`, `defensivo`

---

### BE-008 [P1] Teste de resiliência: API sem Redis

**Descrição:** Garantir que a aplicação responde corretamente quando Redis está indisponível (degraded, sem cache).

**Critérios de aceitação:**
- [ ] Teste ou cenário (ex.: mock Redis down) onde endpoints principais (ex.: listagem de imóveis, health) ainda retornam 200 com dados válidos.
- [ ] Sem crash nem 500 por falha de cache; opcionalmente log de warning.

**Estimativa:** M  
**Labels:** `backend`, `testes`, `defensivo`

---

### BE-009 [P2] Documentar passos de rollback no README/runbook

**Descrição:** Documentar no repositório os passos de rollback que dependem do backend (desativar flags, health check).

**Critérios de aceitação:**
- [ ] Secção "Rollback" em `docs/` ou README com: 1) Desativar feature flags (chamada à API BE-005 ou env), 2) Validar `/api/health`, 3) Referência ao script DevOps se existir.

**Estimativa:** S  
**Labels:** `backend`, `defensivo`

---

## Fase 2 – Modelo de dados (incremental)

---

### BE-010 [P1] Adicionar campo `usage` ao modelo Property

**Descrição:** Adicionar campo opcional `usage` (sale, long_term_rental, short_term_rental, pre_sale) sem remover campos existentes, alinhado à arquitetura v02.

**Critérios de aceitação:**
- [ ] Campo `usage` (CharField com choices) nullable ou default; migração reversível.
- [ ] Serializers e filtros de pesquisa aceitam `usage`; valores antigos continuam a funcionar (ex.: mapear listing_type → usage onde fizer sentido).
- [ ] Testes de regressão para listagem e filtros.

**Estimativa:** M  
**Labels:** `backend`, `arquitetura`

---

### BE-011 [P1] Adicionar campo `type_specific_data` (JSON) ao Property

**Descrição:** Campo JSON para dados por tipologia (férias: min_nights, seasonal_pricing; new_development: project_name, completion_date; etc.).

**Critérios de aceitação:**
- [ ] `type_specific_data = models.JSONField(default=dict, blank=True)`.
- [ ] Migração aplicada; serializers permitem leitura/escrita; validação básica (schema opcional) documentada.
- [ ] Não quebra listagem/detalhe atuais (campo opcional).

**Estimativa:** S  
**Labels:** `backend`, `arquitetura`

---

### BE-012 [P2] Estender PropertyType/ListingType conforme v02 (opcional)

**Descrição:** Alinhar choices à arquitetura v02 (residential, land, commercial, short_term_rental, new_development, condominium_unit) de forma incremental (novos valores + mapeamento dos antigos).

**Critérios de aceitação:**
- [ ] Novos valores adicionados; existentes mantidos ou mapeados; migração de dados documentada se houver conversão.
- [ ] API e filtros continuam a funcionar; frontend pode adoptar gradualmente.

**Estimativa:** L  
**Labels:** `backend`, `arquitetura`  
**Nota:** Pode ser dividido em sub-tickets (só novos tipos; migração de dados).

---

## Fase 3 – Módulos novos

---

### BE-013 [P1] App `short_term_rental` – modelos

**Descrição:** Criar app Django `short_term_rental` com modelos para alojamento local (ex.: preços sazonais, mínimo de noites, taxa de limpeza).

**Critérios de aceitação:**
- [ ] App criada; modelos (ex.: `ShortTermRentalConfig` ligado a Property, ou campos em `Property.type_specific_data`) documentados.
- [ ] Migração; admin básico para edição.

**Estimativa:** L  
**Labels:** `backend`, `arquitetura`

---

### BE-014 [P1] API mínima para short-term rental (listagem/filtros)

**Descrição:** Endpoints para listar e filtrar imóveis de férias (ex.: por ilha, datas, min_noites).

**Critérios de aceitação:**
- [ ] `GET /api/properties/?usage=short_term_rental` ou `GET /api/short-term-rentals/` com filtros relevantes.
- [ ] Resposta inclui campos necessários para cards e detalhe (preço, min_noites, etc.).

**Estimativa:** M  
**Labels:** `backend`, `api`  
**Depende de:** BE-013

---

### BE-015 [P1] App `new_developments` – modelos (projeto + unidades)

**Descrição:** Modelos para projetos de nova construção: projeto (nome, estado, data conclusão, total de unidades) e unidades (preço, área, estado).

**Critérios de aceitação:**
- [ ] Modelos `NewDevelopment` e `DevelopmentUnit` (ou equivalente) com FKs e campos conforme arquitetura v02.
- [ ] Migrações; admin básico.

**Estimativa:** L  
**Labels:** `backend`, `arquitetura`

---

### BE-016 [P1] API mínima para novas construções (listagem + detalhe projeto)

**Descrição:** Endpoints para listar projetos e unidades disponíveis.

**Critérios de aceitação:**
- [ ] `GET /api/new-developments/` e `GET /api/new-developments/{id}/` com unidades.
- [ ] Filtros por ilha, estado (planning, under_construction, completed).

**Estimativa:** M  
**Labels:** `backend`, `api`  
**Depende de:** BE-015

---

### BE-017 [P1] App ou endpoints `financing` – simulador e lead

**Descrição:** API para o simulador de crédito: cálculo (prestação, montante financiável) e endpoint para criar lead de “pré-aprovação” para banco.

**Critérios de aceitação:**
- [ ] `POST /api/financing/simulate/` com rendimento, entrada, prazo, valor imóvel; retorna prestação e montante máximo.
- [ ] `POST /api/financing/pre-approval-lead/` grava lead (com source=CreditSimulator ou similar) e opcionalmente notifica banco/CRM.
- [ ] Validação de inputs; rate limit opcional.

**Estimativa:** L  
**Labels:** `backend`, `api`, `arquitetura`

---

## Fase 4 – Integrações e localização

---

### BE-018 [P1] Endpoint de validação de concelhos por ilha

**Descrição:** Endpoint que devolve concelhos válidos por ilha (Cabo Verde) para uso no frontend e em formulários.

**Critérios de aceitação:**
- [ ] `GET /api/geo/municipalities/?island=Santiago` retorna lista de concelhos válidos (ex.: Praia, Santa Catarina, ...).
- [ ] Dados alinhados a `Property.MUNICIPALITIES_BY_ISLAND` (ou fonte única no backend).
- [ ] Cacheável (60s ou mais).

**Estimativa:** S  
**Labels:** `backend`, `api`

---

### BE-019 [P2] Validação no backend: concelho pertence à ilha

**Descrição:** Na criação/atualização de Property (e outros modelos com ilha/concelho), validar que o concelho pertence à ilha.

**Critérios de aceitação:**
- [ ] Serializer ou model clean levanta ValidationError se municipality não for válido para a island escolhida.
- [ ] Teste unitário cobre combinações inválidas.

**Estimativa:** S  
**Labels:** `backend`, `defensivo`

---

### BE-020 [P2] WhatsApp webhook documentado e estável

**Descrição:** Garantir que o webhook do WhatsApp está registado, documentado e que responde corretamente (verificação + mensagens).

**Critérios de aceitação:**
- [ ] Documentação (URL, método, assinatura, exemplos) em `docs/`.
- [ ] Teste ou procedimento manual de verificação do webhook; tratamento de erros e log.

**Estimativa:** M  
**Labels:** `backend`, `api`

---

### BE-021 [P3] Fallback WhatsApp → SMS (configuração)

**Descrição:** Preparar configuração e ponto de integração para envio por SMS quando WhatsApp falhar (implementação do cliente SMS pode ser outro ticket).

**Critérios de aceitação:**
- [ ] Config/settings para provider SMS e flag de activação; lugar no código (ex.: após falha WhatsApp) para chamar envio SMS documentado.
- [ ] Não obrigatório integrar provider real neste ticket.

**Estimativa:** M  
**Labels:** `backend`, `defensivo`

---

# PARTE 2 – FRONTEND ENGINEER

## Defensivo e configuração

---

### FE-001 [P0] Leitura de feature flags (env + API)

**Descrição:** O frontend deve ler feature flags de `NEXT_PUBLIC_FF_*` e, opcionalmente, do endpoint `GET /api/feature-flags/` para features novas.

**Critérios de aceitação:**
- [ ] Helper ou hook `useFeatureFlags()` (ou equivalente) que devolve objeto com flags (ex.: `new_search_v2`, `avm_beta`).
- [ ] Prioridade: env vars para build-time; override por API se configurado (com cache 60s).
- [ ] Documentar em README ou docs quais flags existem e onde são usadas.

**Estimativa:** M  
**Labels:** `frontend`, `defensivo`

---

### FE-002 [P1] next.config: webpack em produção, turbopack só dev

**Descrição:** Garantir que o build de produção usa webpack; turbopack apenas em desenvolvimento (conforme instruções defensivas).

**Critérios de aceitação:**
- [ ] `next.config.mjs` (ou .js) com webpack mantido; `experimental.turbopack` apenas quando `NODE_ENV === 'development'` (ou equivalente).
- [ ] Build de produção (`next build`) não usa turbopack; documentado no README.

**Estimativa:** S  
**Labels:** `frontend`, `defensivo`

---

### FE-003 [P1] Revisão Server/Client – página de detalhe de imóvel

**Descrição:** Garantir que a página `property/[id]` não tem hydration mismatch: dados do servidor em Server Component; uso de `window`/browser apenas em Client Components com `'use client'`.

**Critérios de aceitação:**
- [ ] Fetch de dados do imóvel em Server Component (ou RSC); passagem por props para componentes que precisam de interatividade.
- [ ] Componentes que usam `window`, `navigator` ou event handlers complexos marcados com `'use client'`.
- [ ] Sem erros de hydration em dev e build.

**Estimativa:** M  
**Labels:** `frontend`, `defensivo`

---

### FE-004 [P1] Revisão Server/Client – página de pesquisa

**Descrição:** Mesma revisão para a página de pesquisa (search): isolar client components (mapa, filtros interativos) e manter dados iniciais no servidor.

**Critérios de aceitação:**
- [ ] Lista inicial e filtros podem ser server-rendered; mapa e interações em `'use client'`.
- [ ] Sem hydration mismatch; URL e search params tratados de forma consistente.

**Estimativa:** M  
**Labels:** `frontend`, `defensivo`

---

## Performance e rede

---

### FE-005 [P0] Componente AdaptiveImage

**Descrição:** Componente de imagem que ajusta `quality` (e opcionalmente `sizes`) consoante `navigator.connection.effectiveType` (2g/3g/4g) para melhor performance em 3G em Cabo Verde.

**Critérios de aceitação:**
- [ ] Componente `AdaptiveImage` (ou nome acordado) que aceita props compatíveis com `next/image` (src, alt, width, height, priority, etc.).
- [ ] quality: 40 para slow-2g/2g, 60 para 3g, 75 para 4g+; fallback se `navigator.connection` não existir (ex.: 75).
- [ ] placeholder blur e sizes adequados; usado em pelo menos uma página (ex.: detalhe de imóvel) como piloto.

**Estimativa:** M  
**Labels:** `frontend`, `defensivo`, `ux`

---

### FE-006 [P1] Fallback do mapa (Mapbox falha ou timeout)

**Descrição:** Quando o mapa (Mapbox) falhar ou demorar além de um timeout, mostrar fallback: mapa estático ou apenas lista de resultados, sem quebrar a página.

**Critérios de aceitação:**
- [ ] Timeout configurável (ex.: 5s); em caso de falha ou timeout, esconder mapa e mostrar mensagem e/ou lista.
- [ ] Sem crash; acessibilidade (aria, mensagem clara).
- [ ] Opcional: link para “Abrir no Google Maps” ou mapa estático com link.

**Estimativa:** M  
**Labels:** `frontend`, `defensivo`, `ux`

---

## Offline e Cabo Verde

---

### FE-007 [P0] lib/validation/cv-localization.ts

**Descrição:** Módulo com validação e formatação para Cabo Verde: CVE sem decimais, concelhos válidos por ilha.

**Critérios de aceitação:**
- [ ] `formatCurrencyCVE(amount: number): string` – formata com toLocaleString('pt-CV'), sem centavos (arredondar para inteiro ou milhares conforme doc defensivo).
- [ ] `validateMunicipality(island: string, municipality: string): boolean` – retorna true apenas se concelho pertencer à ilha (dados alinhados ao backend).
- [ ] Exportar constantes de ilhas e concelhos se útil para selects.
- [ ] Testes unitários (opcional mas recomendado).

**Estimativa:** M  
**Labels:** `frontend`, `defensivo`

---

### FE-008 [P1] Uso de cv-localization em formulários e exibição

**Descrição:** Integrar `formatCurrencyCVE` e `validateMunicipality` nos formulários de contacto/lead e na exibição de preços (listagens, detalhe).

**Critérios de aceitação:**
- [ ] Preços em CVE formatados com `formatCurrencyCVE` onde aplicável.
- [ ] Formulários com ilha/concelho validam com `validateMunicipality` antes de submeter; mensagem de erro clara.

**Estimativa:** S  
**Labels:** `frontend`, `defensivo`, `ux`  
**Depende de:** FE-007

---

### FE-009 [P1] Cache crítico (ilhas/concelhos + offline)

**Descrição:** Cache agressivo para dados estáticos: lista de ilhas e concelhos; página ou view offline (ex.: “Sem conexão”).

**Critérios de aceitação:**
- [ ] Lista de ilhas/concelhos obtida da API ou estática; guardada em cache (fetch cache, React Query staleTime longo, ou Service Worker) para uso offline.
- [ ] Página `/offline` ou componente exibido quando `navigator.onLine === false` (opcional: interceptar em rotas críticas).
- [ ] Documentar estratégia (Service Worker vs apenas fetch cache).

**Estimativa:** L  
**Labels:** `frontend`, `defensivo`

---

### FE-010 [P1] Queue de leads offline (IndexedDB + envio ao reconectar)

**Descrição:** Se o utilizador submeter um lead (contacto, interesse) estando offline, guardar em IndexedDB e enviar quando voltar a estar online; toast “Guardado, enviaremos quando a internet voltar”.

**Critérios de aceitação:**
- [ ] Ao submeter formulário de lead/contacto, se `!navigator.onLine`, guardar payload em IndexedDB (ex.: tabela `pending_leads`).
- [ ] Listener `online`: processar fila, enviar leads por ordem; remover da fila após sucesso.
- [ ] Toast ou mensagem a informar “Guardado para enviar depois”; em caso de falha no envio, manter na fila e retentar.
- [ ] Não duplicar envio (idempotência ou flag “sent”).

**Estimativa:** L  
**Labels:** `frontend`, `defensivo`, `ux`

---

## Rotas e fluxos

---

### FE-011 [P0] Página pública /credito-habitacao

**Descrição:** Criar rota pública que usa o componente CreditSimulator existente, com layout e SEO adequados.

**Critérios de aceitação:**
- [ ] `app/(public)/credito-habitacao/page.tsx` (ou path acordado); usa `CreditSimulator`; título e descrição em metadata.
- [ ] Conteúdo introdutório breve (opcional); CTA claro para simular.
- [ ] i18n para título e textos (PT/EN/FR).

**Estimativa:** S  
**Labels:** `frontend`, `ux`

---

### FE-012 [P2] Página Férias – conteúdo e listagem mínima

**Descrição:** Completar a página de arrendamento para férias: conteúdo estático e, quando a API existir, listagem de imóveis com usage=short_term_rental.

**Critérios de aceitação:**
- [ ] Conteúdo (texto, CTAs) em PT/EN/FR; metadata.
- [ ] Se backend tiver endpoint, listagem ou link para pesquisa filtrada por férias; caso contrário, placeholder e link para pesquisa geral.

**Estimativa:** M  
**Labels:** `frontend`, `ux`  
**Depende de:** BE-014 (opcional)

---

### FE-013 [P2] Página Obras novas – conteúdo e listagem mínima

**Descrição:** Idem para novas construções: conteúdo e, quando a API existir, listagem de projetos/unidades.

**Critérios de aceitação:**
- [ ] Conteúdo e metadata; se API existir, listagem de projetos; senão, placeholder.

**Estimativa:** M  
**Labels:** `frontend`, `ux`  
**Depende de:** BE-016 (opcional)

---

### FE-014 [P2] Formulário “Novo imóvel” por tipologia

**Descrição:** Quando o backend suportar `usage` e `type_specific_data`, adaptar o formulário de novo imóvel para mostrar campos por tipologia (residencial, terreno, comercial, férias, novo projeto).

**Critérios de aceitação:**
- [ ] Seleção de tipo/uso; blocos de campos condicionais (ex.: férias → min_noites, preços sazonais; novo projeto → dados do projeto).
- [ ] Validação e submissão alinhadas à API; não quebrar fluxo atual se backend ainda não tiver todos os campos.

**Estimativa:** L  
**Labels:** `frontend`, `ux`, `arquitetura`  
**Depende de:** BE-010, BE-011 (e opcionalmente BE-013, BE-015)

---

## Acessibilidade e i18n

---

### FE-015 [P1] Revisão de labels e mensagens de erro (PT/EN/FR)

**Descrição:** Revisar formulários e mensagens de erro para garantir que estão traduzidos e claros nos três idiomas.

**Critérios de aceitação:**
- [ ] Lista de chaves de tradução usadas em formulários (contacto, lead, login, novo imóvel); verificar pt.json, en.json, fr.json.
- [ ] Mensagens de erro de API mapeadas para chaves i18n onde aplicável; texto acessível (não só “Error 400”).

**Estimativa:** M  
**Labels:** `frontend`, `ux`

---

### FE-016 [P2] Skip link e landmarks em novas páginas

**Descrição:** Garantir que novas páginas (credito-habitacao, ferias, obras-novas) têm skip link (se aplicável) e landmarks corretos (main, nav, etc.).

**Critérios de aceitação:**
- [ ] Páginas novas seguem o mesmo padrão do layout público (skip link no root layout); `<main id="main">` e estrutura semântica.
- [ ] Navegação por teclado e screen reader verificada em pelo menos uma página nova.

**Estimativa:** S  
**Labels:** `frontend`, `ux`

---

# Resumo de dependências (ordem sugerida)

**Backend – ordem sugerida:**  
BE-001 → BE-002, BE-003 → BE-004, BE-005, BE-006, BE-007, BE-008, BE-009 → BE-010, BE-011 → BE-012 → BE-013 → BE-014, BE-015 → BE-016, BE-017, BE-018, BE-019, BE-020, BE-021.

**Frontend – ordem sugerida:**  
FE-001, FE-002, FE-007 → FE-008; FE-003, FE-004; FE-005, FE-006; FE-009, FE-010; FE-011 → FE-012, FE-013 quando backend permitir; FE-014 após BE-010/BE-011; FE-015, FE-016 em paralelo.

**Cross-team:**  
- FE-001 depende de BE-004 (leitura de flags).  
- FE-011 independente; FE-012/FE-013 melhor com BE-014/BE-016.  
- FE-008 usa FE-007; FE-009/FE-010 podem ser feitos em paralelo após FE-007.

---

*Documento de referência para backlog. Atualizar estimativas e prioridades conforme decisões do Arquiteto/Supervisor.*
