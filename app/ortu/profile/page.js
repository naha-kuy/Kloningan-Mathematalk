'use client';

import { useState, useEffect } from 'react';

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded-2xl ${className}`} />;
}

export default function OrtuProfilePage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', province: '',
    postal_code: '', emergency_contact_name: '', emergency_contact_phone: '',
    occupation: '', notes: '',
  });
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('mathematalk_token');
        const [profileRes, provincesRes] = await Promise.all([
          fetch('/api/ortu/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/public/provinces'),
        ]);

        if (profileRes.ok) {
          const json = await profileRes.json();
          const data = json.data || json;
          setForm((prev) => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            city: data.city || '',
            province: data.province || '',
            postal_code: data.postal_code || '',
            emergency_contact_name: data.emergency_contact_name || '',
            emergency_contact_phone: data.emergency_contact_phone || '',
            occupation: data.occupation || '',
            notes: data.notes || '',
          }));
        }

        if (provincesRes.ok) {
          const json = await provincesRes.json();
          setProvinces(Array.isArray(json) ? json : json.data || []);
        }
      } catch {
        showToast('Gagal memuat data profil', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch('/api/ortu/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Gagal menyimpan profil');
      showToast('Profil berhasil disimpan');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat profil...</p>
        </div>
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

      <div>
        <h2 className="text-3xl font-black text-navy leading-tight">Profil Saya</h2>
        <p className="text-gray-500 font-medium mt-1">Kelola informasi akun Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Provinsi</label>
            <select
              name="province"
              value={form.province}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            >
              <option value="">Pilih Provinsi</option>
              {provinces.map((p, i) => (
                <option key={i} value={p.id || p.name || p}>
                  {p.name || p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kota</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Alamat</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kode Pos</label>
            <input
              type="text"
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kontak Darurat - Nama</label>
            <input
              type="text"
              name="emergency_contact_name"
              value={form.emergency_contact_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kontak Darurat - Phone</label>
            <input
              type="tel"
              name="emergency_contact_phone"
              value={form.emergency_contact_phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Pekerjaan</label>
            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Catatan</label>
            <input
              type="text"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-navy text-white font-bold rounded-2xl shadow-lg shadow-navy/20 hover:-translate-y-1 disabled:opacity-50 transition-all text-sm"
          >
            {saving ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
          <a
            href="/ortu/ganti-password"
            className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm"
          >
            Ganti Password
          </a>
        </div>
      </form>
    </div>
  );
}
