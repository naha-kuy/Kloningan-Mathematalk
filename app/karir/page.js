import Header from '@/components/Header';
import Footer from '@/components/Footer';

const positions = [
  {
    title: 'Tutor Matematika Olimpiade',
    type: 'Full-time / Part-time',
    location: 'Malang / Online',
    desc: 'Mengajar dan membimbing siswa SD/SMP/SMA dalam persiapan olimpiade matematika. Diutamakan memiliki pengalaman OSN/IMO atau latar belakang pendidikan matematika.',
  },
  {
    title: 'Pengembang Kurikulum Matematika',
    type: 'Full-time',
    location: 'Malang',
    desc: 'Menyusun dan mengembangkan materi pembelajaran olimpiade matematika yang inovatif dan sesuai standar kompetisi terkini.',
  },
  {
    title: 'Staff Administrasi & Marketing',
    type: 'Full-time',
    location: 'Malang',
    desc: 'Mengelola administrasi pendaftaran, komunikasi dengan orang tua siswa, serta mengembangkan strategi pemasaran untuk menjangkau lebih banyak siswa.',
  },
  {
    title: 'Frontend Developer',
    type: 'Part-time / Freelance',
    location: 'Remote',
    desc: 'Mengembangkan dan memelihara platform website Mathematalk menggunakan Next.js dan Tailwind CSS. Diutamakan yang berpengalaman dengan React dan integrasi API.',
  },
];

export default function KarirPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Bergabung dengan <span className="text-gold">Tim Mathematalk</span>
            </h1>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Jadilah bagian dari misi kami mencerdaskan bangsa melalui pendidikan matematika berkualitas</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy">Posisi yang Tersedia</h2>
              <p className="mt-2 text-navy/60">Temukan peran yang sesuai dengan keahlian Anda</p>
            </div>

            <div className="space-y-6">
              {positions.map((pos, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-navy/5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-navy">{pos.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold">{pos.type}</span>
                      <span className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-semibold">{pos.location}</span>
                    </div>
                  </div>
                  <p className="text-navy/70 leading-relaxed">{pos.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center border border-navy/5">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-3">Kirim Lamaran</h2>
              <p className="text-navy/70 max-w-xl mx-auto mb-6">
                Tidak melihat posisi yang cocok? Kirimkan lamaran spontan Anda ke tim kami. 
                Kami selalu terbuka untuk talenta hebat yang ingin berkontribusi.
              </p>
              <a
                href="mailto:karir@mathematalk.com?subject=Lamaran%20Kerja%20-%20Mathematalk"
                className="btn-kidzy btn-kidzy-gold px-8 py-3.5 text-base inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                kirim@mathematalk.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
