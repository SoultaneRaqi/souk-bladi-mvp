import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Weight, Check, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA } from '../../data/translations';
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
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = activeCategory === 'all'
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter(p => p.category === activeCategory);

    return (
        <div className="space-y-8 pb-12">

            {/* Separated Component for clean architecture */}
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
                                className="bg-white rounded-[20px] border border-[#EAE5D9] p-3 shadow-sm hover:shadow-lg hover:border-[#DCD5C6] transition-all group flex flex-col"
                            >
                                <div className="relative h-[200px] bg-[#F6F5F2] rounded-[14px] overflow-hidden">
                                    <img src={product.imageUrl} alt={product.name[language]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#6B5A4E] text-[10px] font-bold shadow-md border border-[#EAE5D9]">
                      {product.webpBadge}
                    </span>
                                    </div>
                                </div>

                                <div className="pt-5 pb-2 px-2 flex flex-col flex-1">
                                    <div className="flex items-center justify-between text-[#8B7C70] text-[12px] font-semibold mb-2">
                                        <div className="flex items-center gap-1.5"><Weight className="w-3.5 h-3.5" /><span>{product.weight}</span></div>
                                        <span className="text-[#A89F93]">{language === 'ar' ? 'الدارجة' : language === 'tzm' ? 'ⵜⴰⵎⴰⵣⵉⵖⵜ' : 'FR'}</span>
                                    </div>
                                    <h3 className="font-bold text-[#403328] text-[15px] leading-tight mb-4 group-hover:text-[#CD8F2D] transition-colors">{product.name[language]}</h3>

                                    <div className="flex items-center justify-between pt-3 border-t border-[#F6F5F2] mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#A89F93] font-bold uppercase">Prix</span>
                                            <span className="text-[16px] font-extrabold text-[#A53A3B] leading-none mt-0.5">{product.price} <span className="text-[11px] text-[#8B7C70]">DHM</span></span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-sm cursor-pointer ${
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
        </div>
    );
};