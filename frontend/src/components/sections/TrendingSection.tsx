"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { getTrendingProducts } from "@/data/products";

export default function TrendingSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const trending = getTrendingProducts();

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const amt = 320;
        scrollRef.current.scrollBy({ left: dir === "right" ? amt : -amt, behavior: "smooth" });
    };

    return (
        <section className="section-sm bg-[var(--cream-dark)]">
            <div className="container-xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">
                            Right Now
                        </p>
                        <h2
                            className="text-4xl md:text-5xl text-[var(--charcoal)]"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            Trending
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white transition-all duration-200"
                            aria-label="Previous"
                        >
                            <ArrowLeft size={14} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white transition-all duration-200"
                            aria-label="Next"
                        >
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </motion.div>

                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {trending.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.4, delay: idx * 0.07 }}
                            className="flex-shrink-0 w-60 snap-start"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
