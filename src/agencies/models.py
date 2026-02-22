from django.db import models
import uuid

class Agency(models.Model):
    class SubscriptionPlan(models.TextChoices):
        STARTER = 'STARTER', 'Starter'
        PRO = 'PRO', 'Pro'
        PREMIUM = 'PREMIUM', 'Premium'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    nif = models.CharField(max_length=20, unique=True)
    
    is_verified = models.BooleanField(default=False)
    docs_approved = models.BooleanField(default=False)
    
    subscription_plan = models.CharField(
        max_length=20,
        choices=SubscriptionPlan.choices,
        default=SubscriptionPlan.STARTER
    )
    
    logo = models.ImageField(upload_to='agencies/logos/', null=True, blank=True)
    website = models.URLField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    
    # Trust Layer Metrics
    sla_response_time = models.DurationField(null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Agencies"

    def __str__(self):
        return self.name
