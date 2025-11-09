import React from 'react';
import { Users, User } from 'lucide-react';

interface CastSectionProps {
  cast?: string[];
}

const CastSection: React.FC<CastSectionProps> = ({ cast }) => {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl bg-primary-light p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)]">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        بازیگران
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cast.slice(0, 10).map((actor, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2.5 shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.03)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.05)] transition-all group cursor-pointer"
          >
            <div className="p-1.5 rounded-lg bg-surface shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.04)] group-hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.35),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] transition-all">
              <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            </div>
            <span className="text-xs font-medium text-text-primary truncate">{actor}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastSection;

