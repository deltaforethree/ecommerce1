"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, CreditCard, MapPin, User } from "lucide-react";

const STEPS = ["Information", "Shipping", "Payment"];

export default function CheckoutPage() {
    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    const nextStep = () => {
        if (step < STEPS.length - 1) setStep((s) => s + 1);
        else setCompleted(true);
    };

    if (completed) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-5 max-w-md"
                >
                    <div className="w-16 h-16 rounded-full bg-[var(--charcoal)] flex items-center justify-center">
                        <Check size={28} className="text-white" />
                    </div>
                    <h1
                        className="text-4xl text-[var(--charcoal)]"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Thank You
                    </h1>
                    <p className="text-[var(--muted)] leading-relaxed">
                        Your order has been placed. You will receive a confirmation email shortly with tracking details.
                    </p>
                    <p className="text-sm text-[var(--muted)]">Order #RAF{Math.floor(Math.random() * 90000) + 10000}</p>
                    <Link href="/shop" className="btn btn-primary mt-4">
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[var(--cream)] border-b border-[var(--border)] py-10">
                <div className="container-lg">
                    <h1
                        className="text-4xl text-[var(--charcoal)] mb-6"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Checkout
                    </h1>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-4">
                        {STEPS.map((s, i) => (
                            <React.Fragment key={s}>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${i < step
                                                ? "bg-[var(--charcoal)] text-white"
                                                : i === step
                                                    ? "bg-[var(--charcoal)] text-white"
                                                    : "bg-[var(--border)] text-[var(--muted)]"
                                            }`}
                                    >
                                        {i < step ? <Check size={12} /> : i + 1}
                                    </div>
                                    <span
                                        className={`text-xs tracking-wide ${i === step ? "text-[var(--charcoal)]" : "text-[var(--muted)]"
                                            }`}
                                    >
                                        {s}
                                    </span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <ChevronRight size={12} className="text-[var(--border)]" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-lg py-12">
                <div className="max-w-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            {step === 0 && (
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <User size={16} className="text-[var(--muted)]" />
                                        <h2 className="text-sm tracking-[0.2em] uppercase text-[var(--charcoal)]">Contact Information</h2>
                                    </div>
                                    <input className="input-base" placeholder="Full Name" required type="text" />
                                    <input className="input-base" placeholder="Email Address" required type="email" />
                                    <input className="input-base" placeholder="Phone Number" type="tel" />
                                </div>
                            )}

                            {step === 1 && (
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <MapPin size={16} className="text-[var(--muted)]" />
                                        <h2 className="text-sm tracking-[0.2em] uppercase text-[var(--charcoal)]">Shipping Address</h2>
                                    </div>
                                    <input className="input-base" placeholder="Address Line 1" required type="text" />
                                    <input className="input-base" placeholder="Address Line 2 (optional)" type="text" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input className="input-base" placeholder="City" required type="text" />
                                        <input className="input-base" placeholder="PIN Code" required type="text" />
                                    </div>
                                    <input className="input-base" placeholder="State" required type="text" />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <CreditCard size={16} className="text-[var(--muted)]" />
                                        <h2 className="text-sm tracking-[0.2em] uppercase text-[var(--charcoal)]">Payment Details</h2>
                                    </div>
                                    <div className="p-5 bg-[var(--cream)] border border-[var(--border)]">
                                        <p className="text-sm text-[var(--muted)] text-center">
                                            🔒 Secure payment powered by Stripe
                                        </p>
                                        <p className="text-xs text-[var(--muted-light)] text-center mt-2">
                                            Card details would be entered here in production
                                        </p>
                                    </div>
                                    <input className="input-base" placeholder="Card Number" type="text" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input className="input-base" placeholder="MM / YY" type="text" />
                                        <input className="input-base" placeholder="CVV" type="text" />
                                    </div>
                                    <input className="input-base" placeholder="Name on Card" type="text" />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <button
                        onClick={nextStep}
                        className="btn btn-primary w-full mt-8"
                    >
                        {step < STEPS.length - 1 ? `Continue to ${STEPS[step + 1]}` : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
}
