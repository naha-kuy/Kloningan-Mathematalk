'use client';

import { useState } from 'react';

export default function OrtuGantiPasswordPage() {
  const [form, setForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.current_password) errs.current_password = 'Password saat ini wajib diisi';
    if (!form.password) errs.password = 'Password baru wajib diisi';
    else if (form.password.length < 6) errs.password = 'Password baru minimal 6 karakter';
    if (!form.password_confirmation) errs.password_confirmation = 'Konfirmasi password wajib diisi';
    else if (form.password !== form.password_confirmation) errs.password_confirmation = 'Konfirmasi password tidak cocok';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch('/api/ortu/ganti-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Gagal mengganti password');
      }

      showToast('Password berhasil diganti');
      setForm({ current_password: '', password: '', password_confirmation: '' });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

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

      <h1 className="text-2xl font-bold text-navy">Ganti Password</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
          <input
            required
            type="password"
            name="current_password"
            value={form.current_password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 ${
              errors.current_password ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.current_password && (
            <p className="text-xs text-red-500 mt-1">{errors.current_password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
          <input
            required
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 ${
              errors.password ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
          <input
            required
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 ${
              errors.password_confirmation ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-red-500 mt-1">{errors.password_confirmation}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Mengganti...' : 'Ganti Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
