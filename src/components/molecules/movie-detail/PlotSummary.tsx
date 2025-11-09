import React from 'react';
import { BookOpen } from 'lucide-react';

interface PlotSummaryProps {
  plot?: string;
}

const PlotSummary: React.FC<PlotSummaryProps> = ({ plot }) => {
  return (
    <section className="rounded-2xl bg-primary-light p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)] h-full flex flex-col">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        خلاصه داستان
      </h2>
      <div className="flex-1">
        {plot ? (
          <p className="text-sm text-text-secondary leading-relaxed">
            {plot}
          </p>
        ) : (
          <p className="text-sm text-text-secondary/60 italic">
            خلاصه داستان موجود نیست.
          </p>
        )}
      </div>
    </section>
  );
};

export default PlotSummary;

