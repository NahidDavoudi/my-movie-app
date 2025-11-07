import React from 'react';
const Card = ({ children, className = '', title, rating, year }) => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[180px]">
      {/* تصویر و محتوا */}
      <div className={`bg-surface rounded-lg shadow-card overflow-hidden ${className}`}>
        {children}
      </div>
      {/* اطلاعات فیلم */}
    </div>
  );
};

export default Card;