import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { CarouselCardProps } from './types';

const CarouselCard: React.FC<CarouselCardProps> = ({ movie, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleToggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      className="w-40 bg-surface/90 border border-border/40 rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.55)] backdrop-blur-sm cursor-pointer hover:border-primary/50 transition-all relative group"
    >
      <img 
        src={movie.poster} 
        alt={movie.title}
        className="w-full h-60 object-cover"
      />
      
      {/* Always visible title */}
      <div className="p-3 bg-surface/90">
        <h3 className="text-text-primary font-semibold text-sm truncate">
          {movie.title}
        </h3>
      </div>

      {/* Hover/Click overlay with details */}
      {showDetails && (
        <div 
          onClick={handleToggleDetails}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm p-3 flex flex-col justify-end"
        >
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-white text-sm font-semibold">{movie.rating.toFixed(1)}</span>
            {movie.year && (
              <span className="text-gray-300 text-xs">• {movie.year}</span>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span 
                  key={genre}
                  className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs border border-primary/30"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarouselCard;

