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
        topMargin=38,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    brand_name = ParagraphStyle(
        'BrandName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0F172A')
    )

    invoice_badge = ParagraphStyle(
        'InvoiceBadge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
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
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#1E293B')
    )

    meta_val_bold = ParagraphStyle(
        'MetaValBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#0F172A')
    )

    th_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
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
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#0F172A')
    )

    tb_desc = ParagraphStyle(
        'TBD',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor('#475569')
    )

    tb_center = ParagraphStyle(
        'TBC',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        alignment=1,
        textColor=colors.HexColor('#1E293B')
    )

    tb_right = ParagraphStyle(
        'TBR',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        alignment=2,
        textColor=colors.HexColor('#1E293B')
    )

    tb_right_bold = ParagraphStyle(
        'TBRB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    total_label = ParagraphStyle(
        'TotalLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        alignment=2,
        textColor=colors.HexColor('#0F172A')
    )

    total_val = ParagraphStyle(
        'TotalVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    note_body = ParagraphStyle(
        'NoteBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#475569')
    )

    story = []

    # 1. Header (Yukie Kiyoshi & INVOICE)
    header_data = [
        [
            Paragraph('<b>YUKIE KIYOSHI</b><br/><font color="#0F766E" size="9.5">Web Development &amp; IT Services</font>', brand_name),
            Paragraph('<b>INVOICE TAGIHAN</b><br/><font size="8" color="#64748B">SKEMA TERMIN (50% / 50%)</font>', invoice_badge)
        ]
    ]
    t_header = Table(header_data, colWidths=[310, 209])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width='100%', thickness=2, color=colors.HexColor('#0D9488'), spaceAfter=10))

    # 2. Invoice Meta & Client Info
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
            Paragraph('SKEMA BAYAR:', meta_label),
            Paragraph('<font color="#0F766E"><b>DP 50% + Pelunasan 50%</b></font>', meta_val)
        ]
    ]
    t_info = Table(info_data, colWidths=[250, 110, 159])
    t_info.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
    ]))
    story.append(t_info)
    story.append(Spacer(1, 10))

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
            Paragraph('<b>TOTAL KESELURUHAN PROYEK</b>', total_label),
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
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_items)
    story.append(Spacer(1, 10))

    # 4. TABEL SKEMA PEMBAYARAN TERMIN (DP & PELUNASAN)
    term_title = ParagraphStyle(
        'TermTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#0F766E')
    )

    story.append(Paragraph('<b>Rincian Jadwal Pembayaran Bertahap (Termin):</b>', term_title))
    story.append(Spacer(1, 4))

    term_data = [
        [
            Paragraph('Termin', th_center),
            Paragraph('Keterangan Tahapan', th_style),
            Paragraph('Tanggal Bayar', th_center),
            Paragraph('Persentase', th_center),
            Paragraph('Nominal Pembayaran', th_right)
        ],
        [
            Paragraph('<b>Termin 1</b>', tb_center),
            Paragraph('<b>Down Payment (DP 50%)</b> — Registrasi domain .com &amp; setup server', tb_desc),
            Paragraph('<b>1 Desember 2026</b>', tb_center),
            Paragraph('50%', tb_center),
            Paragraph('<b>Rp 600.000</b>', tb_right_bold)
        ],
        [
            Paragraph('<b>Termin 2</b>', tb_center),
            Paragraph('<b>Pelunasan (50%)</b> — Penyerahan hak akses admin &amp; panduan pengoperasian', tb_desc),
            Paragraph('<b>3 Desember 2026</b>', tb_center),
            Paragraph('50%', tb_center),
            Paragraph('<b>Rp 600.000</b>', tb_right_bold)
        ]
    ]

    t_term = Table(term_data, colWidths=[50, 235, 90, 60, 84])
    t_term.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#FFFBEB')),
        ('BACKGROUND', (0,2), (-1,2), colors.HexColor('#F0FDF4')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_term)
    story.append(Spacer(1, 10))

    # 5. Payment Instructions & Terms Box (BCA 6631276081)
    payment_box_data = [
        [
            Paragraph(
                '<b>REKENING PEMBAYARAN RESMI:</b><br/>'
                'Pembayaran ditransfer langsung ke rekening BCA berikut:<br/>'
                '• <b>Bank:</b> Bank Central Asia (BCA)<br/>'
                '• <b>Nomor Rekening:</b> <font color="#0F766E" size="9"><b>6631276081</b></font><br/>'
                '• <b>Atas Nama:</b> <b>Yukie Kiyoshi</b><br/>'
                '• <b>Konfirmasi:</b> Kirimkan bukti transfer melalui WhatsApp setelah transfer berhasil.',
                note_body
            ),
            Paragraph(
                '<b>KETENTUAN &amp; GARANSI LAYANAN:</b><br/>'
                '• Pendaftaran domain &amp; konfigurasi web dimulai setelah pembayaran DP (1 Des).<br/>'
                '• Penyerahan akses penuh Panel Admin dilakukan setelah Pelunasan (3 Des).<br/>'
                '• <b>Garansi &amp; Pendampingan:</b> 30 hari penuh sejak tanggal serah terima.<br/>'
                '• <i>Terima kasih atas kerja sama dan kepercayaan Kak Lenny Agustin.</i>',
                note_body
            )
        ]
    ]
    t_box = Table(payment_box_data, colWidths=[255, 264])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_box)

    doc.build(story)
    shutil.copyfile(pdf_public_path, pdf_workspace_path)
    print(f'Split payment invoice PDF generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_invoice()
