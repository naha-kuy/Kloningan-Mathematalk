import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sections = [
  {
    title: 'Pengumpulan Data',
    content: 'Kami mengumpulkan data pribadi yang Anda berikan secara sukarela saat mendaftar, mengisi formulir, atau berkomunikasi dengan kami. Data yang dikumpulkan meliputi nama lengkap, alamat email, nomor telepon, alamat rumah, informasi pembayaran, dan data akademik siswa (nilai, kelas, sekolah). Kami juga mengumpulkan data penggunaan website secara otomatis melalui cookies dan teknologi pelacakan lainnya untuk meningkatkan pengalaman pengguna.',
  },
  {
    title: 'Penggunaan Data',
    content: 'Data pribadi Anda digunakan untuk: (1) Memproses pendaftaran dan administrasi program, (2) Menyampaikan informasi terkait program, jadwal, dan pembayaran, (3) Memantau perkembangan akademik siswa, (4) Meningkatkan kualitas layanan dan pengembangan kurikulum, (5) Mengirimkan informasi promosi dan penawaran khusus (dengan persetujuan Anda), (6) Keperluan analisis dan riset internal untuk pengembangan platform.',
  },
  {
    title: 'Penyimpanan Data',
    content: 'Data pribadi Anda disimpan dalam sistem yang aman dengan enkripsi dan firewall yang memadai. Kami menyimpan data selama masa aktif akun Anda dan untuk jangka waktu yang diperlukan sesuai keperluan hukum dan operasional. Data yang tidak lagi diperlukan akan dihapus atau dianonimkan secara berkala.',
  },
  {
    title: 'Hak Pengguna',
    content: 'Anda memiliki hak untuk: (1) Mengakses data pribadi yang kami simpan, (2) Memperbarui atau memperbaiki data yang tidak akurat, (3) Meminta penghapusan data pribadi Anda, (4) Menolak penggunaan data untuk keperluan pemasaran, (5) Menarik persetujuan yang telah diberikan sebelumnya, (6) Mengajukan keluhan terkait pemrosesan data. Untuk menggunakan hak-hak tersebut, silakan hubungi kami melalui informasi kontak yang tersedia.',
  },
  {
    title: 'Keamanan Data',
    content: 'Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau perusakan. Langkah-langkah tersebut meliputi enkripsi data, kontrol akses, audit keamanan berkala, dan pelatihan kesadaran keamanan bagi staf kami.',
  },
  {
    title: 'Pengungkapan ke Pihak Ketiga',
    content: 'Kami tidak menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga. Data dapat diungkapkan kepada pihak ketiga yang terpercaya yang membantu kami dalam operasional bisnis (seperti penyedia layanan pembayaran dan hosting) dengan kewajiban kerahasiaan yang ketat. Kami juga dapat mengungkapkan data jika diwajibkan oleh hukum atau peraturan yang berlaku.',
  },
  {
    title: 'Cookies',
    content: 'Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna, menganalisis lalu lintas website, dan menyesuaikan konten. Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda. Dengan menggunakan website kami, Anda menyetujui penggunaan cookies sesuai dengan kebijakan ini.',
  },
  {
    title: 'Perubahan Kebijakan',
    content: 'Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan akan diumumkan melalui website kami dan berlaku efektif sejak tanggal publikasi. Kami menyarankan Anda untuk meninjau halaman ini secara berkala untuk mendapatkan informasi terbaru mengenai praktik privasi kami.',
  },
  {
    title: 'Kontak',
    content: 'Jika Anda memiliki pertanyaan, keluhan, atau permintaan terkait kebijakan privasi ini, silakan hubungi kami melalui email di info@mathematalk.com atau melalui nomor telepon +62 896-3132-2828.',
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-navy py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Kebijakan <span className="text-gold">Privasi</span>
            </h1>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">Bagaimana kami melindungi dan menggunakan data Anda</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-navy/60 mb-10 leading-relaxed">
              Kebijakan privasi ini menjelaskan bagaimana Mathematalk mengumpulkan, menggunakan, menyimpan, 
              dan melindungi data pribadi Anda. Dengan menggunakan layanan kami, Anda menyetujui praktik 
              yang dijelaskan dalam kebijakan ini.
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
