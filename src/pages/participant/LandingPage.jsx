import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentModal } from '../../components/common/PaymentModal';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Trophy,
  BookOpen,
  Clock,
  ChevronDown,
  ShieldCheck,
  Zap,
  BarChart3,
  Award,
  Layers,
  Check,
  Building2
} from 'lucide-react';

export const LandingPage = () => {
  const { packages, unlockedPackages, navigateTo, currentUser } = useApp();
  const [selectedPayPackage, setSelectedPayPackage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Apa itu platform Tryout UMPTKIN ini?',
      a: 'Tryout UMPTKIN adalah platform simulasi ujian online berbasis Sistem Seleksi Elektronik (SSE) yang dirancang khusus untuk membantu calon mahasiswa mempersiapkan diri menghadapi seleksi masuk Perguruan Tinggi Keagamaan Islam Negeri (UIN, IAIN, STAIN).'
    },
    {
      q: 'Apakah format dan komposisi subtes sudah sesuai standar terbaru?',
      a: 'Ya, seluruh butir soal disusun mengacu pada kisi-kisi resmi Panitia Pusat UMPTKIN terbaru yang mencakup 4 subtes utama: Tes Potensi Skolastik (TPS), Literasi Bahasa Indonesia, Literasi Bahasa Inggris, dan Penalaran Matematika.'
    },
    {
      q: 'Bagaimana sistem penilaian (scoring) yang diterapkan?',
      a: 'Sistem penilaian menggunakan skala nilai 0-100 yang dihitung proporsional berdasarkan jumlah jawaban benar tanpa penalti nilai minus untuk jawaban salah, disertai analisis ketepatan dan waktu pengerjaan.'
    },
    {
      q: 'Apakah saya bisa melihat pembahasan soal setelah selesai tryout?',
      a: 'Tentu saja! Setelah ujian diselesaikan, Anda akan langsung mendapatkan laporan skor lengkap, grafik performa per subtes, serta akses ke halaman e-pembahasan komprehensif untuk seluruh butir soal.'
    },
    {
      q: 'Apakah tryout ini dapat diakses melalui smartphone atau tablet?',
      a: 'Ya, website Tryout UMPTKIN didesain 100% responsif dan nyaman digunakan baik di laptop/desktop, tablet, maupun layar smartphone dengan navigasi nomor soal yang fleksibel.'
    }
  ];

  const handleStartPackage = (pkg) => {
    if (pkg.isFree || unlockedPackages.includes(pkg.id)) {
      navigateTo('package-detail', { packageId: pkg.id });
    } else {
      setSelectedPayPackage(pkg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-teal-950 via-slate-900 to-slate-900 text-white">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-12 left-12 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-12 right-12 w-80 h-80 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & CTA (Col 7) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/25 text-teal-300 text-xs font-medium backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulasi Standar SSE Panitia Pusat UMPTKIN 2025</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.18] text-white">
                Persiapkan Langkahmu Menuju{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-200">
                  PTKIN Impian
                </span>
              </h1>

              {/* Subheading / Description */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Simulasi Computer-Based Test (CBT) terstandarisasi dengan materi HOTS, countdown timer real-time, analisis kelemahan subtes, dan perankingan nasional menuju UIN, IAIN, dan STAIN se-Indonesia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => navigateTo('package-detail', { packageId: 'TO-01' })}
                  className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-md shadow-teal-500/20 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <span>Mulai Tryout Gratis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('daftar-paket');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-teal-300" />
                  <span>Lihat Pilihan Paket</span>
                </button>
              </div>

              {/* Micro Trust Markers */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-3 text-xs text-slate-300 font-medium text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Timer Real-Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Skor Skala 0-100</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Leaderboard Nasional</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card / CBT Exam Mockup (Col 5) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none w-full">
                
                {/* CBT Window Mockup */}
                <div className="relative bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl shadow-slate-950/40 p-5 sm:p-6 backdrop-blur-md">
                  
                  {/* Window Bar Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-700/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-slate-400 ml-1.5">SSE UMPTKIN • CBT Online</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono font-bold text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>28:45</span>
                    </div>
                  </div>

                  {/* Subtest & Question Number */}
                  <div className="py-4 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/80 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
                        Tes Potensi Skolastik (TPS)
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">Soal 1 / 20</span>
                    </div>

                    {/* Question Box */}
                    <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/70 text-xs text-slate-200 leading-relaxed font-normal">
                      "Semua mahasiswa PTKIN yang berprestasi memperoleh beasiswa tahfidz atau riset ilmiah. Sebagian mahasiswa Perbankan Syariah berprestasi. Ihsan berprestasi dan tidak menyetorkan hafalan..."
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg border border-slate-700/60 bg-slate-800/30 text-slate-300 flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-slate-700/80 text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                          A
                        </span>
                        <span className="text-[11px]">Ihsan bukan mahasiswa berprestasi.</span>
                      </div>

                      <div className="p-2.5 rounded-lg border border-teal-500/70 bg-teal-950/50 text-teal-100 flex items-center gap-2.5 font-medium ring-1 ring-teal-500/30">
                        <span className="w-5 h-5 rounded-md bg-teal-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                          B
                        </span>
                        <span className="text-[11px]">Ihsan memperoleh beasiswa riset ilmiah.</span>
                        <Check className="w-3.5 h-3.5 text-teal-400 ml-auto shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Mockup Footer */}
                  <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Jawaban Tersimpan</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/60">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Skor: 85.0</span>
                    </div>
                  </div>

                </div>

                {/* Floating Card: Refined and tasteful placement */}
                <div className="mt-3 sm:mt-0 sm:absolute -bottom-4 -left-4 bg-white text-slate-900 px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[11px] font-medium text-slate-500">Tingkat Kelulusan</p>
                    <p className="text-xs font-extrabold text-emerald-600">89.4% Lolos Seleksi PTKIN</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (ELEVATED CARD TRANSITION) */}
      <section className="-mt-8 sm:-mt-10 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-900/5 p-6 sm:p-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            <div className="pt-2 lg:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono tracking-tight">15.200+</div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Peserta Terdaftar</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Calon mahasiswa se-Indonesia</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono tracking-tight">4 Subtes</div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Kisi-Kisi Resmi</p>
              <p className="text-[11px] text-slate-400 mt-0.5">TPS, BI, Inggris & MTK</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono tracking-tight">98.6%</div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Tingkat Kepuasan</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Ulasan positif peserta ujian</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono tracking-tight">58 Kampus</div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Target PTKIN</p>
              <p className="text-[11px] text-slate-400 mt-0.5">UIN, IAIN & STAIN Nasional</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PAKET TRYOUT SECTION */}
      <section id="daftar-paket" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Koleksi Simulasi Ujian
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            Pilihan Paket Tryout UMPTKIN Terbaik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Mulai dari simulasi gratis untuk pemanasan hingga paket intensif HOTS dengan pembahasan detail dan perankingan nasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg) => {
            const isUnlocked = pkg.isFree || unlockedPackages.includes(pkg.id);
            const isPopular = pkg.badge === 'Terpopuler';

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 ${
                  isPopular
                    ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                        pkg.isFree
                          ? 'bg-slate-800 text-white'
                          : isPopular
                          ? 'bg-teal-600 text-white'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 mt-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5 min-h-[40px]">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      {pkg.isFree ? (
                        <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono">GRATIS</span>
                      ) : (
                        <>
                          <span className="text-xs text-slate-500 font-medium">Rp</span>
                          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                            {pkg.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">/ paket</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Akses penuh untuk 1 akun peserta</p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span><strong>{pkg.questionCount} Butir Soal</strong> 4 Subtes Standar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span><strong>Durasi {pkg.durationMinutes} Menit</strong> Real-Time Countdown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Laporan Skor & Analisis Jawaban</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Leaderboard Peringkat Nasional</span>
                    </div>
                    {pkg.price > 0 && (
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Kunci Jawaban & E-Pembahasan Penuh</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Button */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleStartPackage(pkg)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isUnlocked
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                        : isPopular
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <span>Mulai Ujian Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Beli & Ikuti Tryout</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('package-detail', { packageId: pkg.id })}
                    className="w-full py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Lihat Rincian & Aturan Soal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. KEUNGGULAN PLATFORM */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Fitur Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
              Mengapa Memilih Tryout UMPTKIN?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Didesain khusus untuk menghadirkan pengalaman simulasi ujian yang otentik dan membangun kepercayaan diri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3.5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Simulasi SSE Mirip Asli</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Antarmuka pengerjaan soal dirancang presisi menyerupai Sistem Seleksi Elektronik resmi UMPTKIN.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3.5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">4 Subtes Lengkap</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                TPS, Literasi Bahasa Indonesia, Literasi Bahasa Inggris, dan Penalaran Matematika berbobot HOTS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3.5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Analisis Nilai Instan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Grafik performa per subtes langsung keluar setelah ujian selesai beserta saran belajar terarah.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3.5">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Leaderboard Nasional</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bandingkan skormu secara langsung dengan ribuan calon mahasiswa PTKIN dari seluruh penjuru Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ROADMAP CARA MENGIKUTI TRYOUT */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Langkah Mudah Mengikuti Tryout
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Hanya perlu 4 langkah praktis untuk mulai menguji kemampuanmu sekarang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                1
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Pilih Paket Ujian</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pilih paket gratis atau premium sesuai target belajar dan kebutuhan persiapanmu.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                2
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Kerjakan Soal Ujian</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Jawab 20 butir soal dengan countdown timer real-time dan tandai nomor yang masih ragu.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                3
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Dapatkan Skor Otomatis</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sistem menghitung otomatis skor skala 0-100 dan persentase ketepatan per subtes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                4
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Pelajari Pembahasan</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Akses pembahasan detail untuk setiap soal dan cek posisimu di peringkat nasional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Pusat Bantuan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-800 hover:text-teal-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM BANNER CTA */}
      <section className="bg-gradient-to-r from-teal-800 to-emerald-700 py-14 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2.5 tracking-tight">
            Siap Menembus PTKIN Impianmu Tahun Ini?
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Jangan tunggu hingga hari H. Uji kesiapanmu sekarang dengan simulasi Computer-Based Test terpercaya.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('package-detail', { packageId: 'TO-01' })}
            className="px-7 py-3 bg-white text-teal-900 hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Mulai Ujian Gratis Sekarang
          </button>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={!!selectedPayPackage}
        onClose={() => setSelectedPayPackage(null)}
        packageItem={selectedPayPackage}
      />
    </div>
  );
};
