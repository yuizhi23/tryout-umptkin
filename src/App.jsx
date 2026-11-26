import React, { useState } from 'react';
import { useApp } from './context/AppContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { AdminSidebar } from './components/admin/AdminSidebar';

// Participant Pages
import { LandingPage } from './pages/participant/LandingPage';
import { LoginPage } from './pages/participant/LoginPage';
import { RegisterPage } from './pages/participant/RegisterPage';
import { DashboardPage } from './pages/participant/DashboardPage';
import { PackageDetailPage } from './pages/participant/PackageDetailPage';
import { ExamPage } from './pages/participant/ExamPage';
import { ResultPage } from './pages/participant/ResultPage';
import { ReviewPage } from './pages/participant/ReviewPage';
import { RankingPage } from './pages/participant/RankingPage';
import { ProfilePage } from './pages/participant/ProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminQuestionsPage } from './pages/admin/AdminQuestionsPage';
import { AdminPackagesPage } from './pages/admin/AdminPackagesPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminResultsPage } from './pages/admin/AdminResultsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';

import { Menu, X, Shield, User, RotateCcw } from 'lucide-react';

export const App = () => {
  const { mode, currentPage, switchMode, resetDemoData } = useApp();
  const [isAdminMobileOpen, setIsAdminMobileOpen] = useState(false);

  // Render Participant Pages
  const renderParticipantPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'packages':
        return <DashboardPage />;
      case 'package-detail':
        return <PackageDetailPage />;
      case 'exam':
        return <ExamPage />;
      case 'result':
        return <ResultPage />;
      case 'review':
        return <ReviewPage />;
      case 'ranking':
        return <RankingPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  // Render Admin Pages
  const renderAdminPage = () => {
    switch (currentPage) {
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'admin-questions':
        return <AdminQuestionsPage />;
      case 'admin-packages':
        return <AdminPackagesPage />;
      case 'admin-students':
        return <AdminStudentsPage />;
      case 'admin-results':
        return <AdminResultsPage />;
      case 'admin-payments':
        return <AdminPaymentsPage />;
      default:
        return <AdminDashboardPage />;
    }
  };

  // If in Admin Mode, wrap with Admin layout (sidebar + main content)
  if (mode === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row antialiased">
        {/* Desktop Admin Sidebar */}
        <div className="hidden lg:block shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Admin Header */}
        <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight">Admin UMPTKIN</span>
            <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded font-mono">
              Demo Panel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => switchMode('participant')}
              className="text-xs text-teal-300 bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 font-bold"
            >
              Mode Peserta
            </button>
            <button
              onClick={() => setIsAdminMobileOpen(!isAdminMobileOpen)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {isAdminMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Admin Sidebar Overlay */}
        {isAdminMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setIsAdminMobileOpen(false)}
            />
            <div className="relative z-10 w-72 max-w-full">
              <AdminSidebar />
            </div>
          </div>
        )}

        {/* Admin Main Workspace */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {renderAdminPage()}
        </main>

        <ToastContainer />
      </div>
    );
  }

  // Participant Mode Layout
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-teal-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderParticipantPage()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
