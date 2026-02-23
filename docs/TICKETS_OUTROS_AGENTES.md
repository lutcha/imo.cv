# Tickets granulares – Supervisor, QA, DevOps, UX/UI, Data Scientist (imo.cv)

Tarefas em formato **issue/ticket** para os agentes que faltavam. Mesmas convenções de [TICKETS_BACKEND_FRONTEND.md](./TICKETS_BACKEND_FRONTEND.md).

**Convenções:** P0/P1/P2/P3 | S/M/L/XL | labels por agente e área

---

# PARTE 1 – SUPERVISOR

---

### SV-001 [P0] Checklist defensivo por PR (documento)

**Descrição:** Criar checklist baseado nas Fases 1–3 do doc defensivo (Avaliação de Impacto, Preparação Defensiva, Validação em Staging) para ser usado em cada PR que altere comportamento ou infra.

**Critérios de aceitação:**
- [ ] Documento em `docs/` ou `.cursor/rules/` com checklist em markdown.
- [ ] Fase 1: Esta mudança quebra funcionalidades? Existe teste automatizado? Custo de reversão? Impacto multi-tenant? Performance 3G? Dependências externas?
- [ ] Fase 2: Feature flag para feature nova? Fallback para falha? Métricas de monitorização? Passos de rollback documentados?
- [ ] Fase 3: Deploy staging com flag desativada; validação humana; aprovação PO quando aplicável.
- [ ] Referência ao doc [INSTRUÇÕES_DEFENSIVAS_PARA_ARQUITETURA.md](./INSTRUÇÕES_DEFENSIVAS_PARA_ARQUITETURA.md).

**Estimativa:** M  
**Labels:** `supervisor`, `defensivo`, `processo`

---

### SV-002 [P0] Regras de escalação – documento

**Descrição:** Documentar quando uma tarefa deve ser aprovada por humano (Arquiteto/PO) antes de implementar: DB, multi-tenant, infra, WhatsApp.

**Critérios de aceitação:**
- [ ] Lista de “Escalar se”: alteração de schema em tabelas com >10k registos, alteração de isolamento tenant, mudança de infra (cloud, cache, DB), alteração da integração WhatsApp.
- [ ] O que é obrigatório antes de prosseguir: análise de impacto, plano de rollback testado, etc.
- [ ] Integração com checklist de PR (referência ou link para SV-001).
- [ ] Alinhado aos critérios já descritos em `.cursor/agents/supervisor.md`.

**Estimativa:** S  
**Labels:** `supervisor`, `defensivo`, `processo`

---

### SV-003 [P1] Template de Health Dashboard

**Descrição:** Definir estrutura e fontes de dados para o “Dashboard de saúde” do Supervisor: métricas a mostrar e onde obtê-las (Sentry, logs, `/api/health`).

**Critérios de aceitação:**
- [ ] Documento ou template (markdown/notion) com secções: Uptime, Error rate, Performance (LCP/TTI 3G e 4G), WhatsApp delivery, Lead conversion, Tenants ativos.
- [ ] Para cada métrica: fonte (ex.: Sentry, endpoint health, analytics), limiar de alerta (ex.: error rate > 5%), frequência de verificação.
- [ ] Referência a BE-001 (health endpoint) como fonte quando aplicável.
- [ ] Pode ser implementação manual (planilha/notion) ou especificação para ferramenta futura.

**Estimativa:** M  
**Labels:** `supervisor`, `defensivo`  
**Depende de:** BE-001 (recomendado)

---

### SV-004 [P1] Template de relatório semanal

**Descrição:** Template de relatório semanal para o Supervisor preencher e partilhar com stakeholders: saúde, progresso por agente, riscos, escalações.

**Critérios de aceitação:**
- [ ] Template em markdown (em `docs/` ou junto ao supervisor.md) com: resumo da semana, saúde (verde/amarelo/vermelho), progresso (% ou lista de entregas), bloqueios, riscos com mitigação, escalações pendentes/resolvidas, prioridades da próxima semana.
- [ ] Alinhado ao “WEEKLY REPORT TEMPLATE” em `.cursor/agents/supervisor.md`.
- [ ] Instruções breves de como preencher (ex.: onde obter métricas).

**Estimativa:** S  
**Labels:** `supervisor`, `processo`

---

### SV-005 [P2] Integrar checklist defensivo ao fluxo de PR

