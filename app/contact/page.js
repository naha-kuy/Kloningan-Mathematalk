'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert('Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-4">
              Sapa Kami
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Mari <span className="text-gold">Berbincang</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Punya pertanyaan seputar program kelas kami? Atau ingin berkonsultasi? Tim admin kami siap membantu Anda.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* LEFT - CONTACT CARDS */}
              <div className="space-y-6">
                <a href="https://wa.me/6289631312828" target="_blank" rel="noopener noreferrer"
                  className="block bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">WhatsApp Admin</p>
                      <p className="text-lg font-bold text-navy">+62 896-3131-2828</p>
                    </div>
                    <span className="text-gold font-bold text-sm group-hover:translate-x-1 transition-transform">Chat Sekarang</span>
                  </div>
                </a>

                <a href="mailto:bimbel.mathematalk@gmail.com"
                  className="block bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">Email</p>
                      <p className="text-lg font-bold text-navy">bimbel.mathematalk@gmail.com</p>
                    </div>
                    <span className="text-gold font-bold text-sm group-hover:translate-x-1 transition-transform">Kirim Pesan</span>
                  </div>
                </a>

                <a href="https://instagram.com/mathematalk" target="_blank" rel="noopener noreferrer"
                  className="block bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">Instagram</p>
                      <p className="text-lg font-bold text-navy">@mathematalk</p>
                    </div>
                    <span className="text-gold font-bold text-sm group-hover:translate-x-1 transition-transform">Follow Kami</span>
                  </div>
                </a>
              </div>

              {/* RIGHT - FORM */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
                <h2 className="text-2xl font-extrabold text-navy mb-6">Kirim Pesan Langsung</h2>
                <p className="text-navy/60 text-sm mb-6">Isi form di bawah ini dan tim kami akan segera menghubungi Anda kembali.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">No. WhatsApp</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+62 xxx"
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Pesan Anda</label>
                    <textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tulis pesan Anda..."
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base disabled:opacity-50">
                    {loading ? 'Memproses...' : 'Kirim Pesan Sekarang'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
