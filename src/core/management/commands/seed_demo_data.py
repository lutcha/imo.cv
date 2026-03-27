import random
from datetime import date, timedelta, datetime
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from django.db import connection

User = get_user_model()

# =============================================================================
# S7-A: Dados Reais de Cabo Verde para Seed Enriquecida
# =============================================================================

# Nomes próprios comuns em Cabo Verde (fonte: nomesproprios.com/cabo-verde)
FEMALE_NAMES = [
    'Maria', 'Ana', 'Joana', 'Domingas', 'Francisca', 'Carla', 'Sandra',
    'Isabel', 'Margarida', 'Rosa', 'Edna', 'Filomena', 'Paula', 'Manuela',
    'Eunice', 'Albertina', 'Helena', 'Neusa', 'Idalina', 'Arlinda',
    'Fernanda', 'Ivanilda', 'Samira', 'Vera', 'Luisa', 'Marcelina',
    'Catarina', 'Elsa', 'Teresa', 'Ermelinda', 'Cesaltina', 'Matilde',
    'Alice', 'Marlene', 'Adelina', 'Josefa', 'Eloisa', 'Aldina',
]

MALE_NAMES = [
    'Manuel', 'Carlos', 'Adilson', 'Domingos', 'Francisco', 'Pedro',
    'Paulo', 'Jorge', 'Nelson', 'Fernando', 'Emanuel', 'Joaquim',
    'Arlindo', 'Daniel', 'Nilton', 'Alberto', 'Euclides', 'Jose',
    'Jailson', 'Victor', 'Gilson', 'Miguel', 'Edson', 'Alcides',
    'Odair', 'Helder', 'Silvino', 'Edmilson', 'Augusto', 'Rui',
    'Osvaldo', 'Orlando', 'Antonio', 'Eduardo', 'Jair', 'Celestino',
]

# Sobrenomes comuns em Cabo Verde
SURNAMES = [
    'Silva', 'Santos', 'Fernandes', 'Lopes', 'Gomes', 'Pereira',
    'Rodrigues', 'Martins', 'Jesus', 'Sousa', 'Barros', 'Nunes',
    'Ribeiro', 'Carvalho', 'Dias', 'Moreira', 'Costa', 'Oliveira',
    'Varela', 'Semedo', 'Pina', 'Tavares', 'Correia', 'Mendes',
    'Cardoso', 'Teixeira', 'Nascimento', 'Ramos', 'Garcia', 'Medina',
]

# Bairros reais de Praia, Santiago (fonte: Câmara Municipal da Praia)
PRAIA_NEIGHBORHOODS = [
    'Achada Grande Frente', 'Achada Grande Trás', 'Achada Santo António',
    'Água de Cão', 'Bairro Piquinhos', 'Calabaceira', 'Castelo',
    'Chã de Areia', 'Cidade Velha', 'Cova da Inglesa', 'Fazenda',
    'Fidj dTerra', 'Fonte Filipe', 'Ganacão', 'Gomara',
    'Kumprido', 'Lem Ferreira', 'Madina', 'Malcriada',
    'Palmarejo', 'Palmarejo Baixo', 'Pedra Badejo', 'Ponta dTerra',
    'Prainha', 'Quebra Canela', 'Relógio', 'Santa Catarina',
    'São Brás', 'Tira Chapéu', 'Vila Nova',
]

# Bairros reais de Mindelo, São Vicente
MINDELO_NEIGHBORHOODS = [
    'Belo Horizonte', 'Chã de Cemitério', 'Curralinho',
    'Fonte de Lima', 'Lombo de Steu', 'Miradouro',
    'Monte Sossego', 'Pedra Lume', 'Ribeira Bote',
    'Salina', 'São Pedro', 'Torrinha',
]

# Bairros reais de Santa Maria, Sal
SAL_NEIGHBORHOODS = [
    'Centro', 'Dunas', 'Fontona', 'Murdeira',
    'Ponta Sino', 'Santa Maria', 'Terra Brava',
]

# Nomes de condomínios reais/realistas de Cabo Verde
CONDO_NAMES_SANTIAGO = [
    'Residencial Fidj dTerra', 'Condomínio Palmarejo', 'Edifício Tulipa',
    'Residencial Quebra Canela', 'Condomínio Tira Chapéu',
    'Residencial Santa Catarina', 'Edifício Mar Azul', 'Condomínio Prainha',
    'Residencial Vila Nova', 'Condomínio São Brás',
]

CONDO_NAMES_SAL = [
    'Residencial Santa Maria', 'Condomínio Dunas', 'Edifício Oasis',
    'Residencial Fontona', 'Condomínio Murdeira', 'Residencial Terra Brava',
]

