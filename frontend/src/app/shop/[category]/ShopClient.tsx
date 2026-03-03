"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/data/products";
import type { ProductCategory, SortOption } from "@/types/product";

interface ShopClientProps {
    categorySlug?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "bestseller", label: "Best Sellers" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Free Size"];
const PRICE_RANGES: [number, number, string][] = [
    [0, 100, "Under ₹100"],
    [100, 300, "₹100 – ₹300"],
    [300, 600, "₹300 – ₹600"],
    [600, 10000, "Over ₹600"],
];

export default function ShopClient({ categorySlug }: ShopClientProps) {
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [filterOpen, setFilterOpen] = useState(false);

    const cat = categorySlug as ProductCategory | undefined;

    const filtered = useMemo(() => {
        let list = cat ? products.filter((p) => p.category === cat) : products;

        if (selectedSizes.length > 0) {
            list = list.filter((p) =>
                p.variants.some((v) => selectedSizes.includes(v.size))
            );
        }

        if (selectedPriceRange) {
            const range = PRICE_RANGES.find((r) => r[2] === selectedPriceRange);
            if (range) {
                list = list.filter((p) => p.price >= range[0] && p.price <= range[1]);
            }
        }

        switch (sortBy) {
            case "newest":
                return list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
            case "price-asc":
                return [...list].sort((a, b) => a.price - b.price);
            case "price-desc":
                return [...list].sort((a, b) => b.price - a.price);
            case "rating":
                return [...list].sort((a, b) => b.rating - a.rating);
            case "bestseller":
                return list.filter((p) => p.isBestSeller).concat(list.filter((p) => !p.isBestSeller));
            default:
                return list.filter((p) => p.isFeatured).concat(list.filter((p) => !p.isFeatured));
        }
    }, [cat, sortBy, selectedSizes, selectedPriceRange]);

    const categoryObj = cat ? categories.find((c) => c.slug === cat) : null;

    const toggleSize = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const clearFilters = () => {
        setSelectedSizes([]);
        setSelectedPriceRange(null);
    };

    const hasFilters = selectedSizes.length > 0 || selectedPriceRange !== null;

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <div className="bg-[var(--cream)] border-b border-[var(--border)] pt-24 pb-12">
                <div className="container-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">
                            {categoryObj ? "Category" : "All Products"}
                        </p>
                        <h1
                            className="text-5xl md:text-6xl text-[var(--charcoal)]"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            {categoryObj?.name ?? "The Collection"}
                        </h1>
                        {categoryObj && (
                            <p className="text-[var(--muted)] mt-3 text-base max-w-md">
                                {categoryObj.description}
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>

            <div className="container-xl py-8">
                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-[var(--border)]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-2 text-sm tracking-wide text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors"
                        >
                            <SlidersHorizontal size={15} />
                            Filters
                            {hasFilters && (
                                <span className="w-5 h-5 bg-[var(--charcoal)] text-white text-[10px] rounded-full flex items-center justify-center">
                                    {selectedSizes.length + (selectedPriceRange ? 1 : 0)}
                                </span>
                            )}
                        </button>
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                            >
                                <X size={11} />
                                Clear
                            </button>
                        )}
                        <span className="text-sm text-[var(--muted)]">
                            {filtered.length} items
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="text-sm text-[var(--charcoal)] border-0 outline-none bg-transparent cursor-pointer"
                            style={{ fontFamily: '"CoFo Raffine", serif' }}
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>

                        <div className="hidden sm:flex items-center border border-[var(--border)]">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[var(--charcoal)] text-white" : "text-[var(--muted)] hover:text-[var(--charcoal)]"}`}
                            >
                                <Grid3X3 size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 transition-colors ${viewMode === "list" ? "bg-[var(--charcoal)] text-white" : "text-[var(--muted)] hover:text-[var(--charcoal)]"}`}
                            >
                                <List size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    {filterOpen && (
                        <motion.aside
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 220 }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex-shrink-0 w-56"
                        >
                            {/* Sizes */}
                            <div className="mb-8">
                                <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {SIZES.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={`px-3 py-1.5 text-xs border transition-all duration-200 ${selectedSizes.includes(size)
                                                ? "bg-[var(--charcoal)] text-white border-[var(--charcoal)]"
                                                : "border-[var(--border)] text-[var(--charcoal)] hover:border-[var(--charcoal)]"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4">Price</h3>
                                <div className="flex flex-col gap-2">
                                    {PRICE_RANGES.map(([, , label]) => (
                                        <button
                                            key={label}
                                            onClick={() =>
                                                setSelectedPriceRange(selectedPriceRange === label ? null : label)
                                            }
                                            className={`text-left text-sm py-1 transition-colors ${selectedPriceRange === label
                                                ? "text-[var(--charcoal)] font-medium"
                                                : "text-[var(--muted)] hover:text-[var(--charcoal)]"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4">Category</h3>
                                <div className="flex flex-col gap-2">
                                    {categories.map((c) => (
                                        <a
                                            key={c.id}
                                            href={`/shop/${c.slug}`}
                                            className={`text-sm py-0.5 transition-colors capitalize ${c.slug === cat
                                                ? "text-[var(--charcoal)] font-medium"
                                                : "text-[var(--muted)] hover:text-[var(--charcoal)]"
                                                }`}
                                        >
                                            {c.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>
                    )}

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filtered.length === 0 ? (
                            <div className="text-center py-24">
                                <p
                                    className="text-2xl text-[var(--muted)]"
                                    style={{ fontFamily: '"CoFo Raffine", serif' }}
                                >
                                    No products found
                                </p>
                                <button onClick={clearFilters} className="btn btn-secondary mt-6">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                layout
                                className={`grid gap-x-4 gap-y-10 ${viewMode === "grid"
                                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                    : "grid-cols-2 md:grid-cols-3"
                                    }`}
                            >
                                {filtered.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: idx < 8 ? idx * 0.05 : 0 }}
                                    >
                                        <ProductCard product={product} priority={idx < 4} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
