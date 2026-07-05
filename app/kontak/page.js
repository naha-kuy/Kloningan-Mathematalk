'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KontakPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/public/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Gagal mengirim pesan');
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'info@mathematalk.com', href: 'mailto:info@mathematalk.com' },
    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Telepon', value: '+62 896-3132-2828', href: 'https://wa.me/6289631322828' },
    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Alamat', value: 'Jl. Raya Malang No. 123, Malang, Jawa Timur', href: null },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Hubungi <span className="text-gold">Kami</span>
            </h1>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Kami siap membantu Anda</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* FORM */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
                <h2 className="text-2xl font-extrabold text-navy mb-6">Kirim Pesan</h2>
                {sent ? (
                  <div className="text-center py-10">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-bold text-navy mb-2">Pesan Terkirim!</p>
                    <p className="text-navy/60 mb-6">Tim kami akan menghubungi Anda segera.</p>
                    <button onClick={() => setSent(false)} className="btn-kidzy btn-kidzy-gold px-6 py-2 text-sm">Kirim Pesan Lain</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        <span>{error}</span>
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Nama Anda" className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="email@anda.com" className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Subjek</label>
                      <input type="text" name="subject" required value={form.subject} onChange={handleChange} placeholder="Subjek pesan" className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Pesan</label>
                      <textarea name="message" required value={form.message} onChange={handleChange} rows="5" placeholder="Tulis pesan Anda..." className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none" />
                    </div>
                    <button type="submit" disabled={sending} className="w-full btn-kidzy btn-kidzy-gold px-6 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                      {sending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Mengirim...
                        </span>
                      ) : 'Kirim Pesan'}
                    </button>
                  </form>
                )}
              </div>

              {/* INFO & MAP */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
                  <h2 className="text-2xl font-extrabold text-navy mb-6">Informasi Kontak</h2>
                  <div className="space-y-5">
                    {contactInfo.map((info, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d={info.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-navy font-semibold hover:text-gold transition-colors">{info.value}</a>
                          ) : (
                            <p className="text-navy font-semibold">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://wa.me/6289631322828"
                    target="_blank" rel="noopener noreferrer"
                    className="mt-6 w-full btn-kidzy btn-kidzy-gold px-6 py-3 text-base flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Hubungi via WhatsApp
                  </a>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-xl h-64 md:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.078994259481!2d112.6308!3d-7.9666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTcnNTkuOCJTIDExMsKwMzcnNTAuOSJF!5e0!3m2!1sid!2sid!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Mathematalk Malang"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
