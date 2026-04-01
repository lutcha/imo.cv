#!/bin/bash
# =============================================================================
# deploy.sh — Deploy imotech.cv em produção (DigitalOcean)
# Uso: bash scripts/deploy.sh [--bootstrap]
#   --bootstrap  : Primeiro deploy — obtém certificados SSL antes de arrancar nginx com HTTPS
# =============================================================================
set -euo pipefail

DOMAIN="imotech.cv"
EMAIL="admin@imotech.cv"
COMPOSE="docker compose -f docker-compose.prod.yml"

echo "▶ imotech.cv deploy — $(date)"

# ─── 1. Pull código mais recente ─────────────────────────────────────────────
git pull origin main

# ─── 2. Build das imagens ────────────────────────────────────────────────────
echo "▶ Building images..."
$COMPOSE build --no-cache

# ─── 3. Bootstrap SSL (apenas no primeiro deploy) ────────────────────────────
if [[ "${1:-}" == "--bootstrap" ]]; then
    echo "▶ Bootstrap: a obter certificados SSL..."

    # Nginx em modo HTTP-only para validação ACME
    cat > /tmp/nginx-bootstrap.conf << 'EOF'
server {
    listen 80;
    server_name imotech.cv www.imotech.cv agencia.imotech.cv condominio.imotech.cv;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'bootstrapping...';
        add_header Content-Type text/plain;
    }
}
EOF

    # Arrancar só nginx + certbot em modo bootstrap
    docker run -d --name imocv_nginx_bootstrap \
        -p 80:80 \
        -v /tmp/nginx-bootstrap.conf:/etc/nginx/conf.d/default.conf:ro \
        -v imocv_certbot_webroot:/var/www/certbot \
        nginx:alpine

    sleep 3

    # Obter certificado wildcard (cobre todos os subdomínios)
    docker run --rm \
        -v imocv_certbot_certs:/etc/letsencrypt \
        -v imocv_certbot_webroot:/var/www/certbot \
        certbot/certbot certonly \
            --webroot \
            --webroot-path=/var/www/certbot \
            --email "$EMAIL" \
            --agree-tos \
            --no-eff-email \
            -d "$DOMAIN" \
            -d "www.$DOMAIN" \
            -d "agencia.$DOMAIN" \
            -d "condominio.$DOMAIN"

    docker stop imocv_nginx_bootstrap && docker rm imocv_nginx_bootstrap
    echo "✓ Certificados SSL obtidos!"
fi

# ─── 4. Arrancar stack completa ──────────────────────────────────────────────
echo "▶ Starting services..."
$COMPOSE up -d

# ─── 5. Migrations ───────────────────────────────────────────────────────────
echo "▶ Running migrations..."
sleep 5  # aguardar DB estar pronto
docker exec imocv_backend python manage.py migrate_schemas --shared
docker exec imocv_backend python manage.py migrate_schemas --tenant

# ─── 6. Collectstatic ────────────────────────────────────────────────────────
echo "▶ Collecting static files..."
docker exec imocv_backend python manage.py collectstatic --noinput

# ─── 7. Health check ─────────────────────────────────────────────────────────
echo "▶ Health check..."
sleep 5
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/health" || echo "000")
if [[ "$HTTP_STATUS" == "200" ]]; then
    echo "✓ Deploy concluído — https://$DOMAIN está UP"
else
    echo "⚠ Health check retornou $HTTP_STATUS — verificar logs:"
    echo "  docker compose -f docker-compose.prod.yml logs --tail=50"
fi