**Descrição:** Garantir que o checklist defensivo (SV-001) é usado no fluxo de trabalho: referência na descrição do PR, ou bot/action que comenta com o checklist (opcional).

**Critérios de aceitação:**
- [ ] Na descrição do template de PR (GitHub/GitLab) ou em CONTRIBUTING.md: link para o checklist e instrução “preencher antes de merge para mudanças que afetem comportamento/infra”.
- [ ] Opcional: GitHub Action ou script que adiciona comentário com checklist em PRs que tocam em pastas críticas (backend, infra).

**Estimativa:** S  
**Labels:** `supervisor`, `processo`  
**Depende de:** SV-001

---

### SV-006 [P2] Primeira auditoria de qualidade (baseline)

**Descrição:** Realizar uma auditoria inicial de qualidade do projeto: cobertura de testes, dívida técnica conhecida, conformidade com checklist defensivo em código recente.

**Critérios de aceitação:**
- [ ] Relatório breve (markdown): cobertura atual backend/frontend (se disponível), lista de áreas sem testes críticos, 3–5 melhorias prioritárias.
- [ ] Resultado partilhado com equipa; itens transformados em tickets ou backlog quando aplicável.

**Estimativa:** M  
**Labels:** `supervisor`, `qualidade`

---

# PARTE 2 – QA TESTER

---

### QA-001 [P0] E2E – Fluxo público: Homepage → Busca → Detalhe → Contacto

**Descrição:** Teste E2E (Playwright ou equivalente) que cobre o percurso principal do visitante: abrir homepage, fazer uma busca, abrir detalhe de um imóvel, acionar contacto (WhatsApp ou formulário).

**Critérios de aceitação:**
- [ ] Teste automatizado em `web/e2e/` (ou pasta acordada).
- [ ] Passos: visit homepage → preencher filtros e submeter busca → clicar num resultado → na página de detalhe, clicar em “Contactar” ou preencher formulário.
- [ ] Assertions: URL correta em cada passo; página de detalhe mostra dados do imóvel; formulário submete ou link WhatsApp abre (conforme implementação).
- [ ] Configurável para rodar contra ambiente local ou staging (env/baseURL).

**Estimativa:** L  
**Labels:** `qa`, `e2e`, `defensivo`

---

### QA-002 [P0] E2E – Fluxo agente: Login → Dashboard → Imóveis → Novo imóvel

**Descrição:** Teste E2E do fluxo do agente: login, dashboard, listagem de imóveis, e criação (ou edição) de um imóvel.

**Critérios de aceitação:**
- [ ] Login com credenciais de teste (env ou fixture).
- [ ] Navegar para Dashboard e validar que carrega (KPIs ou mensagem esperada).
- [ ] Ir a Imóveis → lista visível; clicar em “Novo imóvel” (ou equivalente).
- [ ] Preencher formulário mínimo e submeter; validar redirecionamento ou mensagem de sucesso.
- [ ] Dados de teste isolados (não poluir dados reais); documentado como rodar o teste.

**Estimativa:** L  
**Labels:** `qa`, `e2e`, `defensivo`

---

### QA-003 [P1] E2E – Fluxo agente: Leads / Pipeline

**Descrição:** E2E que cobre a área de leads: listagem e, se existir, movimento de lead no pipeline (Kanban).

**Critérios de aceitação:**
- [ ] Após login como agente, navegar para Leads/Pipeline.
- [ ] Lista ou colunas do Kanban visíveis; opcional: arrastar um lead de coluna ou alterar estado e validar persistência.
- [ ] Teste estável (sem flakiness por timing); timeout adequados.

**Estimativa:** M  
**Labels:** `qa`, `e2e`  
**Depende de:** QA-002 (login reutilizável)

---

### QA-004 [P1] E2E – Fluxo condomínios (listar condomínios / unidades ou quotas)

**Descrição:** E2E para o módulo condomínios: listar condomínios e, conforme UI, visualizar unidades ou quotas.

**Critérios de aceitação:**
- [ ] Login como utilizador com acesso a condomínios (agente ou admin).
- [ ] Navegar para Condomínios; lista de condomínios carrega.
- [ ] Abrir um condomínio e validar que unidades ou quotas são exibidas (conforme UI existente).
- [ ] Documentado como configurar dados de teste (fixtures) para condomínios.

**Estimativa:** M  
**Labels:** `qa`, `e2e`

