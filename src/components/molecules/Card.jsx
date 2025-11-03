import React from 'react';
import mockMovies from '@/data/mockMovies';
const Card = ({ children, className = '' }) => {
  return (
<div className="flex flex-col items-center justify-center">
    <div className={`bg-image rounded-lg shadow-card p-4   ${className}`}>
      {children}
    </div>
    <div className="flex flex-col items-center justify-center">
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
    </div>
</div> 
  );
};

export default Card;