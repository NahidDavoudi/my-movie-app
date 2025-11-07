"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Star, Plus } from 'lucide-react';
import { imdbMovies } from '@/data/imdbData';

const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2] as const;

const FeaturedCarousel = () => {
  const movies = useMemo(() => {
    return [...imdbMovies]
      .filter((movie) => Boolean(movie.poster))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 7);
  }, []);

  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    if (!movies.length) return;
    setCenterIndex(Math.floor(movies.length / 2));
  }, [movies.length]);

  useEffect(() => {
    if (movies.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const visibleMovies = useMemo(() => {
    if (!movies.length) return [];

    return VISIBLE_OFFSETS.map((offset) => {
      const index = (centerIndex + offset + movies.length) % movies.length;
      return {
        movie: movies[index],
        offset,
        isCentered: offset === 0,
      };
    });
  }, [centerIndex, movies]);

  if (!movies.length) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-b from-background via-background/95 to-surface/80 py-12 md:py-16 pb-20 md:pb-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">پیشنهاد ویژه</h2>
        <p className="text-sm md:text-base text-text-secondary/80">فیلم‌های برگزیده این هفته</p>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[500px] md:h-[480px] lg:h-[500px] flex items-center justify-center">
        {/* دکمه‌های Navigation - فقط دسکتاپ */}
        <button
          onClick={() => setCenterIndex((prev) => Math.max(0, prev - 1))}
          disabled={centerIndex === 0}
          className="hidden md:flex absolute right-4 z-20 bg-surface/90 hover:bg-surface border border-border/60 text-text-primary p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
          aria-label="قبلی"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={() => setCenterIndex((prev) => Math.min(movies.length - 1, prev + 1))}
          disabled={centerIndex === movies.length - 1}
          className="hidden md:flex absolute left-4 z-20 bg-surface/90 hover:bg-surface border border-border/60 text-text-primary p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
          aria-label="بعدی"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {visibleMovies.map(({ movie, offset, isCentered }) => (
          <div
            key={`${movie.id}-${offset}`}
            className="absolute transition-all duration-700 ease-out"
            style={{
              transform: `translateX(${offset * (window.innerWidth < 768 ? 140 : 280)}px) scale(${isCentered ? 1 : 0.7})`,
              zIndex: isCentered ? 10 : 6 - Math.abs(offset),
              opacity: isCentered ? 1 : 0.3
            }}
          >
            {/* کارت عادی (کناری‌ها) */}
            {!isCentered && (
              <div className="w-32 sm:w-40 md:w-52 bg-surface/90 border border-border/40 rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="p-2 md:p-3">
                  <h3 className="text-text-primary font-semibold text-xs md:text-sm truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-1.5 md:gap-2 mt-1">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-primary fill-primary" />
                    <span className="text-text-primary text-xs md:text-sm">{movie.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* کارت ویژه (وسط) - مینیمال */}
            {isCentered && (
              <div className="relative group">
                {/* پوستر (همیشه نمایش) */}
                <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 bg-surface/95 border border-border rounded-2xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.7)] backdrop-blur">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                  
                  {/* Badge امتیاز */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-background/90 border border-border/40 backdrop-blur-sm px-3 py-1 md:px-4 md:py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary fill-primary" />
                    <span className="text-text-primary font-bold text-sm md:text-base">{movie.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* بخش اطلاعات (از سمت چپ slide می‌شه بیرون) */}
                <div className="absolute top-0 left-0 h-full w-0 group-hover:w-64 md:group-hover:w-72 lg:group-hover:w-80 transition-all duration-500 ease-out overflow-hidden">
                  <div className="h-full bg-surface/98 border-l border-border backdrop-blur-lg p-5 md:p-6 flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.5)]">
                    {/* عنوان */}
                    <h3 className="text-text-primary font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight">
                      {movie.title}
                    </h3>

                    {/* متا */}
                    <div className="flex items-center gap-2 text-xs md:text-sm text-text-secondary/80 mb-4">
                      {movie.year && <span>{movie.year}</span>}
                      {movie.year && <span>•</span>}
                      <span>رتبه #{movie.rank}</span>
                    </div>

                    {/* ژانرها (حداکثر 3 تا) */}
                    {movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-auto">
                        {movie.genres.slice(0, 3).map((genre) => (
                          <span 
                            key={genre}
                            className="px-2.5 py-1 rounded-full bg-border/10 text-text-secondary/90 text-xs border border-border/30"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* دکمه‌ها */}
                    <div className="mt-5 space-y-2">
                      <Link href={`/movies/${movie.id}`} className="block">
                        <button className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2.5 md:py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm md:text-base">
                          <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                          <span>جزئیات</span>
                        </button>
                      </Link>
                      
                      <button className="w-full bg-surface hover:bg-border/20 border border-border/50 text-text-primary font-medium py-2 md:py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                        <Plus className="w-4 h-4" />
                        <span>لیست من</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* اندیکاتورها */}
      <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8 px-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCenterIndex(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === centerIndex 
                ? 'w-6 md:w-8 bg-primary' 
                : 'w-1.5 md:w-2 bg-border/40 hover:bg-border/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
