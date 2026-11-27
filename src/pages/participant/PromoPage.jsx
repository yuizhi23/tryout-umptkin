import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentModal } from '../../components/common/PaymentModal';
import {
  PROMO_ITEMS,
  REGULAR_PACKAGES,
  BIMBEL_SUBJECTS,
  BIMBEL_RULES,
  VIP_BIMBEL_PROGRAM,
  FREE_COMMUNITY_GROUPS,
  ALUMNI_TESTIMONIALS,
  CONTACT_INFO
} from '../../data/initialData';

// Image assets
import logoImg from '../../assets/logo.png';
import qrisLennyImg from '../../assets/qris-lenny.jpg';
import bimbelMateriImg from '../../assets/bimbel-materi.jpg';
import bimbelZoomImg from '../../assets/bimbel-zoom.jpg';
import testimoniLolosImg from '../../assets/testimoni-lolos.jpg';
import testimoniChatImg from '../../assets/testimoni-chat.jpg';
import bimbelHeroAlumniImg from '../../assets/bimbel-hero-alumni.jpg';
import bimbelDapatApaImg from '../../assets/bimbel-dapat-apa.jpg';
import bimbel1000MuridImg from '../../assets/bimbel-1000-murid.jpg';
import bimbelQrWaImg from '../../assets/bimbel-qr-wa.jpg';
import grupSpanImg from '../../assets/grup-span-umptkin.jpg';
import grupSnbtImg from '../../assets/grup-snbp-snbt.jpg';
import grupKipImg from '../../assets/grup-kip-kuliah.jpg';
import grupPejuangImg from '../../assets/grup-pejuang-ptn.jpg';

import {
  Flame,
  Sparkles,
  CheckCircle2,
  Trophy,
  BookOpen,
  Clock,
  ShieldCheck,
  Video,
  Users2,
  MessageCircle,
  Phone,
  ArrowRight,
  ArrowLeft,
  ThumbsUp,
  Moon,
  Ban,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Tag,
  Building2,
  Wallet
} from 'lucide-react';

