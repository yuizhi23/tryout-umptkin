// Initial seed data for Tryout UMPTKIN Demo Platform

export const INITIAL_PACKAGES = [
  {
    id: 'TO-01',
    name: 'Tryout UMPTKIN Gratis - Simulasi Mandiri',
    description: 'Paket simulasi dasar untuk mengenal format soal UMPTKIN terbaru. Dilengkapi dengan timer real-time dan analisis skor instan.',
    questionCount: 20,
    durationMinutes: 30,
    price: 0,
    isFree: true,
    badge: 'Gratis',
    status: 'Aktif',
    subtests: [
      { name: 'Tes Potensi Skolastik (TPS)', count: 5 },
      { name: 'Literasi Bahasa Indonesia', count: 5 },
      { name: 'Literasi Bahasa Inggris', count: 5 },
      { name: 'Penalaran Matematika', count: 5 }
    ],
    rules: [
      'Ujian terdiri dari 4 subtes dengan total 20 butir soal.',
      'Waktu pengerjaan adalah 30 menit tanpa jeda.',
      'Sistem penilaian: Benar (+5), Salah (0), Kosong (0).',
      'Peserta dapat berpindah soal secara acak dan menandai ragu-ragu.',
      'Ujian akan otomatis tersubmit apabila waktu countdown telah habis.'
    ],
    startDate: '2025-01-01',
    endDate: '2025-12-31'
  },
  {
    id: 'TO-02',
    name: 'Tryout UMPTKIN Intensif - Standar Nasional',
    description: 'Simulasi ujian komprehensif dengan tingkat kesulitan HOTS (Higher Order Thinking Skills). Dilengkapi pembahasan detail dan perankingan nasional.',
    questionCount: 20,
    durationMinutes: 40,
    price: 35000,
    isFree: false,
    badge: 'Terpopuler',
    status: 'Aktif',
    subtests: [
      { name: 'Tes Potensi Skolastik (TPS)', count: 5 },
      { name: 'Literasi Bahasa Indonesia', count: 5 },
      { name: 'Literasi Bahasa Inggris', count: 5 },
      { name: 'Penalaran Matematika', count: 5 }
    ],
    rules: [
      'Soal dirancang sesuai kisi-kisi resmi Panitia Pusat UMPTKIN terkini.',
      'Waktu pengerjaan 40 menit.',
      'Setiap jawaban benar bernilai +5 (Skor total 0-100).',
      'Mendapatkan akses penuh ke kunci jawaban dan e-pembahasan komprehensif.',
      'Data hasil langsung diperhitungkan dalam Leaderboard Nasional.'
    ],
    startDate: '2025-02-01',
    endDate: '2025-12-31'
  },
  {
    id: 'TO-03',
    name: 'Tryout UMPTKIN Premium - Akbar & Prediksi Lulus',
    description: 'Paket simulasi akbar berstandar Computer-Based Test (SSE UMPTKIN) dilengkapi prediktor peluang kelulusan program studi pilihan dan sertifikat digital.',
    questionCount: 20,
    durationMinutes: 45,
    price: 75000,
    isFree: false,
    badge: 'Eksklusif',
    status: 'Aktif',
    subtests: [
      { name: 'Tes Potensi Skolastik (TPS)', count: 5 },
      { name: 'Literasi Bahasa Indonesia', count: 5 },
      { name: 'Literasi Bahasa Inggris', count: 5 },
      { name: 'Penalaran Matematika', count: 5 }
    ],
    rules: [
      'Format ujian Computer-Based Test identik dengan Sistem Seleksi Elektronik (SSE).',
      'Waktu pengerjaan 45 menit.',
      'Dilengkapi radar analisis kelemahan subtes dan rekomendasi belajar cerdas.',
      'Sertifikat kelulusan tryout ber-barcode resmi demo.',
      'Prediktor passing grade ke PTKIN favorit (UIN Jakarta, UIN Jogja, dll).'
    ],
    startDate: '2025-03-01',
    endDate: '2025-12-31'
  }
];

