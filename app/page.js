'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchoolCarousel from '@/components/SchoolCarousel';

const features = [
  { icon: '🌍', title: 'Tim Berprestasi Internasional', desc: 'Pengajar kami adalah medalis <strong>IMC (Bulgaria)</strong>, MaG-D ITB, hingga peraih medali emas ONMIPA-PT.' },
  { icon: '🎓', title: 'Kualifikasi Akademik Unggul', desc: '<strong>100% Lulusan S2/S3 Matematika</strong> dari universitas top seperti ITB, ITS, dan UGM.' },
  { icon: '📈', title: 'Track Record Terbukti', desc: 'Lebih dari <strong>10 tahun pengalaman</strong> membimbing ratusan siswa meraih medali di OSN/KSN.' },
  { icon: '📝', title: 'Penyusun Soal Olimpiade', desc: 'Kontributor aktif sebagai <strong>Tim Penyusun Soal</strong> kompetisi nasional seperti OMVN & PEMNAS.' },
  { icon: '💡', title: 'Metode Pengajaran Efektif', desc: 'Pembelajaran yang <strong>personal & interaktif</strong> fokus pada penguasaan konsep dan strategi kompetisi.' },
  { icon: '❤️', title: 'Dedikasi & Relevansi', desc: 'Selalu memperbarui strategi belajar mengikuti <strong>standar olimpiade matematika global terbaru</strong>.' },
];

const testimonials = [
  { name: 'Aditya Pratama', role: 'Orang Tua Siswa SD', text: 'They have a wonderful way of making lessons engaging and interactive, ensuring that every child feels included and motivated to learn.', stars: 5 },
  { name: 'Syafira Kusuma', role: 'Siswa SMP', text: 'Their communication with parents is excellent, keeping us informed about our child\'s progress and any areas that may need attention.', stars: 5 },
  { name: 'Budi Santoso', role: 'Siswa SMA', text: 'It is evident that they genuinely care about their students\' well-being and academic success.', stars: 5 },
  { name: 'Rian Anggara', role: 'Orang Tua Siswa SD', text: 'Metode belajarnya sangat cocok untuk anak saya yang awalnya kesulitan memahami konsep dasar.', stars: 5 },
];

const faqs = [
  { q: 'Media apa yang digunakan dalam proses belajar?', a: 'Seluruh sesi kelas dilaksanakan secara daring melalui Zoom Meeting yang interaktif dan mudah diakses.' },
  { q: 'Bagaimana metode pembelajaran untuk tiap jenjang?', a: 'Kami membagi kurikulum menjadi tiga fokus utama: TK – Kelas 2 SD: Membangun fondasi matematika yang menyenangkan menggunakan referensi past paper lomba tingkat dasar. Kelas 3 – Kelas 4 SD: Mengikuti Kurikulum Khusus Mathematalk, yakni program yang dirancang spesifik untuk persiapan lomba OSN. Kelas 5 SD – SMA: Fokus intensif pada bedah soal (past papers) berbagai kompetisi matematika bergengsi.' },
  { q: 'Apakah siswa bisa meminta pembahasan soal tertentu?', a: 'Tentu saja. Kami mengutamakan diskusi dua arah. Murid bisa mengajukan request soal di grup; jika disetujui anggota grup lainnya, tutor akan membahasnya secara detail di kelas.' },
  { q: 'Berapa biaya investasi dan bagaimana sistem pembayarannya?', a: 'Biaya: Mulai dari Rp50.000 per sesi (durasi 90 menit). Sistem: Total biaya dihitung dari jumlah pertemuan dalam satu bulan. Pembayaran dilakukan di awal bulan secara sekaligus (upfront payment).' },
  { q: 'Bagaimana kebijakan jika siswa berhalangan hadir?', a: 'Karena setiap grup memiliki progres dan dinamika pembahasan soal yang berbeda, sesi yang terlewat dianggap hangus dan tidak tersedia kelas pengganti. Namun, kami akan memberikan rekaman sesi belajar agar anak tetap bisa menyimak materi secara mandiri.' },
];

