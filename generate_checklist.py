import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas

pdf_public_path = '/Users/yukiekiyoshi/Downloads/tryout/public/CHECKLIST_PERSIAPAN_DATA_TRYOUT_UMPTKIN.pdf'
pdf_workspace_path = '/Users/yukiekiyoshi/Downloads/tryout/CHECKLIST_PERSIAPAN_DATA_TRYOUT_UMPTKIN.pdf'

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
            self.drawString(38, 810, 'Checklist Persiapan Data Website Tryout UMPTKIN • Yukie Kiyoshi')
            self.setStrokeColor(colors.HexColor('#E2E8F0'))
            self.setLineWidth(0.5)
            self.line(38, 802, 557, 802)

        # Footer (all pages)
        page_text = f'Halaman {self._pageNumber} dari {page_count}'
        self.drawRightString(557, 24, page_text)
        self.drawString(38, 24, 'Panduan & Checklist Data Pembuatan Website Tryout UMPTKIN 2026')
        self.setStrokeColor(colors.HexColor('#E2E8F0'))
        self.setLineWidth(0.5)
        self.line(38, 34, 557, 34)
        self.restoreState()

def build_checklist_pdf():
    doc = SimpleDocTemplate(
        pdf_public_path,
        pagesize=A4,
        leftMargin=38,
        rightMargin=38,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    doc_title = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=3
    )

    doc_sub = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0F766E'),
        spaceAfter=8
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#0F766E'),
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_text = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=3
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

    tb_style = ParagraphStyle(
        'TB',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#1E293B')
    )

    tb_bold = ParagraphStyle(
        'TBB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#0F766E')
    )

    tb_center = ParagraphStyle(
        'TBC',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        alignment=1,
        textColor=colors.HexColor('#1E293B')
    )

    note_box_text = ParagraphStyle(
        'NoteText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=11,
        textColor=colors.HexColor('#475569')
    )

    story = []

    # Title & Header
    story.append(Paragraph('CHECKLIST &amp; PANDUAN PERSIAPAN DATA', doc_title))
    story.append(Paragraph('PEMBUATAN WEBSITE PLATFORM SIMULASI TRYOUT SSE UMPTKIN', doc_sub))
    story.append(HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#0D9488'), spaceAfter=8))

    # Pengantar
    intro = (
        'Dokumen ini memuat daftar lengkap seluruh data, materi soal, dan informasi yang diperlukan '
        'untuk proses konfigurasi dan peluncuran website <b>Tryout UMPTKIN</b>. '
        'Bahan-bahan di bawah ini dapat disiapkan dan diserahkan secara bertahap kepada pengembang (<b>Yukie Kiyoshi</b>).'
    )
    story.append(Paragraph(intro, body_text))
    story.append(Spacer(1, 4))

    # Meta Info Klien & Pengembang
    meta_table_data = [
        [
            Paragraph('<b>DIPERSIAPKAN OLEH (KLIEN):</b><br/>Lenny Agustin, S. Pd.<br/><font color="#64748B">Pengelola Bimbingan &amp; Tryout UMPTKIN</font>', body_text),
            Paragraph('<b>PENGEMBANG SISTEM:</b><br/>Yukie Kiyoshi<br/><font color="#64748B">Web Development &amp; IT Services</font>', body_text),
            Paragraph('<b>TARGET PENGERJAAN:</b><br/>1 – 3 Desember 2026<br/><font color="#0F766E"><b>Estimasi Siap Rilis: 24-48 Jam</b></font>', body_text)
        ]
    ]
    t_meta = Table(meta_table_data, colWidths=[180, 180, 159])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    # TABEL CHECKLIST LENGKAP
    story.append(Paragraph('Daftar Checklist Kebutuhan Data Website', h1_style))

    table_data = [
        [
            Paragraph('Kategori', th_style),
            Paragraph('Item Kebutuhan', th_style),
            Paragraph('Rincian &amp; Penjelasan Data', th_style),
            Paragraph('Format File', th_center),
            Paragraph('Status', th_center)
        ],
        # 1. Identitas & Domain
        [
            Paragraph('<b>1. Domain &amp; Identitas</b>', tb_bold),
            Paragraph('<b>Pilihan Nama Domain (.com)</b>', tb_style),
            Paragraph('2–3 alternatif nama alamat website yang diinginkan untuk dicek ketersediaannya (contoh: <code>tryoutumptkin.com</code>, <code>infoumptkin.com</code>, atau <code>sahabatumptkin.com</code>).', tb_style),
            Paragraph('Teks WA', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Logo Bimbel / Info UMPTKIN</b>', tb_style),
            Paragraph('File gambar logo resmi untuk dipasang pada Navbar atas, Footer, Favicon tab browser, dan Header laporan ujian.', tb_style),
            Paragraph('PNG / JPG', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        # 2. Bank Soal & Materi Ujian
        [
            Paragraph('<b>2. Bank Soal &amp; Materi</b>', tb_bold),
            Paragraph('<b>Naskah Soal 4 Subtes</b>', tb_style),
            Paragraph('Butir soal lengkap beserta pilihan ganda A, B, C, D, E untuk 4 subtes (Penalaran Akademik, MTK Kuantitatif, Literasi Bahasa, Literasi Islam).', tb_style),
            Paragraph('Word / PDF / Excel', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Kunci Jawaban &amp; Pembahasan</b>', tb_style),
            Paragraph('Kunci opsi yang benar serta teks pembahasan langkah penyelesaian soal untuk ditampilkan otomatis setelah siswa selesai ujian.', tb_style),
            Paragraph('Word / PDF / Excel', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Audio Listening Percakapan</b>', tb_style),
            Paragraph('File rekaman percakapan audio untuk butir soal listening bahasa Arab &amp; Inggris (seperti contoh soal nomor 61 pada poster resmi).', tb_style),
            Paragraph('MP3 / M4A (Jika ada)', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Gambar &amp; Grafik Soal</b>', tb_style),
            Paragraph('File gambar grafik, diagram, peta, atau ilustrasi yang menjadi bagian dari bacaan/pertanyaan soal.', tb_style),
            Paragraph('PNG / JPG (Jika ada)', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        # 3. Rekening & Transaksi
        [
            Paragraph('<b>3. Data Transaksi</b>', tb_bold),
            Paragraph('<b>Barcode QRIS Pembayaran</b>', tb_style),
            Paragraph('Foto/screenshot QRIS resmi atas nama Lenny Agustin agar siswa bisa langsung scan bayar melalui m-banking atau e-wallet apa pun.', tb_style),
            Paragraph('JPG / PNG', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Nomor Rekening Bank &amp; DANA</b>', tb_style),
            Paragraph('Nomor rekening Bank BRI dan nomor akun DANA resmi atas nama Lenny Agustin untuk opsi transfer manual siswa di web.', tb_style),
            Paragraph('Teks WA', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        # 4. Kontak & Komunitas
        [
            Paragraph('<b>4. Komunitas &amp; Kontak</b>', tb_bold),
            Paragraph('<b>Nomor WhatsApp Admin</b>', tb_style),
            Paragraph('Nomor WhatsApp yang aktif menerima pendaftaran dan chat bukti transfer dari calon mahasiswa.', tb_style),
            Paragraph('Nomor HP', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Link Invite Grup WhatsApp</b>', tb_style),
            Paragraph('Link tautan undangan grup WhatsApp gratis milik Kakak (Grup SPAN-UMPTKIN, Pejuang PTN, Calon Mhs UIN, SNBT, KIP Kuliah, dan Saluran WA).', tb_style),
            Paragraph('Link Tautan', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Akun Media Sosial Resmi</b>', tb_style),
            Paragraph('Username Instagram (@info.umptkin / @lennyagustin10) dan Channel YouTube untuk tautan langsung di website.', tb_style),
            Paragraph('Username / Link', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        # 5. Promosi & Testimoni
        [
            Paragraph('<b>5. Materi Promosi</b>', tb_bold),
            Paragraph('<b>Daftar Harga Paket &amp; Bimbel</b>', tb_style),
            Paragraph('Konfirmasi tarif paket simulasi tryout (Gratis, VIP 10k, VIP 15k), katalog e-book, dan jadwal bimbel malam yang ingin ditampilkan.', tb_style),
            Paragraph('Teks WA', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ],
        [
            Paragraph('', tb_style),
            Paragraph('<b>Foto Testimoni Alumni &amp; Zoom</b>', tb_style),
            Paragraph('Tangkapan layar chat testimoni kelulusan siswa atau foto dokumentasi live Zoom untuk mempercantik landing page promo (opsional).', tb_style),
            Paragraph('JPG / PNG (Opsional)', tb_center),
            Paragraph('[  ] Siap', tb_center)
        ]
    ]

    t_main = Table(table_data, colWidths=[90, 115, 195, 65, 54])
    t_main.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_main)
    story.append(Spacer(1, 8))

    # Petunjuk Pengiriman
    guide_box_data = [
        [
            Paragraph(
                '<b>PETUNJUK PENYERAHAN DATA:</b><br/>'
                '1. Seluruh bahan di atas <b>tidak perlu dikirim sekaligus</b>. Boleh dikirim secara bertahap via WhatsApp atau Google Drive.<br/>'
                '2. Paling awal yang dibutuhkan adalah <b>Pilihan Nama Domain (.com)</b> agar proses pendaftaran dan setup server bisa langsung dimulai tanggal 1 Desember.<br/>'
                '3. Soal dan kunci jawaban dapat disusulkan saat domain dan kerangka sistem sedang diproses.<br/>'
                '4. Jika ada format yang dibingungkan, kami siap membantu merapikan dokumen materi soal.',
                note_box_text
            )
        ]
    ]
    t_guide = Table(guide_box_data, colWidths=[519])
    t_guide.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F0FDFA')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#0D9488')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_guide)

    doc.build(story, canvasmaker=NumberedCanvas)
    shutil.copyfile(pdf_public_path, pdf_workspace_path)
    print(f'Checklist PDF generated successfully ({os.path.getsize(pdf_public_path)} bytes).')

if __name__ == '__main__':
    build_checklist_pdf()
