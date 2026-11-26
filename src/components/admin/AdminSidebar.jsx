import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  LayoutDashboard,
  FileQuestion,
  Package,
  Users,
  Award,
  CreditCard,
  User,
  Shield,
  ArrowRight,
  LogOut
} from 'lucide-react';

export const AdminSidebar = () => {
  const { currentPage, navigateTo, switchMode, adminUser } = useApp();

  const navItems = [
    { id: 'admin-dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'admin-questions', label: 'Kelola Bank Soal', icon: FileQuestion },
    { id: 'admin-packages', label: 'Kelola Paket Tryout', icon: Package },
    { id: 'admin-students', label: 'Data Peserta', icon: Users },
    { id: 'admin-results', label: 'Hasil Ujian Peserta', icon: Award },
    { id: 'admin-payments', label: 'Laporan Pembayaran', icon: CreditCard }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col justify-between shrink-0 border-r border-slate-800">
      
      {/* Top Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white tracking-tight">Admin UMPTKIN</h2>
            <p className="text-[10px] text-teal-400 font-medium">Panel Manajemen Pusat</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 block">
            Menu Administrator
          </span>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom User Info & Switch Mode */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <img
            src={adminUser?.avatar}
            alt={adminUser?.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-teal-500/40"
          />
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate">{adminUser?.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{adminUser?.role}</p>
          </div>
        </div>

        {/* Switch back to participant mode */}
        <button
          onClick={() => switchMode('participant')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-teal-300 hover:text-teal-200 text-xs font-bold transition-colors border border-slate-700"
        >
          <User className="w-3.5 h-3.5" />
          <span>Beralih ke Tampilan Peserta</span>
        </button>
      </div>

    </aside>
  );
};
