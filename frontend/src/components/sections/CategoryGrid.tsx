"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function CategoryGrid() {
    const featured = categories.filter((c) => c.featured);

    return (
        <section className="section bg-[var(--cream)]">
            <div className="container-xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">
                            Shop by Collection
                        </p>
                        <h2
                            className="text-4xl md:text-5xl text-[var(--charcoal)] leading-tight"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            For Every
                            <br />
                            Occasion
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors group"
                    >
                        View All
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Asymmetric Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {featured.map((cat, idx) => (
                        <motion.div
                            key={cat.id}
                            variants={itemVariants}
                            className={idx === 0 ? "col-span-2 row-span-2 lg:col-span-2" : ""}
                        >
                            <Link href={`/shop/${cat.slug}`} className="block relative overflow-hidden group aspect-[4/5]">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                                    sizes={idx === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <p className="text-white/70 text-[10px] tracking-[0.3em] uppercase mb-1">
                                        {cat.productCount} pieces
                                    </p>
                                    <h3
                                        className={`text-white mb-2 ${idx === 0 ? "text-4xl md:text-5xl" : "text-2xl"}`}
                                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                                    >
                                        {cat.name}
                                    </h3>
                                    <p className={`text-white/70 text-sm leading-relaxed ${idx === 0 ? "max-w-xs" : "hidden"}`}>
                                        {cat.description}
                                    </p>
                                    <div className="mt-4 inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/40 pb-0.5 w-fit group-hover:border-white transition-colors">
                                        Shop {cat.name}
                                        <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
