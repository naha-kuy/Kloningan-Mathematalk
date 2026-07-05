'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const programs = [
  {
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'Olimpiade',
    desc: 'Materi OSN/KSN mendalam untuk mencetak juara dari tingkat Kabupaten hingga Nasional.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Program TKA',
    desc: 'Persiapan ujian kenaikan level untuk mengukur dan meningkatkan standar kemampuan matematika siswa.',
  },
  {
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    title: 'Matematika Dasar',
    desc: 'Memperkuat pondasi matematika sekolah agar lebih percaya diri di kelas.',
  },
  {
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    title: 'Custom Program',
    desc: 'Kurikulum yang didesain khusus sesuai kebutuhan spesifik setiap siswa.',
  },
];

const keunggulan = [
  {
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    title: '1-on-1 Focus',
    desc: 'Interaksi intensif antara tutor dan siswa tanpa gangguan dari siswa lain.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Jadwal Fleksibel',
    desc: 'Pilih waktu belajar yang paling nyaman, bisa pagi, siang, atau malam.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Progress Report',
    desc: 'Laporan perkembangan berkala untuk memantau peningkatan kemampuan siswa.',
  },
];

const testimonials = [
  { name: 'Bapak Pramono', role: 'Orang Tua Siswa SD', initials: 'BP', text: 'Kelas private sangat membantu anak saya fokus persiapan OSN. Tutornya asyik dan cara penjelasannya sangat mudah dimengerti.' },
  { name: 'Sarah Amira', role: 'Siswa SMA', initials: 'SA', text: 'Bisa atur jadwal sendiri itu ngebantu banget buat aku yang sibuk kegiatan sekolah. Materi TKA jadi berasa jauh lebih gampang!' },
  { name: 'Ibu Bella', role: 'Orang Tua Siswa SMP', initials: 'IB', text: 'Kurikulumnya bener-bener disesuaiin sama apa yang anak saya butuhin. Gak nyesel pilih Mathematalk buat kelas private.' },
];

