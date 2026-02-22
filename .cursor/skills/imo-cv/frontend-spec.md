# Frontend Specification - imo.cv

## Project Structure

```
app/
├── (public)/              # Public routes
│   ├── layout.tsx
│   ├── page.tsx           # Homepage
│   ├── search/page.tsx
│   ├── property/[id]/page.tsx
│   └── ...
├── (agent)/               # Agent protected routes
│   ├── layout.tsx
│   ├── dashboard/
│   ├── properties/
│   ├── leads/
│   └── ...
├── api/
├── layout.tsx
└── not-found.tsx
```

## Key Components

- **Header**: variant `public` | `agent`, optional transparent; logo, nav, search bar, auth, language switcher, mobile menu.
- **SearchBar**: `hero` | `inline` | `sidebar`; location autocomplete (ilhas, concelhos), type, price range, bedrooms/bathrooms, advanced modal; debounced.
- **MapboxMap**: properties, center, zoom, heatmap; markers + clustering, polygon draw, fly-to on click; load with `dynamic(..., { ssr: false })` and skeleton.
- **PropertyCard**: grid | list | compact; image carousel, price (formatted), location/type badges, verified badge, save/share/compare; skeleton state.

## Performance (3G Friendly)

- Main bundle < 150KB, vendor < 300KB, total < 500KB.
- Targets: FCP < 1.8s, LCP < 2.5s, TTI < 3.5s (3G), TBT < 200ms, CLS < 0.1.
- Use: code splitting, `next/image` with placeholder/blur, IntersectionObserver lazy load, debounced search (e.g. 500ms), React Query with staleTime (e.g. 5 min).

## Dark Mode

- Store: Zustand (e.g. `useUIStore`: darkMode, toggleDarkMode, setDarkMode). On change: toggle `dark` on document.documentElement, save to localStorage.

## i18n

- next-i18next: defaultLocale `pt`, locales `pt`, `en`, `fr`, `crioulo`; localePath `locales`. Use `useTranslation('namespace')` and `t('key')` in components.
