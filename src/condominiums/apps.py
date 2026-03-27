from django.apps import AppConfig


class CondominiumsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'condominiums'
    verbose_name = 'Gestão de Condomínios'

    def ready(self):
        import condominiums.signals  # noqa: F401 — connects signal handlers