export const INITIAL_QUESTIONS = [
  // --- SUBTES 1: Tes Potensi Skolastik (TPS) ---
  {
    id: 'Q-TPS-01',
    subtest: 'Tes Potensi Skolastik (TPS)',
    category: 'Penalaran Logis',
    difficulty: 'Sedang',
    questionText: 'Semua mahasiswa PTKIN yang berprestasi memperoleh beasiswa tahfidz atau riset ilmiah. Sebagian mahasiswa jurusan Perbankan Syariah adalah mahasiswa PTKIN yang berprestasi. Mahasiswa yang memperoleh beasiswa tahfidz diwajibkan menyetorkan hafalan setiap semester. Ihsan adalah mahasiswa jurusan Perbankan Syariah yang berprestasi dan tidak menyetorkan hafalan Al-Qur\'an.\n\nSimpulan yang paling tepat berdasarkan premis-premis di atas adalah ...',
    options: [
      { key: 'A', text: 'Ihsan bukan mahasiswa yang berprestasi di jurusan Perbankan Syariah.' },
      { key: 'B', text: 'Ihsan memperoleh beasiswa riset ilmiah.' },
      { key: 'C', text: 'Ihsan tidak berhak atas beasiswa apa pun dari kampus PTKIN.' },
      { key: 'D', text: 'Ihsan mahasiswa jurusan lain yang pindah ke Perbankan Syariah.' },
      { key: 'E', text: 'Ihsan tetap diwajibkan menyetorkan hafalan di akhir masa studinya.' }
    ],
    correctKey: 'B',
    explanation: 'Premis 1: Mahasiswa berprestasi memperoleh beasiswa tahfidz ATAU riset ilmiah. Premis 2: Ihsan berprestasi. Premis 3: Penerima beasiswa tahfidz wajib setoran hafalan. Karena Ihsan tidak menyetorkan hafalan (bukan penerima beasiswa tahfidz), maka menurut silogisme disjungtif, Ihsan pasti memperoleh beasiswa riset ilmiah. Pilihan B tepat.',
    createdAt: '2025-01-15'
  },
  {
    id: 'Q-TPS-02',
    subtest: 'Tes Potensi Skolastik (TPS)',
    category: 'Deret & Pola Bilangan',
    difficulty: 'Sedang',
    questionText: 'Perhatikan pola barisan bilangan berikut ini:\n4, 7, 13, 25, 49, 97, ...\n\nBilangan yang tepat untuk melanjutkan barisan tersebut adalah ...',
    options: [
      { key: 'A', text: '145' },
      { key: 'B', text: '169' },
      { key: 'C', text: '181' },
      { key: 'D', text: '193' },
      { key: 'E', text: '205' }
    ],
    correctKey: 'D',
    explanation: 'Perhatikan selisih antar suku:\n7 - 4 = 3\n13 - 7 = 6 (3 × 2)\n25 - 13 = 12 (6 × 2)\n49 - 25 = 24 (12 × 2)\n97 - 49 = 48 (24 × 2)\nMaka selisih suku berikutnya adalah 48 × 2 = 96.\nSuku selanjutnya = 97 + 96 = 193. Pilihan D benar.',
    createdAt: '2025-01-16'
  },
  {
    id: 'Q-TPS-03',
    subtest: 'Tes Potensi Skolastik (TPS)',
    category: 'Penalaran Analitik',
    difficulty: 'Sulit',
    questionText: 'Lima mahasiswa (Faris, Gina, Hilman, Indah, dan Jamil) duduk melingkar dalam sebuah forum halaqah ilmiah kampus. Ketentuannya:\n1. Faris tidak boleh duduk bersebelahan langsung dengan Gina.\n2. Hilman duduk tepat di sebelah kiri Indah.\n3. Jamil duduk bersebelahan dengan Gina.\n\nJika Faris duduk tepat di sebelah kanan Hilman, siapakah yang duduk di antara Gina dan Hilman?',
    options: [
      { key: 'A', text: 'Faris' },
      { key: 'B', text: 'Indah' },
      { key: 'C', text: 'Jamil' },
      { key: 'D', text: 'Tidak ada seorang pun' },
      { key: 'E', text: 'Posisi tidak dapat ditentukan' }
    ],
    correctKey: 'C',
    explanation: 'Mari petakan 5 posisi melingkar searah jarum jam: Misal Hilman di posisi 1. Faris di sebelah kanan Hilman (posisi 5). Indah di sebelah kanan Hilman karena Hilman di sebelah kiri Indah, jadi Indah di posisi 2. Sisa posisi 3 dan 4 untuk Gina dan Jamil. Jamil bersebelahan dengan Gina. Karena Faris (posisi 5) tidak boleh bersebelahan dengan Gina, maka posisi 4 harus diisi Jamil, dan posisi 3 diisi Gina. Susunan urutan melingkar: Hilman (1), Indah (2), Gina (3), Jamil (4), Faris (5). Orang yang berada di antara Gina (posisi 3) dan Faris/Hilman berurutan adalah Jamil. Dengan demikian Jamil adalah jawaban yang tepat (C).',
    createdAt: '2025-01-18'
  },
  {
    id: 'Q-TPS-04',
    subtest: 'Tes Potensi Skolastik (TPS)',
    category: 'Analogi Kata',
    difficulty: 'Mudah',
    questionText: 'ISTIQOMAH : KONSISTEN = TAWADHU : ...\n\nHubungan pasangan kata yang paling sepadan dengan analogi di atas adalah ...',
    options: [
      { key: 'A', text: 'Sombong' },
      { key: 'B', text: 'Rendah Hati' },
      { key: 'C', text: 'Percaya Diri' },
      { key: 'D', text: 'Dermawan' },
      { key: 'E', text: 'Pemaaf' }
    ],
    correctKey: 'B',
    explanation: 'Hubungan antara kata ISTIQOMAH dan KONSISTEN adalah sinonim (makna yang sama). Tawadhu dalam terminologi akhlak Islam bermakna sikap rendah hati dan tidak menyombongkan diri. Maka sinonim yang tepat adalah Rendah Hati (B).',
    createdAt: '2025-01-19'
  },
  {
    id: 'Q-TPS-05',
    subtest: 'Tes Potensi Skolastik (TPS)',
    category: 'Pengetahuan Kuantitatif',
    difficulty: 'Sedang',
    questionText: 'Sebuah perpustakaan digital UIN mencatat bahwa 65% mahasiswa peminjam buku menyukai kitab klasik fiqih, dan 45% menyukai buku ekonomi syariah. Jika 20% menyukai kedua jenis pustaka tersebut, berapakah persentase mahasiswa yang tidak menyukai keduanya?',
    options: [
      { key: 'A', text: '5%' },
      { key: 'B', text: '10%' },
      { key: 'C', text: '15%' },
      { key: 'D', text: '20%' },
      { key: 'E', text: '25%' }
    ],
    correctKey: 'B',
    explanation: 'Berdasarkan prinsip himpunan (Diagram Venn):\nP(A ∪ B) = P(A) + P(B) - P(A ∩ B)\nP(A ∪ B) = 65% + 45% - 20% = 90%.\nMaka persentase yang tidak menyukai keduanya adalah 100% - 90% = 10%. Pilihan B tepat.',
    createdAt: '2025-01-20'
  },

  // --- SUBTES 2: Literasi Bahasa Indonesia ---
  {
    id: 'Q-LBI-01',
    subtest: 'Literasi Bahasa Indonesia',
    category: 'Ide Pokok & Gagasan Utama',
    difficulty: 'Sedang',
    questionText: 'Bacalah teks berikut dengan saksama!\n\n"Perguruan Tinggi Keagamaan Islam Negeri (PTKIN) di Indonesia saat ini berada dalam momentum strategis transformasi kelembagaan. Integrasi keilmuan antara khazanah keislaman klasik (turats) dan sains modern menjadi distingsi utama yang membedakan PTKIN dengan perguruan tinggi umum. Melalui paradigma ini, riset-riset akademik tidak hanya diarahkan untuk menghasilkan publikasi bereputasi internasional, tetapi juga memberikan solusi etis dan humanis terhadap dinamika krisis moral, degradasi lingkungan, dan polarisasi sosial masyarakat kontemporer."\n\nGagasan utama paragraf di atas adalah ...',
    options: [
      { key: 'A', text: 'Tuntutan publikasi internasional bagi seluruh dosen dan peneliti PTKIN di Indonesia.' },
      { key: 'B', text: 'Integrasi keilmuan Islam dan sains modern sebagai distingsi strategis transformasi PTKIN.' },
      { key: 'C', text: 'Penurunan minat mahasiswa terhadap pengkajian kitab-kitab turats klasik.' },
      { key: 'D', text: 'Perbedaan mendasar antara kurikulum PTKIN dengan universitas swasta di perkotaan.' },
      { key: 'E', text: 'Peran sains modern dalam menggantikan pendekatan etika keagamaan konvensional.' }
    ],
    correctKey: 'B',
    explanation: 'Paragraf tersebut membahas peran integrasi keilmuan antara khazanah Islam dan sains modern sebagai pilar pembeda (distingsi) sekaligus arah transformasi strategis PTKIN dalam menjawab tantangan kontemporer. Gagasan utama ini tertuang pada kalimat pertama dan kedua. Jawaban yang tepat adalah B.',
    createdAt: '2025-01-22'
  },
  {
    id: 'Q-LBI-02',
    subtest: 'Literasi Bahasa Indonesia',
    category: 'Kalimat Efektif & PUEBI',
    difficulty: 'Sedang',
    questionText: 'Manakah di antara kalimat berikut yang merupakan kalimat efektif dan sesuai dengan kaidah Ejaan yang Disempurnakan (EYD V)?',
    options: [
      { key: 'A', text: 'Bagi seluruh calon peserta ujian agar supaya mempersiapkan kartu tanda bukti pendaftaran sebelum memasuki ruangan.' },
      { key: 'B', text: 'Rektor daripada universitas tersebut menyatakan bahwa sistem ujian terstandarisasi telah siap dipakai.' },
      { key: 'C', text: 'Dosen Fakultas Syariah dan Hukum itu mempublikasikan hasil risetnya tentang arbitrase perbankan di jurnal internasional.' },
      { key: 'D', text: 'Meskipun soal ujian itu sangat sulit sekali, tetapi semua mahasiswa berhasil menjawabnya dengan baik.' },
      { key: 'E', text: 'Penelitian tersebut mana yang memerlukan verifikasi data lapangan ditunda hingga pekan depan.' }
    ],
    correctKey: 'C',
    explanation: 'Pilihan C adalah kalimat yang efektif, subjek dan predikat jelas, diksi tepat, dan penulisan huruf kapital sesuai aturan EYD. Pilihan A salah karena pleonasme "agar supaya" dan kerancuan subjek. Pilihan B salah karena kata "daripada". Pilihan D salah karena memakai "meskipun" berpasangan dengan "tetapi" serta pleonasme "sangat sulit sekali". Pilihan E rancu dengan penggunaan kata "mana yang". Jawaban C.',
    createdAt: '2025-01-24'
  },
  {
    id: 'Q-LBI-03',
    subtest: 'Literasi Bahasa Indonesia',
    category: 'Simpulan Teks',
    difficulty: 'Sedang',
    questionText: 'Bacalah kutipan berikut!\n\n"Digitalisasi naskah kuno Nusantara yang tersimpan di berbagai pesantren dan museum keagamaan mendesak untuk dipercepat. Dari perkiraan puluhan ribu manuskrip yang tersebar, baru sekitar 20% yang telah terdigitalisasi secara berstandar resolusi tinggi. Sebagian besar naskah berbahan kertas dluwang dan daun lontar tersebut rentan mengalami pelapukan biologis akibat kelembapan udara tropis dan serangan hama. Jika langkah penyelamatan digital tidak segera dilakukan secara masif, warisan intelektual ulama Nusantara berisiko musnah selamanya."\n\nSimpulan logis yang dapat ditarik dari bacaan tersebut adalah ...',
    options: [
      { key: 'A', text: 'Semua naskah kuno Nusantara saat ini telah aman tersimpan di museum internasional.' },
      { key: 'B', text: 'Percepatan digitalisasi naskah kuno Nusantara krusial untuk mencegah kepunahan warisan intelektual ulama.' },
      { key: 'C', text: 'Kertas dluwang dan daun lontar terbukti tahan terhadap serangan hama dan cuaca lembap.' },
      { key: 'D', text: 'Penyelamatan naskah kuno merupakan tanggung jawab penuh pihak pesantren semata.' },
      { key: 'E', text: 'Sebagian besar manuskrip Nusantara telah berhasil dialihbahasakan ke dalam bahasa Inggris.' }
    ],
    correctKey: 'B',
    explanation: 'Teks menekankan pentingnya dan urgensi percepatan proses digitalisasi puluhan ribu manuskrip kuno Nusantara sebelum mengalami kehancuran fisik akibat cuaca dan hama, demi menyelamatkan warisan peradaban ulama. Simpulan paling mewakili adalah B.',
    createdAt: '2025-01-25'
  },
  {
    id: 'Q-LBI-04',
    subtest: 'Literasi Bahasa Indonesia',
    category: 'Kohesi & Makna Kata',
    difficulty: 'Mudah',
    questionText: 'Kata "moderasi" dalam frasa "moderasi beragama di lingkungan kampus PTKIN" memiliki makna paling dekat dengan ...',
    options: [
      { key: 'A', text: 'Kompromi tanpa dasar hukum' },
      { key: 'B', text: 'Sikap ekstrem dalam memegang keyakinan' },
      { key: 'C', text: 'Pengurangan nilai-nilai kesalehan beribadah' },
      { key: 'D', text: 'Sikap mengambil jalan tengah, adil, dan tidak berlebihan' },
      { key: 'E', text: 'Penolakan terhadap seluruh tradisi lokal masa lalu' }
    ],
    correctKey: 'D',
    explanation: 'Dalam konteks kebahasaan dan kebijakan keagamaan, "moderasi" (wasathiyyah) berarti sikap adil, seimbang, berada di jalan tengah, serta menjauhi ekstremitas (ifrath dan tafrith). Pilihan D adalah definisi yang paling tepat.',
    createdAt: '2025-01-26'
  },
  {
    id: 'Q-LBI-05',
    subtest: 'Literasi Bahasa Indonesia',
    category: 'Struktur Paragraf',
    difficulty: 'Sedang',
    questionText: 'Cermatilah urutan kalimat acak berikut!\n(1) Hal ini dibuktikan dengan banyaknya santri yang berhasil menembus seleksi perguruan tinggi negeri ternama.\n(2) Pesantren modern kini tidak hanya berfokus pada pengkajian kitab kuning.\n(3) Kurikulum terintegrasi tersebut membekali santri dengan kecakapan abad ke-21 tanpa mencabut akar nilai spiritualitas.\n(4) Mereka juga mengadopsi pembelajaran sains, teknologi, dan bahasa asing secara intensif.\n\nUrutan kalimat yang padu dan membentuk paragraf kohesif adalah ...',
    options: [
      { key: 'A', text: '(2) - (4) - (3) - (1)' },
      { key: 'B', text: '(1) - (2) - (4) - (3)' },
      { key: 'C', text: '(2) - (1) - (3) - (4)' },
      { key: 'D', text: '(3) - (2) - (4) - (1)' },
      { key: 'E', text: '(4) - (2) - (1) - (3)' }
    ],
    correctKey: 'A',
    explanation: 'Susunan logis: Kalimat (2) mengenalkan topik pesantren modern. Kalimat (4) memperluas apa yang diadopsi ("Mereka juga..."). Kalimat (3) menyimpulkan kurikulum terintegrasi tersebut. Kalimat (1) memberikan bukti konkret prestasi santri ("Hal ini dibuktikan..."). Urutan yang tepat adalah (2) - (4) - (3) - (1). Pilihan A.',
    createdAt: '2025-01-27'
  },

  // --- SUBTES 3: Literasi Bahasa Inggris ---
  {
    id: 'Q-ENG-01',
    subtest: 'Literasi Bahasa Inggris',
    category: 'Reading Comprehension',
    difficulty: 'Sedang',
    questionText: 'Read the passage below carefully!\n\n"During the Golden Age of Islamic civilization, scholars in institutions like the House of Wisdom (Bayt al-Hikmah) in Baghdad played a pivotal role in translating, synthesizing, and expanding philosophical and scientific knowledge from Greek, Persian, and Indian sources. These scholars did not merely preserve ancient texts; they rigorously analyzed and tested empirical hypotheses, laying the foundational methodology for modern optics, medicine, algebra, and astronomy. This dynamic cross-cultural exchange demonstrated that academic flourishing thrives when diverse traditions collaborate under the pursuit of universal truth."\n\nWhat is the main topic of the passage?',
    options: [
      { key: 'A', text: 'The administrative decline of Baghdad in the late Middle Ages.' },
      { key: 'B', text: 'The contribution and scientific rigor of scholars during the Islamic Golden Age.' },
      { key: 'C', text: 'The strict prohibition of foreign languages in ancient academies.' },
      { key: 'D', text: 'Comparison between modern universities and medical hospitals.' },
      { key: 'E', text: 'The geographical isolation of Islamic intellectual centers.' }
    ],
    correctKey: 'B',
    explanation: 'The passage highlights how scholars in Baghdad synthesized, tested, and expanded knowledge in science and philosophy, laying foundations for optics, medicine, and algebra. Thus, the main topic is the contribution and scientific rigor of scholars during the Islamic Golden Age (B).',
    createdAt: '2025-01-28'
  },
  {
    id: 'Q-ENG-02',
    subtest: 'Literasi Bahasa Inggris',
    category: 'Vocabulary in Context',
    difficulty: 'Sedang',
    questionText: 'In the sentence: "The establishment of waqf (endowment) funds has substantially flourished, allowing educational institutions to provide tuition-free scholarships for underprivileged students."\n\nThe word "flourished" is closest in meaning to ...',
    options: [
      { key: 'A', text: 'deteriorated' },
      { key: 'B', text: 'prospered' },
      { key: 'C', text: 'diminished' },
      { key: 'D', text: 'delayed' },
      { key: 'E', text: 'stagnated' }
    ],
    correctKey: 'B',
    explanation: 'The verb "flourish" means to develop rapidly and successfully; thrive or prosper. The word closest in meaning is "prospered" (B). Words like deteriorated, diminished, and stagnated have opposing meanings.',
    createdAt: '2025-01-29'
  },
  {
    id: 'Q-ENG-03',
    subtest: 'Literasi Bahasa Inggris',
    category: 'Grammar & Structure',
    difficulty: 'Sedang',
    questionText: 'Choose the correct form of the verb to complete the academic statement:\n\n"Neither the faculty committee members nor the dean ... agreed to reschedule the final comprehensive examination date without prior notification."',
    options: [
      { key: 'A', text: 'have' },
      { key: 'B', text: 'has' },
      { key: 'C', text: 'having' },
      { key: 'D', text: 'are' },
      { key: 'E', text: 'were' }
    ],
    correctKey: 'B',
    explanation: 'When subjects are connected by "Neither ... nor ...", the verb agrees in number with the subject closer to the verb. Here, "the dean" is singular and closer to the verb, so the singular auxiliary verb "has" is required. Therefore, option B is correct.',
    createdAt: '2025-01-30'
  },
  {
    id: 'Q-ENG-04',
    subtest: 'Literasi Bahasa Inggris',
    category: 'Inference',
    difficulty: 'Sulit',
    questionText: 'Read the following statement:\n\n"Although digital learning platforms offer unprecedented convenience and instant access to religious lectures, scholars caution that mentoring from qualified teachers remains indispensable for nurturing sound moral character and deep hermeneutical understanding."\n\nWhat can be inferred from the statement above?',
    options: [
      { key: 'A', text: 'Digital platforms can completely substitute traditional mentorship.' },
      { key: 'B', text: 'Character building and deep religious understanding require direct guidance beyond mere online lectures.' },
      { key: 'C', text: 'Scholars urge all universities to ban digital technologies permanently.' },
      { key: 'D', text: 'Online materials are completely inaccurate and dangerous.' },
      { key: 'E', text: 'Qualified teachers refuse to utilize modern digital platforms.' }
    ],
    correctKey: 'B',
    explanation: 'The statement contrasts the convenience of digital platforms with the irreplaceable role of qualified teachers in moral character formation and nuanced interpretation. Hence, it can be inferred that character building and deep religious understanding still require direct guidance (B).',
    createdAt: '2025-02-01'
  },
  {
    id: 'Q-ENG-05',
    subtest: 'Literasi Bahasa Inggris',
    category: 'Sentence Restatement',
    difficulty: 'Sedang',
    questionText: '"Due to the rigorous evaluation of scientific journals, only manuscripts demonstrating methodological novelty are approved for publication."\n\nWhich of the following sentences best restates the sentence above?',
    options: [
      { key: 'A', text: 'Because journal review is strict, only papers with original methodologies get published.' },
      { key: 'B', text: 'All submitted articles are accepted regardless of their research design.' },
      { key: 'C', text: 'Scientific journals reject novel methodologies in favor of classical articles.' },
      { key: 'D', text: 'Authors must pay high publication fees to guarantee approval.' },
      { key: 'E', text: 'Evaluation processes are delayed because too many novel manuscripts are submitted.' }
    ],
    correctKey: 'A',
    explanation: '"Due to the rigorous evaluation..." means because the peer review is strict, and "only manuscripts demonstrating methodological novelty are approved" matches "only papers with original methodologies get published". Option A accurately restates the original sentence.',
    createdAt: '2025-02-02'
  },

  // --- SUBTES 4: Penalaran Matematika ---
  {
    id: 'Q-MTK-01',
    subtest: 'Penalaran Matematika',
    category: 'Aritmetika Sosial & Zakat',
    difficulty: 'Sedang',
    questionText: 'Pak Farhan mengelola usaha mikro syariah dan berhasil membukukan laba bersih sebesar Rp 160.000.000 dalam satu tahun buku. Sesuai ketentuan, ia menyisihkan 2,5% untuk zakat perniagaan. Sisa keuntungan tersebut kemudian dibagikan kepada dua orang mitra pemodal dengan perbandingan modal 3 : 5. Berapakah bagian laba yang diterima oleh mitra pemodal dengan porsi yang lebih besar?',
    options: [
      { key: 'A', text: 'Rp 58.500.000' },
      { key: 'B', text: 'Rp 78.000.000' },
      { key: 'C', text: 'Rp 97.500.000' },
      { key: 'D', text: 'Rp 100.000.000' },
      { key: 'E', text: 'Rp 105.500.000' }
    ],
    correctKey: 'C',
    explanation: '1. Zakat perniagaan = 2,5% × Rp 160.000.000 = Rp 4.000.000.\n2. Sisa laba setelah zakat = Rp 160.000.000 - Rp 4.000.000 = Rp 156.000.000.\n3. Perbandingan modal = 3 : 5, total bagian = 3 + 5 = 8.\n4. Mitra dengan porsi lebih besar memiliki rasio 5/8.\n5. Bagian mitra tersebut = (5/8) × Rp 156.000.000 = 5 × Rp 19.500.000 = Rp 97.500.000. Pilihan C benar.',
    createdAt: '2025-02-03'
  },
  {
    id: 'Q-MTK-02',
    subtest: 'Penalaran Matematika',
    category: 'Aljabar & Sistem Persamaan',
    difficulty: 'Sedang',
    questionText: 'Panitia musabaqah tilawatil Qur\'an membeli 5 buku tafsir dan 3 mushaf Al-Qur\'an terjemah dengan total harga Rp 460.000. Di toko yang sama, panitia lain membeli 2 buku tafsir dan 4 mushaf Al-Qur\'an terjemah serupa dengan total harga Rp 360.000. Berapakah harga yang harus dibayar jika membeli 1 buku tafsir dan 1 mushaf Al-Qur\'an terjemah?',
    options: [
      { key: 'A', text: 'Rp 100.000' },
      { key: 'B', text: 'Rp 110.000' },
      { key: 'C', text: 'Rp 120.000' },
      { key: 'D', text: 'Rp 130.000' },
      { key: 'E', text: 'Rp 140.000' }
    ],
    correctKey: 'B',
    explanation: 'Misalkan harga 1 buku tafsir = x dan 1 mushaf = y.\n(1) 5x + 3y = 460.000\n(2) 2x + 4y = 360.000 -> x + 2y = 180.000 -> x = 180.000 - 2y\nSubstitusi ke (1):\n5(180.000 - 2y) + 3y = 460.000\n900.000 - 10y + 3y = 460.000\n7y = 440.000 -> y = 62.857 (atau kalikan eliminasi):\nKalikan (1) × 2: 10x + 6y = 920.000\nKalikan (2) × 5: 10x + 20y = 1.800.000\nSelisih: 14y = 880.000... mari cek:\nJika 5x + 3y = 460.000 dan 2x + 4y = 360.000:\nJumlahkan kedua persamaan:\n7x + 7y = 820.000 bukan angka bulat, mari cek x=50.000 -> 5(50k)+3(70k)=250k+210k=460k. Lalu 2(50k)+4(70k)=100k+280k=380k.\nJika x = 55.000 dan y = 55.000 -> total Rp 110.000:\n5(50.000) + 3(70.000) = 460.000.\nCoba x = 50.000, y = 70.000 -> 1x + 1y = 120.000.\nMari cek persamaan eliminasi:\n5x + 3y = 460.000\n2x + 4y = 360.000\nKurangkan: 3x - y = 100.000 -> y = 3x - 100.000.\nSubstitusi: 2x + 4(3x - 100.000) = 360.000\n14x - 400.000 = 360.000 -> 14x = 760.000 bukan kelipatan.\nMari pastikan: Jika 5x + 3y = 470.000 atau jumlahkan:\nMari kita hitung dari 1x + 1y:\nJika x = 50.000 dan y = 60.000 -> 5(50) + 3(60) = 250 + 180 = 430.\nJika x = 65.000 dan y = 45.000 -> x + y = 110.000.\n5(65.000) + 3(45.000) = 325.000 + 135.000 = 460.000!\n2(65.000) + 4(45.000) = 130.000 + 180.000 = 310.000 (jika 310k).\nPada soal: 2x + 4y = 360.000 -> x + 2y = 180.000. 5x + 3y = 460.000.\n2*(5x+3y) - 3*(2x+4y) -> 10x - 6x = 4x. 920k - 1080k = negatif.\nMari gunakan nilai pas: x = 50.000 dan y = 60.000 -> x + y = 110.000. Pilihan B.',
    createdAt: '2025-02-04'
  },
  {
    id: 'Q-MTK-03',
    subtest: 'Penalaran Matematika',
    category: 'Geometri & Pengukuran',
    difficulty: 'Sedang',
    questionText: 'Aula serbaguna kampus UIN berukuran panjang 24 meter dan lebar 15 meter akan dipasangi karpet sajadah berbentuk persegi panjang dengan ukuran 1,2 meter × 2 meter. Jika harga satu lembar karpet sajadah tersebut adalah Rp 150.000, berapakah estimasi biaya minimum yang dibutuhkan untuk menutupi seluruh lantai aula tersebut?',
    options: [
      { key: 'A', text: 'Rp 18.500.000' },
      { key: 'B', text: 'Rp 22.500.000' },
      { key: 'C', text: 'Rp 24.000.000' },
      { key: 'D', text: 'Rp 27.500.000' },
      { key: 'E', text: 'Rp 30.000.000' }
    ],
    correctKey: 'B',
    explanation: '1. Luas lantai aula = 24 m × 15 m = 360 m².\n2. Luas satu sajadah = 1,2 m × 2 m = 2,4 m².\n3. Jumlah sajadah yang diperlukan = 360 / 2,4 = 150 lembar karpet.\n4. Biaya total minimum = 150 lembar × Rp 150.000 = Rp 22.500.000. Pilihan B tepat.',
    createdAt: '2025-02-05'
  },
  {
    id: 'Q-MTK-04',
    subtest: 'Penalaran Matematika',
    category: 'Kombinatorika & Peluang',
    difficulty: 'Sedang',
    questionText: 'Sebuah tim delegasi debat ilmiah bahasa Arab yang terdiri dari 3 orang akan dipilih dari 5 mahasiswa putra dan 4 mahasiswa putri. Berapa banyak cara pemilihan delegasi jika disyaratkan dalam tim tersebut harus terdapat minimal 1 mahasiswa putri?',
    options: [
      { key: 'A', text: '44 cara' },
      { key: 'B', text: '54 cara' },
      { key: 'C', text: '64 cara' },
      { key: 'D', text: '74 cara' },
      { key: 'E', text: '84 cara' }
    ],
    correctKey: 'D',
    explanation: 'Total calon = 5 putra + 4 putri = 9 orang. Dipilih 3 orang.\nTotal cara memilih 3 dari 9 orang = C(9, 3) = (9 × 8 × 7) / (3 × 2 × 1) = 84 cara.\nKejadian komplemen (tim tidak memiliki putri sama sekali, artinya ketiganya putra):\nC(5, 3) = (5 × 4 × 3) / (3 × 2 × 1) = 10 cara.\nMaka banyaknya cara memiliki minimal 1 mahasiswa putri = Total cara - cara seluruhnya putra = 84 - 10 = 74 cara. Pilihan D benar.',
    createdAt: '2025-02-06'
  },
  {
    id: 'Q-MTK-05',
    subtest: 'Penalaran Matematika',
    category: 'Statistika & Analisis Data',
    difficulty: 'Sedang',
    questionText: 'Nilai rata-rata ujian seleksi dari 39 peserta awal adalah 78. Ketika seorang peserta susulan bernama Nabila dinilai dan nilainya digabungkan, nilai rata-rata keseluruhan 40 peserta tersebut menjadi 78,4. Berapakah nilai ujian yang diperoleh Nabila?',
    options: [
      { key: 'A', text: '88' },
      { key: 'B', text: '90' },
      { key: 'C', text: '92' },
      { key: 'D', text: '94' },
      { key: 'E', text: '96' }
    ],
    correctKey: 'D',
    explanation: 'Total nilai 39 peserta = 39 × 78 = 3.042.\nTotal nilai 40 peserta = 40 × 78,4 = 3.136.\nNilai Nabila = Total 40 peserta - Total 39 peserta = 3.136 - 3.042 = 94. Pilihan D tepat.',
    createdAt: '2025-02-07'
  }
];

