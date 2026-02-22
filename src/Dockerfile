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
