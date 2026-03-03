"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const [showPw, setShowPw] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white p-10 shadow-[var(--shadow-lg)]"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <span
                            className="text-3xl tracking-[0.2em] uppercase text-[var(--charcoal)]"
                            style={{ fontFamily: '"CoFo Raffine", Georgia, serif' }}
                        >
                            Raffine
                        </span>
                    </Link>
                    <h1
                        className="text-2xl text-[var(--charcoal)]"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Create Your Account
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-2">
                        Join Raffine and discover refined living
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="input-base" type="text" placeholder="First Name" required />
                        <input className="input-base" type="text" placeholder="Last Name" required />
                    </div>
                    <input className="input-base" type="email" placeholder="Email Address" required />
                    <div className="relative">
                        <input
                            className="input-base pr-12"
                            type={showPw ? "text" : "password"}
                            placeholder="Create Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPw(!showPw)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-light)] hover:text-[var(--charcoal)] transition-colors"
                        >
                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                    <input className="input-base" type="tel" placeholder="Phone Number (optional)" />

                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                        By creating an account you agree to our{" "}
                        <a href="#" className="underline hover:text-[var(--charcoal)] transition-colors">Privacy Policy</a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-[var(--charcoal)] transition-colors">Terms of Service</a>.
                    </p>

                    <button type="submit" className="btn btn-primary w-full mt-2">
                        Create Account
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-[var(--muted)]">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-[var(--charcoal)] underline hover:text-[var(--gold)] transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
