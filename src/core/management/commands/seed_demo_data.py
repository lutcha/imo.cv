import random
from datetime import date
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from django.db import connection

User = get_user_model()


class Command(BaseCommand):
    help = 'Seeds the database with demo real estate data for Cabo Verde'

    def handle(self, *args, **kwargs):
        # ── Step 1: ensure a localhost tenant exists in the public schema ──
        from core.models import Client, Domain

        self.stdout.write('Setting up localhost tenant...')

        # Work in the public schema to create/get the tenant record
        connection.set_schema_to_public()

        tenant, created = Client.objects.get_or_create(
            schema_name='demo',
            defaults={'name': 'IMO.CV Demo'}
        )
        if created:
            self.stdout.write(self.style.SUCCESS('  Created tenant schema "demo"'))
        else:
            self.stdout.write('  Tenant schema "demo" already exists')

        Domain.objects.get_or_create(
            domain='localhost',
            defaults={'tenant': tenant, 'is_primary': True}
        )
        Domain.objects.get_or_create(
            domain='backend',
            defaults={'tenant': tenant, 'is_primary': False}
        )

        # ── Step 2: create users + agency in the public schema ──
        self.stdout.write('Creating agents and agency...')
        agent1, _ = User.objects.get_or_create(
            username='jose.agente@imo.cv',
            defaults={'email': 'jose.agente@imo.cv', 'is_staff': True}
        )
        agent1.set_password('imo123')
        agent1.save()

        agent2, _ = User.objects.get_or_create(
            username='maria.agente@imo.cv',
            defaults={'email': 'maria.agente@imo.cv', 'is_staff': True}
        )
        agent2.set_password('imo123')
        agent2.save()

        from agencies.models import Agency
        agency1, _ = Agency.objects.get_or_create(
            slug='cv-premium',
            defaults={
                'name': 'CV Premium Real Estate',
                'nif': '200112233',
                'email': 'info@cvpremium.cv',
                'phone': '+238 9912233',
                'subscription_plan': 'PREMIUM',
                'is_verified': True,
                'rating': 4.8
            }
        )

        # ── Step 3: switch to the tenant schema for property/lead data ──
        connection.set_tenant(tenant)
        self.stdout.write(f'  Active schema: {connection.schema_name}')

        from properties.models import Property
        from leads.models import Lead
        from crm.models import CRMInteraction

        self.stdout.write('Creating 25 properties across 4 islands...')
        islands = [
            ('SANTIAGO', 'Praia', 14.91, -23.51),
            ('SAL', 'Santa Maria', 16.59, -22.90),
            ('BOA_VISTA', 'Sal Rei', 16.17, -22.91),
            ('SAO_VICENTE', 'Mindelo', 16.89, -24.99),
        ]
        prop_types = ['APARTAMENTO', 'MORADIA', 'TERRENO']
        listing_types = ['VENDA', 'ARRENDAMENTO']
        properties = []

        for i in range(25):
            island_data = random.choice(islands)
            p_type = random.choice(prop_types)
            l_type = random.choice(listing_types)
            lat = island_data[2] + (random.random() - 0.5) * 0.02
            lon = island_data[3] + (random.random() - 0.5) * 0.02

            p, _ = Property.objects.get_or_create(
                title='{} #{}'.format(p_type.title(), i + 1),
                defaults={
                    'description': 'Imovel premium com vista mar.',
                    'property_type': p_type,
                    'listing_type': l_type,  # VENDA or ARRENDAMENTO
                    'status': 'PUBLICADO',
                    'price': random.randint(5000000, 45000000),
                    'currency': 'CVE',
                    'location': Point(lon, lat),
                    'island': island_data[0],
                    'municipality': island_data[1],
                    'address': 'Rua Principal, {}'.format(island_data[1]),
                    'area_total': random.randint(80, 500),
                    'area_util': random.randint(60, 400),
                    'rooms': random.randint(1, 5),
                    'bathrooms': random.randint(1, 4),
                    'has_garage': random.choice([True, False]),
                    'is_verified': True,
                    'agent_responsible': random.choice([agent1, agent2])
                }
            )
            properties.append(p)

        self.stdout.write('Creating 40 leads...')
        sources = ['Marketplace', 'WhatsApp', 'Facebook', 'Referral']
        statuses = ['NOVO', 'CONTACTADO', 'QUALIFICADO', 'VISITA_AGENDADA', 'PROPOSTA_FEITA']
        priorities = ['BAIXA', 'MEDIA', 'ALTA']

        for i in range(40):
            prop = random.choice(properties)
            agent = prop.agent_responsible
            lead, _ = Lead.objects.get_or_create(
                email='client{}@gmail.com'.format(i),
                defaults={
                    'full_name': 'Lead {}'.format(i),
                    'phone': '+238 9{}'.format(random.randint(1000000, 9999999)),
                    'property': prop,
                    'status': random.choice(statuses),
                    'priority': random.choice(priorities),
                    'assigned_to': agent,
                    'source': random.choice(sources)
                }
            )
            for _ in range(random.randint(1, 2)):
                CRMInteraction.objects.get_or_create(
                    lead=lead,
                    agent=agent,
                    interaction_type=random.choice(['CHAMADA', 'EMAIL', 'WHATSAPP']),
                    defaults={
                        'summary': 'Conversa sobre o imovel',
                        'description': 'Cliente interessado na localizacao.'
                    }
                )

        self.stdout.write('Creating 3 condominium buildings...')
        try:
            from condominiums.models import Condominium, Unit, Fee
            names = ['Fidj dTerra', 'Mar Azul', 'Palmarejo Palace']
            for i in range(3):
                condo, _ = Condominium.objects.get_or_create(
                    name='Residencial {}'.format(names[i]),
                    defaults={
                        'address': 'Av. principal',
                        'island': 'SANTIAGO',
                        'municipality': 'Praia',
                        'currency': 'CVE'
                    }
                )
                for j in range(6):
                    unit, _ = Unit.objects.get_or_create(
                        condominium=condo,
                        identifier='{}{}'.format(chr(65 + j // 3), 100 + (j % 3)),
                        defaults={
                            'floor': j // 3,
                            'area_m2': random.randint(70, 150),
                            'owner_name': 'Proprietario {}'.format(j),
                            'owner_email': 'owner{}@example.com'.format(j)
                        }
                    )
                    for month in range(1, 3):
                        Fee.objects.get_or_create(
                            condominium=condo,
                            unit=unit,
                            period='2026-{:02d}'.format(month),
                            defaults={
                                'amount': 5500,
                                'due_date': date(2026, month, 15),
                                'status': random.choice(['PAID', 'PENDING', 'OVERDUE'])
                            }
                        )
        except Exception as e:
            self.stdout.write(self.style.WARNING(
                'Condominiums skipped: {}'.format(str(e))
            ))

        self.stdout.write(self.style.SUCCESS('Seeding complete!'))
        self.stdout.write('  Properties: {}'.format(Property.objects.count()))
        self.stdout.write('  Leads:      {}'.format(Lead.objects.count()))
