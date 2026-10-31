import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustBar } from "@/components/home/TrustBar";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="space-y-12 sm:space-y-16">
        <CategorySection />
        <FeaturedProducts />
        <TrustBar />
        <PromoBanner />
        <Newsletter />
      </div>
    </>
  );
}
