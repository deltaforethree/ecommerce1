"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    ShoppingBag,
    Star,
    ChevronDown,
    ChevronRight,
    Check,
    Ruler,
    Truck,
    RotateCcw,
} from "lucide-react";
import type { Product, ProductColor, ProductSize } from "@/types/product";
import { useCart } from "@/features/cart/context";
import { useWishlist } from "@/features/wishlist/context";
import { useToast } from "@/features/toast/context";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface PDPClientProps {
    product: Product;
    related: Product[];
}

export default function PDPClient({ product, related }: PDPClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
    const [added, setAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>("description");

    const { addItem } = useCart();
    const { toggle, contains } = useWishlist();
    const { toast } = useToast();
    const isWishlisted = contains(product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            toast("Please select a size", "error");
            setTimeout(() => setSizeError(false), 2000);
            return;
        }
        addItem(product, selectedColor, selectedSize, 1);
        setAdded(true);
        toast(`${product.name} added to bag`, "success");
        setTimeout(() => setAdded(false), 2000);
    };

    const accordionSections = [
        { id: "description", label: "Description", content: product.description },
        { id: "details", label: "Details & Materials", content: product.details.join("\n") },
        { id: "care", label: "Care Instructions", content: product.careInstructions.join("\n") },
    ];

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <div className="container-xl pt-6 pb-2">
                <Breadcrumbs 
                  items={[
                    { label: "Shop", href: "/shop" },
                    { label: product.category, href: `/shop/${product.category}` },
                    { label: product.name }
                  ]} 
                />
            </div>

            {/* PDP Layout */}
            <div className="container-xl pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 pt-6">
                    {/* Image Gallery */}
                    <div className="flex gap-4">
                        {/* Thumbnails */}
                        <div className="hidden sm:flex flex-col gap-2 w-16">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative aspect-[3/4] overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-[var(--charcoal)]" : "border-transparent hover:border-[var(--border)]"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} view ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 relative aspect-[3/4] bg-[var(--cream)] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 1.03 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.images[selectedImage]}
                                        alt={product.name}
                                        fill
                                        priority
                                        className="object-cover object-center"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Z oom hint */}
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-[10px] tracking-widest uppercase text-[var(--muted)]">
                                Hover to zoom
                            </div>

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.isNew && (
                                    <span className="bg-white text-[var(--charcoal)] text-[10px] tracking-widest uppercase px-2.5 py-1">
                                        New
                                    </span>
                                )}
                                {product.discount && (
                                    <span className="bg-[var(--gold)] text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted)] mb-2">
                            {product.subcategory}
                        </p>
                        <h1
                            className="text-3xl sm:text-4xl text-[var(--charcoal)] leading-tight mb-4"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={13}
                                        className={i < Math.round(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--border)]"}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-[var(--muted)]">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-8">
                            <span
                                className="text-2xl text-[var(--charcoal)]"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                            >
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-base text-[var(--muted-light)] line-through">
                                        ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-[var(--gold)]">Save {product.discount}%</span>
                                </>
                            )}
                        </div>

                        {/* Color */}
                        <div className="mb-6">
                            <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-3">
                                Colour: <span className="text-[var(--charcoal)]">{selectedColor.name}</span>
                            </p>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        title={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor.name === color.name
                                                ? "border-[var(--charcoal)] scale-110"
                                                : "border-transparent hover:border-[var(--muted-light)]"
                                            }`}
                                        style={{ backgroundColor: color.hex, boxShadow: "0 0 0 2px var(--cream)" }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <p className={`text-xs tracking-[0.2em] uppercase ${sizeError ? "text-red-500" : "text-[var(--muted)]"}`}>
                                    {sizeError ? "Please select a size" : "Size"}
                                </p>
                                <button className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors">
                                    <Ruler size={11} />
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.map((v) => (
                                    <button
                                        key={v.size}
                                        onClick={() => setSelectedSize(v.size)}
                                        disabled={v.stock === 0}
                                        className={`min-w-[52px] py-2.5 px-3 text-sm border transition-all duration-200 ${selectedSize === v.size
                                                ? "bg-[var(--charcoal)] text-white border-[var(--charcoal)]"
                                                : v.stock === 0
                                                    ? "border-[var(--border)] text-[var(--muted-light)] line-through cursor-not-allowed"
                                                    : "border-[var(--border)] text-[var(--charcoal)] hover:border-[var(--charcoal)]"
                                            }`}
                                    >
                                        {v.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-8">
                            <motion.button
                                onClick={handleAddToCart}
                                className={`flex-1 btn flex items-center justify-center gap-3 py-4 transition-all ${added
                                        ? "bg-[var(--gold)] text-white"
                                        : "bg-[var(--charcoal)] text-white hover:bg-[var(--charcoal-light)]"
                                    }`}
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {added ? (
                                    <>
                                        <Check size={16} />
                                        Added to Bag
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={16} />
                                        Add to Bag
                                    </>
                                )}
                            </motion.button>
                            <motion.button
                                onClick={() => toggle(product)}
                                className={`w-14 border flex items-center justify-center transition-all duration-200 ${isWishlisted
                                        ? "border-red-400 bg-red-50"
                                        : "border-[var(--border)] hover:border-[var(--charcoal)]"
                                    }`}
                                whileTap={{ scale: 0.93 }}
                                aria-label="Wishlist"
                            >
                                <Heart
                                    size={18}
                                    className={isWishlisted ? "fill-red-500 text-red-500" : "text-[var(--charcoal)]"}
                                />
                            </motion.button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-4 py-5 border-y border-[var(--border)] mb-8">
                            {[
                                { Icon: Truck, label: "Free Shipping", sub: "Over ₹5,000" },
                                { Icon: RotateCcw, label: "Free Returns", sub: "Within 30 days" },
                                { Icon: Check, label: "Authentic", sub: "Certified Quality" },
                            ].map(({ Icon, label, sub }) => (
                                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                                    <Icon size={18} className="text-[var(--muted)]" />
                                    <span className="text-xs font-medium text-[var(--charcoal)]">{label}</span>
                                    <span className="text-[10px] text-[var(--muted)]">{sub}</span>
                                </div>
                            ))}
                        </div>

                        {/* Accordion */}
                        <div className="flex flex-col">
                            {accordionSections.map(({ id, label, content }) => (
                                <div key={id} className="border-b border-[var(--border)]">
                                    <button
                                        onClick={() => setOpenSection(openSection === id ? null : id)}
                                        className="flex items-center justify-between w-full py-4 text-left"
                                    >
                                        <span className="text-sm tracking-[0.15em] uppercase text-[var(--charcoal)]"
                                            style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                            {label}
                                        </span>
                                        <ChevronDown
                                            size={14}
                                            className={`text-[var(--muted)] transition-transform duration-200 ${openSection === id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openSection === id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-4 text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                                                    {content}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                {product.reviews.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-[var(--border)]">
                        <h2
                            className="text-3xl text-[var(--charcoal)] mb-8"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            Customer Reviews
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className="p-6 bg-[var(--cream)]">
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={i < review.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--border)]"}
                                            />
                                        ))}
                                    </div>
                                    <h4
                                        className="text-base text-[var(--charcoal)] mb-1"
                                        style={{ fontFamily: '"CoFo Raffine", serif' }}
                                    >
                                        {review.title}
                                    </h4>
                                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">{review.body}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-[var(--charcoal)]">{review.author}</span>
                                        {review.verified && (
                                            <span className="text-[10px] bg-[var(--charcoal)] text-white px-2 py-0.5 tracking-wide">
                                                Verified
                                            </span>
                                        )}
                                        <span className="text-xs text-[var(--muted)] ml-auto">{review.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-[var(--border)]">
                        <h2
                            className="text-3xl text-[var(--charcoal)] mb-8"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
