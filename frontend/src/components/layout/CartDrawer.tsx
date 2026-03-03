"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/features/cart/context";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, subtotal, removeItem, updateQty, itemCount } = useCart();

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 35 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-[var(--shadow-xl)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={18} className="text-[var(--charcoal)]" />
                                <h2
                                    className="text-base tracking-widest uppercase"
                                    style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                                >
                                    Your Bag
                                </h2>
                                {itemCount > 0 && (
                                    <span className="text-xs bg-[var(--charcoal)] text-white px-2 py-0.5 rounded-full">
                                        {itemCount}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                                aria-label="Close cart"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full gap-4 text-center px-8"
                                >
                                    <ShoppingBag size={48} className="text-[var(--border)]" />
                                    <p
                                        className="text-xl text-[var(--charcoal)]"
                                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                                    >
                                        Your bag is empty
                                    </p>
                                    <p className="text-sm text-[var(--muted)]">
                                        Add some beautiful pieces to get started.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="btn btn-primary mt-4"
                                    >
                                        Continue Shopping
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col divide-y divide-[var(--border)]">
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex gap-4 p-5"
                                        >
                                            <div className="relative w-20 h-24 bg-[var(--cream)] flex-shrink-0 overflow-hidden">
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <Link
                                                        href={`/shop/${item.product.category}/${item.product.slug}`}
                                                        onClick={onClose}
                                                        className="text-sm font-normal leading-tight text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors line-clamp-2"
                                                        style={{ fontFamily: '"CoFo Raffine", serif' }}
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            removeItem(
                                                                item.product.id,
                                                                item.selectedSize,
                                                                item.selectedColor.name
                                                            )
                                                        }
                                                        className="flex-shrink-0 p-0.5 text-[var(--muted-light)] hover:text-[var(--charcoal)] transition-colors"
                                                    >
                                                        <X size={13} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-xs text-[var(--muted)] tracking-wide">
                                                        {item.selectedColor.name}
                                                    </span>
                                                    <span className="text-[var(--muted-light)] text-xs">·</span>
                                                    <span className="text-xs text-[var(--muted)] tracking-wide">
                                                        {item.selectedSize}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between mt-3">
                                                    {/* Qty controls */}
                                                    <div className="flex items-center border border-[var(--border)]">
                                                        <button
                                                            onClick={() =>
                                                                updateQty(
                                                                    item.product.id,
                                                                    item.selectedSize,
                                                                    item.selectedColor.name,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            className="w-8 h-8 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--cream)] transition-colors"
                                                        >
                                                            <Minus size={11} />
                                                        </button>
                                                        <span className="w-8 h-8 flex items-center justify-center text-sm text-[var(--charcoal)]">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQty(
                                                                    item.product.id,
                                                                    item.selectedSize,
                                                                    item.selectedColor.name,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="w-8 h-8 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--cream)] transition-colors"
                                                        >
                                                            <Plus size={11} />
                                                        </button>
                                                    </div>
                                                    <span className="text-sm font-normal text-[var(--charcoal)]" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                                        ₹{(item.product.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-[var(--border)] p-6 bg-[var(--cream)]">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-[var(--muted)] tracking-wide">Subtotal</span>
                                    <span className="text-lg text-[var(--charcoal)]" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                        ₹{subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--muted)] mb-5">
                                    Shipping and taxes calculated at checkout
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="btn btn-primary w-full mb-3 justify-between group"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="btn btn-secondary w-full text-center"
                                >
                                    View Full Bag
                                </Link>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
