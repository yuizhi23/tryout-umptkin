import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Package,
  Award,
  CreditCard,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileQuestion,
  Plus,
  Download
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const {
    students,
    packages,
    questions,
    transactions,
    examHistory,
    navigateTo,
    exportTransactionsCSV
  } = useApp();

  // Metrics
  const totalStudents = students.length;
  const totalPackages = packages.length;
  const totalQuestions = questions.length;
  const totalTransactions = transactions.length;

  const successfulTx = transactions.filter(t => t.status === 'Berhasil');
  const totalRevenue = successfulTx.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Weekly registration mock data for chart
  const weeklyData = [
    { day: 'Senin', count: 42 },
    { day: 'Selasa', count: 68 },
    { day: 'Rabu', count: 85 },
    { day: 'Kamis', count: 94 },
    { day: 'Jumat', count: 120 },
    { day: 'Sabtu', count: 165 },
    { day: 'Minggu', count: 190 }
  ];
  const maxWeekly = Math.max(...weeklyData.map(d => d.count));

  // Subtest average scores mock
  const subtestAvg = [
    { name: 'Tes Potensi Skolastik (TPS)', avg: 82.5, color: 'bg-teal-500' },
    { name: 'Literasi Bahasa Indonesia', avg: 88.0, color: 'bg-emerald-500' },
    { name: 'Literasi Bahasa Inggris', avg: 76.5, color: 'bg-sky-500' },
    { name: 'Penalaran Matematika', avg: 71.0, color: 'bg-amber-500' }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Title & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Utama Administrator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ringkasan metrik statistik operasional simulasi tryout UMPTKIN nasional
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('admin-questions')}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-teal-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Soal</span>
          </button>
          <button
            onClick={exportTransactionsCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 1. 5 KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Peserta</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalStudents * 125} <span className="text-xs text-emerald-600 font-sans font-medium">+12%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Terdaftar di database</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Paket Tryout</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalPackages} Paket
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Simulasi aktif tayang</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Bank Soal</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileQuestion className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalQuestions} Butir
          </div>
          <p className="text-[11px] text-slate-400 mt-1">4 Subtes terstandarisasi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Ujian Selesai</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {examHistory.length + 840}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sesi selesai dinilai</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Omset</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-teal-700 font-mono truncate">
            Rp {(totalRevenue + 2450000).toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Simulasi Pembayaran</p>
        </div>
      </div>

      {/* 2. CHARTS SECTION (2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Weekly Registration Trend (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Tren Pendaftaran Peserta (Mingguan)</h3>
              <p className="text-[11px] text-slate-500">Lonjakan pendaftaran menjelang periode tryout akbar</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              +18.4% Minggu Ini
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="pt-4 h-52 flex items-end justify-between gap-3 px-2">
            {weeklyData.map((d, idx) => {
              const heightPct = Math.round((d.count / maxWeekly) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-xl h-36 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-teal-700 to-teal-500 group-hover:from-teal-600 group-hover:to-teal-400 transition-all rounded-t-xl"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Chart: Subtest Average Scores (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Rata-rata Nilai per Subtes</h3>
              <p className="text-[11px] text-slate-500">Hasil evaluasi rata-rata seluruh peserta</p>
            </div>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-4 pt-2">
            {subtestAvg.map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{sub.name}</span>
                  <span className="font-mono font-bold text-slate-900">{sub.avg} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sub.color}`}
                    style={{ width: `${sub.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Subtes Terendah: <strong>Penalaran Matematika</strong></span>
            <button
              onClick={() => navigateTo('admin-questions')}
              className="font-bold text-teal-600 hover:text-teal-700"
            >
              Evaluasi Soal →
            </button>
          </div>
        </div>

      </div>

      {/* 3. RECENT ACTIVITIES & TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Aktivitas Transaksi Masuk</h3>
              <p className="text-[11px] text-slate-500">Riwayat pembayaran paket simulasi terbaru</p>
            </div>
            <button
              onClick={() => navigateTo('admin-payments')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 4).map(tx => (
              <div
                key={tx.id}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{tx.studentName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({tx.id})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{tx.packageName} • {tx.method}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-teal-700">Rp {tx.amount.toLocaleString('id-ID')}</span>
                  <div>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                      tx.status === 'Berhasil' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registered Students */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Pendaftaran Peserta Terkini</h3>
              <p className="text-[11px] text-slate-500">Calon mahasiswa baru yang siap mengikuti simulasi</p>
            </div>
            <button
              onClick={() => navigateTo('admin-students')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Kelola Peserta →
            </button>
          </div>

          <div className="space-y-3">
            {students.slice(0, 4).map(s => (
              <div
                key={s.id}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">{s.name}</span>
                    <p className="text-[11px] text-slate-500">{s.targetPTKIN}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium text-slate-500 text-[11px]">{s.targetMajor}</span>
                  <p className="text-[10px] text-teal-600 font-bold mt-0.5">Status: {s.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
