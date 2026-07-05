import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <img src="/images/logo_light.png" alt="Mathematalk" className="h-8 md:h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/70 text-sm leading-relaxed">
              Partner terbaik untuk persiapan olimpiade matematika Anda. Kami membantu Anda mencapai prestasi tertinggi dengan cara yang menyenangkan!
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about-us" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/kelas-aktif" className="hover:text-gold transition-colors">Our Classes</Link></li>
              <li><Link href="/store" className="hover:text-gold transition-colors">Store</Link></li>
              <li><Link href="/hall-of-fame" className="hover:text-gold transition-colors">Hall of Fame</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gold mb-4">Programs</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/private-class" className="hover:text-gold transition-colors">Kelas Private</Link></li>
              <li><Link href="/kelas-aktif" className="hover:text-gold transition-colors">Kelas Semi Private</Link></li>
              <li><a href="/#grup-besar" className="hover:text-gold transition-colors">Kelas Grup Besar</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Perum Griya Permata Alam Blok C-34,<br />Karangploso, Malang.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="https://wa.me/6289631312828" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">+62 896-3131-2828</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:bimbel.mathematalk@gmail.com" className="hover:text-gold transition-colors">bimbel.mathematalk@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <div>&copy; 2026 Mathematalk. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/kebijakan-privasi" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/syarat-ketentuan" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
