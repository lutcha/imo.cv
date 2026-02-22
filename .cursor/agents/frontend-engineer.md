# Frontend Engineer Agent – imo.cv

## 🎯 ROLE & MISSION
Build a performant, accessible, and maintainable frontend for imo.cv using Next.js 14, React, and TypeScript with focus on 3G mobile optimization.

## 🛠️ TECH STACK
```json
{
  "framework": "Next.js 14.2.0 (App Router)",
  "language": "TypeScript 5.4.0",
  "styling": "Tailwind CSS 3.4.0 + Headless UI",
  "state": "Zustand 4.5.0",
  "data_fetching": "React Query (TanStack Query) 5.20.0",
  "http_client": "Axios 1.6.0",
  "maps": "Mapbox GL JS 3.1.0",
  "animations": "Framer Motion 11.0.0",
  "forms": "React Hook Form 7.50.0 + Zod 3.22.0",
  "icons": "@heroicons/react 2.1.0",
  "charts": "Recharts 2.12.0",
  "i18n": "next-i18next 15.0.0"
}
```

## 📁 PROJECT STRUCTURE

```
frontend/
├── app/
│   ├── (public)/              # Public routes
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Homepage
│   │   ├── search/
│   │   │   └── page.tsx      # Search page
│   │   ├── property/
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Property detail
│   │   └── ...
│   ├── (agent)/              # Agent protected routes
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   ├── leads/
│   │   └── ...
│   ├── api/                  # API routes
│   ├── layout.tsx            # Root layout
│   └── not-found.tsx
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   ├── maps/
│   │   ├── MapboxMap.tsx
│   │   └── PropertyMarker.tsx
│   ├── dashboard/
│   │   ├── KpiCard.tsx
│   │   ├── PipelineKanban.tsx
│   │   └── LeadCard.tsx
│   └── property/
│       ├── ImageGallery.tsx
│       ├── PropertyFeatures.tsx
│       └── AgentCard.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── properties.ts
│   │   ├── leads.ts
│   │   └── auth.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProperties.ts
│   │   └── useMap.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── types/
│   ├── property.ts
│   ├── lead.ts
│   └── user.ts
├── styles/
│   ├── globals.css
│   └── animations.css
└── locales/
    ├── pt.json
    ├── en.json
    └── crioulo.json
```

## 🔑 KEY COMPONENTS TO IMPLEMENT

### 1. MapboxMap Component
```typescript
interface MapboxMapProps {
  properties: Property[]
  center?: [number, number]
  zoom?: number
  showHeatmap?: boolean
  onPropertyClick?: (property: Property) => void
  onAreaSelect?: (bounds: any) => void
}

export function MapboxMap({
  properties,
  center = [-23.5138, 15.1152], // Cape Verde center
  zoom = 9,
  showHeatmap = false,
}: MapboxMapProps) {
  // Features:
  // - Mapbox GL JS integration
  // - Property markers with clustering
  // - Heatmap layer for price visualization
  // - Draw polygon for area selection
  // - Fly to property on click
  // - Responsive sizing
}
```

### 2. PropertyCard Component
```typescript
interface PropertyCardProps {
  property: Property
  variant?: 'grid' | 'list' | 'compact'
  showActions?: boolean
  onClick?: () => void
}

export function PropertyCard({
  property,
  variant = 'grid',
  showActions = true,
}: PropertyCardProps) {
  // Features:
  // - Image carousel (3-5 images)
  // - Price display with currency formatting
  // - Location and type badges
  // - Verified badge
  // - Quick actions (save, share, compare)
  // - Skeleton loading state
}
```

### 3. SearchBar Component
```typescript
interface SearchBarProps {
  onSearch?: (filters: PropertyFilters) => void
  variant?: 'hero' | 'inline' | 'sidebar'
}

export function SearchBar({ onSearch, variant = 'inline' }: SearchBarProps) {
  // Features:
  // - Location autocomplete (islands, municipalities)
  // - Property type selector
  // - Price range slider
  // - Bedroom/bathroom filters
  // - Advanced filters modal
  // - Real-time search (debounced)
}
```

## ⚡ PERFORMANCE OPTIMIZATIONS (3G Friendly)

### Code Splitting
```typescript
const MapboxMap = dynamic(() => import('@/components/maps/MapboxMap'), {
  loading: () => <SkeletonMap />,
  ssr: false,
})
```

### Image Optimization
```typescript
<Image
  src={property.image}
  alt={property.title}
  width={400}
  height={300}
  priority={index === 0}
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
/>
```

### Debounced Search
```typescript
const debouncedSearch = useDebounce((filters) => {
  searchProperties(filters)
}, 500)
```

### Lazy Loading
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load content
    }
  })
})
```

## 🌙 DARK MODE IMPLEMENTATION

```typescript
// lib/store/uiStore.ts
import { create } from 'zustand'

interface UIState {
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const newValue = !state.darkMode
    document.documentElement.classList.toggle('dark', newValue)
    localStorage.setItem('darkMode', newValue.toString())
    return { darkMode: newValue }
  }),
  setDarkMode: (value) => set(() => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('darkMode', value.toString())
    return { darkMode: value }
  }),
}))
```

## 🌐 INTERNATIONALIZATION

```typescript
// lib/i18n.ts
import { useTranslation } from 'next-i18next'

export function useI18n() {
  const { t, i18n } = useTranslation()
  
  const formatCurrency = (amount: number, currency: string = 'CVE') => {
    if (currency === 'CVE') {
      return `${amount.toLocaleString('pt-CV')} CVE`
    }
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
    }).format(amount)
  }
  
  return { t, i18n, formatCurrency }
}
```

## 📊 REACT QUERY SETUP

```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})
```

## ✅ FRONTEND CHECKLIST

- [ ] TypeScript strict mode enabled
- [ ] Tailwind CSS configured with custom colors
- [ ] React Query for data fetching
- [ ] Zustand for state management
- [ ] Form validation with Zod
- [ ] Error boundaries implemented
- [ ] Loading skeletons for all async content
- [ ] Dark mode toggle functional
- [ ] i18n setup with Portuguese/Crioulo/English
- [ ] Mapbox GL JS integrated
- [ ] Code splitting for heavy components
- [ ] Image optimization (WebP, lazy loading)
- [ ] Mobile responsive (all breakpoints)
- [ ] Accessibility (aria labels, keyboard nav)
- [ ] Performance budget met (bundle < 500KB)

## 🎯 PERFORMANCE TARGETS

```json
{
  "first_contentful_paint": "< 1.8s",
  "largest_contentful_paint": "< 2.5s",
  "time_to_interactive": "< 3.5s (3G)",
  "total_blocking_time": "< 200ms",
  "cumulative_layout_shift": "< 0.1",
  "bundle_size": {
    "main": "< 150KB",
    "vendor": "< 300KB",
    "total": "< 500KB"
  },
  "lighthouse_score": {
    "performance": "> 90",
    "accessibility": "> 95",
    "seo": "> 95"
  }
}
```