export const PromoPage = () => {
  const { navigateTo, packages, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'bimbel-vip', 'simulasi', 'paket-buku', 'pembayaran', 'grup'
  const [selectedPayPackage, setSelectedPayPackage] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Berhasil menyalin ${text}`, 'success', 2000);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const navTabs = [
    { id: 'all', label: 'Semua Program & Promo' },
    { id: 'bimbel-vip', label: 'Bimbel Sampai Ujian (130k)' },
    { id: 'simulasi', label: 'Simulasi VIP UMPTKIN' },
    { id: 'paket-buku', label: 'Katalog Paket & E-Book' },
    { id: 'pembayaran', label: 'Metode Pembayaran' },
    { id: 'grup', label: 'Grup Komunitas (Rp 0)' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. HERO PROMO HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-slate-950 via-teal-950 to-slate-900 border-b border-emerald-900/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Back button */}
          <div>
            <button
              onClick={() => navigateTo('landing')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-teal-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda Utama
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/50 text-xs font-extrabold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
                <span>Pusat Promo & Informasi Resmi UMPTKIN 2026</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                KATALOG PROMO & PROGRAM SPESIAL
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Koleksi lengkap program bimbingan belajar, modul e-book premium, simulasi SSE UMPTKIN 2026, panduan pembayaran resmi, dan link grup belajar gratis bersama <strong className="text-emerald-400">Lenny Agustin, S. Pd.</strong>
              </p>
            </div>

            {/* Author / Official Contact Badge */}
            <div className="bg-slate-850/90 border border-emerald-500/40 p-4 rounded-2xl flex items-center gap-3 shrink-0 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain drop-shadow" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Official Tutor & Mentor</p>
                <p className="text-sm font-black text-white">{CONTACT_INFO.authorName}</p>
                <p className="text-xs text-emerald-400 font-mono font-bold">{CONTACT_INFO.whatsapp}</p>
              </div>
            </div>
          </div>

          {/* Quick Filter Navigation Tabs */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN PROMO CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">

        {/* SECTION A: BIMBEL UMPTKIN SAMPAI UJIAN (Rp 130.000) */}
        {(activeTab === 'all' || activeTab === 'bimbel-vip') && (
          <section className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 border-2 border-amber-400 p-6 sm:p-9 rounded-3xl shadow-2xl relative overflow-hidden space-y-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-emerald-800/80 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    BEST SELLER
                  </span>
                  <span className="bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    PROMO HEMAT 70.000
                  </span>
                  <span className="bg-rose-950 text-rose-300 border border-rose-600/60 text-xs font-bold px-3 py-1 rounded-full">
                    KUOTA TERBATAS ❌️
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  BIMBEL UMPTKIN SAMPAI UJIAN
                </h2>
                <p className="text-xs sm:text-sm text-amber-300 font-extrabold uppercase tracking-wider">
                  PROGRAM EBOOK PREMIUM • BONGKAR SOAL LANGSUNG BERSAMA TENTOR
                </p>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {VIP_BIMBEL_PROGRAM.headline}
                </p>
              </div>

              <div className="text-right shrink-0 bg-slate-900/80 p-4 rounded-2xl border border-emerald-600/50">
                <span className="text-xs text-slate-400 line-through block">Rp 200.000</span>
                <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">Rp 130.000</span>
                <span className="text-[11px] text-emerald-400 block font-semibold mt-1">Akses Pendampingan s.d Hari Ujian</span>
              </div>
            </div>

            {/* Poster Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900 shadow-md">
                <img src={bimbelHeroAlumniImg} alt="Bimbel Hero" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900 shadow-md">
                <img src={bimbelDapatApaImg} alt="Dapat Apa Aja" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900 shadow-md">
                <img src={bimbel1000MuridImg} alt="1000 Murid Lolos" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900 shadow-md p-4 flex flex-col justify-between text-center">
                <div>
                  <span className="text-[11px] font-black text-amber-300 uppercase block mb-1">SCAN UNTUK DAFTAR</span>
                  <p className="text-[11px] text-slate-300 mb-2">Kak Lenny (0882-4785-4631)</p>
                  <img src={bimbelQrWaImg} alt="QR WA" className="w-36 h-36 mx-auto object-contain bg-white rounded-xl p-1" />
                </div>
                <a
                  href="https://wa.me/6288247854631?text=Halo%20Kak%20Lenny%2C%20saya%20mau%20daftar%20BIMBEL%20UMPTKIN%20SAMPAI%20UJIAN%20Rp%20130.000"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Daftar via WA</span>
                </a>
              </div>
            </div>

            {/* Checklist Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {VIP_BIMBEL_PROGRAM.benefits.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-850/80 border border-slate-700/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-xs">{b.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Warning CTA */}
            <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-amber-200 font-semibold">
                📢 {VIP_BIMBEL_PROGRAM.ctaText}
              </p>
              <a
                href="https://wa.me/6288247854631?text=Halo%20Kak%20Lenny%2C%20saya%20mau%20daftar%20BIMBEL%20UMPTKIN%20SAMPAI%20UJIAN%20Rp%20130.000"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shrink-0 shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ambil Promo 130 Ribu</span>
              </a>
            </div>
          </section>
        )}

        {/* SECTION B: SIMULASI VIP UMPTKIN (100 SOAL • 120 MENIT) */}
        {(activeTab === 'all' || activeTab === 'simulasi') && (
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800 uppercase tracking-wider">
                Simulasi Berstandar SSE Panitia Pusat 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                SIMULASI VIP UMPTKIN (WEBSITE CBT)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Rasakan vibes ujian asli SSE UMPTKIN 2026 dengan hitung mundur 120 menit dan 100 soal lengkap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-slate-800/90 rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                    pkg.badge === 'Paling Diminati'
                      ? 'border-emerald-500 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {pkg.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{pkg.questionCount} Soal</span>
                    </div>

                    <h3 className="font-extrabold text-base text-white mb-2">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{pkg.description}</p>

                    <div className="mb-4 pb-4 border-b border-slate-700/80">
                      <div className="flex items-baseline gap-1.5">
                        {pkg.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            Rp {pkg.originalPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                        <span className="text-2xl font-black text-emerald-400 font-mono">
                          {pkg.isFree ? 'GRATIS' : `Rp ${pkg.price.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>Durasi {pkg.durationMinutes} Menit Real-Time</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Skor Otomatis & Leaderboard Nasional</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>Kunci Jawaban & E-Pembahasan</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (pkg.isFree) {
                        navigateTo('package-detail', { packageId: pkg.id });
                      } else {
                        setSelectedPayPackage(pkg);
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow ${
                      pkg.badge === 'Paling Diminati'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    <span>{pkg.isFree ? 'Coba Sekarang (Gratis)' : 'Beli & Ikuti Ujian'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION C: 6 PILIHAN PAKET UMPTKIN (KATALOG RESMI BUKU & BIMBEL) */}
        {(activeTab === 'all' || activeTab === 'paket-buku') && (
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800 uppercase tracking-wider">
                Katalog Paket Belajar UMPTKIN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                PILIHAN PAKET BIMBEL & E-BOOK
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Mulai dari paket satuan per pertemuan, e-book dasar/premium, hingga paket pendampingan ujian.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {REGULAR_PACKAGES.map((pkg) => {
                const isBest = pkg.isBestSeller;
                return (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                      isBest
                        ? 'bg-gradient-to-br from-emerald-950 to-slate-900 border-amber-400 shadow-xl'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center ${
                            isBest ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                          }`}>
                            {pkg.number}
                          </span>
                          <span className="text-[10px] font-bold uppercase text-emerald-400">{pkg.category}</span>
                        </div>
                        {isBest && (
                          <span className="text-[9px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full">
                            BEST SELLER
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-white mb-2">{pkg.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{pkg.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between gap-3">
                      <div>
                        {pkg.discountPrice ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-slate-500 line-through">
                              Rp {pkg.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-lg font-black text-amber-300 font-mono">
                              Rp {pkg.discountPrice.toLocaleString('id-ID')}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-black text-white font-mono">
                            Rp {pkg.price.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/6288247854631?text=${encodeURIComponent(`Halo Kak Lenny, saya mau pesan paket: ${pkg.title}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                          isBest ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pesan WA</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Aturan Jadwal Bimbel Malam */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm text-white">Ketentuan Jadwal Bimbel:</h4>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Bimbel 1x Pertemuan = <strong>Rp 15.000</strong> | Bimbel 4x Pertemuan = <strong>Rp 60.000</strong>.</li>
                <li><strong>Bebas pilih mau Bimbel materi apa saja</strong> (Penalaran Akademik, Bahasa Arab, Bahasa Indonesia, Matematika, Bahasa Inggris, Literasi Keislaman).</li>
                <li><strong>Jadwal Bimbel PASTI MALAM</strong> (antara jam 7 atau 8 malam / 19.00 - 20.00 WIB).</li>
                <li><strong className="text-rose-400">TIDAK ADA Jadwal Bimbel Pagi, Siang, maupun Sore</strong>.</li>
              </ul>
            </div>
          </section>
        )}

        {/* SECTION D: TRANSAKSI & METODE PEMBAYARAN RESMI */}
        {(activeTab === 'all' || activeTab === 'pembayaran') && (
          <section className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 uppercase tracking-wider">
                Resmi & Aman
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                TRANSAKSI PEMBAYARAN
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Seluruh pembayaran menggunakan rekening & e-wallet resmi atas nama <strong className="text-emerald-400">LENNY AGUSTIN</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* QRIS Lenny */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 text-center space-y-3">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
                  SATU QRIS UNTUK SEMUA
                </span>
                <div className="w-44 h-48 mx-auto bg-white rounded-xl p-2 flex items-center justify-center">
                  <img src={qrisLennyImg} alt="QRIS Lenny Agustin" className="w-full h-full object-contain" />
                </div>
                <div className="text-xs text-slate-300">
                  <p className="font-extrabold text-white">LENNY AGUSTIN</p>
                  <p className="text-[11px] text-slate-400">NMID: ID1025403090752 A01</p>
                  <p className="text-[10px] text-slate-400 mt-1">Scan via GoPay, DANA, OVO, ShopeePay, BCA, Mandiri, BRImo, BSI</p>
                </div>
              </div>

              {/* BRI */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-black text-white uppercase">BANK BRI</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Nomor Rekening:</p>
                  <p className="text-lg font-mono font-black text-white mt-0.5">3628-0103-8429-530</p>
                  <p className="text-xs text-emerald-400 font-bold mt-1">a.n. LENNY AGUSTIN</p>
                </div>
                <button
                  onClick={() => copyToClipboard('362801038429530', 'bri-promo')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'bri-promo' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'bri-promo' ? 'Rekening Tersalin' : 'Salin No Rekening'}</span>
                </button>
              </div>

              {/* DANA */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-black text-white uppercase">E-WALLET DANA</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Nomor Akun:</p>
                  <p className="text-lg font-mono font-black text-white mt-0.5">0882-4785-4631</p>
                  <p className="text-xs text-emerald-400 font-bold mt-1">a.n. LENNY AGUSTIN</p>
                </div>
                <button
                  onClick={() => copyToClipboard('088247854631', 'dana-promo')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'dana-promo' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'dana-promo' ? 'Nomor Tersalin' : 'Salin Nomor DANA'}</span>
                </button>
              </div>
            </div>

            {/* Format Konfirmasi WhatsApp Box */}
            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-600/50 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="font-extrabold text-sm text-white">FORMAT KONFIRMASI PEMBAYARAN:</h4>
              </div>
              <p className="text-xs text-slate-300">
                Kirimkan bukti transaksi berisi foto/screenshot dengan menampilkan tanggal, jam, pengirim, penerima, serta nominal.
              </p>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-emerald-700/60 font-mono text-xs text-emerald-300 space-y-1">
                <p>Nama Peserta = [Nama Lengkap Anda]</p>
                <p>Order Paket = [Nama Paket Yang Dipesan]</p>
                <p>Kirim ke = BRI / Dana / QRIS</p>
                <p>Jam Terkirim = [Jam Pembayaran]</p>
              </div>
              <a
                href="https://wa.me/6288247854631?text=Halo%20Kak%20Lenny%2C%20saya%20sudah%20melakukan%20pembayaran.%20Berikut%20format%20konfirmasi%20saya%3A%0ANama%20Peserta%20%3D%20%0AOrder%20Paket%20%3D%20%0AKirim%20ke%20%3D%20%0AJam%20Terkirim%20%3D%20"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl inline-flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Bukti Pembayaran ke WhatsApp (0882-4785-4631)</span>
              </a>
            </div>
          </section>
        )}

        {/* SECTION E: GRUP KOMUNITAS BELAJAR (GRATIS RP 0) */}
        {(activeTab === 'all' || activeTab === 'grup') && (
          <section className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 uppercase tracking-wider">
                GRATIS 100% (Rp 0)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                GRUP KOMUNITAS BELAJAR WHATSAPP & SALURAN
              </h2>
              
              {/* Mandatory User Rule Callout */}
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-2">
                <Ban className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Semua bisa masuk grup ASAL TIDAK PROMOSI APAPUN ITU ‼️</span>
              </div>
            </div>

            {/* Poster Grid of WhatsApp Groups */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                <img src={grupSpanImg} alt="Grup SPAN UMPTKIN" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                <img src={grupSnbtImg} alt="Grup SNBT UTBK" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                <img src={grupKipImg} alt="Grup KIP Kuliah" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                <img src={grupPejuangImg} alt="Grup Pejuang PTN" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Categories of Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {FREE_COMMUNITY_GROUPS.categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="font-extrabold text-xs text-white">{cat.categoryName}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{cat.badge}</span>
                  </div>
                  <div className="space-y-1.5">
                    {cat.groups.map((g, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 text-slate-300">
                        <span>{g.name}</span>
                        <a
                          href="https://wa.me/6288247854631?text=Halo%20Kak%20Lenny%2C%20mau%20gabung%20ke%20grup%20komunitas%20belajar%20(Saya%20berjanji%20tidak%20akan%20promosi%20apapun)."
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
                        >
                          Join WA ➔
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={!!selectedPayPackage}
        onClose={() => setSelectedPayPackage(null)}
        packageItem={selectedPayPackage}
      />
    </div>
  );
};
