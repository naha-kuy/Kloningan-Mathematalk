'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo_light.png" alt="Mathematalk" className="h-8 md:h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-navy font-semibold hover:text-gold transition-colors">Beranda</Link>
            <Link href="/program" className="text-navy font-semibold hover:text-gold transition-colors">Program</Link>
            <Link href="/about-us" className="text-navy font-semibold hover:text-gold transition-colors">Tentang Kami</Link>
            <Link href="/faq" className="text-navy font-semibold hover:text-gold transition-colors">FAQ</Link>
            <Link href="/kontak" className="text-navy font-semibold hover:text-gold transition-colors">Hubungi Kami</Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="btn-kidzy btn-kidzy-outline px-5 py-2 text-sm">Masuk</Link>
            <Link href="/ortu/register" className="btn-kidzy btn-kidzy-gold px-5 py-2 text-sm">Daftar</Link>
          </div>
          <button className="md:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-navy/10">
            <nav className="flex flex-col gap-2 pt-3">
              <Link href="/" className="px-3 py-2 text-navy font-semibold hover:bg-navy/5 rounded-lg" onClick={() => setMenuOpen(false)}>Beranda</Link>
              <Link href="/program" className="px-3 py-2 text-navy font-semibold hover:bg-navy/5 rounded-lg" onClick={() => setMenuOpen(false)}>Program</Link>
              <Link href="/about-us" className="px-3 py-2 text-navy font-semibold hover:bg-navy/5 rounded-lg" onClick={() => setMenuOpen(false)}>Tentang Kami</Link>
              <Link href="/faq" className="px-3 py-2 text-navy font-semibold hover:bg-navy/5 rounded-lg" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link href="/kontak" className="px-3 py-2 text-navy font-semibold hover:bg-navy/5 rounded-lg" onClick={() => setMenuOpen(false)}>Hubungi Kami</Link>
              <div className="flex gap-3 pt-2 px-3">
                <Link href="/login" className="btn-kidzy btn-kidzy-outline px-5 py-2 text-sm flex-1 text-center" onClick={() => setMenuOpen(false)}>Masuk</Link>
                <Link href="/ortu/register" className="btn-kidzy btn-kidzy-gold px-5 py-2 text-sm flex-1 text-center" onClick={() => setMenuOpen(false)}>Daftar</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
