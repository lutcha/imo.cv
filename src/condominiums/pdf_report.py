"""
Geração de relatório mensal PDF para condomínios.
Utiliza ReportLab (pure Python, sem dependências de sistema).
"""
from io import BytesIO
from django.utils import timezone
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_RIGHT


def generate_monthly_report(condominium, year: int, month: int) -> bytes:
    """
    Gera relatório mensal PDF para um condomínio.
    Retorna os bytes do PDF gerado.

    Args:
        condominium: instância de Condominium
        year: ano do relatório (ex: 2025)
        month: mês do relatório (1-12)
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
    )
    styles = getSampleStyleSheet()
    story = []

    # ── Título ────────────────────────────────────────────────────────────────
    title_style = ParagraphStyle(
        'ReportTitle',
        parent=styles['Title'],
        fontSize=18,
        spaceAfter=0.3 * cm,
        alignment=TA_CENTER,
    )
    story.append(Paragraph(condominium.name, title_style))

    month_names = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ]
    subtitle = f'Relatório Mensal — {month_names[month - 1]} {year}'
    story.append(Paragraph(subtitle, styles['Normal']))
    story.append(Spacer(1, 0.5 * cm))
    story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#1E3A8A')))
    story.append(Spacer(1, 0.4 * cm))

    # ── Informações do condomínio ─────────────────────────────────────────────
    story.append(Paragraph('Informações Gerais', styles['Heading2']))
    info_data = [
        ['Ilha', condominium.get_island_display() if hasattr(condominium, 'get_island_display') else condominium.island],
        ['Morada', condominium.address or '—'],
        ['Moeda', condominium.currency],
    ]
    if condominium.municipality:
        info_data.insert(1, ['Município', condominium.municipality])

    info_table = Table(info_data, colWidths=[5 * cm, 11 * cm])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F0F4FF')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CCCCCC')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 0.5 * cm))

    # ── Resumo de quotas ──────────────────────────────────────────────────────
    # Fee tem FK directa para condominium e campo due_date (DateField)
    from condominiums.models import Fee

    fees = Fee.objects.filter(
        condominium=condominium,
        due_date__year=year,
        due_date__month=month,
    )
    total = sum(f.amount for f in fees)
    paid = sum(f.amount for f in fees if f.status == Fee.Status.PAID)
    overdue = sum(f.amount for f in fees if f.status == Fee.Status.OVERDUE)
    pending = total - paid - overdue

    story.append(Paragraph('Quotas', styles['Heading2']))
    fee_data = [
        ['Descrição', f'Valor ({condominium.currency})'],
        ['Total emitido', f'{total:,.0f}'],
        ['Pago', f'{paid:,.0f}'],
        ['Em atraso', f'{overdue:,.0f}'],
        ['Pendente', f'{pending:,.0f}'],
    ]
    fee_table = Table(fee_data, colWidths=[12 * cm, 4 * cm])
    fee_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E3A8A')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0F4FF')]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CCCCCC')),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(fee_table)
    story.append(Spacer(1, 0.5 * cm))

    # ── Manutenções do mês ────────────────────────────────────────────────────
    # MaintenanceRequest tem FK directa para condominium, campo title e created_at
    from condominiums.models import MaintenanceRequest

    maintenances = MaintenanceRequest.objects.filter(
        condominium=condominium,
        created_at__year=year,
        created_at__month=month,
    ).order_by('-priority', 'created_at')

    story.append(Paragraph('Manutenções Reportadas', styles['Heading2']))
    if maintenances.exists():
        maint_data = [['Título', 'Prioridade', 'Estado', 'Data']]
        for m in maintenances:
            maint_data.append([
                m.title,
                m.get_priority_display(),
                m.get_status_display(),
                m.created_at.strftime('%d/%m/%Y'),
            ])
        maint_table = Table(maint_data, colWidths=[7 * cm, 3 * cm, 3 * cm, 3 * cm])
        maint_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E3A8A')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0F4FF')]),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CCCCCC')),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ]))
        story.append(maint_table)
    else:
        story.append(Paragraph('Sem manutenções reportadas neste período.', styles['Normal']))

    story.append(Spacer(1, 0.5 * cm))

    # ── Avisos publicados no mês ──────────────────────────────────────────────
    from condominiums.models import Notice

    notices = Notice.objects.filter(
        condominium=condominium,
        created_at__year=year,
        created_at__month=month,
    ).order_by('-created_at')

    story.append(Paragraph('Avisos', styles['Heading2']))
    if notices.exists():
        notice_data = [['Título', 'Data']]
        for n in notices:
            notice_data.append([n.title, n.created_at.strftime('%d/%m/%Y')])
        notice_table = Table(notice_data, colWidths=[13 * cm, 3 * cm])
        notice_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E3A8A')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0F4FF')]),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CCCCCC')),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ]))
        story.append(notice_table)
    else:
        story.append(Paragraph('Sem avisos publicados neste período.', styles['Normal']))

    story.append(Spacer(1, 0.5 * cm))

    # ── Rodapé ────────────────────────────────────────────────────────────────
    story.append(HRFlowable(width='100%', thickness=0.5, color=colors.HexColor('#CCCCCC')))
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.grey,
        alignment=TA_CENTER,
    )
    story.append(Paragraph(
        f'Relatório gerado em {timezone.now().strftime("%d/%m/%Y %H:%M")} · imo.cv',
        footer_style,
    ))

    doc.build(story)
    return buffer.getvalue()
