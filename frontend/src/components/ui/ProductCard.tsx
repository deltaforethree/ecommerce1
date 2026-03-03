"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { useWishlist } from "@/features/wishlist/context";
import { useCart } from "@/features/cart/context";
import { useToast } from "@/features/toast/context";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const { toggle, contains } = useWishlist();
    const { addItem } = useCart();
    const { toast } = useToast();
    const [imgIdx, setImgIdx] = useState(0);
    const [addedFlash, setAddedFlash] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const isWishlisted = contains(product.id);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const defaultColor = product.colors[0];
        const defaultSize = product.variants[0]?.size ?? "M";
        addItem(product, defaultColor, defaultSize, 1);
        setAddedFlash(true);
        toast(`${product.name} added to bag`, "success");
        setTimeout(() => setAddedFlash(false), 1400);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
        toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsQuickViewOpen(true);
    };

    return (
        <>
        <Link href={`/shop/${product.category}/${product.slug}`} className="product-card group block">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--cream)]">
                <Image
                    src={product.images[imgIdx] ?? product.images[0]}
                    alt={product.name}
                    fill
                    priority={priority}
                    className="product-card-img object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onMouseEnter={() => product.images[1] && setImgIdx(1)}
                    onMouseLeave={() => setImgIdx(0)}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
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
                    {product.isBestSeller && !product.isNew && !product.discount && (
                        <span className="bg-[var(--charcoal)] text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
                            Best Seller
                        </span>
                    )}
                </div>

                {/* Overlay Actions */}
                <div className="product-card-overlay absolute inset-0 bg-black/10 flex flex-col justify-end p-3">
                    <div className="flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <button
                            onClick={handleQuickAdd}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase transition-all duration-200 ${addedFlash
                                    ? "bg-[var(--gold)] text-white"
                                    : "bg-white text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white"
                                }`}
                            style={{ fontFamily: '"CoFo Raffine", serif' }}
                        >
                            <ShoppingBag size={13} />
                            {addedFlash ? "Added!" : "Quick Add"}
                        </button>
                        <button
                            onClick={handleQuickView}
                            className="w-10 h-10 bg-white flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white transition-all duration-200"
                            aria-label="Quick view"
                        >
                            <Eye size={13} />
                        </button>
                    </div>
                </div>

                {/* Wishlist */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center transition-all hover:bg-white shadow-sm"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        size={14}
                        className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-[var(--charcoal)]"}`}
                    />
                </button>
            </div>

            {/* Info */}
            <div className="pt-3 pb-1">
                <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={10}
                            className={i < Math.floor(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--border)]"}
                        />
                    ))}
                    <span className="text-[11px] text-[var(--muted)] ml-1">({product.reviewCount})</span>
                </div>

                <h3
                    className="text-sm text-[var(--charcoal)] leading-snug mb-1.5 line-clamp-2"
                    style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                >
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-normal text-[var(--charcoal)]">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-[var(--muted-light)] line-through">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Color swatches */}
                {product.colors.length > 1 && (
                    <div className="flex gap-1.5 mt-2">
                        {product.colors.slice(0, 4).map((color) => (
                            <div
                                key={color.name}
                                title={color.name}
                                className="w-3.5 h-3.5 rounded-full border border-[var(--border)] cursor-pointer hover:scale-110 transition-transform"
                                style={{ backgroundColor: color.hex }}
                            />
                        ))}
                        {product.colors.length > 4 && (
                            <span className="text-[10px] text-[var(--muted)] self-center">
                                +{product.colors.length - 4}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
        <QuickViewModal 
            product={product} 
            isOpen={isQuickViewOpen} 
            onClose={() => setIsQuickViewOpen(false)} 
        />
        </>
    );
}
