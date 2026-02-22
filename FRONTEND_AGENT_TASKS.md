# Frontend Agent Roadmap: Next-Level Optimizations

This file aligns with `.cursor/agents/frontend-engineer.md` and the **Performance & Checklist** sections. Implement changes defensively (no breaking changes, preserve existing behaviour).

---

## ✅ Completed (this pass)

### Performance (3G-friendly)
- **Error boundaries**: Root `app/error.tsx`, `app/global-error.tsx`, `app/(public)/error.tsx`, `app/(agent)/error.tsx` with reset + link back.
- **React Query**: `staleTime: 5 * 60 * 1000`, `retry: 2` in `QueryProvider`.
- **Loading skeletons**: `app/(agent)/loading.tsx` for agent segment; existing `search/loading.tsx`, `property/[id]/loading.tsx`, and Suspense on home kept.
- **Code splitting**: Map already uses `dynamic(..., { ssr: false, loading: SkeletonMap })` in `MapboxMap.tsx`.
- **Debounced search**: `SearchBar` already uses `useDebounce` from `@/lib/hooks/useDebounce`.

### Image & lazy loading
- **PropertyCard**: `loading="lazy"` and `decoding="async"` on card images.
- **Property detail**: Next `Image` already uses `priority`, `sizes`, `quality={75}`.

### Accessibility
- **Skip link**: “Saltar para o conteúdo” in root layout, targets `#main`.
- **Main landmark**: `id="main"` and `tabIndex={-1}` on `<main>` in public, agent, and agency layouts.
- **Header**: Aria labels on locale buttons (`aria-label`, `aria-pressed`), dark toggle and menu already had labels.

---

## 📋 Checklist (from frontend-engineer.md) – status

| Item | Status |
|------|--------|
| TypeScript strict | ✅ `tsconfig` has `strict: true` |
| Tailwind + custom colors | ✅ In use |
| React Query | ✅ Configured with 5min staleTime, retry 2 |
| Error boundaries | ✅ Segment + global |
| Loading skeletons for async content | ✅ Public + agent segments |
| Dark mode | ✅ `uiStore` + `ThemeInit` |
| i18n PT/EN/FR | ✅ LocaleContext + translations |
| Code splitting for heavy components | ✅ Map dynamic |
| Image optimization / lazy loading | ✅ PropertyCard lazy; detail page priority/sizes |
| Mobile responsive | ✅ Existing breakpoints |
| Accessibility (aria, skip link) | ✅ Skip link, main id, header aria |

---

## 🔜 Suggested next steps (defensive)

1. **Forms**: Add Zod validation to critical forms (e.g. register property) where not yet present.
2. **Bundle**: Run `npm run build` and check bundle size vs target (&lt; 500KB total if required).
3. **Lighthouse**: Run Performance / Accessibility audits and fix any regressions.

---

## Reference

- Full agent spec: `.cursor/agents/frontend-engineer.md`
- Performance targets (from spec): LCP &lt; 2.5s, TTI &lt; 3.5s on 3G, CLS &lt; 0.1, bundle &lt; 500KB.
