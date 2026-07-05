'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const navItems = [
  { label: 'Beranda', href: '/ortu/dashboard' },
  { label: 'Kelas Anak', href: '/ortu/kelas' },
  { label: 'Daftar Anak', href: '/ortu/anak' },
  { label: 'Tagihan', href: '/ortu/invoices' },
  { label: 'Profil Saya', href: '/ortu/profile' },
];

export default function OrtuLayout({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userName, setUserName] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isRegisterPage = pathname === '/ortu/register';

  useEffect(() => {
    setMounted(true);
    if (isRegisterPage) return;
    const token = localStorage.getItem('mathematalk_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    const decoded = parseJwt(token);
    if (decoded?.name) {
      setUserName(decoded.name);
    }
  }, [router, isRegisterPage]);

  const handleLogout = () => {
    localStorage.removeItem('mathematalk_token');
    router.replace('/login');
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  if (isRegisterPage) {
    return <>{children}</>;
  }

  const isActive = (href) => pathname === href;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sticky Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2">
            <img src="/images/logo_light.png" alt="Mathematalk Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(item.href)
                    ? 'bg-navy text-white shadow-lg shadow-navy/20'
                    : 'text-gray-600 hover:text-navy hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="flex items-center space-x-4">
            {userName && (
              <div className="text-right hidden lg:block">
                <p className="text-[10px] text-gray-600 font-bold leading-none mb-1 uppercase tracking-wider">Selamat Datang,</p>
                <span className="font-bold text-sm text-navy">{userName}</span>
              </div>
            )}
            <div className="h-8 w-[1px] bg-gray-100 mx-2 hidden md:block" />
            <button
              onClick={handleLogout}
              className="hidden md:block text-xs font-bold text-red-500 hover:text-red-600 transition-colors bg-red-50 px-3 py-2 rounded-lg"
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-navy hover:bg-gray-50 rounded-xl transition-colors"
            >
              {!mobileMenu ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-2xl absolute inset-x-0 top-full z-50 p-6">
            <div className="space-y-4">
              {userName && (
                <div className="pb-4 mb-4 border-b border-gray-50">
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Akun Saya</p>
                  <p className="font-bold text-navy">{userName}</p>
                </div>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center space-x-3 p-3 rounded-xl font-bold ${
                    isActive(item.href)
                      ? 'bg-navy text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl font-bold text-red-500 hover:bg-red-50"
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 min-h-[calc(100vh-5rem)]">
        {children}
      </main>
    </div>
  );
}
