import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Search,
  Filter,
  ArrowUpDown,
  School,
  Building2
} from 'lucide-react';

export const RankingPage = () => {
  const { rankings, currentUser, packages, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [packageFilter, setPackageFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  // Filter rankings
  const filtered = rankings.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ptkin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.major?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPackage = packageFilter === 'all' || item.packageId === packageFilter;

    return matchesSearch && matchesPackage;
  });

  // Sort by score
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'desc') return b.score - a.score;
    return a.score - b.score;
  });

  // Top 3 for Podium
  const top1 = rankings[0];
  const top2 = rankings[1];
  const top3 = rankings[2];

  // User rank entry
  const userRank = rankings.find(r => r.isCurrentUser || r.name === currentUser?.name);

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Leaderboard UMPTKIN Nasional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Peringkat Nilai Tryout Nasional
          </h1>
          <p className="text-xs text-slate-500">
            Peringkat komparatif seluruh calon mahasiswa PTKIN se-Indonesia berdasarkan perolehan skor aktual.
          </p>
        </div>

        {/* Current User Rank Highlight Banner */}
        {userRank && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-teal-700/60">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-white shrink-0">
                <Trophy className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] text-teal-200 uppercase tracking-wider font-semibold">Posisi Peringkat Anda</span>
                <h3 className="text-base sm:text-lg font-bold">
                  {userRank.name} — Peringkat #{userRank.rank} Nasional
                </h3>
                <p className="text-xs text-teal-100">
                  Target: <strong>{userRank.ptkin}</strong> • Skor Aktual: <strong>{userRank.score}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('dashboard')}
              className="px-4 py-2 bg-white text-teal-900 font-bold text-xs rounded-xl shadow-xs hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            >
              Lihat Dashboard Saya
            </button>
          </div>
        )}

        {/* TOP 3 PODIUM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-2">
          
          {/* Top 2 - Silver */}
          {top2 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center relative order-2 md:order-1">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center mx-auto mb-2.5 text-base">
                2
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full">
                Peringkat 2
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-2">{top2.name}</h3>
              <p className="text-[11px] text-slate-400">{top2.school}</p>
              <div className="mt-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-600">{top2.ptkin}</p>
                <p className="text-xl font-extrabold text-slate-800 font-mono mt-0.5">{top2.score}</p>
              </div>
            </div>
          )}

          {/* Top 1 - Gold (Elevated) */}
          {top1 && (
            <div className="bg-gradient-to-b from-amber-500/10 via-white to-white rounded-2xl border-2 border-amber-400/90 p-6 shadow-md text-center relative order-1 md:order-2 md:-translate-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center mx-auto mb-2.5 shadow-sm shadow-amber-400/30">
                <Trophy className="w-6 h-6 fill-slate-950" />
              </div>
              <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                Juara 1 Nasional
              </span>
              <h3 className="font-bold text-slate-900 text-base mt-2">{top1.name}</h3>
              <p className="text-xs text-slate-500">{top1.school}</p>
              <div className="mt-3.5 py-2.5 bg-amber-50/80 rounded-xl border border-amber-200">
                <p className="text-xs font-semibold text-amber-950">{top1.ptkin}</p>
                <p className="text-2xl font-extrabold text-amber-700 font-mono mt-0.5">{top1.score}</p>
              </div>
            </div>
          )}

          {/* Top 3 - Bronze */}
          {top3 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center relative order-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700/15 text-amber-800 font-bold flex items-center justify-center mx-auto mb-2.5 text-base">
                3
              </div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full">
                Peringkat 3
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-2">{top3.name}</h3>
              <p className="text-[11px] text-slate-400">{top3.school}</p>
              <div className="mt-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-600">{top3.ptkin}</p>
                <p className="text-xl font-extrabold text-slate-800 font-mono mt-0.5">{top3.score}</p>
              </div>
            </div>
          )}

        </div>

        {/* FILTER & SEARCH CONTROLS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama peserta, PTKIN, sekolah..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-700"
              >
                <option value="all">Semua Paket Tryout</option>
                {packages.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1 cursor-pointer font-medium"
              title="Urutkan Skor"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortOrder === 'desc' ? 'Tertinggi' : 'Terendah'}</span>
            </button>
          </div>
        </div>

        {/* FULL RANKINGS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 pl-6 w-16 text-center">Rank</th>
                  <th className="py-3 pl-2">Peserta & Asal Sekolah</th>
                  <th className="py-3">PTKIN & Pilihan Prodi</th>
                  <th className="py-3">Paket Tryout</th>
                  <th className="py-3 text-center">Skor Total</th>
                  <th className="py-3 pr-6 text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                      Tidak ditemukan peserta dengan kata kunci tersebut.
                    </td>
                  </tr>
                ) : (
                  sorted.map((item, idx) => {
                    const isUser = item.isCurrentUser || item.name === currentUser?.name;
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isUser ? 'bg-teal-50/80 font-medium' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <td className="py-3.5 pl-6 text-center">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs mx-auto ${
                              item.rank === 1
                                ? 'bg-amber-400 text-slate-950 shadow-2xs'
                                : item.rank === 2
                                ? 'bg-slate-200 text-slate-800'
                                : item.rank === 3
                                ? 'bg-amber-700 text-white'
                                : isUser
                                ? 'bg-teal-700 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.rank}
                          </span>
                        </td>

                        <td className="py-3.5 pl-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs shrink-0">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900">{item.name}</span>
                                {isUser && (
                                  <span className="text-[9px] font-bold bg-teal-600 text-white px-1.5 py-0.2 rounded">
                                    Anda
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400">{item.school || 'SMA/MA Sederajat'}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5">
                          <p className="font-semibold text-slate-800">{item.ptkin}</p>
                          <p className="text-[11px] text-slate-500">{item.major}</p>
                        </td>

                        <td className="py-3.5 text-slate-600">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] border border-slate-200">
                            {item.packageId}
                          </span>
                        </td>

                        <td className="py-3.5 text-center">
                          <span className="font-mono font-bold text-sm text-teal-700 bg-white px-2.5 py-0.5 rounded border border-teal-200 shadow-2xs">
                            {item.score}
                          </span>
                        </td>

                        <td className="py-3.5 pr-6 text-right text-slate-400">
                          {item.date}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
