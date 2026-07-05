'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-cream rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <img src="/images/logo_light.png" alt="Mathematalk" className="h-8 md:h-10 w-auto mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-navy">Lupa Password</h1>
            <p className="text-navy/60 text-sm mt-1">Masukkan email Anda untuk mereset password</p>
          </div>

          {submitted ? (
            <div className="text-center py-6">
              <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-bold text-navy mb-2">Fitur sedang dikembangkan</p>
              <p className="text-navy/60 text-sm">Fitur reset password akan segera tersedia. Silakan hubungi kami melalui WhatsApp atau email untuk bantuan lebih lanjut.</p>
              <Link href="/login" className="mt-6 inline-block text-gold font-bold hover:underline text-sm">Kembali ke Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                />
              </div>
              <button type="submit" className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base">
                Kirim Reset Password
              </button>
            </form>
          )}

          <p className="text-center text-sm text-navy/60 mt-6">
            <Link href="/login" className="text-gold font-bold hover:underline">Kembali ke Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
