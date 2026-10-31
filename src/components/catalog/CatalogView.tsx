import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Weight, Check, X, ShoppingBag, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, type ProductItem, translations } from '../../data/translations';

const CATEGORIES = [
    { id: 'all', label: 'Tout le terroir' },
    { id: 'oils', label: 'Huiles & Extractions' },
    { id: 'spices', label: 'Épices & Safran' },
    { id: 'sweets', label: 'Miel & Dattes' },
    { id: 'cosmetics', label: 'Beauté Bio' },
];

export const CatalogView: React.FC = () => {
    const { language, addToCart, cart } = useApp();
    const t = translations[language];
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

    const filteredProducts = activeCategory === 'all'
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter(p => p.category === activeCategory);

    return (
        <div className="space-y-7 pb-12">

            {/* 1. THE BENTO HERO BANNER (Matches mockup colors + adds density) */}
            <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#D09635] to-[#996515] shadow-sm flex flex-col md:flex-row items-stretch">

                {/* Subtle Moroccan Pattern SVG Overlay */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15L15 15 30 0zm0 30l15 15-15 15-15-15 15-15z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

                {/* Main Hero Content */}
                <div className="relative z-10 p-10 md:p-12 flex-1 flex flex-col justify-center">
                    <h2 className="text-[36px] md:text-[42px] font-serif font-bold leading-[1.1] tracking-tight text-white mb-4">
                        {t.heroTitle}
                    </h2>
                    <p className="text-[15px] text-white/90 leading-relaxed font-medium max-w-md">
                        {t.heroSub}
                    </p>
                </div>

                {/* Right Side "Trust Features" (Fills empty space beautifully) */}
                <div className="relative z-10 hidden md:flex flex-col justify-center gap-4 bg-black/10 backdrop-blur-sm px-10 py-8 border-l border-white/10">
                    <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/20 rounded-xl"><Leaf className="w-4 h-4" /></div>
                        <span className="text-[12px] font-bold tracking-wide">100% BIO & NATUREL</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/20 rounded-xl"><ShieldCheck className="w-4 h-4" /></div>
                        <span className="text-[12px] font-bold tracking-wide">CIRCUIT COURT</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/20 rounded-xl"><Truck className="w-4 h-4" /></div>
                        <span className="text-[12px] font-bold tracking-wide">LIVRAISON RURALE</span>
                    </div>
                </div>
            </section>

            {/* 2. MODERN CATEGORY TABS */}
            <div className="sticky top-0 z-20 -mx-2 px-2 py-2 bg-[#F9F8F6]/90 backdrop-blur-md">
                <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {CATEGORIES.map(cat => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`relative px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                                    isActive ? 'text-white' : 'text-[#7A6B5D] bg-white border border-[#EAE5D9] hover:border-[#DCD5C6]'
                                }`}
                            >
                                {isActive && (
                                    <motion.div layoutId="activeCat" className="absolute inset-0 bg-[#403328] rounded-xl shadow-md" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* 3. THE PRODUCT GRID (Exact mockup match) */}
            <motion.section layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => {
                        const isAdded = cart.some(item => item.product.id === product.id);
                        return (
                            <motion.article
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="bg-white rounded-[20px] border border-[#EAE5D9] p-3 shadow-sm hover:shadow-lg hover:border-[#DCD5C6] transition-all cursor-pointer group flex flex-col"
                            >
                                {/* Image & Centered Badge */}
                                <div className="relative h-[200px] bg-[#F6F5F2] rounded-[14px] overflow-hidden">
                                    <img src={product.imageUrl} alt={product.name[language]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-[#403328]/0 group-hover:bg-[#403328]/10 transition-colors duration-300" />

                                    {/* The pill badge exactly overlapping the bottom edge */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#6B5A4E] text-[10px] font-bold shadow-md border border-[#EAE5D9]">
                      {product.webpBadge}
                    </span>
                                    </div>
                                </div>

                                {/* Card Data */}
                                <div className="pt-5 pb-2 px-2 flex flex-col flex-1">
                                    <div className="flex items-center justify-between text-[#8B7C70] text-[12px] font-semibold mb-2">
                                        <div className="flex items-center gap-1.5"><Weight className="w-3.5 h-3.5" /><span>{product.weight}</span></div>
                                        <span className="text-[#A89F93]">{language === 'ar' ? 'الدارجة' : language === 'tzm' ? 'ⵜⴰⵎⴰⵣⵉⵖⵜ' : 'FR'}</span>
                                    </div>
                                    <h3 className="font-bold text-[#403328] text-[15px] leading-tight mb-4 group-hover:text-[#D09635] transition-colors">{product.name[language]}</h3>

                                    <div className="flex items-center justify-between pt-3 border-t border-[#F6F5F2] mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#A89F93] font-bold uppercase">Prix</span>
                                            <span className="text-[16px] font-extrabold text-[#A53A3B] leading-none mt-0.5">{product.price} <span className="text-[11px] text-[#8B7C70]">DHM</span></span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-sm ${
                                                isAdded ? 'bg-[#528A46] text-white' : 'bg-[#F6F5F2] text-[#403328] hover:bg-[#EAE5D9]'
                                            }`}
                                        >
                                            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </motion.section>

            {/* 4. PRODUCT DETAILS MODAL (Modern Native App feel) */}
            <AnimatePresence>
                {selectedProduct && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-[#403328]/40 backdrop-blur-sm z-50" />
                        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row">

                            <div className="w-full md:w-1/2 h-[250px] md:h-auto relative bg-[#F6F5F2]">
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name[language]} className="w-full h-full object-cover" />
                                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#403328] md:hidden"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-[#F6F5F2] text-[#8B7C70] rounded-full text-[11px] font-bold border border-[#EAE5D9]">{selectedProduct.webpBadge}</span>
                                    <button onClick={() => setSelectedProduct(null)} className="hidden md:block p-1.5 text-[#A89F93] hover:text-[#403328] hover:bg-[#F6F5F2] rounded-full transition-colors"><X className="w-5 h-5" /></button>
                                </div>

                                <h2 className="text-[24px] font-serif font-bold text-[#403328] leading-tight mb-2">{selectedProduct.name[language]}</h2>
                                <p className="text-[#8B7C70] text-[13px] font-medium mb-6">Produit par : <span className="text-[#403328] font-bold">{selectedProduct.cooperative}</span></p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-3 bg-[#F9F8F6] rounded-xl border border-[#EAE5D9]">
                                        <span className="text-[12px] font-bold text-[#7A6B5D]">Poids net</span>
                                        <span className="text-[13px] font-bold text-[#403328]">{selectedProduct.weight}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-[#F9F8F6] rounded-xl border border-[#EAE5D9]">
                                        <span className="text-[12px] font-bold text-[#7A6B5D]">Disponibilité</span>
                                        <span className="text-[13px] font-bold text-[#528A46]">En stock (Immédiate)</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#EAE5D9]">
                                    <span className="text-[24px] font-extrabold text-[#A53A3B]">{selectedProduct.price} <span className="text-[14px] text-[#8B7C70]">DHM</span></span>
                                    <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="px-6 py-3 bg-[#403328] text-white rounded-xl text-[13px] font-bold shadow-lg hover:bg-[#5A4A3B] transition-colors">
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};