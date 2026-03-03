import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/features/cart/context";
import { WishlistProvider } from "@/features/wishlist/context";
import { ToastProvider } from "@/features/toast/context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Raffine — Luxury Indian Ethnic Wear & Heritage Fashion",
    template: "%s | Raffine",
  },
  description:
    "Discover premium Indian ethnic wear, bridal lehengas, Banarasi sarees, and designer menswear. Raffine brings you the finest heritage craftsmanship.",
  keywords: ["luxury indian wear", "heritage fashion", "bridal lehenga", "banarasi saree", "designer sherwani", "Raffine"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://raffine.in",
    siteName: "Raffine",
    images: [
      {
        url: "/images/hero/bridal-lehenga.png",
        width: 1200,
        height: 630,
        alt: "Raffine — Luxury Indian Ethnic Wear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@raffine_luxury",
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
