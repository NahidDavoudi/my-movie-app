import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';
import MediaCarouselSection from '@/components/organisms/MediaCarouselSection';
import MediaGrid from '@/components/organisms/MediaGrid';
import { imdbShows } from '@/data/imdbData';

const getAverageRating = (items: typeof imdbShows) => {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + item.rating, 0);
  return Math.round((total / items.length) * 10) / 10;
};

const getTopGenres = (items: typeof imdbShows, limit = 6) => {
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

const TvShowsPage = () => {
  const shows = [...imdbShows];
  const heroShow = shows[0];

  const latestShows = shows
    .filter((show) => show.year)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 14);

  const topRatedShows = [...shows].sort((a, b) => b.rating - a.rating).slice(0, 14);

  const fanFavorites = [...shows]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 12);

  const allShows = [...shows].sort((a, b) => a.rank - b.rank);
  const topGenres = getTopGenres(shows);

  return (
    <div className="dir-rtl min-h-screen bg-gradient-to-b from-background via-background/95 to-surface">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 md:gap-16 md:px-6 md:pb-24">
        <HeroSection
          badgeText="کتابخانه سریال"
          title="سریال‌های محبوب با چینش هوشمند"
          subtitle="Series Universe"
          description="جدیدترین فصل‌ها، سریال‌های برتر و پیشنهادهای شخصی‌سازی‌شده را در یک ساختار ماژولار و مدرن مرور کنید. طراحی به گونه‌ای است که هم در موبایل و هم دسکتاپ تجربه‌ای مشابه اپلیکیشن‌های روز داشته باشید."
          backgroundImage={heroShow?.backdrop ?? heroShow?.poster}
          stats={[
            { label: 'تعداد سریال‌ها', value: shows.length.toString() },
            { label: 'میانگین امتیاز IMDb', value: getAverageRating(shows).toFixed(1) },
            { label: 'بالاترین امتیاز', value: topRatedShows[0]?.rating.toFixed(1) ?? '―' },
            { label: 'ژانرهای فعال', value: topGenres.length.toString() },
          ]}
          ctas={[
            { label: 'جدیدترین فصل‌ها', href: '#latest-shows', variant: 'solid' },
            { label: 'پربازدید', href: '#top-rated-shows', variant: 'ghost' },
            { label: 'همه سریال‌ها', href: '#shows-grid', variant: 'ghost' },
          ]}
        />

        {!!topGenres.length && (
          <section className="rounded-3xl border border-white/5 bg-surface/60 px-6 py-5 text-right shadow-neumorphic-card backdrop-blur-md md:px-8 md:py-6">
            <h2 className="mb-4 text-lg font-bold text-text-primary md:text-xl">ژانرهای پربیننده</h2>
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
          id="latest-shows"
          title="جدیدترین سریال‌ها"
          subtitle="اپیزودها و فصل‌های تازه منتشر شده"
          items={latestShows}
          viewAllHref="#shows-grid"
        />

        <MediaCarouselSection
          id="top-rated-shows"
          title="محبوب‌ترین سریال‌ها"
          subtitle="بر اساس امتیاز و استقبال کاربران"
          items={topRatedShows}
          viewAllHref="#shows-grid"
        />

        <MediaCarouselSection
          id="fan-favorites"
          title="منتخب طرفداران"
          subtitle="سریال‌هایی که همیشه در صدر پیشنهادها هستند"
          items={fanFavorites}
          viewAllHref="#shows-grid"
        />

        <MediaGrid
          id="shows-grid"
          title="همه سریال‌ها"
          description="برای مشاهده جزئیات هر سریال، کارت‌ها را هاور یا در موبایل لمس کنید."
          items={allShows}
          limit={24}
          showViewMore={false}
        />
      </main>
    </div>
  );
};

export default TvShowsPage;
