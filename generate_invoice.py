import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas

pdf_public_path = '/Users/yukiekiyoshi/Downloads/tryout/public/INVOICE_TRYOUT_UMPTKIN.pdf'
pdf_workspace_path = '/Users/yukiekiyoshi/Downloads/tryout/INVOICE_TRYOUT_UMPTKIN.pdf'

def build_invoice():
    # Setup single page A4 invoice
    doc = SimpleDocTemplate(
        pdf_public_path,
        pagesize=A4,
        leftMargin=38,
        rightMargin=38,
        topMargin=42,
        bottomMargin=38
    )

    styles = getSampleStyleSheet()

    brand_name = ParagraphStyle(
        'BrandName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A')
    )

    brand_sub = ParagraphStyle(
        'BrandSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#0F766E')
    )

    invoice_badge = ParagraphStyle(
        'InvoiceBadge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    invoice_sub = ParagraphStyle(
        'InvoiceSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        alignment=2,
        textColor=colors.HexColor('#64748B')
    )

    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#64748B')
    )

    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#1E293B')
    )

    meta_val_bold = ParagraphStyle(
        'MetaValBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#0F172A')
    )

    th_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
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

    tb_bold = ParagraphStyle(
        'TBB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#0F172A')
    )

    tb_desc = ParagraphStyle(
        'TBD',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#475569')
    )

    tb_center = ParagraphStyle(
        'TBC',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        alignment=1,
        textColor=colors.HexColor('#1E293B')
    )

    tb_right = ParagraphStyle(
        'TBR',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        alignment=2,
        textColor=colors.HexColor('#1E293B')
    )

    tb_right_bold = ParagraphStyle(
        'TBRB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    total_label = ParagraphStyle(
        'TotalLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        alignment=2,
        textColor=colors.HexColor('#0F172A')
    )

    total_val = ParagraphStyle(
        'TotalVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    note_body = ParagraphStyle(
        'NoteBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=11,
        textColor=colors.HexColor('#475569')
    )

    story = []

    # 1. Header (Yukie Kiyoshi & INVOICE)
    header_data = [
        [
            Paragraph('<b>YUKIE KIYOSHI</b><br/><font color="#0F766E" size="10">Web Development &amp; IT Services</font>', brand_name),
            Paragraph('<b>INVOICE</b><br/><font size="8" color="#64748B">TAGIHAN RESMI</font>', invoice_badge)
        ]
    ]
    t_header = Table(header_data, colWidths=[310, 209])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width='100%', thickness=2, color=colors.HexColor('#0D9488'), spaceAfter=14))

    # 2. Invoice Meta & Client Info (NO JATUH TEMPO)
    info_data = [
        [
            Paragraph('DITUJUKAN KEPADA (KLIEN):', meta_label),
            Paragraph('NOMOR INVOICE:', meta_label),
            Paragraph('INV/2026/XI/TRYOUT-001', meta_val_bold)
        ],
        [
            Paragraph('<b>Lenny Agustin, S. Pd.</b>', meta_val_bold),
            Paragraph('TANGGAL TERBIT:', meta_label),
            Paragraph('27 November 2026', meta_val)
        ],
        [
            Paragraph('Pengelola Program Bimbingan &amp; Tryout UMPTKIN', meta_val),
            Paragraph('PENGEMBANG:', meta_label),
            Paragraph('<b>Yukie Kiyoshi</b>', meta_val_bold)
        ],
        [
            Paragraph('WhatsApp: 0882-4785-4631', meta_val),
            Paragraph('STATUS:', meta_label),
            Paragraph('<font color="#D97706"><b>MENUNGGU PEMBAYARAN</b></font>', meta_val)
        ]
    ]
    t_info = Table(info_data, colWidths=[250, 110, 159])
    t_info.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_info)
    story.append(Spacer(1, 14))

    # 3. Items Table
    items_data = [
        [
            Paragraph('No', th_center),
            Paragraph('Deskripsi Layanan &amp; Rincian Spesifikasi', th_style),
            Paragraph('Qty', th_center),
            Paragraph('Harga Satuan', th_right),
            Paragraph('Subtotal', th_right)
        ],
        [
            Paragraph('1', tb_center),
            Paragraph(
                '<b>Pengembangan Platform Website Simulasi Tryout SSE UMPTKIN 2026</b><br/>'
                '<font color="#475569">'
                '• Engine Simulasi Ujian Mandiri &amp; VIP (SSE UMPTKIN resmi, 4 subtes lengkap)<br/>'
                '• Countdown timer 120 menit real-time &amp; palet nomor soal interaktif (A-E)<br/>'
                '• Player audio listening untuk subtes percakapan Bahasa Arab &amp; Inggris<br/>'
                '• Skoring otomatis (0-100), grafik akurasi per subtes &amp; pembahasan lengkap<br/>'
                '• Katalog program Bimbel tatap muka daring (Zoom) &amp; E-Book terpadu<br/>'
                '• Sistem transaksi QRIS, Rekening BRI &amp; DANA + Generator konfirmasi WA<br/>'
                '• Direktori akses Grup Komunitas Belajar WhatsApp (Rp 0)<br/>'
                '• Laman interaktif Promosi Akbar (PromoPage) dengan tab filter kategori<br/>'
                '• Panel Administrator Terproteksi (Kelola bank soal, paket ujian &amp; rekap nilai)<br/>'
                '• Pemisahan akses penuh antara Web Peserta dan Web Pengelola/Admin<br/>'
                '• Kapasitas serentak 10.000–50.000+ peserta &amp; Bebas biaya langganan bulanan (Lifetime)'
                '</font>',
                tb_desc
            ),
            Paragraph('1 Paket', tb_center),
            Paragraph('Rp 1.000.000', tb_right),
            Paragraph('<b>Rp 1.000.000</b>', tb_right_bold)
        ],
        [
            Paragraph('2', tb_center),
            Paragraph(
                '<b>Registrasi &amp; Setup Custom Domain Resmi (.com) 1 Tahun Penuh</b><br/>'
                '<font color="#475569">'
                '• Pendaftaran nama domain resmi pilihan (contoh: <i>tryoutumptkin.com</i> / <i>infoumptkin.com</i>)<br/>'
                '• Konfigurasi DNS Cloud &amp; Pemasangan Sertifikat Keamanan SSL Resmi (HTTPS 100% Aman)'
                '</font>',
                tb_desc
            ),
            Paragraph('1 Domain', tb_center),
            Paragraph('Rp 200.000', tb_right),
            Paragraph('<b>Rp 200.000</b>', tb_right_bold)
        ],
        # Total Row
        [
            Paragraph('', tb_center),
            Paragraph('<b>TOTAL KESELURUHAN</b>', total_label),
            Paragraph('', tb_center),
            Paragraph('', tb_center),
            Paragraph('<b>Rp 1.200.000</b>', total_val)
        ]
    ]

    t_items = Table(items_data, colWidths=[24, 275, 50, 85, 85])
    t_items.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('VALIGN', (0,3), (-1,3), 'MIDDLE'),
        ('GRID', (0,0), (-1,2), 0.5, colors.HexColor('#CBD5E1')),
        ('LINEBELOW', (0,3), (-1,3), 1.5, colors.HexColor('#0D9488')),
        ('LINEABOVE', (0,3), (-1,3), 1, colors.HexColor('#0D9488')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#F0FDFA')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_items)
    story.append(Spacer(1, 16))

    # 4. Payment Instructions & Terms Box (NO TTD, CLEAN)
    payment_box_data = [
        [
            Paragraph(
                '<b>INSTRUKSI PEMBAYARAN:</b><br/>'
                'Pembayaran tagihan dapat ditransfer melalui salah satu rekening/e-wallet berikut:<br/>'
                '• <b>Jumlah Transfer:</b> <font color="#0F766E"><b>Rp 1.200.000</b> (Satu Juta Dua Ratus Ribu Rupiah)</font><br/>'
                '• <b>Konfirmasi:</b> Kirimkan bukti transfer melalui WhatsApp setelah melakukan pembayaran.<br/>'
                '• Penyerahan akses penuh web &amp; panduan pengoperasian dilakukan setelah pembayaran.',
                note_body
            ),
            Paragraph(
                '<b>CATATAN LAYANAN:</b><br/>'
                '• <b>Masa Aktif Website:</b> Selamanya (Lifetime / Bebas Biaya Bulanan).<br/>'
                '• <b>Masa Aktif Domain:</b> 1 Tahun Penuh sejak tanggal aktivasi.<br/>'
                '• <b>Dukungan Teknis:</b> Termasuk pendampingan dan garansi penyesuaian sistem.<br/>'
                '• <i>Terima kasih atas kerja sama dan kepercayaan Anda.</i>',
                note_body
            )
        ]
    ]
    t_box = Table(payment_box_data, colWidths=[255, 264])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 9),
        ('BOTTOMPADDING', (0,0), (-1,-1), 9),
        ('LEFTPADDING', (0,0), (-1,-1), 9),
        ('RIGHTPADDING', (0,0), (-1,-1), 9),
    ]))
    story.append(t_box)

    doc.build(story)
    shutil.copyfile(pdf_public_path, pdf_workspace_path)
    print(f'Invoice PDF without signature generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_invoice()
