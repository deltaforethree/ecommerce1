import type { Metadata } from "next";
import { categories } from "@/data/products";
import ShopClient from "./ShopClient";

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const cat = categories.find((c) => c.slug === category);
    return {
        title: cat ? `${cat.name} — Raffine` : "Shop — Raffine",
        description: cat?.description ?? "Discover the full Raffine collection.",
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    return <ShopClient categorySlug={category} />;
}
