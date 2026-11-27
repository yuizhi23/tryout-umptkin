import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
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
            self.drawString(36, 810, 'Dokumentasi Spesifikasi Lengkap Fitur & Paket Website Tryout UMPTKIN')
            self.setStrokeColor(colors.HexColor('#E2E8F0'))
            self.setLineWidth(0.5)
            self.line(36, 802, 559, 802)

        # Footer (all pages)
        page_text = f'Halaman {self._pageNumber} dari {page_count}'
        self.drawRightString(559, 22, page_text)
        self.drawString(36, 22, 'Spesifikasi Sistem Tryout SSE UMPTKIN & Platform Bimbel Online')
        self.setStrokeColor(colors.HexColor('#E2E8F0'))
        self.setLineWidth(0.5)
        self.line(36, 32, 559, 32)
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        pdf_public_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=38,
        bottomMargin=38
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
        spaceBefore=9,
        spaceAfter=4,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=5,
        spaceAfter=2,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=3
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=body_style,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2
    )

    th_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=1
    )

    tb_style = ParagraphStyle(
        'TB',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor('#1E293B')
    )

    tb_bold = ParagraphStyle(
        'TBB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor('#0F766E')
    )

    story = []

    # Title & Header
    story.append(Paragraph('DOKUMENTASI LENGKAP FITUR WEBSITE', title_style))
    story.append(Paragraph('PLATFORM SIMULASI TRYOUT SSE UMPTKIN & SISTEM INFORMASI BIMBEL', subtitle_style))
    story.append(HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#0D9488'), spaceAfter=8))

    # Overview
    overview_text = (
        '<b>Ringkasan Sistem:</b> Platform website ini merupakan sistem aplikasi terpadu yang memadukan '
        '<b>Simulasi Ujian Komputer (SSE UMPTKIN)</b> otentik standar nasional, sistem katalog bimbingan belajar '
        'dan e-book, alur pembayaran terintegrasi QRIS &amp; WhatsApp, komunitas belajar calon mahasiswa, serta '
        '<b>Panel Administrator</b> terproteksi untuk pengelolaan konten dan bank soal secara mandiri.'
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 4))

    # TABEL MATRIX FITUR LENGKAP
    story.append(Paragraph('1. Matriks Fitur Lengkap Website Tryout UMPTKIN', h1_style))

    matrix_data = [
        [
            Paragraph('No', th_style),
            Paragraph('Modul / Fitur', th_style),
            Paragraph('Rincian Spesifikasi &amp; Fungsionalitas', th_style),
            Paragraph('Hak Akses', th_style)
        ],
        [
            Paragraph('1', tb_bold),
            Paragraph('<b>Simulasi Ujian SSE UMPTKIN</b>', tb_style),
            Paragraph(
                '• Antarmuka pengerjaan ujian persis aplikasi resmi SSE UMPTKIN Panitia Pusat<br/>'
                '• Memuat 4 subtes lengkap: Penalaran Akademik, Penalaran Matematika, Literasi Bahasa, Literasi Islam<br/>'
                '• Countdown timer mundur 120 menit real-time dengan alert visual waktu kritis<br/>'
                '• Palet navigasi 100-120 soal dengan status warna: Hijau (terjawab), Kuning (ragu), Putih (belum)<br/>'
                '• Pemutar audio listening interaktif pada soal percakapan Bahasa Arab &amp; Inggris<br/>'
                '• Penilaian skor instan (0-100), grafik akurasi per subtes, durasi, dan pembahasan kunci jawaban<br/>'
                '• Leaderboard perankingan nilai peserta nasional yang terupdate otomatis',
                tb_style
            ),
            Paragraph('Peserta', tb_bold)
        ],
        [
            Paragraph('2', tb_bold),
            Paragraph('<b>Katalog Paket Tryout</b>', tb_style),
            Paragraph(
                '• <b>Paket Mandiri Gratis (Rp 0):</b> Ujian latihan dasar pengenalan format SSE UMPTKIN<br/>'
                '• <b>Paket VIP 1 (Rp 10.000):</b> 100 Soal HOTS 120 Menit, audio listening, dan pembahasan lengkap<br/>'
                '• <b>Paket VIP 2 (Rp 15.000):</b> 120 Soal Super Intensif + Analisis Passing Grade kampus pilihan',
                tb_style
            ),
            Paragraph('Peserta', tb_bold)
        ],
        [
            Paragraph('3', tb_bold),
            Paragraph('<b>Katalog Bimbel &amp; E-Book</b>', tb_style),
            Paragraph(
                '• Katalog program bimbingan belajar tatap muka daring (Zoom / Meet) khusus malam hari (19.00 / 20.00 WIB)<br/>'
                '• Pilihan paket fleksibel: 1x Pertemuan (Rp 15k), 4x Pertemuan (Rp 60k), Sampai Ujian (Rp 120k)<br/>'
                '• Paket Promo Best Seller Bimbel Sampai Ujian + E-Book Premium (Rp 130k dari Rp 200k)<br/>'
                '• E-Book Dasar (Rp 70k) dan E-Book Premium (Rp 100k) + 999 Kosakata Arab &amp; Inggris',
                tb_style
            ),
            Paragraph('Peserta', tb_bold)
        ],
        [
            Paragraph('4', tb_bold),
            Paragraph('<b>Transaksi &amp; Pembayaran</b>', tb_style),
            Paragraph(
                '• Halaman pembayaran metode QRIS Nasional (ASPI a.n. Lenny Agustin) semua bank &amp; e-wallet<br/>'
                '• Rekening Bank BRI &amp; akun E-Wallet DANA dilengkapi fitur 1-klik salin nomor rekening<br/>'
                '• Generator konfirmasi bukti transfer otomatis langsung membuka aplikasi WhatsApp admin<br/>'
                '• Fitur simulasi demo pembayaran instan untuk pengujian alur aktivasi paket',
                tb_style
            ),
            Paragraph('Peserta', tb_bold)
        ],
        [
            Paragraph('5', tb_bold),
            Paragraph('<b>Grup Komunitas Belajar (Rp 0)</b>', tb_style),
            Paragraph(
                '• Halaman khusus direktori akses grup WhatsApp gratis bagi calon mahasiswa<br/>'
                '• Memuat: Grup Pejuang PTN, SPAN-UMPTKIN 1-3, Calon Mhs UIN, SNBP-SNBT 1-4, dan 6 Grup Beasiswa KIP Kuliah<br/>'
                '• Barcode QR Code 1-scan langsung bergabung ke grup diskusi dan saluran informasi WhatsApp',
                tb_style
            ),
            Paragraph('Peserta', tb_bold)
        ],
        [
            Paragraph('6', tb_bold),
            Paragraph('<b>Laman Khusus Promosi Akbar</b>', tb_style),
            Paragraph(
                '• Laman interaktif <code>PromoPage</code> dengan tab filter kategori program<br/>'
                '• Menampilkan banner promo, bukti kelulusan alumni, dan dokumentasi kelas live Zoom 1.000+ siswa<br/>'
                '• Tombol pesanan WhatsApp otomatis pada tiap program dan paket belajar',
                tb_style
            ),
            Paragraph('Peserta', tb_bold)
        ],
        [
            Paragraph('7', tb_bold),
            Paragraph('<b>Pemisahan Akses &amp; Login Admin</b>', tb_style),
            Paragraph(
                '• Akses admin terpisah penuh dari tampilan siswa (navbar peserta bersih tanpa tombol admin)<br/>'
                '• Pintu masuk login admin terproteksi di footer (Portal Pengelola Terbatas)<br/>'
                '• Dilengkapi proteksi autentikasi username &amp; password khusus pengelola',
                tb_style
            ),
            Paragraph('Admin', tb_bold)
        ],
        [
            Paragraph('8', tb_bold),
            Paragraph('<b>Panel Administrator Lengkap</b>', tb_style),
            Paragraph(
                '• <b>Kelola Bank Soal:</b> Tambah, edit, dan hapus soal 4 subtes, opsi A-E, kunci &amp; pembahasan<br/>'
                '• <b>Kelola Paket Ujian:</b> Atur nama paket, jumlah butir soal, durasi waktu ujian, dan tarif biaya<br/>'
                '• <b>Data &amp; Hasil Peserta:</b> Pantau nilai ujian, riwayat skor siswa, dan status pendaftaran<br/>'
                '• <b>Verifikasi Transaksi:</b> Rekapitulasi pembayaran masuk &amp; tombol aktivasi paket peserta<br/>'
                '• <b>Tombol Reset Demo:</b> Mengembalikan seluruh database lokal ke setelan awal dengan 1-klik',
                tb_style
            ),
            Paragraph('Admin', tb_bold)
        ],
        [
            Paragraph('9', tb_bold),
            Paragraph('<b>Performa &amp; Infrastruktur</b>', tb_style),
            Paragraph(
                '• Arsitektur Client-Side + CDN: Sanggup menampung <b>10.000 – 50.000+ peserta bersamaan</b> tanpa lag<br/>'
                '• Bebas biaya langganan server bulanan (Zero Hosting Cost / Lifetime Active)<br/>'
                '• Desain Full Responsive: Sangat nyaman dan optimal di HP Android/iOS, Tablet, Laptop, dan PC',
                tb_style
            ),
            Paragraph('Sistem', tb_bold)
        ]
    ]

    t_matrix = Table(matrix_data, colWidths=[20, 125, 325, 53])
    t_matrix.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (3,0), (3,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_matrix)
    story.append(Spacer(1, 6))

    # 2. DETAIL PERBEDAAN WEB PESERTA VS ADMIN
    story.append(Paragraph('2. Detail Spesifikasi Pemisahan Akses (Web Peserta vs Web Admin)', h1_style))
    story.append(Paragraph('• <b>Sisi Web Peserta (Calon Mahasiswa):</b> Tampilan bersih, intuitif, dan bebas dari kontrol admin. Calon mahasiswa hanya dapat mengakses materi edukasi, simulasi CBT, riwayat nilai mandiri, melakukan pembayaran, serta bergabung ke grup komunitas WhatsApp.', bullet_style))
    story.append(Paragraph('• <b>Sisi Web Admin (Pengelola Ujian):</b> Terisolasi di balik autentikasi login tersendiri. Pengelola memiliki kendali penuh terhadap butir soal, penentuan durasi menit ujian, kunci jawaban, aktivasi paket siswa, serta rekapitulasi nilai seluruh peserta di Indonesia.', bullet_style))
    story.append(Paragraph('• <b>Keamanan Sesi:</b> Akses ke dashboard admin secara otomatis ditolak dan diarahkan ke layar otorisasi login jika pengguna belum terverifikasi sebagai administrator.', bullet_style))
    story.append(Spacer(1, 6))

    # 3. TABEL PENAWARAN HARGA
    story.append(Paragraph('3. Paket Penawaran Harga &amp; Spesifikasi Layanan', h1_style))

    pricing_data = [
        [
            Paragraph('Item Penawaran', th_style),
            Paragraph('Keterangan &amp; Fasilitas', th_style),
            Paragraph('Biaya', th_style)
        ],
        [
            Paragraph('<b>Paket Pembuatan Website Platform Tryout UMPTKIN</b>', ParagraphStyle('PL', parent=tb_bold, fontSize=8, textColor=colors.HexColor('#0F172A'))),
            Paragraph(
                'Termasuk seluruh 9 modul &amp; fitur di atas: Engine Simulasi Ujian SSE UMPTKIN Asli, '
                'Bank Soal 4 Subtes, Manajemen Paket Tryout, Katalog Bimbel &amp; E-Book, Checkout QRIS &amp; WA Otomatis, '
                'Komunitas Belajar, Laman Promo, Panel Administrator Terproteksi, serta Masa Aktif Selamanya (Lifetime).',
                tb_style
            ),
            Paragraph('<b>Rp 1.000.000</b>', ParagraphStyle('PR', parent=tb_bold, fontSize=9, alignment=2))
        ],
        [
            Paragraph('<b>Add-on Custom Domain (.com)</b>', ParagraphStyle('PL2', parent=tb_bold, fontSize=8, textColor=colors.HexColor('#0F172A'))),
            Paragraph(
                'Pendaftaran domain resmi pilihan (contoh: <code>tryoutumptkin.com</code> atau <code>infoumptkin.com</code>) '
                'aktif 1 tahun penuh, termasuk konfigurasi DNS &amp; sertifikat SSL Keamanan (HTTPS).',
                tb_style
            ),
            Paragraph('<b>+ Rp 200.000</b>', ParagraphStyle('PR2', parent=tb_bold, fontSize=9, alignment=2))
        ],
        [
            Paragraph('<b>TOTAL LENGKAP (+ Domain .com)</b>', ParagraphStyle('PL3', parent=tb_bold, fontSize=8.5, textColor=colors.HexColor('#0F766E'))),
            Paragraph('<b>Website Platform Tryout Lengkap Siap Pakai + Domain Resmi .com Aktif 1 Tahun Penuh</b>', tb_bold),
            Paragraph('<b>Rp 1.200.000</b>', ParagraphStyle('PR3', parent=tb_bold, fontSize=10.5, alignment=2, textColor=colors.HexColor('#0F766E')))
        ]
    ]

    t_price = Table(pricing_data, colWidths=[150, 253, 120])
    t_price.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('BACKGROUND', (0,1), (-1,1), colors.white),
        ('BACKGROUND', (0,2), (-1,2), colors.HexColor('#F8FAFC')),
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
    print(f'Full feature documentation PDF generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_pdf()
