"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { imdbMovies } from '@/data/imdbData';
import CarouselCard from './carousel/CarouselCard';
import FeaturedCard from './carousel/FeaturedCard';
import CarouselNavigation from './carousel/CarouselNavigation';
import CarouselIndicators from './carousel/CarouselIndicators';
import { VisibleMovie } from './carousel/types';

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

  const visibleMovies = useMemo<VisibleMovie[]>(() => {
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

  const handleCardClick = (targetIndex: number) => {
    setCenterIndex(targetIndex);
  };

  const handlePrevious = () => {
    setCenterIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCenterIndex((prev) => Math.min(movies.length - 1, prev + 1));
  };

  if (!movies.length) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-b from-background via-background/95 to-surface/80 py-12 md:py-16 pb-20 md:pb-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6 md:mb-8 text-right">
        <h2 className="inline-block bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg text-2xl md:text-3xl font-bold text-white mb-2">پیشنهاد ویژه</h2>
        <p className="inline-block bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm md:text-base text-text-secondary/80">فیلم‌های برگزیده این هفته</p>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[420px] flex items-center justify-center">
        <CarouselNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={centerIndex > 0}
          canGoNext={centerIndex < movies.length - 1}
        />

        {visibleMovies.map(({ movie, offset, isCentered }) => {
          const actualIndex = movies.findIndex((m) => m.id === movie.id);

          return (
            <div
              key={`${movie.id}-${offset}`}
              className="absolute transition-all duration-700 ease-out"
              style={{
                transform: `translateX(${-offset * 280}px) scale(${isCentered ? 1 : 0.75})`,
                zIndex: isCentered ? 10 : 6 - Math.abs(offset),
                opacity: isCentered ? 1 : 0.35,
              }}
            >
              {!isCentered ? (
                <CarouselCard
                  movie={movie}
                  onClick={() => handleCardClick(actualIndex)}
                />
              ) : (
                <FeaturedCard movie={movie} />
              )}
            </div>
          );
        })}
      </div>

      {/* اندیکاتورها */}
      <CarouselIndicators
        total={movies.length}
        activeIndex={centerIndex}
        onSelect={setCenterIndex}
      />
    </div>
  );
};

export default FeaturedCarousel;
