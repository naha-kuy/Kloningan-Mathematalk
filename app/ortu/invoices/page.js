'use client';

import { useState, useEffect } from 'react';

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID');
}

const statusStyles = {
  unpaid: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-600',
};

const statusLabels = {
  unpaid: 'Belum Dibayar',
  paid: 'Lunas',
  overdue: 'Jatuh Tempo',
  cancelled: 'Dibatalkan',
};

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

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
      setInvoices(Array.isArray(json) ? json : json.data || []);
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
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
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
          onClick={fetchInvoices}
          className="mt-4 px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <h1 className="text-2xl font-bold text-navy">Tagihan</h1>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Belum ada tagihan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv, i) => (
            <div
              key={inv.id ?? i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy">{inv.nomor_invoice}</p>
                <p className="text-sm text-gray-500 truncate">{inv.kelas_nama || inv.nama_kelas || '-'}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-400">
                  <span>Buat: {formatDate(inv.created_at)}</span>
                  <span>Jatuh Tempo: {formatDate(inv.jatuh_tempo)}</span>
                  {inv.paid_at && <span>Lunas: {formatDate(inv.paid_at)}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-bold text-navy">{formatIDR(inv.total_tagihan)}</span>
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    statusStyles[inv.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {statusLabels[inv.status] || inv.status}
                </span>
                {(inv.status === 'unpaid' || inv.status === 'overdue') && (
                  <button
                    onClick={() => handleBayar(inv.id)}
                    disabled={payingId === inv.id}
                    className="px-4 py-1.5 text-sm font-medium bg-gold text-white rounded-lg hover:bg-gold/90 disabled:opacity-50 transition-colors"
                  >
                    {payingId === inv.id ? 'Memproses...' : 'Bayar'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
