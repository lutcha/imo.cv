# Frontend Agent Roadmap: Next-Level Optimizations

High-priority tasks to evolve the imo.cv frontend for the Cabo Verde market (4G/3G focus).  
**Antes de alterar:** ver secção «Já implementado» para não duplicar ou quebrar o que já funciona.

---

## Já implementado (não remover / não duplicar)

Auditado em 2025-02; manter este estado ao implementar novas tarefas.

| Área | O que existe | Ficheiros / notas |
|------|----------------|-------------------|
| **Next config** | `experimental.serverActions` (bodySizeLimit 2mb), `optimizeCss`, `optimizeFonts`, image formats (avif/webp), `remotePatterns` para CDN | `web/next.config.js` |
| **Imagens** | Property detail: `priority` na imagem principal, `sizes` e `quality={75}` | `web/app/(public)/property/[id]/page.tsx` |
| **Suspense** | Home: `PropertyList` dentro de `<Suspense>` com 3× `SkeletonCard`. Search: vários `<Suspense>` (lista, mapa, resultados). PropertyList interno também usa Suspense | `(public)/page.tsx`, `(public)/search/page.tsx`, `PropertyList.tsx`, `(agency)/[subdomain]/page.tsx` |
| **Layout público** | Layout estático: Header + main + Footer, sem data fetching | `web/app/(public)/layout.tsx` |
| **Tema** | Paleta teal em CSS vars: `--imo-primary`, `--imo-secondary`, `--imo-accent`, `--imo-surface`, `--imo-dark` | `web/app/globals.css` |
| **Header** | Sticky, `bg-white/95 backdrop-blur` (glass), `dark:bg-gray-900/95`; SearchBar inline (desktop); locale switcher (PT/EN/FR) | `web/components/common/Header.tsx` |
| **PropertyCard** | `transition`, `hover:shadow-md`, imagem com `group-hover:scale-105`, ações com `opacity-0 group-hover:opacity-100`; `loading="lazy"`, `decoding="async"` | `web/components/common/PropertyCard.tsx` |
| **Animações** | `animations.css`: `fadeInUp` com `transform` + `opacity`; delays 100/200/300ms | `web/styles/animations.css` |
| **i18n** | Cliente: `LocaleProvider` + `useLocale()` / `t()` em PT/EN/FR. Servidor: `lib/i18n/server.ts` com `getTranslation(key, locale)` e `t` | `LocaleContext.tsx`, `server.ts`, `translations/*.json` |
| **Metadata** | Root: `metadata` (title, description). Contact e About: `export const metadata` estático | `layout.tsx`, `(public)/contact/page.tsx`, `(public)/about/page.tsx` |
| **CreditSimulator** | Componente completo + envio para API leads (source: CreditSimulator), overlay com nome/WhatsApp e feedback sucesso/erro | `web/components/finance/CreditSimulator.tsx` |
| **SearchBar / SearchFilters** | Cliente: `useRouter`, `useSearchParams`, `SearchBar` com filtros (ilha, tipo, preço, área, quartos), i18n via `useTranslation`; `SearchFilters` usa `SearchBar variant="sidebar"` e atualiza URL | `SearchBar.tsx`, `SearchFilters.tsx` |
| **A11y** | Skip link «Saltar para o conteúdo» no root layout; `main` com `id="main"` e `tabIndex={-1}` em public/agent/agency | `layout.tsx`, layouts |

**Princípio defensivo:** ao adicionar PPR, Server Actions, PWA ou refactors, manter compatibilidade com o que está acima (ex.: não remover Suspense existente; se migrar pesquisa para Server Actions, manter fallback client).

---

## 1. Architecture: Performance & Streaming

### 1.1 Partial Prerendering (PPR)

- [x] **Enable PPR**  
  `experimental.ppr: true` em `web/next.config.js`. Bundle analyzer: `@next/bundle-analyzer`, script `build:analyze`.
