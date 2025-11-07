import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieById } from '@/data/imdbData';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  const metadataParts: string[] = [];
  if (movie.genres?.length) metadataParts.push(movie.genres.join(', '));
  if (movie.year) metadataParts.push(String(movie.year));
  if (movie.duration) metadataParts.push(`${movie.duration} min`);
  const metadata = metadataParts.join(' • ');

  const summary = movie.plot?.split('.').filter(Boolean)[0] ?? 'Synopsis not available.';

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-12">
      <div className="relative h-72 w-full overflow-hidden rounded-b-3xl">
        {movie.backdrop ? (
          <Image
            src={movie.backdrop}
            alt={`${movie.title} backdrop`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={movie.poster}
            alt={`${movie.title} poster`}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />
      </div>

      <header className="flex flex-col gap-3 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-primary">{movie.title}</h1>
          {metadata && <p className="text-sm text-text-secondary">{metadata}</p>}
        </div>
        {movie.rating ? (
          <span className="self-start rounded-full bg-primary px-3 py-1 text-sm font-medium text-background sm:self-auto">
            ⭐ {movie.rating.toFixed(1)}
          </span>
        ) : null}
      </header>

      <div className="flex flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={movie.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full max-w-xs items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-primary/90"
        >
          Watch / Download
        </a>
        <Link href="/" className="text-sm text-primary underline">
          ← Back to home
        </Link>
      </div>

      <section className="mx-6 rounded-2xl bg-surface p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Summary</h2>
        <p className="mt-2 text-sm text-text-secondary">{summary}</p>
      </section>

      <section className="mx-6 rounded-2xl bg-surface/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Description</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {movie.plot ?? 'Detailed description coming soon.'}
        </p>
      </section>
    </div>
  );
};

export default MovieDetailPage;


