import React from 'react';

interface GenreChipsProps {
  genres: string[];
  className?: string;
}

const GenreChips: React.FC<GenreChipsProps> = ({ genres, className = '' }) => {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {genres.map((genre, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs font-medium rounded-full bg-surface/90 text-white shadow-[3px_3px_6px_rgba(0,0,0,0.4),-3px_-3px_6px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.45),-4px_-4px_8px_rgba(255,255,255,0.06)] transition-all cursor-default"
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

export default GenreChips;

