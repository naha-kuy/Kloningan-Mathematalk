'use client';

import { useState, useEffect, useCallback } from 'react';

const JENJANG_OPTIONS = ['SD', 'SMP', 'SMA'];

function initialForm() {
  return { nama_siswa: '', jenjang_kelas: 'SD', sekolah: '', email: '', phone: '', catatan: '' };
}

export default function OrtuAnakPage() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm());
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchChildren = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch('/api/ortu/anak', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat data anak');
      const json = await res.json();
      setChildren(Array.isArray(json) ? json : json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  const openAddModal = () => {
    setForm(initialForm());
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (child) => {
    setForm({
      nama_siswa: child.nama_siswa || '',
      jenjang_kelas: child.jenjang_kelas || 'SD',
      sekolah: child.sekolah || '',
      email: child.email || '',
      phone: child.phone || '',
      catatan: child.catatan || '',
    });
    setEditingId(child.id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const url = editingId ? `/api/ortu/anak/${editingId}` : '/api/ortu/anak';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Gagal menyimpan data anak');
      showToast(editingId ? 'Data anak berhasil diperbarui' : 'Anak berhasil ditambahkan');
      setModalOpen(false);
      await fetchChildren();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data anak ini?')) return;
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch(`/api/ortu/anak/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal menghapus data anak');
      showToast('Data anak berhasil dihapus');
      await fetchChildren();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleBuatkanAkun = async (child) => {
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch(`/api/ortu/anak/${child.id}/akun`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal membuatkan akun');
      showToast('Akun berhasil dibuat untuk ' + child.nama_siswa);
      await fetchChildren();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat data anak...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-red-800 font-black text-lg mb-2">{error}</h3>
        <button
          onClick={fetchChildren}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl shadow-lg text-sm font-bold text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy leading-tight">Daftar Anak</h2>
          <p className="text-gray-500 font-medium mt-1">Kelola data buah hati Anda.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-navy text-white font-bold rounded-2xl shadow-lg shadow-navy/20 hover:-translate-y-1 transition-all text-sm"
        >
          + Tambah Anak
        </button>
      </div>

      {children.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-100 p-12 rounded-[2.5rem] text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">👶</div>
          <h4 className="text-lg font-bold text-navy mb-2">Belum ada data anak</h4>
          <p className="text-gray-600 font-medium max-w-xs mx-auto mb-8">Tambahkan data anak Anda untuk memantau perkembangan belajarnya.</p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-8 py-3 bg-navy text-white font-bold rounded-2xl shadow-lg shadow-navy/20 hover:-translate-y-1 transition-all"
          >
            Tambah Anak Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child) => (
            <div
              key={child.id}
              className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-navy group-hover:text-white transition-colors shrink-0">👤</div>
                <div className="min-w-0">
                  <h4 className="font-black text-navy text-lg leading-tight">{child.nama_siswa}</h4>
                  <p className="text-sm text-gray-500">{child.jenjang_kelas || '-'} {child.sekolah ? `· ${child.sekolah}` : ''}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-500 border-t border-gray-50 pt-4">
                {child.email && <p>📧 {child.email}</p>}
                {child.phone && <p>📞 {child.phone}</p>}
                {child.catatan && <p>📝 {child.catatan}</p>}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(child)}
                  className="px-4 py-2 text-xs font-black bg-cyan/10 text-cyan rounded-xl hover:bg-cyan/20 transition-colors uppercase tracking-widest"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(child.id)}
                  className="px-4 py-2 text-xs font-black bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors uppercase tracking-widest"
                >
                  Hapus
                </button>
                {!child.has_akun && (
                  <button
                    onClick={() => handleBuatkanAkun(child)}
                    className="px-4 py-2 text-xs font-black bg-gold/10 text-gold rounded-xl hover:bg-gold/20 transition-colors uppercase tracking-widest"
                  >
                    Buatkan Akun
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-xl font-black text-navy mb-6">
              {editingId ? 'Edit Data Anak' : 'Tambah Anak'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Siswa</label>
                <input
                  required
                  type="text"
                  value={form.nama_siswa}
                  onChange={(e) => setForm({ ...form, nama_siswa: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Jenjang Kelas</label>
                <select
                  value={form.jenjang_kelas}
                  onChange={(e) => setForm({ ...form, jenjang_kelas: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                >
                  {JENJANG_OPTIONS.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Sekolah</label>
                <input
                  type="text"
                  value={form.sekolah}
                  onChange={(e) => setForm({ ...form, sekolah: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Catatan</label>
                <textarea
                  rows={3}
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-navy text-white rounded-2xl text-sm font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-lg shadow-navy/20"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
