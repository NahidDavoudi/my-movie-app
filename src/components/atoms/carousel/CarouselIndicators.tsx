import React from 'react';
import { CarouselIndicatorsProps } from './types';

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  total,
  activeIndex,
  onSelect,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === activeIndex 
              ? 'w-8 bg-primary' 
              : 'w-2 bg-border/40 hover:bg-border/70'
          }`}
          aria-label={`برو به اسلاید ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;

