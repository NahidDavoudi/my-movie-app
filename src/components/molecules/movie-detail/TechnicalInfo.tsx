import React from 'react';
import { Calendar, Clock, Film, Tv, User } from 'lucide-react';
import { Movie, Show } from '@/data/imdbData';
import FlagIcon from '@/components/atoms/FlagIcon';

interface TechnicalInfoProps {
  media: Movie | Show;
  countryCode?: string;
}

const TechnicalInfo: React.FC<TechnicalInfoProps> = ({ media, countryCode = 'US' }) => {
  return (
    <section className="rounded-2xl bg-primary-light p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)]">
      <h2 className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2">
        <Film className="w-5 h-5 text-primary" />
        اطلاعات فنی
      </h2>
      <div className="space-y-4">
        {media.director && (
          <div className="flex items-start gap-3 group">
            <div className="p-2.5 rounded-xl bg-surface shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.07)] transition-all">
              <User className="w-4 h-4 text-primary flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-0.5">کارگردان</p>
              <p className="text-sm font-semibold text-text-primary">{media.director}</p>
            </div>
          </div>
        )}
        
        {media.year && (
          <div className="flex items-start gap-3 group">
            <div className="p-2.5 rounded-xl bg-surface shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.07)] transition-all">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-0.5">سال انتشار</p>
              <p className="text-sm font-semibold text-text-primary">{media.year}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-3 group">
          <div className="p-2.5 rounded-xl bg-surface shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.07)] transition-all flex items-center justify-center">
            <FlagIcon countryCode={countryCode} className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-0.5">کشور سازنده</p>
            <p className="text-sm font-semibold text-text-primary">{countryCode}</p>
          </div>
        </div>
        
        {media.type === 'movie' && media.duration && (
          <div className="flex items-start gap-3 group">
            <div className="p-2.5 rounded-xl bg-surface shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.07)] transition-all">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-0.5">مدت زمان</p>
              <p className="text-sm font-semibold text-text-primary">{media.duration} دقیقه</p>
            </div>
          </div>
        )}
        
        {media.type === 'show' && 'totalEpisodes' in media && media.totalEpisodes && (
          <div className="flex items-start gap-3 group">
            <div className="p-2.5 rounded-xl bg-surface shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.07)] transition-all">
              <Tv className="w-4 h-4 text-primary flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-0.5">تعداد قسمت‌ها</p>
              <p className="text-sm font-semibold text-text-primary">{media.totalEpisodes} قسمت</p>
            </div>
          </div>
        )}

        </div>
    </section>
  );
};

export default TechnicalInfo;

