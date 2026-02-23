'use client';

import { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CameraIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';

export interface PropertyGalleryCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

/**
 * Galeria tipo Zimmo: imagem central a cores, anterior e próxima em grayscale desvanecido,
 * com setas de navegação e contador (ex.: 6/24 Fotos).
 */
export function PropertyGalleryCarousel({
  images,
  title,
  className = '',
}: PropertyGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((total + index) % total);
    },
    [total]
  );

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  if (total === 0) return null;

  const heightClass = 'min-h-[300px] sm:min-h-[380px] lg:min-h-[420px]';

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-gray-900', className)}>
      {/* Desktop: 3 colunas (anterior grayscale | centro cores | próxima grayscale) */}
      <div className="hidden grid-cols-[1fr_2fr_1fr] gap-0 lg:grid">
        {/* Anterior – grayscale, fade, seta esquerda */}
        <button
          type="button"
          onClick={() => goTo(currentIndex - 1)}
          className={cn('relative flex items-center justify-center overflow-hidden', heightClass)}
          aria-label="Foto anterior"
        >
          <img
            src={images[prevIndex]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-50 transition-opacity hover:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800/90 text-white shadow-lg backdrop-blur-sm hover:bg-gray-700">
            <ChevronLeftIcon className="h-6 w-6" />
          </span>
        </button>

        {/* Centro – a cores */}
        <div className={cn('relative flex items-center justify-center overflow-hidden', heightClass)}>
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Próxima – grayscale, fade, seta direita */}
        <button
          type="button"
          onClick={() => goTo(currentIndex + 1)}
          className={cn('relative flex items-center justify-center overflow-hidden', heightClass)}
          aria-label="Próxima foto"
        >
          <img
            src={images[nextIndex]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-50 transition-opacity hover:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800/90 text-white shadow-lg backdrop-blur-sm hover:bg-gray-700">
            <ChevronRightIcon className="h-6 w-6" />
          </span>
        </button>
      </div>

      {/* Mobile/tablet: só centro, com setas sobrepostas */}
      <div className={cn('relative lg:hidden', heightClass)}>
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={title}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
          aria-label="Foto anterior"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => goTo(currentIndex + 1)}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
          aria-label="Próxima foto"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Contador: X / N Fotos */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
        <CameraIcon className="h-4 w-4" />
        <span>
          {currentIndex + 1} / {total} Fotos
        </span>
      </div>
    </div>
  );
}
