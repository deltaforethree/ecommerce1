"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import type { WishlistItem, Product } from "@/types/product";

interface WishlistContextValue {
    items: WishlistItem[];
    toggle: (product: Product) => void;
    contains: (productId: string) => boolean;
    clear: () => void;
    count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);

    const toggle = useCallback((product: Product) => {
        setItems((prev) => {
            const exists = prev.some((i) => i.product.id === product.id);
            if (exists) return prev.filter((i) => i.product.id !== product.id);
            return [...prev, { product, addedAt: new Date() }];
        });
    }, []);

    const contains = useCallback(
        (productId: string) => items.some((i) => i.product.id === productId),
        [items]
    );

    const clear = useCallback(() => setItems([]), []);

    return (
        <WishlistContext.Provider value={{ items, toggle, contains, clear, count: items.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist(): WishlistContextValue {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
}
