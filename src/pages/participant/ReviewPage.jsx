import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  BookOpen,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

export const ReviewPage = () => {
  const { examHistory, questions, pageParams, navigateTo } = useApp();
  const [filterType, setFilterType] = useState('all'); // 'all', 'correct', 'incorrect', 'empty'

  const resultId = pageParams?.resultId;
  const result = examHistory.find(h => h.id === resultId) || examHistory[0];

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 max-w-md">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h2 className="text-base font-bold text-slate-800">Tidak ada data pembahasan</h2>
          <button
            onClick={() => navigateTo('dashboard')}
            className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const userAnswers = result.answers || {};

  // Filter questions based on selected tab
  const filteredQuestions = questions.filter((q) => {
    const userKey = userAnswers[q.id];
    const isCorrect = userKey === q.correctKey;
    const isEmpty = !userKey;

    if (filterType === 'correct') return isCorrect;
    if (filterType === 'incorrect') return !isCorrect && !isEmpty;
    if (filterType === 'empty') return isEmpty;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button
            onClick={() => navigateTo('result', { resultId: result.id })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Laporan Skor</span>
          </button>

          <span className="text-xs text-slate-500">
            Paket: <strong className="text-slate-800">{result.packageName}</strong> • Skor: <strong className="text-teal-700 font-mono">{result.score}</strong>
          </span>
        </div>

        {/* Page Title & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span>E-Pembahasan Lengkap Soal UMPTKIN</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Kunci jawaban resmi, komparasi jawaban Anda, dan analisis mendalam seluruh nomor ujian.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium border border-slate-200/80">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'all' ? 'bg-white text-teal-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({questions.length})
              </button>
              <button
                onClick={() => setFilterType('correct')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'correct' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Benar ({result.correctCount})
              </button>
              <button
                onClick={() => setFilterType('incorrect')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'incorrect' ? 'bg-white text-rose-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Salah ({result.incorrectCount})
              </button>
              <button
                onClick={() => setFilterType('empty')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'empty' ? 'bg-white text-slate-800 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kosong ({result.emptyCount})
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-5">
          {filteredQuestions.map((q) => {
            const userKey = userAnswers[q.id];
            const isCorrect = userKey === q.correctKey;
            const isEmpty = !userKey;
            const originalIndex = questions.findIndex(orig => orig.id === q.id) + 1;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4"
              >
                {/* Header item: number, subtest, status badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {originalIndex}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 mr-2">
                        {q.subtest}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {q.category}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div>
                    {isEmpty ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <HelpCircle className="w-3.5 h-3.5" /> Tidak Dijawab (0 poin)
                      </span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Jawaban Benar (+5 poin)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Jawaban Salah (0 poin)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                  {q.questionText}
                </p>

                {/* Options with Highlight */}
                <div className="space-y-2 pt-1">
                  {q.options.map(opt => {
                    const isUserChoice = userKey === opt.key;
                    const isKeyAnswer = q.correctKey === opt.key;

                    let cardStyle = 'border-slate-200 bg-white text-slate-700';
                    let badgeStyle = 'bg-slate-100 text-slate-600';

                    if (isKeyAnswer) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500/20';
                      badgeStyle = 'bg-emerald-600 text-white font-bold';
                    } else if (isUserChoice && !isCorrect) {
                      cardStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 font-medium ring-1 ring-rose-500/20';
                      badgeStyle = 'bg-rose-600 text-white font-bold';
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start justify-between gap-3 ${cardStyle}`}
                      >
                        <div className="flex items-start gap-2.5 flex-1">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 ${badgeStyle}`}>
                            {opt.key}
                          </span>
                          <span className="leading-relaxed mt-0.5">{opt.text}</span>
                        </div>

                        {/* Status Label on Option */}
                        <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold">
                          {isKeyAnswer && (
                            <span className="text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" /> Kunci Jawaban
                            </span>
                          )}
                          {isUserChoice && !isCorrect && (
                            <span className="text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <X className="w-3 h-3" /> Pilihan Anda
                            </span>
                          )}
                          {isUserChoice && isCorrect && (
                            <span className="text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" /> Pilihan Anda (Tepat)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/90 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-teal-800">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    <span>Pembahasan & Analisis Soal:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line pl-5 font-normal">
                    {q.explanation}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Back Link bottom */}
        <div className="pt-2 text-center">
          <button
            onClick={() => navigateTo('result', { resultId: result.id })}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Kembali ke Halaman Hasil
          </button>
        </div>

      </div>
    </div>
  );
};
