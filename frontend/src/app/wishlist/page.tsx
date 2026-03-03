"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/features/wishlist/context";
import { useCart } from "@/features/cart/context";

export default function WishlistPage() {
    const { items, toggle } = useWishlist();
    const { addItem } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <Heart size={56} className="text-[var(--border)] mb-5" />
                <h1
                    className="text-3xl text-[var(--charcoal)] mb-3"
                    style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                >
                    Your Wishlist is Empty
                </h1>
                <p className="text-[var(--muted)] max-w-xs mb-8">
                    Save pieces you love by clicking the heart icon on any product.
                </p>
                <Link href="/shop" className="btn btn-primary">
                    Explore the Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[var(--cream)] border-b border-[var(--border)] py-12">
                <div className="container-xl">
                    <h1
                        className="text-5xl text-[var(--charcoal)]"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Wishlist
                    </h1>
                    <p className="text-[var(--muted)] mt-2">{items.length} saved item{items.length !== 1 && "s"}</p>
                </div>
            </div>

            <div className="container-xl py-12">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"
                >
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative"
                            >
                                <Link href={`/shop/${item.product.category}/${item.product.slug}`} className="block">
                                    <div className="relative aspect-[3/4] bg-[var(--cream)] overflow-hidden mb-3">
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                                            sizes="(max-width: 640px) 50vw, 25vw"
                                        />
                                        {/* Remove from wishlist */}
                                        <button
                                            onClick={(e) => { e.preventDefault(); toggle(item.product); }}
                                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <X size={13} className="text-[var(--charcoal)]" />
                                        </button>
                                    </div>
                                    <h3 className="text-sm text-[var(--charcoal)] mb-1" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                        {item.product.name}
                                    </h3>
                                    <p className="text-sm text-[var(--charcoal)] mb-3">
                                        ₹{item.product.price.toLocaleString()}
                                    </p>
                                </Link>
                                <button
                                    onClick={() => {
                                        addItem(item.product, item.product.colors[0], item.product.variants[0].size, 1);
                                    }}
                                    className="btn btn-secondary w-full text-center text-xs py-2"
                                >
                                    <ShoppingBag size={12} />
                                    Add to Bag
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
