"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Package, Heart, Globe } from "lucide-react";

const values = [
    {
        Icon: Leaf,
        title: "Sustainably Sourced",
        desc: "We partner only with mills and artisans who share our commitment to the environment and fair labour practices.",
    },
    {
        Icon: Package,
        title: "Crafted to Last",
        desc: "Every seam, every stitch is held to the highest standard. We believe in fashion that transcends seasons.",
    },
    {
        Icon: Heart,
        title: "Made with Intention",
        desc: "Our design process is unhurried. Each collection is developed over 18 months with care and consideration.",
    },
    {
        Icon: Globe,
        title: "Global Artisanship",
        desc: "From Tuscan leather atelier to Scottish cashmere mills — we seek out the very best the world has to offer.",
    },
];

export default function BrandValues() {
    return (
        <section className="section bg-[var(--charcoal)]">
            <div className="container-xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted-light)] mb-4">
                        Our Philosophy
                    </p>
                    <h2
                        className="text-4xl md:text-5xl text-white"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Why Raffine
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center gap-4"
                        >
                            <div className="w-12 h-12 border border-[var(--border-dark)] flex items-center justify-center">
                                <v.Icon size={20} className="text-[var(--gold)]" />
                            </div>
                            <h3
                                className="text-lg text-white font-normal"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                            >
                                {v.title}
                            </h3>
                            <p className="text-sm text-[var(--muted-light)] leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
