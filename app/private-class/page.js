'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Jadwal Fleksibel', desc: 'Atur jadwal belajar sesuai kebutuhan putra-putri Anda, tanpa terikat jadwal tetap.' },
  { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title: '1-on-1 dengan Tutor Expert', desc: 'Belajar langsung dengan tutor berpengalaman yang berfokus penuh pada perkembangan siswa.' },
  { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: 'Perhatian Penuh & Personal', desc: 'Materi dan metode disesuaikan dengan gaya belajar dan kebutuhan spesifik setiap siswa.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Pantau Perkembangan', desc: 'Laporan perkembangan berkala dan akses ke dashboard orang tua untuk memantau progres.' },
];

export default function PrivateClassPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Kelas <span className="text-gold">Private</span> Mathematalk
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">Bimbingan 1-on-1 eksklusif bersama tutor ahli untuk hasil belajar maksimal</p>
            <Link href="/ortu/register" className="inline-block mt-8 btn-kidzy btn-kidzy-gold px-8 py-3.5 text-lg font-bold">
              Daftar Sekarang
            </Link>
          </div>
        </section>

        {/* MENGAPA PRIVATE? */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
                Kenapa Pilih <span className="text-gold">Kelas Private</span>?
              </h2>
              <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Fokus penuh pada perkembangan akademik putra-putri Anda</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
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

        {/* BAGAIMANA CARA KERJANYA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
                Bagaimana <span className="text-gold">Cara Kerjanya</span>?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: '1', title: 'Daftar & Konsultasi', desc: 'Daftarkan putra-putri Anda dan konsultasikan kebutuhan belajar dengan tim kami.' },
                { num: '2', title: 'Pendampingan Tutor', desc: 'Tutor ahli akan mendampingi belajar 1-on-1 secara offline atau online.' },
                { num: '3', title: 'Pantau Perkembangan', desc: 'Pantau progres belajar melalui laporan berkala dan dashboard khusus.' },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-navy/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-gold/10 via-cream to-cyan/10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
              Siap Memulai Perjalanan <span className="text-gold">Prestasi</span>?
            </h2>
            <p className="mt-4 text-navy/60 text-lg max-w-2xl mx-auto">Daftarkan putra-putri Anda sekarang dan dapatkan sesi konsultasi gratis!</p>
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