- [x] **Static public layout**  
  Já é estático (sem fetch no layout).
- [x] **Suspense boundaries**  
  Já existem em home (`PropertyList`), search (lista, mapa, resultados) e `PropertyList` interno. Opcional: acrescentar skeletons noutras rotas que carreguem dados.

**Referências:** `web/next.config.js`, `web/app/(public)/layout.tsx`, `web/app/(public)/page.tsx`, `web/app/(public)/search/page.tsx`

### 1.2 Migrate to Server Actions

- [ ] **SearchBar & SearchFilters**  
  Opcional: Server Actions para primeira pesquisa (preservar comportamento atual com URL e client como fallback).
- [x] **Lead Capture / Contact**  
  Server Action `submitContactAction` em `app/actions/contact.ts`; página Contact com `ContactForm` (nome, email, telefone, mensagem) que submete via action.
- [ ] **Form UX**  
  Usar `useFormStatus` / `useActionState` (React 19) em formulários novos ou refatorados.

**Referências:** `SearchBar.tsx`, `SearchFilters.tsx`, `(public)/contact/page.tsx`, fluxos de lead

### 1.3 Optimize Bundle Size

- [x] **Audit**  
  `npm run build:analyze` (ANALYZE=true) com `@next/bundle-analyzer`.
- [ ] **framer-motion**  
  Usado em `PipelineKanban` e `KpiCard` (área agente). Avaliar substituição por CSS apenas onde for animação simples; não quebrar drag-and-drop do Kanban.
- [ ] **Code-split**  
  Lazy-load de mapas, gráficos ou rotas pesadas, se aplicável.

**Referências:** `web/package.json`, `PipelineKanban.tsx`, `KpiCard.tsx`, `web/styles/animations.css`

---

## 2. UI/UX: The "WOW" Aesthetics

### 2.1 Design System Consolidation

- [x] **Theme**  
  Tema base com imo-primary teal já em `globals.css`. Opcional: documentar e alargar tokens (ex. spacing) num único sítio.
- [x] **Glassmorphism no header**  
  Já: `backdrop-blur`, `bg-white/95`, `dark:bg-gray-900/95`.
- [ ] **Thumb-friendly mobile**  
  Revisar `Button`, `Input`, `Card` para alvos de toque e espaçamento em mobile (sem alterar API dos componentes).

**Referências:** `web/app/globals.css`, `web/components/common/Header.tsx`, `web/components/ui/Button/Button.tsx`, `web/components/ui/Input/Input.tsx`

### 2.2 Micro-animations & Transitions

- [x] **PropertyCard**  
  Já tem hover (sombra, scale na imagem, opacidade nas ações). Opcional: polir duração/curve sem mudar estrutura.
- [x] **Navigation progress bar**  
  `NavigationProgress` no root layout: barra fina no topo ao mudar de rota (pathname), animação leve.
- [x] **animations.css**  
  Já usa só `transform` e `opacity` (fadeInUp). Manter este critério em animações novas.

**Referências:** `web/components/common/PropertyCard.tsx`, `web/styles/animations.css`

---

## 3. Connectivity & Resilience (4G/3G Focus)

### 3.1 PWA & Edge Caching

- [x] **Manifest**  
  `public/manifest.json` (name, short_name, theme_color, start_url); `metadata.manifest` no layout.
- [ ] **Service Worker**  
  Estratégia de cache para property card images e CSS/JS chunks (ex. next-pwa).
- [x] **Offline toast**  
  `OfflineToast`: toast fixo quando `navigator.onLine === false`.

### 3.2 Image Priority & LCP

- [x] **Property detail**  
  Imagem principal já tem `priority`, `sizes`, `quality`.
- [x] **LCP**  
  `PropertyCard` com prop `priority`; primeiro card em `PropertyList` usa `priority={true}` (loading="eager", fetchPriority="high").
