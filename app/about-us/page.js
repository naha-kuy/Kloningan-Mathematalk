'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-4">
            Cerita Kami
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            MATHEMATALK <span className="text-gold">ADALAH...</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            Mathematalk adalah pusat pelatihan matematika terpadu yang lahir dari dedikasi lebih dari satu dekade di dunia olimpiade. Bermula dari bimbingan tatap muka di Jawa Timur sejak 2015, kami kini menjadi platform pendidikan nasional yang telah mencetak ratusan juara di seluruh Indonesia.
          </p>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            Melalui rebranding di Desember 2025, Mathematalk berkomitmen untuk mendigitalisasi setiap jejak prestasi siswa dan menghadirkan bimbingan yang profesional, terorganisir, serta mudah diakses oleh seluruh talenta matematika Indonesia.
          </p>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-navy/5">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Visi</h2>
              <p className="text-navy/70 leading-relaxed">
                "Menjadi platform pendidikan matematika terdepan yang mengarsipkan dan merayakan setiap prestasi siswa, serta mengantarkan generasi juara dari bangku sekolah hingga masa depan gemilang."
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-navy/5">
              <div className="w-14 h-14 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center mb-5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Misi</h2>
              <div className="space-y-4">
                {[
                  { num: '1', title: 'Digitalisasi Jejak Prestasi:', desc: 'Mengarsipkan setiap kemenangan siswa sebagai bentuk apresiasi dan sumber inspirasi bagi generasi berikutnya.' },
                  { num: '2', title: 'Aksesibilitas Nasional:', desc: 'Menghadirkan bimbingan berkualitas tinggi yang mudah diakses oleh seluruh talenta matematika di Indonesia dan luar negeri.' },
                  { num: '3', title: 'Membangun Logika & Karakter:', desc: 'Membangun logika, merayakan proses berpikir, dan mengawal langkah siswa menuju podium juara.' },
                  { num: '4', title: 'Kolaborasi Tentor Ahli:', desc: 'Mencetak juara bersama tim pengajar berpengalaman dengan integritas tinggi dan rekam jejak terbukti.' },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-cyan/10 text-cyan flex items-center justify-center text-sm font-bold">{m.num}</span>
                    <div>
                      <span className="font-bold text-navy">{m.title}</span>
                      <span className="text-navy/70"> {m.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
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
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { img: '/images/about/3d_experience.png', title: 'Pengalaman 10+ Tahun', desc: 'Track record nyata membimbing ratusan juara olimpiade tingkat Regional, Nasional, hingga Internasional sejak 2015.' },
              { img: '/images/about/3d_method.png', title: 'Metode Terbukti Efektif', desc: 'Rekomendasi dari mulut ke mulut orang tua juara yang terus mempercayakan putra-putrinya kepada kami dari SD hingga perguruan tinggi.' },
              { img: '/images/about/3d_tutors.png', title: 'Tim Tentor Berpengalaman', desc: 'Kolaborasi dengan pengajar ahli yang memiliki integritas tinggi dan rekam jejak kompetisi gemilang.' },
              { img: '/images/about/3d_services.png', title: 'Layanan Lengkap & Fleksibel', desc: 'Matematika Olimpiade: Pelatihan intensif. Matematika Dasar: Memperkuat konsep dasar sekolah. Program TKA: Evaluasi dan persiapan ujian kenaikan level.' },
              { img: '/images/about/3d_online.png', title: 'Skala Nasional & Online', desc: 'Dari tatap muka lokal kini menjangkau seluruh Indonesia dengan sistem pembelajaran online yang terorganisir.' },
              { img: '/images/about/3d_digital.png', title: 'Digitalisasi Prestasi', desc: 'Setiap kemenangan siswa diarsipkan sebagai apresiasi dan inspirasi bagi generasi berikutnya.' },
            ].map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/15 transition-colors text-center">
                <img src={f.img} alt={f.title} className="w-16 h-16 mx-auto mb-4 object-contain" loading="lazy" />
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
        </div>
      </section>

      {/* TUTOR KAMI */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
              <span className="text-gold">Tutor</span> Kami
            </h2>
            <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Berdedikasi untuk mencetak generasi juara melalui proses belajar yang bermakna.</p>
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
