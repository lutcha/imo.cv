#!/bin/bash
# =============================================================================
# setup-ssl.sh — Emitir certificados Let's Encrypt para imotech.cv
#
# Pre-requisito: DNS de imotech.cv (e subdomínios) já aponta para 206.81.20.231
#
# Uso:
#   bash scripts/setup-ssl.sh
#
# O que faz:
#   1. Verifica que o DNS está resolvido para o servidor correcto
#   2. Garante que nginx está a servir o ACME challenge em HTTP
#   3. Emite o certificado via certbot (container Docker + volume certbot_certs)
#   4. Faz reload ao nginx para activar HTTPS
#   5. Verifica que https://imotech.cv responde
# =============================================================================
set -euo pipefail

SERVER="root@206.81.20.231"
SERVER_IP="206.81.20.231"
DOMAIN="imotech.cv"
EMAIL="admin@imotech.cv"
COMPOSE_FILE="docker-compose.prod.yml"
REMOTE_DIR="/opt/imocv"

# ─── Cores para output ───────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()    { echo -e "${GREEN}[INFO]${NC} $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

# ─── 1. Verificar DNS ────────────────────────────────────────────────────────
info "Verificar DNS: $DOMAIN -> $SERVER_IP"

RESOLVED=$(dig +short "$DOMAIN" 2>/dev/null | tail -1 || true)
if [[ "$RESOLVED" != "$SERVER_IP" ]]; then
    error "DNS nao resolvido. $DOMAIN aponta para '$RESOLVED', esperado '$SERVER_IP'. Configure o DNS antes de continuar."
fi
info "DNS OK: $DOMAIN -> $RESOLVED"

# Verificar subdomínios (opcional — warn se ainda nao apontar)
for SUB in "www" "agencia" "condominio"; do
    SUB_RESOLVED=$(dig +short "$SUB.$DOMAIN" 2>/dev/null | tail -1 || true)
    if [[ "$SUB_RESOLVED" != "$SERVER_IP" ]]; then
        warn "Subdominio $SUB.$DOMAIN nao aponta para $SERVER_IP (actual: '$SUB_RESOLVED'). O certificado nao cobrira este subdominio."
    else
        info "DNS OK: $SUB.$DOMAIN -> $SUB_RESOLVED"
    fi
done

# ─── 2. Verificar ACME challenge acessivel ───────────────────────────────────
info "Verificar ACME challenge via HTTP..."

ACME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    "http://$DOMAIN/.well-known/acme-challenge/test" 2>/dev/null || echo "000")

# 404 e esperado (ficheiro nao existe) — significa que nginx serve o bloco ACME
if [[ "$ACME_STATUS" == "404" ]] || [[ "$ACME_STATUS" == "200" ]]; then
    info "ACME challenge acessivel (HTTP $ACME_STATUS)"
elif [[ "$ACME_STATUS" == "301" ]] || [[ "$ACME_STATUS" == "308" ]]; then
    error "Nginx esta a redirigir para HTTPS antes de ter certificado. Verifique que o bloco HTTP80 serve /.well-known/acme-challenge/ antes do redirect."
else
    error "ACME challenge nao acessivel (HTTP $ACME_STATUS). Verifique que o nginx esta a correr: ssh $SERVER 'docker ps | grep nginx'"
fi

# ─── 3. Emitir certificado via certbot (Docker volume) ───────────────────────
info "Emitir certificado Let's Encrypt para $DOMAIN e subdomínios..."

ssh "$SERVER" bash -s << EOF
set -euo pipefail
cd $REMOTE_DIR

docker run --rm \
    -v imocv_certbot_certs:/etc/letsencrypt \
    -v imocv_certbot_webroot:/var/www/certbot \
    certbot/certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        -d "$DOMAIN" \
        -d "www.$DOMAIN" \
        -d "agencia.$DOMAIN" \
        -d "condominio.$DOMAIN"
EOF

info "Certificado emitido com sucesso."

# ─── 4. Activar nginx-ssl.conf no servidor ───────────────────────────────────
info "Copiar nginx-ssl.conf para o servidor..."
scp nginx/nginx-ssl.conf "$SERVER:$REMOTE_DIR/nginx/nginx.conf"

info "Testar configuracao nginx..."
ssh "$SERVER" "docker exec imocv_nginx nginx -t"

info "Reload nginx..."
ssh "$SERVER" "docker exec imocv_nginx nginx -s reload"

# ─── 5. Health check HTTPS ───────────────────────────────────────────────────
info "Aguardar 3s e verificar HTTPS..."
sleep 3

HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    "https://$DOMAIN/health" 2>/dev/null || echo "000")

if [[ "$HTTPS_STATUS" == "200" ]]; then
    info "HTTPS activo e a responder: https://$DOMAIN (HTTP $HTTPS_STATUS)"
else
    warn "Health check retornou HTTP $HTTPS_STATUS. Verificar logs:"
    warn "  ssh $SERVER 'docker logs imocv_nginx --tail=30'"
    warn "  ssh $SERVER 'docker logs imocv_backend --tail=30'"
fi

echo ""
info "Setup SSL concluido."
info "  Certificado: /etc/letsencrypt/live/$DOMAIN/ (Docker volume imocv_certbot_certs)"
info "  Renovacao automatica: container imocv_certbot (cada 12h)"
info "  Proximos passos: verificar admin.imotech.cv e configurar Cloudflare Full Strict mode"
