'use client';

import { useState, useEffect } from 'react';

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID');
}

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export default function OrtuDashboardPage() {
  const [data, setData] = useState(null);
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
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const { name, activeClasses, pendingInvoices, stats } = data || {};

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-navy">
        Selamat Datang{name ? `, ${name}` : ''}!
      </h1>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-3xl font-bold text-navy">{stats.activeClasses ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">Kelas Aktif</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-3xl font-bold text-gold">{stats.pendingInvoices ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">Tagihan Tertunda</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-3xl font-bold text-cyan">{stats.totalChildren ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">Total Anak</p>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-navy mb-4">Kelas Aktif</h2>
        {!activeClasses || activeClasses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">Belum ada kelas aktif</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeClasses.map((cls, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-navy">{cls.nama_kelas}</h3>
                <p className="text-sm text-gray-500 mt-1">{cls.jenjang_kelas} &middot; {cls.jenis_kelas}</p>
                <p className="text-sm text-gray-500">Pengajar: {cls.guru_nama || '-'}</p>
                {cls.tanggal_mulai && (
                  <p className="text-sm text-gray-500">Mulai: {formatDate(cls.tanggal_mulai)}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy mb-4">Tagihan Tertunda</h2>
        {!pendingInvoices || pendingInvoices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">Tidak ada tagihan tertunda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingInvoices.map((inv, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy">{inv.nomor_invoice}</p>
                  <p className="text-sm text-gray-500">{inv.kelas_nama || '-'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy">{formatIDR(inv.total_tagihan)}</p>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    {inv.status || 'menunggu'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
