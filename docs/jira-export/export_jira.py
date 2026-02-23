#!/usr/bin/env python3
"""
Gera CSV e JSON para importação no Jira a partir dos tickets imo.cv.
Uso: python export_jira.py
Gera: jira-import.csv e jira-import.json na mesma pasta.
"""
import csv
import json
import os

# Mapeamentos para Jira
PRIORITY_MAP = {"P0": "Highest", "P1": "High", "P2": "Medium", "P3": "Low"}
STORY_POINTS_MAP = {"S": 1, "M": 2, "L": 5, "XL": 8}

DOCS_REF = "\n\nCritérios de aceitação completos em: docs/TICKETS_BACKEND_FRONTEND.md e docs/TICKETS_OUTROS_AGENTES.md"

# Todos os tickets: (key, summary_sem_key, description_curta, priority, labels, component, estimate, depends_on)
TICKETS = [
    # Backend
    ("BE-001", "Endpoint GET /api/health (DB + Redis)", "Criar endpoint de health check para rollback e monitorização. Resposta JSON com status e checks (database, redis).", "P0", "backend defensivo api", "Backend", "M", ""),
    ("BE-002", "Health: check opcional Celery", "Incluir no health check indicador opcional do estado do Celery (worker/fila).", "P1", "backend defensivo api", "Backend", "S", "BE-001"),
    ("BE-003", "Modelo e storage de Feature Flags", "Persistência de feature flags (DB ou config) para rollback sem redeploy. Ex.: new_search_v2, avm_beta.", "P0", "backend defensivo arquitetura", "Backend", "M", ""),
    ("BE-004", "API de leitura de Feature Flags (pública)", "GET /api/feature-flags/ retorna JSON com estado das flags para o frontend. Cacheável.", "P0", "backend defensivo api", "Backend", "S", "BE-003"),
    ("BE-005", "API de escrita de Feature Flags (admin)", "Endpoint protegido para ativar/desativar flags (rollback rápido). Apenas admin/superuser.", "P1", "backend defensivo api", "Backend", "S", "BE-003"),
    ("BE-006", "Teste isolamento multi-tenant – Properties", "Teste: agência B não vê/altera imóveis da agência A. 404/403 em GET de recurso de outra agência.", "P0", "backend testes defensivo", "Backend", "M", ""),
    ("BE-007", "Teste isolamento multi-tenant – Leads", "Teste: agência B não acede a leads da agência A.", "P0", "backend testes defensivo", "Backend", "S", ""),
    ("BE-008", "Teste resiliência: API sem Redis", "Quando Redis indisponível, endpoints principais retornam 200 com dados válidos (sem cache).", "P1", "backend testes defensivo", "Backend", "M", ""),
    ("BE-009", "Documentar passos de rollback no README/runbook", "Secção Rollback em docs/README: desativar flags, validar /api/health, referência script DevOps.", "P2", "backend defensivo", "Backend", "S", ""),
    ("BE-010", "Adicionar campo usage ao modelo Property", "Campo opcional usage (sale, long_term_rental, short_term_rental, pre_sale). Migração reversível.", "P1", "backend arquitetura", "Backend", "M", ""),
    ("BE-011", "Adicionar campo type_specific_data (JSON) ao Property", "JSONField para dados por tipologia (férias, new_development, etc.). Opcional.", "P1", "backend arquitetura", "Backend", "S", ""),
    ("BE-012", "Estender PropertyType/ListingType conforme v02", "Alinhar choices à arquitetura v02 (residential, land, short_term_rental, etc.) de forma incremental.", "P2", "backend arquitetura", "Backend", "L", ""),
    ("BE-013", "App short_term_rental – modelos", "Criar app Django com modelos para alojamento local (preços sazonais, min noites, taxa limpeza).", "P1", "backend arquitetura", "Backend", "L", ""),
    ("BE-014", "API mínima para short-term rental", "Endpoints para listar/filtrar imóveis de férias (ilha, datas, min_noites).", "P1", "backend api", "Backend", "M", "BE-013"),
    ("BE-015", "App new_developments – modelos (projeto + unidades)", "Modelos NewDevelopment e DevelopmentUnit. Migrações e admin básico.", "P1", "backend arquitetura", "Backend", "L", ""),
    ("BE-016", "API mínima para novas construções", "GET /api/new-developments/ e detalhe por id. Filtros por ilha e estado.", "P1", "backend api", "Backend", "M", "BE-015"),
    ("BE-017", "App ou endpoints financing – simulador e lead", "POST /api/financing/simulate/ e /api/financing/pre-approval-lead/. Validação e rate limit opcional.", "P1", "backend api arquitetura", "Backend", "L", ""),
    ("BE-018", "Endpoint validação concelhos por ilha", "GET /api/geo/municipalities/?island=X retorna concelhos válidos. Cacheável.", "P1", "backend api", "Backend", "S", ""),
    ("BE-019", "Validação backend: concelho pertence à ilha", "Serializer/model clean: ValidationError se municipality inválido para a island.", "P2", "backend defensivo", "Backend", "S", ""),
    ("BE-020", "WhatsApp webhook documentado e estável", "Documentação do webhook (URL, assinatura, exemplos). Teste de verificação e tratamento de erros.", "P2", "backend api", "Backend", "M", ""),
    ("BE-021", "Fallback WhatsApp → SMS (configuração)", "Config e ponto de integração para envio SMS quando WhatsApp falhar. Provider opcional.", "P3", "backend defensivo", "Backend", "M", ""),
    # Frontend
    ("FE-001", "Leitura de feature flags (env + API)", "Helper/hook useFeatureFlags() a partir de NEXT_PUBLIC_FF_* e opcionalmente API. Documentar flags.", "P0", "frontend defensivo", "Frontend", "M", ""),
    ("FE-002", "next.config: webpack produção, turbopack só dev", "Build de produção usa webpack; turbopack apenas em development. Documentado.", "P1", "frontend defensivo", "Frontend", "S", ""),
    ("FE-003", "Revisão Server/Client – página detalhe imóvel", "Evitar hydration mismatch: dados no Server Component; window/browser em 'use client' com props.", "P1", "frontend defensivo", "Frontend", "M", ""),
    ("FE-004", "Revisão Server/Client – página pesquisa", "Mesma revisão para search: client components para mapa e interações; dados iniciais no servidor.", "P1", "frontend defensivo", "Frontend", "M", ""),
    ("FE-005", "Componente AdaptiveImage", "Imagem que ajusta quality por navigator.connection.effectiveType (2g/3g/4g). Piloto em detalhe imóvel.", "P0", "frontend defensivo ux", "Frontend", "M", ""),
    ("FE-006", "Fallback do mapa (Mapbox falha ou timeout)", "Timeout configurável; em falha mostrar lista ou mapa estático. Sem crash.", "P1", "frontend defensivo ux", "Frontend", "M", ""),
    ("FE-007", "lib/validation/cv-localization.ts", "formatCurrencyCVE e validateMunicipality. Constantes ilhas/concelhos. Testes opcionais.", "P0", "frontend defensivo", "Frontend", "M", ""),
    ("FE-008", "Uso de cv-localization em formulários e exibição", "Integrar formatCurrencyCVE e validateMunicipality em forms e exibição de preços.", "P1", "frontend defensivo ux", "Frontend", "S", "FE-007"),
    ("FE-009", "Cache crítico (ilhas/concelhos + offline)", "Cache para dados estáticos e página/componente offline. Documentar estratégia.", "P1", "frontend defensivo", "Frontend", "L", ""),
    ("FE-010", "Queue de leads offline (IndexedDB + envio ao reconectar)", "Guardar lead em IndexedDB se offline; enviar ao ficar online. Toast informativo.", "P1", "frontend defensivo ux", "Frontend", "L", ""),
    ("FE-011", "Página pública /credito-habitacao", "Rota que usa CreditSimulator. Metadata e i18n (PT/EN/FR).", "P0", "frontend ux", "Frontend", "S", ""),
    ("FE-012", "Página Férias – conteúdo e listagem mínima", "Conteúdo estático e listagem quando API existir. Placeholder e link para pesquisa.", "P2", "frontend ux", "Frontend", "M", ""),
    ("FE-013", "Página Obras novas – conteúdo e listagem mínima", "Idem para novas construções. Conteúdo e metadata; listagem se API existir.", "P2", "frontend ux", "Frontend", "M", ""),
    ("FE-014", "Formulário Novo imóvel por tipologia", "Campos condicionais por tipo/uso (residencial, terreno, férias, novo projeto). Alinhado à API.", "P2", "frontend ux arquitetura", "Frontend", "L", ""),
    ("FE-015", "Revisão labels e mensagens de erro (PT/EN/FR)", "Formulários e erros traduzidos nos três idiomas. Chaves i18n verificadas.", "P1", "frontend ux", "Frontend", "M", ""),
    ("FE-016", "Skip link e landmarks em novas páginas", "credito-habitacao, ferias, obras-novas com skip link e main/nav. Navegação por teclado.", "P2", "frontend ux", "Frontend", "S", ""),
    # Supervisor
    ("SV-001", "Checklist defensivo por PR (documento)", "Checklist Fases 1-3 do doc defensivo em docs/ ou .cursor/rules. Referência INSTRUÇÕES_DEFENSIVAS.", "P0", "supervisor defensivo processo", "Supervisor", "M", ""),
    ("SV-002", "Regras de escalação – documento", "Documentar quando pedir aprovação humana: DB, multi-tenant, infra, WhatsApp. Ligado ao checklist.", "P0", "supervisor defensivo processo", "Supervisor", "S", ""),
    ("SV-003", "Template de Health Dashboard", "Estrutura e fontes para dashboard: uptime, error rate, LCP/TTI, WhatsApp, leads, tenants. Referência BE-001.", "P1", "supervisor defensivo", "Supervisor", "M", "BE-001"),
    ("SV-004", "Template de relatório semanal", "Template markdown: resumo, saúde, progresso, bloqueios, riscos, escalações, prioridades. Instruções de preenchimento.", "P1", "supervisor processo", "Supervisor", "S", ""),
    ("SV-005", "Integrar checklist defensivo ao fluxo de PR", "Template de PR ou CONTRIBUTING com link ao checklist. Opcional: bot que comenta checklist.", "P2", "supervisor processo", "Supervisor", "S", "SV-001"),
    ("SV-006", "Primeira auditoria de qualidade (baseline)", "Relatório: cobertura de testes, áreas sem testes, 3-5 melhorias prioritárias. Partilhar com equipa.", "P2", "supervisor qualidade", "Supervisor", "M", ""),
    # QA
    ("QA-001", "E2E – Fluxo público: Homepage → Busca → Detalhe → Contacto", "Playwright: homepage, busca, detalhe imóvel, contacto (WhatsApp ou form). Configurável baseURL.", "P0", "qa e2e defensivo", "QA", "L", ""),
    ("QA-002", "E2E – Fluxo agente: Login → Dashboard → Imóveis → Novo imóvel", "Login, dashboard, listagem imóveis, novo imóvel. Credenciais em env/fixture. Dados isolados.", "P0", "qa e2e defensivo", "QA", "L", ""),
    ("QA-003", "E2E – Fluxo agente: Leads / Pipeline", "Após login, Leads/Pipeline. Kanban visível; opcional arrastar lead. Estável.", "P1", "qa e2e", "QA", "M", "QA-002"),
    ("QA-004", "E2E – Fluxo condomínios", "Login, Condomínios, listar e abrir condomínio (unidades/quotas). Fixtures documentadas.", "P1", "qa e2e", "QA", "M", ""),
    ("QA-005", "Teste segurança – SQL injection nos filtros de busca", "Payloads maliciosos nos params de busca. Resposta 400 ou segura; nunca 500 ou dados de outros tenants.", "P0", "qa segurança defensivo", "QA", "M", ""),
    ("QA-006", "Teste segurança – XSS em descrição de imóvel", "Descrição com script/img onerror. No detalhe público não deve executar. Documentar resultado.", "P0", "qa segurança defensivo", "QA", "S", ""),
    ("QA-007", "Teste segurança – CSRF em formulários contacto/lead", "Verificar token CSRF ou SameSite. Submissão de origem não autorizada deve falhar.", "P1", "qa segurança", "QA", "S", ""),
    ("QA-008", "Teste isolamento multi-tenant (API + UI)", "Agência B não acede a dados da agência A. API e UI. Pode complementar BE-006/BE-007.", "P0", "qa segurança defensivo", "QA", "M", ""),
    ("QA-009", "Teste resiliência – API indisponível", "API em baixo: mensagem clara e retry; sem crash. Teste manual ou automatizado.", "P1", "qa defensivo resiliência", "QA", "M", ""),
    ("QA-010", "Teste resiliência – Fallback do mapa", "Mapbox falha: fallback ativo (lista/mapa estático). Depende FE-006.", "P1", "qa defensivo resiliência", "QA", "S", "FE-006"),
    ("QA-011", "Lighthouse – Performance em 3G simulada", "LCP e TTI com throttling 3G. Alvo LCP<2.5s, TTI<4s. Relatório e recomendações.", "P1", "qa performance defensivo", "QA", "M", ""),
    ("QA-012", "Lighthouse – Acessibilidade (WCAG 2.1 AA)", "Score e issues em homepage, pesquisa, detalhe, login, dashboard. Correções prioritárias.", "P1", "qa acessibilidade ux", "QA", "M", ""),
    ("QA-013", "Integrar E2E no CI (smoke público)", "Job no CI que corre E2E (ex. Playwright) contra preview/staging. Smoke: homepage e busca. Falha = pipeline falha.", "P0", "qa ci defensivo", "QA", "L", "QA-001"),
    ("QA-014", "Smoke E2E para canal agente e admin no CI", "Jobs: E2E agente (login+dashboard), E2E admin (login+dashboard). Credenciais em secrets.", "P1", "qa ci", "QA", "M", "QA-002, QA-013"),
    # DevOps
    ("DO-001", "Script rollback.sh", "Desativar flags, reverter containers, limpar Redis, validar health. Variáveis em env. Testado em staging.", "P0", "devops defensivo rollback", "DevOps", "L", "BE-001, BE-005"),
    ("DO-002", "Runbook de rollback (documento)", "Quando fazer rollback, passos (incl. DO-001), validação, contacto. Referência protocolo crise 5min.", "P0", "devops defensivo documentação", "DevOps", "M", "DO-001"),
    ("DO-003", "Integrar health check no pipeline de deploy", "Após deploy: GET /api/health com retry. Falhar deploy se health não ok.", "P1", "devops defensivo ci", "DevOps", "M", "BE-001"),
    ("DO-004", "Alertas pós-deploy (48h) – error rate e uptime", "Alerta error rate >5%; alerta se health falhar N vezes. Documentar dashboards.", "P1", "devops defensivo monitorização", "DevOps", "L", ""),
    ("DO-005", "Alertas – LCP/TTI e WhatsApp delivery", "RUM: LCP>3s, TTI>4s. WhatsApp: taxa entrega <95%. Documentar.", "P2", "devops monitorização", "DevOps", "M", ""),
    ("DO-006", "Processo deploy staging com flag desativada", "Documentar: deploy staging → testes → aprovação → prod com flags desativadas. Um ciclo executado.", "P1", "devops defensivo processo", "DevOps", "S", ""),
    ("DO-007", "Canary deploy (5% tráfego)", "Mecanismo e procedimento para canary. Opcional/futuro.", "P2", "devops defensivo", "DevOps", "XL", ""),
    ("DO-008", "Backups de base de dados – teste de restore", "Backups configurados; teste de restore em não-prod. Documento de procedimento de restore.", "P0", "devops defensivo backup", "DevOps", "L", ""),
    ("DO-009", "Health check PostgreSQL e Redis no monitor", "Check conectividade PG e Redis; alerta se falhar. Intervalo configurado.", "P1", "devops monitorização", "DevOps", "M", ""),
    # UX/UI
    ("UX-001", "Documento de Design System (tokens únicos)", "Cores, tipografia, espaçamento, radius em doc e variáveis CSS. Referência ux-ui-designer.md e teal.", "P0", "ux design-system", "UX/UI", "L", ""),
    ("UX-002", "Revisão mobile – botões e inputs (thumb-friendly)", "Min 44px toque; espaçamento. Sem alterar API dos componentes.", "P1", "ux mobile acessibilidade", "UX/UI", "M", ""),
    ("UX-003", "Guia de estados: loading, offline, erro de API", "Doc com Loading, Offline, Error. Microcopy PT/EN/FR (Sem conexão, Guardado para enviar, Tente novamente).", "P1", "ux design-system defensivo", "UX/UI", "M", ""),
    ("UX-004", "Especificação ou wireframes – página /credito-habitacao", "Layout, título, CreditSimulator, CTA. Mobile first. Entregável para FE-011.", "P2", "ux especificação", "UX/UI", "S", ""),
    ("UX-005", "Especificação – listagem/detalhe Férias e Obras novas", "Férias: listagem e detalhe. Obras: projetos e unidades. Para FE-012, FE-013 e Backend.", "P2", "ux especificação", "UX/UI", "M", ""),
    ("UX-006", "Especificação – formulário novo imóvel por tipologia", "Fluxo e campos por tipo (residencial, terreno, férias, novo projeto). Alinhado v02 e FE-014.", "P2", "ux especificação arquitetura", "UX/UI", "M", ""),
    ("UX-007", "Checklist a11y para novos componentes", "Checklist WCAG 2.1 AA: contraste, foco, labels, landmarks. Integrado ao processo.", "P1", "ux acessibilidade", "UX/UI", "S", ""),
    ("UX-008", "Revisão contraste e foco em páginas críticas", "Elementos com contraste insuficiente e focus visible. Propostas de correção.", "P2", "ux acessibilidade", "UX/UI", "M", ""),
    # Data Scientist
    ("DS-001", "AVM atrás de feature flag (avm_beta)", "Backend e frontend só ativam AVM se flag avm_beta. Desativável no rollback. Documentado.", "P0", "data-science defensivo avm", "Data Scientist", "M", "BE-003, BE-004"),
    ("DS-002", "Pipeline de dados para AVM", "Extrair Property (e transações) para treino. Feature store ou dataset. Documentação de campos.", "P1", "data-science avm pipeline", "Data Scientist", "L", ""),
    ("DS-003", "Modelo AVM – versão inicial (hedónico + comparables)", "Modelo com validação por ilha. Output: estimativa + intervalo. Serializado e versionado.", "P1", "data-science avm modelo", "Data Scientist", "XL", ""),
    ("DS-004", "API POST /api/avm/estimate", "Input: características imóvel. Output: estimate, confidence_interval, comparables. Só se flag ativa. Rate limit.", "P1", "data-science avm api", "Data Scientist", "L", "DS-001, DS-003"),
    ("DS-005", "Frontend – uso do AVM no detalhe ou formulário novo imóvel", "Componente que chama AVM; texto Estimativa. Só visível com flag. Fallback se API falhar.", "P2", "data-science avm frontend", "Data Scientist", "M", "DS-004, FE-001"),
    ("DS-006", "Métricas de uso e qualidade do AVM", "Log de pedidos (sem dados pessoais). Se houver preços realizados: MAE/MAPE. Documentação.", "P2", "data-science avm monitorização", "Data Scientist", "M", "DS-004"),
]

