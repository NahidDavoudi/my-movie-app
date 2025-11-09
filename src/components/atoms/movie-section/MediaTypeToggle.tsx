import React from 'react';

interface MediaTypeToggleProps {
  activeType: 'films' | 'shows';
  onTypeChange: (type: 'films' | 'shows') => void;
}

const MediaTypeToggle: React.FC<MediaTypeToggleProps> = ({ activeType, onTypeChange }) => {
  return (
    <div className="flex items-center gap-2 bg-surface/50 backdrop-blur-sm rounded-full p-1.5 border border-border/30">
      <button
        type="button"
        onClick={() => onTypeChange('films')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          activeType === 'films'
            ? 'bg-primary-light text-primary shadow-md'
            : 'text-text-secondary hover:bg-surface/70'
        }`}
      >
        Films
      </button>
      <button
        type="button"
        onClick={() => onTypeChange('shows')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          activeType === 'shows'
            ? 'bg-primary-light text-primary shadow-md'
            : 'text-text-secondary hover:bg-surface/70'
        }`}
      >
        Shows
      </button>
    </div>
  );
};

export default MediaTypeToggle;

