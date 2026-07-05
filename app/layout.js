import './globals.css';

export const metadata = {
  title: 'Mathematalk - Taklukkan Olimpiade!',
  description: 'Partner terpercaya persiapan olimpiade matematika. Bimbingan dari para juara untuk meraih prestasi tertinggi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="bg-[#FFF9F2] text-[#0D2B5E] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
