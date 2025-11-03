"use client"
import styles from '@/components/noScrollbar.module.css';
import Card from '@/components/molecules/Card';
import { useState } from 'react';
import { mockMovies } from '@/data/mockMovies';
import Button from '@/components/atoms/Button';
const MovieSection = () => {
  const [activeType, setActiveType] = useState('films');
  const movies = mockMovies;

  return (
    <section className=" w-full max-w-7xl mx-auto  py-4 ">
      
     <div className="bg-gradient-from-top to-background bg-[#7c9feb]/20 to-[#ffffff]/20 backdrop-blur-sm rounded-3xl p-3 overflow-hidden flex-row items-center justify-center">

        {/*section titles*/} 
        <div className="flex items-center justify-between mb-6 bg-[#dfe3ee]/50 backdrop-blur-sm rounded-full p-1.5">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2">
            <h2 className="text-base font-bold text-gray-800">Newest</h2>
          </div>
          {/* toggle buttons */}
        <div className="flex items-center gap-2 bg-surface/50 backdrop-blur-sm rounded-full p-1.5 border border-border/30">
          <button
            type="button"
            onClick={() => setActiveType('films')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeType === 'films'
                ? 'bg-primary-light text-primary shadow-neumorphic-card'
                : 'text-text-secondary hover:bg-surface/70'
            }`}
          >
            films
          </button>
          <button
            type="button"
            onClick={() => setActiveType('shows')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeType === 'shows'
                ? 'bg-primary-light text-primary shadow-neumorphic-card'
                : 'text-text-secondary hover:bg-surface/70'
            }`}
          >
            shows
          </button>
        </div>
        </div>

        {/* Movie Cards - Horizontal Scroll */}
         <div className={`overflow-x-auto pb-2 ${styles.noScrollbar}`}>
           <div className="flex gap-4 snap-x snap-mandatory px-4">
             {movies.map((movie) => (
              <div key={movie.id} className="flex flex-col items-center justify-center">
                <Card key={movie.id}>
                  <img src={movie.poster} alt={movie.title} />
                </Card>
                <h3 className="text-sm font-medium text-white/80">{movie.title}</h3>
              </div>
            ))}
           </div>
         </div>
        {/* Explore All Button */}
        <Button variant="primary">Explore All</Button>
      
      
      </div>
    </section>
  );
};

export default MovieSection;