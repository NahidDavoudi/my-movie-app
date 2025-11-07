"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, PanInfo } from "framer-motion";
import Card from "@/components/molecules/Card";
import { imdbMovies } from "@/data/imdbData";
import styles from "@/components/noScrollbar.module.css";

interface RecommendProps {
  gap?: number;
}

const Recommend: React.FC<RecommendProps> = ({ gap = 16 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardWidthRef = useRef(0);

  const cards = useMemo(() => imdbMovies.map((movie, index) => ({ movie, index })), []);

  const [centeredIndex, setCenteredIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(1);
    } else if (width < 1024) {
      setVisibleCount(3);
    } else {
      setVisibleCount(5);
    }
  }, []);

  const measureCardWidth = useCallback(() => {
    const firstCard = cardRefs.current[0];
    if (!firstCard) return;
    const rect = firstCard.getBoundingClientRect();
    cardWidthRef.current = rect.width + gap;
  }, [gap]);

  const getCardWidth = useCallback(() => {
    if (cardWidthRef.current) return cardWidthRef.current;
    const firstCard = cardRefs.current[0];
    if (!firstCard) return 0;
    const rect = firstCard.getBoundingClientRect();
    cardWidthRef.current = rect.width + gap;
    return cardWidthRef.current;
  }, [gap]);

  const clampIndex = useCallback(
    (index: number) => {
      const maxIndex = Math.max(cards.length - visibleCount, 0);
      return Math.max(0, Math.min(maxIndex, index));
    },
    [cards.length, visibleCount]
  );

  const scrollToIndex = useCallback(
    (targetIndex: number) => {
      const container = containerRef.current;
      if (!container) return;

      const safeIndex = clampIndex(targetIndex);
      const cardWidth = getCardWidth() || 1;
      const offset = cardWidth * safeIndex;

      container.scrollTo({ left: offset, behavior: "smooth" });
      setCenteredIndex(safeIndex);
    },
    [clampIndex, getCardWidth]
  );

  const updateCenteredCard = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCenteredIndex(clampIndex(closestIndex));
  }, [clampIndex]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => measureCardWidth());
    window.addEventListener("resize", measureCardWidth);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureCardWidth);
    };
  }, [measureCardWidth, visibleCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => window.requestAnimationFrame(updateCenteredCard);
    container.addEventListener("scroll", handleScroll, { passive: true });
    updateCenteredCard();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [updateCenteredCard]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (!container) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      event.preventDefault();
      container.scrollBy({ left: event.deltaY, behavior: "smooth" });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleDragEnd = (_: any, _info: PanInfo) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth() || 1;
    const scrollLeft = container.scrollLeft;
    const nextIndex = clampIndex(Math.round(scrollLeft / cardWidth));
    scrollToIndex(nextIndex);
  };

  const handleButtonClick = (direction: number) => {
    scrollToIndex(centeredIndex + direction);
  };

  return (
    <div className="relative w-full overflow-hidden px-4 py-4 sm:px-6">
      <button
        type="button"
        aria-label="Scroll left"
        disabled={centeredIndex === 0}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary shadow-lg transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-40 sm:left-4"
        onClick={() => handleButtonClick(-1)}
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Scroll right"
        disabled={centeredIndex >= Math.max(cards.length - visibleCount, 0)}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-4 text-primary shadow-lg transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-40 sm:right-4"
        onClick={() => handleButtonClick(1)}
      >
        ›
      </button>

      <motion.div
        ref={containerRef}
        className={`${styles.noScrollbar} flex`}
        style={{ gap: `${gap}px` }}
        drag="x"
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {cards.map(({ movie, index }) => {
          const isCenter = index === centeredIndex;
          return (
            <motion.div
              key={movie.id}
              ref={(el) => {
                cardRefs.current[index] = el;
                if (index === 0 && el) {
                  requestAnimationFrame(() => measureCardWidth());
                }
              }}
              className="flex-shrink-0"
              animate={{
                scale: isCenter ? 1.15 : 1,
                boxShadow: isCenter
                  ? "0px 14px 28px rgba(0,0,0,0.7)"
                  : "0px 4px 10px rgba(0,0,0,0.25)",
                zIndex: isCenter ? 10 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/movies/${movie.id}`} className="block">
                <Card
                  title={movie.title}
                  rating={movie.rating}
                  year={movie.year}
                  className="rounded-xl"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-[270px] w-[180px] rounded-xl object-cover sm:h-[300px] sm:w-[200px] md:h-[330px] md:w-[220px]"
                  />
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Recommend;
