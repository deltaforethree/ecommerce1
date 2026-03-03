"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingBag,
    Heart,
    Search,
    Menu,
    X,
    ChevronDown,
    User,
} from "lucide-react";
import { useCart } from "@/features/cart/context";
import { useWishlist } from "@/features/wishlist/context";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

const NAV_LINKS = [
    {
        label: "Sarees",
        href: "/shop/sarees",
        mega: [
            { label: "All Sarees", href: "/shop/sarees" },
            { label: "Banarasi Silk", href: "/shop/sarees?sub=banarasi" },
            { label: "Chanderi", href: "/shop/sarees?sub=chanderi" },
            { label: "Kanjeevaram", href: "/shop/sarees?sub=kanjeevaram" },
            { label: "Party Wear", href: "/shop/sarees?sub=party" },
        ],
    },
    {
        label: "Lehengas",
        href: "/shop/lehengas",
        mega: [
            { label: "All Lehengas", href: "/shop/lehengas" },
            { label: "Bridal", href: "/shop/lehengas?sub=bridal" },
            { label: "Reception", href: "/shop/lehengas?sub=reception" },
            { label: "Party Wear", href: "/shop/lehengas?sub=party" },
        ],
    },
    {
        label: "Suits",
        href: "/shop/suits",
        mega: [
            { label: "All Suits", href: "/shop/suits" },
            { label: "Anarkalis", href: "/shop/suits?sub=anarkali" },
            { label: "Sharara Sets", href: "/shop/suits?sub=sharara" },
            { label: "Salwar Suits", href: "/shop/suits?sub=salwar" },
        ],
    },
    {
        label: "Kurtas",
        href: "/shop/kurtas",
        mega: [
            { label: "All Kurtas", href: "/shop/kurtas" },
            { label: "Chikankari", href: "/shop/kurtas?sub=chikankari" },
            { label: "Cotton", href: "/shop/kurtas?sub=cotton" },
            { label: "Tunics", href: "/shop/kurtas?sub=tunics" },
        ],
    },
    {
        label: "Accessories",
        href: "/shop/accessories",
        mega: [
            { label: "All Accessories", href: "/shop/accessories" },
            { label: "Jewelry", href: "/shop/accessories?sub=jewelry" },
            { label: "Bags", href: "/shop/accessories?sub=bags" },
            { label: "Dupattas", href: "/shop/accessories?sub=dupattas" },
        ],
    },
    { label: "Sale", href: "/shop/sale", mega: [] },
];

export default function Navbar() {
    const { itemCount } = useCart();
    const { count: wishlistCount } = useWishlist();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]"
                    : "bg-white/80 backdrop-blur-sm"
                    }`}
            >
                {/* Promo strip */}
                <div className="bg-[var(--charcoal)] text-white text-xs tracking-widest text-center py-2 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap inline-block">
                        FREE SHIPPING ON ORDERS OVER ₹5,000 &nbsp;·&nbsp; NEW ARRIVALS: SPRING ESSENTIALS ARE HERE &nbsp;·&nbsp; COMPLIMENTARY GIFT WRAPPING &nbsp;·&nbsp; FREE SHIPPING ON ORDERS OVER ₹5,000 &nbsp;·&nbsp; NEW ARRIVALS: SPRING ESSENTIALS ARE HERE &nbsp;·&nbsp; COMPLIMENTARY GIFT WRAPPING &nbsp;·&nbsp;
                    </div>
                </div>

                <div className="container-xl">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <span
                                className="text-2xl font-normal tracking-[0.15em] uppercase"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif', color: "var(--charcoal)" }}
                            >
                                Raffine
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8" ref={menuRef}>
                            {NAV_LINKS.map((link) => (
                                <div
                                    key={link.label}
                                    className="relative"
                                    onMouseEnter={() => link.mega.length > 0 && setActiveMenu(link.label)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`nav-link flex items-center gap-1 text-sm tracking-widest uppercase py-1 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors duration-200 ${link.label === "Sale" ? "text-[var(--gold)] font-medium" : ""
                                            }`}
                                    >
                                        {link.label}
                                        {link.mega.length > 0 && (
                                            <ChevronDown
                                                size={12}
                                                className={`transition-transform duration-200 ${activeMenu === link.label ? "rotate-180" : ""}`}
                                            />
                                        )}
                                    </Link>

                                    {/* Mega Dropdown */}
                                    <AnimatePresence>
                                        {activeMenu === link.label && link.mega.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.18, ease: "easeOut" }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border border-[var(--border)] shadow-[var(--shadow-lg)] p-4"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    {link.mega.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={sub.href}
                                                            className="text-sm text-[var(--muted)] hover:text-[var(--charcoal)] py-1 tracking-wide transition-colors duration-150"
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>

                        {/* Right Icons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors duration-200"
                                aria-label="Search"
                            >
                                <Search size={19} />
                            </button>

                            <Link
                                href="/account"
                                className="hidden sm:flex p-2 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors duration-200"
                                aria-label="Account"
                            >
                                <User size={19} />
                            </Link>

                            <Link
                                href="/wishlist"
                                className="relative p-2 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors duration-200"
                                aria-label="Wishlist"
                            >
                                <Heart size={19} />
                                {wishlistCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 bg-[var(--gold)] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                                    >
                                        {wishlistCount}
                                    </motion.span>
                                )}
                            </Link>

                            <button
                                onClick={() => setCartOpen(true)}
                                className="relative p-2 text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors duration-200"
                                aria-label="Cart"
                            >
                                <ShoppingBag size={19} />
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 bg-[var(--charcoal)] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden p-2 text-[var(--charcoal)]"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Menu"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="lg:hidden bg-white border-t border-[var(--border)] overflow-hidden"
                        >
                            <nav className="container-xl py-6 flex flex-col gap-4">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-base tracking-widest uppercase text-[var(--charcoal)] py-1 hover:text-[var(--gold)] transition-colors ${link.label === "Sale" ? "text-[var(--gold)]" : ""
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="h-px bg-[var(--border)] my-2" />
                                <Link href="/account" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--muted)] tracking-wide">
                                    My Account
                                </Link>
                                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--muted)] tracking-wide">
                                    Wishlist
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
