import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Movie, Show } from '@/data/imdbData';

interface SimpleMovieCardProps {
  item: Movie | Show;
}

const SimpleMovieCard: React.FC<SimpleMovieCardProps> = ({ item }) => {
  const href = item.type === 'movie' ? `/movies/${item.id}` : `/tv-shows/${item.id}`;
  
  return (
    <Link href={href} className="block group">
      <div className="relative w-full bg-surface/90 border border-border/40 rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-all hover:border-primary/50 hover:scale-105">
        <img 
          src={item.poster} 
          alt={item.title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-text-primary font-semibold text-sm truncate mb-1">
            {item.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-text-primary font-medium">{item.rating.toFixed(1)}</span>
            </div>
            
            {item.year && (
              <span className="text-text-secondary/80">{item.year}</span>
            )}
          </div>
          
          {item.genres && item.genres.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {item.genres.slice(0, 2).map((genre) => (
                <span 
                  key={genre}
                  className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SimpleMovieCard;

