import Header from "@/components/organisms/Header";
import Recommend from "@/components/organisms/Recommend";
import FeaturedCarousel from "@/components/atoms/featured-carousel";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FeaturedCarousel />
      <Recommend />
    </div>
  );
}
