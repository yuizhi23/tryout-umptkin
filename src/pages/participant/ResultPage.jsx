import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const ResultPage = () => {
  const { examHistory, pageParams, currentUser, navigateTo } = useApp();

  const resultId = pageParams?.resultId;
  const result = examHistory.find(h => h.id === resultId) || examHistory[0];

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-xs max-w-md">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h2 className="text-base font-bold text-slate-800">Data Hasil Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Silakan kerjakan salah satu paket tryout untuk melihat laporan nilai.
          </p>
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Find highest and lowest subtest
  const subtests = Object.entries(result.subtestScores || {});
  subtests.sort((a, b) => b[1].score - a[1].score);

  const highestSubtest = subtests[0];
  const lowestSubtest = subtests[subtests.length - 1];

  // Learning advice generator
  const getRecommendation = () => {
    if (result.score >= 85) {
      return 'Luar biasa! Skor Anda sudah sangat kompetitif untuk menembus program studi favorit di PTKIN pilihan pertama. Pertahankan konsistensi latihan dan pertegas kecepatan pengerjaan soal HOTS.';
    }
    if (result.score >= 70) {
      return `Performa yang sangat baik. Tingkatkan fokus pada subtes ${lowestSubtest ? lowestSubtest[0] : 'terendah'} dengan mempelajari pola soal dan manajemen waktu agar peluang lolos semakin maksimal.`;
    }
    return `Tetap semangat! Perbanyak latihan pada konsep dasar ${lowestSubtest ? lowestSubtest[0] : 'subtes terkait'}, pelajari pembahasan secara mendalam, dan coba ikuti simulasi tryout intensif berikutnya.`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. CELEBRATION RESULT HERO CARD */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-md border border-teal-800/80 text-center">
          <div className="relative z-10 max-w-lg mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulasi Ujian Selesai & Dinilai Otomatis</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Laporan Hasil Tryout UMPTKIN
            </h1>
            <p className="text-xs sm:text-sm text-teal-200">
              Paket: <span className="font-semibold text-white">{result.packageName}</span> • Selesai: {result.completedAt}
            </p>

            {/* Score Circle / Badge */}
            <div className="py-2">
              <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-4 border-teal-400/40 shadow-inner">
                <span className="text-[10px] font-semibold text-teal-200 uppercase tracking-widest">Skor Akhir</span>
                <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                  {result.score}
                </span>
                <span className="text-[10px] text-teal-300">Skala 0 - 100</span>
              </div>
            </div>

            <p className="text-xs text-slate-200 max-w-md mx-auto leading-relaxed">
              Selamat, {currentUser?.name || 'Peserta'}! Jawaban Anda telah dianalisis sesuai kunci jawaban resmi SSE UMPTKIN.
            </p>
          </div>
        </div>

        {/* 2. STATS GRID (BENAR, SALAH, KOSONG, AKURASI) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Jawaban Benar</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono">
              {result.correctCount} <span className="text-xs text-slate-400 font-normal">/ {result.totalQuestions}</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-1">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Jawaban Salah</span>
            </div>
            <div className="text-2xl font-extrabold text-rose-600 font-mono">
              {result.incorrectCount} <span className="text-xs text-slate-400 font-normal">soal</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-1">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Tidak Dijawab</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-600 font-mono">
              {result.emptyCount} <span className="text-xs text-slate-400 font-normal">soal</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-1">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span>Akurasi Jawaban</span>
            </div>
            <div className="text-2xl font-extrabold text-teal-700 font-mono">
              {result.accuracy}%
            </div>
          </div>
        </div>

        {/* 3. SKOR PER SUBTES & GRAFIK HORIZONTAL */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Performa Berdasarkan Subtes</h2>
              <p className="text-xs text-slate-500">Distribusi skor capaian pada masing-masing 4 subtes UMPTKIN</p>
            </div>
            <BarChart3 className="w-5 h-5 text-teal-600" />
          </div>

          <div className="space-y-4">
            {subtests.map(([subName, data]) => {
              const scorePct = data.score;
              return (
                <div key={subName} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{subName}</span>
                    <span className="font-mono text-teal-700 font-bold">
                      {data.correct} / {data.total} Benar ({scorePct}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        scorePct >= 80 ? 'bg-emerald-500' : scorePct >= 60 ? 'bg-teal-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${scorePct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. ANALISIS PERFORMA & REKOMENDASI BELAJAR */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Analisis Performa & Evaluasi Cerdas</h2>
            <Award className="w-5 h-5 text-amber-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Kekuatan Terbesar
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5">{highestSubtest ? highestSubtest[0] : '-'}</h4>
              <p className="text-xs text-slate-600 mt-1">
                Tingkat penguasaan materi mencapai <strong>{highestSubtest ? highestSubtest[1].score : 0}%</strong>. Pemahaman Anda pada subtes ini sudah sangat solid.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Perlu Ditingkatkan
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5">{lowestSubtest ? lowestSubtest[0] : '-'}</h4>
              <p className="text-xs text-slate-600 mt-1">
                Tingkat capaian saat ini <strong>{lowestSubtest ? lowestSubtest[1].score : 0}%</strong>. Fokuskan pengulangan materi dan analisis pembahasan pada tipe soal ini.
              </p>
            </div>
          </div>

          {/* Platform Recommendation */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5 text-teal-800 mb-1">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Saran Belajar Menuju UMPTKIN:
            </p>
            <p>{getRecommendation()}</p>
          </div>
        </div>

        {/* 5. ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Kembali ke Dashboard
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('ranking')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Cek Leaderboard</span>
            </button>

            <button
              onClick={() => navigateTo('review', { resultId: result.id })}
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lihat Pembahasan Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
