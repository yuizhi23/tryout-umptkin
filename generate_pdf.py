import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas

pdf_public_path = '/Users/yukiekiyoshi/Downloads/tryout/public/DOKUMENTASI_FITUR_TRYOUT_UMPTKIN.pdf'
pdf_workspace_path = '/Users/yukiekiyoshi/Downloads/tryout/DOKUMENTASI_FITUR_TRYOUT_UMPTKIN.pdf'

def build_pdf():
    # Setup document: clean A4 single page invoice/quotation
    doc = SimpleDocTemplate(
        pdf_public_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=4,
        alignment=0
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0F766E'),
        spaceAfter=15,
        alignment=0
    )

    th_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.white,
        alignment=0
    )

    th_center = ParagraphStyle(
        'THC',
        parent=th_style,
        alignment=1
    )

    th_right = ParagraphStyle(
        'THR',
        parent=th_style,
        alignment=2
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0F172A')
    )

    desc_style = ParagraphStyle(
        'ItemDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155')
    )

    price_style = ParagraphStyle(
        'ItemPrice',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    total_title_style = ParagraphStyle(
        'TotalTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#0F766E')
    )

    total_price_style = ParagraphStyle(
        'TotalPrice',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph('TABEL PENAWARAN HARGA', title_style))
    story.append(Paragraph('PEMBUATAN WEBSITE PLATFORM TRYOUT UMPTKIN', subtitle_style))
    story.append(HRFlowable(width='100%', thickness=2, color=colors.HexColor('#0D9488'), spaceAfter=20))

    # Table Penawaran Harga
    table_data = [
        [
            Paragraph('Item Penawaran', th_style),
            Paragraph('Keterangan &amp; Fasilitas', th_style),
            Paragraph('Biaya', th_right)
        ],
        [
            Paragraph('<b>Pembuatan Website Platform Tryout UMPTKIN</b>', item_title_style),
            Paragraph(
                'Termasuk seluruh 8 fitur di atas (Simulasi SSE, Bank Soal, Bimbel, '
                'QRIS &amp; WA Checkout, Komunitas, Laman Promo, dan Panel Admin)',
                desc_style
            ),
            Paragraph('<b>Rp 1.000.000</b>', price_style)
        ],
        [
            Paragraph('<b>Add-on Custom Domain (.com)</b>', item_title_style),
            Paragraph(
                'Domain resmi pilihan aktif 1 tahun (contoh: <code>tryoutumptkin.com</code> / <code>infoumptkin.com</code>) '
                '+ Konfigurasi DNS &amp; SSL Aman (HTTPS)',
                desc_style
            ),
            Paragraph('<b>+ Rp 200.000</b>', price_style)
        ],
        [
            Paragraph('<b>TOTAL LENGKAP (+ Domain .com)</b>', total_title_style),
            Paragraph(
                '<b>Website Platform Tryout Lengkap Siap Pakai + Domain Resmi .com Aktif 1 Tahun</b>',
                desc_style
            ),
            Paragraph('<b>Rp 1.200.000</b>', total_price_style)
        ]
    ]

    table = Table(table_data, colWidths=[150, 245, 120])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('BACKGROUND', (0,1), (-1,1), colors.white),
        ('BACKGROUND', (0,2), (-1,2), colors.HexColor('#F8FAFC')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#CCFBF1')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.75, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))

    story.append(table)
    story.append(Spacer(1, 25))

    doc.build(story)
    shutil.copyfile(pdf_public_path, pdf_workspace_path)
    print(f'Only-pricing PDF generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_pdf()
