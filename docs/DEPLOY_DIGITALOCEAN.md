# Deploy imo.cv no DigitalOcean

## Requisitos
- Droplet Ubuntu 22.04 LTS, minimo 2GB RAM / 1 vCPU (recomendado 4GB / 2 vCPU)
- Docker + Docker Compose instalados no droplet
- Repositorio GitHub com acesso SSH configurado

## Setup inicial no droplet

### 1. Instalar Docker
```bash
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER
```

### 2. Clonar o repositorio
```bash
mkdir -p /opt/imocv
cd /opt/imocv
git clone https://github.com/SEU_USUARIO/imobiliaria-2.git .
```

### 3. Criar ficheiros de ambiente
```bash
cp src/.env.prod.example src/.env.prod
nano src/.env.prod   # editar com valores reais

cp .env.db.prod.example .env.db.prod
nano .env.db.prod    # editar password da DB
```

Gerar SECRET_KEY:
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(50))"
```

### 4. Primeiro deploy
```bash
docker-compose -f docker-compose.prod.yml up -d
docker exec imocv_backend python manage.py migrate_schemas --shared
docker exec imocv_backend python manage.py migrate_schemas --tenant
docker exec imocv_backend python manage.py createsuperuser
docker exec imocv_backend python manage.py seed_demo_data
```

### 5. Configurar GitHub Actions secrets

No repositorio GitHub -> Settings -> Secrets and variables -> Actions:

| Secret | Valor |
|--------|-------|
| `DO_HOST` | IP publico do droplet |
| `DO_USER` | `root` (ou utilizador com sudo) |
| `DO_SSH_KEY` | Chave SSH privada (conteudo de `~/.ssh/id_rsa`) |

## Dominios

Adicionar ao `ALLOWED_HOSTS` e `CORS_ALLOWED_ORIGINS` em `src/.env.prod`:
```
ALLOWED_HOSTS=IP_DO_DROPLET,imo.cv,www.imo.cv
CORS_ALLOWED_ORIGINS=https://imo.cv,https://www.imo.cv
```

## SSL com Let's Encrypt (opcional mas recomendado)
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d imo.cv -d www.imo.cv
```

## Verificar deploy
```bash
docker-compose -f docker-compose.prod.yml ps
docker logs imocv_backend --tail 20
curl http://localhost/api/properties/
```