---

### QA-005 [P0] Teste de segurança – SQL injection nos filtros de busca

**Descrição:** Garantir que os parâmetros de busca (ilha, tipo, preço, etc.) não são vulneráveis a SQL injection.

**Critérios de aceitação:**
- [ ] Casos de teste documentados ou automatizados: enviar payloads maliciosos (ex.: `' OR '1'='1`, strings com aspas) nos query params da API de propriedades/leads.
- [ ] Resposta deve ser 400 ou lista vazia/segura; nunca erro 500 por SQL ou dados de outros tenants.
- [ ] Se existir API de busca no backend, teste contra ela; caso contrário, teste contra o frontend (formulário de pesquisa).
- [ ] Resultado registado (pass/fail) e qualquer vulnerabilidade reportada como bug.

**Estimativa:** M  
**Labels:** `qa`, `segurança`, `defensivo`

---

### QA-006 [P0] Teste de segurança – XSS em descrição de imóvel

**Descrição:** Validar que conteúdo HTML/script em descrição de imóvel não é executado no frontend (XSS).

**Critérios de aceitação:**
- [ ] Criar ou usar imóvel de teste com descrição contendo `<script>alert(1)</script>` ou `<img onerror="...">`.
- [ ] Na página pública de detalhe do imóvel, o script não deve executar; o conteúdo deve ser escapado ou sanitizado.
- [ ] Teste em pelo menos um browser (Chrome ou Firefox); resultado documentado.

**Estimativa:** S  
**Labels:** `qa`, `segurança`, `defensivo`

---

### QA-007 [P1] Teste de segurança – CSRF em formulários de contacto/lead

**Descrição:** Garantir que formulários de contacto e lead estão protegidos contra CSRF (token ou SameSite cookie).

**Critérios de aceitação:**
- [ ] Verificar que o formulário de contacto (e de lead, se existir) envia token CSRF ou que a API exige origem/cookie adequado.
- [ ] Teste: submissão a partir de origem não autorizada deve falhar (403 ou rejeição).
- [ ] Documentar conclusão e recomendações se algo falhar.

**Estimativa:** S  
**Labels:** `qa`, `segurança`

---

### QA-008 [P0] Teste de isolamento multi-tenant (API + UI)

**Descrição:** Testes que garantem que agência B não acede a dados da agência A (imóveis, leads, condomínios).

**Critérios de aceitação:**
- [ ] Cenário: duas agências (A e B) com dados; utilizador autenticado como agência B.
- [ ] API: GET de recurso (imóvel, lead) que pertence à agência A deve retornar 404 ou 403.
- [ ] UI: após login como B, não deve ser possível ver na lista ou no detalhe dados de A (validar em pelo menos uma lista: imóveis ou leads).
- [ ] Pode reutilizar ou complementar testes de backend (BE-006, BE-007); E2E ou API tests no repo QA/frontend.

**Estimativa:** M  
**Labels:** `qa`, `segurança`, `defensivo`

---

### QA-009 [P1] Teste de resiliência – API indisponível

**Descrição:** Quando a API está em baixo ou lenta, o frontend deve mostrar mensagem clara e não crashar.

**Critérios de aceitação:**
- [ ] Cenário: simular API em baixo (mock 502/503 ou desligar backend em ambiente de teste).
- [ ] Em páginas críticas (home, busca, detalhe): mensagem de erro amigável e opção “Tentar novamente” ou equivalente; sem tela branca nem erro não tratado.
- [ ] Teste manual ou automatizado (ex.: interceptar fetch e retornar 503); resultado documentado.

**Estimativa:** M  
**Labels:** `qa`, `defensivo`, `resiliência`

---

### QA-010 [P1] Teste de resiliência – Fallback do mapa (Mapbox falha)

**Descrição:** Validar que quando o mapa (Mapbox) falha ou dá timeout, o fallback está ativo (FE-006).

**Critérios de aceitação:**
- [ ] Simular falha do Mapbox (bloquear URL do Mapbox ou timeout); na página de pesquisa, deve aparecer fallback (lista apenas, ou mapa estático, ou mensagem) sem crash.
- [ ] Documentar passos e resultado; se FE-006 não estiver implementado, reportar como bloqueador.

**Estimativa:** S  
**Labels:** `qa`, `defensivo`, `resiliência`  
**Depende de:** FE-006

---

