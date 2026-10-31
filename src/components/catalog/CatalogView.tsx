import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Weight, Check, ShoppingBag, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, type ProductItem, translations } from '../../data/translations';
import { HeroBanner } from './HeroBanner';

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

    // Refined earthy badges (Terracotta, Olive, Deep Brown)
    const getStatusBadge = (status?: string) => {
        if (status === 'new') return <span className="bg-[#403328] text-[#F9F8F6] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">Nouveau</span>;
        if (status === 'bio') return <span className="bg-[#6A7045] text-[#F9F8F6] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">Certifié Bio</span>;
        if (status === 'popular') return <span className="bg-[#9F5B3E] text-[#F9F8F6] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">Très demandé</span>;
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-8 pb-12"
        >
            <HeroBanner />

            {/* CATEGORY TABS */}
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

            {/* PRODUCT GRID */}
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
                                className="bg-white rounded-[20px] border border-[#EAE5D9] p-3 shadow-sm hover:shadow-lg hover:border-[#DCD5C6] transition-all group flex flex-col relative cursor-pointer"
                            >
                                <div className="absolute top-6 left-6 z-20">{getStatusBadge(product.status)}</div>

                                <div className="relative h-[200px] bg-[#F6F5F2] rounded-[14px] overflow-hidden">
                                    <img src={product.imageUrl} alt={product.name[language]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max z-10">
                                        <span className="px-3.5 py-1.5 rounded-full bg-white text-[#6B5A4E] text-[10px] font-bold shadow-md border border-[#EAE5D9]">{product.webpBadge}</span>
                                    </div>
                                </div>

                                <div className="pt-5 pb-2 px-2 flex flex-col flex-1">
                                    <div className="flex items-center justify-between text-[#8B7C70] text-[12px] font-semibold mb-2">
                                        <div className="flex items-center gap-1.5"><Weight className="w-3.5 h-3.5" /><span>{product.weight}</span></div>
                                        <span className="text-[#A89F93] text-[11px] truncate max-w-[100px]">{product.cooperative}</span>
                                    </div>
                                    <h3 className="font-bold text-[#403328] text-[15px] leading-tight mb-2 group-hover:text-[#CD9532] transition-colors line-clamp-2">
                                        {product.name[language]}
                                    </h3>

                                    {/* Refined Stock Indicator */}
                                    <div className="mb-4 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1 bg-[#F6F5F2] rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${product.stock < 5 ? 'bg-[#9F5B3E]' : 'bg-[#CD9532]'}`} style={{ width: `${Math.max(10, product.stock * 5)}%` }} />
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${product.stock < 5 ? 'text-[#9F5B3E]' : 'text-[#8B7C70]'}`}>
                                                {product.stock < 5 ? `Plus que ${product.stock}` : 'En stock'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-[#F6F5F2]">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#A89F93] font-bold uppercase">Prix direct</span>
                                            {/* Terracotta Price */}
                                            <span className="text-[16px] font-extrabold text-[#9F5B3E] leading-none mt-0.5">{product.price} <span className="text-[11px] text-[#8B7C70]">DHM</span></span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all shadow-sm cursor-pointer ${
                                                isAdded ? 'bg-[#6A7045] text-white shadow-[#6A7045]/20' : 'bg-[#403328] text-white hover:bg-[#5A4A3B]'
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

            {/* PRODUCT DETAILS MODAL */}
            <AnimatePresence>
                {selectedProduct && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-[#403328]/60 backdrop-blur-sm z-40" />
                        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 h-[250px] md:h-auto relative bg-[#F6F5F2]">
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name[language]} className="w-full h-full object-cover" />
                                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#403328] md:hidden shadow-sm"><X className="w-5 h-5" /></button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[#403328] rounded-full text-[11px] font-bold border border-white shadow-lg">{selectedProduct.webpBadge}</span>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    {getStatusBadge(selectedProduct.status)}
                                    <button onClick={() => setSelectedProduct(null)} className="hidden md:flex p-2 text-[#A89F93] hover:text-[#403328] hover:bg-[#F6F5F2] rounded-full transition-colors cursor-pointer ml-auto"><X className="w-5 h-5" /></button>
                                </div>

                                <h2 className="text-[26px] font-serif font-bold text-[#403328] leading-tight mb-2">{selectedProduct.name[language]}</h2>
                                <p className="text-[#8B7C70] text-[13px] font-medium mb-8">Produit directement par : <span className="text-[#CD9532] font-bold">{selectedProduct.cooperative}</span></p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-3.5 bg-[#F9F8F6] rounded-xl border border-[#EAE5D9]">
                                        <span className="text-[12px] font-bold text-[#7A6B5D]">Poids net</span>
                                        <span className="text-[13px] font-bold text-[#403328]">{selectedProduct.weight}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3.5 bg-[#F9F8F6] rounded-xl border border-[#EAE5D9]">
                                        <span className="text-[12px] font-bold text-[#7A6B5D]">Disponibilité rurale</span>
                                        <span className="text-[13px] font-bold text-[#6A7045]">{selectedProduct.stock} unités prêtes</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#EAE5D9]">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-[#A89F93] uppercase">Prix direct</span>
                                        <span className="text-[24px] font-extrabold text-[#9F5B3E] leading-none mt-1">{selectedProduct.price} <span className="text-[14px] text-[#8B7C70]">DHM</span></span>
                                    </div>
                                    <button
                                        onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                        className="px-6 py-3.5 bg-[#403328] text-white rounded-xl text-[13px] font-bold shadow-xl shadow-[#403328]/10 hover:bg-[#5A4A3B] transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};