# 🚀 NEXT.JS 20 OPTIMIZATIONS – UPDATE ESSENCIAL

## 📱 ESTRUTURA ATUALIZADA (App Router v20 + Advanced Features)

```bash
frontend/
├── app/
│   ├── (public)/               # Rotas públicas
│   │   ├── layout.tsx          # Root layout com Server Components
│   │   ├── page.tsx            # Homepage com Suspense
│   │   ├── search/
│   │   │   └── page.tsx        # Search com Streaming
│   │   ├── property/
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # Property detail (RSC)
│   │   │       ├── loading.tsx # Skeleton nativo
│   │   │       └── error.tsx   # Error boundary
│   ├── (agency)/               # Rotas com subdomínio
│   │   └── [subdomain]/
│   │       ├── layout.tsx      # Layout com verificação de tenant
│   │       └── page.tsx        # Página da agência
│   ├── (dashboard)/            # Área protegida
│   │   └── dashboard/
│   │       ├── layout.tsx      # Layout com autenticação
│   │       └── page.tsx        # Dashboard
│   ├── api/                    # Route Handlers (Next.js 20)
│   ├── layout.tsx              # Root layout global
│   ├── not-found.tsx           # 404 customizado
│   ├── error.tsx               # Error boundary global
│   └── middleware.ts           # Middleware para subdomínios ✨ NOVO
├── components/
│   ├── ui/                     # Shadcn/ui ou componentes otimizados
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── skeleton.tsx
│   ├── maps/
│   │   └── MapboxMap.client.tsx # Client Component com dynamic
│   └── ...
├── lib/
│   ├── api/                    # API client atualizado
│   ├── hooks/                  # React Query v5 hooks
│   └── utils/
│       └── geolocation.ts      # Geolocation otimizada para mobile
├── public/
│   ├── fonts/                  # Fontes otimizadas com next/font
│   └── placeholder.jpg         # Placeholder para blur
├── next.config.mjs             # Configuração moderna ✨
├── tailwind.config.ts
├── turbopack.config.ts         # Configuração Turbopack ✨ NOVO
└── Dockerfile                  # Otimizado para Next.js 20
```

---

## ⚡ NOVAS FEATURES DO NEXT.JS 20 PARA IMO.CV

### 1. **Server Components + Streaming** (Essencial para Performance)
```typescript
// app/search/page.tsx
import PropertyList from '@/components/properties/PropertyList'
import SearchFilters from '@/components/properties/SearchFilters'
import { Suspense } from 'react'

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Server Component - renderiza no servidor
  const island = searchParams.island as string
  const minPrice = searchParams.min_price as string
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados de Busca</h1>
      
      {/* Filters - Client Component */}
      <Suspense fallback={<div>Carregando filtros...</div>}>
        <SearchFilters island={island} minPrice={minPrice} />
      </Suspense>
      
      {/* Results - Server Component com Streaming */}
      <Suspense fallback={<div>Carregando propriedades...</div>}>
        <PropertyList 
          island={island} 
          minPrice={minPrice}
          initialPage={1}
        />
      </Suspense>
    </div>
  )
}

// components/properties/PropertyList.tsx
import { Suspense } from 'react'
import PropertyCard from './PropertyCard'
import { fetchProperties } from '@/lib/api/properties'

// Server Component
export default async function PropertyList({
  island,
  minPrice,
  initialPage = 1,
}: {
  island?: string
  minPrice?: string
  initialPage?: number
}) {
  // Busca assíncrona no servidor
  const properties = await fetchProperties({
    island,
    min_price: minPrice,
    page: initialPage,
  })
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Suspense 
          key={property.id} 
          fallback={<div className="h-64 bg-gray-200 rounded-lg" />}
        >
          <PropertyCard property={property} />
        </Suspense>
      ))}
    </div>
  )
}
```

### 2. **Route Handlers Avançados** (Next.js 20)
```typescript
// app/api/properties/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { fetchPropertiesFromDB } from '@/lib/db/properties'

// GET com Server Actions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const filters = {
    island: searchParams.get('island'),
    minPrice: searchParams.get('min_price'),
    maxPrice: searchParams.get('max_price'),
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
  }
  
  try {
    const properties = await fetchPropertiesFromDB(filters)
    
    return NextResponse.json({
      data: properties,
      meta: {
        page: filters.page,
        limit: filters.limit,
        total: properties.length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

// POST com validação Zod
import { z } from 'zod'

const propertySchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  island: z.string(),
  propertyType: z.enum(['apartment', 'house', 'land', 'commercial']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = propertySchema.parse(body)
    
    // Processar criação de propriedade
    const property = await createPropertyInDB(validatedData)
    
    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
```

