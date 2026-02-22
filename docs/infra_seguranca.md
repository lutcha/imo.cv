# Infraestrutura na Cloud e Segurança – imo.cv

## Provider recomendado para começar

| Opção | Frontend | Backend | BD | Custo inicial |
|-------|----------|---------|-----|----------------|
| **DigitalOcean** | App Platform (static/Next) | App Platform (container Django) | Managed PostgreSQL + PostGIS | ~20–40 USD/mês |
| **Vercel + Railway** | Vercel (Next.js) | Railway (Django) | Railway PostgreSQL ou externa | Free tier possível |
| **AWS** | Amplify ou S3+CloudFront | ECS/Elastic Beanstalk | RDS PostgreSQL | Pay-as-you-go |

Recomendação inicial: **DigitalOcean** ou **Vercel + Railway** para MVP; migrar para AWS quando houver necessidade de mais controlo ou regiões.

---

## Armazenamento de imagens (fotos dos imóveis)

1. **Cloudinary**
   - Upload via backend (API ou SDK), URLs CDN no frontend.
   - Free tier: espaço e bandwidth suficientes para arranque.
   - Transformações (resize, WebP) para performance mobile.

2. **AWS S3 + CloudFront**
   - Backend gera URLs pré-assinadas para upload; frontend ou backend faz upload.
   - CloudFront como CDN; cache e compressão.

Configurar no Django: `django-storages` com backend S3 ou integração Cloudinary; campo `ImageField` ou `URLField` para a URL final. No Next.js, `next.config.js` já inclui `remotePatterns` para Cloudinary e S3.

---

## Deploy automático (main)

- **Frontend:** Conectar o repositório ao Vercel ou ao DigitalOcean App Platform; build command `npm run build` em `web/`, output `web/.next` (Next) ou export estático. Deploy em cada push em `main`.
- **Backend:** App Platform (DO) ou Railway: detectar Django, instalar deps, correr migrations e gunicorn. Variáveis de ambiente para `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS`, CORS.

No pipeline de CI (`.github/workflows/ci.yml`) já está o build e lint do frontend; pode adicionar um job de deploy que só corre em `main` e chama a API do Vercel/DO (ou usa GitHub integration da plataforma).

---

## Boas práticas de segurança (checklist)

- **HTTPS:** Sempre em staging e produção.
- **Sanitização:** Validação e escape no backend; no frontend evitar injetar HTML de utilizador.
- **SQL injection:** Usar apenas ORM e queries parametrizadas (Django).
- **CORS:** Restringir origens ao domínio do frontend em produção.
- **Secrets:** Nunca em repositório; usar variáveis de ambiente ou secret managers.
- **JWT:** Access token de curta duração; considerar refresh em HttpOnly cookie.
- **Rate limiting:** Em endpoints públicos (pesquisa, criação de lead), conforme `backend_architecture.md`.
- **CSP:** Configurar Content-Security-Policy nos headers da aplicação quando possível.
