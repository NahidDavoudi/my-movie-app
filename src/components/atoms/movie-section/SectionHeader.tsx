import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="bg-surface/50 backdrop-blur-sm rounded-full px-6 py-2 border border-border/20">
      <h2 className="text-base font-bold text-text-primary">{title}</h2>
    </div>
  );
};

export default SectionHeader;

