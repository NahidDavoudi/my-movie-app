"use client";

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from '@/components/noScrollbar.module.css';
import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';
import { imdbMovies, imdbShows, Movie as ImdbMovie, Show as ImdbShow } from '@/data/imdbData';
import Title from '@/components/atoms/Title';

const REPEAT_COUNT = 3;
const AUTO_SCROLL_SPEEDS = {
  slow: 8000,
  normal: 6000,
  fast: 4000,
} as const;
const INTERACTION_TIMEOUT = 4000;

type ScrollSpeed = keyof typeof AUTO_SCROLL_SPEEDS;
type MediaItem = ImdbMovie | ImdbShow;

const MovieSection = () => {
  const [activeType, setActiveType] = useState<'films' | 'shows'>('films');
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState<ScrollSpeed>('normal');
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Prepare a repeated movie list to enable seamless looping.
  const baseMedia = useMemo<MediaItem[]>(
    () => (activeType === 'films' ? imdbMovies : imdbShows),
    [activeType]
  );

  const extendedMedia = useMemo(() => {
    return Array.from({ length: REPEAT_COUNT }, () => baseMedia)
      .flat()
      .map((item, index) => ({ ...item, _key: `${item.id}-${index}` }));
  }, [baseMedia]);

  useEffect(() => {
    setCenteredIndex(0);
    cardRefs.current = [];
  }, [activeType]);

  // Keep references to the carousel container and layout measurements.
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const singleCardWidthRef = useRef(0);

  // Debounce auto-scroll while the user is interacting with the carousel.
  const interactionBlockedRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Throttle function for scroll handler
  const throttle = useCallback((func: (...args: unknown[]) => void, delay: number) => {
    return (...args: unknown[]) => {
      const now = Date.now();
      if (now - lastScrollTimeRef.current >= delay) {
        lastScrollTimeRef.current = now;
        func(...args);
      }
    };
  }, []);

  // Detect which card is currently centered in the viewport.
  const updateCenteredCard = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCenteredIndex(closestIndex);
  }, []);

  // Normalize the scroll position so the user always stays within the middle dataset.
  const normalizeScrollPosition = useCallback(() => {
    const container = carouselRef.current;
    const singleCardWidth = singleCardWidthRef.current;

    if (!container || !singleCardWidth) return;

    const totalCards = extendedMedia.length;
    const itemsPerSet = baseMedia.length;
    const currentCardIndex = Math.round(container.scrollLeft / singleCardWidth);

    if (itemsPerSet === 0) return;

    if (currentCardIndex < itemsPerSet * 0.5) {
      container.scrollLeft += singleCardWidth * itemsPerSet;
    } else if (currentCardIndex > totalCards - itemsPerSet * 0.5) {
      container.scrollLeft -= singleCardWidth * itemsPerSet;
    }
  }, [extendedMedia.length, baseMedia.length]);

  // Reset carousel metrics whenever layout changes or on first render.
  useEffect(() => {
    const container = carouselRef.current;
    if (!container || cardRefs.current.length === 0) return;

    const updateMetrics = () => {
      const firstCard = cardRefs.current[0];
      if (!firstCard) return;

      const cardRect = firstCard.getBoundingClientRect();
      const cardStyle = window.getComputedStyle(firstCard);
      const marginRight = parseFloat(cardStyle.marginRight) || 0;

      singleCardWidthRef.current = cardRect.width + marginRight;

      // Start at the middle set
      const itemsPerSet = baseMedia.length;
      if (itemsPerSet === 0) return;

      container.scrollLeft = singleCardWidthRef.current * itemsPerSet;

      updateCenteredCard();
    };

    const rafId = window.requestAnimationFrame(updateMetrics);
    const handleResize = () => window.requestAnimationFrame(updateMetrics);

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCenteredCard, baseMedia.length]);

  // Handle manual scrolling with throttle
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = throttle(() => {
      updateCenteredCard();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        normalizeScrollPosition();
      }, 150);
    }, 50);

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [normalizeScrollPosition, updateCenteredCard, throttle]);

  // Pause auto-scroll when users interact via pointer, wheel, or touch.
  const markInteraction = useCallback(() => {
    interactionBlockedRef.current = true;

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      interactionBlockedRef.current = false;
    }, INTERACTION_TIMEOUT);
  }, []);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    container.addEventListener('pointerdown', markInteraction);
    container.addEventListener('wheel', markInteraction, { passive: true });
    container.addEventListener('touchstart', markInteraction, { passive: true });

    return () => {
      container.removeEventListener('pointerdown', markInteraction);
      container.removeEventListener('wheel', markInteraction);
      container.removeEventListener('touchstart', markInteraction);
    };
  }, [markInteraction]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = carouselRef.current;
      const singleCardWidth = singleCardWidthRef.current;

      if (!container || !singleCardWidth) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollBy({
          left: -singleCardWidth,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
        markInteraction();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        container.scrollBy({
          left: singleCardWidth,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
        markInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [markInteraction, prefersReducedMotion]);

  // Drive automatic scrolling one card at a time.
  useEffect(() => {
    const container = carouselRef.current;
    if (!container || prefersReducedMotion) return;

    const scrollToNextCard = () => {
      if (interactionBlockedRef.current || isPaused) return;

      const singleCardWidth = singleCardWidthRef.current;
      if (!singleCardWidth) return;

      const nextPosition = container.scrollLeft + singleCardWidth;

      container.scrollTo({
        left: nextPosition,
        behavior: 'smooth',
      });
    };

    const intervalId = setInterval(scrollToNextCard, AUTO_SCROLL_SPEEDS[scrollSpeed]);

    return () => clearInterval(intervalId);
  }, [scrollSpeed, isPaused, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  // Calculate progress indicator
  const currentItemIndex = useMemo(() => {
    if (baseMedia.length === 0) return 0;
    return centeredIndex % baseMedia.length;
  }, [centeredIndex, baseMedia.length]);

  return (
    <section
      className="mx-auto w-full max-w-7xl py-6"
      aria-label="Movie carousel section"
      role="region"
    >
      <div className="rounded-3xl bg-gradient-to-b from-[#7c9feb]/20 to-[#ffffff]/20 p-5 backdrop-blur-sm">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between rounded-full bg-[#dfe3ee]/50 p-1.5 backdrop-blur-sm">
          <Title title="Newest" />

          {/* Toggle Buttons */}
          <div className="flex items-center gap-2 rounded-full border border-border/30 bg-surface/50 p-1.5 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setActiveType('films')}
              aria-pressed={activeType === 'films'}
              aria-label="Show films"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeType === 'films'
                  ? 'bg-primary-light text-primary shadow-neumorphic-card'
                  : 'text-text-secondary hover:bg-surface/70'
              }`}
            >
              Films
            </button>
            <button
              type="button"
              onClick={() => setActiveType('shows')}
              aria-pressed={activeType === 'shows'}
              aria-label="Show TV shows"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeType === 'shows'
                  ? 'bg-primary-light text-primary shadow-neumorphic-card'
                  : 'text-text-secondary hover:bg-surface/70'
              }`}
            >
              Shows
            </button>
          </div>
        </div>

        {/* Speed Control & Status */}
        <div className="mb-4 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">Speed:</span>
            <div className="flex gap-1">
              {(['slow', 'normal', 'fast'] as ScrollSpeed[]).map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setScrollSpeed(speed)}
                  aria-label={`Set scroll speed to ${speed}`}
                  className={`rounded px-2 py-1 text-xs font-medium transition-all ${
                    scrollSpeed === speed
                      ? 'bg-primary-light text-primary'
                      : 'bg-surface/50 text-text-secondary hover:bg-surface/70'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {isPaused && !prefersReducedMotion && (
            <span className="text-xs text-text-secondary">⏸ Paused</span>
          )}

          {prefersReducedMotion && (
            <span className="text-xs text-text-secondary">Auto-scroll disabled</span>
          )}
        </div>

        {/* Movie Carousel */}
        <div
          className="relative py-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={carouselRef}
            className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 ${styles.noScrollbar}`}
            style={{ scrollPaddingLeft: '50%', scrollPaddingRight: '50%' }}
            role="list"
            aria-label="Movie carousel"
            tabIndex={0}
          >
            {extendedMedia.map((item, index) => {
              const isCentered = index === centeredIndex;
              const scale = isCentered ? 1.1 : 0.9;

              const targetHref = item.type === 'movie' ? `/movies/${item.id}` : undefined;

              const cardContent = (
                <Card
                  title={item.title}
                  rating={item.rating}
                  year={item.year}
                  className={`relative z-10 transition-all duration-700 ease-in-out ${
                    isCentered
                      ? 'shadow-2xl'
                      : 'shadow-md opacity-70'
                  } ${!isCentered && !prefersReducedMotion ? 'blur-[1px]' : ''}`}
                >
                  <img
                    src={item.poster}
                    alt={`${item.title} poster`}
                    className="h-[320px] w-full rounded-xl object-cover sm:h-[360px] md:h-[400px]"
                    loading="lazy"
                  />
                </Card>
              );

              return (
                <div
                  key={item._key}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="flex-shrink-0 snap-center transition-all duration-700 ease-in-out"
                  style={{
                    width: 'clamp(220px, 50vw, 320px)',
                    transform: prefersReducedMotion ? 'scale(1)' : `scale(${scale})`,
                  }}
                  role="listitem"
                  aria-label={`${item.title}, ${item.year ?? 'Unknown year'}, rated ${item.rating}`}
                >
                  {targetHref ? (
                    <Link href={targetHref} className="block">
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </div>
              );
            })}
          </div>

          {/* Enhanced gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/60 to-transparent" />
        </div>

        {/* Progress Indicator */}
        <div className="mb-6 flex justify-center gap-1.5 px-4">
          {baseMedia.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                const container = carouselRef.current;
                if (!container) return;

                const itemsPerSet = baseMedia.length;
                if (itemsPerSet === 0) return;

                const targetIndex =
                  Math.floor(centeredIndex / itemsPerSet) * itemsPerSet + index;
                const targetPosition = singleCardWidthRef.current * targetIndex;

                container.scrollTo({
                  left: targetPosition,
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                });
                markInteraction();
              }}
              aria-label={`Go to movie ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentItemIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-1.5 bg-border/50 hover:bg-border'
              }`}
            />
          ))}
        </div>

        {/* Keyboard hint */}
        <div className="mb-4 text-center text-xs text-text-secondary">Use ← → arrow keys to navigate</div>

        {/* Explore All Button */}
        <div className="flex justify-center">
          <Button color="primary">Explore All</Button>
        </div>
      </div>
    </section>
  );
};

export default MovieSection;


