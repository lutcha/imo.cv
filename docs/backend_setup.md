# Backend imo.cv – Setup

## Recomendado: correr com Docker (evita instalar GDAL no Windows)

O backend usa **PostGIS/GeoDjango**, que requer a biblioteca **GDAL**. No Windows a forma mais simples é usar Docker:

```bash
# Na raiz do projeto (imobiliaria-2)
docker-compose up
```

Isto sobe:
- **Django** em http://localhost:8000 (com GDAL já disponível no container)
- **PostgreSQL + PostGIS** na porta 5432
- **Redis** na porta 6379

Na primeira vez, pode ser preciso aplicar as migrações dentro do container:

```bash
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser
```

---

## Correr localmente (venv no Windows)

Requer **GDAL** instalado no sistema (ex.: [OSGeo4W](https://trac.osgeo.org/osgeo4w/)). Depois de instalar, em `src/.env`:

```env
GDAL_LIBRARY_PATH=C:/OSGeo4W64/bin/gdal311.dll
```

(ajusta o caminho e a versão `gdalXXX.dll` conforme a tua instalação)

## Requisitos

- Python 3.11+
- PostgreSQL 14+ com extensão **PostGIS** (para pesquisa geo)
- (Opcional) Redis para Celery em produção

## Instalação (sem Docker)

```bash
cd src
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

## Base de dados

1. Criar base PostgreSQL e ativar PostGIS:
   ```sql
   CREATE DATABASE imocv;
   \c imocv
   CREATE EXTENSION postgis;
   ```

2. Variáveis de ambiente (ou editar `imocv/settings.py`):
   ```env
   PGDATABASE=imocv
   PGUSER=postgres
   PGPASSWORD=***
   PGHOST=localhost
   PGPORT=5432
   ```

3. Migrations:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

## Desenvolvimento sem PostGIS (opcional)

Se não tiver PostGIS (ex.: Windows sem Docker), pode usar SQLite temporariamente comentando a configuração PostGIS em `settings.py` e usando o backend SQLite. **Nota:** o modelo `Property` usa `PointField`; com SQLite é necessário usar o backend SpatiaLite ou alterar o modelo para campos `latitude`/`longitude`. Recomenda-se usar **Docker** com imagem `postgis/postgis` para desenvolvimento local.

## Endpoints principais

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/v1/properties/` | Listar imóveis publicados |
| GET | `/api/v1/properties/search/?lat=&lon=&radius_km=` | Pesquisa geo |
| GET | `/api/v1/properties/recommendations/` | Recomendações |
| POST | `/api/v1/leads/` | Criar lead (público) |
| POST | `/api/v1/auth/token/` | Obter JWT (login) |

Documentação completa em `docs/backend_architecture.md`.
