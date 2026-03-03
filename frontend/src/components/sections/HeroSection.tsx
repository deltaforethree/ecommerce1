"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
    {
        id: 1,
        label: "Couture Edit",
        heading: "The Majesty of\nIndian Heritage",
        sub: "Experience the timeless grace of hand-woven silks and intricate embroideries from our Bridal 2025 Collection.",
        cta: "Explore Collection",
        href: "/shop/lehengas",
        image: "/images/hero/bridal-lehenga.png",
        align: "left",
    },
    {
        id: 2,
        label: "Saree Soirée",
        heading: "Timeless\nSilhouettes",
        sub: "From Banarasi to Chanderi, discover the quintessential Indian drape redefined for the modern woman.",
        cta: "Shop Sarees",
        href: "/shop/sarees",
        image: "/images/hero/mustard-saree.png",
        align: "right",
    },
    {
        id: 3,
        label: "Jeweled Accents",
        heading: "Adorn Your\nDreams",
        sub: "Handcrafted Polki, Kundan, and precious stones that narrate stories of ancient artistry.",
        cta: "Shop Jewelry",
        href: "/shop/accessories",
        image: "/images/hero/jewelry.png",
        align: "center",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const go = (idx: number) => {
        setDirection(idx > current ? 1 : -1);
        setCurrent(idx);
    };

    const prev = () => go((current - 1 + SLIDES.length) % SLIDES.length);
    const next = () => go((current + 1) % SLIDES.length);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const slide = SLIDES[current];

    return (
        <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-[var(--charcoal)]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={slide.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slide.image}
                        alt={slide.heading}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex items-end pb-24">
                <div className="container-xl w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id + "text"}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
                            className={`max-w-lg ${slide.align === "right" ? "ml-auto text-right" : slide.align === "center" ? "mx-auto text-center" : ""
                                }`}
                        >
                            <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-4">
                                {slide.label}
                            </p>
                            <h1
                                className="text-5xl sm:text-6xl md:text-7xl text-white mb-6 leading-[1.05] whitespace-pre-line"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                            >
                                {slide.heading}
                            </h1>
                            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-sm">
                                {slide.sub}
                            </p>
                            <Link
                                href={slide.href}
                                className="inline-flex items-center gap-3 text-white border border-white/60 px-7 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--charcoal)] transition-all duration-300 group"
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                            >
                                {slide.cta}
                                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Slide Controls */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
                <button
                    onClick={prev}
                    className="w-9 h-9 border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Previous"
                >
                    <ChevronLeft size={15} />
                </button>
                <button
                    onClick={next}
                    className="w-9 h-9 border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Next"
                >
                    <ChevronRight size={15} />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        className={`transition-all duration-300 ${i === current ? "w-8 h-0.5 bg-white" : "w-2 h-0.5 bg-white/40"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-6 md:left-12 z-10 flex items-center gap-3"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="w-px h-10 bg-white/50"
                />
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}
