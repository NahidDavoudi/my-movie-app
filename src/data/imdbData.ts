import imdbRaw from '../../imdb_top_250.json';

export type RawMovie = (typeof imdbRaw.movies)[number];
export type RawShow = (typeof imdbRaw.shows)[number];

export interface MediaBase {
  id: string;
  rank: number;
  title: string;
  rating: number;
  poster: string;
  backdrop?: string;
  url: string;
  genres: string[];
  director?: string;
  cast?: string[];
  plot?: string;
}

export interface Movie extends MediaBase {
  type: 'movie';
  year?: number;
  duration?: number;
}

export interface Show extends MediaBase {
  type: 'show';
  year?: number;
  totalEpisodes?: number;
}

const parseYear = (value: string | number | undefined | null) => {
  if (typeof value === 'number') return value;
  if (!value) return undefined;
  const numeric = Number.parseInt(value, 10);
  return Number.isNaN(numeric) ? undefined : numeric;
};

const parseDuration = (value: string | number | undefined | null) => {
  if (typeof value === 'number') return value;
  if (!value) return undefined;

  const numeric = Number.parseInt(value, 10);
  return Number.isNaN(numeric) ? undefined : numeric;
};

export const imdbMovies: Movie[] = imdbRaw.movies.map((movie) => ({
  id: movie.id,
  rank: movie.rank,
  title: movie.title,
  rating: movie.rating,
  poster: movie.poster,
  backdrop: movie.backdrop,
  url: movie.url,
  genres: movie.genres ?? [],
  director: movie.director,
  cast: movie.cast,
  plot: movie.plot,
  type: 'movie',
  year: parseYear(movie.year as string | number | undefined),
  duration: parseDuration(movie.duration as string | number | undefined),
}));

export const imdbShows: Show[] = imdbRaw.shows.map((show) => ({
  id: show.id,
  rank: show.rank,
  title: show.title,
  rating: show.rating,
  poster: show.poster,
  backdrop: show.backdrop,
  url: show.url,
  genres: show.genres ?? [],
  director: show.director,
  cast: show.cast,
  plot: show.plot,
  type: 'show',
  year: parseYear(show.year as string | number | undefined),
}));

export const getMovieById = (id: string): Movie | undefined =>
  imdbMovies.find((movie) => movie.id === id);

export const getShowById = (id: string): Show | undefined =>
  imdbShows.find((show) => show.id === id);

const data = {
  movies: imdbMovies,
  shows: imdbShows,
  updatedAt: imdbRaw.updated_at,
};

export default data;


