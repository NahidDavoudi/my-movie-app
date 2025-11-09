import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getShowById } from '@/data/imdbData';
import TechnicalInfo from '@/components/molecules/movie-detail/TechnicalInfo';
import PlotSummary from '@/components/molecules/movie-detail/PlotSummary';
import CastSection from '@/components/molecules/movie-detail/CastSection';
import CommentsSection, { Comment } from '@/components/molecules/movie-detail/CommentsSection';
import DownloadBox from '@/components/molecules/movie-detail/DownloadBox';
import GenreChips from '@/components/atoms/GenreChips';

interface ShowDetailPageProps {
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
      text: 'سریال فوق‌العاده‌ای بود! داستان و بازی‌ها عالی بودند. به شدت پیشنهاد می‌کنم.',
    },
    {
      id: 2,
      author: 'سارا احمدی',
      rating: 4,
      date: '۱۴۰۲/۰۸/۱۰',
      text: 'سریال خوبی بود اما انتظار بیشتری داشتم. با این حال ارزش تماشا را دارد.',
    },
  ];
  */
  return [];
};

const ShowDetailPage = async ({ params }: ShowDetailPageProps) => {
  const { id } = await params;
  const show = getShowById(id);

  if (!show) {
    notFound();
  }

  const mockCountryCode = 'US';
  const mockComments = getMockComments();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-20 md:pb-12">
      {/* Backdrop */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-3xl">
        {show.backdrop ? (
          <Image
            src={show.backdrop}
            alt={`${show.title} backdrop`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={show.poster}
            alt={`${show.title} poster`}
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
              {show.title}
            </h1>
            {show.rating && (
              <div className="flex items-center gap-2 bg-primary/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl">
                <span className="text-xl">⭐</span>
                <span className="text-xl font-bold text-background">{show.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {/* Year and Genre Chips */}
          <div className="flex flex-wrap items-center gap-3">
            {show.year && (
              <span className="text-white/90 text-sm font-medium">{show.year}</span>
            )}
            {show.genres && show.genres.length > 0 && (
              <>
                <span className="text-white/50">•</span>
                <GenreChips genres={show.genres.slice(0, 5)} />
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
          <TechnicalInfo media={show} countryCode={mockCountryCode || 'US'} />
          <PlotSummary plot={show.plot} />
        </div>

        {/* Row 2: Cast Section (full width) */}
        <div className="mb-6">
          <CastSection cast={show.cast} />
        </div>

        {/* Row 3: Comments + Download Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommentsSection comments={mockComments} />
          <DownloadBox media={show} />
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link 
            href="/tv-shows" 
            className="inline-flex bg-primary px-4 py-2 rounded-md items-center gap-2 text-white hover:bg-primary/90 transition text-sm font-medium shadow-neumorphic-card hover:shadow-neumorphic-dark"
          >
            ← بازگشت به سریال‌ها
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailPage;