export default function HomePage() {
  const [stats, setStats] = useState({ total_siswa: 99, total_kelas: 45, total_guru: 15, total_hall_of_fame: 126 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const nextTesti = () => setActiveSlide(p => Math.min(p + 1, testimonials.length - 3));
  const prevTesti = () => setActiveSlide(p => Math.max(p - 1, 0));
  const translatePercent = (activeSlide * 100) / 3;

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative pt-16 pb-24 md:pb-32 px-4 overflow-hidden bg-cream">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0 relative">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white rounded-full text-gold font-bold text-xs md:text-sm mb-4 md:mb-6 shadow-sm border border-gold/20">
              <span className="text-sm md:text-lg">⭐</span> Partner Terpercaya Orang Tua
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] md:leading-[1.1] text-navy tracking-tight">
              Bantu Anak Anda <br />
              <span className="text-gold">Raih Juara</span> di <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-cyan">Olimpiade!</span>
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-4 bg-cyan/10 -rotate-1" />
              </span>
            </h1>
            <p className="mt-4 md:mt-8 text-sm md:text-lg text-gray-600 font-medium max-w-lg leading-relaxed">
              Persiapkan masa depan cerah buah hati Anda dengan bimbingan terbaik dari para juara. Metode belajar yang asyik, menantang, dan terbukti efektif.
            </p>
            <div className="mt-6 md:mt-10 flex flex-wrap gap-3 md:gap-5">
              <a href="#pilihan-kelas" className="bg-navy text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-sm md:text-lg shadow-xl hover:bg-gold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                Daftar Sekarang
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="https://wa.me/6289631322828" target="_blank" className="bg-gold text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-sm md:text-lg shadow-xl hover:bg-navy transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                </span>
                Hubungi Kami
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-sm md:max-w-lg group">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-gold/30 transform scale-125 -z-10 translate-x-4 translate-y-4 transition-transform group-hover:scale-110">
                <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.2,88.5,-0.9C87,14.4,81.4,28.8,73.6,41.9C65.8,55,55.8,66.8,43.1,75.3C30.4,83.8,15.2,89,0,89C-15.2,89,-30.4,83.8,-42.6,74.9C-54.8,66,-64.1,53.4,-72.4,39.9C-80.7,26.4,-88,13.2,-87.3,0.4C-86.6,-12.4,-77.9,-24.8,-69.3,-36.5C-60.7,-48.2,-52.2,-59.2,-40.4,-67.6C-28.6,-76,-14.3,-81.8,0.7,-83C15.7,-84.2,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
              <img src="/images/kidzy/prestasi-siswa-mathematalk.webp" alt="Happy Student" width="600" height="600" className="rounded-4xl md:rounded-[4rem] shadow-2xl border-4 md:border-8 border-white transform -rotate-3 hover:rotate-0 transition-all duration-700 w-full object-cover aspect-square" />

              <div className="absolute left-2 md:-left-12 top-1/4 bg-white p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl flex items-center gap-2 md:gap-3 animate-bounce hover:scale-110 transition-transform cursor-default" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 text-green-500 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">✓</div>
                <div className="font-black text-navy text-sm md:text-base">Tutor Ahli</div>
              </div>

              <div className="absolute right-2 md:-right-8 bottom-1/4 bg-white p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl flex items-center gap-2 md:gap-3 animate-bounce hover:scale-110 transition-transform cursor-default" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/20 text-gold rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">🏆</div>
                <div className="font-black text-navy text-sm md:text-base">Juara OSN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="w-full overflow-hidden leading-none -mt-[50px] relative z-20">
        <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,114.2,189.6,98.66,236.43,86.29,281.33,63.95,321.39,56.44Z" className="fill-white" />
        </svg>
      </div>

      {/* ===== PENDEKATAN BELAJAR ===== */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-navy mb-4 md:mb-6 leading-tight">Pendekatan Belajar Unik <br /> untuk Generasi Muda</h2>
            <p className="text-gray-500 font-medium text-sm md:text-lg">Metode pembelajaran kami didesain khusus untuk membuat matematika menjadi menyenangkan, mudah dipahami, dan aplikatif.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 relative">
            <div className="flex flex-col gap-4 md:gap-8 w-full lg:w-1/3">
              <div className="bg-cream p-4 md:p-6 rounded-3xl md:rounded-4xl flex items-center gap-3 md:gap-4 shadow-sm hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl font-black text-gold shrink-0">{stats.total_siswa}</div>
                <div>
                  <h4 className="font-bold text-navy text-sm md:text-lg">Siswa Aktif</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Belajar bersama kami</p>
                </div>
              </div>
              <div className="bg-cream p-4 md:p-6 rounded-3xl md:rounded-4xl flex items-center gap-3 md:gap-4 shadow-sm hover:-translate-y-2 transition-transform duration-300 lg:ml-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl font-black text-cyan shrink-0">{stats.total_kelas}</div>
                <div>
                  <h4 className="font-bold text-navy text-sm md:text-lg">Kelas Berjalan</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Pilihan program beragam</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex justify-center relative order-first lg:order-0 mb-4 md:mb-0">
              <div className="absolute inset-0 border-[3px] border-dashed border-gold/30 rounded-full scale-110 animate-[spin_30s_linear_infinite]" />
              <img src="/images/kidzy/grup-belajar-mathematalk.webp" alt="Learning" loading="lazy" width="400" height="400" className="w-full max-w-50 md:max-w-sm rounded-3xl md:rounded-[3rem] object-cover border-4 md:border-8 border-white shadow-xl md:shadow-2xl relative z-10" />
            </div>

            <div className="flex flex-col gap-4 md:gap-8 w-full lg:w-1/3">
              <div className="bg-cream p-4 md:p-6 rounded-3xl md:rounded-4xl flex items-center gap-3 md:gap-4 shadow-sm hover:-translate-y-2 transition-transform duration-300 lg:-ml-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl font-black text-gold shrink-0">{stats.total_guru}</div>
                <div>
                  <h4 className="font-bold text-navy text-sm md:text-lg">Tutor Ahli</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Berpengalaman juara</p>
                </div>
              </div>
              <div className="bg-cream p-4 md:p-6 rounded-3xl md:rounded-4xl flex items-center gap-3 md:gap-4 shadow-sm hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl font-black text-cyan shrink-0">{stats.total_hall_of_fame}</div>
                <div>
                  <h4 className="font-bold text-navy text-sm md:text-lg">Prestasi Alumni</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Medali Nasional & Internasional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENGAPA MATHEMATALK ===== */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan/5 rounded-full -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-cream rounded-full text-gold font-bold text-xs md:text-sm mb-4 md:mb-6 shadow-sm border border-gold/20">
              <span className="text-sm md:text-lg">💎</span> Keunggulan Pengajar Kami
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-navy mb-4 md:mb-6 leading-tight">Mengapa Mathematalk?</h2>
            <p className="text-gray-500 font-medium text-sm md:text-lg italic">
              "Kami menghadirkan tim pengajar terbaik yang memiliki rekam jejak nyata dalam mencetak juara di berbagai kompetisi."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-cream/40 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-base md:text-xl font-black text-navy mb-2 md:mb-4">{f.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc }} />
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-20 text-center">
            <a href="/about-us" className="inline-flex items-center gap-2 md:gap-3 bg-navy text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-sm md:text-lg shadow-xl hover:bg-gold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group">
              Lihat Daftar Tutor Kami
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 md:py-24 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-black text-navy leading-tight">Ini Ungkapan <br /> <span className="text-gold">dari Alumni Kami</span></h2>
            </div>
            <div className="flex gap-2">
              <button onClick={prevTesti} disabled={activeSlide === 0} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-navy text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextTesti} disabled={activeSlide >= testimonials.length - 3} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-navy text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out -mx-2 md:-mx-4" style={{ transform: `translateX(-${translatePercent}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="w-full md:w-1/3 shrink-0 px-2 md:px-4">
                  <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] h-full flex flex-col transition-all duration-500 shadow-sm hover:shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-cream rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-sm border border-gray-100 shrink-0">👤</div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-black text-navy text-sm md:text-lg truncate">{t.name}</h4>
                        <p className="text-gray-400 font-bold text-[10px] md:text-xs">{t.role}</p>
                        <div className="text-gold flex gap-0.5 md:gap-1 mt-1 text-[10px] md:text-xs">
                          {Array.from({ length: t.stars }).map((_, s) => <span key={s}>⭐</span>)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium text-xs md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCHOOLS ===== */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tight leading-tight">
              Mari Bergabung Bersama Ratusan Siswa Sekolah Ternama dan Jadilah Juara!
            </h3>
            <p className="text-gray-600 font-medium text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              Jadilah bagian dari ratusan siswa sekolah unggulan yang telah memilih kami. Berikan bimbingan olimpiade yang terbukti mencetak juara dan prestasi gemilang.
            </p>
          </div>
          <SchoolCarousel />
        </div>
      </section>

      {/* ===== HALL OF FAME ===== */}
      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Prestasi Gemilang<br /><span className="text-gold">Siswa Kami</span>
            </h2>
            <Link href="/hall-of-fame" className="inline-block mt-4 text-gold hover:text-white font-bold text-sm transition-colors">
              Lihat Semua Prestasi
            </Link>
          </div>
          <div className="text-center py-8 md:py-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
            <p className="text-white/50 text-lg">Belum ada data prestasi yang ditampilkan.</p>
          </div>
        </div>
      </section>

      {/* ===== PILIHAN KELAS ===== */}
      <section id="pilihan-kelas" className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white rounded-full text-gold font-bold text-xs md:text-sm mb-4 md:mb-6 shadow-sm border border-gold/20">
                <span className="text-sm md:text-lg">💻</span> Suasana Belajar Interaktif
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-navy leading-tight mb-8 md:mb-12">Beragam Pilihan Kelas <br /> Sesuai <span className="text-gold">Kebutuhan Anda</span></h2>

              <div className="flex flex-col gap-4 md:gap-6">
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cream flex items-center justify-center shrink-0">
                    <span className="text-xl md:text-2xl">🧑‍🏫</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-black text-navy">Kelas Private (1 Siswa)</h3>
                    <p className="text-xs text-gray-500 font-medium truncate">Satu tutor eksklusif untuk satu siswa. Fokus 100%, kurikulum personal.</p>
                  </div>
                  <Link href="/private-class" className="text-gold font-bold text-xs hover:text-navy transition-colors shrink-0">Selengkapnya →</Link>
                </div>
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cream flex items-center justify-center shrink-0">
                    <span className="text-xl md:text-2xl">👥</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-black text-navy">Kelas Semi-Private (5-10 Siswa)</h3>
                    <p className="text-xs text-gray-500 font-medium truncate">Belajar dalam kelompok kecil. Interaktif dan kompetitif.</p>
                  </div>
                  <Link href="/kelas-aktif" className="text-gold font-bold text-xs hover:text-navy transition-colors shrink-0">Selengkapnya →</Link>
                </div>
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cream flex items-center justify-center shrink-0">
                    <span className="text-xl md:text-2xl">🏛️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-black text-navy">Kelas Grup Besar</h3>
                    <p className="text-xs text-gray-500 font-medium truncate">Program intensif seperti OMOC & BOB dengan kurikulum terstruktur.</p>
                  </div>
                  <a href="#grup-besar" className="text-gold font-bold text-xs hover:text-navy transition-colors shrink-0">Selengkapnya →</a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-navy rounded-3xl overflow-hidden shadow-2xl aspect-video">
                <iframe
                  className="w-full h-full rounded-3xl"
                  src="https://www.youtube.com/embed/ugkD7SRz4DA"
                  title="Mathematalk Kelas"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEKARANG MAU AMBIL KELAS APA ===== */}
      <section id="grup-besar" className="scroll-mt-24 bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">Sekarang, Mau Ambil <br /> <span className="text-gold">Kelas Apa</span>?</h3>
            <p className="mt-2 text-white/60 font-medium text-sm">"Pilih program yang paling sesuai dengan gaya belajar dan target anak Anda."</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <span className="inline-block bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full">Grup Besar</span>
                <p className="text-white/60 text-xs mt-3">Kelas dalam skala besar untuk program intensif persiapan kompetisi.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-navy rounded-2xl p-4 border border-white/10">
                  <div className="text-cyan text-xs font-bold mb-1">Khusus SD</div>
                  <h4 className="text-xl font-extrabold text-white mb-1">OMOC</h4>
                  <p className="text-white/60 text-xs mb-3">Online Mathematic Olympiad Class</p>
                  <div className="text-xs text-white/50 mb-3">
                    <p className="font-semibold text-white/70 mb-1">Tutor:</p>
                    <ul className="space-y-0.5"><li>Kak Faikar</li><li>Kak Elsa</li></ul>
                  </div>
                  <Link href="/program/omoc" className="block text-center bg-gold text-navy font-bold px-4 py-2 rounded-full text-xs hover:bg-white transition-colors">Daftar</Link>
                </div>
                <div className="bg-navy rounded-2xl p-4 border border-white/10">
                  <div className="text-gold text-xs font-bold mb-1">Khusus SMP</div>
                  <h4 className="text-xl font-extrabold text-white mb-1">BOB</h4>
                  <p className="text-white/60 text-xs mb-3">Belajar Online Bareng - Kolaborasi dengan NEC</p>
                  <div className="text-xs text-white/50 mb-3">
                    <p className="font-semibold text-white/70 mb-1">Tutor:</p>
                    <ul className="space-y-0.5"><li>Pak Faikar</li><li>Pak Mu'in</li><li>Kak Syauqi</li></ul>
                  </div>
                  <Link href="/program/bob" className="block text-center bg-gold text-navy font-bold px-4 py-2 rounded-full text-xs hover:bg-white transition-colors">Daftar</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100">
              <div className="text-center mb-6">
                <span className="inline-block bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full">Kelas Private</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[{ icon: '⏱️', label: 'Jadwal Fleksibel' }, { icon: '🎯', label: 'Fokus Penuh' }, { icon: '📈', label: 'Progress Cepat' }, { icon: '🤝', label: 'Tutor Personal' }].map((item, i) => (
                  <div key={i} className="bg-cream rounded-xl p-3 text-center">
                    <div className="text-lg mb-1">{item.icon}</div>
                    <div className="text-navy text-xs font-bold">{item.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/private-class" className="block text-center bg-gold text-navy font-bold px-6 py-3 rounded-full text-sm hover:bg-navy hover:text-white transition-colors">Daftar Private</Link>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100">
              <div className="text-center mb-6">
                <span className="inline-block bg-cyan text-white text-xs font-bold px-4 py-1.5 rounded-full">Semi-Private</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="bg-cream rounded-xl p-3 text-center">
                  <div className="text-navy text-sm font-bold">Olimpiade</div>
                </div>
                <div className="bg-cream rounded-xl p-3 text-center">
                  <div className="text-navy text-sm font-bold">Matematika Dasar</div>
                </div>
                <div className="bg-cream rounded-xl p-3 text-center">
                  <div className="text-navy text-sm font-bold">Program TKA</div>
                </div>
              </div>
              <Link href="/kelas-aktif" className="block text-center bg-cyan text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-navy transition-colors">Lihat Kelas</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy leading-tight">Pertanyaan yang Sering <br /> Diajukan <span className="text-gold">(FAQ)</span></h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 md:px-8 md:py-5 text-left">
                  <span className="font-bold text-navy text-sm md:text-base pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gold shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 md:px-8 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4 whitespace-pre-line">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">Masih ada yang dibingungkan terkait program?</p>
            <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 md:gap-3 bg-navy text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-sm md:text-lg shadow-xl hover:bg-gold transition-all duration-300 transform hover:-translate-y-1">
              Konsultasikan dengan Kami
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== TUTOR CTA ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-cream to-cyan/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img src="/images/daftar-jadi-tutor-mathematalk.webp" alt="Daftar Jadi Tutor" className="rounded-3xl shadow-xl w-full max-w-md mx-auto" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy leading-tight">Ingin Jadi Tutor di <br /><span className="text-gold">Mathematalk</span>?</h2>
              <p className="mt-3 text-gray-500 font-medium">Untuk kamu yang tertarik menjadi Tutor di Mathematalk.</p>
              <a href="https://forms.gle/8T8hniRcJNdPFh778" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-black text-sm md:text-base shadow-xl hover:bg-gold transition-all duration-300 transform hover:-translate-y-1">
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORE MODAL ===== */}
      {showStoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowStoreModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-black text-sm md:text-base">✨ BUKU & MODUL PILIHAN</h3>
              <button onClick={() => setShowStoreModal(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8 md:p-10 text-center">
              <div className="w-20 h-20 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📚</span>
              </div>
              <h4 className="text-xl md:text-2xl font-black text-navy mb-3">Segera Hadir!</h4>
              <p className="text-gray-500 font-medium text-sm mb-6">Buku dan modul belajar eksklusif dari Mathematalk akan segera tersedia untuk membantu persiapan olimpiade anak Anda.</p>
              <Link href="/store" onClick={() => setShowStoreModal(false)} className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-full font-black text-sm shadow-xl hover:bg-navy transition-all duration-300">
                Kunjungi Toko
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== STORE TRIGGER ===== */}
      <div className="fixed bottom-6 right-6 z-40">
        <button onClick={() => setShowStoreModal(true)} className="bg-gold text-white w-14 h-14 rounded-full shadow-xl hover:bg-navy transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110">
          📚
        </button>
      </div>

      <Footer />
    </>
  );
}
