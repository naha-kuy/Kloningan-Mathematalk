'use client';

import { useState, useEffect, useCallback } from 'react';

const JENJANG_OPTIONS = ['SD', 'SMP', 'SMA'];

function initialForm() {
  return { nama_siswa: '', jenjang_kelas: 'SD', sekolah: '', email: '', phone: '', catatan: '' };
}

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
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
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchChildren}
          className="mt-4 px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Data Anak</h1>
        <button
          onClick={openAddModal}
          className="px-5 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors text-sm font-medium"
        >
          + Tambah Anak
        </button>
      </div>

      {children.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Belum ada data anak</p>
          <button
            onClick={openAddModal}
            className="mt-3 px-5 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors text-sm font-medium"
          >
            Tambah Anak Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {children.map((child, i) => (
            <div key={child.id ?? i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-navy text-lg mb-2">{child.nama_siswa}</h2>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p><span className="font-medium text-gray-700">Jenjang:</span> {child.jenjang_kelas || '-'}</p>
                <p><span className="font-medium text-gray-700">Sekolah:</span> {child.sekolah || '-'}</p>
                <p><span className="font-medium text-gray-700">Email:</span> {child.email || '-'}</p>
                <p><span className="font-medium text-gray-700">Phone:</span> {child.phone || '-'}</p>
                {child.catatan && (
                  <p><span className="font-medium text-gray-700">Catatan:</span> {child.catatan}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(child)}
                  className="px-3 py-1.5 text-xs font-medium bg-cyan/10 text-cyan rounded-lg hover:bg-cyan/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(child.id)}
                  className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Hapus
                </button>
                {!child.has_akun && (
                  <button
                    onClick={() => handleBuatkanAkun(child)}
                    className="px-3 py-1.5 text-xs font-medium bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
                  >
                    Buatkan Akun
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-navy mb-4">
              {editingId ? 'Edit Data Anak' : 'Tambah Anak'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Siswa</label>
                <input
                  required
                  type="text"
                  value={form.nama_siswa}
                  onChange={(e) => setForm({ ...form, nama_siswa: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang Kelas</label>
                <select
                  value={form.jenjang_kelas}
                  onChange={(e) => setForm({ ...form, jenjang_kelas: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                >
                  {JENJANG_OPTIONS.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sekolah</label>
                <input
                  type="text"
                  value={form.sekolah}
                  onChange={(e) => setForm({ ...form, sekolah: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                <textarea
                  rows={3}
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 disabled:opacity-50 transition-colors"
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
