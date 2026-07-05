'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const schools = [
  { name: 'Marsden Park', img: 'marsden-park.webp' },
  { name: 'MPS', img: 'mps.webp' },
  { name: 'Binus School', img: 'binus-school.webp' },
  { name: 'Cita Hati', img: 'cita-hati.webp' },
  { name: 'GPS', img: 'gps.webp' },
  { name: 'Pahoa', img: 'pahoa.webp' },
  { name: 'Xin Zhong', img: 'xin-zhong.webp' },
  { name: 'Athalia', img: 'athalia.webp' },
  { name: 'Alta Global', img: 'alta-global.webp' },
  { name: 'BPK Penabur', img: 'bpk-penabur.webp' },
  { name: 'Pradita Dirgantara', img: 'pradita-dirgantara.webp' },
  { name: 'SD Muhammadiyah Sapen', img: '10. SD Muhammadiyah Sapen.webp' },
  { name: 'MIN 1 Kota Malang', img: '11. MIN 1 Kota Malang.webp' },
  { name: 'MAN 2 Kota Malang', img: '12. MAN 2 Kota Malang.webp' },
  { name: 'MTsN 1 Kota Malang', img: '13. MTsN-1-Kota-Malang-PNG.webp' },
  { name: 'Al Azhar', img: '14. Al Azhar.webp' },
  { name: 'Darma Yudha Pekanbaru', img: '15.DARMA_YUDHA_PEKANBARU.webp' },
  { name: 'MI Perwanida Blitar', img: '16. MI Perwanida Blitar.webp' },
  { name: 'JIGSC', img: '17. jakarta islamic school.webp' },
  { name: 'GIS', img: '18. logo Global Islamic School.webp' },
  { name: 'SMPI Al Abidin', img: '19. SMPI Al Abidin.webp' },
  { name: 'SDIT Al Ikhlas Bogor', img: '20. images-removebg-preview.webp' },
  { name: 'SMPK Kosayu', img: '21. SMPK-KOSAYU-2.webp' },
  { name: 'SDK Santo Yusup 2 Malang', img: '22. SDK Santo Yusup 2 Malang.webp' },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Tim Berprestasi Internasional',
    desc: 'Dibimbing langsung oleh peraih medali OSN, IMO, dan kompetisi matematika internasional.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: 'Kualifikasi Akademik Unggul',
    desc: 'Seluruh tutor memiliki latar belakang pendidikan terbaik dari universitas ternama.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Track Record Terbukti',
    desc: 'Ratusan alumni telah berhasil meraih medali di berbagai ajang olimpiade nasional.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Penyusun Soal Olimpiade',
    desc: 'Tim kami terlibat aktif dalam penyusunan soal olimpiade matematika berbagai tingkat.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    title: 'Metode Pengajaran Efektif',
    desc: 'Pendekatan belajar yang interaktif, menyenangkan, dan terstruktur untuk hasil maksimal.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Dedikasi & Relevansi',
    desc: 'Materi selalu diperbarui mengikuti perkembangan terbaru standar olimpiade matematika.',
  },
];

const testimonials = [
  {
    name: 'Sarah Maulida',
    role: 'Orang Tua dari Anak Kelas 5 SD',
    text: 'Anak saya sangat antusias setiap kali belajar di Mathematalk. Nilai matematikanya meningkat drastis dan berhasil meraih medali perak OSN tingkat provinsi!',
    stars: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Orang Tua dari Anak Kelas 8 SMP',
    text: 'Metode pengajarannya sangat efektif. Anak saya yang tadinya takut dengan matematika sekarang jadi sangat menyukainya. Tutor-tutornya sabar dan profesional.',
    stars: 5,
  },
  {
    name: 'Rina Wijaya',
    role: 'Orang Tua dari Anak Kelas 4 SD',
    text: 'Mathematalk benar-benar membantu persiapan OSN anak saya. Pembahasan soal-soalnya mendalam dan mudah dipahami. Hasilnya, anak saya lolos ke tingkat nasional!',
    stars: 5,
  },
  {
    name: 'Agus Prasetyo',
    role: 'Orang Tua dari Anak Kelas 6 SD',
    text: 'Saya sangat merekomendasikan Mathematalk untuk persiapan olimpiade. Anak saya berhasil meraih juara 1 OSN tingkat kota setelah 6 bulan belajar di sini.',
    stars: 5,
  },
];

const statsDefault = { total_siswa: 99, total_kelas: 45, total_guru: 15, total_hall_of_fame: 126 };

