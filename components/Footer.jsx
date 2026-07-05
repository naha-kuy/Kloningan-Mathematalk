import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <img src="/images/logo_light.png" alt="Mathematalk" className="h-8 md:h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/70 text-sm leading-relaxed">
              Partner terpercaya persiapan olimpiade matematika. Bimbingan dari para juara untuk meraih prestasi tertinggi.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-gold transition-colors">Beranda</Link></li>
              <li><Link href="/program" className="hover:text-gold transition-colors">Program</Link></li>
              <li><Link href="/about-us" className="hover:text-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gold mb-4">Lainnya</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/karir" className="hover:text-gold transition-colors">Karir</Link></li>
              <li><Link href="/kebijakan-privasi" className="hover:text-gold transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/syarat-ketentuan" className="hover:text-gold transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/kontak" className="hover:text-gold transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:info@mathematalk.com" className="hover:text-gold transition-colors">info@mathematalk.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">+62 896-3132-2828</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Mathematalk. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
