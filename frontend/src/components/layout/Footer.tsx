"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const shopLinks = [
    { label: "Sarees", href: "/shop/sarees" },
    { label: "Lehengas", href: "/shop/lehengas" },
    { label: "Suits & Anarkalis", href: "/shop/suits" },
    { label: "Kurtas", href: "/shop/kurtas" },
    { label: "Accessories", href: "/shop/accessories" },
    { label: "Sale", href: "/shop/sale" },
];

const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Careers", href: "/about#careers" },
    { label: "Press", href: "/about#press" },
    { label: "Contact", href: "/contact" },
];

const helpLinks = [
    { label: "Shipping & Returns", href: "/help/shipping" },
    { label: "Size Guide", href: "/help/sizing" },
    { label: "Care Instructions", href: "/help/care" },
    { label: "FAQ", href: "/help/faq" },
    { label: "Privacy Policy", href: "/help/privacy" },
];

export default function Footer() {
    return (
        <footer className="bg-[var(--charcoal)] text-white">
            <div className="container-xl section">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2
                            className="text-3xl tracking-[0.2em] uppercase mb-4"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 400 }}
                        >
                            Raffine
                        </h2>
                        <p className="text-[var(--muted-light)] text-sm leading-relaxed mb-8 max-w-xs">
                            Crafted with intention. Worn with purpose. Each piece is designed to last a lifetime and become more beautiful with every passing season.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 border border-[var(--border-dark)] flex items-center justify-center text-[var(--muted-light)] hover:text-white hover:border-white transition-colors duration-200"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] uppercase font-normal text-[var(--muted-light)] mb-5">
                            Shop
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {shopLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--muted-light)] hover:text-white transition-colors duration-150 tracking-wide"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] uppercase font-normal text-[var(--muted-light)] mb-5">
                            Company
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--muted-light)] hover:text-white transition-colors duration-150 tracking-wide"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] uppercase font-normal text-[var(--muted-light)] mb-5">
                            Help
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {helpLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--muted-light)] hover:text-white transition-colors duration-150 tracking-wide"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="border-t border-[var(--border-dark)] mt-16 pt-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h3
                                className="text-xl mb-2 font-normal"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                            >
                                Join the inner circle
                            </h3>
                            <p className="text-sm text-[var(--muted-light)]">
                                Be the first to know about new arrivals, exclusive events and private sales.
                            </p>
                        </div>
                        <form
                            className="flex w-full md:max-w-sm"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-4 py-3 bg-transparent border border-[var(--border-dark)] text-white text-sm placeholder-[var(--muted)] outline-none focus:border-[var(--muted-light)] transition-colors"
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                            />
                            <button
                                type="submit"
                                className="px-5 py-3 bg-white text-[var(--charcoal)] text-xs font-normal tracking-widest uppercase hover:bg-[var(--cream)] transition-colors"
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-[var(--border-dark)] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--muted)] tracking-wide">
                        © {new Date().getFullYear()} Raffine. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs text-[var(--muted)] tracking-wide">
                            Made in India with ♥
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
