import Image from "next/image";
import Header from "@/components/organisms/Header";
import MovieSection from "@/components/organisms/MovieSection";
export default function Home() {
  return (
    <div className="bg-surface">
    <Header />
    <MovieSection />
    </div>
  );
}
