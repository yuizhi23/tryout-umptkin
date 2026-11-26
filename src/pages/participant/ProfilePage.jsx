import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PTKIN_LIST, MAJOR_LIST } from '../../data/initialData';
import {
  User,
  Mail,
  Phone,
  School,
  Save,
  ShieldCheck,
  Trophy,
  Award,
  BookOpen
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, examHistory, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Ahmad Fauzi Rahman',
    email: currentUser?.email || 'ahmad.fauzi@example.com',
    phone: currentUser?.phone || '0812-3456-7890',
    originSchool: currentUser?.originSchool || 'MAN 1 Surakarta',
    targetPTKIN: currentUser?.targetPTKIN || PTKIN_LIST[0],
    targetMajor: currentUser?.targetMajor || MAJOR_LIST[0]
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profil dan preferensi PTKIN berhasil disimpan!', 'success');
  };

  const totalTryouts = examHistory?.length || 0;
  const avgScore = examHistory?.length
    ? Math.round((examHistory.reduce((a, b) => a + (b.score || 0), 0) / examHistory.length) * 10) / 10
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Title */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Profil & Preferensi Peserta</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola data identitas diri dan program studi PTKIN tujuan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Left: Avatar Card & Stats */}
          <div className="md:col-span-1 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 text-center shadow-xs">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={formData.name}
                className="w-20 h-20 rounded-2xl object-cover mx-auto ring-2 ring-teal-500/20 shadow-sm mb-3"
              />
              <h3 className="font-bold text-slate-900 text-sm">{formData.name}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{formData.email}</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Akun Terverifikasi
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pencapaian Akun</h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    Total Tryout
                  </span>
                  <span className="font-bold text-slate-900">{totalTryouts} Ujian</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    Nilai Rata-Rata
                  </span>
                  <span className="font-bold text-teal-700 font-mono">{avgScore} / 100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    Status Leaderboard
                  </span>
                  <span className="font-bold text-purple-700">Top Nasional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Asal Madrasah / Sekolah
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="originSchool"
                      value={formData.originSchool}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2.5">
                    Preferensi Seleksi Masuk PTKIN
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Kampus PTKIN Pilihan
                      </label>
                      <select
                        name="targetPTKIN"
                        value={formData.targetPTKIN}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      >
                        {PTKIN_LIST.map((p, idx) => (
                          <option key={idx} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Program Studi Pilihan
                      </label>
                      <select
                        name="targetMajor"
                        value={formData.targetMajor}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      >
                        {MAJOR_LIST.map((m, idx) => (
                          <option key={idx} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
