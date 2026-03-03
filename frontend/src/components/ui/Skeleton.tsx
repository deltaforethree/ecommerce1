"use client";

import React from "react";
import { motion } from "framer-motion";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-[var(--cream-dark)] animate-pulse ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="aspect-[3/4] w-full" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/3" />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
