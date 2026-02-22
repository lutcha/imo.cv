---
name: nextjs-architecture
description: Defines imo.cv frontend structure: Next.js 14 App Router, route groups (public/agent), components, lib, and 3G performance. Use when adding pages, components, or optimizing frontend for imo.cv.
---

# Next.js Architecture – imo.cv

Reference: [Frontend Engineer Agent](../agents/frontend-engineer.md) for full structure and stack.

## When to Use

- Adding or refactoring routes, layouts, or components.
- Implementing data fetching (React Query), state (Zustand), or forms (RHF + Zod).
- Optimizing for 3G (code splitting, lazy loading, images).

## Structure

- **app/(public)/**: Homepage, search, property/[id], etc.
- **app/(agent)/**: Dashboard, properties, leads (protected).
- **components/**: common, maps, dashboard, property.
- **lib/**: api, hooks, store, utils.
- **types/**, **styles/**, **locales/**.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind, Zustand, React Query, Mapbox GL JS, RHF + Zod, next-i18next.

## Performance Targets

- LCP < 2.5s, TTI < 3.5s (3G).
- Bundle: main < 150KB, total < 500KB.
- Use `dynamic()` for Mapbox and other heavy components; skeletons for loading.