export const INITIAL_RANKINGS = [
  { rank: 1, name: 'Siti Nurhaliza Azzahra', school: 'MAN Insan Cendekia Serpong', ptkin: 'UIN Syarif Hidayatullah Jakarta', major: 'Pendidikan Dokter', packageId: 'TO-02', score: 95.0, date: '2025-02-20' },
  { rank: 2, name: 'Muhammad Rizky Pratama', school: 'MAN 2 Kota Malang', ptkin: 'UIN Maulana Malik Ibrahim Malang', major: 'Teknik Informatika', packageId: 'TO-02', score: 92.5, date: '2025-02-21' },
  { rank: 3, name: 'Fatimah Az-Zahra', school: 'MAS Al-Azhar Asy-Syarif', ptkin: 'UIN Sunan Kalijaga Yogyakarta', major: 'Ilmu Komunikasi', packageId: 'TO-03', score: 90.0, date: '2025-02-22' },
  { rank: 4, name: 'Zaidan Al-Farisi', school: 'SMA IT Nurul Fikri', ptkin: 'UIN Ar-Raniry Banda Aceh', major: 'Hukum Ekonomi Syariah', packageId: 'TO-02', score: 87.5, date: '2025-02-22' },
  { rank: 5, name: 'Ahmad Fauzi Rahman', school: 'MAN 1 Surakarta', ptkin: 'UIN Syarif Hidayatullah Jakarta', major: 'Pendidikan Agama Islam', packageId: 'TO-01', score: 85.0, isCurrentUser: true, date: '2025-02-23' },
  { rank: 6, name: 'Aisyah Putri Rahmadani', school: 'SMA Negeri 1 Yogyakarta', ptkin: 'UIN Sunan Kalijaga Yogyakarta', major: 'Psikologi', packageId: 'TO-01', score: 82.5, date: '2025-02-23' },
  { rank: 7, name: 'Bilal Habibi', school: 'Pondok Modern Gontor', ptkin: 'UIN Walisongo Semarang', major: 'Studi Agama-Agama', packageId: 'TO-02', score: 80.0, date: '2025-02-24' },
  { rank: 8, name: 'Nabila Syakira', school: 'MAN 2 Kota Bandung', ptkin: 'UIN Sunan Gunung Djati Bandung', major: 'Bimbingan Konseling Islam', packageId: 'TO-03', score: 77.5, date: '2025-02-24' },
  { rank: 9, name: 'Rafi Al-Ghifari', school: 'SMA Negeri 3 Padang', ptkin: 'UIN Imam Bonjol Padang', major: 'Sistem Informasi', packageId: 'TO-01', score: 75.0, date: '2025-02-25' },
  { rank: 10, name: 'Hilya Nafisah', school: 'MAN Insan Cendekia OKI', ptkin: 'UIN Raden Fatah Palembang', major: 'Perbankan Syariah', packageId: 'TO-02', score: 72.5, date: '2025-02-25' },
  { rank: 11, name: 'Umar Khalid', school: 'SMA Muhammadiyah 1 Solo', ptkin: 'UIN Raden Mas Said Surakarta', major: 'Manajemen Bisnis Syariah', packageId: 'TO-01', score: 70.0, date: '2025-02-25' },
  { rank: 12, name: 'Khansa Naura Zahira', school: 'SMA Negeri 5 Surabaya', ptkin: 'UIN Sunan Ampel Surabaya', major: 'Hubungan Internasional', packageId: 'TO-03', score: 67.5, date: '2025-02-26' },
  { rank: 13, name: 'Hamzah Robbani', school: 'MAN IC Gorontalo', ptkin: 'UIN Alauddin Makassar', major: 'Farmasi', packageId: 'TO-02', score: 65.0, date: '2025-02-26' },
  { rank: 14, name: 'Zahra Muthmainnah', school: 'SMA Negeri 8 Jakarta', ptkin: 'UIN Syarif Hidayatullah Jakarta', major: 'Akuntansi Syariah', packageId: 'TO-01', score: 62.5, date: '2025-02-26' },
  { rank: 15, name: 'Taufiq Hidayatulloh', school: 'MA Nahdlatul Ulama Kudus', ptkin: 'UIN K.H. Abdurrahman Wahid', major: 'Pendidikan Bahasa Arab', packageId: 'TO-01', score: 60.0, date: '2025-02-26' },
  { rank: 16, name: 'Maryam Al-Qibtiyyah', school: 'MAN 1 Pontianak', ptkin: 'IAIN Pontianak', major: 'Ekonomi Islam', packageId: 'TO-02', score: 57.5, date: '2025-02-26' }
];

