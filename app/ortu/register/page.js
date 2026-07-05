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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    if (form.password !== form.password_confirmation) {
      setError('Konfirmasi password tidak cocok');
      setLoading(false); return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/login');
      } else {
        setError(data.message || 'Pendaftaran gagal');
      }
    } catch { setError('Terjadi kesalahan'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-cream rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <img src="/images/logo_light.png" alt="Mathematalk" className="h-8 md:h-10 w-auto mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-navy">Daftar Akun Orang Tua</h1>
            <p className="text-navy/60 text-sm mt-1">Bergabung dengan Mathematalk</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
              <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">Email</label>
              <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-1.5">No. WhatsApp</label>
              <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0812xxxx"
                className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-navy mb-1.5">Password</label>
              <input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-semibold text-navy mb-1.5">Konfirmasi Password</label>
              <input id="password_confirmation" type="password" required value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                placeholder="Ulangi password"
                className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </span>
              ) : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-navy/60 mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-gold font-bold hover:underline">Masuk</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
