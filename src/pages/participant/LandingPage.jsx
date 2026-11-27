import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentModal } from '../../components/common/PaymentModal';
import {
  PROMO_ITEMS,
  REGULAR_PACKAGES,
  BIMBEL_SUBJECTS,
  BIMBEL_RULES,
  VIP_BIMBEL_PROGRAM,
  ALUMNI_TESTIMONIALS,
  CONTACT_INFO
} from '../../data/initialData';
import bimbelMateriImg from '../../assets/bimbel-materi.jpg';
import bimbelZoomImg from '../../assets/bimbel-zoom.jpg';
import testimoniLolosImg from '../../assets/testimoni-lolos.jpg';
import testimoniChatImg from '../../assets/testimoni-chat.jpg';
import bimbelHeroAlumniImg from '../../assets/bimbel-hero-alumni.jpg';
import bimbelDapatApaImg from '../../assets/bimbel-dapat-apa.jpg';
import bimbel1000MuridImg from '../../assets/bimbel-1000-murid.jpg';
import bimbelQrWaImg from '../../assets/bimbel-qr-wa.jpg';
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
  Building2,
  Flame,
  Phone,
  MessageCircle,
  Volume2,
  ThumbsUp,
  Moon,
  Sun,
  Video,
  Users2,
  Calendar,
  CheckCircle
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
                <span>SIMULASI VIP UMPTKIN 2026 • Resmi Bersama Lenny Agustin, S. Pd.</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.18] text-white">
                SIMULASI VIP{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-200">
                  UMPTKIN 2026
                </span>
              </h1>

              {/* Subheading / Description */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Daftar sekarang dan rasakan vibes ujian asli SSE UMPTKIN 2026! Simulasi menggunakan website berstandar resmi, durasi 120 menit dengan 100 soal lengkap, countdown timer real-time, dan leaderboard nasional.
              </p>

              {/* Promo Price Highlight Banner */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-950/80 to-teal-900/60 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-3 text-left">
                <div>
                  <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    Biaya Administrasi Terjangkau
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">100 Soal + Timer 120 Menit + Tampilan SSE 2026</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 line-through mr-1">25.000</span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono text-emerald-400">Rp 10.000</span>
                </div>
              </div>

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
                      <span className="text-[11px] font-mono text-slate-300 font-bold ml-1.5">SSE UMPTKIN 2026 • VIP</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono font-bold text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>01:59:21</span>
                    </div>
                  </div>

                  {/* Subtest & Question Number */}
                  <div className="py-4 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/80 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
                        Literasi Bahasa • Soal Nomor 61
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">100 Soal • 120 Menit</span>
                    </div>

                    {/* Audio Player Bar Simulation like the poster */}
                    <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center gap-3 text-xs text-slate-300">
                      <Volume2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <div className="flex-1 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">0:07 / 0:23</span>
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-[30%] h-full bg-teal-500 rounded-full" />
                        </div>
                      </div>
                      <span className="text-[10px] bg-teal-950 text-teal-300 px-1.5 py-0.5 rounded border border-teal-800 font-mono">Audio Listening</span>
                    </div>

                    {/* Question Box */}
                    <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/70 text-xs text-slate-200 leading-relaxed font-normal">
                      "Dengarkan potongan percakapan di atas! Pilihlah respons yang paling tepat untuk melengkapi dialog tersebut."
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
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      {pkg.isFree ? (
                        <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono">GRATIS</span>
                      ) : (
                        <>
                          {pkg.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              Rp {pkg.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                          <span className="text-xs text-teal-700 font-bold">Rp</span>
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
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

      {/* 3.4 SECTION PAKET UMPTKIN (KATALOG RESMI) */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-teal-50/20 to-emerald-50/30 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
              Katalog Program Bimbingan & Buku
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5 tracking-tight uppercase">
              PAKET UMPTKIN
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Pilihan lengkap modul pembelajaran, sesi bimbingan tatap muka online, hingga garansi pendampingan sampai ujian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REGULAR_PACKAGES.map((pkg) => {
              const isBestSeller = pkg.isBestSeller;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl p-5.5 transition-all flex flex-col justify-between ${
                    isBestSeller
                      ? 'bg-gradient-to-b from-emerald-900 to-teal-950 text-white shadow-xl shadow-emerald-950/20 border-2 border-emerald-400 ring-2 ring-emerald-500/20'
                      : 'bg-white rounded-2xl border border-emerald-200/90 shadow-xs hover:shadow-md hover:border-emerald-400'
                  }`}
                >
                  {/* Best Seller & Promo Badges */}
                  {isBestSeller && (
                    <div className="absolute -top-3.5 right-4 flex items-center gap-1.5">
                      <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                        PROMO
                      </span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        BEST SELLER
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 shadow-xs ${
                          isBestSeller ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-700 text-white'
                        }`}
                      >
                        {pkg.number}
                      </span>
                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isBestSeller ? 'text-emerald-300' : 'text-emerald-700'
                          }`}
                        >
                          {pkg.category}
                        </span>
                        <h4
                          className={`text-sm sm:text-base font-extrabold leading-tight ${
                            isBestSeller ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {pkg.title}
                        </h4>
                      </div>
                    </div>

                    <p
                      className={`text-xs leading-relaxed mb-5 ${
                        isBestSeller ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {pkg.desc}
                    </p>
                  </div>

                  <div
                    className={`pt-3.5 border-t flex items-center justify-between gap-3 ${
                      isBestSeller ? 'border-emerald-800' : 'border-slate-100'
                    }`}
                  >
                    <div>
                      {pkg.discountPrice ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-rose-300 line-through">
                            Rp {pkg.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                            Rp {pkg.discountPrice.toLocaleString('id-ID')}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-lg sm:text-xl font-black font-mono ${
                              isBestSeller ? 'text-emerald-300' : 'text-slate-900'
                            }`}
                          >
                            Rp {pkg.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      )}
                    </div>

                    <a
                      href={`https://wa.me/6288247854631?text=${encodeURIComponent(
                        `Halo Kak ${CONTACT_INFO.authorName}, saya ingin mendaftar paket: "${pkg.title}" (Rp ${(
                          pkg.discountPrice || pkg.price
                        ).toLocaleString('id-ID')}). Mohon info pendaftarannya.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                        isBestSeller
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pilih Paket</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.5 SECTION PROMO MENJELANG UJIAN UMPTKIN !! */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-emerald-50/60 via-teal-50/40 to-white border-t border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-200">
              <Flame className="w-4 h-4 fill-rose-600 text-rose-600 animate-bounce" />
              <span>Promo Spesial Menjelang Ujian</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PROMO MENJELANG UJIAN UMPTKIN !!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Daftar sekarang dan nikmati harga spesial e-book, bimbingan belajar intensif, dan simulasi website resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROMO_ITEMS.map((item) => {
              const isSimulasi = !!item.packageId;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-emerald-200/80 p-5 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {item.number}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-1.5">
                      {item.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {item.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="text-xs text-rose-600 font-bold">Rp</span>
                      <span className="text-lg font-black text-rose-600 font-mono">
                        {item.discountPrice.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {isSimulasi ? (
                      <button
                        type="button"
                        onClick={() => navigateTo('package-detail', { packageId: item.packageId })}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <span>Coba Website</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/6288247854631?text=${encodeURIComponent(`Halo Kak ${CONTACT_INFO.authorName}, saya tertarik memesan promo "${item.title}" seharga Rp ${item.discountPrice.toLocaleString('id-ID')}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pesan via WA</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Bar for Promo */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-emerald-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Hubungi Official Admin / Pengajar:</p>
                <p className="text-xs text-emerald-700 font-semibold">{CONTACT_INFO.authorName} • WhatsApp: {CONTACT_INFO.whatsapp}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/info.umptkin"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span className="text-rose-600 font-extrabold text-xs">IG</span>
                <span>{CONTACT_INFO.instagramInfo}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3.6 SECTION BIMBEL SEMUA MATERI & ATURAN JADWAL MALAM */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle backdrop styling */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              Bimbingan Belajar Interaktif Online
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              BIMBEL SEMUA MATERI UMPTKIN
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Kuasai seluruh subtes ujian bersama Kak Lenny Agustin, S. Pd. Bebas pilih materi apa saja dan bebas tentukan jadwal belajar malam harimu.
            </p>
          </div>

          {/* Pricing Highlight Pill & Schedule Rules Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Pricing Options */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 p-6 sm:p-7 rounded-2xl border border-emerald-500/40 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-600/50">
                  Biaya Bimbingan Terjangkau
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-3">
                  Pilihan Sesi Bimbel
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Bebas pilih materi apa saja & sesi belajar tatap muka langsung via Zoom.
                </p>

                <div className="mt-5 space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Bimbel 1x Pertemuan</p>
                      <p className="text-[11px] text-emerald-300">Bebas pilih 1 materi favorit</p>
                    </div>
                    <span className="text-xl font-black text-emerald-400 font-mono">Rp 15.000</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-teal-500/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Bimbel 4x Pertemuan</p>
                      <p className="text-[11px] text-teal-300">Bebas pilih 4 materi & jadwal</p>
                    </div>
                    <span className="text-xl font-black text-teal-300 font-mono">Rp 60.000</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/50 to-emerald-950/50 border border-amber-500/50 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">GARANSI</span>
                      <p className="text-xs font-bold text-white mt-0.5">Bimbel sampai Ujian</p>
                    </div>
                    <span className="text-xl font-black text-amber-300 font-mono">Rp 120.000</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800">
                <a
                  href={`https://wa.me/6288247854631?text=${encodeURIComponent(
                    'Halo Kak Lenny Agustin, saya mau daftar Bimbel UMPTKIN. Mau tanya info jadwal dan materi yang tersedia.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Daftar Bimbel Sekarang (WA)</span>
                </a>
              </div>
            </div>

            {/* Right: Strict Night Schedule Rule Banner */}
            <div className="lg:col-span-7 bg-slate-800/90 p-6 sm:p-7 rounded-2xl border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                    <Moon className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white">
                      Ketentuan Jadwal Bimbingan Belajar
                    </h4>
                    <p className="text-xs text-amber-300 font-semibold">
                      Harap dibaca dan diperhatikan sebelum mendaftar:
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
                    <Moon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">Jadwal Bimbel Pasti MALAM Hari:</strong>
                      <span>Sesi pembelajaran berlangsung antara jam <strong>7 malam (19.00 WIB)</strong> atau jam <strong>8 malam (20.00 WIB)</strong> agar tidak mengganggu aktivitas sekolah/kerja.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-start gap-3">
                    <Sun className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">Tidak Ada Jadwal Pagi, Siang, & Sore:</strong>
                      <span>Semua kelas eksklusif dilaksanakan pada malam hari sesuai kesepakatan kelompok bimbingan.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-200 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">Fleksibilitas Penuh:</strong>
                      <span>Bebas pilih materi apa saja dan bebas pilih jadwal malam sesuai tanggal yang telah ditentukan pengajar.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poster Snapshot Preview */}
              <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Trophy className="w-4 h-4" />
                  {BIMBEL_RULES.stats}
                </span>
                <span className="text-[11px] text-slate-500">Live Zoom Interaktif</span>
              </div>
            </div>

          </div>

          {/* 6 Grid Pilihan Materi Bimbel */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">6 Pilihan Materi Bimbingan</h3>
                <p className="text-xs text-slate-400">Pilih materi yang ingin Anda kuasai lebih dalam</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BIMBEL_SUBJECTS.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-teal-400 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                      {sub.tag}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">0{idx + 1}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors">
                    {sub.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {sub.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Zoom Class Documentation & Proof */}
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Dokumentasi Langsung
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                BIMBELNYA ASIK DAN PASTI SERU LOH!
              </h3>
              <p className="text-xs text-slate-400">
                Suasana belajar interaktif via Zoom meeting bersama ratusan calon mahasiswa pejuang PTKIN.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-lg group">
                <div className="p-3 bg-slate-850 border-b border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Dokumentasi Bimbel Bersama Kak Lenny</span>
                  <span className="text-[10px] text-teal-400 font-mono">Zoom Room</span>
                </div>
                <img
                  src={bimbelZoomImg}
                  alt="Dokumentasi Zoom Bimbel Kak Lenny"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-lg group">
                <div className="p-3 bg-slate-850 border-b border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Materi Pembelajaran Lengkap & Handout</span>
                  <span className="text-[10px] text-teal-400 font-mono">Live Screen Sharing</span>
                </div>
                <img
                  src={bimbelMateriImg}
                  alt="Materi Bimbel UMPTKIN"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Testimoni Kelulusan PTKIN */}
          <div className="pt-8 border-t border-slate-800 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                Bukti Nyata Kelulusan
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                TESTIMONI LOLOS UMPTKIN BERSAMA KAK LENNY
              </h3>
              <p className="text-xs text-slate-400">
                Sudah meloloskan 1.000++ peserta UMPTKIN ke berbagai universitas Islam negeri unggulan di seluruh Indonesia.
              </p>
            </div>

            {/* Testimonials Quote Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALUMNI_TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3 flex flex-col justify-between"
                >
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div className="pt-2 border-t border-slate-700/60">
                    <p className="font-extrabold text-xs text-white">{t.name}</p>
                    <p className="text-[11px] text-emerald-400 font-medium">Lolos: {t.passedTo}</p>
                    <p className="text-[10px] text-slate-400">Prodi {t.major}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Real Screenshot Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-lg">
                <div className="p-3 bg-slate-850 border-b border-slate-700 text-xs font-semibold text-slate-300">
                  Pengumuman Resmi Kelulusan Siswa
                </div>
                <img
                  src={testimoniLolosImg}
                  alt="Bukti Lolos UMPTKIN Siswa Bimbel"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-lg">
                <div className="p-3 bg-slate-850 border-b border-slate-700 text-xs font-semibold text-slate-300">
                  Chat Apresiasi & Testimoni WhatsApp Siswa
                </div>
                <img
                  src={testimoniChatImg}
                  alt="Testimoni WhatsApp Siswa"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3.7 SPECIAL SHOWCASE: BIMBEL UMPTKIN SAMPAI UJIAN (BEST SELLER PROGRAM) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-emerald-950 via-slate-900 to-teal-950 text-white relative overflow-hidden border-t-4 border-amber-400">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Urgency & Headline Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/50 text-xs sm:text-sm font-extrabold uppercase tracking-wider animate-pulse">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{VIP_BIMBEL_PROGRAM.headline}</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              BIMBEL UMPTKIN SAMPAI UJIAN
            </h2>
            
            <p className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-widest">
              {VIP_BIMBEL_PROGRAM.subTitle}
            </p>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {VIP_BIMBEL_PROGRAM.description}
            </p>
          </div>

          {/* Pricing Card & Hero Visual Showcase */}
          <div className="bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-amber-400 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Price & Benefits list (Col 7) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    BEST SELLER
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    HEMAT 70.000
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-600/60 font-bold text-xs">
                    {VIP_BIMBEL_PROGRAM.quotaAlert}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    Rp {VIP_BIMBEL_PROGRAM.originalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-3xl sm:text-5xl font-black text-amber-300 font-mono">
                    Rp {VIP_BIMBEL_PROGRAM.promoPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-emerald-300 font-bold bg-emerald-950/80 px-2 py-1 rounded border border-emerald-600">
                    Akses Sampai Hari Ujian
                  </span>
                </div>

                {/* What will you get (Checklist) */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                    Kamu bakal dapat apa aja di program ini ?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                    {VIP_BIMBEL_PROGRAM.benefits.map((b, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-bold leading-tight">{b.title}</strong>
                          <span className="text-[11px] text-slate-300 mt-0.5 block leading-tight">{b.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action message & WA button */}
                <div className="pt-4 space-y-3">
                  <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-200 text-xs font-semibold leading-relaxed">
                    📢 {VIP_BIMBEL_PROGRAM.ctaText}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`https://wa.me/6288247854631?text=${encodeURIComponent(
                        'Halo Kak Lenny Agustin, saya mau daftar program "BIMBEL UMPTKIN SAMPAI UJIAN" promo Rp 130.000. Mohon info cara bergabungnya!'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Daftar Sekarang via WhatsApp</span>
                    </a>

                    <a
                      href="https://wa.me/6288247854631"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>0882-4785-4631 (Kak Lenny)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Poster Image Banner & Scan Barcode (Col 5) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-900">
                  <img
                    src={bimbelHeroAlumniImg}
                    alt="Bimbel UMPTKIN Sampai Ujian"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/90 p-4 flex items-center gap-4">
                  <div className="w-24 h-24 bg-white rounded-xl p-1 shrink-0 overflow-hidden">
                    <img
                      src={bimbelQrWaImg}
                      alt="Scan Barcode WhatsApp"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="font-extrabold text-amber-300 uppercase tracking-wide block">
                      Daftar Cepat via Scan Barcode
                    </span>
                    <p className="text-[11px] text-slate-300 leading-tight">
                      Arahkan kamera smartphone Anda ke kode QR untuk langsung chat dengan Kak Lenny.
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono">Respon Cepat 24 Jam</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Infographic: Dapat Apa Aja Kalo Ikut Program Ini & 1.000++ Murid Kami Sudah Berhasil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/90 shadow-xl">
              <div className="p-3.5 bg-slate-850 border-b border-slate-700 flex items-center justify-between text-xs font-bold text-slate-200">
                <span>DAPAT APA AJA KALO IKUT PROGRAM INI ?</span>
                <span className="text-amber-400 text-[10px]">Fasilitas Lengkap</span>
              </div>
              <img
                src={bimbelDapatApaImg}
                alt="Fasilitas Program Bimbel Ebook Premium"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/90 shadow-xl">
              <div className="p-3.5 bg-slate-850 border-b border-slate-700 flex items-center justify-between text-xs font-bold text-slate-200">
                <span>1.000++ MURID KAMI SUDAH BERHASIL MASUK KAMPUS IMPIAN</span>
                <span className="text-emerald-400 text-[10px]">Sekarang Giliran Kamu!</span>
              </div>
              <img
                src={bimbel1000MuridImg}
                alt="1000+ Murid Berhasil Lolos UMPTKIN"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

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
