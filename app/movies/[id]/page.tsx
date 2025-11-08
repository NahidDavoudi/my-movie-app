import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieById } from '@/data/imdbData';
import TechnicalInfo from '@/components/molecules/movie-detail/TechnicalInfo';
import PlotSummary from '@/components/molecules/movie-detail/PlotSummary';
import CastSection from '@/components/molecules/movie-detail/CastSection';
import CommentsSection, { Comment } from '@/components/molecules/movie-detail/CommentsSection';
import DownloadBox from '@/components/molecules/movie-detail/DownloadBox';
import GenreChips from '@/components/atoms/GenreChips';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

// In the future, this would fetch from an API
const getMockComments = (): Comment[] => {
  // For now, return empty array to demonstrate empty state
  // Uncomment below to show sample comments
  /*
  return [
    {
      id: 1,
      author: 'علی رضایی',
      rating: 5,
      date: '۱۴۰۲/۰۸/۱۵',
      text: 'فیلم فوق‌العاده‌ای بود! داستان و بازی‌ها عالی بودند. به شدت پیشنهاد می‌کنم.',
    },
    {
      id: 2,
      author: 'سارا احمدی',
      rating: 4,
      date: '۱۴۰۲/۰۸/۱۰',
      text: 'فیلم خوبی بود اما انتظار بیشتری داشتم. با این حال ارزش تماشا را دارد.',
    },
  ];
  */
  return [];
};

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  const mockCountryCode = 'US';
  const mockComments = getMockComments();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-20 md:pb-12">
      {/* Backdrop */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-3xl">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        
        {/* Title overlay on backdrop */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
              {movie.title}
            </h1>
            {movie.rating && (
              <div className="flex items-center gap-2 bg-primary/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl">
                <span className="text-xl">⭐</span>
                <span className="text-xl font-bold text-background">{movie.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {/* Year and Genre Chips */}
          <div className="flex flex-wrap items-center gap-3">
            {movie.year && (
              <span className="text-white/90 text-sm font-medium">{movie.year}</span>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span className="text-white/50">•</span>
                <GenreChips genres={movie.genres.slice(0, 5)} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main content with poster overlay layout */}
      <div className="px-4 md:px-6 relative">
        {/* Poster + Info Cards Layout (Desktop/Tablet) */}
        
      </div>

      <div className="px-4 md:px-6">
        {/* Row 1: Technical Info + Plot Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TechnicalInfo media={movie} countryCode={mockCountryCode || 'US'} />
          <PlotSummary plot={movie.plot} />
        </div>

        {/* Row 2: Cast Section (full width) */}
        <div className="mb-6">
          <CastSection cast={movie.cast} />
        </div>

        {/* Row 3: Comments + Download Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommentsSection comments={mockComments} />
          <DownloadBox media={movie} />
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition text-sm font-medium"
          >
            ← بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;


