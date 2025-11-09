'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { Movie, Show } from '@/data/imdbData';
import { Star } from 'lucide-react';

interface MediaGridProps {
  id?: string;
  title: string;
  description?: string;
  items: (Movie | Show)[];
  limit?: number;
  showViewMore?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  id,
  title,
  description,
  items,
  limit = 20,
  showViewMore = true,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const visibleItems = useMemo(() => items.slice(0, limit), [items, limit]);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleToggle = (id: string) => {
    if (!isMobile) return;
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-7xl px-4 py-10"
    >
      <div className="rounded-3xl border border-white/5 bg-surface/60 p-6 shadow-[24px_24px_48px_rgba(0,0,0,0.35),-18px_-18px_36px_rgba(255,255,255,0.04)] backdrop-blur-md md:p-10">
        <header className="mb-8 text-right">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">{title}</h2>
          {description && <p className="mt-2 text-sm text-text-secondary md:text-base">{description}</p>}
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const href = item.type === 'movie' ? `/movies/${item.id}` : `/tv-shows/${item.id}`;

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-background/70 shadow-neumorphic-card transition hover:-translate-y-2 hover:shadow-neumorphic-dark"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className="relative block h-64 w-full overflow-hidden focus-visible:outline-none md:h-72"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/60 p-3 text-right shadow-inner backdrop-blur-md">
                    <h3 className="text-sm font-semibold text-text-primary md:text-base">
                      {item.title}
                    </h3>
                    {item.genres && item.genres.length > 0 && (
                      <p className="text-xs text-text-secondary">
                        {item.genres.slice(0, 2).join(' • ')}
                      </p>
                    )}
                  </div>
                </button>

                <div
                  className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-background/95 via-background/60 to-background/10 px-5 py-6 text-right opacity-0 transition duration-300 group-hover:opacity-100 ${
                    isExpanded ? 'opacity-100' : 'pointer-events-none'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      {item.year && (
                        <p className="text-sm text-text-secondary/90">سال انتشار: {item.year}</p>
                      )}
                    </div>

                    {item.plot && (
                      <p className="line-clamp-4 text-sm leading-relaxed text-text-secondary">
                        {item.plot}
                      </p>
                    )}

                    {item.genres && item.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.genres.slice(0, 4).map((genre) => (
                          <span
                            key={genre}
                            className="rounded-full bg-surface/80 px-3 py-1 text-xs text-text-primary shadow-inner"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href={href}
                      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background shadow-neumorphic-card transition hover:bg-primary/90"
                    >
                      مشاهده جزئیات
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showViewMore && items.length > limit && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="rounded-full border border-primary/50 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              موارد بیشتر به زودی
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGrid;

