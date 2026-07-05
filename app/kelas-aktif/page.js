'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const classTypes = ['Semua Tipe', 'Olimpiade', 'Matematika Dasar', 'Program TKA'];
const jenjangOptions = ['Semua Jenjang', 'SD', 'SMP', 'SMA'];

export default function KelasAktifPage() {
  const [tipe, setTipe] = useState('Semua Tipe');
  const [jenjang, setJenjang] = useState('Semua Jenjang');
  const [search, setSearch] = useState('');

  const hasil = [];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Kelas <span className="text-gold">Aktif</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Temukan kelas yang sedang berjalan dan tingkatkan kemampuan matematika anak Anda bersama tutor terbaik.
            </p>
            <Link href="/" className="inline-block mt-4 text-white/50 hover:text-gold text-sm font-bold transition-colors">
              Kembali
            </Link>
          </div>
        </section>

        {/* FILTERS */}
        <section className="py-6 bg-cream border-b border-navy/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kelas..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-navy/20 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <select value={tipe} onChange={(e) => setTipe(e.target.value)}
                className="bg-white border border-navy/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-gold">
                {classTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
              <select value={jenjang} onChange={(e) => setJenjang(e.target.value)}
                className="bg-white border border-navy/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-gold">
                {jenjangOptions.map((j) => (<option key={j} value={j}>{j}</option>))}
              </select>
              <button onClick={() => { setTipe('Semua Tipe'); setJenjang('Semua Jenjang'); setSearch(''); }}
                className="text-sm text-navy/50 hover:text-gold font-bold transition-colors">
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* NO RESULTS */}
        <section className="py-16 md:py-24 bg-cream min-h-[400px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">📅 Kelas Aktif</h2>
            </div>
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-navy mb-2">Kelas Tidak Ditemukan</h3>
              <p className="text-navy/60 mb-4">Silakan coba kata kunci atau kategori yang berbeda.</p>
              <button onClick={() => { setTipe('Semua Tipe'); setJenjang('Semua Jenjang'); setSearch(''); }}
                className="btn-kidzy btn-kidzy-outline px-6 py-2.5 text-sm">
                Reset Pencarian
              </button>
            </div>
          </div>
        </section>

        {/* WAITING LIST */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
                ⏳ Kelas <span className="text-gold">Waiting List</span>
              </h2>
            </div>
            <div className="text-center py-12 bg-cream rounded-3xl border border-navy/5 shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-navy/60 mb-6 max-w-xl mx-auto text-sm md:text-base">
                Kelas berikut sedang dalam persiapan. Belum ada jadwal yang ditentukan. Anda dapat bergabung ke waiting list untuk mendapatkan prioritas ketika jadwal telah ditentukan.
              </p>
              <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer"
                className="btn-kidzy btn-kidzy-navy px-6 py-3 text-sm font-bold">
                Daftar Waiting List
              </a>
            </div>
          </div>
        </section>

        {/* HELP CTA */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-navy mb-2">Masih Bingung Memilih Kelas?</h3>
            <p className="text-navy/60 text-sm mb-6 max-w-xl mx-auto">
              Jangan ragu, tim admin kami siap membantu Anda mencarikan kelas dan tutor yang paling tepat sesuai dengan kebutuhan anak Anda.
            </p>
            <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer"
              className="btn-kidzy btn-kidzy-gold px-6 py-3 text-sm font-bold">
              Hubungi Admin via WA
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
