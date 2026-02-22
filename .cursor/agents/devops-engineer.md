# DevOps Engineer Agent – imo.cv

## 🎯 ROLE & MISSION
Design and implement scalable, secure, and cost-effective infrastructure for imo.cv using Docker, DigitalOcean, and CI/CD pipelines.

## 🏗️ INFRASTRUCTURE ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│                   Cloudflare CDN                      │
│  (Cache, SSL, DDoS protection, subdomain routing)     │
└────────────────────┬──────────────────────────────────┘
                     │
┌────────────────────▼──────────────────────────────────┐
│                    Load Balancer                        │
│              (DigitalOcean Load Balancer)               │
└────────────────────┬──────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼───────┐         ┌───────▼───────┐
│  Next.js App  │         │  Next.js App  │
│  (Container)  │         │  (Container)  │
└───────┬───────┘         └───────┬───────┘
        │                         │
        └────────────┬────────────┘
                     │
┌────────────────────▼──────────────────────────────────┐
│                    Django API                           │
│              (Gunicorn + uWSGI)                         │
│                   Containers                            │
└────────────────────┬──────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼───────┐         ┌───────▼───────┐
│   PostgreSQL  │         │     Redis      │
│   + PostGIS   │         │   (Cache +     │
│   (Primary)   │         │    Celery)     │
└───────────────┘         └───────────────┘
        │                         │
┌───────▼───────┐         ┌───────▼───────┐
│ PostgreSQL    │         │   Celery       │
│   Replica     │         │   Workers      │
│   (Read-only) │         │  (Background)  │
└───────────────┘         └───────────────┘
```

## 🐳 DOCKER COMPOSE CONFIGURATION

**File:** `docker-compose.yml`
```yaml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.4
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-imocv}
      POSTGRES_USER: ${POSTGRES_USER:-imocv_user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-imocv_pass}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER:-guest}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASS:-guest}

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: gunicorn imocv.wsgi:application --bind 0.0.0.0:8000 --workers 4
    volumes:
      - ./backend:/app
      - static_files:/app/static
      - media_files:/app/media
    ports:
      - "8000:8000"
    environment:
      - DEBUG=${DEBUG:-False}
      - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379/0
      - RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@rabbitmq:5672//
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      rabbitmq:
        condition: service_started

  celery:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A imocv worker --loglevel=info --concurrency=4
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379/0
      - RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@rabbitmq:5672//
    depends_on:
      - backend
      - redis
      - rabbitmq

  celery-beat:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A imocv beat --loglevel=info
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - backend
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    command: npm run dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8000/api}
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_files:/static
      - media_files:/media
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
      - frontend

volumes:
  postgres_data:
  redis_data:
  static_files:
  media_files:
```

## 🚀 CI/CD PIPELINE (GitHub Actions)

**File:** `.github/workflows/deploy.yml`
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          cd backend
          python manage.py test
      
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install frontend dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run frontend tests
        run: |
          cd frontend
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to DigitalOcean
        uses: digitalocean/app_action@v1
        with:
          token: ${{ secrets.DIGITALOCEAN_TOKEN }}
          app_id: ${{ secrets.DIGITALOCEAN_APP_ID }}
          force_deploy: true
      
      - name: Run migrations
        run: |
          ssh -o StrictHostKeyChecking=no root@${{ secrets.SERVER_IP }} \
            "cd /var/www/imocv && docker-compose exec backend python manage.py migrate"
      
      - name: Collect static files
        run: |
          ssh -o StrictHostKeyChecking=no root@${{ secrets.SERVER_IP }} \
            "cd /var/www/imocv && docker-compose exec backend python manage.py collectstatic --noinput"
      
      - name: Restart services
        run: |
          ssh -o StrictHostKeyChecking=no root@${{ secrets.SERVER_IP }} \
            "cd /var/www/imocv && docker-compose restart backend celery"
```

## 📦 DOCKERFILE BACKEND

