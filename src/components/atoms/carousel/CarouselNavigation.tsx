import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselNavigationProps } from './types';

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) => {
  return (
    <>
      {/* دکمه چپ (قبلی در RTL) */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="absolute left-4 z-20 bg-surface/90 hover:bg-surface border border-border/60 text-text-primary p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        aria-label="قبلی"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* دکمه راست (بعدی در RTL) */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="absolute right-4 z-20 bg-surface/90 hover:bg-surface border border-border/60 text-text-primary p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        aria-label="بعدی"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
};

export default CarouselNavigation;

