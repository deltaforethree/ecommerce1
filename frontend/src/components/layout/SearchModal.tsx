"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 60);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [open]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const q = query.toLowerCase();
        const filtered = products
            .filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.subcategory.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q))
            )
            .slice(0, 6);
        setResults(filtered);
    }, [query]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 bg-white shadow-[var(--shadow-xl)] mx-4"
                        style={{ maxWidth: "calc(100vw - 2rem)", width: "42rem" }}
                    >
                        {/* Search input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
                            <Search size={18} className="text-[var(--muted)]" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for products, categories..."
                                className="flex-1 text-base text-[var(--charcoal)] outline-none placeholder-[var(--muted-light)] bg-transparent"
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                                >
                                    <X size={15} />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="text-xs tracking-widest text-[var(--muted)] uppercase hover:text-[var(--charcoal)] transition-colors ml-2"
                            >
                                Esc
                            </button>
                        </div>

                        {/* Results */}
                        {results.length > 0 && (
                            <div className="max-h-[60vh] overflow-y-auto">
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/shop/${product.category}/${product.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--cream)] transition-colors group"
                                    >
                                        <div className="relative w-12 h-14 bg-[var(--cream-dark)] flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[var(--charcoal)] truncate" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-[var(--muted)] capitalize">
                                                {product.category} · {product.subcategory}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm text-[var(--charcoal)]">₹{product.price.toLocaleString()}</p>
                                        </div>
                                        <ArrowRight size={13} className="text-[var(--muted)] group-hover:text-[var(--charcoal)] group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        )}

                        {query && results.length === 0 && (
                            <div className="px-5 py-8 text-center">
                                <p className="text-[var(--muted)] text-sm">No results for &quot;{query}&quot;</p>
                            </div>
                        )}

                        {!query && (
                            <div className="px-5 py-5">
                                <p className="text-xs text-[var(--muted)] tracking-widest uppercase mb-3">Trending Searches</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Banarasi Saree", "Bridal Lehenga", "Anarkali Suit", "Chikankari Kurta", "Jewelry"].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setQuery(term)}
                                            className="text-xs px-3 py-1.5 border border-[var(--border)] text-[var(--muted)] hover:border-[var(--charcoal)] hover:text-[var(--charcoal)] transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
