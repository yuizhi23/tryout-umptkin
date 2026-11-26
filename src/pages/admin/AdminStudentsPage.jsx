import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  School,
  GraduationCap,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';

export const AdminStudentsPage = () => {
  const { students } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.targetPTKIN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.targetMajor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-teal-600" />
          <span>Data Calon Peserta UMPTKIN</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Daftar akun peserta terdaftar, profil pilihan kampus PTKIN, dan riwayat performa
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, email, kampus PTKIN..."
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
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>

          <span className="text-xs text-slate-500 font-semibold">
            Total: <strong>{filtered.length}</strong> Peserta
          </span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 pl-6 w-28">ID</th>
                <th className="py-3.5">Nama Peserta</th>
                <th className="py-3.5">Email / Kontak</th>
                <th className="py-3.5">Target PTKIN & Prodi</th>
                <th className="py-3.5 text-center">Tryout / Rata-rata</th>
                <th className="py-3.5 text-center">Status</th>
                <th className="py-3.5 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-6 font-mono font-bold text-slate-700">
                    {s.id}
                  </td>

                  <td className="py-4">
                    <span className="font-bold text-slate-900 block">{s.name}</span>
                    <span className="text-[10px] text-slate-400">Daftar: {s.registeredDate}</span>
                  </td>

                  <td className="py-4 text-slate-600">
                    <p>{s.email}</p>
                    <p className="text-[11px] text-slate-400">{s.phone}</p>
                  </td>

                  <td className="py-4">
                    <p className="font-semibold text-slate-800">{s.targetPTKIN}</p>
                    <p className="text-[11px] text-slate-500">{s.targetMajor}</p>
                  </td>

                  <td className="py-4 text-center">
                    <span className="font-semibold text-slate-800 block">{s.totalTryout} Selesai</span>
                    <span className="font-mono text-teal-700 font-bold text-[11px]">
                      Avg: {s.avgScore}
                    </span>
                  </td>

                  <td className="py-4 text-center">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status}
                    </span>
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="p-1.5 rounded-lg text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                      title="Lihat Detail Peserta"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL PESERTA */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title="Detail Data Calon Mahasiswa"
        maxWidth="max-w-lg"
      >
        {selectedStudent && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold text-base flex items-center justify-center">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{selectedStudent.name}</h3>
                <p className="text-slate-500 text-[11px] font-mono">{selectedStudent.id}</p>
              </div>
            </div>

            <div className="space-y-2 border-y border-slate-100 py-3">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Email:</span>
                <span className="font-semibold text-slate-800">{selectedStudent.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Nomor Telepon:</span>
                <span className="font-semibold text-slate-800">{selectedStudent.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Tanggal Terdaftar:</span>
                <span className="font-semibold text-slate-800">{selectedStudent.registeredDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status Akun:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200/90 space-y-1.5">
              <h4 className="font-bold text-teal-900 text-xs">Preferensi Seleksi PTKIN:</h4>
              <p className="text-slate-700"><strong>Target Kampus:</strong> {selectedStudent.targetPTKIN}</p>
              <p className="text-slate-700"><strong>Program Studi:</strong> {selectedStudent.targetMajor}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 text-[11px] block">Total Ujian Diikuti</span>
                <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">
                  {selectedStudent.totalTryout}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 text-[11px] block">Rata-rata Nilai</span>
                <span className="text-lg font-bold text-teal-700 font-mono mt-0.5 block">
                  {selectedStudent.avgScore}
                </span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl hover:bg-slate-900"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