export default function HomePage() {
  const [stats, setStats] = useState(statsDefault);
  const [testiIdx, setTestiIdx] = useState(0);
  const [schoolIdx, setSchoolIdx] = useState(0);

  useEffect(() => {
    setStats(statsDefault);
  }, []);

  const nextTesti = () => setTestiIdx((p) => (p + 1) % testimonials.length);
  const prevTesti = () => setTestiIdx((p) => (p - 1 + testimonials.length) % testimonials.length);

  const itemsPerView = 5;
  const maxSchoolIdx = Math.max(0, schools.length - itemsPerView);
  const nextSchool = () => setSchoolIdx((p) => Math.min(p + 1, maxSchoolIdx));
  const prevSchool = () => setSchoolIdx((p) => Math.max(p - 1, 0));

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream to-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-tight">
                Bantu Anak Anda <span className="text-gold">Raih Juara</span> di Olimpiade!
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-navy/70 max-w-xl leading-relaxed">
                Mathematalk adalah partner terpercaya persiapan olimpiade matematika. Bimbingan dari para juara untuk meraih prestasi tertinggi.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/ortu/register" className="btn-kidzy btn-kidzy-gold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-lg shadow-gold/30">
                  Daftar Sekarang
                </Link>
                <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer" className="btn-kidzy btn-kidzy-outline px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                  Hubungi Kami
                </a>
              </div>
              <div className="mt-8 sm:mt-12 flex items-center gap-4 sm:gap-6 text-sm text-navy/60">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>Terpercaya</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-cyan" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>100% Terbukti</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                  <span>+2.000 Siswa</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-gold/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 bg-cyan/20 rounded-full blur-3xl" />
                <img
                  src="/images/kidzy/prestasi-siswa-mathematalk.webp"
                  alt="Prestasi Siswa Mathematalk"
                  className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gold text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-bounce">
                Tutor Ahli
              </div>
              <div className="absolute -bottom-2 -left-4 sm:-bottom-4 sm:-left-6 bg-cyan text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                Juara OSN
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F59E0B" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.2,88.5,-0.7C87,14.8,81.4,29.6,72.9,42.6C64.4,55.6,53,66.8,39.6,74.4C26.2,82,10.8,86,-4.2,84.5C-19.2,83,-33.8,76,-46.2,65.6C-58.6,55.2,-68.8,41.4,-75.6,25.8C-82.4,10.2,-85.8,-7.2,-80.9,-21.6C-76,-36,-62.8,-47.4,-48.4,-54.6C-34,-61.8,-18.4,-64.8,-2.5,-61.8C13.4,-58.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#06B6D4" d="M38.8,-58.4C51.6,-52.8,64.4,-46.4,72.6,-35.8C80.8,-25.2,84.4,-10.4,82.8,3.6C81.2,17.6,74.4,30.8,64.6,41.2C54.8,51.6,42,59.2,28.2,65.2C14.4,71.2,-0.4,75.6,-15.2,73.2C-30,70.8,-44.8,61.6,-55.6,49.2C-66.4,36.8,-73.2,21.2,-75.2,4.8C-77.2,-11.6,-74.4,-28.8,-65.6,-42.2C-56.8,-55.6,-42,-65.2,-26.8,-69.8C-11.6,-74.4,4,-74,18.2,-68.2C32.4,-62.4,26,-64,38.8,-58.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10">
              <div className="text-3xl md:text-5xl font-extrabold text-gold mb-1">{stats.total_siswa}</div>
              <div className="text-white/80 text-sm md:text-base font-semibold">Siswa Aktif</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10">
              <div className="text-3xl md:text-5xl font-extrabold text-cyan mb-1">{stats.total_kelas}</div>
              <div className="text-white/80 text-sm md:text-base font-semibold">Kelas Berjalan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10">
              <div className="text-3xl md:text-5xl font-extrabold text-gold mb-1">{stats.total_guru}</div>
              <div className="text-white/80 text-sm md:text-base font-semibold">Tutor Ahli</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10">
              <div className="text-3xl md:text-5xl font-extrabold text-cyan mb-1">{stats.total_hall_of_fame}</div>
              <div className="text-white/80 text-sm md:text-base font-semibold">Prestasi Alumni</div>
            </div>
          </div>
          <div className="mt-8 md:mt-12 flex justify-center">
            <img
              src="/images/kidzy/grup-belajar-mathematalk.webp"
              alt="Grup Belajar Mathematalk"
              className="rounded-2xl shadow-lg max-w-full h-auto md:max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* ===== WHY MATHEMATALK ===== */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">Kenapa <span className="text-gold">Mathematalk</span>?</h2>
            <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Kami memiliki keunggulan yang membuat kami berbeda dari yang lain</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-navy/5 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-navy mb-2">{f.title}</h3>
                <p className="text-sm md:text-base text-navy/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-gradient-to-r from-gold/5 via-cream to-cyan/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">Apa Kata <span className="text-gold">Mereka</span>?</h2>
            <p className="mt-3 text-navy/60 max-w-2xl mx-auto">Testimoni dari orang tua yang telah merasakan manfaat belajar di Mathematalk</p>
          </div>
          <div className="relative max-w-2xl mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${testiIdx * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-2">
                  <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl text-center">
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <svg key={s} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-navy/70 text-sm md:text-base leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <p className="font-bold text-navy">{t.name}</p>
                      <p className="text-xs md:text-sm text-navy/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={prevTesti} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:text-gold transition-colors z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextTesti} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:text-gold transition-colors z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestiIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === testiIdx ? 'bg-gold' : 'bg-navy/20'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCHOOLS ===== */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy leading-tight">
              Mari Bergabung Bersama Ratusan Siswa <span className="text-gold">Sekolah Ternama</span> dan Jadilah Juara!
            </h2>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${schoolIdx * (100 / itemsPerView)}%)` }}
              >
                {schools.map((s, i) => (
                  <div key={i} className="min-w-[calc(50%-8px)] sm:min-w-[calc(33.333%-11px)] md:min-w-[calc(20%-19px)] shrink-0">
                    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-20 md:h-24 border border-navy/5">
                      <img
                        src={`/images/schools/${encodeURI(s.img)}`}
                        alt={s.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevSchool}
              disabled={schoolIdx === 0}
              className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={nextSchool}
              disabled={schoolIdx >= maxSchoolIdx}
              className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
