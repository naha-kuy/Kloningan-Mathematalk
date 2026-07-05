'use client';

import { useState, useEffect } from 'react';

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID');
}

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export default function OrtuKelasPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch('/api/ortu/kelas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat data kelas');
      const json = await res.json();
      setClasses(Array.isArray(json) ? json : json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchClasses}
          className="mt-4 px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Kelas Saya</h1>

      {classes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Belum ada kelas yang terdaftar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {classes.map((cls, i) => (
            <div key={cls.id ?? i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-semibold text-navy text-lg">{cls.nama_kelas}</h2>
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    cls.status_pembayaran === 'lunas'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {cls.status_pembayaran === 'lunas' ? 'Lunas' : 'Menunggu'}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium text-gray-700">Jenjang:</span> {cls.jenjang_kelas || '-'}</p>
                <p><span className="font-medium text-gray-700">Jenis:</span> {cls.jenis_kelas || '-'}</p>
                <p><span className="font-medium text-gray-700">Pengajar:</span> {cls.guru_nama || '-'}</p>
                <p><span className="font-medium text-gray-700">Mulai:</span> {formatDate(cls.tanggal_mulai)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
