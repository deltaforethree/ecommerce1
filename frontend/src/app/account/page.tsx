"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, ChevronRight } from "lucide-react";

const TABS = [
    { id: "profile", label: "Profile", Icon: User },
    { id: "orders", label: "Orders", Icon: Package },
    { id: "wishlist", label: "Wishlist", Icon: Heart },
    { id: "settings", label: "Settings", Icon: Settings },
];

const MOCK_ORDERS = [
    { id: "RAF12345", date: "12 Jan 2026", status: "Delivered", total: 634, items: 2 },
    { id: "RAF11890", date: "28 Dec 2025", status: "Delivered", total: 445, items: 1 },
];

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[var(--cream)] border-b border-[var(--border)] py-12">
                <div className="container-xl">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-[var(--charcoal)] flex items-center justify-center">
                            <span
                                className="text-xl text-white"
                                style={{ fontFamily: '"CoFo Raffine", serif' }}
                            >
                                A
                            </span>
                        </div>
                        <div>
                            <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted)] mb-1">Welcome back</p>
                            <h1
                                className="text-3xl text-[var(--charcoal)]"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                            >
                                Amara Patel
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xl py-10">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sidebar */}
                    <aside className="md:w-52 flex-shrink-0">
                        <nav className="flex flex-row md:flex-col gap-1">
                            {TABS.map(({ id, label, Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-left ${activeTab === id
                                            ? "bg-[var(--charcoal)] text-white"
                                            : "text-[var(--muted)] hover:text-[var(--charcoal)] hover:bg-[var(--cream)]"
                                        }`}
                                    style={{ fontFamily: '"CoFo Raffine", serif' }}
                                >
                                    <Icon size={14} />
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {activeTab === "profile" && (
                                <div>
                                    <h2
                                        className="text-2xl text-[var(--charcoal)] mb-8"
                                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                                    >
                                        Personal Information
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-5 max-w-lg">
                                        <div>
                                            <label className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-2 block">First Name</label>
                                            <input className="input-base" defaultValue="Amara" />
                                        </div>
                                        <div>
                                            <label className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-2 block">Last Name</label>
                                            <input className="input-base" defaultValue="Patel" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-2 block">Email</label>
                                            <input className="input-base" defaultValue="amara@example.com" type="email" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-2 block">Phone</label>
                                            <input className="input-base" defaultValue="+91 98765 43210" type="tel" />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-8">Save Changes</button>
                                </div>
                            )}

                            {activeTab === "orders" && (
                                <div>
                                    <h2
                                        className="text-2xl text-[var(--charcoal)] mb-8"
                                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                                    >
                                        Order History
                                    </h2>
                                    <div className="flex flex-col gap-4">
                                        {MOCK_ORDERS.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-5 border border-[var(--border)] hover:bg-[var(--cream)] transition-colors cursor-pointer group">
                                                <div>
                                                    <p className="text-sm font-medium text-[var(--charcoal)]">#{order.id}</p>
                                                    <p className="text-xs text-[var(--muted)] mt-0.5">{order.date} · {order.items} item{order.items !== 1 && "s"}</p>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span
                                                        className={`text-xs px-2.5 py-1 tracking-wide ${order.status === "Delivered"
                                                                ? "bg-green-50 text-green-700"
                                                                : "bg-[var(--cream-dark)] text-[var(--muted)]"
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                    <span className="text-sm text-[var(--charcoal)]" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                                                        ₹{order.total.toLocaleString()}
                                                    </span>
                                                    <ChevronRight size={14} className="text-[var(--muted)] group-hover:text-[var(--charcoal)] transition-colors" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "wishlist" && (
                                <div>
                                    <h2
                                        className="text-2xl text-[var(--charcoal)] mb-6"
                                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                                    >
                                        Saved Items
                                    </h2>
                                    <p className="text-[var(--muted)] mb-6">Visit your wishlist to see all saved pieces.</p>
                                    <Link href="/wishlist" className="btn btn-secondary">
                                        View Wishlist
                                    </Link>
                                </div>
                            )}

                            {activeTab === "settings" && (
                                <div>
                                    <h2
                                        className="text-2xl text-[var(--charcoal)] mb-8"
                                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                                    >
                                        Account Settings
                                    </h2>
                                    <div className="flex flex-col gap-6 max-w-lg">
                                        <h3 className="text-sm tracking-[0.15em] uppercase text-[var(--muted)]">Change Password</h3>
                                        <input className="input-base" type="password" placeholder="Current Password" />
                                        <input className="input-base" type="password" placeholder="New Password" />
                                        <input className="input-base" type="password" placeholder="Confirm New Password" />
                                        <button className="btn btn-primary self-start">Update Password</button>
                                        <div className="h-px bg-[var(--border)]" />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-[var(--charcoal)]">Marketing Emails</p>
                                                <p className="text-xs text-[var(--muted)]">Receive new arrivals and promotions</p>
                                            </div>
                                            <div className="w-10 h-6 bg-[var(--charcoal)] rounded-full relative cursor-pointer">
                                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
