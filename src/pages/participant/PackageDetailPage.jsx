import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentModal } from '../../components/common/PaymentModal';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  Layers,
  HelpCircle,
  Play
} from 'lucide-react';

export const PackageDetailPage = () => {
  const { packages, unlockedPackages, pageParams, navigateTo, startExam } = useApp();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const packageId = pageParams?.packageId || 'TO-01';
  const pkg = packages.find(p => p.id === packageId) || packages[0];
  const isUnlocked = pkg.isFree || unlockedPackages.includes(pkg.id);

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        {/* Package Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  pkg.isFree
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-teal-50 text-teal-700 border border-teal-200'
                }`}>
                  {pkg.isFree ? 'Paket Gratis' : `Paket Berbayar • Rp ${pkg.price.toLocaleString('id-ID')}`}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {pkg.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {pkg.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                {pkg.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start sm:items-end">
              <span className="text-[11px] text-slate-400 font-medium">Status Akses</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl mt-1 ${
                isUnlocked
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {isUnlocked ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Siap Dikerjakan
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Perlu Pembayaran
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>Jumlah Soal</span>
              </div>
              <div className="text-lg font-bold text-slate-900 font-mono">{pkg.questionCount} Butir</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Durasi Ujian</span>
              </div>
              <div className="text-lg font-bold text-slate-900 font-mono">{pkg.durationMinutes} Menit</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                <span>Subtes Soal</span>
              </div>
              <div className="text-lg font-bold text-slate-900 font-mono">4 Subtes</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                <span>Skala Nilai</span>
              </div>
              <div className="text-lg font-bold text-slate-900 font-mono">0 - 100</div>
            </div>
          </div>

          {/* Subtests Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>Komposisi 4 Subtes Ujian</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { name: 'Tes Potensi Skolastik (TPS)', desc: 'Penalaran logis, analitik, deret bilangan, dan analogi kata', count: 5 },
                { name: 'Literasi Bahasa Indonesia', desc: 'Ide pokok wacana, kalimat efektif PUEBI, dan simpulan teks', count: 5 },
                { name: 'Literasi Bahasa Inggris', desc: 'Reading comprehension, academic vocabulary, dan inference', count: 5 },
                { name: 'Penalaran Matematika', desc: 'Aritmetika sosial syariah, sistem aljabar, dan statistika', count: 5 }
              ].map((sub, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">{sub.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{sub.desc}</p>
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0 ml-2">
                    {sub.count} Soal
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules and Scoring System */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Petunjuk Teknis & Ketentuan Ujian</span>
            </h3>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Timer hitung mundur berjalan otomatis sejak tombol "Mulai Ujian" ditekan.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Peserta dapat berpindah nomor soal secara bebas dan menandai nomor yang masih ragu-ragu.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Penilaian: Setiap jawaban benar bernilai <strong>+5 poin</strong>. Tidak ada sistem nilai minus.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Batas waktu habis otomatis mensubmit seluruh lembar jawaban peserta ke server penilaian.</span>
              </div>
            </div>
          </div>

          {/* Action Button Section */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Pastikan koneksi internet stabil sebelum memulai ujian.
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Kembali
              </button>

              {isUnlocked ? (
                <button
                  type="button"
                  onClick={() => startExam(pkg.id)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Mulai Pengerjaan Ujian</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPaymentOpen(true)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buka Akses Paket (Rp {pkg.price.toLocaleString('id-ID')})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        packageItem={pkg}
      />
    </div>
  );
};
