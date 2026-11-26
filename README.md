# Website Demo Tryout UMPTKIN

Platform simulasi ujian online berbasis **Sistem Seleksi Elektronik (SSE)** untuk persiapan seleksi masuk Perguruan Tinggi Keagamaan Islam Negeri (UIN, IAIN, STAIN) se-Indonesia.

Website ini merupakan prototipe/demo interaktif berstandar EdTech modern yang siap dipresentasikan kepada klien, dilengkapi data dummy yang realistis, simulasi pembayaran, sistem ujian CBT real-time, penilaian otomatis, dan panel manajemen admin terpadu.

---

## 🚀 Fitur Utama

### 👥 1. Mode Peserta (Student Journey)
- **Landing Page Modern**: Hero banner menarik, statistik pencapaian, daftar paket tryout, keunggulan fitur, alur 4 langkah mudah, dan FAQ accordion.
- **Autentikasi Demo**: Form Login & Pendaftaran akun dengan validasi, dropdown pilihan 16 Kampus PTKIN & Program Studi, serta tombol **"Masuk Cepat Demo"**.
- **Dashboard Peserta**: Sapaan dinamis, 4 kartu ringkasan metrik (Total Tryout, Rata-rata Nilai, Skor Tertinggi, Peringkat Nasional), filter paket, dan tabel riwayat ujian.
- **Detail Paket & Simulasi Pembayaran**: Modal pembayaran interaktif dengan metode **QRIS**, **Virtual Account Bank Syariah (BSI)**, dan **E-Wallet (GoPay)**.
- **Sistem Ujian CBT (Computer-Based Test)**:
  - Timer countdown real-time yang terus berjalan dan tersimpan di `localStorage`.
  - 4 Subtes lengkap: **Tes Potensi Skolastik (TPS)**, **Literasi Bahasa Indonesia**, **Literasi Bahasa Inggris**, dan **Penalaran Matematika**.
  - 20 butir soal otentik HOTS dengan 5 pilihan jawaban (A–E).
  - Navigasi soal: Tandai ragu-ragu (warna kuning), hapus jawaban, nomor soal responsif (hijau = terjawab, abu-abu = kosong).
  - Modal konfirmasi selesai ujian dengan peringatan dan rekap jawaban.
- **Sistem Scoring Otomatis & Halaman Hasil**:
  - Skor skala 0–100 dihitung langsung dari jawaban aktual peserta.
  - Grafik bar performa masing-masing subtes.
  - Analisis otomatis kelemahan & kekuatan peserta beserta saran belajar cerdas.
  - Efek selebrasi konfeti.
- **E-Pembahasan Lengkap**:
  - Analisis kunci jawaban untuk seluruh soal.
  - Filter: Semua Soal, Jawaban Benar, Jawaban Salah, Tidak Dijawab.
  - Penjelasan komprehensif untuk setiap nomor.
- **Leaderboard / Peringkat Nasional**:
  - Podium Top 3 (Emas, Perak, Perunggu).
  - Highlight posisi peserta yang sedang login.
  - Pencarian berdasarkan nama, sekolah, atau universitas target.
- **Halaman Profil Peserta**:
  - Manajemen data diri dan preferensi prodi/kampus PTKIN impian.

---

### 🛡️ 2. Mode Administrator (Admin Panel)
- **Dashboard Metrik & Grafik**:
  - 5 KPI ringkasan: Total Peserta, Paket Aktif, Bank Soal, Ujian Selesai, dan Total Omset Pembayaran.
  - Grafik batang interaktif: Tren pendaftaran mingguan dan rata-rata skor per subtes.
  - Feed aktivitas peserta & transaksi masuk terkini.
- **Kelola Bank Soal (Full CRUD)**:
  - Pencarian dan filter berdasarkan subtes & tingkat kesulitan (Mudah, Sedang, Sulit).
  - Tambah soal baru & Edit soal melalui modal interaktif.
  - Modal konfirmasi hapus soal dan modal preview.
- **Kelola Paket Tryout (Full CRUD)**:
  - Tambah, edit, dan hapus paket tryout.
  - Pengaturan durasi waktu, jumlah soal, harga, badge, dan status aktif.
- **Data Peserta**:
  - Tabel direktori calon mahasiswa terdaftar.
  - Modal detail profil, universitas pilihan, dan riwayat nilai.
- **Hasil Ujian Peserta**:
  - Rekapitulasi pengerjaan ujian peserta dengan filter paket dan pengurutan nilai.
  - Modal rincian nilai per subtes dan tingkat akurasi.
- **Laporan Pembayaran & Ekspor CSV**:
  - Tabel transaksi lengkap dengan status (Berhasil, Pending, Gagal).
  - **Tombol Ekspor CSV** yang dapat langsung mengunduh file `.csv` laporan transaksi.

---

### 🔄 3. Toggle Mode & Demo Reset
- Switcher praktis di navbar bagian atas untuk berpindah antara **Mode Peserta** dan **Mode Admin** dalam 1 klik tanpa reload.
- Tombol **"Reset Demo"** untuk mengembalikan seluruh state lokal ke data awal kapan saja saat presentasi.

---

## 🛠️ Panduan Menjalankan Aplikasi

Aplikasi berjalan menggunakan Vite dev server di:
```bash
# Menjalankan server development
npm run dev

# Membangun versi produksi
npm run build
```

Buka URL di browser: **`http://localhost:5173/`**