### QA-011 [P1] Lighthouse – Performance em 3G simulada

**Descrição:** Executar Lighthouse com throttling 3G e registar LCP e TTI; validar limites do doc defensivo (LCP < 2.5s, TTI < 4s em 3G).

**Critérios de aceitação:**
- [ ] Configuração Lighthouse (ou equivalente) com rede 3G (ex.: Slow 3G no DevTools).
- [ ] Páginas alvo: homepage, pesquisa, detalhe de imóvel; registar LCP, TTI e score de performance.
- [ ] Relatório em markdown ou artefacto: valores atuais vs. alvo; recomendações se fora do alvo.
- [ ] Repetível (script ou instruções) para regressão futura.

**Estimativa:** M  
**Labels:** `qa`, `performance`, `defensivo`

---

### QA-012 [P1] Lighthouse – Acessibilidade (WCAG 2.1 AA)

**Descrição:** Avaliar acessibilidade das páginas principais com Lighthouse (e opcionalmente axe) para WCAG 2.1 AA.

**Critérios de aceitação:**
- [ ] Lighthouse a11y em: homepage, pesquisa, detalhe imóvel, login agente, dashboard.
- [ ] Registar score e issues (contraste, labels, landmarks, etc.); criar tickets ou lista de correções prioritárias.
- [ ] Pelo menos um ciclo: correções em itens críticos e nova medição.

**Estimativa:** M  
**Labels:** `qa`, `acessibilidade`, `ux`

---

### QA-013 [P0] Integrar E2E no CI (smoke público)

**Descrição:** Integrar execução de pelo menos um E2E (fluxo público) no pipeline de CI (GitHub Actions, GitLab CI, etc.).

**Critérios de aceitação:**
- [ ] Job no CI que corre o teste E2E (ex.: Playwright) contra build de preview ou ambiente de teste.
- [ ] Smoke mínimo: homepage carrega e busca retorna resultados (ou página de pesquisa carrega).
- [ ] Falha do E2E falha o pipeline; tempo máximo aceitável configurado (ex.: 3 min).
- [ ] Documentado como rodar localmente e no CI.

**Estimativa:** L  
**Labels:** `qa`, `ci`, `defensivo`  
**Depende de:** QA-001 (ou smoke mínimo equivalente)

---

### QA-014 [P1] Smoke E2E para canal agente e admin no CI

**Descrição:** Adicionar ao CI mais dois smokes: um para área agente (login + dashboard) e outro para admin (login + dashboard), se aplicável.

**Critérios de aceitação:**
- [ ] Job ou passo no CI: E2E agente (login + dashboard carrega).
- [ ] Job ou passo: E2E admin (login + dashboard admin carrega).
- [ ] Credenciais de teste em secrets do CI; não expor em código.
- [ ] Opcional: reutilizar fixtures ou seed de dados de teste.

**Estimativa:** M  
**Labels:** `qa`, `ci`  
**Depende de:** QA-002, QA-013

---

# PARTE 3 – DEVOPS ENGINEER

---

### DO-001 [P0] Script rollback.sh (desativar flags, reverter containers, Redis, health)

**Descrição:** Script executável que realiza rollback em < 5 minutos: desativar feature flags, reverter containers para imagem anterior, limpar cache Redis, validar health.

**Critérios de aceitação:**
- [ ] Script `rollback.sh` (ou equivalente em Windows/PowerShell se necessário) no repositório ou em repo de infra.
- [ ] Passos: 1) Chamar API para desativar feature flags (conforme BE-005), 2) Reverter containers (ex.: docker-compose pull previous && up, ou kubectl rollback), 3) Limpar cache Redis (FLUSHDB ou keys críticos), 4) Validar GET /api/health até status ok ou timeout.
- [ ] Script idempotente onde fizer sentido; uso de variáveis de ambiente para URLs/tokens (não hardcoded).
- [ ] Testado em ambiente de staging pelo menos uma vez.

**Estimativa:** L  
**Labels:** `devops`, `defensivo`, `rollback`  
**Depende de:** BE-001, BE-005

---

### DO-002 [P0] Runbook de rollback (documento)

**Descrição:** Documentar no runbook os passos de rollback, quando acionar, e como validar após rollback.

