import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Weight, Check, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, getCoop, translations, type ProductItem, type TranslationKey } from '../../data/translations';
import { fmt, formatPrice, formatWeight } from '../../utils/format';
import { HeroBanner } from './HeroBanner';
import { ProductModal } from './ProductModal';
import { StatusBadge } from '../common/StatusBadge';

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
        : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-8 pb-12"
        >
            <HeroBanner />

            {/* CATEGORY FILTERS */}
            <nav aria-label={t.categoriesNav} className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative min-h-11 px-5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                                isActive ? 'text-white' : 'text-bark bg-white border border-line hover:border-line-strong'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeCat"
                                    className="absolute inset-0 bg-ink rounded-xl shadow-md"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{t[cat.key]}</span>
                        </button>
                    );
                })}
            </nav>

            {/* PRODUCT GRID */}
            <motion.ul layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => {
                        const name = product.name[language];
                        const coop = getCoop(product.coopId);
                        const inCart = cart.find((item) => item.product.id === product.id);
                        const isAdded = !!inCart;
                        const atMax = !!inCart && inCart.quantity >= product.stock;
                        const lowStock = product.stock < 5;

                        return (
                            <motion.li
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={product.id}
                                className="bg-white rounded-[20px] border border-line p-3 shadow-sm hover:shadow-lg hover:border-line-strong transition-all group flex flex-col relative has-[.card-open:focus-visible]:ring-2 has-[.card-open:focus-visible]:ring-saffron-deep"
                            >
                                <div className="absolute top-6 start-6 z-20 pointer-events-none">
                                    <StatusBadge status={product.status} />
                                </div>

                                <div className="relative h-[200px] bg-sand rounded-[14px] overflow-hidden">
                                    <img
                                        src={product.imageUrl} alt="" loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <span className="absolute bottom-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-max px-3.5 py-1.5 rounded-full bg-white text-bark text-xs font-bold shadow-md border border-line">
                                        {fmt(t.webpBadge, { n: product.imageKb })}
                                    </span>
                                </div>

                                <div className="pt-5 pb-2 px-2 flex flex-col flex-1">
                                    <div className="flex items-center justify-between gap-2 text-muted text-xs font-semibold mb-2">
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <Weight className="w-3.5 h-3.5" aria-hidden="true" />
                                            <span>{formatWeight(product.weight, language)}</span>
                                        </div>
                                        <span className="truncate max-w-[130px]">{coop.name[language]}</span>
                                    </div>

                                    <h3 className="mb-2 leading-tight">
                                        <button
                                            type="button"
                                            aria-haspopup="dialog"
                                            onClick={() => setSelectedProduct(product)}
                                            className="card-open text-start font-bold text-ink text-base group-hover:text-saffron-deep transition-colors line-clamp-2 cursor-pointer focus-visible:outline-none after:absolute after:inset-0 after:rounded-[20px]"
                                        >
                                            {name}
                                        </button>
                                    </h3>

                                    {/* Stock indicator (the text carries the meaning, the bar is decoration) */}
                                    <div className="mb-4 mt-auto flex items-center gap-2">
                                        <div aria-hidden="true" className="flex-1 h-1 bg-sand rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${lowStock ? 'bg-terracotta' : 'bg-saffron'}`}
                                                style={{ width: `${Math.min(100, Math.max(10, product.stock * 5))}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-bold ${lowStock ? 'text-terracotta' : 'text-muted'}`}>
                                            {lowStock ? fmt(t.lastUnits, { n: product.stock }) : t.inStock}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-sand">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted font-bold">{t.priceDirect}</span>
                                            <span className="text-lg font-extrabold text-terracotta leading-none mt-0.5">
                                                {formatPrice(product.price, language)}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={atMax}
                                            aria-label={atMax ? fmt(t.maxInCart, { name }) : fmt(t.addProductAria, { name })}
                                            onClick={() => addToCart(product)}
                                            className={`relative z-10 w-11 h-11 flex items-center justify-center rounded-xl transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                                                isAdded ? 'bg-olive text-white shadow-olive/20' : 'bg-ink text-white hover:bg-ink-soft'
                                            }`}
                                        >
                                            {isAdded ? <Check className="w-5 h-5" aria-hidden="true" /> : <ShoppingBag className="w-5 h-5" aria-hidden="true" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </motion.ul>

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        key={selectedProduct.id}
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};