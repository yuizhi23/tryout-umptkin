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
            self.drawString(40, 810, 'Tryout UMPTKIN 2026 • Dokumentasi Spesifikasi & Panduan Lengkap Fitur Platform')
            self.setStrokeColor(colors.HexColor('#E2E8F0'))
            self.setLineWidth(0.5)
            self.line(40, 802, 555, 802)

        # Footer (all pages)
        page_text = f'Halaman {self._pageNumber} dari {page_count}'
        self.drawRightString(555, 25, page_text)
        self.drawString(40, 25, '© 2026 Tryout UMPTKIN • Official Program bersama Lenny Agustin, S. Pd.')
        self.setStrokeColor(colors.HexColor('#E2E8F0'))
        self.setLineWidth(0.5)
        self.line(40, 35, 555, 35)
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        pdf_public_path,
        pagesize=A4,
        leftMargin=38,
        rightMargin=38,
        topMargin=42,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0F766E'),
        spaceAfter=10
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#0F766E'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=6,
        spaceAfter=3,
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

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=body_style,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2.5
    )

    table_header_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=1
    )

    table_body_style = ParagraphStyle(
        'TB',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#1E293B')
    )

    table_body_bold = ParagraphStyle(
        'TBB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#0F766E')
    )

    story = []

    # Title & Header
    story.append(Paragraph('DOKUMENTASI LENGKAP FITUR WEBSITE', title_style))
    story.append(Paragraph('PLATFORM SIMULASI TRYOUT SSE UMPTKIN 2026 & PROGRAM BIMBEL RESMI', subtitle_style))
    story.append(HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#0D9488'), spaceAfter=8))

    # Ringkasan Eksekutif
    overview_text = (
        '<b>Ringkasan Eksekutif:</b><br/>'
        'Dokumen ini menyajikan uraian komprehensif seluruh fitur, modul, arsitektur data, paket pembelajaran, '
        'dan alur transaksi pada website <b>Tryout UMPTKIN 2026</b>. Seluruh fungsionalitas dirancang responsif, '
        'modern, interaktif (berbasis state lokal &amp; localStorage tanpa memerlukan backend eksternal), serta '
        'terintegrasi penuh dengan program bimbingan dan media resmi <b>Lenny Agustin, S. Pd.</b>'
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 6))

    # 1. Identitas & Navigasi
    story.append(Paragraph('1. Identitas Visual, Navigasi &amp; Dual-Mode (Peserta vs Admin)', h1_style))
    story.append(Paragraph('• <b>Identitas &amp; Logo Resmi:</b> Menggunakan logo resmi PNG transparan beresolusi tinggi (INFO UMPTKIN) di seluruh elemen header, navbar, footer, sidebar admin, halaman ujian, dan favicon browser.', bullet_style))
    story.append(Paragraph('• <b>Dual-Mode Instan:</b> Switcher interaktif untuk beralih antara <i>Mode Peserta</i> dan <i>Mode Admin</i> tanpa perlu autentikasi backend yang rumit, sangat ideal untuk presentasi demo ke klien.', bullet_style))
    story.append(Paragraph('• <b>Navbar Responsif &amp; Rapi:</b> Memuat brand identity SSE 2026, menu Beranda, Paket Tryout, shortcut Promo Spesial (dengan indikator live), Grup Belajar (Rp 0), profil avatar calon mahasiswa, dan drawer mobile.', bullet_style))
    story.append(Paragraph('• <b>Footer Informatif:</b> Navigasi cepat, daftar 4 subtes resmi, informasi kontak resmi (WhatsApp, Instagram @info.umptkin &amp; @lennyagustin10, YouTube Lenny Agustin), serta copyright resmi.', bullet_style))
    story.append(Spacer(1, 4))

    # 2. Simulasi CBT / SSE UMPTKIN
    story.append(Paragraph('2. Sistem Simulasi Ujian Komputer (SSE UMPTKIN 2026)', h1_style))
    story.append(Paragraph('• <b>Tampilan Otentik SSE:</b> Antarmuka pengerjaan ujian didesain presisi menyerupai Sistem Seleksi Elektronik resmi Panitia Pusat UMPTKIN, minim distraksi, dan fokus pada layar soal.', bullet_style))
    story.append(Paragraph('• <b>4 Subtes Standar Nasional:</b> Terdiri dari Tes Potensi Skolastik (TPS), Literasi Bahasa Indonesia, Literasi Bahasa Inggris, dan Penalaran Matematika.', bullet_style))
    story.append(Paragraph('• <b>Countdown Timer Real-Time:</b> Timer hitung mundur otomatis dengan peringatan visual berkedip saat sisa waktu memasuki fase kritis (&lt; 5 menit). Sesi otomatis tersubmit jika waktu habis.', bullet_style))
    story.append(Paragraph('• <b>Navigasi Soal Fleksibel:</b> Palet nomor soal interaktif dengan indikator status warna: Hijau (sudah terjawab), Kuning (ditandai ragu-ragu), dan Putih/Abu-abu (belum dikerjakan).', bullet_style))
    story.append(Paragraph('• <b>Interaksi Jawaban Lengkap:</b> Memilih opsi A-E, mengubah jawaban, menandai/membatalkan tanda ragu-ragu, serta tombol hapus jawaban.', bullet_style))
    story.append(Paragraph('• <b>Simulasi Audio Listening:</b> Preview pemutar audio listening (seperti soal nomor 61 pada poster resmi) untuk subtes literasi bahasa.', bullet_style))
    story.append(Paragraph('• <b>Hasil &amp; Analisis Skor Instan:</b> Perhitungan nilai otomatis skala 0-100, grafik akurasi per subtes, durasi pengerjaan, status kelulusan, dan pembahasan komprehensif kunci jawaban.', bullet_style))
    story.append(Paragraph('• <b>Leaderboard Nasional:</b> Peringkat peserta terupdate secara dinamis membandingkan skor total dengan ribuan peserta simulasi lainnya di seluruh Indonesia.', bullet_style))
    story.append(Spacer(1, 4))

    # 3. Tabel Paket Simulasi
    story.append(Paragraph('3. Daftar Paket Simulasi Ujian di Platform', h1_style))
    pkg_data = [
        [Paragraph('Kode', table_header_style), Paragraph('Nama Paket', table_header_style), Paragraph('Soal / Durasi', table_header_style), Paragraph('Biaya', table_header_style), Paragraph('Fasilitas &amp; Keunggulan', table_header_style)],
        [Paragraph('TO-01', table_body_bold), Paragraph('Simulasi Mandiri Gratis UMPTKIN', table_body_style), Paragraph('20 Soal<br/>30 Menit', table_body_style), Paragraph('<b>GRATIS</b>', table_body_style), Paragraph('Pengenalan format soal SSE, timer real-time, analisis nilai instan.', table_body_style)],
        [Paragraph('TO-VIP-01', table_body_bold), Paragraph('Simulasi VIP UMPTKIN 2026 (Paket Utama)', table_body_style), Paragraph('100 Soal<br/>120 Menit', table_body_style), Paragraph('<b>Rp 10.000</b><br/><font color="#94A3B8"><s>Rp 25.000</s></font>', table_body_style), Paragraph('Vibes asli SSE UMPTKIN 2026, 100 soal HOTS, timer 120 menit, pembahasan detail, leaderboard nasional.', table_body_style)],
        [Paragraph('TO-VIP-02', table_body_bold), Paragraph('Simulasi 3 VIP UMPTKIN 2026 (Komprehensif)', table_body_style), Paragraph('120 Soal<br/>120 Menit', table_body_style), Paragraph('<b>Rp 15.000</b><br/><font color="#94A3B8"><s>Rp 35.000</s></font>', table_body_style), Paragraph('Bank soal komprehensif 120 soal, radar analisis kelemahan subtes, prediksi passing grade kampus.', table_body_style)],
    ]
    t_pkg = Table(pkg_data, colWidths=[45, 145, 75, 70, 184])
    t_pkg.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_pkg)
    story.append(Spacer(1, 6))

    # 4. Program Bimbel & E-Book
    story.append(Paragraph('4. Program Bimbingan Belajar (Bimbel) &amp; Katalog E-Book', h1_style))
    bimbel_data = [
        [Paragraph('No', table_header_style), Paragraph('Program / Produk', table_header_style), Paragraph('Kategori', table_header_style), Paragraph('Harga Promo', table_header_style), Paragraph('Keterangan &amp; Ketentuan', table_header_style)],
        [Paragraph('1', table_body_bold), Paragraph('E-Book Dasar', table_body_style), Paragraph('E-Book', table_body_style), Paragraph('<b>Rp 45.000</b><br/><font color="#94A3B8"><s>70.000</s></font>', table_body_style), Paragraph('Rangkuman materi dasar semua subtes UMPTKIN beserta bank rumus praktis.', table_body_style)],
        [Paragraph('2', table_body_bold), Paragraph('E-Book Premium', table_body_style), Paragraph('E-Book', table_body_style), Paragraph('<b>Rp 75.000</b><br/><font color="#94A3B8"><s>100.000</s></font>', table_body_style), Paragraph('Bedah tuntas soal HOTS 5 tahun terakhir, trik kilat eliminasi jawaban.', table_body_style)],
        [Paragraph('3', table_body_bold), Paragraph('Bimbel 1x Pertemuan', table_body_style), Paragraph('Bimbel Satuan', table_body_style), Paragraph('<b>Rp 15.000</b>', table_body_style), Paragraph('Bebas pilih materi apa saja &amp; bebas pilih 1 jadwal malam hari via Zoom.', table_body_style)],
        [Paragraph('4', table_body_bold), Paragraph('Bimbel 4x Pertemuan', table_body_style), Paragraph('Bimbel Intensif', table_body_style), Paragraph('<b>Rp 60.000</b>', table_body_style), Paragraph('Paket hemat 4x sesi intensif bedah materi dan latihan soal interaktif.', table_body_style)],
        [Paragraph('5', table_body_bold), Paragraph('Bimbel sampai Ujian', table_body_style), Paragraph('Bimbel Garansi', table_body_style), Paragraph('<b>Rp 120.000</b>', table_body_style), Paragraph('Pendampingan intensif tanpa batas pertemuan hingga hari H pelaksanaan ujian.', table_body_style)],
        [Paragraph('6', table_body_bold), Paragraph('E-Book Premium + Bimbel s.d Ujian', table_body_style), Paragraph('VIP Best Seller', table_body_style), Paragraph('<b>Rp 130.000</b><br/><font color="#94A3B8"><s>200.000</s></font>', table_body_style), Paragraph('<b>Paket Komplit Terlengkap:</b> Modul Ebook Premium + Live Zoom sampai ujian + Rekaman + 999+ Kosakata.', table_body_style)],
    ]
    t_bimbel = Table(bimbel_data, colWidths=[20, 140, 75, 75, 209])
    t_bimbel.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0D9488')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_bimbel)
    story.append(Spacer(1, 4))

    story.append(Paragraph('<b>Ketentuan Jadwal Bimbel yang Diterapkan:</b>', h2_style))
    story.append(Paragraph('• <b>Jadwal Pasti MALAM:</b> Seluruh sesi bimbingan dilaksanakan pada malam hari antara pukul <b>19.00 WIB atau 20.00 WIB</b>.', bullet_style))
    story.append(Paragraph('• <b>Tidak Ada Jadwal Pagi, Siang, &amp; Sore:</b> Dirancang khusus agar tidak bentrok dengan jam belajar di sekolah maupun kesibukan kerja.', bullet_style))
    story.append(Paragraph('• <b>6 Pilihan Materi Bebas:</b> Penalaran Akademik, Bahasa Arab, Bahasa Indonesia, Matematika &amp; Kuantitatif, Bahasa Inggris, dan Literasi Ajaran Islam.', bullet_style))
    story.append(Spacer(1, 4))

    # 5. Transaksi & Pembayaran
    story.append(Paragraph('5. Sistem Transaksi Pembayaran &amp; Konfirmasi Bukti Transfer', h1_style))
    story.append(Paragraph('• <b>Metode Pembayaran Resmi (Semua a.n. LENNY AGUSTIN):</b>', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;- <b>QRIS Nasional (ASPI):</b> NMID <code>ID1025403090752 A01</code> (Mendukung GoPay, DANA, OVO, ShopeePay, BCA, Mandiri, BRImo, BSI, dll).', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;- <b>Bank BRI:</b> Nomor Rekening <code>3628-0103-8429-530</code> dilengkapi tombol 1-klik salin nomor rekening.', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;- <b>E-Wallet DANA:</b> Nomor Akun <code>0882-4785-4631</code> dilengkapi tombol 1-klik salin.', bullet_style))
    story.append(Paragraph('• <b>Form Konfirmasi Pengiriman Bukti Transfer:</b> Menyediakan template pesan siap kirim ke WhatsApp 0882-4785-4631 dengan format:', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;<i>Nama Peserta = ... | Order Paket = ... | Kirim ke = BRI/Dana/QRIS | Jam Terkirim = ...</i>', bullet_style))
    story.append(Paragraph('• <b>Simulasi Demo Instan:</b> Penguji presentasi dapat menekan tombol <i>Simulasikan Pembayaran</i> untuk langsung mengaktifkan paket secara instan tanpa biaya riil.', bullet_style))
    story.append(Spacer(1, 4))

    # 6. Grup Komunitas Belajar (Rp 0)
    story.append(Paragraph('6. Komunitas Belajar Gratis (Rp 0) &amp; Saluran Informasi WhatsApp', h1_style))
    story.append(Paragraph('• <b>Aturan Mutlak Grup:</b> <i>"Semua bisa masuk grup ASAL TIDAK PROMOSI APAPUN ITU ‼️"</i> Dilarang keras spam, jualan produk, atau sebar link tidak bertanggung jawab.', bullet_style))
    story.append(Paragraph('• <b>Kategori Grup yang Disediakan:</b>', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;1. Grup SPAN-PTKIN &amp; UMPTKIN 2026 (Grup 1-3 &amp; Calon Mhs UIN)', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;2. Grup SNBP, SNBT &amp; UTBK 2026 (Grup 1-4)', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;3. Grup Beasiswa KIP Kuliah 2026 (Grup 1-6)', bullet_style))
    story.append(Paragraph('&nbsp;&nbsp;&nbsp;&nbsp;4. Grup Khusus (Bimbel MTK Gratis, Gapyear, Pejuang Kampus, Lintas Jurusan, Tryout 1 Gratis)', bullet_style))
    story.append(Paragraph('• <b>QR Code Scan Cepat:</b> Disediakan barcode langsung untuk bergabung ke Grup WhatsApp dan Saluran Informasi Resmi.', bullet_style))
    story.append(Spacer(1, 4))

    # 7. Halaman Promo
    story.append(Paragraph('7. Halaman Khusus Promosi Akbar (PromoPage)', h1_style))
    story.append(Paragraph('• <b>Laman Terpadu:</b> Menyatukan seluruh materi poster, brosur promo, scan QR WA, bukti kelulusan 1.000++ murid, dan dokumentasi ruang Zoom dalam satu halaman promosi khusus.', bullet_style))
    story.append(Paragraph('• <b>Navigasi Tab Filter:</b> Pengunjung dapat memfilter kategori: <i>Semua Program, Bimbel Sampai Ujian (130k), Simulasi VIP UMPTKIN, Katalog Paket &amp; E-Book, Metode Pembayaran,</i> dan <i>Grup Komunitas</i>.', bullet_style))
    story.append(Paragraph('• <b>Direct WA Order Action:</b> Setiap paket dan program memiliki tombol pesanan otomatis yang langsung membuka WhatsApp admin dengan pesan yang disesuaikan.', bullet_style))
    story.append(Spacer(1, 4))

    # 8. Panel Admin
    story.append(Paragraph('8. Panel Administrator (Admin Management Dashboard)', h1_style))
    story.append(Paragraph('• <b>Dashboard Statistik:</b> Ringkasan total peserta terdaftar, paket aktif, pendapatan demo, dan rata-rata skor nasional.', bullet_style))
    story.append(Paragraph('• <b>Kelola Bank Soal:</b> Tambah, edit, dan hapus butir soal 4 subtes lengkap dengan kunci jawaban, pilihan A-E, dan pembahasan detail.', bullet_style))
    story.append(Paragraph('• <b>Kelola Paket Tryout:</b> Manajemen nama paket, durasi waktu ujian, jumlah butir soal, harga, dan badge status.', bullet_style))
    story.append(Paragraph('• <b>Data &amp; Hasil Ujian Peserta:</b> Pemantauan progres pengerjaan, nilai per subtes, riwayat kelulusan, dan status verifikasi pembayaran.', bullet_style))
    story.append(Paragraph('• <b>Reset Data Demo:</b> Fitur reset 1-klik untuk mengembalikan seluruh modifikasi data ke kondisi awal kapan saja.', bullet_style))
    story.append(Spacer(1, 6))

    # Sign-off Box
    signoff_data = [
        [Paragraph(
            '<b>Penyusun Dokumen:</b> Tim Pengembang Antigravity &amp; Tryout UMPTKIN Platform<br/>'
            '<b>Penyelenggara Resmi:</b> Lenny Agustin, S. Pd. • WhatsApp: 0882-4785-4631<br/>'
            '<b>Media Resmi:</b> Instagram @info.umptkin &amp; @lennyagustin10 • YouTube: Lenny Agustin<br/>'
            '<b>Akses Preview Live:</b> https://yuizhi23.github.io/tryout-umptkin/',
            body_style
        )]
    ]
    t_sign = Table(signoff_data, colWidths=[519])
    t_sign.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_sign)

    doc.build(story, canvasmaker=NumberedCanvas)
    shutil.copyfile(pdf_public_path, pdf_workspace_path)
    print(f'PDF generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_pdf()