**Critérios de aceitação:**
- [ ] Documento em `docs/runbook-rollback.md` (ou nome acordado) com: quando fazer rollback (métricas, erros críticos), quem pode executar, passos detalhados (incluindo execução do script DO-001), validação pós-rollback, contacto/escalação.
- [ ] Referência ao protocolo de crise do doc defensivo (5 min); template de comunicação para stakeholders (opcional).
- [ ] Revisão com equipa e aprovação.

**Estimativa:** M  
**Labels:** `devops`, `defensivo`, `documentação`  
**Depende de:** DO-001

---

### DO-003 [P1] Integrar health check no pipeline de deploy

**Descrição:** Após deploy, o pipeline deve chamar `/api/health` e falhar o deploy se o health não retornar ok dentro de um tempo limite.

**Critérios de aceitação:**
- [ ] Passo no pipeline (após deploy da aplicação): GET /api/health com retry (ex.: 3 tentativas, 30s intervalo).
- [ ] Se status != ok (ou timeout), marcar deploy como falhado e opcionalmente notificar; não marcar sucesso se health falhar.
- [ ] URL do health configurável (env ou variável do pipeline).

**Estimativa:** M  
**Labels:** `devops`, `defensivo`, `ci`  
**Depende de:** BE-001

---

### DO-004 [P1] Alertas pós-deploy (48h) – error rate e uptime

**Descrição:** Configurar alertas para as primeiras 48h após deploy: error rate e uptime (fonte: Sentry, load balancer, ou health checks agendados).

**Critérios de aceitação:**
- [ ] Alerta configurado (Slack, email ou ferramenta em uso): error rate > 5% em janela de 15 min nas primeiras 48h após deploy.
- [ ] Alerta de uptime: se health check falhar N vezes consecutivas (ex.: 3), notificar.
- [ ] Documentado onde ver dashboards e como silenciar falsos positivos se necessário.

**Estimativa:** L  
**Labels:** `devops`, `defensivo`, `monitorização`

---

### DO-005 [P2] Alertas – LCP/TTI (frontend) e WhatsApp delivery

**Descrição:** Alertas para métricas de frontend (LCP/TTI) e, se disponível, taxa de entrega WhatsApp (conforme doc defensivo).

**Critérios de aceitação:**
- [ ] Se houver ferramenta de RUM (Real User Monitoring): alerta quando LCP > 3s (4G) ou TTI > 4s em percentil 95.
- [ ] WhatsApp: se existir métrica de mensagens enviadas/entregues, alerta quando taxa de entrega < 95% em janela (ex.: 1h).
- [ ] Documentado; pode ser fase 2 se RUM ainda não existir.

**Estimativa:** M  
**Labels:** `devops`, `monitorização`

---

### DO-006 [P1] Processo de deploy em staging com flag desativada

**Descrição:** Documentar e aplicar processo: deploy em staging primeiro, com feature flags desativadas; validação humana antes de ativar em produção.

**Critérios de aceitação:**
- [ ] Documento ou checklist: deploy para staging → testes manuais ou E2E → aprovação (PO ou tech lead) → deploy para produção com flags ainda desativadas → ativar flags gradualmente se canary.
- [ ] Pelo menos um ciclo completo executado e documentado (pode ser para uma feature pequena).

**Estimativa:** S  
**Labels:** `devops`, `defensivo`, `processo`

---

### DO-007 [P2] Canary deploy (5% tráfego para nova versão)

**Descrição:** Opcional: configurar canary para rotas críticas (ex.: 5% do tráfego para nova versão) antes de 100% (middleware ou load balancer).

**Critérios de aceitação:**
- [ ] Mecanismo de canary documentado (ex.: Next.js middleware que reescreve para /v2/property, ou LB com regras por peso).
- [ ] Procedimento: ativar canary → monitorizar 24–48h → aumentar para 100% ou rollback.
- [ ] Pode ser marcado como “futuro” se não houver infra para canary ainda.

**Estimativa:** XL  
**Labels:** `devops`, `defensivo`

---

### DO-008 [P0] Backups de base de dados – teste de restore

**Descrição:** Garantir que os backups do PostgreSQL (e PostGIS) estão configurados e que um restore foi testado com sucesso.

**Critérios de aceitação:**
- [ ] Backups automáticos configurados (frequência mínima diária); retenção documentada.
- [ ] Pelo menos um teste de restore em ambiente não produtivo (staging ou cópia); duração e passos documentados.
- [ ] Documento com procedimento de restore em caso de desastre.