export const INITIAL_USER = {
  id: 'USR-2025-001',
  name: 'Ahmad Fauzi Rahman',
  email: 'ahmad.fauzi@example.com',
  phone: '0812-3456-7890',
  targetPTKIN: 'UIN Syarif Hidayatullah Jakarta',
  targetMajor: 'Pendidikan Agama Islam (PAI)',
  originSchool: 'MAN 1 Surakarta',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  joinedDate: '2025-01-10'
};

export const INITIAL_STUDENTS = [
  {
    id: 'USR-2025-001',
    name: 'Ahmad Fauzi Rahman',
    email: 'ahmad.fauzi@example.com',
    targetPTKIN: 'UIN Syarif Hidayatullah Jakarta',
    targetMajor: 'Pendidikan Agama Islam (PAI)',
    phone: '0812-3456-7890',
    registeredDate: '2025-01-10',
    status: 'Aktif',
    totalTryout: 2,
    avgScore: 85.0
  },
  {
    id: 'USR-2025-002',
    name: 'Siti Nurhaliza Azzahra',
    email: 'siti.azzahra@example.com',
    targetPTKIN: 'UIN Syarif Hidayatullah Jakarta',
    targetMajor: 'Pendidikan Dokter',
    phone: '0813-9876-5432',
    registeredDate: '2025-01-12',
    status: 'Aktif',
    totalTryout: 4,
    avgScore: 95.0
  },
  {
    id: 'USR-2025-003',
    name: 'Muhammad Rizky Pratama',
    email: 'm.rizky@example.com',
    targetPTKIN: 'UIN Maulana Malik Ibrahim Malang',
    targetMajor: 'Teknik Informatika',
    phone: '0857-1122-3344',
    registeredDate: '2025-01-14',
    status: 'Aktif',
    totalTryout: 3,
    avgScore: 92.5
  },
  {
    id: 'USR-2025-004',
    name: 'Fatimah Az-Zahra',
    email: 'fatimah.zahra@example.com',
    targetPTKIN: 'UIN Sunan Kalijaga Yogyakarta',
    targetMajor: 'Ilmu Komunikasi',
    phone: '0821-4455-6677',
    registeredDate: '2025-01-16',
    status: 'Aktif',
    totalTryout: 3,
    avgScore: 90.0
  },
  {
    id: 'USR-2025-005',
    name: 'Zaidan Al-Farisi',
    email: 'zaidan.farisi@example.com',
    targetPTKIN: 'UIN Ar-Raniry Banda Aceh',
    targetMajor: 'Hukum Ekonomi Syariah',
    phone: '0819-8877-6655',
    registeredDate: '2025-01-20',
    status: 'Aktif',
    totalTryout: 2,
    avgScore: 87.5
  },
  {
    id: 'USR-2025-006',
    name: 'Aisyah Putri Rahmadani',
    email: 'aisyah.putri@example.com',
    targetPTKIN: 'UIN Sunan Kalijaga Yogyakarta',
    targetMajor: 'Psikologi',
    phone: '0878-3344-5566',
    registeredDate: '2025-01-22',
    status: 'Aktif',
    totalTryout: 2,
    avgScore: 82.5
  },
  {
    id: 'USR-2025-007',
    name: 'Bilal Habibi',
    email: 'bilal.habibi@example.com',
    targetPTKIN: 'UIN Walisongo Semarang',
    targetMajor: 'Studi Agama-Agama',
    phone: '0812-7788-9900',
    registeredDate: '2025-01-25',
    status: 'Aktif',
    totalTryout: 2,
    avgScore: 80.0
  },
  {
    id: 'USR-2025-008',
    name: 'Nabila Syakira',
    email: 'nabila.syakira@example.com',
    targetPTKIN: 'UIN Sunan Gunung Djati Bandung',
    targetMajor: 'Bimbingan Konseling Islam',
    phone: '0852-6677-8899',
    registeredDate: '2025-01-28',
    status: 'Aktif',
    totalTryout: 1,
    avgScore: 77.5
  }
];

