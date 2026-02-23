"""
Testes para o app condominiums.
Executar em ambiente com BD configurada (ex.: Docker com PostGIS).
"""
from django.test import TestCase

# Placeholder: testes unitários e de API devem ser adicionados quando o ambiente
# tiver BD e tenant disponíveis (schema isolation).
# Ex.: test_condominium_serializer_validates_choices, test_fee_amount_non_negative,
# test_unit_unique_per_condominium, test_api_condominium_list_requires_auth.
class CondominiumsAppTestCase(TestCase):
    def test_app_config(self):
        from django.apps import apps
        config = apps.get_app_config('condominiums')
        self.assertEqual(config.verbose_name, 'Gestão de Condomínios')
