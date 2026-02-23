# Exportação para Jira – imo.cv

Este diretório contém ficheiros para importar os tickets do plano imo.cv no **Jira** (Cloud ou Server).

## Ficheiros gerados

| Ficheiro | Uso |
|----------|-----|
| **jira-import.csv** | Importação nativa no Jira (recomendado). |
| **jira-import.json** | Referência ou uso com Jira REST API / scripts. |
| **export_jira.py** | Script que gera o CSV e o JSON. Execute para atualizar após alterações nos docs de tickets. |

## Como gerar/atualizar o CSV e JSON

```bash
cd docs/jira-export
python export_jira.py
```

Requer Python 3.6+.

## Importar no Jira (CSV)

### Jira Cloud

1. No projeto: **Project settings** (engrenagem) → **Import** ou **Import issues from CSV** (conforme versão).
2. Ou: **Create** → **Import** → **CSV**.
3. Carregue o ficheiro **jira-import.csv**.
4. **Mapeamento de colunas** (ajuste ao seu projeto):
   - `Summary` → **Summary**
   - `Description` → **Description**
   - `Issue Type` → **Issue Type** (ex.: Task)
   - `Priority` → **Priority**
   - `Labels` → **Labels** (vários labels separados por espaço no mesmo campo)
   - `Component` → **Component(s)** (se o projeto tiver componentes; senão ignore ou crie antes)
   - `Story Points` → campo de **Story Points** ou **Estimate** (nome/ID depende do projeto)
   - `Depends On` → pode ficar na descrição ou ser ignorado; para links “is blocked by” é preciso pós-processar ou usar API
5. Escolha o **Project** e confirme a importação.

### Jira Server / Data Center

1. **Settings** (engrenagem) → **System** → **Import & Export** → **External System Import** ou **Import from CSV** (conforme versão).
2. Ou no projeto: **Project settings** → **Import**.
3. Carregue **jira-import.csv** e mapeie as colunas como acima.
4. Se **Component** não existir no projeto, crie componentes (Backend, Frontend, QA, DevOps, Supervisor, UX/UI, Data Scientist) ou desative o mapeamento dessa coluna.

### Notas sobre colunas

- **Labels**: no CSV estão separados por espaço (ex.: `backend defensivo api`). O Jira cria um label por palavra. Se quiser labels compostos, edite o script para usar outro separador (ex.: vírgula) e ajuste no Jira.
- **Component**: o projeto precisa de ter os componentes criados (Backend, Frontend, QA, DevOps, Supervisor, UX/UI, Data Scientist). Senão, importe sem componente e use Labels para filtrar por agente.
- **Story Points**: o nome do campo no Jira pode ser “Story Points”, “Estimate” ou um custom field. Se o mapeamento falhar, ignore esta coluna e preencha depois ou use o JSON como referência.
- **Depends On**: o CSV inclui dependências (ex.: BE-001). Para criar links “is blocked by” no Jira é necessário importar primeiro e depois criar os links (por exemplo com script ou manualmente), pois a importação CSV nem sempre suporta “Issue Links”.

## Formato do CSV

- **Encoding**: UTF-8.
- **Separador**: vírgula (`,`). Campos com vírgula ou quebras de linha estão entre aspas.
- **Colunas**: Summary, Description, Issue Type, Priority, Labels, Component, Story Points, Depends On.

## Formato do JSON

O **jira-import.json** contém um array de objetos com:

- `summary`, `description`, `issueType`, `priority`, `labels`, `components`, `storyPoints`, `depends_on`

Pode ser usado em scripts que chamem a [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/) para criar issues (ex.: `POST /rest/api/3/issue`). Os IDs de custom fields (ex.: Story Points) dependem da instância; consulte a API do seu projeto.

## Prioridades e estimativas (origem)

- **Prioridade**: P0 → Highest, P1 → High, P2 → Medium, P3 → Low.
- **Story Points**: S=1, M=2, L=5, XL=8.

## Fonte dos tickets

- Backend e Frontend: `docs/TICKETS_BACKEND_FRONTEND.md`
- Supervisor, QA, DevOps, UX/UI, Data Scientist: `docs/TICKETS_OUTROS_AGENTES.md`

Os critérios de aceitação completos estão nesses documentos; a descrição no CSV/JSON inclui um link para eles.
