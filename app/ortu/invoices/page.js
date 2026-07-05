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

const statusStyles = {
  menunggu: 'bg-gold/10 text-gold',
  draft: 'bg-gray-100 text-gray-600',
  lunas: 'bg-green-50 text-green-600',
  overdue: 'bg-red-50 text-red-600',
  terkirim: 'bg-blue-50 text-blue-600',
  batal: 'bg-gray-50 text-gray-500',
};

const statusLabels = {
  menunggu: 'Menunggu Pembayaran',
  draft: 'Draft',
  lunas: 'Lunas',
  overdue: 'Terlambat',
  terkirim: 'Terkirim',
  batal: 'Dibatalkan',
};

export default function OrtuInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch('/api/ortu/invoices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat data tagihan');
      const json = await res.json();
      setInvoices(json.data?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleBayar = async (id) => {
    setPayingId(id);
    try {
      const token = localStorage.getItem('mathematalk_token');
      const res = await fetch(`/api/ortu/invoices/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Gagal memproses pembayaran');
      showToast('Pembayaran berhasil diproses');
      await fetchInvoices();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setPayingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat tagihan...</p>
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
          onClick={fetchInvoices}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl shadow-lg text-sm font-bold text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy leading-tight">Tagihan</h2>
          <p className="text-gray-500 font-medium mt-1">Riwayat tagihan dan pembayaran kelas anak Anda.</p>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-100 p-12 rounded-[2.5rem] text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✅</div>
          <h4 className="text-lg font-bold text-navy mb-2">Belum ada tagihan</h4>
          <p className="text-gray-600 font-medium max-w-xs mx-auto">Tidak ada tagihan yang perlu dibayarkan saat ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-black text-navy text-lg">{inv.nomor_invoice}</p>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${statusStyles[inv.status] || 'bg-gray-100 text-gray-600'}`}>
                      {statusLabels[inv.status] || inv.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{inv.nama_kelas || '-'}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
                    <span>📅 Buat: {formatDate(inv.created_at)}</span>
                    <span>⏰ Jatuh Tempo: {formatDate(inv.jatuh_tempo)}</span>
                    {inv.paid_at && <span>✅ Lunas: {formatDate(inv.paid_at)}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-black text-navy text-xl">{formatIDR(inv.total_tagihan)}</span>
                  {(inv.status === 'menunggu' || inv.status === 'overdue' || inv.status === 'terkirim') && (
                    <button
                      onClick={() => handleBayar(inv.id)}
                      disabled={payingId === inv.id}
                      className="px-6 py-3 bg-gold text-white font-bold rounded-2xl shadow-lg shadow-gold/20 hover:-translate-y-1 disabled:opacity-50 transition-all text-sm"
                    >
                      {payingId === inv.id ? 'Memproses...' : 'Bayar Sekarang'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
