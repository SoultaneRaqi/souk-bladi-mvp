export type Language = 'fr' | 'ar' | 'tzm' | 'en';

export const LANGUAGE_META: Record<
    Language,
    { label: string; dir: 'ltr' | 'rtl'; locale: string; htmlLang: string }
> = {
    fr: { label: 'FR', dir: 'ltr', locale: 'fr-MA', htmlLang: 'fr' },
    ar: { label: 'الدارجة', dir: 'rtl', locale: 'ar-MA', htmlLang: 'ar' },
    tzm: { label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', dir: 'ltr', locale: 'fr-MA', htmlLang: 'zgh' },
    en: { label: 'EN', dir: 'ltr', locale: 'en-GB', htmlLang: 'en' },
};

export interface ProductItem {
    id: string;
    category: 'all' | 'spices' | 'oils' | 'sweets' | 'cosmetics';
    name: Record<Language, string>;
    cooperative: string;
    price: number;
    weight: string;
    imageKb: number;
    imageUrl: string;
    status?: 'new' | 'popular' | 'bio';
    stock: number;
}

export const PRODUCTS_DATA: ProductItem[] = [
    {
        id: 'argan-bio', category: 'oils',
        name: { fr: "Huile d'Argan Bio", ar: 'زيت أركان البلدي', tzm: 'ⴰⵣⴰⵜⵉⵎ ⵏ ⵡⴰⵔⴳⴰⵏ', en: 'Organic Argan Oil' },
        cooperative: 'Coop. Tighanimine (Essaouira)', price: 180, weight: '500 ml', imageKb: 68,
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
        status: 'popular', stock: 12
    },
    {
        id: 'safran-taliouine', category: 'spices',
        name: { fr: 'Safran AOP Taliouine', ar: 'زعفران تاليوين الحر', tzm: 'ⵣⴰⵄⴼⵔⴰⵏ ⵏ ⵜⴰⵍⵉⵡⵉⵏ', en: 'Taliouine Saffron PDO' },
        cooperative: 'Coop. Souktana (Taliouine)', price: 260, weight: '5 g', imageKb: 54,
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
        status: 'bio', stock: 4
    },
    {
        id: 'dattes-medjool', category: 'sweets',
        name: { fr: 'Dattes Medjool Royales', ar: 'تمر المجهول الملكي', tzm: 'ⵜⵉⵢⵏⵉ ⵏ ⵍⵎⵊⵀⵓⵍ', en: 'Royal Medjool Dates' },
        cooperative: 'Coop. Ziz Oasis (Errachidia)', price: 140, weight: '1 kg', imageKb: 72,
        imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
        status: 'new', stock: 25
    },
    {
        id: 'amlou-amandes', category: 'sweets',
        name: { fr: 'Amlou aux Amandes', ar: 'أملو باللوز البلدي', tzm: 'ⴰⵎⵍⵓ ⵏ ⵍⵍⵓⵣ', en: 'Traditional Almond Amlou' },
        cooperative: 'Coop. Amal (Agadir)', price: 120, weight: '500 g', imageKb: 61,
        imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=600&q=80',
        stock: 8
    },
    {
        id: 'miel-thym', category: 'sweets',
        name: { fr: 'Miel de Thym (Z3itra)', ar: 'عسل الزعتر الحر', tzm: 'ⵜⴰⵎⵎⵏⵜ ⵏ ⵓⵥⴰⵜⵜⴰⵔ', en: 'Pure Thyme Honey' },
        cooperative: 'Coop. Atlas (Azilal)', price: 200, weight: '250 g', imageKb: 59,
        imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89134a5d?auto=format&fit=crop&w=600&q=80',
        status: 'popular', stock: 3
    },
    {
        id: 'eau-rose', category: 'cosmetics',
        name: { fr: 'Eau de Rose Distillée', ar: 'ماء الورد المقطر', tzm: 'ⴰⵎⴰⵏ ⵏ ⵡⴰⵔⴷ', en: 'Distilled Rose Water' },
        cooperative: "Coop. Roseraie (M'Gouna)", price: 80, weight: '200 ml', imageKb: 45,
        imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80',
        stock: 18
    }
];

/* ------------------------------------------------------------------ */
/*  DICTIONARIES                                                       */
/*  {n} / {name} are placeholders filled by fmt() in utils/format.ts   */
/* ------------------------------------------------------------------ */

const fr = {
    // Navigation & general
    docTitle: 'Souk Bladi · Coopératives marocaines',
    shop: 'Boutique',
    cooperatives: 'Nos Coopératives',
    cart: 'Panier',
    mission: 'Notre Mission',
    menu: 'Menu',
    close: 'Fermer',
    selectionTitle: 'Notre Sélection',
    season: "Saison d'Automne",

    // Sidebar
    guest: 'Invité',
    createAccount: 'Créer un compte',
    ecoScore: 'Éco-Score',
    tipWeight: '140 Ko au total',
    tipWebp: 'Images WebP',
    tipNoVideo: '0 vidéo autoplay',
    offlineReady: 'Mode hors-ligne prêt',

    // Top bar eco panel
    ecoPageWeight: 'Poids Page',
    ecoEmission: 'Émission',
    ecoMode: 'Mode Éco',
    on: 'Activé',
    off: 'Désactivé',
    ecoOptimized: 'Green IT Optimisé • 0 Vidéo Autoplay',

    // Hero
    heroTitle: 'Les trésors de nos coopératives, en direct.',
    heroSub: 'Soutenez nos collectifs ruraux marocains via une plateforme éco-conçue, rapide et éthique.',
    partnersTitle: 'Nos Partenaires Éthiques',
    slideLabel: 'Partenaire {n}',
    partnerOnssaName: 'ONSSA Maroc',
    partnerOnssaDesc: 'Contrôle & Sécurité Sanitaire Officielle',
    partnerBioName: 'Label Bio Maroc',
    partnerBioDesc: 'Certification Agriculture Biologique',
    partnerOdcoName: 'Réseau ODCO',
    partnerOdcoDesc: 'Registre Officiel des Coopératives',

    // Catalog
    catAll: 'Tout le terroir',
    catOils: 'Huiles & Extractions',
    catSpices: 'Épices & Safran',
    catSweets: 'Miel & Dattes',
    catCosmetics: 'Beauté Bio',
    statusNew: 'Nouveau',
    statusBio: 'Certifié Bio',
    statusPopular: 'Très demandé',
    priceDirect: 'Prix direct',
    lastUnits: 'Plus que {n}',
    inStock: 'En stock',
    webpBadge: 'Format WebP ({n} Ko)',
    addProductAria: 'Ajouter {name} au panier',
    maxInCart: '{name} : quantité maximale atteinte',
    addToCart: 'Ajouter',
    added: 'Ajouté',
    addToCartLong: 'Ajouter au panier',
    producedBy: 'Produit directement par :',
    netWeight: 'Poids net',
    ruralAvailability: 'Disponibilité rurale',
    unitsReady: '{n} unités prêtes',

    // Checkout
    confirmOrder: 'Confirmer votre commande',
    firstName: 'Prénom',
    namePlaceholder: 'Ex : Karim',
    phone: 'Téléphone (SMS livraison uniquement)',
    communeLabel: 'Commune / Village de livraison',
    privacyNotice: "Engagement NumVert : Aucune carte d'identité (CIN) ni GPS requis. Vos données ne sont jamais vendues.",
    emptyCart: 'Votre panier est vide.',
    totalLabel: 'Total à la livraison',
    orderDone: 'Commande validée !',
    orderDoneText: 'Votre commande a été enregistrée sans aucune collecte de données superflues.',
    increase: 'Augmenter la quantité',
    decrease: 'Diminuer la quantité',
    remove: 'Retirer du panier',

    // Cooperatives
    coopsTitle: 'Nos Coopératives Partenaires',
    coopsIntro: "Un réseau de {n} coopératives rurales marocaines, engagées pour la qualité, l'éthique et le commerce équitable.",
    members: '{n} membres',
    coopTypeArgan: "Huile d'Argan",
    coopTypeSaffron: 'Safran AOP',
    coopTypeDates: 'Dattes Medjool',
    coopTypeCosmetics: 'Cosmétique Bio',

    // Mission
    missionTitle: 'Green IT & NumVert',
    missionIntro: 'Notre plateforme est conçue selon les principes de la sobriété numérique et du respect total de la vie privée.',
    ecoHeading: 'Sobriété Numérique',
    eco1: 'Images 100% format WebP',
    eco2: 'Aucune vidéo en autoplay',
    eco3: 'DOM allégé et requêtes minimisées',
    privacyHeading: 'Privacy by Design',
    privacy1: "Aucune collecte de carte d'identité (CIN)",
    privacy2: 'Zéro tracking GPS pour la livraison',
    privacy3: "Communes rurales utilisées pour l'adressage",
};

export type TranslationKey = keyof typeof fr;
type Dict = Record<TranslationKey, string>;

const ar: Dict = {
    docTitle: 'Souk Bladi · التعاونيات المغربية',
    shop: 'المتجر',
    cooperatives: 'التعاونيات ديالنا',
    cart: 'السلة',
    mission: 'المهمة ديالنا',
    menu: 'القائمة',
    close: 'سد',
    selectionTitle: 'اختيارنا',
    season: 'موسم الخريف',

    guest: 'ضيف',
    createAccount: 'دير حساب',
    ecoScore: 'التنقيط الإيكولوجي',
    tipWeight: '140 كيلوبايت فالمجموع',
    tipWebp: 'تصاور WebP',
    tipNoVideo: 'بلا فيديو كيشغل بوحدو',
    offlineReady: 'خدام بلا أنترنيت',

    ecoPageWeight: 'وزن الصفحة',
    ecoEmission: 'الانبعاثات',
    ecoMode: 'الوضع الإيكولوجي',
    on: 'مفعّل',
    off: 'موقّف',
    ecoOptimized: 'موقع خفيف • إيكولوجي 100%',

    heroTitle: 'خيرات التعاونيات ديالنا، نيشان لعندك.',
    heroSub: 'دعم التعاونيات الفلاحية المغربية فموقع خفيف، سريع وكيحترم المعطيات الشخصية.',
    partnersTitle: 'الشركاء ديالنا',
    slideLabel: 'الشريك {n}',
    partnerOnssaName: 'ONSSA المغرب',
    partnerOnssaDesc: 'المراقبة والسلامة الصحية الرسمية',
    partnerBioName: 'علامة بيو المغرب',
    partnerBioDesc: 'شهادة الفلاحة البيولوجية',
    partnerOdcoName: 'شبكة ODCO',
    partnerOdcoDesc: 'السجل الرسمي للتعاونيات',

    catAll: 'كلشي',
    catOils: 'الزيوت',
    catSpices: 'التوابل والزعفران',
    catSweets: 'العسل والتمر',
    catCosmetics: 'جمال بيو',
    statusNew: 'جديد',
    statusBio: 'بيو معتمد',
    statusPopular: 'مطلوب بزاف',
    priceDirect: 'الثمن المباشر',
    lastUnits: 'بقاو غير {n}',
    inStock: 'متوفر',
    webpBadge: 'صيغة WebP ({n} كيلوبايت)',
    addProductAria: 'زيد {name} للسلة',
    maxInCart: '{name} : وصلتي للحد الأقصى',
    addToCart: 'زيد للسلة',
    added: 'تزاد',
    addToCartLong: 'زيد للسلة',
    producedBy: 'منتوج مباشرة من :',
    netWeight: 'الوزن الصافي',
    ruralAvailability: 'التوفر فالبادية',
    unitsReady: '{n} وحدات واجدين',

    confirmOrder: 'تأكيد الطلب',
    firstName: 'السمية',
    namePlaceholder: 'مثلا : كريم',
    phone: 'رقم الهاتف',
    communeLabel: 'الجماعة / الدوار ديال التوصيل',
    privacyNotice: 'التزام NumVert: بلا بطاقة وطنية (CIN) وبلا GPS. المعطيات ديالك ما عمرها تباع.',
    emptyCart: 'السلة خاوية.',
    totalLabel: 'المجموع عند الاستلام',
    orderDone: 'الطلب تأكد !',
    orderDoneText: 'الطلب ديالك تسجل بلا ما نجمعو معطيات زايدة.',
    increase: 'زيد',
    decrease: 'نقص',
    remove: 'حذف',

    coopsTitle: 'التعاونيات الشريكة ديالنا',
    coopsIntro: 'شبكة ديال {n} تعاونيات قروية مغربية، ملتزمة بالجودة والأخلاق والتجارة العادلة.',
    members: '{n} أعضاء',
    coopTypeArgan: 'زيت أركان',
    coopTypeSaffron: 'زعفران AOP',
    coopTypeDates: 'تمر المجهول',
    coopTypeCosmetics: 'تجميل بيو',

    missionTitle: 'الإيكولوجيا الرقمية و NumVert',
    missionIntro: 'المنصة ديالنا مبنية على مبادئ الاقتصاد الرقمي والاحترام الكامل للحياة الخاصة.',
    ecoHeading: 'اقتصاد رقمي',
    eco1: 'التصاور كلها بصيغة WebP',
    eco2: 'بلا فيديو كيشغل بوحدو',
    eco3: 'كود خفيف وطلبات قليلة',
    privacyHeading: 'الخصوصية من التصميم',
    privacy1: 'ما كنطلبوش البطاقة الوطنية (CIN)',
    privacy2: 'بلا تتبع GPS فالتوصيل',
    privacy3: 'كنستعملو الجماعات القروية فالعنوان',
};

const en: Dict = {
    docTitle: 'Souk Bladi · Moroccan cooperatives',
    shop: 'Shop',
    cooperatives: 'Our Cooperatives',
    cart: 'Cart',
    mission: 'Our Mission',
    menu: 'Menu',
    close: 'Close',
    selectionTitle: 'Our Selection',
    season: 'Autumn Season',

    guest: 'Guest',
    createAccount: 'Create an account',
    ecoScore: 'Eco-Score',
    tipWeight: '140 KB in total',
    tipWebp: 'WebP images',
    tipNoVideo: '0 autoplay video',
    offlineReady: 'Offline mode ready',

    ecoPageWeight: 'Page weight',
    ecoEmission: 'Emissions',
    ecoMode: 'Eco mode',
    on: 'On',
    off: 'Off',
    ecoOptimized: 'Green IT Optimized • Zero Autoplay Video',

    heroTitle: 'Treasures from our cooperatives, direct to you.',
    heroSub: 'Support rural Moroccan collectives through a lightweight, fast, and privacy-first platform.',
    partnersTitle: 'Our Ethical Partners',
    slideLabel: 'Partner {n}',
    partnerOnssaName: 'ONSSA Morocco',
    partnerOnssaDesc: 'Official food safety control',
    partnerBioName: 'Morocco Organic Label',
    partnerBioDesc: 'Organic farming certification',
    partnerOdcoName: 'ODCO Network',
    partnerOdcoDesc: 'Official register of cooperatives',

    catAll: 'All products',
    catOils: 'Oils & Extracts',
    catSpices: 'Spices & Saffron',
    catSweets: 'Honey & Dates',
    catCosmetics: 'Organic Beauty',
    statusNew: 'New',
    statusBio: 'Certified Organic',
    statusPopular: 'In demand',
    priceDirect: 'Direct price',
    lastUnits: 'Only {n} left',
    inStock: 'In stock',
    webpBadge: 'WebP format ({n} KB)',
    addProductAria: 'Add {name} to cart',
    maxInCart: '{name}: maximum quantity reached',
    addToCart: 'Add to cart',
    added: 'Added',
    addToCartLong: 'Add to cart',
    producedBy: 'Produced directly by:',
    netWeight: 'Net weight',
    ruralAvailability: 'Rural availability',
    unitsReady: '{n} units ready',

    confirmOrder: 'Confirm your order',
    firstName: 'First Name',
    namePlaceholder: 'e.g. Karim',
    phone: 'Mobile Number',
    communeLabel: 'Delivery Commune / Village',
    privacyNotice: 'NumVert Pledge: No ID card (CIN) or GPS required. Your data is never sold.',
    emptyCart: 'Your cart is empty.',
    totalLabel: 'Total on delivery',
    orderDone: 'Order confirmed!',
    orderDoneText: 'Your order has been recorded without collecting any unnecessary data.',
    increase: 'Increase quantity',
    decrease: 'Decrease quantity',
    remove: 'Remove from cart',

    coopsTitle: 'Our Partner Cooperatives',
    coopsIntro: 'A network of {n} rural Moroccan cooperatives committed to quality, ethics and fair trade.',
    members: '{n} members',
    coopTypeArgan: 'Argan Oil',
    coopTypeSaffron: 'PDO Saffron',
    coopTypeDates: 'Medjool Dates',
    coopTypeCosmetics: 'Organic Cosmetics',

    missionTitle: 'Green IT & NumVert',
    missionIntro: 'Our platform follows the principles of digital sobriety and full respect for privacy.',
    ecoHeading: 'Digital Sobriety',
    eco1: '100% WebP images',
    eco2: 'No autoplay video',
    eco3: 'Lean DOM and minimal requests',
    privacyHeading: 'Privacy by Design',
    privacy1: 'No ID card (CIN) collected',
    privacy2: 'Zero GPS tracking for delivery',
    privacy3: 'Rural communes used for addressing',
};

/*
 * TAMAZIGHT: only strings that were already in Tifinagh are kept here.
 * Every other key falls back to French (visible, so nobody mistakes it for a
 * translation). Removed because they mixed Arabic/Latin letters into Tifinagh:
 * offlineReady, emptyCart, totalLabel. TODO: have a native speaker translate
 * those + everything that still falls back to French.
 */
const tzm: Dict = {
    ...fr,
    shop: 'ⵜⴰⵃⴰⵏⵓⵜ',
    cooperatives: 'ⵜⵉⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ',
    cart: 'ⵜⴰⵙⴽⵏⵉⵜ',
    mission: 'ⵜⴰⵙⵎⵉⴳⵍⵜ ⵏⵏⵖ',
    heroTitle: 'ⵜⵉⴳⵎⵎⵉ ⵏ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ, ⵙⵔⵉⴷ.',
    heroSub: 'ⴰⵡⵙ ⵉ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ ⴳ ⵍⵎⵖⵔⵉⴱ ⵙ ⵓⵙⵉⵜ ⴰⴼⵙⵙⴰⵙ ⴷ ⵓⵣⵔⴼⴰⵏ.',
    addToCart: 'ⵔⵏⵓ',
    added: 'ⵉⵜⵜⵓⵔⵏⴰ',
    confirmOrder: 'ⵙⵖⵥⵏ ⵜⴰⵙⵓⵜⵍⵜ',
    firstName: 'ⵉⵙⵎ',
    phone: 'ⵓⵟⵟⵓⵏ ⵏ ⵓⵜⵉⵍⵉⴼⵓⵏ',
    communeLabel: 'ⵜⴰⴳⵔⴰⵡⵜ / ⴰⴷⵡⵡⴰⵔ',
    privacyNotice: 'NumVert: ⵡⴰⵍⵓ CIN ⵏⵖ GPS. ⵉⵙⴼⴽⴰ ⵏⵏⴽ ⵓⵔ ⴷⴰ ⵜⵜⵏⵣⴰⵏ.',
    ecoOptimized: 'Green IT • ⴰⴼⵙⵙⴰⵙ',
};

export const translations: Record<Language, Dict> = { fr, ar, tzm, en };

/* ------------------------------------------------------------------ */
/*  COOPERATIVES (single source of truth for the count shown in UI)    */
/* ------------------------------------------------------------------ */

export interface Cooperative {
    id: string;
    name: string;
    region: string;
    members: number;
    typeKey: TranslationKey;
}

export const COOPERATIVES: Cooperative[] = [
    { id: 'tighanimine', name: 'Coop. Tighanimine', region: 'Essaouira', members: 42, typeKey: 'coopTypeArgan' },
    { id: 'souktana', name: 'Coop. Souktana', region: 'Taliouine', members: 18, typeKey: 'coopTypeSaffron' },
    { id: 'ziz', name: 'Coop. Ziz Oasis', region: 'Errachidia', members: 56, typeKey: 'coopTypeDates' },
    { id: 'roseraie', name: 'Coop. Roseraie', region: "Kelaat M'Gouna", members: 24, typeKey: 'coopTypeCosmetics' },
];