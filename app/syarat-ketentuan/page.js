import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sections = [
  {
    title: 'Ketentuan Umum',
    content: 'Dengan mengakses dan menggunakan platform Mathematalk, Anda menyetujui untuk terikat oleh syarat dan ketentuan yang berlaku. Jika Anda tidak setuju dengan sebagian atau seluruh ketentuan ini, mohon untuk tidak menggunakan layanan kami. Mathematalk berhak mengubah syarat dan ketentuan sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan akan berlaku efektif sejak dipublikasikan di halaman ini.',
  },
  {
    title: 'Pendaftaran Akun',
    content: 'Pengguna wajib mendaftar dengan data yang benar, lengkap, dan akurat. Setiap akun bersifat pribadi dan tidak dapat dialihkan kepada pihak lain. Pengguna bertanggung jawab penuh atas kerahasiaan kata sandi dan segala aktivitas yang terjadi dalam akunnya. Mathematalk berhak menonaktifkan akun jika ditemukan pelanggaran atau penyalahgunaan.',
  },
  {
    title: 'Pendaftaran Program',
    content: 'Pendaftaran program dilakukan melalui website dengan memilih kelas yang tersedia. Pendaftaran dianggap sah setelah pembayaran diterima dan dikonfirmasi oleh pihak Mathematalk. Kuota peserta terbatas dan pendaftaran akan ditutup apabila kuota telah terpenuhi. Mathematalk berhak menolak pendaftaran tanpa memberikan alasan.',
  },
  {
    title: 'Pembayaran',
    content: 'Pembayaran dilakukan sesuai dengan nominal yang tertera pada halaman program. Metode pembayaran yang tersedia akan diinformasikan pada saat pendaftaran. Pembayaran harus dilakukan sebelum batas waktu yang ditentukan. Keterlambatan pembayaran dapat mengakibatkan pembatalan pendaftaran secara otomatis.',
  },
  {
    title: 'Pembatalan dan Refund',
    content: 'Pembatalan pendaftaran oleh peserta dikenakan biaya administrasi sebesar 20% dari total biaya program. Pembatalan dilakukan maksimal 7 hari sebelum program dimulai. Setelah program berjalan, tidak ada pengembalian biaya. Mathematalk berhak membatalkan program jika jumlah peserta tidak mencukupi, dengan pengembalian biaya penuh kepada peserta.',
  },
  {
    title: 'Hak Kekayaan Intelektual',
    content: 'Seluruh materi pembelajaran, kurikulum, modul, dan konten yang disediakan oleh Mathematalk adalah hak kekayaan intelektual milik Mathematalk. Peserta dilarang menggandakan, mendistribusikan, atau menyebarluaskan materi tanpa izin tertulis dari Mathematalk.',
  },
  {
    title: 'Kewajiban Peserta',
    content: 'Peserta wajib mengikuti kegiatan belajar sesuai jadwal yang ditentukan. Peserta diharapkan bersikap sopan dan profesional selama proses pembelajaran. Peserta dilarang merekam, menyebarluaskan, atau menyalahgunakan sesi pembelajaran untuk kepentingan komersial. Pelanggaran dapat mengakibatkan pembatalan keikutsertaan tanpa pengembalian biaya.',
  },
  {
    title: 'Batasan Tanggung Jawab',
    content: 'Mathematalk tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan layanan kami. Kami tidak menjamin bahwa platform akan bebas dari gangguan atau kesalahan teknis. Mathematalk tidak bertanggung jawab atas prestasi atau hasil yang dicapai peserta setelah mengikuti program.',
  },
  {
    title: 'Privasi dan Data',
    content: 'Data pribadi peserta akan dikelola sesuai dengan Kebijakan Privasi yang berlaku. Dengan mendaftar, peserta menyetujui pengumpulan dan penggunaan data sebagaimana dijelaskan dalam Kebijakan Privasi Mathematalk.',
  },
  {
    title: 'Ketentuan Lain',
    content: 'Jika salah satu ketentuan dalam syarat dan ketentuan ini dinyatakan tidak sah atau tidak dapat diberlakukan, ketentuan lainnya tetap berlaku penuh. Syarat dan ketentuan ini diatur oleh hukum Indonesia. Setiap sengketa akan diselesaikan melalui musyawarah atau jalur hukum yang berlaku di Indonesia.',
  },
];

export default function SyaratKetentuanPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Syarat & <span className="text-gold">Ketentuan</span>
            </h1>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Aturan yang mengatur penggunaan layanan Mathematalk</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-navy/60 mb-10 leading-relaxed">
              Dengan menggunakan platform dan layanan Mathematalk, Anda menyetujui syarat dan ketentuan 
              berikut. Harap baca dengan saksama sebelum menggunakan layanan kami.
            </p>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="text-xl md:text-2xl font-bold text-navy mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center text-sm font-extrabold shrink-0">{i + 1}</span>
                    {s.title}
                  </h2>
                  <p className="text-navy/70 leading-relaxed ml-11">{s.content}</p>
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