**Estimativa:** L  
**Labels:** `devops`, `defensivo`, `backup`

---

### DO-009 [P1] Health check do PostgreSQL e Redis no pipeline ou monitor

**Descrição:** Além do health da aplicação, garantir que PostgreSQL e Redis são monitorizados (disponibilidade e opcionalmente espaço).

**Critérios de aceitação:**
- [ ] Check de conectividade ao PostgreSQL (ex.: pg_isready ou query simples) em intervalo configurado; alerta se falhar.
- [ ] Check de Redis (PING); alerta se falhar.
- [ ] Pode ser parte do mesmo job que chama /api/health ou checks separados na ferramenta de monitorização.

**Estimativa:** M  
**Labels:** `devops`, `monitorização`

---

# PARTE 4 – UX/UI DESIGNER

---

### UX-001 [P0] Documento de Design System (tokens únicos)

**Descrição:** Consolidar tokens de design (cores, tipografia, espaçamento, border-radius) num único sítio (globals.css e/ou documento) alinhado ao agente UX/UI e à paleta “trust + hope + dream” e teal existente.

**Critérios de aceitação:**
- [ ] Documento (markdown ou Figma/Notion) com: paleta de cores (primária, secundária, semânticas), escala de tipo (tamanhos, pesos), escala de espaçamento (4px base), radius.
- [ ] Código: variáveis CSS em `globals.css` (ou ficheiro partilhado) que refletem o documento; sem duplicação de valores “hardcoded” nos componentes principais.
- [ ] Referência ao `.cursor/agents/ux-ui-designer.md` e à paleta atual do imo.cv (teal).

**Estimativa:** L  
**Labels:** `ux`, `design-system`

---

### UX-002 [P1] Revisão mobile – botões e inputs (thumb-friendly)

**Descrição:** Revisar botões e inputs para tamanho de toque mínimo (44px) e espaçamento adequado em mobile, sem alterar a API pública dos componentes.

**Critérios de aceitação:**
- [ ] Lista de componentes Button e Input usados nas páginas principais; verificar min-height/width e padding em viewport mobile.
- [ ] Ajustes em CSS (ou variantes) para garantir alvo de toque ≥ 44px e espaçamento entre elementos clicáveis ≥ 8px onde possível.
- [ ] Não quebrar layout em desktop; documentar alterações em comentário ou changelog.

**Estimativa:** M  
**Labels:** `ux`, `mobile`, `acessibilidade`

---

### UX-003 [P1] Guia de estados: loading, offline, erro de API

**Descrição:** Definir e documentar estados de UI: carregamento (skeleton), offline (mensagem + queue de leads), erro de API (retry + mensagem clara).

**Critérios de aceitação:**
- [ ] Documento ou secção no design system: descrição e exemplos visuais (ou referência a componentes) para Loading, Offline, Error (API/timeout).
- [ ] Microcopy em PT/EN/FR para: “Sem conexão”, “Guardado para enviar quando a internet voltar”, “Algo correu mal. Tente novamente.”, “A carregar…”
- [ ] Partilha com Frontend para implementação consistente (FE já tem alguns skeletons; alinhar mensagens).

**Estimativa:** M  
**Labels:** `ux`, `design-system`, `defensivo`

---

### UX-004 [P2] Especificação ou wireframes – página /credito-habitacao

**Descrição:** Especificação ou wireframes da página pública de simulador de crédito à habitação: estrutura, CTAs, conteúdo introdutório.

**Critérios de aceitação:**
- [ ] Wireframes (Figma, sketch ou descrição detalhada) ou spec em markdown: layout, título, texto introdutório, posição do CreditSimulator, CTA pós-simulação.
- [ ] Considerar mobile primeiro; referência ao componente CreditSimulator existente.
- [ ] Entregável partilhado com Frontend para FE-011.

**Estimativa:** S  
**Labels:** `ux`, `especificação`

---

### UX-005 [P2] Especificação ou wireframes – listagem/detalhe Férias e Obras novas

**Descrição:** Especificação ou wireframes para as páginas de Arrendamento Férias e Obras Novas (listagem e detalhe mínimo).

**Critérios de aceitação:**
- [ ] Para Férias: estrutura da listagem (cards, filtros) e do detalhe (galeria, preço, min noites, calendário se aplicável).
- [ ] Para Obras novas: listagem de projetos e detalhe de projeto (unidades, preços, estado da obra).
- [ ] Pode ser documento de spec em markdown com referências a componentes existentes (PropertyCard, etc.); wireframes se necessário para variações.
- [ ] Entregável para alinhar Frontend (FE-012, FE-013) e Backend.