### 3. **Middleware Avançado para Subdomínios** (Next.js 20)
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAgencyBySubdomain } from './lib/db/agencies'

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  
  // Extrair subdomínio (ex: agency1.imocv.cv)
  const subdomainMatch = host.match(/^([a-z0-9-]+)\.(imocv\.cv|localhost:\d+)$/)
  
  if (subdomainMatch?.[1] && !['www', 'api', 'admin'].includes(subdomainMatch[1])) {
    const subdomain = subdomainMatch[1]
    
    // Verificar se agência existe (async no middleware)
    const agency = await getAgencyBySubdomain(subdomain)
    
    if (agency && agency.isActive) {
      // Reescrever para rota de agência
      url.pathname = `/agency/${subdomain}${url.pathname}`
      return NextResponse.rewrite(url)
    }
    
    // Agência não encontrada - redirecionar para 404
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### 4. **Turbopack Configuration** (Next.js 20 - Substitui Webpack)
```typescript
// turbopack.config.ts
import type { TurboConfig } from '@turbo/pack'

const config: TurboConfig = {
  resolve: {
    alias: {
      '@': './',
      '@components': './components',
      '@lib': './lib',
      '@styles': './styles',
    },
  },
  experimental: {
    // Otimizações para produção
    optimizeCss: true,
    optimizeFonts: true,
    optimizeImages: true,
  },
}

export default config
```

### 5. **next.config.mjs** – Otimizações Next.js 20
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack para desenvolvimento
  webpack: undefined, // Desativa webpack, usa Turbopack
  
  // Otimizações de imagem
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imocv-spaces.nyc3.cdn.digitaloceanspaces.com',
      },
    ],
  },
  
  // Otimizações de fonte
  experimental: {
    optimizeCss: true,
    optimizeFonts: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    turbo: {
      resolveAlias: {
        '@': './',
        '@components': './components',
        '@lib': './lib',
      },
    },
  },
  
  // Edge Runtime para API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
        // Edge runtime para APIs rápidas
        has: [
          {
            type: 'host',
            value: '(imocv\\.cv|localhost:\\d+)$',
          },
        ],
      },
    ]
  },
  
  // Progressive hydration para 4G
  reactStrictMode: true,
}

export default nextConfig
```

### 6. **Componente Mapa Otimizado com Client Components**
```typescript
// components/maps/MapboxMap.client.tsx
'use client'

import dynamic from 'next/dynamic'
import { use, Suspense } from 'react'

const MapboxMapInner = dynamic(
  () => import('./MapboxMapInner').then(mod => mod.MapboxMapInner),
  {
    loading: () => (
      <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
    ),
    ssr: false,
  }
)

export function MapboxMap({ properties, center, zoom = 10 }) {
  // Use React.use para streaming de dados
  const data = use(fetchMapData(properties))
  
  return (
    <div className="relative w-full h-[400px] min-h-[300px]">
      <MapboxMapInner 
        properties={data} 
        center={center} 
        zoom={zoom} 
      />
    </div>
  )
}

async function fetchMapData(properties) {
  // Busca assíncrona para dados do mapa
  return properties.map(prop => ({
    ...prop,
    coordinates: [prop.longitude, prop.latitude],
  }))
}
```

### 7. **Loading States Nativos com Suspense**
```typescript
// app/property/[id]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function PropertyLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skeleton para galeria */}
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="w-full h-[400px] rounded-xl" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Skeleton para informações */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
```

### 8. **Dockerfile Otimizado para Next.js 20** (Production)
```dockerfile
# STAGE 1: Build com Turbopack
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependências primeiro (cache layer)
COPY package*.json ./
RUN npm ci

# Copiar código fonte
COPY . .

# Build otimizado com cache
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBOPACK=1
RUN npm run build

# STAGE 2: Production
FROM node:20-alpine

WORKDIR /app

# Copiar apenas artefatos necessários
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --production

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Health check otimizado
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
```

---

## 📊 PERFORMANCE TARGETS ATUALIZADOS (NEXT.JS 20 + 4G)

| Métrica | Target 4G | Target 3G (Fallback) |
|---------|-----------|----------------------|
| **LCP** | < 1.2s | < 1.8s |
| **FCP** | < 0.8s | < 1.2s |
| **TTI** | < 1.5s | < 2.5s |
| **TBT** | < 50ms | < 150ms |
| **CLS** | < 0.03 | < 0.08 |
| **Bundle Total** | < 300KB | < 400KB |
| **Lighthouse** | > 98 | > 95 |
| **TTFB** | < 100ms | < 200ms |

---

## 🚀 TÉCNICAS ESSENCIAIS PARA NEXT.JS 20 + 4G

### 1. **Partial Prerendering** (Next.js 20)
```typescript
// app/dashboard/page.tsx
import { unstable_noStore as noStore } from 'next/cache'

