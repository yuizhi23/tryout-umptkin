import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Award,
  Search,
  Filter,
  Eye,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  BarChart3,
  ArrowUpDown
} from 'lucide-react';

export const AdminResultsPage = () => {
  const { examHistory, packages } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [packageFilter, setPackageFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedResult, setSelectedResult] = useState(null);

  // Combine examHistory with some realistic dummy results for admin overview
  const demoAdminResults = [
    {
      id: 'HIST-8812',
      studentName: 'Siti Nurhaliza Azzahra',
      packageName: 'Tryout UMPTKIN Intensif - Standar Nasional',
      packageId: 'TO-02',
      completedAt: '2025-02-25 14:15',
      score: 95.0,
      correctCount: 19,
      incorrectCount: 1,
      emptyCount: 0,
      accuracy: 95,
      subtestScores: {
        'Tes Potensi Skolastik (TPS)': { correct: 5, total: 5, score: 100 },
        'Literasi Bahasa Indonesia': { correct: 5, total: 5, score: 100 },
        'Literasi Bahasa Inggris': { correct: 5, total: 5, score: 100 },
        'Penalaran Matematika': { correct: 4, total: 5, score: 80 }
      }
    },
    {
      id: 'HIST-8813',
      studentName: 'Muhammad Rizky Pratama',
      packageName: 'Tryout UMPTKIN Intensif - Standar Nasional',
      packageId: 'TO-02',
      completedAt: '2025-02-25 15:40',
      score: 92.5,
      correctCount: 18,
      incorrectCount: 2,
      emptyCount: 0,
      accuracy: 90,
      subtestScores: {
        'Tes Potensi Skolastik (TPS)': { correct: 5, total: 5, score: 100 },
        'Literasi Bahasa Indonesia': { correct: 5, total: 5, score: 100 },
        'Literasi Bahasa Inggris': { correct: 4, total: 5, score: 80 },
        'Penalaran Matematika': { correct: 4, total: 5, score: 80 }
      }
    },
    {
      id: 'HIST-8814',
      studentName: 'Fatimah Az-Zahra',
      packageName: 'Tryout UMPTKIN Premium - Akbar & Prediksi Lulus',
      packageId: 'TO-03',
      completedAt: '2025-02-25 16:30',
      score: 90.0,
      correctCount: 18,
      incorrectCount: 2,
      emptyCount: 0,
      accuracy: 90,
      subtestScores: {
        'Tes Potensi Skolastik (TPS)': { correct: 5, total: 5, score: 100 },
        'Literasi Bahasa Indonesia': { correct: 4, total: 5, score: 80 },
        'Literasi Bahasa Inggris': { correct: 5, total: 5, score: 100 },
        'Penalaran Matematika': { correct: 4, total: 5, score: 80 }
      }
    },
    ...examHistory.map(h => ({
      ...h,
      studentName: 'Ahmad Fauzi Rahman (Demo User)'
    }))
  ];

  const filtered = demoAdminResults.filter(r => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPackage = packageFilter === 'all' || r.packageId === packageFilter;
    return matchesSearch && matchesPackage;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'desc') return b.score - a.score;
    return a.score - b.score;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-teal-600" />
          <span>Hasil Ujian & Penilaian Peserta</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Rekapitulasi perolehan nilai, akurasi pengerjaan, dan rincian skor subtes peserta
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama peserta atau paket..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="all">Semua Paket Tryout</option>
            {packages.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1"
            title="Urutkan Skor"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{sortOrder === 'desc' ? 'Skor Tertinggi' : 'Skor Terendah'}</span>
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 pl-6">Nama Peserta</th>
                <th className="py-3.5">Paket Tryout</th>
                <th className="py-3.5">Waktu Selesai</th>
                <th className="py-3.5 text-center">Skor Total</th>
                <th className="py-3.5 text-center">B / S / K</th>
                <th className="py-3.5 text-center">Akurasi</th>
                <th className="py-3.5 pr-6 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-6 font-bold text-slate-900">
                    {r.studentName}
                  </td>

                  <td className="py-4 text-slate-700">
                    <span className="font-medium block">{r.packageName}</span>
                  </td>

                  <td className="py-4 text-slate-500">
                    {r.completedAt}
                  </td>

                  <td className="py-4 text-center">
                    <span className="font-mono font-bold text-sm text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                      {r.score}
                    </span>
                  </td>

                  <td className="py-4 text-center text-slate-600 font-medium">
                    <span className="text-emerald-600 font-bold">{r.correctCount}</span> /{' '}
                    <span className="text-rose-500">{r.incorrectCount}</span> /{' '}
                    <span className="text-slate-400">{r.emptyCount}</span>
                  </td>

                  <td className="py-4 text-center font-bold text-slate-700">
                    {r.accuracy}%
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <button
                      onClick={() => setSelectedResult(r)}
                      className="p-1.5 rounded-lg text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                      title="Lihat Rincian Subtes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL HASIL UJIAN */}
      <Modal
        isOpen={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        title="Rincian Nilai Ujian Peserta"
        maxWidth="max-w-md"
      >
        {selectedResult && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">{selectedResult.studentName}</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">{selectedResult.packageName}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span>Skor Total: <strong className="font-mono text-teal-700 text-sm">{selectedResult.score}</strong></span>
                <span>Akurasi: <strong className="text-slate-800">{selectedResult.accuracy}%</strong></span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 text-xs mb-2.5">Skor per Subtes:</h4>
              <div className="space-y-2">
                {Object.entries(selectedResult.subtestScores || {}).map(([sub, data]) => (
                  <div key={sub} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{sub}</p>
                      <p className="text-[10px] text-slate-400">{data.correct} / {data.total} Soal Benar</p>
                    </div>
                    <span className="font-mono font-bold text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {data.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
