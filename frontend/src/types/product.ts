export type ProductCategory =
    | "men"
    | "women"
    | "kids"
    | "accessories"
    | "sale";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size";

export interface ProductColor {
    name: string;
    hex: string;
}

export interface ProductVariant {
    size: ProductSize;
    stock: number;
}

export interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    title: string;
    body: string;
    verified: boolean;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    brand: string;
    category: ProductCategory;
    subcategory: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    description: string;
    details: string[];
    images: string[];
    colors: ProductColor[];
    variants: ProductVariant[];
    reviews: Review[];
    rating: number;
    reviewCount: number;
    tags: string[];
    isFeatured?: boolean;
    isNew?: boolean;
    isTrending?: boolean;
    isBestSeller?: boolean;
    material: string;
    fit?: string;
    careInstructions: string[];
}

export interface Category {
    id: string;
    slug: ProductCategory;
    name: string;
    description: string;
    image: string;
    productCount: number;
    featured: boolean;
}

export interface CartItem {
    product: Product;
    selectedColor: ProductColor;
    selectedSize: ProductSize;
    quantity: number;
}

export interface WishlistItem {
    product: Product;
    addedAt: Date;
}

export interface FilterOptions {
    categories: ProductCategory[];
    sizes: ProductSize[];
    colors: string[];
    priceRange: [number, number];
    sortBy: SortOption;
}

export type SortOption =
    | "featured"
    | "newest"
    | "price-asc"
    | "price-desc"
    | "rating"
    | "bestseller";