- [ ] **Blur-up**  
  Placeholders blur (base64 ou blurhash) para imagens principais, se o backend fornecer ou for viável.

**Referências:** `web/app/(public)/property/[id]/page.tsx`, home hero, `next.config.js` images

---

## 4. SEO & Global Readiness

### 4.1 Dynamic Metadata API

- [x] **generateMetadata**  
  `property/[id]/page.tsx`: `generateMetadata({ params })` devolve title, description e openGraph (com imagem do imóvel quando existir).
- [ ] **OG images**  
  Geração dinâmica de imagens OG (ex. `@vercel/og` ou imagem do imóvel).

### 4.2 Server-side i18n

- [x] **Cookie locale**  
  `LocaleContext`: ao mudar idioma grava cookie `imocv-locale`; leitura inicial também a partir do cookie. `lib/i18n/constants.ts` com `LOCALE_COOKIE_NAME`; `server.ts` com `getLocaleFromCookies()` para RSC.
- [ ] **RSC (public)**  
  Usar `getLocaleFromCookies()` + `getTranslation(key, locale)` em RSC que precisem de t() (ex. metadata dinâmica por locale).

**Referências:** `web/lib/i18n/server.ts`, `web/lib/i18n/LocaleContext.tsx`, `web/lib/i18n/translations/`

---

## 5. Quality Assurance

### 5.1 Automated Testing

- [x] **Playwright**  
  `playwright.config.ts`, `e2e/search.spec.ts`: homepage, search page, e teste com Slow 4G (CDP Network.emulateNetworkConditions em Chromium). Script `test:e2e`.
- [x] **A11y**  
  SearchBar: `role="search"`, `aria-label` no form; botões Comprar/Arrendar com `aria-pressed`; sliders de preço com `aria-label`; botão de submit acessível. SearchFilters: `<section aria-label="Filtros de pesquisa">`.

**Referências:** `SearchBar.tsx`, `SearchFilters.tsx`

---

## 6. Finance & Conversion Tools

### 6.1 Bank Credit Simulator

- [x] **Calculator**  
  Já: fórmula de prestação, taxa padrão 8.5%, CVE.
- [x] **Sliders**  
  Já: preço do imóvel, entrada, prazo (select), taxa de juro; feedback em tempo real.
- [x] **CRM integration**  
  Formulário do overlay envia para `leadsApi.create` (full_name, phone, source: CreditSimulator, notes com resumo da simulação). UI mantida; estados loading/success/error.

**Referências:** `web/components/finance/CreditSimulator.tsx`, API de leads (`web/lib/api/leads.ts`)

---

## Current State (Quick Reference)

| Area              | Status |
|-------------------|--------|
| Next config       | PPR ativo; bundle-analyzer (build:analyze); serverActions, images |
| Theme             | `--imo-primary` teal em `globals.css` |
| Suspense          | Home, search, PropertyList, agency subdomain |
| Header            | Sticky, glass, SearchBar inline, locale switcher |
| PropertyCard      | Hover, lazy; primeiro card com priority (LCP) |
| Animations        | `animations.css`; NavigationProgress no layout |
| i18n              | LocaleContext + cookie; server getLocaleFromCookies + getTranslation |
| Metadata          | property/[id] generateMetadata + OG; manifest no layout |
| PWA / Offline     | manifest.json; OfflineToast |
| Contact           | ContactForm + submitContactAction (Server Action) |
| CreditSimulator   | Envio para leads API (source CreditSimulator) |
| Playwright        | e2e/search.spec.ts (incl. Slow 4G); test:e2e |
| A11y              | SearchBar/SearchFilters: role search, aria-labels, aria-pressed |
| Agent area        | Dashboard KPIs, pipeline leads, lead [id] com interações, i18n |

---

*Documento de referência para o roadmap frontend. Ao implementar, preservar o que está na secção «Já implementado» e marcar as tarefas concluídas.*
