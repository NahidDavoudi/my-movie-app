"use client";

import React, { useState, useMemo } from 'react';
import { imdbMovies, imdbShows } from '@/data/imdbData';
import styles from '@/components/noScrollbar.module.css';
import SimpleMovieCard from '@/components/atoms/movie-section/SimpleMovieCard';
import MediaTypeToggle from '@/components/atoms/movie-section/MediaTypeToggle';
import SectionHeader from '@/components/atoms/movie-section/SectionHeader';
import Button from '@/components/atoms/Button';

const MovieSection = () => {
  const [activeType, setActiveType] = useState<'films' | 'shows'>('films');

  const media = useMemo(() => {
    return activeType === 'films' ? imdbMovies : imdbShows;
  }, [activeType]);

  return (
    <section className="w-full max-w-7xl mx-auto py-4">
      <div className="bg-gradient-to-b from-[#7c9feb]/10 to-[#ffffff]/10 backdrop-blur-sm rounded-3xl p-2 overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 bg-[#dfe3ee]/50 backdrop-blur-sm rounded-full p-1.5">
          <SectionHeader title="Newest" />
          <MediaTypeToggle activeType={activeType} onTypeChange={setActiveType} />
        </div>

        {/* Movie Cards - Horizontal Scroll */}
        <div className={`overflow-x-auto pb-2 ${styles.noScrollbar}`}>
          <div className="flex gap-4 snap-x snap-mandatory px-4">
            {media.map((item) => (
              <div key={item.id} className="snap-start shrink-0 w-40 sm:w-48 md:w-56">
                <SimpleMovieCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Explore All Button */}
        <div className="mt-6 flex justify-center">
          <Button color="primary">Explore All →</Button>
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
