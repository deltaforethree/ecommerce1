import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/features/cart/context";
import { WishlistProvider } from "@/features/wishlist/context";
import { ToastProvider } from "@/features/toast/context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Raffine — Effortlessly Refined Clothing",
    template: "%s | Raffine",
  },
  description:
    "Discover premium clothing crafted from the world's finest fabrics. Silk, cashmere, linen, and luxury knitwear for women, men, and kids.",
  keywords: ["luxury clothing", "premium fashion", "cashmere", "silk", "designer clothing", "Raffine"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://raffine.in",
    siteName: "Raffine",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Raffine — Effortlessly Refined Clothing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@raffine",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <Navbar />
              <main className="pt-[calc(2rem+4rem)] min-h-screen">{children}</main>
              <Footer />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