def jira_priority(p):
    return PRIORITY_MAP.get(p, "Medium")

def story_points(est):
    return STORY_POINTS_MAP.get(est, 2)

def row(key, summary, desc, priority, labels, component, estimate, depends_on):
    summary_full = f"[{key}] {summary}"
    description = desc + DOCS_REF
    return {
        "Summary": summary_full,
        "Description": description,
        "Issue Type": "Task",
        "Priority": jira_priority(priority),
        "Labels": labels.replace(" ", " "),  # Jira usa espaços entre múltiplos labels em import
        "Component": component,
        "Story Points": story_points(estimate),
        "Depends On": depends_on,
        "Custom Field (Key)": key,
    }

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    rows = []
    for t in TICKETS:
        key, summary, desc, priority, labels, component, estimate, depends_on = t
        rows.append(row(key, summary, desc, priority, labels, component, estimate, depends_on))

    # CSV
    csv_path = os.path.join(script_dir, "jira-import.csv")
    fieldnames = ["Summary", "Description", "Issue Type", "Priority", "Labels", "Component", "Story Points", "Depends On"]
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for r in rows:
            writer.writerow(r)
    print(f"Written {csv_path}")

    # JSON (para Jira API ou ferramentas)
    json_path = os.path.join(script_dir, "jira-import.json")
    out = []
    for r in rows:
        out.append({
            "summary": r["Summary"],
            "description": r["Description"],
            "issueType": {"name": r["Issue Type"]},
            "priority": {"name": r["Priority"]},
            "labels": r["Labels"].split(),
            "components": [{"name": r["Component"]}] if r["Component"] else [],
            "storyPoints": r["Story Points"],
            "depends_on": [x.strip() for x in r["Depends On"].split(",") if x.strip()] if r["Depends On"] else [],
        })
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"Written {json_path}")

if __name__ == "__main__":
    main()
