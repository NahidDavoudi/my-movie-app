import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type HeroStat = {
  label: string;
  value: string;
};

type HeroCta = {
  label: string;
  href: string;
  variant?: 'solid' | 'ghost';
  icon?: ReactNode;
};

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  stats?: HeroStat[];
  ctas?: HeroCta[];
  badgeText?: string;
  className?: string;
}

const gradientOverlay =
  'absolute inset-0 bg-gradient-to-l from-background/95 via-background/80 to-background/30';

const baseContainer =
  'relative overflow-hidden rounded-3xl border border-white/5 bg-surface/50 shadow-[20px_20px_40px_rgba(0,0,0,0.35),-20px_-20px_40px_rgba(255,255,255,0.05)]';

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  stats,
  ctas,
  badgeText,
  className,
}) => {
  return (
    <section
      className={`${baseContainer} ${className ?? ''}`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
      )}

      <div className={gradientOverlay} />

      <div className="relative z-10 flex flex-col gap-6 px-6 py-10 text-right md:px-12 md:py-16">
        {badgeText && (
          <span className="self-end rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold text-primary shadow-neumorphic-card">
            {badgeText}
          </span>
        )}

        <div className="flex flex-col gap-3 md:max-w-3xl md:self-end">
          {subtitle && (
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-primary-light/80">
              {subtitle}
            </p>
          )}
          <h1 className="text-3xl font-bold text-white drop-shadow-2xl md:text-5xl">{title}</h1>
          {description && (
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">
              {description}
            </p>
          )}
        </div>

        {ctas && ctas.length > 0 && (
          <div className="flex flex-wrap justify-end gap-3">
            {ctas.map((cta) => {
              const variant = cta.variant ?? 'solid';
              const baseStyles =
                'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300';
              const solidStyles =
                'border-primary/60 bg-primary text-background shadow-neumorphic-card hover:shadow-neumorphic-dark hover:bg-primary/90';
              const ghostStyles =
                'border-white/20 bg-transparent text-white hover:border-primary/70 hover:text-primary backdrop-blur-sm';

              return (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={`${baseStyles} ${variant === 'solid' ? solidStyles : ghostStyles}`}
                >
                  {cta.icon}
                  <span>{cta.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-background/60 p-4 text-right shadow-inner md:grid-cols-4 md:p-6">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-surface/40 p-3 shadow-neumorphic-card">
                <p className="text-xs text-text-secondary/80">{stat.label}</p>
                <p className="text-lg font-bold text-white md:text-xl">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

