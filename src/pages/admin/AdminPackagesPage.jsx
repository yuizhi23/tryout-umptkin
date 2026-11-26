import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Clock,
  BookOpen,
  DollarSign,
  AlertTriangle,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const AdminPackagesPage = () => {
  const {
    packages,
    adminAddPackage,
    adminUpdatePackage,
    adminDeletePackage
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deletingPackage, setDeletingPackage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    questionCount: 20,
    durationMinutes: 30,
    price: 0,
    badge: 'Reguler',
    status: 'Aktif',
    startDate: '2025-01-01',
    endDate: '2025-12-31'
  });

  const openAddModal = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      description: '',
      questionCount: 20,
      durationMinutes: 30,
      price: 0,
      badge: 'Reguler',
      status: 'Aktif',
      startDate: '2025-01-01',
      endDate: '2025-12-31'
    });
    setIsFormModalOpen(true);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      questionCount: pkg.questionCount,
      durationMinutes: pkg.durationMinutes,
      price: pkg.price,
      badge: pkg.badge || 'Reguler',
      status: pkg.status || 'Aktif',
      startDate: pkg.startDate || '2025-01-01',
      endDate: pkg.endDate || '2025-12-31'
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingPackage) {
      adminUpdatePackage({
        ...editingPackage,
        ...formData,
        isFree: Number(formData.price) === 0
      });
    } else {
      adminAddPackage(formData);
    }
    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingPackage) {
      adminDeletePackage(deletingPackage.id);
      setDeletingPackage(null);
    }
  };

  const filtered = packages.filter(pkg => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-teal-600" />
            <span>Kelola Paket Tryout UMPTKIN</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Atur konfigurasi paket simulasi, durasi hitung mundur, tarif harga, dan periode akses
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Paket Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama paket tryout..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="all">Semua Status</option>
            <option value="Aktif">Status Aktif</option>
            <option value="Nonaktif">Status Nonaktif</option>
          </select>
          <span className="text-xs text-slate-500 font-semibold">
            Total: <strong>{filtered.length}</strong> Paket
          </span>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 pl-6 w-24">ID</th>
                <th className="py-3.5">Nama & Deskripsi Paket</th>
                <th className="py-3.5 text-center">Soal / Durasi</th>
                <th className="py-3.5 text-center">Harga (Rp)</th>
                <th className="py-3.5 text-center">Status</th>
                <th className="py-3.5 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(pkg => (
                <tr key={pkg.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-6 font-mono font-bold text-slate-700">
                    {pkg.id}
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{pkg.name}</span>
                      {pkg.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 max-w-md">
                      {pkg.description}
                    </p>
                  </td>

                  <td className="py-4 text-center">
                    <span className="font-medium text-slate-700">
                      {pkg.questionCount} Soal • {pkg.durationMinutes} Menit
                    </span>
                  </td>

                  <td className="py-4 text-center font-mono font-bold">
                    {pkg.isFree ? (
                      <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Gratis
                      </span>
                    ) : (
                      <span className="text-slate-900">
                        Rp {pkg.price.toLocaleString('id-ID')}
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      pkg.status === 'Aktif'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {pkg.status || 'Aktif'}
                    </span>
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(pkg)}
                        className="p-1.5 rounded-lg text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                        title="Edit Paket"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingPackage(pkg)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Hapus Paket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT PAKET */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingPackage ? `Edit Paket (${editingPackage.id})` : 'Buat Paket Tryout Baru'}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Paket Tryout
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Tryout UMPTKIN Ramadhan Akbar"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan sasaran dan keunggulan paket ini..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jumlah Soal
              </label>
              <input
                type="number"
                required
                min={5}
                max={100}
                value={formData.questionCount}
                onChange={(e) => setFormData({ ...formData, questionCount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Durasi (Menit)
              </label>
              <input
                type="number"
                required
                min={10}
                max={180}
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Harga (Rp, 0 = Gratis)
              </label>
              <input
                type="number"
                required
                min={0}
                step={5000}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Label / Badge
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Misal: Terpopuler, Eksklusif, Gratis"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Paket
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              >
                <option value="Aktif">Aktif (Dapat diakses peserta)</option>
                <option value="Nonaktif">Nonaktif (Disembunyikan)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              {editingPackage ? 'Perbarui Paket' : 'Simpan Paket Baru'}
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL KONFIRMASI HAPUS PAKET */}
      <Modal
        isOpen={!!deletingPackage}
        onClose={() => setDeletingPackage(null)}
        title="Hapus Paket Tryout"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950">
              <p className="font-bold">Apakah Anda yakin ingin menghapus paket ini?</p>
              <p className="mt-1 font-semibold">{deletingPackage?.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeletingPackage(null)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Ya, Hapus Paket
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
