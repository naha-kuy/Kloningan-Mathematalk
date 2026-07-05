'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-navy text-center">LUPA PASSWORD</h1>
            <p className="text-navy/60 text-sm text-center mt-2 mb-8">Masukkan email untuk reset password</p>

            {sent && (
              <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl px-4 py-3 text-sm mb-6">
                Link reset password telah dikirim ke email Anda. Silakan cek inbox (dan folder spam).
              </div>
            )}

            {!sent && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">Email Address</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base disabled:opacity-50">
                  {loading ? 'Memproses...' : 'Kirim Link Reset'}
                </button>
              </form>
            )}

            <p className="text-center text-sm text-navy/60 mt-6">
              <Link href="/login" className="text-gold font-bold hover:underline">Kembali ke Login</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
