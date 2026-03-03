"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Check } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[var(--cream)] border-b border-[var(--border)] py-14">
                <div className="container-xl">
                    <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">Get in Touch</p>
                    <h1
                        className="text-5xl text-[var(--charcoal)]"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Contact Us
                    </h1>
                </div>
            </div>

            <div className="container-xl section">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Info */}
                    <div>
                        <h2
                            className="text-2xl text-[var(--charcoal)] mb-6"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                        >
                            We&apos;d Love to Hear From You
                        </h2>
                        <p className="text-[var(--muted)] leading-relaxed mb-10">
                            Whether you have a question about sizing, an order query, or a collaboration proposal — our team is here to help and aims to respond within 24 hours.
                        </p>
                        <div className="flex flex-col gap-6">
                            {[
                                { Icon: Mail, label: "Email", value: "hello@raffine.in" },
                                { Icon: Phone, label: "Phone", value: "+91 98765 43210" },
                                { Icon: MapPin, label: "Studio", value: "12 Design District, Bengaluru, Karnataka 560001" },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                                        <Icon size={16} className="text-[var(--muted)]" />
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-0.5">{label}</p>
                                        <p className="text-sm text-[var(--charcoal)]">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center gap-4 py-12 text-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-[var(--charcoal)] flex items-center justify-center">
                                    <Check size={20} className="text-white" />
                                </div>
                                <h3
                                    className="text-xl text-[var(--charcoal)]"
                                    style={{ fontFamily: '"CoFo Raffine", serif' }}
                                >
                                    Message Sent
                                </h3>
                                <p className="text-sm text-[var(--muted)]">
                                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input className="input-base" placeholder="First Name" required type="text" />
                                    <input className="input-base" placeholder="Last Name" required type="text" />
                                </div>
                                <input className="input-base" placeholder="Email Address" required type="email" />
                                <input className="input-base" placeholder="Subject" type="text" />
                                <textarea
                                    className="input-base"
                                    placeholder="Your message..."
                                    rows={5}
                                    required
                                    style={{ resize: "vertical", fontFamily: '"CoFo Raffine", serif' }}
                                />
                                <button type="submit" className="btn btn-primary self-start">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
