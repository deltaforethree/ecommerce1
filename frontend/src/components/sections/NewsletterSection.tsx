"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
        setEmail("");
    };

    return (
        <section className="section-sm bg-[var(--cream)]">
            <div className="container-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55 }}
                    className="text-center max-w-xl mx-auto"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-4">
                        Stay Connected
                    </p>
                    <h2
                        className="text-4xl md:text-5xl text-[var(--charcoal)] mb-4"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Join the Inner Circle
                    </h2>
                    <p className="text-[var(--muted)] text-base leading-relaxed mb-10">
                        Sign up for curated edits, early access to sales, and exclusive invitations to private events.
                    </p>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-full bg-[var(--charcoal)] flex items-center justify-center">
                                <Check size={20} className="text-white" />
                            </div>
                            <p className="text-[var(--charcoal)] font-normal" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                Thank you for subscribing.
                            </p>
                            <p className="text-sm text-[var(--muted)]">
                                We&apos;ll be in touch with something beautiful soon.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Your email address"
                                className="flex-1 px-5 py-4 border border-[var(--border)] bg-white text-sm text-[var(--charcoal)] outline-none focus:border-[var(--charcoal)] transition-colors placeholder-[var(--muted-light)]"
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary whitespace-nowrap group sm:border-l-0"
                            >
                                Subscribe
                                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    <p className="text-xs text-[var(--muted-light)] mt-5">
                        By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
