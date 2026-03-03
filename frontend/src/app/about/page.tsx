import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About — Raffine",
    description: "The story behind Raffine — crafted with intention, worn with purpose.",
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
                    alt="About Raffine"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
                    <h1
                        className="text-5xl md:text-7xl text-white"
                        style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                    >
                        Crafted with Intention
                    </h1>
                </div>
            </div>

            {/* Story */}
            <section className="section">
                <div className="container-lg">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-4">Est. 2020</p>
                            <h2
                                className="text-4xl text-[var(--charcoal)] mb-6"
                                style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                            >
                                We Believe in<br />the Long Game
                            </h2>
                            <div className="flex flex-col gap-4 text-base text-[var(--muted)] leading-relaxed">
                                <p>
                                    Raffine was founded on a single belief: that fashion should be beautiful, responsible, and enduring. We were tired of fast fashion&apos;s relentless churn and decided to do something different.
                                </p>
                                <p>
                                    Each piece in our collection is the result of months of work — sourcing the finest materials from mills that have been perfecting their craft for generations, partnering with artisans who bring skill and soul to every stitch.
                                </p>
                                <p>
                                    We create clothing that doesn&apos;t just last a season. It lasts a lifetime. And with wear, it becomes more beautiful, more yours.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/5]">
                            <Image
                                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80"
                                alt="Raffine craftsmanship"
                                fill
                                className="object-cover"
                                sizes="50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="section-sm bg-[var(--charcoal)]">
                <div className="container-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { num: "4+", label: "Years of Craft" },
                            { num: "50+", label: "Artisan Partners" },
                            { num: "12", label: "Countries Sourced" },
                            { num: "10K+", label: "Happy Customers" },
                        ].map(({ num, label }) => (
                            <div key={label}>
                                <p
                                    className="text-5xl text-white mb-2"
                                    style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
                                >
                                    {num}
                                </p>
                                <p className="text-sm text-[var(--muted-light)] tracking-wide">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