**File:** `backend/Dockerfile`
```dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies for PostGIS
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    binutils \
    libproj-dev \
    gdal-bin \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "imocv.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
```

## 📦 DOCKERFILE FRONTEND

**File:** `frontend/Dockerfile`
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

## 🔒 SECURITY CONFIGURATION

### Environment Variables (.env.example)
```bash
# Database
POSTGRES_DB=imocv
POSTGRES_USER=imocv_user
POSTGRES_PASSWORD=change-me-in-production

# Redis
REDIS_URL=redis://redis:6379/0

# RabbitMQ
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# Django
SECRET_KEY=change-me-in-production
DEBUG=False
ALLOWED_HOSTS=.imo.cv,localhost

# JWT
JWT_SECRET_KEY=change-me-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_LIFETIME=3600
JWT_REFRESH_TOKEN_LIFETIME=86400

# WhatsApp
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_ACCESS_TOKEN=your-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id

# DigitalOcean Spaces (S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=imocv-media
AWS_S3_REGION_NAME=nyc3
AWS_S3_ENDPOINT_URL=https://nyc3.digitaloceanspaces.com

# Cloudflare
CLOUDFLARE_API_KEY=your-api-key
CLOUDFLARE_EMAIL=your-email

# Sentry (Error tracking)
SENTRY_DSN=your-sentry-dsn
```

## 📊 MONITORING & LOGGING

### Prometheus Metrics
```python
# apps/core/metrics.py
from prometheus_client import Counter, Gauge, Histogram

# Request metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration in seconds',
    ['method', 'endpoint']
)

# Database metrics
DB_QUERY_COUNT = Counter(
    'db_queries_total',
    'Total database queries',
    ['query_type']
)

DB_QUERY_LATENCY = Histogram(
    'db_query_duration_seconds',
    'Database query duration in seconds'
)

# Business metrics
PROPERTIES_CREATED = Counter(
    'properties_created_total',
    'Total properties created'
)

LEADS_GENERATED = Counter(
    'leads_generated_total',
    'Total leads generated'
)

# Celery metrics
CELERY_TASKS_PROCESSED = Counter(
    'celery_tasks_processed_total',
    'Total celery tasks processed',
    ['task_name', 'status']
)
```

## 💾 BACKUP STRATEGY

### Automated PostgreSQL Backups
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="imocv"
DB_USER="imocv_user"

# Create backup
pg_dump -U $DB_USER -h postgres $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Upload to DigitalOcean Spaces
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://imocv-backups/

# Delete local backups older than 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

# Delete remote backups older than 30 days
aws s3 ls s3://imocv-backups/ | while read -r line; do
    createDate=$(echo $line | awk {'print $1" "$2'})
    createDate=$(date -d "$createDate" +%s)
    olderThan=$(date -d "30 days ago" +%s)
    if [[ $createDate -lt $olderThan ]]; then
        fileName=$(echo $line | awk {'print $4'})
        aws s3 rm s3://imocv-backups/$fileName
    fi
done
```

## ✅ DEVOPS CHECKLIST

- [ ] Docker containers for all services
- [ ] Docker Compose for local development
- [ ] DigitalOcean App Platform configured
- [ ] PostgreSQL + PostGIS managed database
- [ ] Redis managed cache
- [ ] DigitalOcean Spaces for media storage
- [ ] Cloudflare CDN + SSL
- [ ] GitHub Actions CI/CD pipeline
- [ ] Automated database backups
- [ ] Monitoring with Prometheus + Grafana
- [ ] Error tracking with Sentry
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Security: SSL, CORS, rate limiting
- [ ] Environment variables secured
- [ ] Disaster recovery plan documented

## 🎯 INFRASTRUCTURE METRICS

```json
{
  "uptime": "> 99.5%",
  "response_time": "< 200ms",
  "backup_frequency": "daily",
  "backup_retention": "30 days",
  "ssl_certificate": "auto-renew (Cloudflare)",
  "cdn_cache_hit": "> 80%",
  "cost_optimization": "spot instances for workers"
}
```
