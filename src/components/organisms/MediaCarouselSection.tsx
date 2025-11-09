import React from 'react';
import { Movie, Show } from '@/data/imdbData';
import SimpleMovieCard from '@/components/atoms/movie-section/SimpleMovieCard';
import styles from '@/components/noScrollbar.module.css';
import Link from 'next/link';

interface MediaCarouselSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  items: (Movie | Show)[];
  viewAllHref?: string;
}

const MediaCarouselSection: React.FC<MediaCarouselSectionProps> = ({
  id,
  title,
  subtitle,
  items,
  viewAllHref,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-7xl px-4 py-8"
    >
      <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-surface/60 to-background/30 p-6 shadow-neumorphic-card backdrop-blur-md sm:p-8">
        <header className="mb-6 flex flex-col gap-3 text-right sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">{title}</h2>
            {subtitle && <p className="text-sm text-text-secondary md:text-base">{subtitle}</p>}
          </div>

          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              مشاهده همه
            </Link>
          )}
        </header>

        <div className={`-mx-4 overflow-x-auto px-4 pb-2 ${styles.noScrollbar}`}>
          <div className="flex gap-4">
            {items.map((item) => (
              <div key={item.id} className="w-40 shrink-0 sm:w-48 md:w-56">
                <SimpleMovieCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCarouselSection;

