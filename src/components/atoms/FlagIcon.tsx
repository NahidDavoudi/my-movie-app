import React from 'react';

interface FlagIconProps {
  countryCode?: string;
  className?: string;
}

// Map country codes to flag emojis
const countryToFlag: Record<string, string> = {
  US: '🇺🇸',
  USA: '🇺🇸',
  GB: '🇬🇧',
  UK: '🇬🇧',
  FR: '🇫🇷',
  DE: '🇩🇪',
  IT: '🇮🇹',
  ES: '🇪🇸',
  JP: '🇯🇵',
  KR: '🇰🇷',
  CN: '🇨🇳',
  IN: '🇮🇳',
  CA: '🇨🇦',
  AU: '🇦🇺',
  BR: '🇧🇷',
  MX: '🇲🇽',
  RU: '🇷🇺',
  // Add more as needed
};

const FlagIcon: React.FC<FlagIconProps> = ({ countryCode = 'US', className = '' }) => {
  const flag = countryToFlag[countryCode.toUpperCase()] || '🌍';
  
  return (
    <span className={`inline-block text-2xl ${className}`} role="img" aria-label={`${countryCode} flag`}>
      {flag}
    </span>
  );
};

export default FlagIcon;

