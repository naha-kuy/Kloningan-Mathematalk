import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const posts = [
  {
    title: 'Tips Sukses Menghadapi OSN Matematika SD',
    excerpt: 'Persiapan matang adalah kunci sukses OSN. Simak tips dan strategi dari para juara untuk menghadapi OSN Matematika tingkat SD.',
    date: '15 Juni 2026',
    image: null,
  },
  {
    title: 'Mengapa Olimpiade Matematika Penting bagi Anak?',
    excerpt: 'Olimpiade matematika tidak hanya mengasah kemampuan berhitung, tetapi juga membentuk karakter dan pola pikir logis sejak dini.',
    date: '10 Juni 2026',
    image: null,
  },
  {
    title: 'Peran Orang Tua dalam Mendukung Persiapan OSN',
    excerpt: 'Dukungan orang tua sangat berpengaruh terhadap keberhasilan anak dalam olimpiade. Berikut peran yang bisa Anda lakukan.',
    date: '5 Juni 2026',
    image: null,
  },
  {
    title: 'Strategi Belajar Matematika Efektif untuk Anak SD',
    excerpt: 'Metode belajar yang tepat dapat membuat matematika menjadi menyenangkan dan mudah dipahami oleh anak-anak.',
    date: '28 Mei 2026',
    image: null,
  },
  {
    title: 'Mengenal Jenis-jenis Soal OSN Matematika',
    excerpt: 'Pahami berbagai tipe soal yang sering muncul di OSN Matematika agar persiapan lebih terarah dan efektif.',
    date: '20 Mei 2026',
    image: null,
  },
  {
    title: 'Kisah Sukses: Dari Siswa Biasa Menjadi Juara OSN',
    excerpt: 'Inspirasi dari alumni Mathematalk yang berhasil meraih medali emas OSN setelah mengikuti program pembinaan intensif.',
    date: '15 Mei 2026',
    image: null,
  },
  {
    title: 'Cara Memilih Bimbel Olimpiade yang Tepat',
    excerpt: 'Bingung memilih bimbingan olimpiade? Simak panduan lengkap memilih lembaga yang sesuai dengan kebutuhan anak Anda.',
    date: '10 Mei 2026',
    image: null,
  },
  {
    title: 'Manfaat Belajar Matematika di Luar Sekolah',
    excerpt: 'Pembelajaran tambahan di luar sekolah dapat memberikan perspektif baru dan memperdalam pemahaman matematika siswa.',
    date: '5 Mei 2026',
    image: null,
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Blog <span className="text-gold">Mathematalk</span>
            </h1>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Tips, wawasan, dan inspirasi seputar olimpiade matematika</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-navy/5 group">
                  <div className="h-48 bg-gradient-to-br from-gold/20 to-cyan/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-navy/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-xs text-navy/50 font-semibold mb-2">{post.date}</p>
                    <h3 className="font-bold text-navy mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                    <p className="text-sm text-navy/60 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4">
                      <span className="text-gold font-semibold text-sm group-hover:underline">Baca Selengkapnya</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
