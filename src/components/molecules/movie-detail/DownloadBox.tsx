import React from 'react';
import { Download, Film, Tv } from 'lucide-react';
import { Movie, Show } from '@/data/imdbData';

interface DownloadBoxProps {
  media: Movie | Show;
}

// Mock data for download qualities
const movieQualities = [
  { label: '1080p', size: '2.1 GB', format: 'BluRay' },
  { label: '720p', size: '1.2 GB', format: 'BluRay' },
  { label: '480p', size: '650 MB', format: 'WEB-DL' },
  { label: '360p', size: '400 MB', format: 'WEB-DL' },
];

// Mock data for TV show seasons/episodes
const getMockSeasons = (totalEpisodes?: number) => {
  if (!totalEpisodes) return [];
  
  const episodesPerSeason = 10;
  const numSeasons = Math.ceil(totalEpisodes / episodesPerSeason);
  
  return Array.from({ length: Math.min(numSeasons, 5) }, (_, i) => ({
    season: i + 1,
    episodes: i === numSeasons - 1 
      ? totalEpisodes - (i * episodesPerSeason)
      : episodesPerSeason,
  }));
};

const DownloadBox: React.FC<DownloadBoxProps> = ({ media }) => {
  const isMovie = media.type === 'movie';
  const seasons = !isMovie && 'totalEpisodes' in media 
    ? getMockSeasons(media.totalEpisodes) 
    : [];

  return (
    <section className="rounded-2xl bg-primary-light p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)] h-full flex flex-col">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-primary" />
        {isMovie ? 'دانلود فیلم' : 'دانلود سریال'}
      </h2>
      
      <div className="flex-1">
        {isMovie ? (
          <div className="space-y-2">
            <p className="text-xs text-text-secondary mb-3">کیفیت دلخواه را انتخاب کنید:</p>
            {movieQualities.map((quality, index) => (
              <a
                key={index}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.03)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.05)] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-surface shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.04)] group-hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.35),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] transition-all">
                    <Film className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{quality.label} - {quality.format}</p>
                    <p className="text-xs text-text-secondary">{quality.size}</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-text-secondary mb-3">فصل مورد نظر را انتخاب کنید:</p>
            {seasons.length > 0 ? (
              seasons.map((season) => (
                <a
                  key={season.season}
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.03)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.05)] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.04)] group-hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.35),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] transition-all">
                      <Tv className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">فصل {season.season}</p>
                      <p className="text-xs text-text-secondary">{season.episodes} قسمت</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Tv className="w-12 h-12 text-primary/30 mb-2" />
                <p className="text-sm text-text-secondary/60">
                  اطلاعات فصل‌ها در دسترس نیست
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border/20">
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-primary/90 shadow-lg"
        >
          <Download className="w-4 h-4" />
          مشاهده همه لینک‌ها
        </a>
      </div>
    </section>
  );
};

export default DownloadBox;

