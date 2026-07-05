'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
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
      setClasses(json.data || []);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat data kelas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-red-800 font-black text-lg mb-2">{error}</h3>
        <button
          onClick={fetchClasses}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy leading-tight">Kelas Anak</h2>
          <p className="text-gray-500 font-medium mt-1">Semua kelas yang sedang diikuti oleh buah hati Anda.</p>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-100 p-12 rounded-[2.5rem] text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📘</div>
          <h4 className="text-lg font-bold text-navy mb-2">Belum ada kelas terdaftar</h4>
          <p className="text-gray-600 font-medium max-w-xs mx-auto mb-8">Daftarkan anak Anda ke kelas pilihan untuk memulai perjalanan belajar.</p>
          <Link
            href="/kelas"
            className="inline-flex items-center px-8 py-3 bg-navy text-white font-bold rounded-2xl shadow-lg shadow-navy/20 hover:-translate-y-1 transition-all"
          >
            Eksplor Kelas Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center text-xl group-hover:bg-navy group-hover:text-white transition-colors">📖</div>
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    cls.payment_status === 'lunas'
                      ? 'bg-green-50 text-green-600'
                      : cls.payment_status === 'menunggu'
                      ? 'bg-gold/10 text-gold'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cls.payment_status === 'lunas' ? 'Lunas' : cls.payment_status === 'menunggu' ? 'Menunggu' : cls.payment_status || 'Aktif'}
                </span>
              </div>
              <h4 className="font-black text-navy text-lg leading-tight mb-2">{cls.nama_kelas}</h4>
              <p className="text-sm text-gray-500">{cls.jenjang_kelas} &middot; {cls.jenis_kelas}</p>

              <div className="flex items-center gap-2 mt-4 pb-6 border-b border-gray-50">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center text-[10px]">👨‍🏫</div>
                <p className="text-sm font-bold text-gray-500">{cls.guru_nama || '-'}</p>
              </div>

              {cls.tanggal_mulai && (
                <div className="mt-4 text-sm text-gray-500">
                  <span>📅 Mulai: {formatDate(cls.tanggal_mulai)}</span>
                </div>
              )}

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
    </div>
  );
}
