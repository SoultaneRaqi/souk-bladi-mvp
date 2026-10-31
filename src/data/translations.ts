export type Language = 'fr' | 'ar' | 'tzm' | 'en';

export const LANGUAGE_META: Record<Language, { label: string; dir: 'ltr' | 'rtl' }> = {
    fr: { label: 'FR', dir: 'ltr' },
    ar: { label: 'الدارجة', dir: 'rtl' },
    tzm: { label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', dir: 'ltr' },
    en: { label: 'EN', dir: 'ltr' },
};

export interface ProductItem {
    id: string;
    category: 'all' | 'spices' | 'oils' | 'sweets' | 'cosmetics';
    name: Record<Language, string>;
    cooperative: string;
    price: number;
    weight: string;
    webpBadge: string;
    imageUrl: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
    {
        id: 'argan-bio',
        category: 'oils',
        name: { fr: "Huile d'Argan Bio", ar: 'زيت أركان البلدي', tzm: 'ⴰⵣⴰⵜⵉⵎ ⵏ ⵡⴰⵔⴳⴰⵏ', en: 'Organic Argan Oil' },
        cooperative: 'Coop. Tighanimine (Essaouira)',
        price: 180, weight: '500 ml', webpBadge: 'Format WebP (68 Ko)',
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 'safran-taliouine',
        category: 'spices',
        name: { fr: 'Safran AOP Taliouine', ar: 'زعفران تاليوين الحر', tzm: 'ⵣⴰⵄⴼⵔⴰⵏ ⵏ ⵜⴰⵍⵉⵡⵉⵏ', en: 'Taliouine Saffron PDO' },
        cooperative: 'Coop. Souktana (Taliouine)',
        price: 260, weight: '5 g', webpBadge: 'Format WebP (54 Ko)',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 'dattes-medjool',
        category: 'sweets',
        name: { fr: 'Dattes Medjool Royales', ar: 'تمر المجهول الملكي', tzm: 'ⵜⵉⵢⵏⵉ ⵏ ⵍⵎⵊⵀⵓⵍ', en: 'Royal Medjool Dates' },
        cooperative: 'Coop. Ziz Oasis (Errachidia)',
        price: 140, weight: '1 kg', webpBadge: 'Format WebP (72 Ko)',
        imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 'amlou-amandes',
        category: 'sweets',
        name: { fr: 'Amlou aux Amandes', ar: 'أملو باللوز البلدي', tzm: 'ⴰⵎⵍⵓ ⵏ ⵍⵍⵓⵣ', en: 'Traditional Almond Amlou' },
        cooperative: 'Coop. Amal (Agadir)',
        price: 120, weight: '500 g', webpBadge: 'Format WebP (61 Ko)',
        imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 'miel-thym',
        category: 'sweets',
        name: { fr: 'Miel de Thym (Z3itra)', ar: 'عسل الزعتر الحر', tzm: 'ⵜⴰⵎⵎⵏⵜ ⵏ ⵓⵥⴰⵜⵜⴰⵔ', en: 'Pure Thyme Honey' },
        cooperative: 'Coop. Atlas (Azilal)',
        price: 200, weight: '250 g', webpBadge: 'Format WebP (59 Ko)',
        imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89134a5d?auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 'eau-rose',
        category: 'cosmetics',
        name: { fr: 'Eau de Rose Distillée', ar: 'ماء الورد المقطر', tzm: 'ⴰⵎⴰⵏ ⵏ ⵡⴰⵔⴷ', en: 'Distilled Rose Water' },
        cooperative: 'Coop. Roseraie (Kelaat M\'Gouna)',
        price: 80, weight: '200 ml', webpBadge: 'Format WebP (45 Ko)',
        imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80',
    }
];

export const translations = {
    fr: {
        shop: 'Boutique',
        cooperatives: 'Nos Coopératives',
        cart: 'Panier',
        mission: 'Notre Mission',
        offlineReady: 'Mode hors-ligne prêt',
        heroTitle: 'Les trésors de nos coopératives, en direct.',
        heroSub: 'Soutenez nos collectifs ruraux marocains via une plateforme éco-conçue, rapide et éthique.',
        addToCart: 'Ajouter',
        added: 'Ajouté',
        confirmOrder: 'Confirmer votre commande',
        firstName: 'Prénom',
        phone: 'Téléphone (SMS livraison uniquement)',
        communeLabel: 'Commune / Village de livraison',
        privacyNotice: "Engagement NumVert : Aucune carte d'identité (CIN) ni GPS requis. Vos données ne sont jamais vendues.",
        emptyCart: 'Votre panier est vide.',
        totalLabel: 'Total à la livraison',
        ecoOptimized: 'Green IT Optimisé • 0 Vidéo Autoplay',
    },
    ar: {
        shop: 'المتجر',
        cooperatives: 'التعاونيات ديالنا',
        cart: 'السلة',
        mission: 'المهمة ديالنا',
        offlineReady: 'خدام بلا أنترنيت',
        heroTitle: 'خيرات التعاونيات ديالنا، نيشان لعندك.',
        heroSub: 'دعم التعاونيات الفلاحية المغربية فموقع خفيف، سريع وكيحترم المعطيات الشخصية.',
        addToCart: 'زيد للسلة',
        added: 'تزاد',
        confirmOrder: 'تأكيد الطلب',
        firstName: 'السمية',
        phone: 'رقم الهاتف',
        communeLabel: 'الجماعة / الدوار ديال التوصيل',
        privacyNotice: 'التزام NumVert: بلا بطاقة وطنية (CIN) وبلا GPS. المعطيات ديالك ما عمرها تباع.',
        emptyCart: 'السلة خاوية.',
        totalLabel: 'المجموع عند الاستلام',
        ecoOptimized: 'موقع خفيف • إيكولوجي 100%',
    },
    tzm: {
        shop: 'ⵜⴰⵃⴰⵏⵓⵜ',
        cooperatives: 'ⵜⵉⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ',
        cart: 'ⵜⴰⵙⴽⵏⵉⵜ',
        mission: 'ⵜⴰⵙⵎⵉⴳⵍⵜ ⵏⵏⵖ',
        offlineReady: 'ⵉوجد ⴱⵍⴰ ⴰⵏⵜⵉⵔⵏⵉⵜ',
        heroTitle: 'ⵜⵉⴳⵎⵎⵉ ⵏ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ, ⵙⵔⵉⴷ.',
        heroSub: 'ⴰⵡⵙ ⵉ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ ⴳ ⵍⵎⵖⵔⵉⴱ ⵙ ⵓⵙⵉⵜ ⴰⴼⵙⵙⴰⵙ ⴷ ⵓⵣⵔⴼⴰⵏ.',
        addToCart: 'ⵔⵏⵓ',
        added: 'ⵉⵜⵜⵓⵔⵏⴰ',
        confirmOrder: 'ⵙⵖⵥⵏ ⵜⴰⵙⵓⵜⵍⵜ',
        firstName: 'ⵉⵙⵎ',
        phone: 'ⵓⵟⵟⵓⵏ ⵏ ⵓⵜⵉⵍⵉⴼⵓⵏ',
        communeLabel: 'ⵜⴰⴳⵔⴰⵡⵜ / ⴰⴷⵡⵡⴰⵔ',
        privacyNotice: 'NumVert: ⵡⴰⵍⵓ CIN ⵏⵖ GPS. ⵉⵙⴼⴽⴰ ⵏⵏⴽ ⵓⵔ ⴷⴰ ⵜⵜⵏⵣⴰⵏ.',
        emptyCart: 'ⵜⴰⵙⴽⵏⵉⵜ ⵜخⵡⴰ.',
        totalLabel: 'ⴰTotal',
        ecoOptimized: 'Green IT • ⴰⴼⵙⵙⴰⵙ',
    },
    en: {
        shop: 'Shop',
        cooperatives: 'Our Cooperatives',
        cart: 'Cart',
        mission: 'Our Mission',
        offlineReady: 'Offline mode ready',
        heroTitle: 'Treasures from our cooperatives, direct to you.',
        heroSub: 'Support rural Moroccan collectives through a lightweight, fast, and privacy-first platform.',
        addToCart: 'Add to cart',
        added: 'Added',
        confirmOrder: 'Confirm your order',
        firstName: 'First Name',
        phone: 'Mobile Number',
        communeLabel: 'Delivery Commune / Village',
        privacyNotice: 'NumVert Pledge: No ID card (CIN) or GPS required. Your data is never sold.',
        emptyCart: 'Your cart is empty.',
        totalLabel: 'Total on delivery',
        ecoOptimized: 'Green IT Optimized • Zero Autoplay Video',
    },
} as const;