import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';
import FeaturedCarousel from '@/components/atoms/featured-carousel';
import MediaCarouselSection from '@/components/organisms/MediaCarouselSection';
import MediaGrid from '@/components/organisms/MediaGrid';
import { imdbMovies, imdbShows } from '@/data/imdbData';

export default function Home() {
  const standoutMovie = imdbMovies[0];
  const standoutShow = imdbShows[0];
  const totalTitles = imdbMovies.length + imdbShows.length;
  const highestRating = Math.max(
    ...[...imdbMovies, ...imdbShows].map((item) => item.rating),
  );
  const averageRating =
    Math.round(
      ([...imdbMovies, ...imdbShows].reduce((sum, item) => sum + item.rating, 0) /
        Math.max(totalTitles, 1)) *
        10,
    ) / 10;
  const uniqueGenres = new Set(
    [...imdbMovies, ...imdbShows].flatMap((item) => item.genres ?? []),
  ).size;

  const latestMovies = [...imdbMovies]
    .filter((movie) => movie.year)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 12);

  const latestShows = [...imdbShows]
    .filter((show) => show.year)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 12);

  const topRatedMix = [...imdbMovies.slice(0, 12), ...imdbShows.slice(0, 12)]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 16);

  const curatedCollection = [...imdbMovies.slice(0, 10), ...imdbShows.slice(0, 10)].sort(
    (a, b) => a.rank - b.rank,
  );

  // Deduplicate items by ID
  const curatedItems = Array.from(
    new Map(
      [standoutMovie, standoutShow, ...curatedCollection]
        .filter((item): item is typeof curatedCollection[number] => Boolean(item))
        .map((item) => [item.id, item])
    ).values()
  );

  return (
    <div className="dir-rtl min-h-screen bg-gradient-to-b from-background via-background/95 to-surface">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 pb-20 md:gap-14 md:pb-24">
        <HeroSection
          badgeText="جهان سرگرمی"
          title="پلتفرم یکپارچه فیلم و سریال"
          subtitle="Cinematic Universe"
          backgroundImage={standoutMovie?.backdrop ?? standoutMovie?.poster}
          ctas={[
            { label: 'فیلم‌ها', href: '/movies', variant: 'solid' },
            { label: 'سریال‌ها', href: '/tv-shows', variant: 'ghost' },
            { label: 'بخش منتخب', href: '#collections', variant: 'ghost' },
          ]}
        />

        <section id="featured" className="w-full">
          <FeaturedCarousel />
        </section>

        <MediaCarouselSection
          id="latest-movies"
          title="جدیدترین فیلم‌ها"
          subtitle="با تازه‌ترین آثار سینمایی آشنا شوید"
          items={latestMovies}
          viewAllHref="/movies#newest"
        />

        <MediaCarouselSection
          id="latest-shows"
          title="جدیدترین سریال‌ها"
          subtitle="جدیدترین فصل‌ها و مجموعه‌ها"
          items={latestShows}
          viewAllHref="/tv-shows#latest-shows"
        />

        <MediaGrid
          id="collections"
          title="برگزیده تحریریه"
          description="ترکیبی از آثار محبوب سینما و تلویزیون. برای مشاهده اطلاعات بیشتر کافی‌ست روی کارت‌ها هاور کنید یا در موبایل لمس نمایید."
          items={topRatedMix}
          limit={16}
          showViewMore={false}
        />

        <MediaCarouselSection
          id="curated"
          title="دسته‌بندی هوشمند"
          subtitle="براساس رتبه و استقبال مخاطبان"
          items={curatedItems}
        />
      </main>
    </div>
  );
}
