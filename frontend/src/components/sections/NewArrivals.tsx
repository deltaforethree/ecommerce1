"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { getNewArrivals } from "@/data/products";

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function NewArrivals() {
    const arrivals = getNewArrivals();

    return (
        <section className="section bg-white">
            <div className="container-xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">
                            Just Arrived
                        </p>
                        <h2
                            className="text-4xl md:text-5xl text-[var(--charcoal)]"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            New Arrivals
                        </h2>
                    </div>
                    <Link
                        href="/shop?filter=new"
                        className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors group"
                    >
                        View All
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"
                >
                    {arrivals.map((product) => (
                        <motion.div key={product.id} variants={item}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
