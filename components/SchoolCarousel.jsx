'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

export default function SchoolCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const visibleCount = 5;
  const maxIndex = Math.max(0, images.length - visibleCount);

  const slideLeft = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const slideRight = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  if (!images || images.length === 0) return null;

  const visibleImages = images.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="relative w-full">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      {/* Prev Button */}
      <button
        onClick={slideLeft}
        disabled={currentIndex === 0}
        className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
          currentIndex === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-navy hover:bg-gold hover:text-white'
        }`}
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Carousel Track */}
      <div
        ref={containerRef}
        className="flex items-center gap-6 overflow-hidden px-4 py-6"
      >
        <div
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(0)` }}
        >
          {visibleImages.map((src, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-36 h-20 sm:w-44 sm:h-24 bg-white rounded-2xl shadow-sm border border-navy/5 flex items-center justify-center p-3 hover:shadow-md transition-shadow"
            >
              <Image
                src={src}
                alt={`School logo ${currentIndex + idx + 1}`}
                width={160}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={slideRight}
        disabled={currentIndex >= maxIndex}
        className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
          currentIndex >= maxIndex
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-navy hover:bg-gold hover:text-white'
        }`}
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      {images.length > visibleCount && (
        <div className="flex justify-center gap-1.5 mt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-gold w-4' : 'bg-navy/20'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
