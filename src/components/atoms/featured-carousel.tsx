"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Clapperboard, ChevronLeft, ChevronRight, Play, Star, Users } from 'lucide-react';
import { imdbMovies, Movie } from '@/data/imdbData';

const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2] as const;

const FeaturedCarousel = () => {
  const movies = useMemo<Movie[]>(() => {
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
    <div className="w-full bg-gradient-to-b from-background via-background/95 to-surface/80 py-16 pb-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">پیشنهاد ویژه</h2>
        <p className="text-text-secondary/80">فیلم‌های برگزیده این هفته</p>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[600px] flex items-center justify-center">
        {/* دکمه راست */}
        <button
          onClick={() => setCenterIndex((prev) => Math.max(0, prev - 1))}
          disabled={centerIndex === 0}
          className="absolute right-4 z-20 bg-surface/90 hover:bg-surface border border-border/60 text-text-primary p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
          aria-label="قبلی"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* دکمه چپ */}
        <button
          onClick={() => setCenterIndex((prev) => Math.min(movies.length - 1, prev + 1))}
          disabled={centerIndex === movies.length - 1}
          className="absolute left-4 z-20 bg-surface/90 hover:bg-surface border border-border/60 text-text-primary p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
          aria-label="بعدی"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {visibleMovies.map(({ movie, offset, isCentered }) => (
          <div
            key={`${movie.id}-${offset}`}
            className="absolute transition-all duration-700 ease-out"
            style={{
              transform: `translateX(${offset * 340}px) scale(${isCentered ? 1 : 0.75})`,
              zIndex: isCentered ? 10 : 6 - Math.abs(offset),
              opacity: isCentered ? 1 : 0.35
            }}
          >
            {/* کارت عادی (کناری‌ها) */}
            {!isCentered && (
              <div className="w-52 bg-surface/90 border border-border/40 rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-text-primary font-semibold text-sm truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-text-primary text-sm">{movie.rating.toFixed(1)}</span>
                    {movie.year && (
                      <span className="text-text-secondary/70 text-xs">• {movie.year}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* کارت ویژه (وسط) - لایوت دو ستونه */}
            {isCentered && (
              <div className="w-[850px] max-w-[95vw] bg-surface/95 border border-border rounded-2xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.7)] backdrop-blur">
                <div className="flex flex-row">
                  {/* ستون راست - پوستر */}
                  <div className="relative w-[320px] flex-shrink-0">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge امتیاز */}
                    <div className="absolute top-4 right-4 bg-background/80 border border-border/40 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-text-primary font-bold">{movie.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* ستون چپ - اطلاعات */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* عنوان */}
                    <h3 className="text-text-primary font-bold text-2xl mb-3 leading-tight">
                      {movie.title}
                    </h3>

                    {/* متا دیتا */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary/80 mb-4">
                      {movie.year && <span>{movie.year}</span>}
                      <span>•</span>
                      <span>رتبه #{movie.rank}</span>
                    </div>

                    {/* ژانرها */}
                    {movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.slice(0, 4).map((genre) => (
                          <span 
                            key={genre}
                            className="px-3 py-1 rounded-full bg-border/10 text-text-secondary/90 text-xs border border-border/30"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* اطلاعات اضافی */}
                    {movie.director && (
                      <div className="flex items-start gap-2 text-sm text-text-secondary/90 mb-3">
                        <Clapperboard className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p>
                          <span className="text-text-primary font-semibold">کارگردان:</span> {movie.director}
                        </p>
                      </div>
                    )}

                    {movie.cast && movie.cast.length > 0 && (
                      <div className="flex items-start gap-2 text-sm text-text-secondary/90 mb-4">
                        <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p>
                          <span className="text-text-primary font-semibold">بازیگران:</span> {movie.cast.slice(0, 3).join('، ')}
                        </p>
                      </div>
                    )}

                    {/* توضیحات */}
                    {movie.plot && (
                      <p className="text-text-secondary/85 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {movie.plot}
                      </p>
                    )}

                    {/* دکمه */}
                    <Link href={`/movies/${movie.id}`} className="mt-auto">
                      <button className="w-full bg-primary hover:bg-primary-light text-text-primary font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                        <Play className="w-5 h-5 fill-current" />
                        <span>جزئیات بیشتر</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* اندیکاتورها (نقطه‌ها) */}
      <div className="flex justify-center gap-2 mt-8">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCenterIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === centerIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-border/40 hover:bg-border/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;