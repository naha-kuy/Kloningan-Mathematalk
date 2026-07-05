'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

const invoiceStatusColor = {
  menunggu: 'bg-gold/10 text-gold',
  draft: 'bg-gray-100 text-gray-600',
  lunas: 'bg-green-50 text-green-600',
  overdue: 'bg-red-50 text-red-600',
  batal: 'bg-gray-50 text-gray-500',
};

const invoiceStatusLabel = {
  menunggu: 'Menunggu Pembayaran',
  draft: 'Draft',
  lunas: 'Lunas',
  overdue: 'Terlambat',
  batal: 'Dibatalkan',
};

export default function OrtuDashboardPage() {
  const [data, setData] = useState({ active_classes: [], pending_invoices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch('/api/ortu/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat data dashboard');
      const json = await res.json();
      setData(json.data || { active_classes: [], pending_invoices: [] });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-red-800 font-black text-lg mb-2">{error}</h3>
        <button
          onClick={fetchData}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const { active_classes, pending_invoices } = data;

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-navy leading-tight">Halo, Ayah & Bunda! 🎉</h2>
          <p className="text-gray-500 font-medium mt-1">Berikut adalah ringkasan aktivitas belajar buah hati Anda hari ini.</p>
        </div>
        <div className="hidden lg:flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-navy uppercase tracking-wider">Sistem Aktif</span>
        </div>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-navy/5 flex items-center space-x-5">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">📚</div>
          <div>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Kelas Aktif</p>
            <h3 className="text-2xl font-black text-navy mt-1">{active_classes?.length || 0}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-navy/5 flex items-center space-x-5">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">📋</div>
          <div>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Tagihan</p>
            <h3 className="text-2xl font-black text-navy mt-1">{pending_invoices?.length || 0}</h3>
          </div>
        </div>
        <div className="hidden lg:flex bg-navy p-6 rounded-[2rem] shadow-xl shadow-navy/20 items-center space-x-5">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">✓</div>
          <div>
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Status Akun</p>
            <h3 className="text-xl font-bold text-white mt-1">Terverifikasi</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Classes + Invoices Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: Active Classes */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-xl font-black text-navy flex items-center gap-2">
                <span className="w-2 h-6 bg-gold rounded-full" />
                Kelas Anak Saya
              </h3>
              <Link
                href="/ortu/kelas"
                className="text-sm font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
              >
                Lihat Semua <span className="text-lg">→</span>
              </Link>
            </div>

            {!active_classes || active_classes.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-100 p-12 rounded-[2.5rem] text-center group hover:border-navy/10 transition-all">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform">📘</div>
                <h4 className="text-lg font-bold text-navy mb-2">Belum ada kelas aktif</h4>
                <p className="text-gray-600 font-medium max-w-xs mx-auto mb-8">Daftarkan anak Anda ke kelas pilihan untuk memulai perjalanan belajar seru bersama kami.</p>
                <Link
                  href="/kelas"
                  className="inline-flex items-center px-8 py-3 bg-navy text-white font-bold rounded-2xl shadow-lg shadow-navy/20 hover:-translate-y-1 transition-all"
                >
                  Eksplor Kelas Sekarang
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {active_classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center text-xl group-hover:bg-navy group-hover:text-white transition-colors">📖</div>
                      <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Berjalan</span>
                    </div>
                    <h4 className="font-black text-navy text-lg leading-tight mb-2">{cls.nama_kelas}</h4>
                    <p className="text-sm text-gray-500">{cls.jenjang_kelas}</p>

                    <div className="flex items-center gap-2 mt-4 pb-6 border-b border-gray-50">
                      <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center text-[10px]">👨‍🏫</div>
                      <p className="text-sm font-bold text-gray-500">{cls.guru_nama}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>📅</span>
                        <span>{formatDate(cls.tanggal_mulai)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>👥</span>
                        <span>{(cls.current_students || 0)}/{(cls.kapasitas_max || 0)}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Link
                        href={`/ortu/kelas/${cls.id}`}
                        className="text-navy font-black text-sm hover:text-gold transition-colors"
                      >
                        Lihat Detail
                      </Link>
                      {(cls.payment_status === 'menunggu' || cls.payment_status === 'overdue') && cls.invoice_id && (
                        <Link
                          href={`/ortu/invoices/${cls.invoice_id}`}
                          className="text-xs font-bold text-gold hover:text-gold/80 transition-colors"
                        >
                          Bayar Sekarang →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar: Pending Invoices */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-xl font-black text-navy flex items-center gap-2">
                <span className="w-2 h-6 bg-gold rounded-full" />
                Tagihan Terbaru
              </h3>
              <Link
                href="/ortu/invoices"
                className="text-sm font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
              >
                Lihat Semua <span className="text-lg">→</span>
              </Link>
            </div>

            {!pending_invoices || pending_invoices.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-100 p-8 rounded-[2.5rem] text-center">
                <div className="text-3xl mb-3">✅</div>
                <p className="text-sm text-gray-500 font-medium">Tidak ada tagihan tertunda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending_invoices.slice(0, 5).map((inv) => (
                  <Link
                    key={inv.id}
                    href={`/ortu/invoices/${inv.id}`}
                    className="block bg-white p-5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-navy leading-tight">{inv.nomor_invoice}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{inv.nama_kelas}</p>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${invoiceStatusColor[inv.status] || 'bg-gray-100 text-gray-600'}`}>
                        {invoiceStatusLabel[inv.status] || inv.status}
                      </span>
                    </div>
                    <p className="text-lg font-black text-navy">{formatIDR(inv.total_tagihan)}</p>
                    {inv.jatuh_tempo && (
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
                        Jatuh Tempo: {formatDate(inv.jatuh_tempo)}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
