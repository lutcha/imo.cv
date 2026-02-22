from django.contrib.gis.db import models
from django.conf import settings

import uuid

class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class PropertyType(models.TextChoices):
        APARTAMENTO = 'APARTAMENTO', 'Apartamento'
        MORADIA = 'MORADIA', 'Moradia/Vila'
        TERRENO = 'TERRENO', 'Terreno'
        COMERCIAL = 'COMERCIAL', 'Comercial'

    class Status(models.TextChoices):
        RASCUNHO = 'RASCUNHO', 'Rascunho'
        PUBLICADO = 'PUBLICADO', 'Publicado'
        VENDIDO = 'VENDIDO', 'Vendido'
        ARRENDADO = 'ARRENDADO', 'Arrendado'
        INATIVO = 'INATIVO', 'Inativo'

    class Island(models.TextChoices):
        SANTIAGO = 'SANTIAGO', 'Santiago'
        SAL = 'SAL', 'Sal'
        BOA_VISTA = 'BOA_VISTA', 'Boa Vista'
        SAO_VICENTE = 'SAO_VICENTE', 'São Vicente'
        SANTO_ANTAO = 'SAO_ANTAO', 'Santo Antão'
        FOGO = 'FOGO', 'Fogo'
        SAO_NICOLAU = 'SAO_NICOLAU', 'São Nicolau'
        MAIO = 'MAIO', 'Maio'
        BRAVA = 'BRAVA', 'Brava'

    MUNICIPALITIES_BY_ISLAND = {
        'SANTIAGO': ['Praia', 'Santa Catarina', 'Santa Cruz', 'São Domingos', 'São Miguel', 'Ribeira Grande de Santiago', 'Tarrafal', 'São Salvador do Mundo'],
        'SAL': ['Sal'],
        'BOA_VISTA': ['Boa Vista'],
        'SAO_VICENTE': ['São Vicente'],
        'SANTO_ANTAO': ['Ribeira Grande', 'Paul', 'Porto Novo'],
        'FOGO': ['São Filipe', 'Mosteiros', 'Santa Catarina do Fogo'],
        'SAO_NICOLAU': ['Ribeira Brava', 'Tarrafal de São Nicolau'],
        'MAIO': ['Maio'],
        'BRAVA': ['Brava']
    }

    title = models.CharField(max_length=255)
    description = models.TextField()
    
    property_type = models.CharField(
        max_length=20,
        choices=PropertyType.choices,
        default=PropertyType.APARTAMENTO
    )
    
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.RASCUNHO
    )
    
    price = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.CharField(max_length=3, default='CVE')
    
    # Geospatial field
    location = models.PointField(srid=4326)
    island = models.CharField(
        max_length=20,
        choices=Island.choices,
        default=Island.SANTIAGO
    )
    municipality = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=500, blank=True)
    
    # Physical attributes
    area_total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    area_util = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)
    year_built = models.PositiveSmallIntegerField(null=True, blank=True)
    has_garage = models.BooleanField(default=False)
    
    # Extra data (JSONB)
    amenities = models.JSONField(default=dict, blank=True)
    
    is_verified = models.BooleanField(default=False)
    agent_responsible = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_properties'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        return self.title

class PropertyMedia(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='media'
    )
    file = models.FileField(upload_to='properties/media/')
    is_main = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']
