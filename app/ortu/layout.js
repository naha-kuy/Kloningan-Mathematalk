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
  { label: 'Dashboard', href: '/ortu/dashboard' },
  { label: 'Kelas Saya', href: '/ortu/kelas' },
  { label: 'Data Anak', href: '/ortu/anak' },
  { label: 'Tagihan', href: '/ortu/invoices' },
  { label: 'Profile', href: '/ortu/profile' },
  { label: 'Ganti Password', href: '/ortu/ganti-password' },
];

export default function OrtuLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('mathematalk_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    const decoded = parseJwt(token);
    if (decoded?.name) {
      setUserName(decoded.name);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('mathematalk_token');
    router.replace('/login');
  };

  if (!mounted) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <div
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-navy text-white transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-gold">Mathematalk</h1>
          <p className="text-sm text-white/60 mt-1">Portal Orang Tua</p>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold/20 text-gold border-r-2 border-gold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Mathematalk
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {userName && (
              <span className="text-sm font-medium text-navy">Halo, {userName}</span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
