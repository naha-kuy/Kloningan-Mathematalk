'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenu, setUserMenu] = useState(false);
  const [kelasDropdown, setKelasDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('mathematalk_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ name: payload.name || 'User', id: payload.id, role: payload.role });
      } catch { setUser(null); }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mathematalk_token');
    setUser(null);
    setUserMenu(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group py-2">
              <img src="/images/logo_light.png" alt="Mathematalk Logo" className="h-10 sm:h-12 w-auto transform group-hover:scale-105 transition-transform drop-shadow-sm" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-600 hover:text-[#F59E0B] font-bold text-sm lg:text-base transition-colors">Beranda</Link>
            <Link href="/about-us" className="text-gray-600 hover:text-[#F59E0B] font-bold text-sm lg:text-base transition-colors">About Us</Link>

            {/* Kelas Aktif Dropdown */}
            <div className="relative flex h-full items-center"
              onMouseEnter={() => setKelasDropdown(true)}
              onMouseLeave={() => setKelasDropdown(false)}>
              <button className="text-gray-600 hover:text-[#F59E0B] font-bold text-sm lg:text-base transition-colors inline-flex items-center gap-1">
                Kelas Aktif
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {kelasDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-64 rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border-2 border-[#FFF9F2]">
                  <div className="py-2">
                    <Link href="/private-class" className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-[#F59E0B] hover:bg-[#FFF9F2] transition-colors">👤 Kelas Private</Link>
                    <Link href="/kelas-aktif" className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-[#F59E0B] hover:bg-[#FFF9F2] transition-colors">👥 Kelas Semi Private</Link>
                    <Link href="/#grup-besar" className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-[#F59E0B] hover:bg-[#FFF9F2] transition-colors">🏛️ Kelas Grup Besar</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/store" className="text-gray-600 hover:text-[#F59E0B] font-bold text-sm lg:text-base transition-colors">Store</Link>
            <Link href="/hall-of-fame" className="text-gray-600 hover:text-[#F59E0B] font-bold text-sm lg:text-base transition-colors">Hall of Fame</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#F59E0B] font-bold text-sm lg:text-base transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-3 bg-[#FFF9F2] px-3 py-1.5 rounded-2xl border-2 border-navy/10 hover:border-[#F59E0B] transition-colors group">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center font-black text-white shadow-sm group-hover:scale-105 transition-transform">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">Hello!</p>
                    <p className="text-sm font-black text-[#0D2B5E] leading-tight truncate max-w-[120px]">{user.name}</p>
                  </div>
                  <svg className="w-4 h-4 text-[#0D2B5E] group-hover:text-[#F59E0B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl py-3 z-50 border-2 border-[#FFF9F2] overflow-hidden"
                    onClick={() => setUserMenu(false)}>
                    <div className="px-6 py-4 border-b border-[#FFF9F2]">
                      <p className="text-sm font-black text-[#0D2B5E] truncate">{user.name}</p>
                    </div>
                    <div className="py-2">
                      <Link href="/ortu/dashboard" className="flex items-center gap-3 px-6 py-3 text-sm font-black text-gray-600 hover:text-[#F59E0B] hover:bg-[#FFF9F2] transition-colors">
                        <span className="text-xl">🚀</span> Masuk Dashboard
                      </Link>
                      <Link href="/ortu/invoices" className="flex items-center gap-3 px-6 py-3 text-sm font-black text-gray-600 hover:text-[#F59E0B] hover:bg-[#FFF9F2] transition-colors">
                        <span className="text-xl">💳</span> History Pembayaran
                      </Link>
                    </div>
                    <div className="px-3 pt-2">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-500 hover:bg-red-50 rounded-2xl transition-colors">
                        <span className="text-xl">👋</span> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-[#0D2B5E] font-black text-sm hover:text-[#F59E0B] transition-colors">Masuk</Link>
                <Link href="/register" className="bg-[#F59E0B] text-white px-6 lg:px-8 py-2.5 rounded-full font-black text-sm hover:bg-[#0D2B5E] transition-all duration-300 shadow-lg shadow-[#F59E0B]/20">
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#0D2B5E] hover:text-[#F59E0B] focus:outline-none bg-[#FFF9F2] p-2 rounded-xl transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path className={menuOpen ? 'hidden' : 'block'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                <path className={menuOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t-2 border-[#FFF9F2] px-4 pt-2 pb-6 space-y-2 shadow-xl rounded-b-3xl">
          <Link href="/" className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-[#FFF9F2] hover:text-[#F59E0B] rounded-xl" onClick={() => setMenuOpen(false)}>Beranda</Link>
          <Link href="/about-us" className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-[#FFF9F2] hover:text-[#F59E0B] rounded-xl" onClick={() => setMenuOpen(false)}>About Us</Link>
          <div className="px-4 py-2 space-y-2 bg-[#FFF9F2] rounded-xl">
            <div className="text-xs font-black text-[#0D2B5E] uppercase tracking-wider">Kelas Aktif</div>
            <Link href="/private-class" className="block pl-2 py-2 text-sm font-bold text-gray-600 hover:text-[#F59E0B]" onClick={() => setMenuOpen(false)}>👤 Kelas Private</Link>
            <Link href="/kelas-aktif" className="block pl-2 py-2 text-sm font-bold text-gray-600 hover:text-[#F59E0B]" onClick={() => setMenuOpen(false)}>👥 Kelas Semi Private</Link>
            <Link href="/#grup-besar" className="block pl-2 py-2 text-sm font-bold text-gray-600 hover:text-[#F59E0B]" onClick={() => setMenuOpen(false)}>🏛️ Kelas Grup Besar</Link>
          </div>
          <Link href="/store" className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-[#FFF9F2] hover:text-[#F59E0B] rounded-xl" onClick={() => setMenuOpen(false)}>Store</Link>
          <Link href="/hall-of-fame" className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-[#FFF9F2] hover:text-[#F59E0B] rounded-xl" onClick={() => setMenuOpen(false)}>Hall of Fame</Link>
          <Link href="/contact" className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-[#FFF9F2] hover:text-[#F59E0B] rounded-xl" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="pt-4 flex flex-col space-y-3">
            {user ? (
              <div className="bg-[#FFF9F2] rounded-2xl p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center font-black text-white text-xl">{user.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="text-sm font-black text-[#0D2B5E] leading-none">{user.name}</p>
                    <p className="text-xs font-bold text-gray-600">Orang Tua</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1 pt-3 border-t-2 border-navy/5">
                  <Link href="/ortu/dashboard" className="flex items-center gap-3 py-3 px-2 font-black text-gray-600 hover:text-[#F59E0B] rounded-lg" onClick={() => setMenuOpen(false)}>
                    <span className="text-xl">🚀</span> Dashboard
                  </Link>
                  <Link href="/ortu/invoices" className="flex items-center gap-3 py-3 px-2 font-black text-gray-600 hover:text-[#F59E0B] rounded-lg" onClick={() => setMenuOpen(false)}>
                    <span className="text-xl">💳</span> Pembayaran
                  </Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 mt-2">
                    <span>👋</span> Keluar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="bg-[#0D2B5E] text-white py-4 rounded-full text-center font-black shadow-lg" onClick={() => setMenuOpen(false)}>Masuk</Link>
                <Link href="/register" className="bg-[#F59E0B] text-white py-4 rounded-full text-center font-black shadow-lg" onClick={() => setMenuOpen(false)}>Daftar Sekarang</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
