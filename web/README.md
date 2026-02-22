# imo.cv – Frontend

Frontend Next.js 14 (App Router) do marketplace e área agente, alinhado com o prompt estruturado imo.cv.

## Stack

- Next.js 14.2, TypeScript, Tailwind CSS, Zustand, TanStack Query, Axios
- Framer Motion, React Hook Form + Zod, Headless UI, Heroicons, Recharts, date-fns
- Mapas: Leaflet (MapView); opcional Mapbox GL com `NEXT_PUBLIC_MAPBOX_TOKEN`

## Pré-requisitos

- Node.js 18+
- Backend Django com API REST em `/api/v1/` (ex.: `http://localhost:8000`)

## Instalação

```bash
cd web
npm install
cp .env.example .env.local
# Editar .env.local: NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Desenvolvimento

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Chamadas a `/api/backend/*` são reescritas para `NEXT_PUBLIC_API_URL` (ex.: `/api/backend/v1/properties/` → `{API_URL}/api/v1/properties/`).

## Build e produção

```bash
npm run build
npm start
```

## Estrutura principal

- `app/(public)/` – Layout público: `/`, `/search`, `/property/[id]`
- `app/(agent)/agente/` – Área agente: `/agente`, `/agente/login`, `/agente/imoveis`, `/agente/leads`, `/agente/configuracoes`
- `components/common/` – Header, Footer, SearchBar, PropertyCard, Modal, Skeleton
- `components/dashboard/` – KpiCard, PipelineKanban
- `components/maps/` – MapboxMap (usa Leaflet por defeito)
- `lib/api/` – client, auth, properties, leads, analytics
- `lib/store/` – authStore, uiStore (dark mode)
- `lib/hooks/` – useProperties, useLeads, useDebounce
- `types/` – property, lead, user, api

## Rotas

- **Público:** `/`, `/search`, `/property/[id]` (redirects: `/pesquisa` → `/search`, `/imovel/[id]` → `/property/[id]`)
- **Agente:** `/agente`, `/agente/login`, `/agente/imoveis`, `/agente/leads`, `/agente/configuracoes`

## Design system

Cores e animações em `tailwind.config.ts` (primary blue/green/gold, success/warning/danger, keyframes). Dark mode via `lib/store/uiStore` e classe `dark` no `<html>`.

Documentação geral: `docs/frontend_devops.md` e `docs/infra_seguranca.md`.
