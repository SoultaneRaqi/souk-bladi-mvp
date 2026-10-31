export type Language = 'fr' | 'ar' | 'tzm' | 'en';
export type Localized = Record<Language, string>;
export type WeightUnit = 'ml' | 'g' | 'kg';

export const LANGUAGE_META: Record<
    Language,
    { label: string; nativeName: string; dir: 'ltr' | 'rtl'; locale: string; htmlLang: string }
> = {
    fr: { label: 'FR', nativeName: 'Français', dir: 'ltr', locale: 'fr-MA', htmlLang: 'fr' },
    ar: { label: 'الدارجة', nativeName: 'الدارجة', dir: 'rtl', locale: 'ar-MA', htmlLang: 'ar' },
    tzm: { label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', dir: 'ltr', locale: 'fr-MA', htmlLang: 'zgh' },
    en: { label: 'EN', nativeName: 'English', dir: 'ltr', locale: 'en-GB', htmlLang: 'en' },
};

/* ------------------------------------------------------------------ */
/*  COOPERATIVES + COMMUNES (localized data)                           */
/*  TODO: Tifinagh values need a native-speaker check.                 */
/*  TODO: member counts for amal / atlas are placeholders.             */
/* ------------------------------------------------------------------ */

export interface Cooperative {
    id: string;
    name: Localized;
    region: Localized;
    members: number;
    typeKey: TranslationKey;
}

export const COOPERATIVES: Cooperative[] = [
    {
        id: 'tighanimine', members: 42, typeKey: 'coopTypeArgan',
        name: { fr: 'Coop. Tighanimine', ar: 'تعاونية تيغانيمين', tzm: 'ⵜⴰⵎⵙⵎⵓⵏⵉⵜ ⵏ ⵜⵉⵖⴰⵏⵉⵎⵉⵏ', en: 'Tighanimine Coop.' },
        region: { fr: 'Essaouira', ar: 'الصويرة', tzm: 'ⵜⴰⵙⵓⵔⵜ', en: 'Essaouira' },
    },
    {
        id: 'souktana', members: 18, typeKey: 'coopTypeSaffron',
        name: { fr: 'Coop. Souktana', ar: 'تعاونية سوكتانا', tzm: 'ⵜⴰⵎⵙⵎⵓⵏⵉⵜ ⵏ ⵙⵓⴽⵜⴰⵏⴰ', en: 'Souktana Coop.' },
        region: { fr: 'Taliouine', ar: 'تاليوين', tzm: 'ⵜⴰⵍⵉⵡⵉⵏ', en: 'Taliouine' },
    },
    {
        id: 'ziz', members: 56, typeKey: 'coopTypeDates',
        name: { fr: 'Coop. Ziz Oasis', ar: 'تعاونية واحة زيز', tzm: 'ⵜⴰⵎⵙⵎⵓⵏⵉⵜ ⵏ ⵣⵉⵣ', en: 'Ziz Oasis Coop.' },
        region: { fr: 'Errachidia', ar: 'الرشيدية', tzm: 'ⵕⵕⴰⵛⵉⴷⵉⵢⴰ', en: 'Errachidia' },
    },
    {
        id: 'amal', members: 31, typeKey: 'coopTypeAmlou',
        name: { fr: 'Coop. Amal', ar: 'تعاونية أمل', tzm: 'ⵜⴰⵎⵙⵎⵓⵏⵉⵜ ⴰⵎⴰⵍ', en: 'Amal Coop.' },
        region: { fr: 'Agadir', ar: 'أكادير', tzm: 'ⴰⴳⴰⴷⵉⵔ', en: 'Agadir' },
    },
    {
        id: 'atlas', members: 27, typeKey: 'coopTypeHoney',
        name: { fr: 'Coop. Atlas', ar: 'تعاونية الأطلس', tzm: 'ⵜⴰⵎⵙⵎⵓⵏⵉⵜ ⵏ ⴰⵜⵍⴰⵙ', en: 'Atlas Coop.' },
        region: { fr: 'Azilal', ar: 'أزيلال', tzm: 'ⴰⵣⵉⵍⴰⵍ', en: 'Azilal' },
    },
    {
        id: 'roseraie', members: 24, typeKey: 'coopTypeCosmetics',
        name: { fr: 'Coop. Roseraie', ar: 'تعاونية الوردة', tzm: 'ⵜⴰⵎⵙⵎⵓⵏⵉⵜ ⵏ ⵡⴰⵔⴷ', en: 'Roseraie Coop.' },
        region: { fr: "Kelaat M'Gouna", ar: 'قلعة مكونة', tzm: 'ⵜⴰⵇⵍⵄⵜ ⵏ ⵎⴳⵓⵏⴰ', en: "Kelaat M'Gouna" },
    },
];

export const getCoop = (id: string): Cooperative =>
    COOPERATIVES.find((c) => c.id === id) ?? COOPERATIVES[0];

export const COMMUNES: { id: string; label: Localized }[] = [
    { id: 'ait-ourir', label: { fr: 'Aït Ourir (Al Haouz)', ar: 'آيت أورير (الحوز)', tzm: 'ⴰⵢⵜ ⵓⵔⵉⵔ (ⵍⵃⵓⵣ)', en: 'Aït Ourir (Al Haouz)' } },
    { id: 'taliouine', label: { fr: 'Taliouine (Taroudant)', ar: 'تاليوين (تارودانت)', tzm: 'ⵜⴰⵍⵉⵡⵉⵏ (ⵜⴰⵔⵓⴷⴰⵏⵜ)', en: 'Taliouine (Taroudant)' } },
    { id: 'tafraout', label: { fr: 'Tafraout (Tiznit)', ar: 'تافراوت (تيزنيت)', tzm: 'ⵜⴰⴼⵔⴰⵡⵜ (ⵜⵉⵣⵏⵉⵜ)', en: 'Tafraout (Tiznit)' } },
    { id: 'arfoud', label: { fr: 'Arfoud (Errachidia)', ar: 'أرفود (الرشيدية)', tzm: 'ⴰⵔⴼⵓⴷ (ⵕⵕⴰⵛⵉⴷⵉⵢⴰ)', en: 'Arfoud (Errachidia)' } },
    { id: 'mgouna', label: { fr: "Kelaat M'Gouna", ar: 'قلعة مكونة', tzm: 'ⵜⴰⵇⵍⵄⵜ ⵏ ⵎⴳⵓⵏⴰ', en: "Kelaat M'Gouna" } },
];

/* ------------------------------------------------------------------ */
/*  PRODUCTS                                                           */
/* ------------------------------------------------------------------ */

export interface ProductItem {
    id: string;
    category: 'all' | 'spices' | 'oils' | 'sweets' | 'cosmetics';
    name: Localized;
    coopId: string;
    price: number;
    weight: { value: number; unit: WeightUnit };
    imageKb: number;
    imageUrl: string;
    status?: 'new' | 'popular' | 'bio';
    stock: number;
}

export const PRODUCTS_DATA: ProductItem[] = [
    {
        id: 'argan-bio', category: 'oils', coopId: 'tighanimine',
        name: { fr: "Huile d'Argan Bio", ar: 'زيت أركان البلدي', tzm: 'ⴰⵣⴰⵜⵉⵎ ⵏ ⵡⴰⵔⴳⴰⵏ', en: 'Organic Argan Oil' },
        price: 180, weight: { value: 500, unit: 'ml' }, imageKb: 68,
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
        status: 'popular', stock: 12,
    },
    {
        id: 'safran-taliouine', category: 'spices', coopId: 'souktana',
        name: { fr: 'Safran AOP Taliouine', ar: 'زعفران تاليوين الحر', tzm: 'ⵣⴰⵄⴼⵔⴰⵏ ⵏ ⵜⴰⵍⵉⵡⵉⵏ', en: 'Taliouine Saffron PDO' },
        price: 260, weight: { value: 5, unit: 'g' }, imageKb: 54,
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
        status: 'bio', stock: 4,
    },
    {
        id: 'dattes-medjool', category: 'sweets', coopId: 'ziz',
        name: { fr: 'Dattes Medjool Royales', ar: 'تمر المجهول الملكي', tzm: 'ⵜⵉⵢⵏⵉ ⵏ ⵍⵎⵊⵀⵓⵍ', en: 'Royal Medjool Dates' },
        price: 140, weight: { value: 1, unit: 'kg' }, imageKb: 72,
        imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
        status: 'new', stock: 25,
    },
    {
        id: 'amlou-amandes', category: 'sweets', coopId: 'amal',
        name: { fr: 'Amlou aux Amandes', ar: 'أملو باللوز البلدي', tzm: 'ⴰⵎⵍⵓ ⵏ ⵍⵍⵓⵣ', en: 'Traditional Almond Amlou' },
        price: 120, weight: { value: 500, unit: 'g' }, imageKb: 61,
        imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=600&q=80',
        stock: 8,
    },
    {
        id: 'miel-thym', category: 'sweets', coopId: 'atlas',
        name: { fr: 'Miel de Thym (Z3itra)', ar: 'عسل الزعتر الحر', tzm: 'ⵜⴰⵎⵎⵏⵜ ⵏ ⵓⵥⴰⵜⵜⴰⵔ', en: 'Pure Thyme Honey' },
        price: 200, weight: { value: 250, unit: 'g' }, imageKb: 59,
        imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89134a5d?auto=format&fit=crop&w=600&q=80',
        status: 'popular', stock: 3,
    },
    {
        id: 'eau-rose', category: 'cosmetics', coopId: 'roseraie',
        name: { fr: 'Eau de Rose Distillée', ar: 'ماء الورد المقطر', tzm: 'ⴰⵎⴰⵏ ⵏ ⵡⴰⵔⴷ', en: 'Distilled Rose Water' },
        price: 80, weight: { value: 200, unit: 'ml' }, imageKb: 45,
        imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80',
        stock: 18,
    },
];

/* ------------------------------------------------------------------ */
/*  DICTIONARIES ({n} / {name} are filled by fmt() in utils/format)    */
/* ------------------------------------------------------------------ */

const fr = {
    // Navigation & general
    docTitle: 'Souk Bladi · Coopératives marocaines',
    shop: 'Boutique',
    cooperatives: 'Nos Coopératives',
    cart: 'Panier',
    cartWithCount: 'Panier, {n} article(s)',
    mission: 'Notre Mission',
    menu: 'Menu',
    close: 'Fermer',
    selectionTitle: 'Notre Sélection',
    season: "Saison d'Automne",
    language: 'Langue',
    skipToContent: 'Aller au contenu',
    mainNav: 'Navigation principale',
    categoriesNav: 'Catégories de produits',

    // Sidebar
    guest: 'Invité',
    createAccount: 'Créer un compte',
    ecoScore: 'Éco-Score',
    ecoDetails: "Détails de l'Éco-Score",
    tipWeight: '140 Ko au total',
    tipWebp: 'Images WebP',
    tipNoVideo: '0 vidéo autoplay',
    offlineReady: 'Mode hors-ligne prêt',

    // Eco panel
    ecoPageWeight: 'Poids Page',
    ecoEmission: 'Émission',
    ecoMode: 'Mode Éco',
    on: 'Activé',
    off: 'Désactivé',

    // Hero
    heroTitle: 'Les trésors de nos coopératives, en direct.',
    heroSub: 'Soutenez nos collectifs ruraux marocains via une plateforme éco-conçue, rapide et éthique.',
    partnersTitle: 'Nos Partenaires Éthiques',
    slideLabel: 'Partenaire {n}',
    pauseSlider: 'Mettre le diaporama en pause',
    playSlider: 'Relancer le diaporama',
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
    addToCartLong: 'Ajouter au panier',
    producedBy: 'Produit directement par :',
    netWeight: 'Poids net',
    ruralAvailability: 'Disponibilité rurale',
    unitsReady: '{n} unités prêtes',
    addedAnnouncement: '{name} ajouté au panier',
    removedAnnouncement: '{name} retiré du panier',
    quantityAnnouncement: '{name} : quantité {n}',
    unitMl: 'ml',
    unitG: 'g',
    unitKg: 'kg',

    // Checkout
    confirmOrder: 'Confirmer votre commande',
    firstName: 'Prénom',
    namePlaceholder: 'Ex : Karim',
    nameRequired: 'Indiquez votre prénom.',
    phone: 'Téléphone (SMS livraison uniquement)',
    phoneHint: 'Format : +212 6XX XX XX XX',
    phoneInvalid: 'Numéro invalide. Exemple : +212 6XX XX XX XX',
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
    coopTypeAmlou: 'Amlou',
    coopTypeHoney: 'Miel',
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
    cartWithCount: 'السلة، {n} منتوجات',
    mission: 'المهمة ديالنا',
    menu: 'القائمة',
    close: 'سد',
    selectionTitle: 'اختيارنا',
    season: 'موسم الخريف',
    language: 'اللغة',
    skipToContent: 'دوز للمحتوى',
    mainNav: 'التنقل الرئيسي',
    categoriesNav: 'أصناف المنتوجات',

    guest: 'ضيف',
    createAccount: 'دير حساب',
    ecoScore: 'التنقيط الإيكولوجي',
    ecoDetails: 'تفاصيل التنقيط الإيكولوجي',
    tipWeight: '140 كيلوبايت فالمجموع',
    tipWebp: 'تصاور WebP',
    tipNoVideo: 'بلا فيديو كيشغل بوحدو',
    offlineReady: 'خدام بلا أنترنيت',

    ecoPageWeight: 'وزن الصفحة',
    ecoEmission: 'الانبعاثات',
    ecoMode: 'الوضع الإيكولوجي',
    on: 'مفعّل',
    off: 'موقّف',

    heroTitle: 'خيرات التعاونيات ديالنا، نيشان لعندك.',
    heroSub: 'دعم التعاونيات الفلاحية المغربية فموقع خفيف، سريع وكيحترم المعطيات الشخصية.',
    partnersTitle: 'الشركاء ديالنا',
    slideLabel: 'الشريك {n}',
    pauseSlider: 'وقّف العرض',
    playSlider: 'شغّل العرض',
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
    addToCartLong: 'زيد للسلة',
    producedBy: 'منتوج مباشرة من :',
    netWeight: 'الوزن الصافي',
    ruralAvailability: 'التوفر فالبادية',
    unitsReady: '{n} وحدات واجدين',
    addedAnnouncement: '{name} تزاد للسلة',
    removedAnnouncement: '{name} تحيد من السلة',
    quantityAnnouncement: '{name} : الكمية {n}',
    unitMl: 'مل',
    unitG: 'غ',
    unitKg: 'كغ',

    confirmOrder: 'تأكيد الطلب',
    firstName: 'السمية',
    namePlaceholder: 'مثلا : كريم',
    nameRequired: 'كتب السمية ديالك.',
    phone: 'رقم الهاتف',
    phoneHint: 'الصيغة : +212 6XX XX XX XX',
    phoneInvalid: 'الرقم ماشي صحيح. مثال : +212 6XX XX XX XX',
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
    coopTypeAmlou: 'أملو',
    coopTypeHoney: 'عسل',
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
    cartWithCount: 'Cart, {n} item(s)',
    mission: 'Our Mission',
    menu: 'Menu',
    close: 'Close',
    selectionTitle: 'Our Selection',
    season: 'Autumn Season',
    language: 'Language',
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    categoriesNav: 'Product categories',

    guest: 'Guest',
    createAccount: 'Create an account',
    ecoScore: 'Eco-Score',
    ecoDetails: 'Eco-Score details',
    tipWeight: '140 KB in total',
    tipWebp: 'WebP images',
    tipNoVideo: '0 autoplay video',
    offlineReady: 'Offline mode ready',

    ecoPageWeight: 'Page weight',
    ecoEmission: 'Emissions',
    ecoMode: 'Eco mode',
    on: 'On',
    off: 'Off',

    heroTitle: 'Treasures from our cooperatives, direct to you.',
    heroSub: 'Support rural Moroccan collectives through a lightweight, fast, and privacy-first platform.',
    partnersTitle: 'Our Ethical Partners',
    slideLabel: 'Partner {n}',
    pauseSlider: 'Pause slideshow',
    playSlider: 'Resume slideshow',
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
    addToCartLong: 'Add to cart',
    producedBy: 'Produced directly by:',
    netWeight: 'Net weight',
    ruralAvailability: 'Rural availability',
    unitsReady: '{n} units ready',
    addedAnnouncement: '{name} added to cart',
    removedAnnouncement: '{name} removed from cart',
    quantityAnnouncement: '{name}: quantity {n}',
    unitMl: 'ml',
    unitG: 'g',
    unitKg: 'kg',

    confirmOrder: 'Confirm your order',
    firstName: 'First Name',
    namePlaceholder: 'e.g. Karim',
    nameRequired: 'Please enter your first name.',
    phone: 'Mobile Number',
    phoneHint: 'Format: +212 6XX XX XX XX',
    phoneInvalid: 'Invalid number. Example: +212 6XX XX XX XX',
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
    coopTypeAmlou: 'Amlou',
    coopTypeHoney: 'Honey',
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
 * TAMAZIGHT: only strings already in Tifinagh live here. Every other key
 * falls back to Arabic on purpose (visible, never a wrong translation).
 * UNTRANSLATED_TZM below lists what still needs a native speaker; the app
 * prints it to the console (dev only) when you switch to Tamazight.
 */
const tzmOverrides: Partial<Dict> = {
    // Navigation & general
    docTitle: 'Souk Bladi · ⵜⵉⵎⵙⵎⵓⵏⵉⵏ ⵜⵉⵎⵖⵔⵉⴱⵉⵢⵉⵏ',
    shop: 'ⵜⴰⵃⴰⵏⵓⵜ',
    cooperatives: 'ⵜⵉⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ',
    cart: 'ⵜⴰⵙⴽⵏⵉⵜ',
    cartWithCount: 'ⵜⴰⵙⴽⵏⵉⵜ, {n} ⵏ ⵉⴼⴰⵔⵉⵙⵏ',
    mission: 'ⵜⴰⵙⵎⵉⴳⵍⵜ ⵏⵏⵖ',
    menu: 'ⵜⴰⵍⴳⴰⵎⵜ',
    close: 'ⵔⴳⵍ',
    selectionTitle: 'ⴰⵙⵜⴰⵢ ⵏⵏⵖ',
    season: 'ⴰⵏⵏⴰⵣ ⵏ ⵜⵎⵡⴰⵏⵜ',
    language: 'ⵜⵓⵜⵍⴰⵢⵜ',
    skipToContent: 'ⵣⵔⵉ ⵖⵔ ⵓⴳⴱⵓⵔ',
    mainNav: 'ⴰⵙⵏⵎⴰⵍⴰ ⴰⴷⵙⵍⴰⵏ',
    categoriesNav: 'ⴰⵏⴰⵡⵏ ⵏ ⵉⴼⴰⵔⵉⵙⵏ',

    // Sidebar
    guest: 'ⴰⵏⴱⴳⵉ',
    createAccount: 'ⵙⵏⴼⵍⵓⵍ ⴰⵎⵉⴹⴰⵏ',
    ecoScore: 'ⵜⴰⵏⵇⵇⵉⴹⵜ ⵜⴰⵡⵏⴰⴹⴰⵏⵜ',
    ecoDetails: 'ⵉⴼⵔⵓⵔⵉⵜⵏ ⵏ ⵜⵏⵇⵇⵉⴹⵜ ⵜⴰⵡⵏⴰⴹⴰⵏⵜ',
    tipWeight: '140 ⴽⴱ ⴳ ⵓⵖⵔⵓⴷ',
    tipWebp: 'ⵜⵉⵡⵍⴰⴼⵉⵏ WebP',
    tipNoVideo: '0 ⵏ ⵓⴼⵉⴷⵢⵓ ⴰⵡⵓⵔⵎⴰⵏ',
    offlineReady: 'ⴰⵙⴽⴰⵔ ⵡⴰⵔ ⴰⵏⵜⵉⵔⵏⵉⵜ ⵉⵃⵢⴰ',

    // Eco panel
    ecoPageWeight: 'ⴰⵥⴰⵥⵓ ⵏ ⵜⵙⵏⴰ',
    ecoEmission: 'ⴰⵙⵓⴼⵖ',
    ecoMode: 'ⴰⵙⴽⴰⵔ ⴰⵡⵏⴰⴹⴰⵏ',
    on: 'ⵉⵔⵎⴷ',
    off: 'ⵉⴱⴷⴷ',

    // Hero
    heroTitle: 'ⵜⵉⴳⵎⵎⵉ ⵏ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ, ⵙⵔⵉⴷ.',
    heroSub: 'ⴰⵡⵙ ⵉ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ ⴳ ⵍⵎⵖⵔⵉⴱ ⵙ ⵓⵙⵉⵜ ⴰⴼⵙⵙⴰⵙ ⴷ ⵓⵣⵔⴼⴰⵏ.',
    partnersTitle: 'ⵉⵎⴷⵔⴰⵡⵏ ⵏⵏⵖ',
    slideLabel: 'ⴰⵎⴷⵔⴰⵡ {n}',
    pauseSlider: 'ⵙⴱⴷⴷ ⴰⵙⴼⵙⵔ',
    playSlider: 'ⵙⵔⵎⴷ ⴰⵙⴼⵙⵔ',
    partnerOnssaName: 'ONSSA ⵍⵎⵖⵔⵉⴱ',
    partnerOnssaDesc: 'ⴰⵙⵡⵓⴷⴷⵓ ⴷ ⵜⵏⴼⵔⵓⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵜⵓⵏⵚⵉⴱⵜ',
    partnerBioName: 'ⵜⴰⵎⴰⵜⴰⵔⵜ Bio ⵍⵎⵖⵔⵉⴱ',
    partnerBioDesc: 'ⴰⵙⵍⴽⵉⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ ⵜⴰⴳⴰⵎⴰⵏⵜ',
    partnerOdcoName: 'ⴰⵥⵟⵟⴰ ODCO',
    partnerOdcoDesc: 'ⴰⵣⵎⵎⴻⵎ ⵓⵏⵚⵉⴱ ⵏ ⵜⵎⵙⵎⵓⵏⵉⵏ',

    // Catalog
    catAll: 'ⴽⵓⵍⵍⵓ ⵉⴼⴰⵔⵉⵙⵏ',
    catOils: 'ⵉⵣⴰⵜⵉⵎⵏ',
    catSpices: 'ⵉⵙⴰⴼⴰⵔⵏ ⴷ ⵣⴰⵄⴼⵔⴰⵏ',
    catSweets: 'ⵜⴰⵎⵎⵏⵜ ⴷ ⵜⵉⵢⵏⵉ',
    catCosmetics: 'ⴰⴼⵓⵍⴽⵉ ⴰⴳⴰⵎⴰⵏ',
    statusNew: 'ⴰⵎⴰⵢⵏⵓ',
    statusBio: 'ⴰⴳⴰⵎⴰⵏ ⵉⵜⵜⵓⵙⵖⵥⵏⵏ',
    statusPopular: 'ⵉⵜⵜⵓⵙⵓⵜⵔ ⴱⴰⵀⵔⴰ',
    priceDirect: 'ⴰⵜⵉⴳ ⵓⵙⵔⵉⴷ',
    lastUnits: 'ⵖⴰⵙ {n} ⵉ ⴷ ⵉⵇⵇⵉⵎⵏ',
    inStock: 'ⵉⵍⵍⴰ',
    webpBadge: 'ⴰⵎⴰⵙⴰⵍ WebP ({n} ⴽⴱ)',
    addProductAria: 'ⵔⵏⵓ {name} ⵖⵔ ⵜⵙⴽⵏⵉⵜ',
    maxInCart: '{name} : ⵜⵍⴽⵎⴷ ⴰⵡⵜⵜⵓ ⴰⵎⵇⵇⵔⴰⵏ',
    addToCartLong: 'ⵔⵏⵓ ⵖⵔ ⵜⵙⴽⵏⵉⵜ',
    producedBy: 'ⵉⵜⵜⵓⴼⴰⵔⵙ ⵙⵔⵉⴷ ⵙⵖⵓⵔ :',
    netWeight: 'ⴰⵥⴰⵥⵓ ⵓⵙⴼⵉ',
    ruralAvailability: 'ⵜⵉⵍⵉⵜ ⴳ ⵓⴼⴰⵔⴰ',
    unitsReady: '{n} ⵏ ⵜⵢⵓⵡⵏⵉⵏ ⵃⵢⴰⵏⵜ',
    addedAnnouncement: 'ⵉⵜⵜⵓⵔⵏⴰ {name} ⵖⵔ ⵜⵙⴽⵏⵉⵜ',
    removedAnnouncement: 'ⵉⵜⵜⵓⴽⴽⵙ {name} ⵣⴳ ⵜⵙⴽⵏⵉⵜ',
    quantityAnnouncement: '{name} : ⵜⴰⵙⵎⴽⵜⴰ {n}',
    unitMl: 'ⵎⵍ',
    unitG: 'ⴳ',
    unitKg: 'ⴽⴳ',

    // Checkout
    confirmOrder: 'ⵙⵖⵥⵏ ⵜⴰⵙⵓⵜⵍⵜ',
    firstName: 'ⵉⵙⵎ',
    namePlaceholder: 'ⴰⵎⴷⵢⴰ : ⴽⴰⵔⵉⵎ',
    nameRequired: 'ⴰⵔⴰ ⵉⵙⵎ ⵏⵏⴽ.',
    phone: 'ⵓⵟⵟⵓⵏ ⵏ ⵓⵜⵉⵍⵉⴼⵓⵏ',
    phoneHint: 'ⴰⵎⴰⵙⴰⵍ : +212 6XX XX XX XX',
    phoneInvalid: 'ⵓⵟⵟⵓⵏ ⵓⵔ ⵉⵖⵥⵉⵏ. ⴰⵎⴷⵢⴰ : +212 6XX XX XX XX',
    communeLabel: 'ⵜⴰⴳⵔⴰⵡⵜ / ⴰⴷⵡⵡⴰⵔ',
    privacyNotice: 'NumVert: ⵡⴰⵍⵓ CIN ⵏⵖ GPS. ⵉⵙⴼⴽⴰ ⵏⵏⴽ ⵓⵔ ⴷⴰ ⵜⵜⵏⵣⴰⵏ.',
    emptyCart: 'ⵜⴰⵙⴽⵏⵉⵜ ⵏⵏⴽ ⵜⵅⵡⴰ.',
    totalLabel: 'ⴰⵖⵔⵓⴷ ⴳ ⵡⴰⴽⵓⴷ ⵏ ⵡⴰⵡⴰⴹ',
    orderDone: 'ⵜⴰⵙⵓⵜⵍⵜ ⵜⵜⵓⵙⵖⵥⵏ !',
    orderDoneText: 'ⵜⴰⵙⵓⵜⵍⵜ ⵏⵏⴽ ⵜⵜⵓⵣⵎⵎⴻⵎ ⵡⴰⵔ ⴰⵍⵇⵇⵓⴹ ⵏ ⵉⵙⴼⴽⴰ ⵉⵣⴰⵢⴷⵏ.',
    increase: 'ⵔⵏⵓ ⵜⴰⵙⵎⴽⵜⴰ',
    decrease: 'ⵙⵏⵇⵙ ⵜⴰⵙⵎⴽⵜⴰ',
    remove: 'ⴽⴽⵙ ⵣⴳ ⵜⵙⴽⵏⵉⵜ',

    // Cooperatives
    coopsTitle: 'ⵜⵉⵎⵙⵎⵓⵏⵉⵏ ⵏⵏⵖ ⵜⵉⵎⴷⵔⴰⵡⵉⵏ',
    coopsIntro: 'ⴰⵥⵟⵟⴰ ⵏ {n} ⵏ ⵜⵎⵙⵎⵓⵏⵉⵏ ⵜⵉⵎⵖⵔⵉⴱⵉⵢⵉⵏ, ⵉⵎⵓⵏⵏ ⵖⴼ ⵜⵖⴰⵔⴰ, ⵉⵎⵏⵣⴰⵢⵏ ⴷ ⵜⵙⴱⴱⴰⴱⵜ ⵜⴰⵣⵔⴼⴰⵏⵜ.',
    members: '{n} ⵏ ⵉⴳⵎⴰⵎⵏ',
    coopTypeArgan: 'ⴰⵣⴰⵜⵉⵎ ⵏ ⵡⴰⵔⴳⴰⵏ',
    coopTypeSaffron: 'ⵣⴰⵄⴼⵔⴰⵏ AOP',
    coopTypeDates: 'ⵜⵉⵢⵏⵉ ⵏ ⵍⵎⵊⵀⵓⵍ',
    coopTypeAmlou: 'ⴰⵎⵍⵓ',
    coopTypeHoney: 'ⵜⴰⵎⵎⵏⵜ',
    coopTypeCosmetics: 'ⴰⴼⵓⵍⴽⵉ ⴰⴳⴰⵎⴰⵏ',

    // Mission
    missionTitle: 'Green IT & NumVert',
    missionIntro: 'ⴰⵙⵉⵜ ⵏⵏⵖ ⵉⵜⵜⵓⵙⴽⴰⵔ ⵖⴼ ⵉⵎⵏⵣⴰⵢⵏ ⵏ ⵜⴷⵎⵙⴰ ⵜⴰⵎⵓⵟⵟⵓⵏⵜ ⴷ ⵓⵡⵇⵇⵔ ⵏ ⵜⵓⴷⵔⵜ ⵜⵓⵙⵍⵉⴳⵜ.',
    ecoHeading: 'ⵜⴰⴷⵎⵙⴰ ⵜⴰⵎⵓⵟⵟⵓⵏⵜ',
    eco1: 'ⵜⵉⵡⵍⴰⴼⵉⵏ 100% ⵙ ⵓⵎⴰⵙⴰⵍ WebP',
    eco2: 'ⵡⴰⵍⵓ ⴰⴼⵉⴷⵢⵓ ⴰⵡⵓⵔⵎⴰⵏ',
    eco3: 'DOM ⴰⴼⵙⵙⴰⵙ ⴷ ⵜⵙⵓⵜⴰⵔ ⵜⵉⴷⵔⵓⵙⵉⵏ',
    privacyHeading: 'ⵜⵓⴷⵔⵜ ⵜⵓⵙⵍⵉⴳⵜ (Privacy by Design)',
    privacy1: 'ⵡⴰⵍⵓ ⴰⵙⵓⵜⵔ ⵏ ⵜⴽⴰⵔⴹⴰ ⵜⴰⵏⴰⵎⵓⵔⵜ (CIN)',
    privacy2: 'ⵡⴰⵍⵓ ⴰⴹⴼⵓⵕ GPS ⴳ ⵡⴰⵡⴰⴹ',
    privacy3: 'ⵜⵉⴳⵔⴰⵡⵉⵏ ⵏ ⵓⴼⴰⵔⴰ ⴳ ⵡⴰⵏⵙⴰ',
};

const tzm: Dict = { ...ar, ...tzmOverrides };

export const UNTRANSLATED_TZM = (Object.keys(ar) as TranslationKey[]).filter(
    (key) => !(key in tzmOverrides)
);

export const translations: Record<Language, Dict> = { fr, ar, tzm, en };