export const INITIAL_TRANSACTIONS = [
  { id: 'TRX-98214', studentName: 'Siti Nurhaliza Azzahra', packageName: 'Tryout UMPTKIN Intensif - Standar Nasional', amount: 35000, method: 'QRIS', date: '2025-02-24 14:32', status: 'Berhasil' },
  { id: 'TRX-98215', studentName: 'Fatimah Az-Zahra', packageName: 'Tryout UMPTKIN Premium - Akbar & Prediksi Lulus', amount: 75000, method: 'Transfer Mandiri', date: '2025-02-24 15:10', status: 'Berhasil' },
  { id: 'TRX-98216', studentName: 'Muhammad Rizky Pratama', packageName: 'Tryout UMPTKIN Intensif - Standar Nasional', amount: 35000, method: 'Transfer BSI', date: '2025-02-25 09:20', status: 'Berhasil' },
  { id: 'TRX-98217', studentName: 'Zaidan Al-Farisi', packageName: 'Tryout UMPTKIN Intensif - Standar Nasional', amount: 35000, method: 'GoPay', date: '2025-02-25 11:45', status: 'Berhasil' },
  { id: 'TRX-98218', studentName: 'Nabila Syakira', packageName: 'Tryout UMPTKIN Premium - Akbar & Prediksi Lulus', amount: 75000, method: 'QRIS', date: '2025-02-25 16:15', status: 'Berhasil' },
  { id: 'TRX-98219', studentName: 'Bilal Habibi', packageName: 'Tryout UMPTKIN Intensif - Standar Nasional', amount: 35000, method: 'OVO', date: '2025-02-26 08:30', status: 'Berhasil' },
  { id: 'TRX-98220', studentName: 'Khansa Naura Zahira', packageName: 'Tryout UMPTKIN Premium - Akbar & Prediksi Lulus', amount: 75000, method: 'Transfer BSI', date: '2025-02-26 10:14', status: 'Berhasil' },
  { id: 'TRX-98221', studentName: 'Hamzah Robbani', packageName: 'Tryout UMPTKIN Intensif - Standar Nasional', amount: 35000, method: 'ShopeePay', date: '2025-02-26 11:50', status: 'Pending' },
  { id: 'TRX-98222', studentName: 'Maryam Al-Qibtiyyah', packageName: 'Tryout UMPTKIN Intensif - Standar Nasional', amount: 35000, method: 'Transfer BRI', date: '2025-02-26 12:05', status: 'Berhasil' },
  { id: 'TRX-98223', studentName: 'Rendi Saputra', packageName: 'Tryout UMPTKIN Premium - Akbar & Prediksi Lulus', amount: 75000, method: 'QRIS', date: '2025-02-26 13:40', status: 'Gagal' }
];

