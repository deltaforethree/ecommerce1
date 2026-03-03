"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/context";

export default function CartPage() {
    const { items, subtotal, removeItem, updateQty, itemCount } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-5"
                >
                    <ShoppingBag size={56} className="text-[var(--border)]" />
                    <h1
                        className="text-3xl text-[var(--charcoal)]"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Your Bag is Empty
                    </h1>
                    <p className="text-[var(--muted)] max-w-xs">
                        Looks like you haven&apos;t added anything yet. Explore our collection.
                    </p>
                    <Link href="/shop" className="btn btn-primary mt-4">
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    const shipping = subtotal >= 5000 ? 0 : 250;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[var(--cream)] border-b border-[var(--border)] py-12">
                <div className="container-xl">
                    <h1
                        className="text-5xl text-[var(--charcoal)]"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Shopping Bag
                    </h1>
                    <p className="text-[var(--muted)] mt-2">{itemCount} item{itemCount !== 1 && "s"}</p>
                </div>
            </div>

            <div className="container-xl py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Items */}
                    <div className="lg:col-span-2 flex flex-col divide-y divide-[var(--border)]">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                                    layout
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    className="flex gap-5 py-6"
                                >
                                    <div className="relative w-24 h-32 bg-[var(--cream)] flex-shrink-0 overflow-hidden">
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <Link
                                                    href={`/shop/${item.product.category}/${item.product.slug}`}
                                                    className="text-base text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors"
                                                    style={{ fontFamily: '"CoFo Raffine", serif' }}
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <div className="flex gap-3 mt-1">
                                                    <span className="text-xs text-[var(--muted)]">{item.selectedColor.name}</span>
                                                    <span className="text-xs text-[var(--muted-light)]">·</span>
                                                    <span className="text-xs text-[var(--muted)]">{item.selectedSize}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                                                className="p-1 text-[var(--muted-light)] hover:text-[var(--charcoal)] transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex items-center border border-[var(--border)]">
                                                <button
                                                    onClick={() => updateQty(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                                                    className="w-9 h-9 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--cream)] transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-10 h-9 flex items-center justify-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQty(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                                                    className="w-9 h-9 flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--cream)] transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <span
                                                className="text-base text-[var(--charcoal)]"
                                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                                            >
                                                ₹{(item.product.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[var(--cream)] p-6 sticky top-28">
                            <h2
                                className="text-xl text-[var(--charcoal)] mb-6"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                            >
                                Order Summary
                            </h2>
                            <div className="flex flex-col gap-3 mb-5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--muted)]">Subtotal</span>
                                    <span className="text-[var(--charcoal)]">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--muted)]">Shipping</span>
                                    <span className="text-[var(--charcoal)]">
                                        {shipping === 0 ? "Free" : `₹${shipping}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] text-[var(--muted)]">
                                        Add ₹{(5000 - subtotal).toLocaleString()} more for free shipping
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-between pt-4 border-t border-[var(--border)] mb-6">
                                <span
                                    className="text-base text-[var(--charcoal)]"
                                    style={{ fontFamily: '"CoFo Raffine", serif' }}
                                >
                                    Total
                                </span>
                                <span
                                    className="text-xl text-[var(--charcoal)]"
                                    style={{ fontFamily: '"CoFo Raffine", serif' }}
                                >
                                    ₹{total.toLocaleString()}
                                </span>
                            </div>
                            <Link href="/checkout" className="btn btn-primary w-full mb-3 justify-between group">
                                <span>Proceed to Checkout</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/shop" className="btn btn-secondary w-full justify-center">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
