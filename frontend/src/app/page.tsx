import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import TrendingSection from "@/components/sections/TrendingSection";
import NewArrivals from "@/components/sections/NewArrivals";
import NewsletterSection from "@/components/sections/NewsletterSection";
import BrandValues from "@/components/sections/BrandValues";

export const metadata: Metadata = {
  title: "Raffine — Luxury Indian Ethnic Wear & Heritage Fashion",
  description:
    "Explore our collection of hand-woven Banarasi sarees, bridal lehengas, and designer ethnic wear for women. Experience the essence of Indian craftsmanship.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <TrendingSection />
      <NewArrivals />
      <BrandValues />
      <NewsletterSection />
    </>
  );
}
