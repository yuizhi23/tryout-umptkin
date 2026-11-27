import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/common/Logo';
import { Shield, Lock, User, ArrowLeft, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLoginPage = () => {
  const { loginAdmin, navigateTo } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Silakan isi username dan password admin');
      return;
    }

    const res = loginAdmin(username, password);
    if (!res.success) {
      setError(res.message || 'Kredensial admin tidak valid');
    }
  };

  const handleQuickDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    loginAdmin('admin', 'admin123');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back Link to Participant */}
        <div className="mb-6">
          <button
            onClick={() => navigateTo('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Portal Peserta
          </button>
        </div>

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-4">
            <Logo size="lg" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/30">
              <Shield className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-teal-400">
              Portal Pengelola Terbatas
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Login Administrator
          </h2>
          <p className="mt-1.5 text-xs text-slate-400">
            Akses khusus manajemen bank soal, paket ujian, dan validasi transaksi
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Username / Email Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="block w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Password Keamanan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
              >
                <span>Masuk ke Panel Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-400" />
                  Kredensial Akses Pengelola (Demo):
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="text-[11px] font-bold text-teal-400 hover:text-teal-300 underline cursor-pointer"
                >
                  Masuk 1-Klik
                </button>
              </div>
              <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
                <p>Username: <span className="text-teal-300 font-bold">admin</span></p>
                <p>Password: <span className="text-teal-300 font-bold">admin123</span></p>
              </div>
            </div>
          </div>

        </div>

        <p className="mt-6 text-center text-[11px] text-slate-500">
          Dilindungi enkripsi sistem Tryout UMPTKIN • Hak Akses Administrator
        </p>
      </div>
    </div>
  );
};
