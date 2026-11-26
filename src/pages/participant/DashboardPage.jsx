import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentModal } from '../../components/common/PaymentModal';
import {
  Trophy,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Calendar,
  AlertCircle,
  Play,
  RotateCcw,
  Target
} from 'lucide-react';

export const DashboardPage = () => {
  const {
    currentUser,
    packages,
    unlockedPackages,
    examHistory,
    rankings,
    navigateTo,
    activeExam
  } = useApp();

  const [filterTab, setFilterTab] = useState('all');
  const [selectedPayPackage, setSelectedPayPackage] = useState(null);

  // Calculate statistics
  const userHistory = examHistory || [];
  const totalCompleted = userHistory.length;
  const scores = userHistory.map(h => h.score || 0);
  const avgScore = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;
  const maxScore = scores.length ? Math.max(...scores) : 0;

  // Find user's ranking
  const userRankEntry = rankings.find(r => r.isCurrentUser || r.name === currentUser?.name);
  const currentRank = userRankEntry ? `#${userRankEntry.rank}` : '#-';

  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    const isCompleted = userHistory.some(h => h.packageId === pkg.id);
    if (filterTab === 'free') return pkg.isFree;
    if (filterTab === 'premium') return !pkg.isFree;
    if (filterTab === 'done') return isCompleted;
    if (filterTab === 'todo') return !isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Active ongoing exam session reminder banner */}
        {activeExam && !activeExam.isFinished && (
          <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Sesi Ujian Sedang Berlangsung</h4>
                <p className="text-xs text-amber-950 font-medium">
                  Paket: <span className="font-bold">{activeExam.packageName}</span> • Sisa Waktu:{' '}
                  <span className="font-mono font-bold">
                    {Math.floor(activeExam.timeRemaining / 60)}:
                    {String(activeExam.timeRemaining % 60).padStart(2, '0')}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('exam')}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Lanjutkan Ujian</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. GREETING & PROFILE BANNER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-7 shadow-md border border-teal-800/80">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-teal-400/40 shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-400/30">
                    Akun Peserta Aktif
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
                  Ahlan wa Sahlan, {currentUser?.name || 'Peserta UMPTKIN'}!
                </h1>
                <p className="text-xs text-teal-200 mt-1 flex items-center gap-1.5 font-normal">
                  <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Target: <strong>{currentUser?.targetPTKIN || 'UIN Syarif Hidayatullah Jakarta'}</strong> ({currentUser?.targetMajor || 'PAI'})</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => navigateTo('ranking')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl backdrop-blur-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Peringkat Nasional</span>
              </button>
              <button
                onClick={() => navigateTo('package-detail', { packageId: 'TO-01' })}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm shadow-teal-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Mulai Tryout Cepat</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. STATISTIC SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total Tryout</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {totalCompleted}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Simulasi diselesaikan</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Nilai Rata-rata</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {avgScore} <span className="text-xs font-sans text-slate-400 font-normal">/ 100</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Performa terjaga</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Skor Tertinggi</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {maxScore} <span className="text-xs font-sans text-slate-400 font-normal">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Rekor terbaik Anda</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Peringkat Saat Ini</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-mono">
              {currentRank}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Dari {rankings.length} peserta nasional</p>
          </div>
        </div>

        {/* 3. PAKET TRYOUT TERSEDIA */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Pilihan Paket Tryout UMPTKIN</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pilih paket untuk mulai menguji kemampuan 4 subtes terstandar</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-medium">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'free', label: 'Gratis' },
                { id: 'premium', label: 'Premium' },
                { id: 'todo', label: 'Belum Selesai' },
                { id: 'done', label: 'Selesai' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterTab === tab.id
                      ? 'bg-white text-teal-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredPackages.map(pkg => {
              const isUnlocked = pkg.isFree || unlockedPackages.includes(pkg.id);
              const completedHist = userHistory.find(h => h.packageId === pkg.id);

              return (
                <div
                  key={pkg.id}
                  className="rounded-2xl border border-slate-200/90 p-5 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        pkg.isFree ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-teal-50 text-teal-700 border border-teal-200'
                      }`}>
                        {pkg.isFree ? 'Gratis' : `Rp ${pkg.price.toLocaleString('id-ID')}`}
                      </span>

                      {completedHist && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Selesai ({completedHist.score})
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                        <span>{pkg.questionCount} Soal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{pkg.durationMinutes} Menit</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {isUnlocked ? (
                      <button
                        onClick={() => navigateTo('package-detail', { packageId: pkg.id })}
                        className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        {completedHist ? (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Kerjakan Ulang</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Mulai Tryout</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedPayPackage(pkg)}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Beli & Ikuti (Rp {pkg.price.toLocaleString('id-ID')})</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigateTo('package-detail', { packageId: pkg.id })}
                      className="w-full py-0.5 text-xs font-medium text-slate-500 hover:text-slate-800 text-center block"
                    >
                      Lihat Rincian & Aturan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. RIWAYAT TRYOUT */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Riwayat Tryout Anda</h2>
              <p className="text-xs text-slate-500 mt-0.5">Hasil dan pembahasan seluruh ujian yang pernah Anda selesaikan</p>
            </div>
            {userHistory.length > 0 && (
              <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                {userHistory.length} Ujian Selesai
              </span>
            )}
          </div>

          {userHistory.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Belum Ada Riwayat Tryout</p>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                Mulailah dengan simulasi paket gratis untuk melihat skor dan pembahasan lengkap.
              </p>
              <button
                onClick={() => navigateTo('package-detail', { packageId: 'TO-01' })}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Mulai Ujian Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 pl-2">Paket Tryout</th>
                    <th className="py-3">Tanggal Selesai</th>
                    <th className="py-3 text-center">Skor Total</th>
                    <th className="py-3 text-center">Benar / Salah</th>
                    <th className="py-3 text-center">Akurasi</th>
                    <th className="py-3 text-right pr-2">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userHistory.map(hist => (
                    <tr key={hist.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pl-2 font-semibold text-slate-900">
                        {hist.packageName}
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {hist.completedAt}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="font-mono font-bold text-sm text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {hist.score}
                        </span>
                      </td>
                      <td className="py-3.5 text-center font-medium text-slate-600">
                        <span className="text-emerald-600 font-bold">{hist.correctCount}</span> /{' '}
                        <span className="text-rose-500">{hist.incorrectCount}</span>
                      </td>
                      <td className="py-3.5 text-center font-semibold text-slate-700">
                        {hist.accuracy}%
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigateTo('result', { resultId: hist.id })}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-xs"
                          >
                            Hasil
                          </button>
                          <button
                            onClick={() => navigateTo('review', { resultId: hist.id })}
                            className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-xs"
                          >
                            Pembahasan
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      <PaymentModal
        isOpen={!!selectedPayPackage}
        onClose={() => setSelectedPayPackage(null)}
        packageItem={selectedPayPackage}
      />
    </div>
  );
};
