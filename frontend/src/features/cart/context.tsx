"use client";

import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
    type ReactNode,
} from "react";
import type { CartItem, Product, ProductColor, ProductSize } from "@/types/product";

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: { productId: string; size: ProductSize; colorName: string } }
    | { type: "UPDATE_QTY"; payload: { productId: string; size: ProductSize; colorName: string; quantity: number } }
    | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.findIndex(
                (i) =>
                    i.product.id === action.payload.product.id &&
                    i.selectedSize === action.payload.selectedSize &&
                    i.selectedColor.name === action.payload.selectedColor.name
            );
            if (existing >= 0) {
                const updated = [...state.items];
                updated[existing] = {
                    ...updated[existing],
                    quantity: updated[existing].quantity + action.payload.quantity,
                };
                return { items: updated };
            }
            return { items: [...state.items, action.payload] };
        }
        case "REMOVE_ITEM":
            return {
                items: state.items.filter(
                    (i) =>
                        !(
                            i.product.id === action.payload.productId &&
                            i.selectedSize === action.payload.size &&
                            i.selectedColor.name === action.payload.colorName
                        )
                ),
            };
        case "UPDATE_QTY": {
            if (action.payload.quantity <= 0) {
                return {
                    items: state.items.filter(
                        (i) =>
                            !(
                                i.product.id === action.payload.productId &&
                                i.selectedSize === action.payload.size &&
                                i.selectedColor.name === action.payload.colorName
                            )
                    ),
                };
            }
            return {
                items: state.items.map((i) =>
                    i.product.id === action.payload.productId &&
                        i.selectedSize === action.payload.size &&
                        i.selectedColor.name === action.payload.colorName
                        ? { ...i, quantity: action.payload.quantity }
                        : i
                ),
            };
        }
        case "CLEAR":
            return { items: [] };
        default:
            return state;
    }
}

interface CartContextValue {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    addItem: (product: Product, color: ProductColor, size: ProductSize, qty?: number) => void;
    removeItem: (productId: string, size: ProductSize, colorName: string) => void;
    updateQty: (productId: string, size: ProductSize, colorName: string, qty: number) => void;
    clear: () => void;
    isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const addItem = useCallback(
        (product: Product, color: ProductColor, size: ProductSize, qty = 1) => {
            dispatch({
                type: "ADD_ITEM",
                payload: { product, selectedColor: color, selectedSize: size, quantity: qty },
            });
        },
        []
    );

    const removeItem = useCallback(
        (productId: string, size: ProductSize, colorName: string) => {
            dispatch({ type: "REMOVE_ITEM", payload: { productId, size, colorName } });
        },
        []
    );

    const updateQty = useCallback(
        (productId: string, size: ProductSize, colorName: string, quantity: number) => {
            dispatch({ type: "UPDATE_QTY", payload: { productId, size, colorName, quantity } });
        },
        []
    );

    const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

    const isInCart = useCallback(
        (productId: string) => state.items.some((i) => i.product.id === productId),
        [state.items]
    );

    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ items: state.items, itemCount, subtotal, addItem, removeItem, updateQty, clear, isInCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
