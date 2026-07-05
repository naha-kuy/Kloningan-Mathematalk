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
      <main className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-navy tracking-tight">MATHEMATALK</h1>
              <p className="text-gray-600 font-medium mt-2">Buat akun orang tua</p>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-2xl mb-6">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              {[ 
                { label: 'Nama Lengkap', key: 'name', type: 'text', placeholder: 'Nama Anda' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'nama@email.com' },
                { label: 'No. WhatsApp', key: 'phone', type: 'tel', placeholder: '0812xxxx' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Minimal 8 karakter' },
                { label: 'Konfirmasi Password', key: 'password_confirmation', type: 'password', placeholder: 'Ulangi password' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    required className="w-full bg-gray-50 text-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold font-medium placeholder-gray-400"
                    placeholder={f.placeholder} />
                </div>
              ))}
              <button type="submit" disabled={loading}
                className="w-full bg-gold text-white py-4 rounded-2xl font-bold text-lg hover:bg-navy transition shadow-xl shadow-gold/20 disabled:opacity-50">
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
              </button>
            </form>
            <div className="mt-6 text-center text-gray-600 text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-gold font-bold hover:underline">Masuk</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
