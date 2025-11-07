import { Movie } from '@/data/imdbData';

export interface CarouselCardProps {
  movie: Movie;
  onClick: () => void;
}

export interface FeaturedCardProps {
  movie: Movie;
}

export interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export interface CarouselIndicatorsProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export interface VisibleMovie {
  movie: Movie;
  offset: number;
  isCentered: boolean;
}

