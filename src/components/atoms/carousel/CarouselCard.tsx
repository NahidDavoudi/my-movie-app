import React from 'react';
import { Star } from 'lucide-react';
import { CarouselCardProps } from './types';

const CarouselCard: React.FC<CarouselCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="w-40 bg-surface/90 border border-border/40 rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.55)] backdrop-blur-sm cursor-pointer hover:border-primary/50 transition-all"
    >
      <img 
        src={movie.poster} 
        alt={movie.title}
        className="w-full h-60 object-cover"
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
  );
};

export default CarouselCard;