**Estimativa:** M  
**Labels:** `ux`, `especificação`

---

### UX-006 [P2] Especificação – formulário novo imóvel por tipologia

**Descrição:** Especificar fluxo e campos do formulário “Novo imóvel” por tipologia (residencial, terreno, comercial, férias, novo projeto) para quando o backend suportar.

**Critérios de aceitação:**
- [ ] Fluxo: seleção de tipo/uso → blocos de campos condicionais por tipo (lista de campos por tipologia).
- [ ] Para cada tipo: campos obrigatórios e opcionais; exemplos para short_term_rental (min noites, preços sazonais) e new_development (dados do projeto).
- [ ] Especificação em markdown ou Figma; alinhada à arquitetura v02 e ao FE-014.

**Estimativa:** M  
**Labels:** `ux`, `especificação`, `arquitetura`

---

### UX-007 [P1] Checklist a11y para novos componentes

**Descrição:** Checklist de acessibilidade (WCAG 2.1 AA) para ser usado ao criar ou rever componentes: contraste, foco, labels, landmarks.

**Critérios de aceitação:**
- [ ] Documento em `docs/` ou no design system com checklist: contraste mínimo 4.5:1 (texto), foco visível, labels em formulários, uso de landmarks (main, nav), botões/links descritivos.
- [ ] Referência a ferramentas (Lighthouse, axe) e a QA-012.
- [ ] Integrado ao processo: “novos componentes devem passar pelo checklist antes de merge”.

**Estimativa:** S  
**Labels:** `ux`, `acessibilidade`

---

### UX-008 [P2] Revisão de contraste e foco em páginas críticas

**Descrição:** Revisar manualmente (ou com ferramentas) contraste de cores e indicação de foco em homepage, pesquisa, detalhe de imóvel e login.

**Critérios de aceitação:**
- [ ] Lista de elementos com contraste insuficiente (texto, botões, links) e correções propostas (cores ou variantes).
- [ ] Verificação de focus visible (outline ou ring) em navegação por teclado; correções se necessário.
- [ ] Resultados partilhados com Frontend; tickets ou PRs para correções.

**Estimativa:** M  
**Labels:** `ux`, `acessibilidade`

---

# PARTE 5 – DATA SCIENTIST (AVM)

---

### DS-001 [P0] AVM atrás de feature flag (avm_beta)

**Descrição:** Garantir que toda a funcionalidade AVM (API e frontend) está protegida pela feature flag `avm_beta` e pode ser desativada no rollback.

**Critérios de aceitação:**
- [ ] Backend: endpoint de estimativa AVM só processa pedidos se flag `avm_beta` estiver ativa; caso contrário retorna 403 ou 503 com mensagem “Feature não disponível”.
- [ ] Frontend: componente ou página que mostra estimativa AVM só renderiza ou chama a API se a flag estiver ativa; caso contrário não mostra bloco AVM.
- [ ] Documentado: como ativar/desativar para rollback (BE-005 ou env).

**Estimativa:** M  
**Labels:** `data-science`, `defensivo`, `avm`  
**Depende de:** BE-003, BE-004 (feature flags)

---

### DS-002 [P1] Pipeline de dados para AVM (Property + opcional transações)

**Descrição:** Pipeline que extrai dados de Property (e transações históricas se existirem) para treino/avaliação do modelo; feature store ou dataset documentado.

**Critérios de aceitação:**
- [ ] Script ou job que extrai propriedades com campos necessários (preço, área, quartos, ilha, concelho, localização, etc.) e exporta para formato adequado (CSV, Parquet, ou DB de features).
- [ ] Documentação: quais campos são usados, como tratar valores em falta, filtros (ex.: apenas publicados/vendidos).
- [ ] Opcional: integração com Redis ou store para inferência em tempo real; senão, batch suficiente para treino e validação.

**Estimativa:** L  
**Labels:** `data-science`, `avm`, `pipeline`

---

### DS-003 [P1] Modelo AVM – versão inicial (hedónico + comparables ou baseline)

**Descrição:** Implementar versão inicial do modelo de estimativa de preço: hedónico simples e/ou comparables (KNN), com validação por ilha.

