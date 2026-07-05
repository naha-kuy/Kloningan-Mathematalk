'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const achievements = [
  { name: 'Ahmad Fauzi', medal: 'Emas', year: '2024', event: 'OSN Matematika SD Tingkat Nasional' },
  { name: 'Siti Nurhaliza', medal: 'Emas', year: '2024', event: 'OSN Matematika SMP Tingkat Nasional' },
  { name: 'Budi Santoso', medal: 'Perak', year: '2024', event: 'OSN Matematika SMA Tingkat Nasional' },
  { name: 'Dewi Lestari', medal: 'Perak', year: '2024', event: 'KSM Matematika MA Tingkat Nasional' },
  { name: 'Rizky Pratama', medal: 'Emas', year: '2023', event: 'OSN Matematika SD Tingkat Nasional' },
  { name: 'Nina Wijaya', medal: 'Perunggu', year: '2023', event: 'OSN Matematika SMP Tingkat Nasional' },
  { name: 'Andi Firmansyah', medal: 'Emas', year: '2023', event: 'OSN Matematika SMA Tingkat Nasional' },
  { name: 'Maya Anggraini', medal: 'Perak', year: '2023', event: 'KSM Matematika MA Tingkat Nasional' },
  { name: 'Fajar Hidayat', medal: 'Emas', year: '2022', event: 'OSN Matematika SD Tingkat Nasional' },
  { name: 'Rina Marlina', medal: 'Perunggu', year: '2022', event: 'OSN Matematika SMP Tingkat Nasional' },
  { name: 'Doni Kusuma', medal: 'Emas', year: '2022', event: 'OSN Matematika SMA Tingkat Nasional' },
  { name: 'Sari Puspita', medal: 'Perak', year: '2022', event: 'KSM Matematika MA Tingkat Nasional' },
];

const medalColors = {
  Emas: { bg: 'bg-amber-100', text: 'text-amber-600', icon: 'text-amber-500' },
  Perak: { bg: 'bg-slate-100', text: 'text-slate-500', icon: 'text-slate-400' },
  Perunggu: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-500' },
};

export default function HallOfFamePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Hall of <span className="text-gold">Fame</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">Bangga dengan prestasi siswa-siswi Mathematalk di berbagai ajang kompetisi</p>
          </div>
        </section>

        {/* PRESTASI */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-navy/80 font-semibold text-lg">Filter berdasarkan tahun</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {achievements.map((a, i) => {
                const colors = medalColors[a.medal];
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                      <svg className={`w-7 h-7 ${colors.icon}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>{a.medal}</span>
                        <span className="text-xs text-navy/40 font-semibold">{a.year}</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-navy mt-1 truncate">{a.name}</h3>
                      <p className="text-sm text-navy/60 mt-0.5">{a.event}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PENUTUP */}
        <section className="bg-gradient-to-r from-gold/10 via-cream to-cyan/10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
              "Mengabadi Jejak, <span className="text-gold">Mencetak Juara!</span>"
            </h2>
            <p className="mt-4 text-navy/60 text-lg">Setiap prestasi adalah langkah menuju masa depan yang lebih cerah.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
