import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';
import MediaCarouselSection from '@/components/organisms/MediaCarouselSection';
import MediaGrid from '@/components/organisms/MediaGrid';
import { imdbMovies } from '@/data/imdbData';

const getAverageRating = (items: typeof imdbMovies) => {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + item.rating, 0);
  return Math.round((total / items.length) * 10) / 10;
};

const getTopGenres = (items: typeof imdbMovies, limit = 6) => {
  const genreMap = new Map<string, number>();

  items.forEach((item) => {
    item.genres?.forEach((genre) => {
      genreMap.set(genre, (genreMap.get(genre) ?? 0) + 1);
    });
  });

  return Array.from(genreMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([genre]) => genre);
};

const MoviesPage = () => {
  const movies = [...imdbMovies];
  const heroMovie = movies[0];

  const latestMovies = movies
    .filter((movie) => movie.year)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 14);

  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 14);

  const criticallyAcclaimed = [...movies]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 12);

  const allMovies = [...movies].sort((a, b) => a.rank - b.rank);
  const topGenres = getTopGenres(movies);

  return (
    <div className="dir-rtl min-h-screen bg-gradient-to-b from-background via-background/95 to-surface">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 md:gap-16 md:px-6 md:pb-24">
        <HeroSection
          badgeText="کتابخانه فیلم"
          title="همه فیلم‌های محبوب یک‌جا"
          subtitle="Cinema Collection"
          description="به دنیای فیلم‌های منتخب با چینش الهام‌گرفته از اپلیکیشن‌های مدرن خوش آمدید. از بلاک‌باسترهای روز تا کلاسیک‌های ماندگار را در یک تجربه یکدست و نئومورفیک مرور کنید."
          backgroundImage={heroMovie?.backdrop ?? heroMovie?.poster}
          stats={[
            { label: 'تعداد فیلم‌ها', value: movies.length.toString() },
            { label: 'میانگین امتیاز IMDb', value: getAverageRating(movies).toFixed(1) },
            { label: 'بالاترین امتیاز', value: topRatedMovies[0]?.rating.toFixed(1) ?? '―' },
            { label: 'ژانرهای برتر', value: topGenres.length.toString() },
          ]}
          ctas={[
            { label: 'جدیدترین', href: '#latest-movies', variant: 'solid' },
            { label: 'پربازدید', href: '#top-rated', variant: 'ghost' },
            { label: 'همه فیلم‌ها', href: '#movies-grid', variant: 'ghost' },
          ]}
        />

        {!!topGenres.length && (
          <section className="rounded-3xl border border-white/5 bg-surface/60 px-6 py-5 text-right shadow-neumorphic-card backdrop-blur-md md:px-8 md:py-6">
            <h2 className="mb-4 text-lg font-bold text-text-primary md:text-xl">ژانرهای محبوب</h2>
            <div className="flex flex-wrap justify-end gap-3">
              {topGenres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center rounded-full bg-primary/15 px-4 py-1 text-sm font-medium text-primary shadow-neumorphic-card"
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>
        )}

        <MediaCarouselSection
          id="latest-movies"
          title="جدیدترین فیلم‌ها"
          subtitle="به‌روزترین آثار سینمایی در یک نگاه"
          items={latestMovies}
          viewAllHref="#movies-grid"
        />

        <MediaCarouselSection
          id="top-rated"
          title="پربازدیدترین و محبوب‌ترین"
          subtitle="برترین امتیازها از نگاه مخاطبان"
          items={topRatedMovies}
          viewAllHref="#movies-grid"
        />

        <MediaCarouselSection
          id="critically-acclaimed"
          title="منتخب تحریریه"
          subtitle="فیلم‌های برگزیده براساس رتبه جهانی"
          items={criticallyAcclaimed}
          viewAllHref="#movies-grid"
        />

        <MediaGrid
          id="movies-grid"
          title="همه فیلم‌ها"
          description="برای دیدن جزئیات هر فیلم روی کارت آن هاور کنید یا روی موبایل لمس نمایید."
          items={allMovies}
          limit={24}
          showViewMore={false}
        />
      </main>
    </div>
  );
};

export default MoviesPage;
