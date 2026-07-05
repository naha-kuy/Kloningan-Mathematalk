'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (form.password !== form.password_confirmation) {
      setError('Konfirmasi password tidak cocok');
      setLoading(false);
      return;
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
    } catch {
      setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold px-4 py-2 rounded-full">
              Daftar Orang Tua
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-navy tracking-tight">MATHEMATALK</h1>
                <p className="text-gray-600 font-medium mt-2">Daftar Akun Orang Tua</p>
                <p className="text-gray-400 text-sm mt-1">Buat akun untuk memantau perkembangan dan pembelajaran anak-anak Anda</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-2xl mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Nama Lengkap *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required className="w-full bg-gray-50 text-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold font-medium placeholder-gray-400"
                    placeholder="Nama Anda" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required className="w-full bg-gray-50 text-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold font-medium placeholder-gray-400"
                    placeholder="nama@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Nomor WhatsApp *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required className="w-full bg-gray-50 text-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold font-medium placeholder-gray-400"
                    placeholder="08xxxxxxxxxx" />
                  <p className="text-xs text-gray-400 mt-1">Nomor WhatsApp minimal 10 digit</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Password *</label>
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required className="w-full bg-gray-50 text-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold font-medium placeholder-gray-400"
                    placeholder="Minimal 8 karakter" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Konfirmasi Password *</label>
                  <input type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    required className="w-full bg-gray-50 text-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold font-medium placeholder-gray-400"
                    placeholder="Ulangi password" />
                  <div className="flex items-center gap-1 mt-1">
                    {form.password_confirmation && (
                      form.password === form.password_confirmation
                        ? <span className="text-xs text-green-600 font-bold">Password cocok</span>
                        : <span className="text-xs text-red-500 font-bold">Password tidak cocok</span>
                    )}
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gold text-white py-4 rounded-2xl font-bold text-lg hover:bg-navy transition shadow-xl shadow-gold/20 disabled:opacity-50">
                  {loading ? 'Memproses...' : 'Daftar Sekarang'}
                </button>
              </form>

              <div className="mt-6 text-center text-gray-600 text-sm">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-gold font-bold hover:underline">Masuk di sini</Link>
              </div>

              <div className="mt-4 text-center">
                <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-gold transition-colors">
                  Butuh bantuan? Hubungi Kami via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
