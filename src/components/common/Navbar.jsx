import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import {
  Shield,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Trophy,
  BookOpen,
  RotateCcw,
  Menu,
  X,
  Target,
  Sparkles,
  Users2
} from 'lucide-react';

export const Navbar = () => {
  const {
    mode,
    switchMode,
    currentPage,
    navigateTo,
    currentUser,
    logout,
    resetDemoData
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If in exam screen, render a minimalist clean header
  if (currentPage === 'exam') return null;

  const scrollToGrup = () => {
    navigateTo('landing');
    setTimeout(() => {
      const el = document.getElementById('grup-komunitas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* 1. Left: Logo & Brand Identity */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
            onClick={() => navigateTo(mode === 'admin' ? 'admin-dashboard' : 'landing')}
          >
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:block group-hover:scale-105 transition-transform" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-none">
                  Tryout <span className="text-teal-600">UMPTKIN</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold tracking-wide bg-teal-50 text-teal-700 border border-teal-200/80 leading-none">
                  SSE 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block mt-0.5 leading-none font-normal">
                Simulasi Ujian Masuk PTKIN
              </p>
            </div>
          </div>

          {/* 2. Middle: Navigation Links (Clean & Consistent Text Nav) */}
          {mode === 'participant' && (
            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentPage === 'landing'
                    ? 'text-teal-700 bg-teal-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Beranda
              </button>

              <button
                type="button"
                onClick={() => navigateTo('packages')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentPage === 'packages'
                    ? 'text-teal-700 bg-teal-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Paket Tryout
              </button>

              <button
                type="button"
                onClick={() => navigateTo('promo')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentPage === 'promo'
                    ? 'text-amber-800 bg-amber-50 font-bold border border-amber-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Promo Spesial</span>
              </button>

              <button
                type="button"
                onClick={scrollToGrup}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Users2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Grup Belajar (Rp 0)</span>
              </button>

              {currentUser && (
                <button
                  type="button"
                  onClick={() => navigateTo('dashboard')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'dashboard'
                      ? 'text-teal-700 bg-teal-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  Dashboard Saya
                </button>
              )}
            </nav>
          )}

          {/* 3. Right: Mode Switcher, Reset Demo & Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Mode Switcher Toggle (Peserta vs Admin) */}
            <div className="bg-slate-100 p-0.5 sm:p-1 rounded-xl flex items-center border border-slate-200/80">
              <button
                type="button"
                onClick={() => switchMode('participant')}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'participant'
                    ? 'bg-white text-teal-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Peserta</span>
              </button>
              <button
                type="button"
                onClick={() => switchMode('admin')}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'admin'
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>

            {/* Quick Demo Reset Button (Desktop) */}
            <button
              type="button"
              onClick={resetDemoData}
              title="Reset data demo ke kondisi awal"
              className="hidden xl:flex items-center gap-1 px-2 py-1 text-[11px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset</span>
            </button>

            {/* Profile Dropdown or Login/Register Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-teal-500/20"
                  />
                  <div className="hidden 2xl:block text-left leading-tight">
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[100px]">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{currentUser.targetPTKIN.replace('UIN ', '')}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Calon Mahasiswa PTKIN
                      </span>
                    </div>

                    <div className="p-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigateTo('dashboard');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:text-teal-700 hover:bg-teal-50/50 rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-teal-600" />
                        Dashboard Peserta
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigateTo('profile');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:text-teal-700 hover:bg-teal-50/50 rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        <User className="w-4 h-4 text-teal-600" />
                        Profil Peserta
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigateTo('ranking');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:text-teal-700 hover:bg-teal-50/50 rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        <Trophy className="w-4 h-4 text-amber-500" />
                        Peringkat Nasional
                      </button>
                    </div>

                    <div className="p-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar Akun
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('login')}
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('register')}
                  className="px-3 sm:px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Daftar
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-1.5 animate-in slide-in-from-top-2">
          {mode === 'participant' ? (
            <>
              <button
                onClick={() => {
                  navigateTo('promo');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 flex items-center justify-between"
              >
                <span>Halaman Promo Spesial 🔥</span>
                <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-black">HOT</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('landing');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                Beranda
              </button>
              <button
                onClick={() => {
                  navigateTo('packages');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                Paket Tryout
              </button>
              <button
                onClick={() => {
                  scrollToGrup();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center justify-between"
              >
                <span>Grup Komunitas Belajar</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Rp 0</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('ranking');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 flex items-center justify-between"
              >
                <span>Peringkat Nasional</span>
                <Trophy className="w-4 h-4 text-amber-500" />
              </button>
              {currentUser && (
                <button
                  onClick={() => {
                    navigateTo('dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  Dashboard Saya
                </button>
              )}
            </>
          ) : (
            <div className="text-xs text-slate-500 px-3 py-1">
              Mode Admin aktif. Gunakan menu sidebar untuk berpindah modul admin.
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                resetDemoData();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Data Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
