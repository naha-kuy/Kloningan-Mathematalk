'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Email atau password salah');
        setLoading(false);
        return;
      }
      localStorage.setItem('mathematalk_token', data.data.token);
      router.push('/ortu/dashboard');
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/images/logo_light.png" alt="Mathematalk" className="h-10 w-auto mx-auto mb-6 brightness-0 invert" />
          </div>
          <div className="bg-cream rounded-3xl shadow-2xl p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-navy text-center">MATHEMATALK</h1>
            <p className="text-navy/60 text-sm text-center mt-1 mb-8">Selamat datang kembali!</p>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm mb-6 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">Email Address</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-navy mb-1.5">Password</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base disabled:opacity-50">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : 'Masuk ke Akun'}
              </button>
            </form>

            <div className="text-center mt-5">
              <Link href="/forgot-password" className="text-sm text-navy/60 hover:text-gold transition-colors">Lupa Password?</Link>
            </div>

            <p className="text-center text-sm text-navy/60 mt-6">
              Belum punya akun?{' '}
              <Link href="/register" className="text-gold font-bold hover:underline">Daftar Sekarang</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