CONDO_NAMES_SAo_VICENTE = [
    'Condomínio Mindelo', 'Residencial Belo Horizonte', 'Edifício Miradouro',
    'Residencial Salina', 'Condomínio São Pedro', 'Residencial Fonte de Lima',
]

# Empresas de manutenção reais/realistas em CV
MAINTENANCE_PROVIDERS = [
    ('Carlos Reparos', '+238 991 23 45'),
    ('João Elétrico', '+238 992 34 56'),
    ('Maria Limpezas', '+238 993 45 67'),
    ('Silva Construções', '+238 994 56 78'),
    ('CV Climatização', '+238 995 67 89'),
    ('Atlântico Piscinas', '+238 996 78 90'),
    ('Ilha Verde Jardins', '+238 997 89 01'),
    ('Rápido Reparações', '+238 998 90 12'),
]

# Tipos de manutenção comuns
MAINTENANCE_TITLES = [
    'Fuga de água na cozinha',
    'Avaria no elevador',
    'Lâmpadas queimadas no corredor',
    'Portão da entrada avariado',
    'Limpeza de calhas',
    'Reparação de bomba de água',
    'Manutenção de piscina',
    'Janela partida no hall',
    'Problema no sistema elétrico',
    'Infiltração no teto',
    'Ar condicionado avariado',
    'Fechadura da porta principal',
]

# Descrições de manutenções
MAINTENANCE_DESCRIPTIONS = [
    'Necessário reparar com urgência para evitar danos maiores.',
    'A situação está a piorar com a chuva.',
    'Moradores reclamaram várias vezes.',
    'Precisa de inspeção técnica.',
    'Orçamento já foi solicitado.',
    'Urgente para segurança dos moradores.',
]

# Títulos de avisos/comunicados
NOTICE_TITLES = [
    'Interrupção de água agendada',
    'Reunião de condomínio',
    'Nova regra de uso da piscina',
    'Aviso sobre lixo e reciclagem',
    'Manutenção do elevador',
    'Festa de condomínio',
    'Aviso de segurança',
    'Atualização de quotas',
]