export default async function Dashboard() {
  // Desativa cache para dados dinâmicos
  noStore()
  
  const stats = await fetchStats()
  
  return (
    <div>
      {/* Conteúdo estático pré-renderizado */}
      <h1>Dashboard</h1>
      
      {/* Conteúdo dinâmico com streaming */}
      <Suspense fallback={<div>Carregando...</div>}>
        <StatsCard stats={stats} />
      </Suspense>
    </div>
  )
}
```

### 2. **Image Optimization com next/image**
```tsx
import Image from 'next/image'

<Image
  src={property.mainImage}
  alt={property.title}
  width={800}
  height={600}
  priority={index === 0} // Only first image
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
  className="object-cover w-full h-full"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={75} // Otimizado para 4G
/>
```

### 3. **Font Optimization com next/font**
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${inter.variable} ${geistSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### 4. **React Query v5 Configuration**
```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      placeholderData: keepPreviousData,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 0,
    },
  },
})
```

### 5. **Edge Runtime para APIs Rápidas**
```typescript
// app/api/search/route.ts
export const runtime = 'edge' // Usa Edge Runtime

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Busca rápida com cache
  const cacheKey = `search:${searchParams.toString()}`
  const cached = await caches.default.match(cacheKey)
  
  if (cached) {
    return cached
  }
  
  const results = await performSearch(searchParams)
  
  const response = new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache 1h
    },
  })
  
  await caches.default.put(cacheKey, response.clone())
  
  return response
}
```

---

## ✅ CHECKLIST DE DEPLOY (NEXT.JS 20)

- [ ] Ativar Turbopack no next.config.mjs
- [ ] Configurar `remotePatterns` para DigitalOcean Spaces
- [ ] Implementar middleware.ts para subdomínios
- [ ] Criar loading.tsx e error.tsx para todas rotas críticas
- [ ] Usar `next/font` para todas fontes
- [ ] Implementar dynamic imports para componentes pesados (Mapbox)
- [ ] Configurar health check no Dockerfile
- [ ] Ativar `optimizeCss`, `optimizeFonts`, `optimizeImages`
- [ ] Testar Lighthouse score > 98 em 4G simulado
- [ ] Configurar CDN (Cloudflare) com cache rules para:
  - `/static/*` → Cache 1 ano
  - `/images/*` → Cache 30 dias
  - `/_next/static/*` → Cache 1 ano
- [ ] Implementar Edge Runtime para APIs críticas
- [ ] Configurar Partial Prerendering para páginas híbridas

---

## 💡 DICA CRÍTICA PARA CABO VERDE

**Implemente detecção de rede com fallback:**
```typescript
// lib/utils/network.ts
export const getNetworkType = (): '4g' | '3g' | 'slow-2g' | 'offline' => {
  if (typeof window === 'undefined') return '4g'
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  if (!connection) return '4g'
  
  return connection.effectiveType || '4g'
}

// Usar no componente:
const networkType = getNetworkType()
const imageQuality = networkType === 'slow-2g' ? 40 : 75
const prefetchStrategy = networkType === '4g' ? 'viewport' : 'none'
```

Isso permite ajustar dinamicamente:
- Qualidade de imagens (40-75%)
- Estratégia de prefetch (viewport vs none)
- Número de resultados por página
- Complexidade de animações
- Frequência de polling

---

## 🎯 MIGRAÇÃO DE NEXT.JS 14 PARA 20

### Passo 1: Atualizar dependências
```bash
npm install next@latest react@latest react-dom@latest
npm install @types/node @types/react @types/react-dom
```

### Passo 2: Ativar Turbopack
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  }
}
```

### Passo 3: Configurar Edge Runtime
```typescript
// next.config.mjs
const nextConfig = {
  experimental: {
    serverActions: true,
    optimizeCss: true,
    optimizeFonts: true,
  },
}
```

### Passo 4: Migrar para Server Components
```typescript
// Antes (Client Component)
'use client'
export default function Component() { ... }

// Depois (Server Component)
// Remover 'use client' para Server Component
export default async function Component() { ... }
```

---

**Pronto para deploy com Next.js 20!** Estas otimizações aproveitam todas as novas features do Next.js 20 (Turbopack, Server Components, Edge Runtime, Partial Prerendering) com foco em performance ultra-rápida para 4G em Cabo Verde, mantendo fallback inteligente para 3G onde necessário. 🌴🚀