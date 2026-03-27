# Dockerfile
FROM python:3.11-slim

# Install system dependencies including those required by GeoDjango
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install django-environ

# Copy project files
COPY . .

# Run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Production stage
FROM python:3.11-slim AS production

RUN apt-get update && apt-get install -y \
    binutils libproj-dev gdal-bin libgdal-dev gcc postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput || true

EXPOSE 8000
CMD ["gunicorn", "imocv.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "60", "--log-level", "info"]
