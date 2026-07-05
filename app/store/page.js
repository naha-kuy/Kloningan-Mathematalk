'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const products = [
  { name: 'Buku Olimpiade Matematika SD', price: 'Rp 75.000', category: 'Buku' },
  { name: 'Buku Olimpiade Matematika SMP', price: 'Rp 85.000', category: 'Buku' },
  { name: 'Buku Olimpiade Matematika SMA', price: 'Rp 95.000', category: 'Buku' },
  { name: 'Merchandise T-Shirt Mathematalk', price: 'Rp 120.000', category: 'Merchandise' },
  { name: 'Totebag Mathematalk', price: 'Rp 65.000', category: 'Merchandise' },
  { name: 'Pin Matematika', price: 'Rp 15.000', category: 'Aksesoris' },
  { name: 'Stiker Pack Mathematalk', price: 'Rp 25.000', category: 'Aksesoris' },
  { name: 'Mug Mathematalk', price: 'Rp 55.000', category: 'Merchandise' },
];

export default function StorePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              <span className="text-gold">Store</span> Mathematalk
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">Temukan buku, merchandise, dan perlengkapan belajar eksklusif Mathematalk</p>
          </div>
        </section>

        {/* PRODUK */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="aspect-square bg-gradient-to-br from-gold/20 via-white to-cyan/10 flex items-center justify-center p-8">
                    <svg className="w-20 h-20 text-navy/20 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <div className="p-4 md:p-5">
                    <span className="text-xs font-semibold text-cyan uppercase tracking-wide">{p.category}</span>
                    <h3 className="text-base font-bold text-navy mt-1">{p.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gold font-extrabold text-lg">{p.price}</span>
                      <button className="text-sm font-semibold text-navy hover:text-gold transition-colors flex items-center gap-1">
                        Beli
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Ingin Berbelanja <span className="text-gold">Lebih Banyak</span>?
            </h2>
            <p className="mt-3 text-navy/60">Hubungi kami untuk pemesanan dalam jumlah banyak atau ketersediaan stok.</p>
            <Link href="/contact" className="inline-block mt-6 btn-kidzy btn-kidzy-gold px-6 py-3 text-base font-bold">
              Hubungi Kami
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
