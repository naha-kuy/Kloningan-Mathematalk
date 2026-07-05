'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StorePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert('Pesanan akan segera dikonfirmasi oleh tim kami.');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Materi Belajar & <span className="text-gold">Buku</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Dapatkan modul, buku, dan paket soal pilihan untuk menunjang persiapan olimpiade anak Anda.
            </p>
          </div>
        </section>

        {/* NO PRODUCTS */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-navy mb-2">Belum Ada Produk Tersedia</h2>
              <p className="text-navy/60">Nantikan materi belajar dan buku terbaik dari kami segera!</p>
            </div>
          </div>
        </section>

        {/* ORDER FORM */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-navy text-center mb-8">Form Pemesanan</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">No. WhatsApp</label>
                <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Email (Opsional)</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Alamat Lengkap Pengiriman</label>
                <textarea required rows="3" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base disabled:opacity-50">
                {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
