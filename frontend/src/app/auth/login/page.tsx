"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
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
                        Welcome Back
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-2">
                        Sign in to your Raffine account
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input className="input-base" type="email" placeholder="Email Address" required />
                    <div className="relative">
                        <input
                            className="input-base pr-12"
                            type={showPw ? "text" : "password"}
                            placeholder="Password"
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

                    <div className="flex justify-end">
                        <a href="#" className="text-xs text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors tracking-wide">
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-2">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-[var(--muted)]">
                        New to Raffine?{" "}
                        <Link href="/auth/register" className="text-[var(--charcoal)] underline hover:text-[var(--gold)] transition-colors">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
