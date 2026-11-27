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

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont('Helvetica', 8)
        self.setFillColor(colors.HexColor('#64748B'))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 810, 'Daftar Fitur & Paket Pembuatan Website Tryout UMPTKIN')
            self.setStrokeColor(colors.HexColor('#E2E8F0'))
            self.setLineWidth(0.5)
            self.line(40, 802, 555, 802)

        # Footer (all pages) - Simple clean page number
        page_text = f'Halaman {self._pageNumber} dari {page_count}'
        self.drawRightString(555, 25, page_text)
        self.drawString(40, 25, 'Spesifikasi & Rincian Paket Website Tryout UMPTKIN')
        self.setStrokeColor(colors.HexColor('#E2E8F0'))
        self.setLineWidth(0.5)
        self.line(40, 35, 555, 35)
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        pdf_public_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0F766E'),
        spaceAfter=8
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#0F766E'),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=4
    )

    table_header_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white,
        alignment=1
    )

    table_body_style = ParagraphStyle(
        'TB',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#1E293B')
    )

    table_body_bold = ParagraphStyle(
        'TBB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#0F766E')
    )

    price_label = ParagraphStyle(
        'PL',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0F172A')
    )

    price_value = ParagraphStyle(
        'PV',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=2,
        textColor=colors.HexColor('#0F766E')
    )

    story = []

    # Title
    story.append(Paragraph('RINCIAN FITUR & PAKET PEMBUATAN WEBSITE', title_style))
    story.append(Paragraph('PLATFORM SIMULASI TRYOUT SSE UMPTKIN & SISTEM INFORMASI BIMBEL', subtitle_style))
    story.append(HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#0D9488'), spaceAfter=8))

    story.append(Paragraph(
        'Berikut adalah rincian lengkap seluruh fitur dan modul yang terdapat di dalam sistem website '
        'Tryout UMPTKIN, beserta paket penawaran pembuatan dan opsi custom domain.',
        body_style
    ))
    story.append(Spacer(1, 4))

    # TABEL FITUR LENGKAP
    story.append(Paragraph('Tabel Rincian Fitur Website', h1_style))

    features_data = [
        [
            Paragraph('No', table_header_style),
            Paragraph('Modul / Fitur', table_header_style),
            Paragraph('Deskripsi &amp; Fungsionalitas', table_header_style),
            Paragraph('Status', table_header_style)
        ],
        [
            Paragraph('1', table_body_bold),
            Paragraph('<b>Sistem Simulasi SSE UMPTKIN</b>', table_body_style),
            Paragraph(
                '• Tampilan &amp; layout menyerupai aplikasi resmi SSE UMPTKIN Panitia Pusat<br/>'
                '• 4 Subtes standar (Penalaran Akademik, MTK Kuantitatif, Literasi Bahasa, Literasi Islam)<br/>'
                '• Timer hitung mundur 120 menit real-time dengan alert otomatis jika waktu kritis<br/>'
                '• Palet nomor soal interaktif dengan status: Hijau (terjawab), Kuning (ragu), Putih (belum)<br/>'
                '• Fitur audio listening player interaktif untuk subtes bahasa Arab &amp; Inggris<br/>'
                '• Penilaian skor instan (0-100), grafik akurasi per subtes, dan kunci pembahasan detail',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('2', table_body_bold),
            Paragraph('<b>Manajemen Paket Tryout</b>', table_body_style),
            Paragraph(
                '• Pilihan Paket Gratis (Latihan dasar)<br/>'
                '• Paket VIP 1 (Rp 10.000 / 100 Soal HOTS 120 Menit + Pembahasan)<br/>'
                '• Paket VIP 2 (Rp 15.000 / 120 Soal Super Intensif + Analisis Passing Grade)<br/>'
                '• Leaderboard peringkat nilai nasional peserta secara real-time',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('3', table_body_bold),
            Paragraph('<b>Katalog Bimbel &amp; E-Book</b>', table_body_style),
            Paragraph(
                '• Halaman katalog program bimbingan belajar tatap muka daring (Zoom / GMeet)<br/>'
                '• Pilihan program: Bimbel 1x (Rp 15k), Bimbel 4x (Rp 60k), Bimbel s.d Ujian (Rp 120k)<br/>'
                '• Paket Promo Best Seller Bimbel + E-Book Premium (Rp 130k)<br/>'
                '• Aturan jadwal malam terstandar (19.00 / 20.00 WIB) bebas pilih materi',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('4', table_body_bold),
            Paragraph('<b>Sistem Pembayaran &amp; Checkout</b>', table_body_style),
            Paragraph(
                '• Halaman transaksi terpadu metode QRIS Nasional (ASPI a.n. Lenny Agustin)<br/>'
                '• Rekening Bank BRI &amp; akun E-Wallet DANA dengan tombol 1-klik salin nomor<br/>'
                '• Form konfirmasi pembayaran otomatis langsung terhubung ke WhatsApp Admin<br/>'
                '• Fitur demo simulasi pembayaran instan untuk keperluan presentasi klien',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('5', table_body_bold),
            Paragraph('<b>Komunitas Grup Belajar (Rp 0)</b>', table_body_style),
            Paragraph(
                '• Direktori akses grup WhatsApp gratis: Pejuang PTN, SPAN-UMPTKIN, Calon Mhs UIN<br/>'
                '• Grup SNBP/SNBT UTBK &amp; 6 Room Grup Beasiswa KIP Kuliah<br/>'
                '• Fitur Scan Barcode / QR Code langsung menuju grup dan saluran resmi',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('6', table_body_bold),
            Paragraph('<b>Laman Khusus Promosi Akbar</b>', table_body_style),
            Paragraph(
                '• Laman interaktif PromoPage dengan navigasi filter tab program<br/>'
                '• Galeri testimoni kelulusan alumni &amp; dokumentasi kelas Zoom 1.000+ peserta<br/>'
                '• Banner promo responsive dan tombol pemesanan WhatsApp otomatis',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('7', table_body_bold),
            Paragraph('<b>Panel Administrator Lengkap</b>', table_body_style),
            Paragraph(
                '• Switcher Dual-Mode instan (Mode Peserta vs Mode Admin)<br/>'
                '• Modul Kelola Bank Soal: Tambah, edit, dan hapus soal, opsi A-E, dan pembahasan<br/>'
                '• Modul Kelola Paket Ujian &amp; pantau rekapitulasi nilai peserta<br/>'
                '• Verifikasi bukti pembayaran peserta &amp; fitur reset data demo 1-klik',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ],
        [
            Paragraph('8', table_body_bold),
            Paragraph('<b>Arsitektur &amp; Performa</b>', table_body_style),
            Paragraph(
                '• Dibangun menggunakan React.js + Tailwind CSS + Lucide Icons yang modern &amp; ringan<br/>'
                '• Desain full responsive (optimal di Smartphone Android/iOS, Tablet, Laptop, &amp; PC)<br/>'
                '• Siap deploy instan tanpa kebutuhan sewa server database bulanan yang mahal',
                table_body_style
            ),
            Paragraph('<b>Included</b>', table_body_bold)
        ]
    ]

    t_feat = Table(features_data, colWidths=[24, 135, 305, 59])
    t_feat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (3,0), (3,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_feat)
    story.append(Spacer(1, 8))

    # TABEL PAKET HARGA
    story.append(Paragraph('Paket Harga &amp; Penawaran', h1_style))

    pricing_data = [
        [
            Paragraph('Item Penawaran', table_header_style),
            Paragraph('Keterangan / Spesifikasi', table_header_style),
            Paragraph('Biaya', table_header_style)
        ],
        [
            Paragraph('<b>Paket Pembuatan Website Tryout UMPTKIN</b>', price_label),
            Paragraph(
                'Termasuk seluruh 8 modul di atas: Sistem Simulasi SSE UMPTKIN asli, Bank Soal, '
                'Katalog Bimbel, Integrasi QRIS &amp; WA Checkout, Komunitas, Laman Promo, dan Panel Admin.',
                table_body_style
            ),
            Paragraph('<b>Rp 1.000.000</b>', price_value)
        ],
        [
            Paragraph('<b>Add-on Custom Domain (.com)</b>', price_label),
            Paragraph(
                'Pendaftaran domain resmi pilihan (contoh: <code>tryoutumptkin.com</code> atau <code>infoumptkin.com</code>) '
                'aktif selama 1 tahun penuh, termasuk konfigurasi DNS &amp; sertifikat SSL aman (HTTPS).',
                table_body_style
            ),
            Paragraph('<b>+ Rp 200.000</b>', price_value)
        ],
        [
            Paragraph('<b>TOTAL PAKET LENGKAP (+ Domain .com)</b>', ParagraphStyle('PT', parent=price_label, textColor=colors.HexColor('#0F766E'), fontSize=9)),
            Paragraph('<b>Website Platform Tryout Lengkap Siap Pakai + Domain Resmi .com Aktif 1 Tahun</b>', table_body_bold),
            Paragraph('<b>Rp 1.200.000</b>', ParagraphStyle('PTV', parent=price_value, fontSize=11, textColor=colors.HexColor('#0F766E')))
        ]
    ]

    t_price = Table(pricing_data, colWidths=[160, 243, 120])
    t_price.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#CCFBF1')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_price)

    doc.build(story, canvasmaker=NumberedCanvas)
    shutil.copyfile(pdf_public_path, pdf_workspace_path)
    print(f'Clean PDF generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_pdf()
