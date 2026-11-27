import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_PACKAGES,
  INITIAL_QUESTIONS,
  INITIAL_RANKINGS,
  INITIAL_USER,
  INITIAL_STUDENTS,
  INITIAL_TRANSACTIONS,
  INITIAL_EXAM_HISTORY
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Mode
  const [mode, setMode] = useState(() => localStorage.getItem('umptkin_mode') || 'participant');
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('umptkin_page') || 'landing');
  const [pageParams, setPageParams] = useState({});

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('umptkin_admin_auth') === 'true';
  });

  // User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('umptkin_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [adminUser] = useState({
    id: 'ADM-01',
    name: 'Dr. H. Muhammad Ilyas, M.Pd.',
    role: 'Administrator Utama UMPTKIN',
    email: 'admin@tryoutumptkin.ac.id',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  });

  // Data Collections (synced with localStorage)
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('umptkin_packages_v2');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [unlockedPackages, setUnlockedPackages] = useState(() => {
    const saved = localStorage.getItem('umptkin_unlocked_packages_v2');
    return saved ? JSON.parse(saved) : ['TO-01'];
  });

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('umptkin_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [examHistory, setExamHistory] = useState(() => {
    const saved = localStorage.getItem('umptkin_history');
    return saved ? JSON.parse(saved) : INITIAL_EXAM_HISTORY;
  });

  const [rankings, setRankings] = useState(() => {
    const saved = localStorage.getItem('umptkin_rankings');
    return saved ? JSON.parse(saved) : INITIAL_RANKINGS;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('umptkin_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('umptkin_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Active Exam Session
  const [activeExam, setActiveExam] = useState(() => {
    const saved = localStorage.getItem('umptkin_active_exam');
    return saved ? JSON.parse(saved) : null;
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('umptkin_mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('umptkin_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('umptkin_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('umptkin_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('umptkin_packages_v2', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('umptkin_unlocked_packages_v2', JSON.stringify(unlockedPackages));
  }, [unlockedPackages]);

  useEffect(() => {
    localStorage.setItem('umptkin_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('umptkin_history', JSON.stringify(examHistory));
  }, [examHistory]);

  useEffect(() => {
    localStorage.setItem('umptkin_rankings', JSON.stringify(rankings));
  }, [rankings]);

  useEffect(() => {
    localStorage.setItem('umptkin_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('umptkin_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (activeExam) {
      localStorage.setItem('umptkin_active_exam', JSON.stringify(activeExam));
    } else {
      localStorage.removeItem('umptkin_active_exam');
    }
  }, [activeExam]);

  // Toast Dispatcher
  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch between Participant and Admin Mode
  const switchMode = (newMode) => {
    if (newMode === 'admin') {
      if (isAdminAuthenticated) {
        setMode('admin');
        setCurrentPage('admin-dashboard');
        showToast('Beralih ke Panel Administrator', 'info');
      } else {
        setMode('participant');
        setCurrentPage('admin-login');
      }
    } else {
      setMode('participant');
      setCurrentPage(currentUser ? 'dashboard' : 'landing');
      showToast('Beralih ke Tampilan Peserta', 'info');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Authentication
  const loginAdmin = (username, password) => {
    const validUser = username === 'admin' || username === 'admin@tryoutumptkin.ac.id';
    const validPass = password === 'admin123' || password === 'admin';

    if (validUser && validPass) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('umptkin_admin_auth', 'true');
      setMode('admin');
      setCurrentPage('admin-dashboard');
      showToast('Autentikasi berhasil! Selamat datang di Panel Administrator.', 'success');
      return { success: true };
    } else {
      showToast('Username atau password admin salah!', 'error');
      return { success: false, message: 'Username atau password salah (Gunakan: admin / admin123)' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('umptkin_admin_auth');
    setMode('participant');
    setCurrentPage('landing');
    showToast('Anda telah keluar dari Panel Administrator.', 'info');
  };

  // Auth Functions
  const login = (email, password) => {
    // Demo login: allow any email, or use default user
    const loggedUser = {
      ...INITIAL_USER,
      email: email || INITIAL_USER.email,
      name: email.includes('@') ? email.split('@')[0].replace('.', ' ').toUpperCase() : INITIAL_USER.name
    };
    setCurrentUser(loggedUser);
    showToast(`Selamat datang kembali, ${loggedUser.name}!`, 'success');
    navigateTo('dashboard');
  };

  const register = (userData) => {
    const newUser = {
      id: `USR-2025-${String(students.length + 1).padStart(3, '0')}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '0812-3456-7890',
      targetPTKIN: userData.targetPTKIN,
      targetMajor: userData.targetMajor,
      originSchool: userData.originSchool || 'SMA / MA Sederajat',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);

    // Add to students list if not present
    setStudents(prev => [
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        targetPTKIN: newUser.targetPTKIN,
        targetMajor: newUser.targetMajor,
        phone: newUser.phone,
        registeredDate: newUser.joinedDate,
        status: 'Aktif',
        totalTryout: 0,
        avgScore: 0
      },
      ...prev
    ]);

    showToast('Pendaftaran akun berhasil! Selamat datang di Tryout UMPTKIN.', 'success');
    navigateTo('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah keluar dari akun.', 'info');
    navigateTo('landing');
  };

  // Exam Simulation Functions
  const startExam = (packageId) => {
    const pkg = packages.find(p => p.id === packageId) || packages[0];
    
    // Check if there is an existing ongoing session for this package
    if (activeExam && activeExam.packageId === packageId && !activeExam.isFinished) {
      navigateTo('exam');
      showToast('Melanjutkan sesi ujian Anda yang sedang berlangsung.', 'info');
      return;
    }

    const durationSeconds = (pkg.durationMinutes || 30) * 60;
    const newSession = {
      packageId: pkg.id,
      packageName: pkg.name,
      durationMinutes: pkg.durationMinutes,
      timeRemaining: durationSeconds,
      currentQuestionIndex: 0,
      answers: {},
      doubtful: {},
      isFinished: false,
      startTime: new Date().toISOString()
    };

    setActiveExam(newSession);
    navigateTo('exam');
    showToast(`Ujian "${pkg.name}" dimulai! Waktu berjalan mundur.`, 'info');
  };

  const setExamAnswer = (questionId, key) => {
    if (!activeExam) return;
    setActiveExam(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: key
      }
    }));
  };

  const clearExamAnswer = (questionId) => {
    if (!activeExam) return;
    setActiveExam(prev => {
      const nextAnswers = { ...prev.answers };
      delete nextAnswers[questionId];
      return {
        ...prev,
        answers: nextAnswers
      };
    });
  };

  const toggleExamDoubtful = (questionId) => {
    if (!activeExam) return;
    setActiveExam(prev => ({
      ...prev,
      doubtful: {
        ...prev.doubtful,
        [questionId]: !prev.doubtful[questionId]
      }
    }));
  };

  const setExamQuestionIndex = (index) => {
    if (!activeExam) return;
    setActiveExam(prev => ({
      ...prev,
      currentQuestionIndex: index
    }));
  };

  const updateTimeRemaining = (remaining) => {
    setActiveExam(prev => (prev ? { ...prev, timeRemaining: remaining } : null));
  };

  // Finish exam & compute real score
  const finishExam = () => {
    if (!activeExam) return;

    const pkg = packages.find(p => p.id === activeExam.packageId) || packages[0];
    const totalQuestions = questions.length;
    let correctCount = 0;
    let incorrectCount = 0;
    let emptyCount = 0;

    const subtestScores = {
      'Tes Potensi Skolastik (TPS)': { correct: 0, total: 0, score: 0 },
      'Literasi Bahasa Indonesia': { correct: 0, total: 0, score: 0 },
      'Literasi Bahasa Inggris': { correct: 0, total: 0, score: 0 },
      'Penalaran Matematika': { correct: 0, total: 0, score: 0 }
    };

    questions.forEach(q => {
      const sub = q.subtest || 'Tes Potensi Skolastik (TPS)';
      if (!subtestScores[sub]) {
        subtestScores[sub] = { correct: 0, total: 0, score: 0 };
      }
      subtestScores[sub].total += 1;

      const userAnswer = activeExam.answers[q.id];
      if (!userAnswer) {
        emptyCount += 1;
      } else if (userAnswer === q.correctKey) {
        correctCount += 1;
        subtestScores[sub].correct += 1;
      } else {
        incorrectCount += 1;
      }
    });

    // Calculate subtest percentages
    Object.keys(subtestScores).forEach(key => {
      const sub = subtestScores[key];
      sub.score = sub.total > 0 ? Math.round((sub.correct / sub.total) * 100) : 0;
    });

    // Total score 0-100 scale
    const totalScore = Math.round((correctCount / totalQuestions) * 1000) / 10; // e.g. 85.0
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / (totalQuestions - emptyCount || 1)) * 100) : 0;

    const nowStr = new Date().toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\./g, ':');

    const resultId = `HIST-${Date.now().toString().slice(-6)}`;

    const newResult = {
      id: resultId,
      packageId: pkg.id,
      packageName: pkg.name,
      completedAt: nowStr,
      totalQuestions,
      correctCount,
      incorrectCount,
      emptyCount,
      score: totalScore,
      accuracy,
      subtestScores,
      answers: { ...activeExam.answers }
    };

    // Save to history
    setExamHistory(prev => [newResult, ...prev]);

    // Update current user student record
    if (currentUser) {
      setStudents(prev => prev.map(s => {
        if (s.id === currentUser.id) {
          const newTotal = (s.totalTryout || 0) + 1;
          const newAvg = Math.round((((s.avgScore || 0) * (s.totalTryout || 0) + totalScore) / newTotal) * 10) / 10;
          return { ...s, totalTryout: newTotal, avgScore: newAvg };
        }
        return s;
      }));
    }

    // Update dynamic ranking list with real user score
    setRankings(prev => {
      const userName = currentUser ? currentUser.name : 'Peserta Demo';
      const userSchool = currentUser?.originSchool || 'SMA / MA Sederajat';
      const userPTKIN = currentUser?.targetPTKIN || 'UIN Syarif Hidayatullah Jakarta';
      const userMajor = currentUser?.targetMajor || 'Pendidikan Agama Islam';

      // Remove existing entry for current user and insert new one
      const filtered = prev.filter(r => !r.isCurrentUser && r.name !== userName);
      const userRankEntry = {
        name: userName,
        school: userSchool,
        ptkin: userPTKIN,
        major: userMajor,
        packageId: pkg.id,
        score: totalScore,
        date: new Date().toISOString().split('T')[0],
        isCurrentUser: true
      };

      const updated = [...filtered, userRankEntry];
      // Sort descending by score
      updated.sort((a, b) => b.score - a.score);
      // Re-assign ranks 1..N
      return updated.map((item, idx) => ({ ...item, rank: idx + 1 }));
    });

    // Clear active exam session
    setActiveExam(null);
    localStorage.removeItem('umptkin_active_exam');

    // Confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    showToast('Ujian selesai! Skor berhasil dihitung secara otomatis.', 'success');
    navigateTo('result', { resultId });
  };

  // Simulate Payment for Paid Package
  const simulatePayment = (packageId, method = 'QRIS') => {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    // Add to unlocked
    if (!unlockedPackages.includes(packageId)) {
      setUnlockedPackages(prev => [...prev, packageId]);
    }

    // Add transaction record
    const trxId = `TRX-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowStr = new Date().toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\./g, ':');

    const newTrx = {
      id: trxId,
      studentName: currentUser ? currentUser.name : 'Ahmad Fauzi Rahman',
      packageName: pkg.name,
      amount: pkg.price,
      method,
      date: nowStr,
      status: 'Berhasil'
    };

    setTransactions(prev => [newTrx, ...prev]);
    showToast(`Pembayaran Rp ${pkg.price.toLocaleString('id-ID')} via ${method} berhasil diverifikasi! Paket "${pkg.name}" kini aktif.`, 'success');
  };

  // Admin Question Management CRUD
  const adminAddQuestion = (qData) => {
    const newId = `Q-${qData.subtest?.includes('TPS') ? 'TPS' : qData.subtest?.includes('Indonesia') ? 'LBI' : qData.subtest?.includes('Inggris') ? 'ENG' : 'MTK'}-${Date.now().toString().slice(-4)}`;
    const newQuestion = {
      id: newId,
      subtest: qData.subtest,
      category: qData.category || 'Umum',
      difficulty: qData.difficulty || 'Sedang',
      questionText: qData.questionText,
      options: qData.options,
      correctKey: qData.correctKey,
      explanation: qData.explanation,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuestions(prev => [newQuestion, ...prev]);
    showToast(`Soal baru (${newId}) berhasil ditambahkan ke Bank Soal!`, 'success');
  };

  const adminUpdateQuestion = (updatedQ) => {
    setQuestions(prev => prev.map(q => q.id === updatedQ.id ? updatedQ : q));
    showToast(`Soal ${updatedQ.id} berhasil diperbarui!`, 'success');
  };

  const adminDeleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast(`Soal ${id} telah dihapus dari sistem.`, 'info');
  };

  // Admin Package Management CRUD
  const adminAddPackage = (pkgData) => {
    const newId = `TO-0${packages.length + 1}`;
    const newPkg = {
      id: newId,
      name: pkgData.name,
      description: pkgData.description,
      questionCount: Number(pkgData.questionCount) || 20,
      durationMinutes: Number(pkgData.durationMinutes) || 30,
      price: Number(pkgData.price) || 0,
      isFree: Number(pkgData.price) === 0,
      badge: pkgData.badge || 'Reguler',
      status: pkgData.status || 'Aktif',
      subtests: [
        { name: 'Tes Potensi Skolastik (TPS)', count: 5 },
        { name: 'Literasi Bahasa Indonesia', count: 5 },
        { name: 'Literasi Bahasa Inggris', count: 5 },
        { name: 'Penalaran Matematika', count: 5 }
      ],
      rules: [
        'Ujian simulasi terstandar panitia pusat.',
        `Durasi pengerjaan ${pkgData.durationMinutes || 30} menit.`,
        'Penilaian otomatis skala 0-100.'
      ],
      startDate: pkgData.startDate || '2025-01-01',
      endDate: pkgData.endDate || '2025-12-31'
    };

    setPackages(prev => [...prev, newPkg]);
    showToast(`Paket "${newPkg.name}" berhasil dibuat!`, 'success');
  };

  const adminUpdatePackage = (updatedPkg) => {
    setPackages(prev => prev.map(p => p.id === updatedPkg.id ? updatedPkg : p));
    showToast(`Paket "${updatedPkg.name}" berhasil diupdate.`, 'success');
  };

  const adminDeletePackage = (id) => {
    setPackages(prev => prev.filter(p => p.id !== id));
    showToast(`Paket ${id} berhasil dihapus.`, 'info');
  };

  // Export CSV Helper
  const exportTransactionsCSV = () => {
    const headers = ['ID Transaksi', 'Nama Peserta', 'Paket Tryout', 'Nominal', 'Metode Pembayaran', 'Tanggal', 'Status'];
    const rows = transactions.map(t => [
      t.id,
      `"${t.studentName}"`,
      `"${t.packageName}"`,
      t.amount,
      t.method,
      `"${t.date}"`,
      t.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Transaksi_Tryout_UMPTKIN_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Laporan transaksi berhasil diunduh dalam format CSV.', 'success');
  };

  // Reset to default seed data (useful for client presentation demo restart)
  const resetDemoData = () => {
    localStorage.clear();
    setPackages(INITIAL_PACKAGES);
    setUnlockedPackages(['TO-01']);
    setQuestions(INITIAL_QUESTIONS);
    setRankings(INITIAL_RANKINGS);
    setExamHistory(INITIAL_EXAM_HISTORY);
    setStudents(INITIAL_STUDENTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setCurrentUser(INITIAL_USER);
    setActiveExam(null);
    setMode('participant');
    setCurrentPage('landing');
    showToast('Seluruh data demo berhasil di-reset ke kondisi awal.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        switchMode,
        currentPage,
        pageParams,
        navigateTo,
        currentUser,
        adminUser,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        login,
        register,
        logout,
        packages,
        unlockedPackages,
        questions,
        examHistory,
        rankings,
        students,
        transactions,
        activeExam,
        toasts,
        showToast,
        removeToast,
        startExam,
        setExamAnswer,
        clearExamAnswer,
        toggleExamDoubtful,
        setExamQuestionIndex,
        updateTimeRemaining,
        finishExam,
        simulatePayment,
        adminAddQuestion,
        adminUpdateQuestion,
        adminDeleteQuestion,
        adminAddPackage,
        adminUpdatePackage,
        adminDeletePackage,
        exportTransactionsCSV,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
