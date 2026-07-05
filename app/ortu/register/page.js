'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OrtuRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Nama wajib diisi';
    if (!form.email.trim()) errors.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Format email tidak valid';
    if (!form.phone.trim()) errors.phone = 'No. WhatsApp wajib diisi';
    if (!form.password) errors.password = 'Password wajib diisi';
    else if (form.password.length < 8) errors.password = 'Minimal 8 karakter';
    if (form.password !== form.password_confirmation) errors.password_confirmation = 'Tidak cocok dengan password';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          password_confirmation: form.password_confirmation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/login?registered=1');
      } else {
        setError(data.message || 'Pendaftaran gagal');
        if (data.errors) setFieldErrors(data.errors);
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
    if (fieldErrors[key]) setFieldErrors({ ...fieldErrors, [key]: '' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#0D2B5E] via-[#0D2B5E] to-[#1a3a7a] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <img src="/images/logo_light.png" alt="Mathematalk" className="h-10 w-auto mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0D2B5E]">Daftar Akun Baru</h1>
              <p className="text-gray-500 text-sm mt-1">Bergabung dengan Mathematalk sebagai Orang Tua</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm mb-6 flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                <input id="name" type="text" required value={form.name} onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all ${fieldErrors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {fieldErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                <input id="email" type="email" required value={form.email} onChange={(e) => updateField('email', e.target.value)}
                  placeholder="nama@email.com"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all ${fieldErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {fieldErrors.email && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1.5">No. WhatsApp <span className="text-red-500">*</span></label>
                <input id="phone" type="tel" required value={form.phone} onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all ${fieldErrors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {fieldErrors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                <input id="password" type="password" required minLength={8} value={form.password} onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all ${fieldErrors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {fieldErrors.password && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-bold text-gray-700 mb-1.5">Konfirmasi Password <span className="text-red-500">*</span></label>
                <input id="password_confirmation" type="password" required value={form.password_confirmation} onChange={(e) => updateField('password_confirmation', e.target.value)}
                  placeholder="Ulangi password"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all ${fieldErrors.password_confirmation ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {fieldErrors.password_confirmation && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.password_confirmation}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#F59E0B] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#0D2B5E] transition-all duration-300 shadow-lg shadow-[#F59E0B]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mendaftarkan...
                  </>
                ) : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-[#F59E0B] font-bold hover:underline">Masuk</Link>
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Dengan mendaftar, Anda menyetujui{' '}
                <Link href="/syarat-ketentuan" className="text-[#F59E0B] hover:underline">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="/kebijakan-privasi" className="text-[#F59E0B] hover:underline">Kebijakan Privasi</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
