import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import TrendingSection from "@/components/sections/TrendingSection";
import NewArrivals from "@/components/sections/NewArrivals";
import NewsletterSection from "@/components/sections/NewsletterSection";
import BrandValues from "@/components/sections/BrandValues";

export const metadata: Metadata = {
  title: "Raffine — Effortlessly Refined Clothing",
  description:
    "Discover premium clothing crafted from the world's finest fabrics. Silk, cashmere, linen, and luxury knitwear.",
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
