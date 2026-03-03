import type { Product, Category } from "@/types/product";

export const categories: Category[] = [
    {
        id: "cat-1",
        slug: "sarees",
        name: "Sarees",
        description: "The soul of Indian tradition. Hand-woven Banarasi, Kanjeevaram, and Chanderi silks.",
        image: "/images/products/saree-red.png",
        productCount: 45,
        featured: true,
    },
    {
        id: "cat-2",
        slug: "lehengas",
        name: "Lehengas",
        description: "Regal silhouettes for weddings and celebrations. Intricate embroidery and modern cuts.",
        image: "/images/products/lehenga-pastel.png",
        productCount: 32,
        featured: true,
    },
    {
        id: "cat-3",
        slug: "suits",
        name: "Suits & Anarkalis",
        description: "Effortless elegance for every occasion. Salwar suits, Anarkalis, and Sharara sets.",
        image: "/images/products/anarkali-floral.png",
        productCount: 58,
        featured: true,
    },
    {
        id: "cat-4",
        slug: "kurtas",
        name: "Kurtas & Tunics",
        description: "Everyday luxury in the finest cottons and linens. Chikankari and hand-block prints.",
        image: "/images/products/kurta-white.png",
        productCount: 74,
        featured: true,
    },
];

export const products: Product[] = [
    {
        id: "p-001",
        slug: "red-banarasi-silk-saree",
        name: "Banarasi Silk Saree",
        brand: "Heritage",
        category: "sarees",
        subcategory: "Handloom Silk",
        price: 549,
        description: "Woven in the heart of Varanasi, this red Banarasi silk saree features intricate gold zari work. A masterpiece of traditional Indian craftsmanship that exudes regal grace.",
        details: ["Pure Katan Silk", "Hand-woven gold zari border", "Includes matching blouse piece", "Intricate floral bootis", "Heirloom quality"],
        images: [
            "/images/products/saree-red.png",
        ],
        colors: [
            { name: "Royal Red", hex: "#9B1B30" },
            { name: "Gold", hex: "#D4AF37" },
        ],
        variants: [
            { size: "Free Size", stock: 15 },
        ],
        reviews: [
            { id: "r-1", author: "Sophia M.", avatar: "https://i.pravatar.cc/50?img=1", rating: 5, date: "2025-12-10", title: "Absolutely stunning", body: "The silk is buttery soft and the zari work is incredible. Worth every penny.", verified: true },
        ],
        rating: 4.9,
        reviewCount: 142,
        tags: ["silk", "saree", "banarasi", "wedding", "luxury"],
        isFeatured: true,
        isNew: false,
        isTrending: true,
        isBestSeller: true,
        material: "100% Pure Silk",
        fit: "Draped — adjustable",
        careInstructions: ["Dry clean only", "Store in muslin cloth", "Do not hang"],
    },
    {
        id: "p-002",
        slug: "embroidered-lehenga-choli",
        name: "Embroidered Lehenga Choli",
        brand: "Aura",
        category: "lehengas",
        subcategory: "Bridal Wear",
        price: 895,
        description: "A celebration of modern Indian glamour. This pastel pink lehenga features intricate sequin and thread work on premium georgette. Comes with a matching choli and sheer embroidered dupatta.",
        details: ["Premium Georgette", "Hand-embroidered sequins", "Includes Choli and Dupatta", "Tasseled accents", "Full flare silhouette"],
        images: [
            "/images/products/lehenga-pastel.png",
        ],
        colors: [
            { name: "Pastel Pink", hex: "#F8C1D6" },
            { name: "Mint Green", hex: "#BFFFD0" },
        ],
        variants: [
            { size: "S", stock: 4 },
            { size: "M", stock: 6 },
            { size: "L", stock: 3 },
        ],
        reviews: [
            { id: "r-3", author: "Elena V.", avatar: "https://i.pravatar.cc/50?img=5", rating: 5, date: "2026-01-05", title: "Exquisite details", body: "The embroidery is even more beautiful in person. The pastel hue is perfect.", verified: true },
        ],
        rating: 4.9,
        reviewCount: 218,
        tags: ["lehenga", "bridal", "ethnic", "party", "embroidery"],
        isFeatured: true,
        isNew: false,
        isTrending: false,
        isBestSeller: true,
        material: "Premium Georgette",
        fit: "Fitted waist, flared bottom",
        careInstructions: ["Professional dry clean", "Keep away from perfumes"],
    },
    {
        id: "p-003",
        slug: "floral-anarkali-suit",
        name: "Floral Anarkali Suit",
        brand: "Maya",
        category: "suits",
        subcategory: "Anarkali",
        price: 345,
        description: "Flowy and ethereal, this floor-length Anarkali suit features delicate floral motifs on feather-light organza. Perfectly tailored for a silhouette that dances with every step.",
        details: ["Premium Organza", "Digital floral prints", "Includes churidar and dupatta", "Lace detailing", "Sweetheart neckline"],
        images: [
            "/images/products/anarkali-floral.png",
        ],
        colors: [
            { name: "Floral White", hex: "#FFFAF0" },
            { name: "Sky Blue", hex: "#87CEEB" },
        ],
        variants: [
            { size: "XS", stock: 6 },
            { size: "S", stock: 11 },
            { size: "M", stock: 16 },
            { size: "L", stock: 8 },
        ],
        reviews: [],
        rating: 4.5,
        reviewCount: 87,
        tags: ["anarkali", "suit", "floral", "summer", "daywear"],
        isFeatured: false,
        isNew: true,
        isTrending: true,
        material: "Premium Organza & Silk",
        fit: "Fitted bodice, voluminous flare",
        careInstructions: ["Gentle hand wash", "Steam iron only"],
    },
    {
        id: "p-004",
        slug: "chikankari-kurta-white",
        name: "Chikankari Kurta",
        brand: "Liva",
        category: "kurtas",
        subcategory: "Lucknawi",
        price: 185,
        description: "The epitome of Lucknawi heritage. Hand-embroidered white Chikankari on pure mulmul cotton. Breathable, delicate, and enduringly stylish.",
        details: ["100% Mulmul Cotton", "Hand-embroidered Chikankari", "Shadow work technique", "Straight silhouette", "Side slits"],
        images: [
            "/images/products/kurta-white.png",
        ],
        colors: [
            { name: "Pure White", hex: "#FFFFFF" },
            { name: "Ivory", hex: "#FFFFF0" },
        ],
        variants: [
            { size: "XS", stock: 8 },
            { size: "S", stock: 15 },
            { size: "M", stock: 20 },
            { size: "L", stock: 12 },
        ],
        reviews: [],
        rating: 4.8,
        reviewCount: 165,
        tags: ["kurta", "chikankari", "cotton", "heritage", "minimalist"],
        isFeatured: true,
        isNew: false,
        isBestSeller: true,
        material: "Hand-woven Mulmul Cotton",
        fit: "Straight fit",
        careInstructions: ["Cold hand wash", "Dry in shade"],
    },
    {
        id: "p-005",
        slug: "sharara-set-teal",
        name: "Designer Sharara Set",
        brand: "Ishani",
        category: "suits",
        subcategory: "Sharara Sets",
        price: 265,
        originalPrice: 385,
        discount: 31,
        description: "Make a statement in this contemporary teal blue sharara set. Featuring a short peplum kurta with mirror work and voluminous flared pants.",
        details: ["Chiffon and Silk blend", "Mirror and sequin work", "Includes dupatta and sharara", "Peplum style kurta", "Tiered sharara"],
        images: [
            "/images/products/sharara-teal.png",
        ],
        colors: [
            { name: "Teal Blue", hex: "#008080" },
            { name: "Emerald", hex: "#50C878" },
        ],
        variants: [
            { size: "XS", stock: 5 },
            { size: "S", stock: 12 },
            { size: "M", stock: 15 },
            { size: "L", stock: 10 },
        ],
        reviews: [],
        rating: 4.6,
        reviewCount: 93,
        tags: ["sharara", "partywear", "teal", "sale", "contemporary"],
        isFeatured: false,
        isNew: false,
        material: "Silk Chiffon Blend",
        fit: "Flared",
        careInstructions: ["Dry clean only"],
    },
    {
        id: "p-006",
        slug: "lavender-silk-suit",
        name: "Lavender Silk Suit",
        brand: "Maya",
        category: "suits",
        subcategory: "Salwar Suits",
        price: 245,
        description: "Intricately detailed lavender silk suit with silver gota patti work. A perfect blend of comfort and luxury for festive occasions.",
        details: ["Fine Silk", "Handcrafted Gota Patti", "Includes heavy dupatta", "Straight cut", "Soft lining"],
        images: [
            "/images/products/suit-lavender.png",
        ],
        colors: [
            { name: "Lavender", hex: "#E6E6FA" },
        ],
        variants: [
            { size: "S", stock: 5 },
            { size: "M", stock: 8 },
            { size: "L", stock: 4 },
        ],
        reviews: [],
        rating: 4.7,
        reviewCount: 42,
        tags: ["silk", "suit", "lavender", "festive"],
        isFeatured: true,
        isNew: true,
        material: "Premium Silk",
        fit: "Regular fit",
        careInstructions: ["Dry clean only"],
    },
];

// ── Derived helpers ──────────────────────────────────────────────
export const getFeaturedProducts = (): Product[] =>
    products.filter((p) => p.isFeatured).slice(0, 8);

export const getTrendingProducts = (): Product[] =>
    products.filter((p) => p.isTrending).slice(0, 6);

export const getNewArrivals = (): Product[] =>
    products.filter((p) => p.isNew).slice(0, 8);

export const getBestSellers = (): Product[] =>
    products.filter((p) => p.isBestSeller).slice(0, 6);

export const getProductsByCategory = (category: string): Product[] =>
    products.filter((p) => p.category === category);

export const getProductBySlug = (slug: string): Product | undefined =>
    products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, count = 4): Product[] =>
    products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, count);

export const getSaleProducts = (): Product[] =>
    products.filter((p) => p.discount !== undefined).slice(0, 8);
