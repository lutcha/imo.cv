# Frontend & DevOps – imo.cv

## 1. Escolha do framework e justificação

### Next.js (React)

- **SEO e performance:** Renderização no servidor (SSR) e estática (SSG) para páginas de listagem e detalhe de imóveis, melhor indexação e primeiro carregamento rápido — crítico para redes 3G/4G em Cabo Verde (conforme estratégia de produto).
- **Roteamento:** App Router com rotas públicas (`/`, `/pesquisa`, `/imovel/[id]`) e área privada do agente (`/agente/*`) num único projeto.
- **Ecossistema:** Integração simples com Apollo (GraphQL) e Axios (REST), e com Leaflet via componentes dinâmicos (SSR-safe).

**Alternativa considerada:** Nuxt.js (Vue) — também adequado para SEO e performance; a escolha por Next.js alinha com maior oferta de recursos em React na região e com a documentação já referente a Next.js na estratégia de UX.

---

## 2. Estrutura do projeto (monorepo)

Recomendação: **monorepo** (backend e frontend no mesmo repositório).

```
imobiliaria-2/
├── src/                    # Backend Django
│   ├── imocv/
│   └── manage.py
├── web/                    # Frontend Next.js
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
├── docs/
├── .github/workflows/       # CI/CD
├── .env.example
└── README.md
```

**Vantagens:** Um único clone, issues e PRs unificados, pipelines que testam e fazem deploy de ambos.  
**Alternativa:** Dois repositórios (ex.: `imo.cv-backend`, `imo.cv-web`) se equipas ou ciclos de release forem totalmente independentes.

---

## 3. Roteamento frontend

| Área     | Rotas principais                          |
|----------|-------------------------------------------|
| Público  | `/`, `/pesquisa`, `/imovel/[id]`          |
| Agente   | `/agente`, `/agente/imoveis`, `/agente/leads`, `/agente/configuracoes`, `/agente/login` |

A área `/agente` usa um layout com sidebar; a autenticação é feita via JWT no cliente (Axios interceptors). Quando o backend devolver 401, o frontend pode redirecionar para `/agente/login`.

---

## 4. Biblioteca de mapas

- **Configuração atual:** **Leaflet** + **OpenStreetMap** (open-source), sem token. Adequado para Cabo Verde (cobertura OSM suficiente).
- **Alternativa com mais recursos:** **Mapbox GL JS** — estilos custom, heatmaps, melhor desempenho com muitos marcadores. Requer token e conta Mapbox. Para ativar: definir `NEXT_PUBLIC_MAPBOX_TOKEN` e trocar o componente de mapa para Mapbox.

O componente `MapView` está em `web/components/map/MapView.tsx` (client component, lazy-loaded para evitar problemas de SSR com Leaflet).

---

## 5. Integração com o backend

- **REST (Axios):** Autenticação (login/refresh/logout), CRUD de imóveis, leads, etc. Base URL em desenvolvimento via rewrite: `/api/backend` → `NEXT_PUBLIC_API_URL`.
- **GraphQL (Apollo Client):** Queries de leitura do marketplace (listagem, filtros, detalhe). Endpoint: `/graphql` (rewrite para o backend).
- **Auth:** JWT (access + refresh). Token guardado em estado (Zustand) com persistência em `localStorage`. Interceptor Axios adiciona `Authorization: Bearer <token>`; em 401 dispara evento para logout no cliente.

---

## 6. Design (Figma) e responsividade

- Componentes do Figma devem ser implementados em código (HTML, Tailwind, TypeScript) em `web/components/` e `web/app/`.
- **Mobile-first:** Layouts e navegação pensados para toque (bottom nav onde fizer sentido, cartões largos, gestos de swipe nas galerias). Tailwind breakpoints: `md:`, `lg:` para tablet e desktop.

---

## 7. Ambientes

| Ambiente   | Uso              | Variáveis principais |
|-----------|-------------------|----------------------|
| Development | Local            | `NEXT_PUBLIC_API_URL=http://localhost:8000` |
| Staging   | Testes pré-prod   | `NEXT_PUBLIC_API_URL=https://api.staging.imo.cv` (ex.) |
| Production| Produção         | `NEXT_PUBLIC_API_URL=https://api.imo.cv` (ex.) |

Criar ficheiros `.env.development`, `.env.staging`, `.env.production` (ou variáveis no pipeline/plataforma) e **nunca** commitar segredos. Usar `.env.example` como referência.

---

## 8. CI/CD (GitHub Actions)

Pipeline simples:

1. **Em cada PR / push:** instalar dependências, lint, testes e build do frontend (e, quando existirem, testes do backend).
2. **Na branch `main` (após merge):** deploy automático do frontend (e opcionalmente do backend) para staging ou produção.

Exemplo de workflow está em `.github/workflows/ci.yml`. Ajustar os passos de deploy conforme o provider (Vercel, DigitalOcean, etc.).

---

## 9. Infraestrutura na cloud

**Recomendações iniciais:**

- **Aplicação e API:** **DigitalOcean App Platform** ou **Vercel (frontend) + Railway/Render (backend)** — configuração rápida, custos previsíveis.
- **Alternativa mais escalável:** **AWS** (ECS/Fargate ou Elastic Beanstalk para o Django; CloudFront + S3 para estáticos se necessário).
- **Base de dados:** PostgreSQL + PostGIS gerido (DigitalOcean Managed Database, AWS RDS, ou Supabase).
- **Imagens dos imóveis:** **Cloudinary** (free tier generoso, transformações e CDN) ou **AWS S3 + CloudFront**. O backend deve gerar URLs assinadas ou enviar para um bucket; o frontend apenas exibe as URLs.

---

## 10. Segurança – boas práticas iniciais

- **HTTPS:** Sempre em staging e produção (TLS terminado no load balancer ou na plataforma).
- **Sanitização de inputs:** Validação no backend (Django/DRF); no frontend evitar `dangerouslySetInnerHTML` com conteúdo de utilizador.
- **SQL injection:** Usar ORM e queries parametrizadas (Django); não concatenar input em SQL.
- **CORS e CSP:** Backend deve restringir `AllowedHosts` e CORS ao domínio do frontend; considerar Content-Security-Policy nos headers.
- **Secrets:** Nunca commitar `.env` com tokens; usar variáveis de ambiente ou secret managers na CI e no servidor.
- **JWT:** Access token com validade curta; refresh token em HttpOnly cookie (quando implementado no backend) reduz risco de XSS.

Documento de arquitetura do backend (`docs/backend_architecture.md`) já cobre autenticação JWT, tenant e rate limiting.
