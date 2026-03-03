"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product, ProductColor, ProductSize } from "@/types/product";
import { useCart } from "@/features/cart/context";
import { useWishlist } from "@/features/wishlist/context";
import { useToast } from "@/features/toast/context";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(product?.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  
  const { addItem } = useCart();
  const { toggle, contains } = useWishlist();
  const { toast } = useToast();

  if (!product) return null;

  const isWishlisted = contains(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast("Please select a size", "error");
      return;
    }
    addItem(product, selectedColor || product.colors[0], selectedSize, 1);
    toast(`${product.name} added to bag`, "success");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left: Image Gallery */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] bg-[var(--cream)] group">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] mb-3">
                {product.category}
              </p>
              <h2
                className="text-2xl md:text-3xl text-[var(--charcoal)] mb-4"
                style={{ fontFamily: '"CoFo Raffine", Georgia, serif', fontWeight: 300 }}
              >
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--border)]"}
                    />
                  ))}
                </div>
                <span className="text-xs text-[var(--muted)]">{product.reviewCount} reviews</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-xl text-[var(--charcoal)]" style={{ fontFamily: '"CoFo Raffine", serif' }}>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[var(--muted-light)] line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color */}
              <div className="mb-6">
                <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Colour</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor?.name === c.name ? "border-[var(--charcoal)] scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.hex, boxShadow: "0 0 0 2px var(--cream)" }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Size</p>
                <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedSize(v.size)}
                      disabled={v.stock === 0}
                      className={`w-12 h-12 flex items-center justify-center border text-sm transition-all ${
                        selectedSize === v.size
                          ? "bg-[var(--charcoal)] text-white border-[var(--charcoal)]"
                          : v.stock === 0
                            ? "border-[var(--border)] text-[var(--muted-light)] line-through cursor-not-allowed"
                            : "border-[var(--border)] text-[var(--charcoal)] hover:border-[var(--charcoal)]"
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-primary justify-center py-4"
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>
                <button
                  onClick={() => {
                    toggle(product);
                    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
                  }}
                  className={`w-14 border flex items-center justify-center transition-colors ${
                    isWishlisted ? "border-red-400 bg-red-50" : "border-[var(--border)] hover:border-[var(--charcoal)]"
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                </button>
              </div>
              
              <Link 
                href={`/shop/${product.category}/${product.slug}`}
                onClick={onClose}
                className="block text-center mt-6 text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors underline underline-offset-4"
              >
                View full details
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
