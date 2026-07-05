'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Belajar Interaktif', desc: 'Suasana belajar kelompok yang interaktif dan menyenangkan dengan metode diskusi aktif.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Harga Terjangkau', desc: 'Biaya lebih hemat dibanding private dengan tetap mendapatkan kualitas bimbingan terbaik.' },
  { icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122', title: 'Peer Learning', desc: 'Belajar bersama teman sebaya untuk meningkatkan motivasi dan pemahaman melalui kolaborasi.' },
];

const classList = [
  { name: 'Kelas Semi Private SD', grade: 'Kelas 4 - 6 SD', schedule: '2x seminggu | 60 menit/sesi', students: '3-5 siswa', price: 'Rp 350.000/bulan' },
  { name: 'Kelas Semi Private SMP', grade: 'Kelas 7 - 9 SMP', schedule: '2x seminggu | 90 menit/sesi', students: '3-5 siswa', price: 'Rp 400.000/bulan' },
  { name: 'Kelas Semi Private SMA', grade: 'Kelas 10 - 12 SMA', schedule: '2x seminggu | 90 menit/sesi', students: '3-5 siswa', price: 'Rp 450.000/bulan' },
];

export default function KelasAktifPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Kelas <span className="text-gold">Semi Private</span> Mathematalk
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">Belajar dalam kelompok kecil (3-5 siswa) dengan kualitas bimbingan terbaik</p>
          </div>
        </section>

        {/* KEUNGGULAN */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
                Keunggulan <span className="text-gold">Kelas Semi Private</span>
              </h2>
              <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Kombinasi sempurna antara perhatian personal dan pembelajaran kolektif</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{f.title}</h3>
                  <p className="text-sm text-navy/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DAFTAR KELAS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
                Pilih <span className="text-gold">Kelas</span> Sesuai Jenjang
              </h2>
              <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Tersedia untuk SD, SMP, dan SMA</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {classList.map((cls, i) => (
                <div key={i} className="bg-cream rounded-3xl p-6 md:p-8 shadow-lg border border-navy/5 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-navy mb-1">{cls.name}</h3>
                  <p className="text-gold font-semibold text-sm mb-3">{cls.grade}</p>
                  <div className="space-y-2 text-sm text-navy/70">
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {cls.schedule}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {cls.students}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {cls.price}
                    </p>
                  </div>
                  <Link href="/ortu/register" className="mt-6 w-full btn-kidzy btn-kidzy-gold px-4 py-2.5 text-sm flex items-center justify-center gap-2">
                    Daftar Sekarang
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-gold/10 via-cream to-cyan/10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
              Ingin Belajar dalam <span className="text-gold">Kelompok Kecil</span>?
            </h2>
            <p className="mt-4 text-navy/60 text-lg">Daftar sekarang dan dapatkan diskon untuk pendaftaran awal!</p>
            <Link href="/ortu/register" className="inline-block mt-8 btn-kidzy btn-kidzy-gold px-8 py-3.5 text-lg font-bold">
              Daftar Sekarang
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
