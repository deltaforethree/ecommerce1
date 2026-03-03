"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center gap-2 text-[10px] sm:text-xs tracking-widest uppercase ${className}`}>
      <Link href="/" className="flex items-center text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors">
        <Home size={12} className="mr-2" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={10} className="text-[var(--muted-light)]" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--charcoal)] font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