# Conteúdos de avisos
NOTICE_BODIES = [
    'Informamos que haverá interrupção no fornecimento de água no dia 15 das 8h às 12h para manutenção das bombas. Pedimos desculpa pelo incómodo.',
    'Convocamos todos os proprietários para reunião ordinária no dia 20 às 18h na sala de reuniões. Pauta: aprovação de contas e obras previstas.',
    'A partir do próximo mês, a piscina funcionará das 7h às 20h. É obrigatório o uso de touca e chinelos. Crianças devem estar acompanhadas.',
    'Lembramos que o lixo deve ser depositado nos contentores adequados até às 20h. A reciclagem é obrigatória.',
    'O elevador passará por manutenção preventiva no dia 10. O serviço estará indisponível das 9h às 17h.',
    'No próximo sábado teremos a nossa festa anual de condomínio. Contamos com a presença de todos!',
]


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
        demo_agency, _ = Agency.objects.get_or_create(
            slug='imobiliaria-praia',
            defaults={
                'name': 'Imobiliária Praia',
                'nif': '123456789',
                'email': 'contato@praia.cv',
                'phone': '+238 9911234',
                'website': 'https://praia.cv',
                'subscription_plan': 'PRO',
                'is_verified': True,
                'docs_approved': True,
                'rating': 4.5,
            }
        )
        # Link demo agents to their agency
        for agent in [agent1, agent2]:
            if not agent.agency_id:
                agent.agency = demo_agency
                agent.role = User.Role.AGENT
                agent.save()

        # Síndico / Gestor de Condomínio
        sindico, _ = User.objects.get_or_create(
            username='sindico@imo.cv',
            defaults={
                'email': 'sindico@imo.cv',
                'first_name': 'António',
                'last_name': 'Correia',
                'role': 'CONDOMINIUM_MANAGER',
                'is_staff': True,
            }
        )
        sindico.set_password('imo123')
        sindico.role = 'CONDOMINIUM_MANAGER'
        sindico.save()

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

        self.stdout.write(self.style.SUCCESS('Properties and leads done.'))
        self.stdout.write('  Properties: {}'.format(Property.objects.count()))
        self.stdout.write('  Leads:      {}'.format(Lead.objects.count()))

        # =============================================================================
        # S7-A: Condomínios Enriquecidos com Dados Reais de Cabo Verde
        # =============================================================================
        self.stdout.write('Creating 8 condominiums with real CV data...')
        try:
            from condominiums.models import Condominium, Unit, Fee, MaintenanceRequest, Notice, CommonArea, Reservation
            
            # Criar 8 condomínios: 3 Santiago, 2 Sal, 2 São Vicente, 1 Boa Vista
            condo_configs = [
                # Santiago (3)
                {'name': CONDO_NAMES_SANTIAGO[0], 'island': 'SANTIAGO', 'municipality': 'Praia', 'neighborhoods': PRAIA_NEIGHBORHOODS, 'condos_count': 3},
                {'name': CONDO_NAMES_SANTIAGO[1], 'island': 'SANTIAGO', 'municipality': 'Praia', 'neighborhoods': PRAIA_NEIGHBORHOODS, 'condos_count': 3},
                {'name': CONDO_NAMES_SANTIAGO[2], 'island': 'SANTIAGO', 'municipality': 'Praia', 'neighborhoods': PRAIA_NEIGHBORHOODS, 'condos_count': 3},
                # Sal (2)
                {'name': CONDO_NAMES_SAL[0], 'island': 'SAL', 'municipality': 'Sal', 'neighborhoods': SAL_NEIGHBORHOODS, 'condos_count': 2},
                {'name': CONDO_NAMES_SAL[1], 'island': 'SAL', 'municipality': 'Sal', 'neighborhoods': SAL_NEIGHBORHOODS, 'condos_count': 2},
                # São Vicente (2)
                {'name': CONDO_NAMES_SAo_VICENTE[0], 'island': 'SAO_VICENTE', 'municipality': 'São Vicente', 'neighborhoods': MINDELO_NEIGHBORHOODS, 'condos_count': 2},
                {'name': CONDO_NAMES_SAo_VICENTE[1], 'island': 'SAO_VICENTE', 'municipality': 'São Vicente', 'neighborhoods': MINDELO_NEIGHBORHOODS, 'condos_count': 2},
                # Boa Vista (1)
                {'name': 'Residencial Sal Rei', 'island': 'BOA_VISTA', 'municipality': 'Boa Vista', 'neighborhoods': ['Sal Rei', 'Centro', 'Rabil'], 'condos_count': 1},
            ]
            
            all_units = []
            all_condos = []
            
            for config in condo_configs:
                # Criar condomínio
                condo, _ = Condominium.objects.get_or_create(
                    name=config['name'],
                    defaults={
                        'address': '{}, {}'.format(random.choice(config['neighborhoods']), config['municipality']),
                        'island': config['island'],
                        'municipality': config['municipality'],
                        'currency': 'CVE',
                        'manager': sindico,
                        'is_active': True
                    }
                )
                # Ensure manager is always set (idempotent re-runs)
                if not condo.manager:
                    condo.manager = sindico
                    condo.save(update_fields=['manager'])
                all_condos.append(condo)
                self.stdout.write('  Created condo: {}'.format(condo.name))
                
                # Criar 10-15 unidades por condomínio
                num_units = random.randint(10, 15)
                for j in range(num_units):
                    floor = j // 3
                    unit_identifier = '{}{}'.format(chr(65 + (j % 3)), 100 + j)
                    
                    # Gerar nome de proprietário cabo-verdiano realista
                    first_name = random.choice(MALE_NAMES if random.random() > 0.5 else FEMALE_NAMES)
                    last_name = random.choice(SURNAMES)
                    owner_name = '{} {}'.format(first_name, last_name)
                    
                    # Gerar telefone CV realista: +238 9XXXXXX (7 dígitos)
                    owner_phone = '+238 9{:02d}{:04d}'.format(
                        random.randint(10, 99),
                        random.randint(1000, 9999)
                    )
                    
                    unit, _ = Unit.objects.get_or_create(
                        condominium=condo,
                        identifier=unit_identifier,
                        defaults={
                            'floor': floor,
                            'area_m2': random.randint(70, 180),
                            'owner_name': owner_name,
                            'owner_phone': owner_phone,
                            'owner_email': '{}.{}@gmail.com'.format(
                                first_name.lower(),
                                last_name.lower()
                            )
                        }
                    )
                    all_units.append(unit)
                    
                    # Criar 6 meses de histórico de quotas (Agosto 2025 - Janeiro 2026)
                    # Distribuição realista: 85% pagas, 10% pendentes, 5% em atraso
                    for month in range(8, 14):
                        year = 2025 if month <= 12 else 2026
                        period_month = month if month <= 12 else month - 12
                        period = '{}-{:02d}'.format(year, period_month)
                        due_date = date(year, period_month, 15)
                        
                        # Status baseado em distribuição realista
                        rand = random.random()
                        if rand < 0.85:
                            status = 'PAID'
                            paid_at = due_date + timedelta(days=random.randint(-5, 10))
                        elif rand < 0.95:
                            status = 'PENDING'
                            paid_at = None
                        else:
                            status = 'OVERDUE'
                            paid_at = None
                        
                        Fee.objects.get_or_create(
                            condominium=condo,
                            unit=unit,
                            period=period,
                            defaults={
                                'amount': random.randint(4500, 8500),
                                'currency': 'CVE',
                                'due_date': due_date,
                                'status': status,
                                'paid_at': paid_at
                            }
                        )
                
                # Criar 3 áreas comuns por condomínio
                common_area_types = [
                    ('Piscina', 50, 'Máximo 2 horas por reserva. Horário: 8h-20h.', True, 2500, False),
                    ('Salão de Festas', 30, 'Reserva para máximo 50 pessoas. Limpeza obrigatória após uso.', True, 5000, False),
                    ('Ginásio', 15, 'Uso gratuito. Horário: 6h-22h.', False, None, False),
                    ('Churrasqueira', 20, 'Reserva obrigatória. Proibido após 22h.', True, 1500, True),
                    ('Campo de Ténis', 4, 'Reserva de 1h em 1h. Gratuito.', False, None, True),
                    ('Parque Infantil', None, 'Acesso livre. Crianças acompanhadas.', False, None, True),
                ]
                
                num_areas = min(3, len(common_area_types))
                selected_areas = random.sample(common_area_types, num_areas)
                
                for area_config in selected_areas:
                    common_area, _ = CommonArea.objects.get_or_create(
                        condominium=condo,
                        name=area_config[0],
                        defaults={
                            'capacity': area_config[1],
                            'rules': area_config[2],
                            'requires_payment': area_config[3],
                            'price_cve': area_config[4],
                            'is_outdoor': area_config[5],
                            'is_active': True
                        }
                    )
                    
                    # Criar 5 reservas por área comum
                    for _ in range(5):
                        # Gerar data aleatória nos próximos 30 dias
                        days_offset = random.randint(-10, 20)
                        start_date = datetime.now() + timedelta(days=days_offset)
                        start_hour = random.randint(8, 20)
                        start_datetime = start_date.replace(hour=start_hour, minute=0, second=0)
                        end_datetime = start_datetime + timedelta(hours=random.randint(1, 3))
                        
                        # Selecionar unidade aleatória do condomínio
                        condo_units = Unit.objects.filter(condominium=condo)
                        selected_unit = random.choice(condo_units) if condo_units.exists() else None
                        
                        if selected_unit:
                            Reservation.objects.get_or_create(
                                common_area=common_area,
                                unit=selected_unit,
                                start_datetime=start_datetime,
                                defaults={
                                    'resident_name': selected_unit.owner_name,
                                    'resident_phone': selected_unit.owner_phone,
                                    'end_datetime': end_datetime,
                                    'status': random.choice(['PENDING', 'CONFIRMED', 'CONFIRMED', 'COMPLETED']),
                                    'notes': random.choice(['', 'Aniversário', 'Reunião familiar', '']),
                                    'paid_amount_cve': common_area.price_cve if common_area.requires_payment else None
                                }
                            )
                
                # Criar 3 manutenções por condomínio
                for _ in range(3):
                    provider = random.choice(MAINTENANCE_PROVIDERS)
                    m_status = random.choice(['OPEN', 'IN_PROGRESS', 'RESOLVED'])
                    MaintenanceRequest.objects.get_or_create(
                        condominium=condo,
                        title=random.choice(MAINTENANCE_TITLES),
                        defaults={
                            'description': random.choice(MAINTENANCE_DESCRIPTIONS),
                            'status': m_status,
                            'priority': random.choice(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
                            'assigned_to_name': provider[0],
                            'assigned_to_phone': provider[1],
                            'estimated_cost_cve': random.randint(5000, 50000),
                            'actual_cost_cve': random.randint(5000, 50000) if m_status == 'RESOLVED' else None,
                            'resolution_notes': 'Trabalho concluído com sucesso.' if m_status == 'RESOLVED' else '',
                        }
                    )
                
                # Criar 2 avisos por condomínio
                for _ in range(2):
                    notice_date = datetime.now() - timedelta(days=random.randint(0, 30))
                    Notice.objects.get_or_create(
                        condominium=condo,
                        title=random.choice(NOTICE_TITLES),
                        defaults={
                            'body': random.choice(NOTICE_BODIES),
                            'published_at': notice_date,
                        }
                    )
                    
        except Exception as e:
            self.stdout.write(self.style.WARNING(
                'Condominiums with real data skipped: {}'.format(str(e))
            ))
        
        self.stdout.write(self.style.SUCCESS('\nSeeding complete!'))
        self.stdout.write('  Properties: {}'.format(Property.objects.count()))
        self.stdout.write('  Leads:      {}'.format(Lead.objects.count()))
        self.stdout.write('  Condominiums: {}'.format(Condominium.objects.count() if 'Condominium' in locals() else 0))
        self.stdout.write('  Units:        {}'.format(Unit.objects.count() if 'Unit' in locals() else 0))
        self.stdout.write('  Fees:         {}'.format(Fee.objects.count() if 'Fee' in locals() else 0))
