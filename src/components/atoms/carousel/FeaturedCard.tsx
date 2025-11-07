import React from 'react';
import Link from 'next/link';
import { Clapperboard, Play, Star, Users } from 'lucide-react';
import { FeaturedCardProps } from './types';

const FeaturedCard: React.FC<FeaturedCardProps> = ({ movie }) => {
  return (
    <div className="relative group w-[600px] max-w-[90vw]">
      <div className="flex flex-row-reverse bg-surface/95 border border-border rounded-2xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.7)] backdrop-blur">
        {/* ستون راست - پوستر */}
        <div className="relative w-[240px] flex-shrink-0">
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

        {/* ستون چپ - اطلاعات (ابتدا مخفی، با hover نمایش داده می‌شود) */}
        <div className="w-0 group-hover:w-[360px] transition-all duration-500 ease-out overflow-hidden">
          <div className="w-[360px] h-full p-6 flex flex-col">
            {/* عنوان */}
            <h3 className="text-text-primary font-bold text-xl mb-3 leading-tight line-clamp-2">
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
                <p className="line-clamp-2">
                  <span className="text-text-primary font-semibold">بازیگران:</span> {movie.cast.slice(0, 3).join('، ')}
                </p>
              </div>
            )}

            {/* توضیحات */}
            {movie.plot && (
              <p className="text-text-secondary/85 text-sm leading-relaxed mb-auto line-clamp-3">
                {movie.plot}
              </p>
            )}

            {/* دکمه */}
            <Link href={`/movies/${movie.id}`} className="mt-4">
              <button className="w-full bg-primary hover:bg-primary-light text-text-primary font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Play className="w-5 h-5 fill-current" />
                <span>جزئیات بیشتر</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;

