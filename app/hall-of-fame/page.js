'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const years = ['Semua Tahun', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];
const levels = ['Semua Tingkat', 'Kabupaten/Kota', 'Provinsi', 'Nasional', 'Internasional'];
const perPageOptions = [10, 20, 50];

const medalColors = {
  Emas: { bg: 'bg-amber-100', text: 'text-amber-600', icon: 'text-amber-500' },
  Perak: { bg: 'bg-slate-100', text: 'text-slate-500', icon: 'text-slate-400' },
  Perunggu: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-500' },
};

export default function HallOfFamePage() {
  const [year, setYear] = useState('Semua Tahun');
  const [level, setLevel] = useState('Semua Tingkat');
  const [perPage, setPerPage] = useState(10);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Prestasi <span className="text-gold">Siswa</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Apresiasi untuk putra-putri terbaik Mathematalk yang telah meraih prestasi membanggakan di berbagai ajang olimpiade.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="py-8 bg-cream border-b border-navy/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <select value={year} onChange={(e) => setYear(e.target.value)}
                className="bg-white border border-navy/20 rounded-xl px-4 py-2 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-gold">
                {years.map((y) => (<option key={y} value={y}>{y}</option>))}
              </select>
              <select value={level} onChange={(e) => setLevel(e.target.value)}
                className="bg-white border border-navy/20 rounded-xl px-4 py-2 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-gold">
                {levels.map((l) => (<option key={l} value={l}>{l}</option>))}
              </select>
              <div className="flex items-center gap-2 text-sm text-navy/60 ml-auto">
                <span>Tampilkan</span>
                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}
                  className="bg-white border border-navy/20 rounded-xl px-3 py-2 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-gold">
                  {perPageOptions.map((o) => (<option key={o} value={o}>{o} per halaman</option>))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* SOROTAN PRESTASI */}
        <section className="py-12 bg-white border-b border-navy/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-navy mb-6">🌟 Sorotan Prestasi</h2>
            <div className="text-center py-10 bg-cream rounded-2xl border border-navy/5">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <p className="text-navy/40 text-sm">Belum ada sorotan prestasi yang ditampilkan.</p>
            </div>
          </div>
        </section>

        {/* NO DATA */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-navy mb-6">📜 Daftar Prestasi</h2>
            <div className="text-center py-16 md:py-20 bg-white rounded-3xl shadow-lg border border-navy/5">
              <div className="w-20 h-20 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-navy mb-2">Belum Ada Data Prestasi</h3>
              <p className="text-navy/60">Jadilah yang pertama untuk mengukir sejarah prestasi di sini!</p>
            </div>
          </div>
        </section>

        {/* SOROTAN & DAFTAR PRESTASI PLACEHOLDER */}
        <section className="py-8 md:py-12 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-navy/40 text-sm">
              Menampilkan - dari prestasi
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
