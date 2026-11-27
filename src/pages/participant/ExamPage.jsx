import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import { Logo } from '../../components/common/Logo';
import {
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Menu,
  X,
  ShieldAlert,
  Send
} from 'lucide-react';

export const ExamPage = () => {
  const {
    activeExam,
    questions,
    currentUser,
    setExamAnswer,
    clearExamAnswer,
    toggleExamDoubtful,
    setExamQuestionIndex,
    updateTimeRemaining,
    finishExam,
    navigateTo
  } = useApp();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // If no active exam, redirect to dashboard
  useEffect(() => {
    if (!activeExam) {
      navigateTo('dashboard');
    }
  }, [activeExam, navigateTo]);

  // Real-time Countdown Timer
  useEffect(() => {
    if (!activeExam || activeExam.isFinished) return;

    const interval = setInterval(() => {
      if (activeExam.timeRemaining <= 1) {
        clearInterval(interval);
        updateTimeRemaining(0);
        finishExam();
      } else {
        updateTimeRemaining(activeExam.timeRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeExam, updateTimeRemaining, finishExam]);

  if (!activeExam) return null;

  const currentIdx = activeExam.currentQuestionIndex || 0;
  const currentQuestion = questions[currentIdx] || questions[0];
  const totalQuestions = questions.length;

  const currentAnswer = activeExam.answers[currentQuestion.id];
  const isDoubtful = !!activeExam.doubtful[currentQuestion.id];

  // Format timer HH:MM:SS or MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isTimeCritical = activeExam.timeRemaining < 300; // less than 5 mins

  // Calculate summary counts
  const answeredCount = Object.keys(activeExam.answers).length;
  const doubtfulCount = Object.values(activeExam.doubtful).filter(Boolean).length;
  const emptyCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      
      {/* 1. TOP STICKY EXAM HEADER */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Brand & Exam Info */}
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white leading-none">
                  SSE UMPTKIN
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-950 text-teal-300 border border-teal-800 leading-none">
                  Ujian Berlangsung
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-xs mt-0.5 leading-none">
                {activeExam.packageName}
              </p>
            </div>
          </div>

          {/* Center / Timer Countdown */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm tracking-wider transition-all ${
                isTimeCritical
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-teal-300'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-rose-400' : 'text-teal-400'}`} />
              <span>{formatTime(activeExam.timeRemaining)}</span>
            </div>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="lg:hidden px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Daftar Soal</span>
            </button>
          </div>

          {/* Right Action: Finish Exam Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Selesai Ujian</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN EXAM INTERFACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT AREA: QUESTION & ANSWER CHOICES (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Question Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
              
              {/* Question Subtest & Category Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {currentQuestion.subtest}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {currentQuestion.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-medium">
                    Soal <strong className="text-slate-900 font-mono text-sm">{currentIdx + 1}</strong> / {totalQuestions}
                  </span>
                </div>
              </div>

              {/* Question Statement */}
              <div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                  {currentQuestion.questionText}
                </p>
              </div>

              {/* Answer Choices A - E */}
              <div className="space-y-2.5 pt-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Pilihlah salah satu jawaban yang paling tepat:
                </p>
                {currentQuestion.options.map(opt => {
                  const isSelected = currentAnswer === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setExamAnswer(currentQuestion.id, opt.key)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 group cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-medium ring-1 ring-teal-500/30'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="leading-relaxed flex-1 mt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Control Bar */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                
                {/* Previous Button */}
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setExamQuestionIndex(currentIdx - 1)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {/* Middle Actions: Doubtful & Clear */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleExamDoubtful(currentQuestion.id)}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isDoubtful
                        ? 'border-amber-400 bg-amber-100 text-amber-900 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-800'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isDoubtful ? 'fill-amber-600 text-amber-600' : 'text-slate-400'}`} />
                    <span>{isDoubtful ? 'Ragu-Ragu (Aktif)' : 'Tandai Ragu'}</span>
                  </button>

                  {currentAnswer && (
                    <button
                      type="button"
                      onClick={() => clearExamAnswer(currentQuestion.id)}
                      className="px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>

                {/* Next or Finish on Last Question */}
                {currentIdx < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setExamQuestionIndex(currentIdx + 1)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Selesai</span>
                  </button>
                )}

              </div>

            </div>
          </div>

          {/* RIGHT AREA: QUESTION NAVIGATOR (Col 4 on Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-5">
              
              {/* Navigator Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Nomor Soal Ujian</h3>
                <span className="text-xs text-slate-500 font-mono">
                  {answeredCount} / {totalQuestions} Terjawab
                </span>
              </div>

              {/* Legend Summary */}
              <div className="grid grid-cols-3 gap-2 text-[11px] pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Terjawab ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded bg-amber-400" />
                  <span>Ragu ({doubtfulCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded bg-slate-200" />
                  <span>Kosong ({emptyCount})</span>
                </div>
              </div>

              {/* Number Grid 1 to 20 */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const hasAnswer = !!activeExam.answers[q.id];
                  const hasDoubt = !!activeExam.doubtful[q.id];
                  const isCurrent = idx === currentIdx;

                  let bgClass = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200';
                  if (hasDoubt) {
                    bgClass = 'bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-2xs';
                  } else if (hasAnswer) {
                    bgClass = 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-2xs';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setExamQuestionIndex(idx)}
                      className={`relative h-10 rounded-xl text-xs font-semibold flex items-center justify-center border transition-all cursor-pointer ${bgClass} ${
                        isCurrent ? 'ring-2 ring-teal-500 ring-offset-2' : ''
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {hasDoubt && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-white" />
                      )}
                      {hasAnswer && !hasDoubt && (
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-bold opacity-80">
                          {activeExam.answers[q.id]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Finish Exam Button at Bottom of Sidebar */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Selesaikan Ujian Sekarang</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* MOBILE DRAWER MODAL FOR QUESTION NAVIGATOR */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-full bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Navigasi Soal Ujian</h3>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Number Grid Mobile */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const hasAnswer = !!activeExam.answers[q.id];
                  const hasDoubt = !!activeExam.doubtful[q.id];
                  const isCurrent = idx === currentIdx;

                  let bgClass = 'bg-slate-100 text-slate-600';
                  if (hasDoubt) {
                    bgClass = 'bg-amber-400 text-slate-950 font-bold';
                  } else if (hasAnswer) {
                    bgClass = 'bg-emerald-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setExamQuestionIndex(idx);
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center border transition-all ${bgClass} ${
                        isCurrent ? 'ring-2 ring-teal-500 ring-offset-2' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  setIsConfirmModalOpen(true);
                }}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Selesaikan Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL KONFIRMASI SELESAI UJIAN */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Konfirmasi Penyelesaian Ujian"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed">
              <p className="font-bold">Perhatian Penting:</p>
              <p className="mt-0.5">
                Setelah Anda menekan tombol "Selesaikan Ujian", jawaban Anda akan langsung dikunci dan dinilai secara otomatis. Anda tidak dapat kembali mengubah lembar jawaban.
              </p>
            </div>
          </div>

          {/* Answer Breakdown Table */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-200/70">
              <span className="text-slate-600">Total Soal:</span>
              <span className="font-bold text-slate-900">{totalQuestions} Butir</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-200/70">
              <span className="text-emerald-700 font-medium">Soal Sudah Dijawab:</span>
              <span className="font-bold text-emerald-700">{answeredCount} Soal</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-200/70">
              <span className="text-amber-700 font-medium">Soal Masih Ragu-Ragu:</span>
              <span className="font-bold text-amber-700">{doubtfulCount} Soal</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-rose-600 font-medium">Soal Belum Terjawab:</span>
              <span className="font-bold text-rose-600">{emptyCount} Soal</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Kembali Mengerjakan
            </button>
            <button
              type="button"
              onClick={() => {
                setIsConfirmModalOpen(false);
                finishExam();
              }}
              className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Ya, Selesaikan</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
