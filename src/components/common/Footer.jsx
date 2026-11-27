import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Mail, Phone, MapPin, Heart, Lock, FileDown } from 'lucide-react';
import { Logo } from './Logo';

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
              <Logo size="md" />
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
              <li className="pt-1 border-t border-slate-800/80">
                <a
                  href="./DOKUMENTASI_FITUR_LENGKAP_TRYOUT_UMPTKIN.pdf"
                  download="DOKUMENTASI_FITUR_LENGKAP_TRYOUT_UMPTKIN.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF Fitur</span>
                </a>
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
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Kontak & Media Resmi</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-emerald-400">Lenny Agustin, S. Pd.</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href="https://wa.me/6288247854631" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  WA: 0882-4785-4631
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400 font-bold text-xs">IG</span>
                <span>@info.umptkin • @lennyagustin10</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400 font-bold text-xs">YT</span>
                <span>Lenny Agustin</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Tryout UMPTKIN. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Didesain untuk Calon Mahasiswa PTKIN</span>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => navigateTo('admin-login')}
              className="text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
              title="Khusus Pengelola / Administrator"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Portal Pengelola</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
