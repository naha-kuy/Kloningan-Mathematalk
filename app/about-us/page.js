'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  { icon: '/images/about/3d_pengalaman.png', title: 'Pengalaman 10+ Tahun', desc: 'Telah dipercaya sejak 2015 dalam membimbing ribuan siswa meraih prestasi olimpiade matematika.' },
  { icon: '/images/about/3d_metode.png', title: 'Metode Terbukti Efektif', desc: 'Pendekatan belajar terstruktur yang telah teruji menghasilkan juara di berbagai tingkat kompetisi.' },
  { icon: '/images/about/3d_tim.png', title: 'Tim Tentor Berpengalaman', desc: 'Dibimbing langsung oleh peraih medali OSN, IMO, dan kompetisi matematika internasional.' },
  { icon: '/images/about/3d_layanan.png', title: 'Layanan Lengkap & Fleksibel', desc: 'Kelas offline dan online dengan jadwal yang dapat disesuaikan kebutuhan siswa.' },
  { icon: '/images/about/3d_skala.png', title: 'Skala Nasional & Online', desc: 'Menjangkau siswa dari berbagai daerah di Indonesia melalui platform belajar online.' },
  { icon: '/images/about/3d_prestasi.png', title: 'Digitalisasi Prestasi', desc: 'Pantau perkembangan dan prestasi siswa secara real-time melalui sistem digital.' },
];

const visiMisi = {
  visi: 'Menjadi lembaga bimbingan olimpiade matematika terdepan di Indonesia yang mencetak generasi unggul berprestasi nasional dan internasional.',
  misi: [
    'Menyediakan pembelajaran matematika berkualitas tinggi dengan metode inovatif dan menyenangkan.',
    'Membina siswa untuk mengembangkan kemampuan berpikir kritis, logis, dan kreatif.',
    'Mempersiapkan siswa meraih prestasi optimal di ajang olimpiade matematika.',
    'Berkontribusi dalam pengembangan pendidikan matematika di Indonesia.',
  ],
};

export default function AboutUsPage() {
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  useEffect(() => {
    fetch('/api/public/guru')
      .then((r) => r.json())
      .then((data) => setTutors(data.data || data || []))
      .catch(() => setTutors([]))
      .finally(() => setLoadingTutors(false));
  }, []);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            MATHEMATALK <span className="text-gold">ADALAH...</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Mathematalk adalah lembaga bimbingan olimpiade matematika yang berdiri sejak 2015. 
            Berawal dari keprihatinan terhadap minimnya wadah pembinaan olimpiade matematika 
            yang berkualitas, kami hadir untuk menjembatani siswa-siswi Indonesia meraih prestasi 
            tertinggi di kancah nasional maupun internasional. Dengan metode pengajaran yang 
            terstruktur dan tutor-tutor berpengalaman, Mathematalk telah berhasil mencetak 
            ratusan juara OSN dan kompetisi matematika bergengsi lainnya.
          </p>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-navy/5">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Visi</h2>
              <p className="text-navy/70 leading-relaxed">{visiMisi.visi}</p>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-navy/5">
              <div className="w-14 h-14 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Misi</h2>
              <ol className="space-y-3">
                {visiMisi.misi.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-navy/70">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-cyan/10 text-cyan flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* MENGAPA MEMILIH KAMI */}
      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Mengapa <span className="text-gold">Memilih Kami</span>?
            </h2>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Keunggulan yang membuat Mathematalk berbeda</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/15 transition-colors text-center">
                <img src={f.icon} alt={f.title} className="w-16 h-16 mx-auto mb-4 object-contain" loading="lazy" />
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAGLINE */}
      <section className="bg-gradient-to-r from-gold/10 via-cream to-cyan/10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            "Mengabadi Jejak, <span className="text-gold">Mencetak Juara!</span>"
          </h2>
          <p className="mt-4 text-navy/60 text-lg">
            Setiap langkah adalah warisan, setiap juara adalah bukti dedikasi kami.
          </p>
        </div>
      </section>

      {/* TUTOR KAMI */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
              <span className="text-gold">Tutor</span> Kami
            </h2>
            <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Para ahli yang akan membimbing putra-putri Anda</p>
          </div>
          {loadingTutors ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="w-24 h-24 bg-navy/10 rounded-full mx-auto mb-4" />
                  <div className="h-5 bg-navy/10 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-navy/10 rounded w-1/2 mx-auto mb-2" />
                  <div className="h-4 bg-navy/10 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          ) : tutors.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-navy/20 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p className="text-navy/50 text-lg">Data tutor sedang dipersiapkan</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {tutors.map((tutor, i) => (
                <div key={tutor.id || i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-gold/20 to-cyan/20 rounded-b-full" />
                  <svg className="absolute top-4 left-4 w-20 h-20 text-gold/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.2,88.5,-0.7C87,14.8,81.4,29.6,72.9,42.6C64.4,55.6,53,66.8,39.6,74.4C26.2,82,10.8,86,-4.2,84.5C-19.2,83,-33.8,76,-46.2,65.6C-58.6,55.2,-68.8,41.4,-75.6,25.8C-82.4,10.2,-85.8,-7.2,-80.9,-21.6C-76,-36,-62.8,-47.4,-48.4,-54.6C-34,-61.8,-18.4,-64.8,-2.5,-61.8C13.4,-58.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                  </svg>
                  <div className="relative z-10">
                    <img
                      src={tutor.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.nama || 'Tutor')}&background=F59E0B&color=fff&size=128`}
                      alt={tutor.nama}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                    />
                    <h3 className="font-bold text-navy text-lg">{tutor.nama}</h3>
                    {tutor.gelar && <p className="text-gold font-semibold text-sm">{tutor.gelar}</p>}
                    {tutor.prestasi && <p className="text-navy/50 text-xs mt-2">{tutor.prestasi}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