export default function PrivateClassPage() {
  const [form, setForm] = useState({
    parentName: '', region: '', phone: '', classType: 'Olimpiade',
    childName: '', jenjang: 'SD', grade: '', school: '', pernahJuara: 'Tidak',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert('Pendaftaran berhasil! Tim kami akan segera menghubungi Anda.');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-navy relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 opacity-10">
            <svg viewBox="0 0 200 200"><path fill="#F59E0B" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.2,88.5,-0.7C87,14.8,81.4,29.6,72.9,42.6C64.4,55.6,53,66.8,39.6,74.4C26.2,82,10.8,86,-4.2,84.5C-19.2,83,-33.8,76,-46.2,65.6C-58.6,55.2,-68.8,41.4,-75.6,25.8C-82.4,10.2,-85.8,-7.2,-80.9,-21.6C-76,-36,-62.8,-47.4,-48.4,-54.6C-34,-61.8,-18.4,-64.8,-2.5,-61.8C13.4,-58.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-4">
                  PROGRAM UNGGULAN: KELAS PRIVATE
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  Belajar Lebih Fokus,<br />Raih Prestasi<br />Maksimal!
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
                  Satu-satunya program yang memberikan perhatian 100% kepada anak Anda. Kurikulum yang dipersonalisasi khusus untuk persiapan Olimpiade dan Ujian Kenaikan Level (TKA).
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <a href="#daftar" className="btn-kidzy bg-gold text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-lg shadow-gold/30">
                    Daftar Sekarang
                  </a>
                  <a href="https://wa.me/6289631322828" target="_blank" rel="noopener noreferrer" className="btn-kidzy border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base hover:bg-white hover:text-navy">
                    Tanya Dulu
                  </a>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center">
                <img src="/images/foto-kelas-private-mathematalk.webp" alt="Private Tutoring"
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white py-8 md:py-12 border-b border-navy/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold text-gold">100%</div>
                <div className="text-sm md:text-base text-navy/60 font-semibold">Focus Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-extrabold text-cyan">98%</div>
                <div className="text-sm md:text-base text-navy/60 font-semibold">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* KENAPA PRIVATE */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy leading-tight">
                Kenapa Kelas Private<br />Sangat <span className="text-gold">Efektif</span>?
              </h2>
              <p className="mt-3 text-navy/60 max-w-2xl mx-auto">
                Setiap anak unik. Di Kelas Private, kami menyesuaikan kecepatan belajar, metode penjelasan, dan materi sesuai dengan karakter anak Anda.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {programs.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={p.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{p.title}</h3>
                  <p className="text-sm text-navy/60 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JENJANG */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-8">Pilihan Jenjang Kelas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'SD', range: 'Kelas 1 - 6' },
                { name: 'SMP', range: 'Kelas 1 - 3' },
                { name: 'SMA', range: 'Kelas 1 - 3 / UMUM' },
              ].map((j, i) => (
                <div key={i} className="bg-cream rounded-2xl p-6 shadow-md border border-navy/5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-navy">{j.name}</h3>
                  <p className="text-gold font-semibold text-sm">{j.range}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-gold/5 rounded-2xl p-6 border border-gold/10">
              <p className="text-navy/70 text-sm">Mau custom program? Kami siap mendesain kurikulum khusus sesuai kebutuhan spesifik Anda.</p>
            </div>
          </div>
        </section>

        {/* KEUNGGULAN */}
        <section className="py-16 md:py-24 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Keunggulan Utama Kami
              </h2>
              <p className="mt-3 text-white/60">Kami tidak hanya mengajar, kami membimbing untuk mencetak juara.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
              {keunggulan.map((k, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={k.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{k.title}</h3>
                  <p className="text-sm text-white/60">{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-gold font-bold text-sm mb-2">4.9/5 dari 500+ Siswa Private</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">Apa Kata Mereka?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-navy/70 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm">{t.initials}</div>
                    <div>
                      <p className="font-bold text-navy text-sm">{t.name}</p>
                      <p className="text-xs text-navy/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-gold/10 via-cream to-cyan/10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
              Siap Menjadi Juara Berikutnya?
            </h2>
            <p className="mt-4 text-navy/60 text-lg">Jangan tunda kesuksesan anak Anda. Amankan slot Kelas Private sekarang juga!</p>
            <a href="#daftar" className="inline-block mt-8 btn-kidzy btn-kidzy-gold px-8 py-3.5 text-lg font-bold">
              Daftar Sekarang
            </a>
          </div>
        </section>

        {/* REGISTRATION FORM */}
        <section id="daftar" className="py-16 md:py-24 bg-cream scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy text-center mb-8">Form Pendaftaran Kelas Private Mathematalk</h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl space-y-8">
              <div>
                <h3 className="text-lg font-extrabold text-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm">1</span>
                  Data Pendaftar
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Nama Orang Tua</label>
                    <input type="text" required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Asal Daerah</label>
                    <input type="text" required value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Nomor WA</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Tipe Kelas</label>
                    <div className="flex flex-wrap gap-3">
                      {['Olimpiade', 'Matematika Dasar', 'Program TKA'].map((t) => (
                        <button key={t} type="button" onClick={() => setForm({ ...form, classType: t })}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${form.classType === t ? 'bg-gold text-white shadow-lg' : 'bg-cream text-navy border border-navy/20 hover:border-gold'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-navy/10" />

              <div>
                <h3 className="text-lg font-extrabold text-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm">2</span>
                  Data Anak
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
                    <input type="text" required value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Jenjang</label>
                      <select value={form.jenjang} onChange={(e) => setForm({ ...form, jenjang: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold">
                        <option>SD</option><option>SMP</option><option>SMA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Kelas</label>
                      <input type="text" required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Nama Sekolah</label>
                    <input type="text" required value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-cream text-navy focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Sudah pernah juara Olimpiade?</label>
                    <div className="flex gap-4">
                      {['Ya', 'Tidak'].map((o) => (
                        <label key={o} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="pernahJuara" checked={form.pernahJuara === o} onChange={() => setForm({ ...form, pernahJuara: o })}
                            className="w-4 h-4 text-gold focus:ring-gold" />
                          <span className="text-sm text-navy">{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full btn-kidzy btn-kidzy-gold px-6 py-4 text-base disabled:opacity-50 text-lg">
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