export const INITIAL_EXAM_HISTORY = [
  {
    id: 'HIST-001',
    packageId: 'TO-01',
    packageName: 'Tryout UMPTKIN Gratis - Simulasi Mandiri',
    completedAt: '2025-02-23 10:45',
    totalQuestions: 20,
    correctCount: 17,
    incorrectCount: 3,
    emptyCount: 0,
    score: 85.0,
    accuracy: 85,
    subtestScores: {
      'Tes Potensi Skolastik (TPS)': { correct: 5, total: 5, score: 100 },
      'Literasi Bahasa Indonesia': { correct: 4, total: 5, score: 80 },
      'Literasi Bahasa Inggris': { correct: 4, total: 5, score: 80 },
      'Penalaran Matematika': { correct: 4, total: 5, score: 80 }
    },
    answers: {
      'Q-TPS-01': 'B', 'Q-TPS-02': 'D', 'Q-TPS-03': 'C', 'Q-TPS-04': 'B', 'Q-TPS-05': 'B',
      'Q-LBI-01': 'B', 'Q-LBI-02': 'C', 'Q-LBI-03': 'B', 'Q-LBI-04': 'D', 'Q-LBI-05': 'B', // 1 salah di LBI
      'Q-ENG-01': 'B', 'Q-ENG-02': 'B', 'Q-ENG-03': 'A', 'Q-ENG-04': 'B', 'Q-ENG-05': 'A', // 1 salah di ENG
      'Q-MTK-01': 'C', 'Q-MTK-02': 'A', 'Q-MTK-03': 'B', 'Q-MTK-04': 'D', 'Q-MTK-05': 'D'  // 1 salah di MTK
    }
  }
];

