import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Weight, Check, ShoppingBag, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, translations, type ProductItem, type TranslationKey } from '../../data/translations';
import { fmt, formatPrice } from '../../utils/format';
import { HeroBanner } from './HeroBanner';

const CATEGORIES: { id: ProductItem['category']; key: TranslationKey }[] = [
    { id: 'all', key: 'catAll' },
    { id: 'oils', key: 'catOils' },
    { id: 'spices', key: 'catSpices' },
    { id: 'sweets', key: 'catSweets' },
    { id: 'cosmetics', key: 'catCosmetics' },
];

export const CatalogView: React.FC = () => {
    const { language, addToCart, cart } = useApp();
    const t = translations[language];
    const [activeCategory, setActiveCategory] = useState<ProductItem['category']>('all');
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

    const filteredProducts = activeCategory === 'all'
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter(p => p.category === activeCategory);

    const getStatusBadge = (status?: ProductItem['status']) => {
        if (status === 'new') return <span className="bg-ink text-paper px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">{t.statusNew}</span>;
        if (status === 'bio') return <span className="bg-olive text-paper px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">{t.statusBio}</span>;
        if (status === 'popular') return <span className="bg-terracotta text-paper px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">{t.statusPopular}</span>;
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
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                                isActive ? 'text-white' : 'text-bark bg-white border border-line hover:border-line-strong'
                            }`}
                        >
                            {isActive && (
                                <motion.div layoutId="activeCat" className="absolute inset-0 bg-ink rounded-xl shadow-md" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                            )}
                            <span className="relative z-10">{t[cat.key]}</span>
                        </button>
                    );
                })}
            </nav>

            {/* PRODUCT GRID */}
            <motion.section layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => {
                        const name = product.name[language];
                        const inCart = cart.find(item => item.product.id === product.id);
                        const isAdded = !!inCart;
                        const atMax = !!inCart && inCart.quantity >= product.stock;
                        return (
                            <motion.article
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="bg-white rounded-[20px] border border-line p-3 shadow-sm hover:shadow-lg hover:border-line-strong transition-all group flex flex-col relative cursor-pointer"
                            >
                                <div className="absolute top-6 start-6 z-20">{getStatusBadge(product.status)}</div>

                                <div className="relative h-[200px] bg-sand rounded-[14px] overflow-hidden">
                                    <img src={product.imageUrl} alt={name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max z-10">
                                        <span className="px-3.5 py-1.5 rounded-full bg-white text-bark text-[10px] font-bold shadow-md border border-line">
                                            {fmt(t.webpBadge, { n: product.imageKb })}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-5 pb-2 px-2 flex flex-col flex-1">
                                    <div className="flex items-center justify-between gap-2 text-muted text-[12px] font-semibold mb-2">
                                        <div className="flex items-center gap-1.5 shrink-0"><Weight className="w-3.5 h-3.5" /><span dir="ltr">{product.weight}</span></div>
                                        <span className="text-muted text-[11px] truncate max-w-[110px]" dir="ltr">{product.cooperative}</span>
                                    </div>
                                    <h3 className="font-bold text-ink text-[15px] leading-tight mb-2 group-hover:text-saffron-deep transition-colors line-clamp-2">
                                        {name}
                                    </h3>

                                    {/* Stock indicator */}
                                    <div className="mb-4 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1 bg-sand rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${product.stock < 5 ? 'bg-terracotta' : 'bg-saffron'}`}
                                                    style={{ width: `${Math.min(100, Math.max(10, product.stock * 5))}%` }}
                                                />
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${product.stock < 5 ? 'text-terracotta' : 'text-muted'}`}>
                                                {product.stock < 5 ? fmt(t.lastUnits, { n: product.stock }) : t.inStock}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-sand">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-muted font-bold uppercase">{t.priceDirect}</span>
                                            <span className="text-[16px] font-extrabold text-terracotta leading-none mt-0.5">{formatPrice(product.price, language)}</span>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={atMax}
                                            aria-label={atMax ? fmt(t.maxInCart, { name }) : fmt(t.addProductAria, { name })}
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                                                isAdded ? 'bg-olive text-white shadow-olive/20' : 'bg-ink text-white hover:bg-ink-soft'
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-40" />
                        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 h-[250px] md:h-auto relative bg-sand">
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name[language]} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => setSelectedProduct(null)} aria-label={t.close} className="absolute top-4 start-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-ink md:hidden shadow-sm"><X className="w-5 h-5" /></button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-ink rounded-full text-[11px] font-bold border border-white shadow-lg">
                                        {fmt(t.webpBadge, { n: selectedProduct.imageKb })}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    {getStatusBadge(selectedProduct.status)}
                                    <button type="button" onClick={() => setSelectedProduct(null)} aria-label={t.close} className="hidden md:flex p-2 text-muted hover:text-ink hover:bg-sand rounded-full transition-colors cursor-pointer ms-auto"><X className="w-5 h-5" /></button>
                                </div>

                                <h2 className="text-[26px] font-serif font-bold text-ink leading-tight mb-2">{selectedProduct.name[language]}</h2>
                                <p className="text-muted text-[13px] font-medium mb-8">
                                    {t.producedBy} <span className="text-saffron-deep font-bold" dir="ltr">{selectedProduct.cooperative}</span>
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-3.5 bg-paper rounded-xl border border-line">
                                        <span className="text-[12px] font-bold text-bark">{t.netWeight}</span>
                                        <span className="text-[13px] font-bold text-ink" dir="ltr">{selectedProduct.weight}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3.5 bg-paper rounded-xl border border-line">
                                        <span className="text-[12px] font-bold text-bark">{t.ruralAvailability}</span>
                                        <span className="text-[13px] font-bold text-olive">{fmt(t.unitsReady, { n: selectedProduct.stock })}</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-line">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted uppercase">{t.priceDirect}</span>
                                        <span className="text-[24px] font-extrabold text-terracotta leading-none mt-1">{formatPrice(selectedProduct.price, language)}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                        className="px-6 py-3.5 bg-ink text-white rounded-xl text-[13px] font-bold shadow-xl shadow-ink/10 hover:bg-ink-soft transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> {t.addToCartLong}
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