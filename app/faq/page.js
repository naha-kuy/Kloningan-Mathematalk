'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  { q: 'Apa itu Mathematalk?', a: 'Mathematalk adalah lembaga bimbingan olimpiade matematika yang berdiri sejak 2015. Kami fokus pada pembinaan siswa SD, SMP, dan SMA untuk meraih prestasi di ajang OSN dan kompetisi matematika lainnya.' },
  { q: 'Bagaimana cara mendaftar program?', a: 'Anda dapat mendaftar melalui website dengan membuat akun di halaman Daftar, kemudian memilih program yang diinginkan dan mengikuti petunjuk pembayaran yang tersedia.' },
  { q: 'Berapa biaya program di Mathematalk?', a: 'Biaya program bervariasi tergantung jenis kelas, durasi, dan tingkat kesulitan. Informasi harga lengkap dapat dilihat di halaman Program masing-masing kelas.' },
  { q: 'Apakah ada kelas online?', a: 'Ya, Mathematalk menyediakan kelas online yang dapat diakses dari mana saja di Indonesia. Kelas online menggunakan platform video conference interaktif.' },
  { q: 'Siapa saja tutor di Mathematalk?', a: 'Tutor kami adalah para ahli berpengalaman, termasuk peraih medali OSN, IMO, dan lulusan universitas ternama yang telah terlatih dalam membimbing siswa olimpiade.' },
  { q: 'Apakah ada jaminan prestasi?', a: 'Kami berkomitmen memberikan bimbingan terbaik dengan metode terbukti efektif. Namun, prestasi juga sangat dipengaruhi oleh usaha dan dedikasi siswa dalam belajar.' },
  { q: 'Bagaimana sistem pembayaran?', a: 'Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau metode pembayaran lainnya yang tersedia. Detail pembayaran akan dikirimkan setelah pendaftaran.' },
  { q: 'Apakah bisa refund jika batal?', a: 'Kebijakan pembatalan mengikuti syarat dan ketentuan yang berlaku. Biaya dapat dikembalikan dengan potongan administrasi sesuai ketentuan yang tertera di halaman Syarat & Ketentuan.' },
  { q: 'Bagaimana cara memantau perkembangan anak?', a: 'Orang tua dapat memantau perkembangan siswa melalui dashboard orang tua yang menyediakan informasi nilai, kehadiran, dan capaian prestasi secara real-time.' },
  { q: 'Apakah ada program gratis atau try out?', a: 'Mathematalk secara berkala menyelenggarakan try out gratis dan seminar edukatif. Informasi kegiatan terbaru dapat diikuti melalui media sosial dan website kami.' },
];

export default function FaqPage() {
  const [activeIdx, setActiveIdx] = useState(null);

  const toggle = (i) => setActiveIdx(activeIdx === i ? null : i);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-navy hover:bg-navy/5 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-gold transition-transform duration-300 ${activeIdx === i ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-5 text-navy/70 leading-relaxed border-t border-navy/5 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
