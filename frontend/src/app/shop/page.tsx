import type { Metadata } from "next";
import ShopClient from "./[category]/ShopClient";

export const metadata: Metadata = {
    title: "Shop — Raffine",
    description: "Browse the full Raffine collection of luxury clothing for women, men, kids, and accessories.",
};

export default function ShopPage() {
    return <ShopClient />;
}
