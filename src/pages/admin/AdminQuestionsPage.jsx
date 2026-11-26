import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  FileQuestion,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
  ArrowUpDown
} from 'lucide-react';

export const AdminQuestionsPage = () => {
  const {
    questions,
    adminAddQuestion,
    adminUpdateQuestion,
    adminDeleteQuestion
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [subtestFilter, setSubtestFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [previewQuestion, setPreviewQuestion] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    subtest: 'Tes Potensi Skolastik (TPS)',
    category: 'Penalaran Umum',
    difficulty: 'Sedang',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    correctKey: 'A',
    explanation: ''
  });

  const openAddModal = () => {
    setEditingQuestion(null);
    setFormData({
      subtest: 'Tes Potensi Skolastik (TPS)',
      category: 'Penalaran Umum',
      difficulty: 'Sedang',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      correctKey: 'A',
      explanation: ''
    });
    setIsFormModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingQuestion(q);
    const getOpt = (key) => q.options?.find(o => o.key === key)?.text || '';
    setFormData({
      subtest: q.subtest,
      category: q.category || 'Umum',
      difficulty: q.difficulty || 'Sedang',
      questionText: q.questionText,
      optionA: getOpt('A'),
      optionB: getOpt('B'),
      optionC: getOpt('C'),
      optionD: getOpt('D'),
      optionE: getOpt('E'),
      correctKey: q.correctKey || 'A',
      explanation: q.explanation || ''
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formattedOptions = [
      { key: 'A', text: formData.optionA },
      { key: 'B', text: formData.optionB },
      { key: 'C', text: formData.optionC },
      { key: 'D', text: formData.optionD },
      { key: 'E', text: formData.optionE }
    ];

    if (editingQuestion) {
      adminUpdateQuestion({
        ...editingQuestion,
        subtest: formData.subtest,
        category: formData.category,
        difficulty: formData.difficulty,
        questionText: formData.questionText,
        options: formattedOptions,
        correctKey: formData.correctKey,
        explanation: formData.explanation
      });
    } else {
      adminAddQuestion({
        subtest: formData.subtest,
        category: formData.category,
        difficulty: formData.difficulty,
        questionText: formData.questionText,
        options: formattedOptions,
        correctKey: formData.correctKey,
        explanation: formData.explanation
      });
    }

    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingQuestion) {
      adminDeleteQuestion(deletingQuestion.id);
      setDeletingQuestion(null);
    }
  };

  // Filter questions
  const filtered = questions.filter(q => {
    const matchesSearch =
      q.questionText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubtest = subtestFilter === 'all' || q.subtest === subtestFilter;
    const matchesDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;

    return matchesSearch && matchesSubtest && matchesDifficulty;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileQuestion className="w-6 h-6 text-teal-600" />
            <span>Manajemen Bank Soal UMPTKIN</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola, perbarui, dan tambah butir soal 4 subtes berbobot HOTS
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Soal Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari ID, kata kunci soal..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-800"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            value={subtestFilter}
            onChange={(e) => setSubtestFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="all">Semua Subtes</option>
            <option value="Tes Potensi Skolastik (TPS)">Tes Potensi Skolastik (TPS)</option>
            <option value="Literasi Bahasa Indonesia">Literasi Bahasa Indonesia</option>
            <option value="Literasi Bahasa Inggris">Literasi Bahasa Inggris</option>
            <option value="Penalaran Matematika">Penalaran Matematika</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="all">Semua Kesulitan</option>
            <option value="Mudah">Mudah</option>
            <option value="Sedang">Sedang</option>
            <option value="Sulit">Sulit</option>
          </select>

          <span className="text-xs font-semibold text-slate-500 px-2">
            Total: <strong>{filtered.length}</strong> Soal
          </span>
        </div>

      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 pl-6 w-28">ID Soal</th>
                <th className="py-3.5 w-44">Subtes</th>
                <th className="py-3.5">Ringkasan Teks Soal</th>
                <th className="py-3.5 w-24 text-center">Kunci</th>
                <th className="py-3.5 w-28 text-center">Tingkat</th>
                <th className="py-3.5 pr-6 w-32 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    Tidak ditemukan butir soal dengan filter tersebut.
                  </td>
                </tr>
              ) : (
                filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 pl-6 font-mono font-bold text-slate-700">
                      {q.id}
                    </td>

                    <td className="py-4">
                      <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-[10px] block w-fit">
                        {q.subtest?.replace('Tes Potensi Skolastik ', '')}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{q.category}</span>
                    </td>

                    <td className="py-4">
                      <p className="text-slate-800 line-clamp-2 max-w-lg leading-relaxed">
                        {q.questionText}
                      </p>
                    </td>

                    <td className="py-4 text-center">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold inline-flex items-center justify-center font-mono">
                        {q.correctKey}
                      </span>
                    </td>

                    <td className="py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        q.difficulty === 'Mudah'
                          ? 'bg-emerald-50 text-emerald-700'
                          : q.difficulty === 'Sulit'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>

                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewQuestion(q)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Lihat Detail Soal"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(q)}
                          className="p-1.5 rounded-lg text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                          title="Edit Soal"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingQuestion(q)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Hapus Soal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT SOAL */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingQuestion ? `Edit Soal (${editingQuestion.id})` : 'Tambah Butir Soal Baru'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subtes Soal
              </label>
              <select
                value={formData.subtest}
                onChange={(e) => setFormData({ ...formData, subtest: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Tes Potensi Skolastik (TPS)">Tes Potensi Skolastik (TPS)</option>
                <option value="Literasi Bahasa Indonesia">Literasi Bahasa Indonesia</option>
                <option value="Literasi Bahasa Inggris">Literasi Bahasa Inggris</option>
                <option value="Penalaran Matematika">Penalaran Matematika</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori / Topik
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Misal: Penalaran Logis"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Kesulitan
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teks Butir Soal (Dapat mencakup wacana / premis)
            </label>
            <textarea
              required
              rows={4}
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
              placeholder="Tuliskan butir soal secara lengkap..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {/* Options A - E */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Pilihan Jawaban (A - E):
            </label>
            {['A', 'B', 'C', 'D', 'E'].map(k => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {k}
                </span>
                <input
                  type="text"
                  required
                  value={formData[`option${k}`]}
                  onChange={(e) => setFormData({ ...formData, [`option${k}`]: e.target.value })}
                  placeholder={`Teks pilihan jawaban ${k}`}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kunci Jawaban Benar
              </label>
              <select
                value={formData.correctKey}
                onChange={(e) => setFormData({ ...formData, correctKey: e.target.value })}
                className="w-full px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 focus:outline-none"
              >
                {['A', 'B', 'C', 'D', 'E'].map(k => (
                  <option key={k} value={k}>Pilihan {k}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pembahasan & Analisis Kunci Jawaban
              </label>
              <textarea
                required
                rows={3}
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Jelaskan alasan kunci jawaban secara akademis..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              {editingQuestion ? 'Perbarui Soal' : 'Simpan Soal Baru'}
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL KONFIRMASI HAPUS */}
      <Modal
        isOpen={!!deletingQuestion}
        onClose={() => setDeletingQuestion(null)}
        title="Hapus Butir Soal"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950">
              <p className="font-bold">Apakah Anda yakin ingin menghapus soal ini?</p>
              <p className="mt-1 text-rose-800">
                ID: <span className="font-mono font-bold">{deletingQuestion?.id}</span> ({deletingQuestion?.subtest})
              </p>
              <p className="mt-1 text-[11px] text-rose-600">Tindakan ini akan menghapus soal dari bank data simulasi.</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeletingQuestion(null)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Ya, Hapus Soal
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL PREVIEW DETAIL SOAL */}
      <Modal
        isOpen={!!previewQuestion}
        onClose={() => setPreviewQuestion(null)}
        title={`Preview Soal: ${previewQuestion?.id}`}
        maxWidth="max-w-xl"
      >
        {previewQuestion && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {previewQuestion.subtest}
              </span>
              <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {previewQuestion.category}
              </span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                {previewQuestion.difficulty}
              </span>
            </div>

            <p className="text-slate-800 whitespace-pre-line text-sm leading-relaxed p-3 bg-slate-50 rounded-xl border border-slate-100">
              {previewQuestion.questionText}
            </p>

            <div className="space-y-1.5">
              <p className="font-bold text-slate-700">Pilihan:</p>
              {previewQuestion.options?.map(opt => (
                <div
                  key={opt.key}
                  className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                    opt.key === previewQuestion.correctKey
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 text-xs flex items-center justify-center shrink-0">
                    {opt.key}
                  </span>
                  <span>{opt.text}</span>
                  {opt.key === previewQuestion.correctKey && (
                    <span className="ml-auto text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">
                      Kunci Jawaban
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
              <p className="font-bold text-teal-900">Pembahasan:</p>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {previewQuestion.explanation}
              </p>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