**Critérios de aceitação:**
- [ ] Modelo treinado com dados históricos (ou atuais se não houver vendas); output: preço estimado + intervalo de confiança (ex.: AVMU).
- [ ] Validação: métrica de erro (MAE, MAPE ou RMSE) por ilha; documentado.
- [ ] Modelo serializado (pickle, joblib ou formato padrão) e versão guardada; requisitos (Python, libs) documentados.

**Estimativa:** XL  
**Labels:** `data-science`, `avm`, `modelo`

---

### DS-004 [P1] API POST /api/avm/estimate

**Descrição:** Endpoint que recebe características do imóvel e devolve estimativa de preço, intervalo de confiança e opcionalmente comparáveis.

**Critérios de aceitação:**
- [ ] `POST /api/avm/estimate` com body (ex.: island, municipality, area_m2, rooms, bathrooms, property_type, …).
- [ ] Resposta: `{ "estimate": number, "confidence_interval": { "low": number, "high": number }, "comparables": [...] }` (comparables opcional).
- [ ] Só ativo se flag `avm_beta` estiver ativa (DS-001); rate limit recomendado.
- [ ] Documentação (OpenAPI ou markdown) com exemplo de request/response.

**Estimativa:** L  
**Labels:** `data-science`, `avm`, `api`  
**Depende de:** DS-001, DS-003

---

### DS-005 [P2] Frontend – uso do AVM no detalhe de imóvel ou formulário novo imóvel

**Descrição:** Integrar chamada à API AVM no frontend: no detalhe do imóvel (bloco “Estimativa de valor”) ou no formulário de novo imóvel (sugestão de preço), sempre com indicação “Estimativa” e atrás da flag.

**Critérios de aceitação:**
- [ ] Componente ou bloco que chama POST /api/avm/estimate com dados do imóvel; exibe estimativa e intervalo (e opcionalmente comparáveis).
- [ ] Texto claro: “Estimativa automática”, “Valor de referência”, ou equivalente; não substituir preço definido pelo agente.
- [ ] Só visível se feature flag `avm_beta` estiver ativa; fallback gracioso se API falhar.

**Estimativa:** M  
**Labels:** `data-science`, `avm`, `frontend`  
**Depende de:** DS-004, FE-001 (flags no frontend)

---

### DS-006 [P2] Métricas de uso e qualidade do AVM

**Descrição:** Registar uso do AVM (número de pedidos, por ilha/tipo) e, quando houver preços realizados, erro médio (para monitorização e melhoria do modelo).

**Critérios de aceitação:**
- [ ] Log ou métrica: cada chamada a /api/avm/estimate registada (sem dados pessoais): timestamp, ilha, tipo de imóvel, estimativa; opcional: property_id se anónimo.
- [ ] Se existir dado de “preço realizado” (venda/arrendamento efetivo), job ou relatório que calcula MAE/MAPE por período; não expor em API pública.
- [ ] Documentação: onde consultar métricas e como interpretar.

**Estimativa:** M  
**Labels:** `data-science`, `avm`, `monitorização`  
**Depende de:** DS-004

---

# Resumo e dependências entre agentes

**Supervisor:** SV-001, SV-002 primeiro; SV-003 após BE-001; SV-004, SV-005, SV-006 em seguida.

**QA:** QA-001, QA-002, QA-005, QA-006, QA-008, QA-013 prioritários; QA-003, QA-004, QA-007, QA-009 a QA-012, QA-014 em seguida. QA-010 depende de FE-006; QA-013/014 integram CI.

**DevOps:** DO-001 (depende BE-001, BE-005), DO-002, DO-003, DO-008 prioritários; DO-004, DO-006, DO-009; DO-005, DO-007 em fase 2.

**UX/UI:** UX-001 base; UX-002, UX-003, UX-007 em seguida; UX-004 a UX-006 para fluxos novos; UX-008 revisão a11y.

**Data Scientist:** DS-001 após feature flags; DS-002, DS-003 em paralelo; DS-004 após DS-003; DS-005 (com Frontend); DS-006 após DS-004.

---

*Documento de referência para backlog. Ver também [TICKETS_BACKEND_FRONTEND.md](./TICKETS_BACKEND_FRONTEND.md) e [PLANO_AGENTES_ARQUITETURA.md](./PLANO_AGENTES_ARQUITETURA.md).*
