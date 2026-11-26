import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  const { currentPage, navigateTo } = useApp();

  if (currentPage === 'exam') return null;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Tryout <span className="text-teal-400">UMPTKIN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              Platform simulasi Sistem Seleksi Elektronik (SSE) UMPTKIN berbasis Computer-Based Test terdepan di Indonesia. Membantu calon mahasiswa menembus PTKIN impian dengan bank soal standar nasional dan analisis prediktif.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Standar Kisi-Kisi Resmi UMPTKIN</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('landing')} className="hover:text-teal-400 transition-colors">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('packages')} className="hover:text-teal-400 transition-colors">
                  Pilihan Paket Tryout
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ranking')} className="hover:text-teal-400 transition-colors">
                  Leaderboard Nasional
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-teal-400 transition-colors">
                  Dashboard Peserta
                </button>
              </li>
            </ul>
          </div>

          {/* 4 Subtests Info */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Subtes UMPTKIN</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Tes Potensi Skolastik (TPS)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Literasi Bahasa Indonesia</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Literasi Bahasa Inggris</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Penalaran Matematika</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Layanan Informasi</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Gedung Edu Center Lt. 3, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>halo@tryoutumptkin.ac.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Tryout UMPTKIN Prototype. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            Didesain untuk Calon Mahasiswa PTKIN Se-Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
};
