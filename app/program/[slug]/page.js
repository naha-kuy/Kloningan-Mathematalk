'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const [kelas, setKelas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`/api/public/kelas/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('Kelas tidak ditemukan');
        return r.json();
      })
      .then((data) => setKelas(data.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleDaftar = () => {
    const token = typeof window !== 'undefined' && localStorage.getItem('mathematalk_token');
    if (token) {
      window.location.href = '/ortu/kelas';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-navy/10 rounded w-3/4" />
              <div className="h-6 bg-navy/10 rounded w-1/2" />
              <div className="h-4 bg-navy/10 rounded w-full" />
              <div className="h-4 bg-navy/10 rounded w-5/6" />
              <div className="h-4 bg-navy/10 rounded w-2/3" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-20 bg-navy/10 rounded" />
                <div className="h-20 bg-navy/10 rounded" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <svg className="w-20 h-20 text-navy/20 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <h2 className="text-2xl font-bold text-navy mb-2">Kelas Tidak Ditemukan</h2>
              <p className="text-navy/60 mb-6">Program yang Anda cari tidak tersedia atau telah dihapus.</p>
              <Link href="/program" className="btn-kidzy btn-kidzy-gold px-6 py-3">Lihat Program Lain</Link>
            </div>
          ) : kelas ? (
            <>
              <div className="flex items-center gap-2 text-sm text-navy/50 mb-4">
                <Link href="/" className="hover:text-gold transition-colors">Beranda</Link>
                <span>/</span>
                <Link href="/program" className="hover:text-gold transition-colors">Program</Link>
                <span>/</span>
                <span className="text-navy/70">{kelas.nama_kelas}</span>
              </div>

              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-2">{kelas.nama_kelas}</h1>
                {kelas.guru_nama && (
                  <p className="text-gold font-semibold mb-6">Tutor: {kelas.guru_nama}</p>
                )}

                <div className="prose prose-navy max-w-none text-navy/70 leading-relaxed mb-8">
                  <p>{kelas.deskripsi}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-cream rounded-2xl p-4 text-center">
                    <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">Harga</p>
                    <p className="text-xl md:text-2xl font-extrabold text-gold mt-1">{formatIDR(kelas.harga)}</p>
                  </div>
                  <div className="bg-cream rounded-2xl p-4 text-center">
                    <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">Kapasitas</p>
                    <p className="text-xl md:text-2xl font-extrabold text-navy mt-1">{kelas.current_students || 0} / {kelas.kapasitas_max}</p>
                  </div>
                  <div className="bg-cream rounded-2xl p-4 text-center">
                    <p className="text-xs text-navy/50 uppercase font-semibold tracking-wide">Mulai</p>
                    <p className="text-lg md:text-xl font-extrabold text-cyan mt-1">{kelas.tanggal_mulai ? new Date(kelas.tanggal_mulai).toLocaleDateString('id-ID') : '-'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${kelas.status === 'aktif' ? 'bg-green-100 text-green-700' : kelas.status === 'penuh' ? 'bg-red-100 text-red-700' : 'bg-navy/10 text-navy/60'}`}>
                    {kelas.status === 'aktif' ? 'Tersedia' : kelas.status === 'penuh' ? 'Penuh' : kelas.status || '-'}
                  </span>
                </div>

                <button onClick={handleDaftar} className="w-full btn-kidzy btn-kidzy-gold px-8 py-4 text-lg shadow-lg shadow-gold/30">
                  Daftar Sekarang
                </button>
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
