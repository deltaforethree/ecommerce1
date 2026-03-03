import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import PDPClient from "./PDPClient";

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
    return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
        title: `${product.name} — Raffine`,
        description: product.description,
        openGraph: {
            images: [{ url: product.images[0], width: 800, height: 1000, alt: product.name }],
        },
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();
    const related = getRelatedProducts(product, 4);
    return <PDPClient product={product} related={related} />;
}
