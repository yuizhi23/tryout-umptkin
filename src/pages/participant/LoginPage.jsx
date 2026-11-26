import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Mail, Lock, ArrowRight, UserCheck, ArrowLeft, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('ahmad.fauzi@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Silakan masukkan email Anda');
      return;
    }
    if (!password) {
      setError('Silakan masukkan kata sandi Anda');
      return;
    }
    login(email, password);
  };

  const handleQuickDemo = () => {
    setEmail('ahmad.fauzi@example.com');
    setPassword('demo123');
    login('ahmad.fauzi@example.com', 'demo123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigateTo('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
        </div>

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-teal-600 text-white items-center justify-center shadow-lg shadow-teal-600/30 mb-3">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Masuk Akun Peserta
          </h2>
          <p className="mt-1.5 text-xs text-slate-500">
            Akses dashboard simulasi dan riwayat nilai tryout UMPTKIN Anda
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200/80">
          
          {/* Quick Demo Helper Callout */}
          <div className="mb-6 p-3.5 rounded-xl bg-teal-50 border border-teal-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-900 flex-1">
              <p className="font-semibold">Mode Presentasi Demo</p>
              <p className="text-[11px] text-teal-700 mt-0.5">
                Gunakan kredensial cepat untuk langsung mencoba seluruh fitur simulasi.
              </p>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Masuk Cepat Akun Demo (Fauzi)
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="contoh@email.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Belum memiliki akun peserta?{' '}
              <button
                type="button"
                onClick={() => navigateTo('register')}
                className="font-bold text-teal-600 hover:text-teal-700 underline underline-offset-2 ml-1"
              >
                Daftar sekarang
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
