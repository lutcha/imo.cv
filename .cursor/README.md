# Cursor subagentes – imo.cv

Subagentes especializados e skills para o projeto imo.cv (plataforma imobiliária Cabo Verde).

## Estrutura

```
.cursor/
├── agents/           # 7 agentes especializados
│   ├── ux-ui-designer.md
│   ├── frontend-engineer.md
│   ├── backend-engineer.md
│   ├── devops-engineer.md
│   ├── data-scientist.md
│   ├── supervisor.md
│   └── qa-tester.md
├── skills/           # 6 skills (design-system, django-multi-tenant, etc.)
└── commands.json     # Comandos rápidos por agente
```

## Como usar no Cursor

1. **Contexto**: Em Settings (Ctrl+,) → Context/Knowledge, inclua a pasta `.cursor/` (ou marque "Always include" para este projeto).
2. **Invocar um agente**: No chat, use `@` e o nome do ficheiro do agente (ex.: `@ux-ui-designer` ou referir o ficheiro em `.cursor/agents/ux-ui-designer.md`).
3. **Exemplos de prompts**:
   - `@ux-ui-designer` – Crie um componente PropertyCard seguindo o design system
   - `@frontend-engineer` – Implemente o MapboxMap com clustering
   - `@backend-engineer` – Crie o endpoint de busca geoespacial com PostGIS
   - `@devops-engineer` – Configure o docker-compose para desenvolvimento
   - `@data-scientist` – Implemente o modelo híbrido AVM
   - `@supervisor` – Revise este código e identifique possíveis problemas
   - `@qa-tester` – Crie testes para o endpoint de propriedades

## Comandos rápidos (commands.json)

Os comandos em `commands.json` mapeiam atalhos para prompts por agente (ex.: create-property-model → backend-engineer, create-property-card → frontend-engineer). Use-os conforme a configuração do Cursor para comandos personalizados.

## Skills

As skills em `.cursor/skills/` resumem domínios específicos (design system, multi-tenant, Next.js, AVM, PostGIS, WhatsApp) e referenciam os agentes para detalhes. São úteis quando o Cursor precisa de contexto rápido sobre um desses temas.