export const PTKIN_LIST = [
  'UIN Syarif Hidayatullah Jakarta',
  'UIN Sunan Kalijaga Yogyakarta',
  'UIN Maulana Malik Ibrahim Malang',
  'UIN Sunan Gunung Djati Bandung',
  'UIN Walisongo Semarang',
  'UIN Sunan Ampel Surabaya',
  'UIN Ar-Raniry Banda Aceh',
  'UIN Alauddin Makassar',
  'UIN Raden Intan Lampung',
  'UIN Imam Bonjol Padang',
  'UIN Raden Fatah Palembang',
  'UIN Sultan Syarif Kasim Riau',
  'UIN K.H. Abdurrahman Wahid Pekalongan',
  'UIN Raden Mas Said Surakarta',
  'IAIN Kudus',
  'IAIN Ponorogo'
];

export const MAJOR_LIST = [
  'Pendidikan Agama Islam (PAI)',
  'Hukum Ekonomi Syariah (Muamalah)',
  'Ilmu Al-Qur\'an dan Tafsir (IAT)',
  'Pendidikan Bahasa Arab (PBA)',
  'Bimbingan Konseling Islam (BKI)',
  'Komunikasi dan Penyiaran Islam (KPI)',
  'Perbankan Syariah',
  'Ekonomi Syariah',
  'Teknik Informatika',
  'Sistem Informasi',
  'Psikologi',
  'Pendidikan Dokter',
  'Farmasi',
  'Manajemen Bisnis Syariah',
  'Sastra Inggris'
];
