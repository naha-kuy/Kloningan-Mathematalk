'use client';

import { useState, useEffect } from 'react';

const schools = [
  { name: 'Marsden Park', img: 'marsden-park.webp' },
  { name: 'MPS', img: 'mps.webp' },
  { name: 'Binus School', img: 'binus-school.webp' },
  { name: 'Cita Hati', img: 'cita-hati.webp' },
  { name: 'Global Prestasi School', img: 'gps.webp' },
  { name: 'Sekolah Pahoa', img: 'pahoa.webp' },
  { name: 'Xin Zhong School', img: 'xin-zhong.webp' },
  { name: 'Sekolah Athalia', img: 'athalia.webp' },
  { name: 'Alta Global School', img: 'alta-global.webp' },
  { name: 'BPK Penabur', img: 'bpk-penabur.webp' },
  { name: 'SMA Pradita Dirgantara', img: 'pradita-dirgantara.webp' },
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
  { name: 'SD Santa Theresia', img: '23. SD Santa Theresia.webp' },
  { name: 'EIBOS Lampung', img: '24. eibos lampung.webp' },
  { name: 'SMP Xaverius', img: '25. smp-xaverius-3-bdl.webp' },
];

export default function SchoolCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPerView = () => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 5;
  };

  const [perView, setPerView] = useState(5);
  const totalSlides = schools.length;
  const maxIndex = Math.max(0, totalSlides - perView);

  useEffect(() => {
    const handleResize = () => setPerView(getPerView());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [perView, maxIndex, currentIndex]);

  const slideWidth = 100 / perView;

  return (
    <>
      <div className="sc-carousel">
        <button onClick={() => setCurrentIndex(p => Math.max(0, p - 1))} disabled={currentIndex === 0} className="sc-btn sc-btn-prev" aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="sc-window">
          <div className="sc-fade-left" />
          <div className="sc-fade-right" />
          <div className="sc-track" style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}>
            {schools.map((s, i) => (
              <div key={i} className="sc-slide">
                <img src={`/images/schools/${encodeURI(s.img)}`} alt={s.name} title={s.name} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setCurrentIndex(p => Math.min(maxIndex, p + 1))} disabled={currentIndex >= maxIndex} className="sc-btn sc-btn-next" aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="sc-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => setCurrentIndex(i)} className={`sc-dot ${i === currentIndex ? 'active' : ''}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      <style jsx>{`
        .sc-carousel {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }
        .sc-window {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
        .sc-fade-left, .sc-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .sc-fade-left { left: 0; background: linear-gradient(to right, #ffffff, transparent); }
        .sc-fade-right { right: 0; background: linear-gradient(to left, #ffffff, transparent); }
        .sc-track {
          display: flex;
          align-items: center;
          gap: 2rem;
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
          padding: 1.5rem 0;
        }
        .sc-slide {
          flex: 0 0 calc(${slideWidth}% - 1.6rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sc-slide img {
          height: 7.5rem;
          width: 100%;
          max-width: 180px;
          object-fit: contain;
          filter: grayscale(0.15);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .sc-slide img:hover {
          filter: grayscale(0);
          transform: scale(1.08);
        }
        .sc-btn {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          color: #1e3a5f;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
          z-index: 10;
        }
        .sc-btn:hover:not(:disabled) {
          background: #1e3a5f;
          border-color: #1e3a5f;
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(30,58,95,0.25);
          transform: scale(1.08);
        }
        .sc-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: scale(1);
        }
        .sc-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        .sc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
        }
        .sc-dot.active {
          background: #1e3a5f;
          width: 24px;
          border-radius: 4px;
        }
        @media (max-width: 767px) {
          .sc-slide { flex: 0 0 calc(50% - 1rem); }
          .sc-slide img { height: 5rem; }
          .sc-btn { width: 2.25rem; height: 2.25rem; }
          .sc-btn svg { width: 18px; height: 18px; }
          .sc-fade-left, .sc-fade-right { width: 40px; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .sc-slide { flex: 0 0 calc(33.333% - 1.35rem); }
        }
      `}</style>
    </>
  );
}
