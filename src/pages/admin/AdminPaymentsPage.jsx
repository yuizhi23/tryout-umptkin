import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  QrCode,
  Building2,
  Wallet
} from 'lucide-react';

export const AdminPaymentsPage = () => {
  const { transactions, exportTransactionsCSV } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalTrx = transactions.length;
  const successfulTrx = transactions.filter(t => t.status === 'Berhasil');
  const pendingTrx = transactions.filter(t => t.status === 'Pending');
  const totalRevenue = successfulTrx.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const filtered = transactions.filter(t => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.method.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Title & CSV Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-teal-600" />
            <span>Laporan Pembayaran & Transaksi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data transaksi aktivasi paket tryout UMPTKIN, status pembayaran, dan rekapitulasi omset
          </p>
        </div>

        <button
          onClick={exportTransactionsCSV}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Laporan CSV</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Total Transaksi</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {totalTrx}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Semua metode pembayaran</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Pembayaran Berhasil</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
            {successfulTrx.length}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Akses langsung aktif</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Menunggu (Pending)</span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
            {pendingTrx.length}
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Verifikasi otomatis</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Total Nominal Omset</span>
          <div className="text-xl sm:text-2xl font-extrabold text-teal-700 font-mono mt-1 truncate">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Dana simulasi terverifikasi</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari ID transaksi, nama, paket..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="all">Semua Status</option>
            <option value="Berhasil">Berhasil</option>
            <option value="Pending">Pending</option>
            <option value="Gagal">Gagal</option>
          </select>
          <span className="text-xs text-slate-500 font-semibold">
            Total: <strong>{filtered.length}</strong> Catatan
          </span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 pl-6 w-28">ID Transaksi</th>
                <th className="py-3.5">Nama Peserta</th>
                <th className="py-3.5">Paket Tryout</th>
                <th className="py-3.5">Metode Bayar</th>
                <th className="py-3.5 text-right">Nominal</th>
                <th className="py-3.5 text-center">Tanggal</th>
                <th className="py-3.5 pr-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-6 font-mono font-bold text-slate-700">
                    {tx.id}
                  </td>

                  <td className="py-4 font-bold text-slate-900">
                    {tx.studentName}
                  </td>

                  <td className="py-4 text-slate-700">
                    <span className="line-clamp-1 max-w-xs">{tx.packageName}</span>
                  </td>

                  <td className="py-4 text-slate-600 font-medium">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                      {tx.method}
                    </span>
                  </td>

                  <td className="py-4 text-right font-mono font-bold text-slate-900">
                    Rp {tx.amount.toLocaleString('id-ID')}
                  </td>

                  <td className="py-4 text-center text-slate-500">
                    {tx.date}
                  </td>

                  <td className="py-4 pr-6 text-center">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      tx.status === 'Berhasil'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : tx.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {tx.status === 'Berhasil' && <CheckCircle2 className="w-3 h-3" />}
                      {tx.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {tx.status === 'Gagal' && <XCircle className="w-3 h-3" />}
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
