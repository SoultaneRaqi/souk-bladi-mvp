import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, type ProductItem, translations } from '../../data/translations';

export const ProductGrid: React.FC = () => {
    const { language, addToCart } = useApp();
    const t = translations[language];
    const [addedId, setAddedId] = useState<string | null>(null);

    const handleAdd = (product: ProductItem) => {
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 800);
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS_DATA.map((product) => {
                const isAdded = addedId === product.id;
                return (
                    <motion.article
                        key={product.id}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs flex flex-col justify-between"
                    >
                        <div>
                            <div className="relative h-44 bg-stone-100">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name[language]}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 text-stone-800 text-[11px] font-semibold shadow-xs">
                  {product.webpBadge}
                </span>
                            </div>

                            <div className="p-4 space-y-1.5">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold ${product.accentClass}`}>
                  {product.weight}
                </span>
                                <h3 className="font-bold text-stone-900 text-base">
                                    {product.name[language]}
                                </h3>
                                <p className="text-xs text-stone-500">{product.cooperative}</p>
                            </div>
                        </div>

                        <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-stone-100">
              <span className="text-base font-bold text-amber-800">
                {product.price} DHM
              </span>
                            <button
                                type="button"
                                onClick={() => handleAdd(product)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                                    isAdded
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-stone-900 text-amber-400 hover:bg-stone-800'
                                }`}
                            >
                                {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                <span>{isAdded ? t.added : t.addToCart}</span>
                            </button>
                        </div>
                    </motion.article>
                );
            })}
        </section>
    );
};