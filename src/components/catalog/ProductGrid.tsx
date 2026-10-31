import React from 'react';
import { motion } from 'framer-motion';
import { Weight, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, type ProductItem, translations } from '../../data/translations';

export const ProductGrid: React.FC = () => {
    const { language, addToCart } = useApp();
    const t = translations[language];

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRODUCTS_DATA.map((product) => (
                <motion.article
                    key={product.id}
                    whileHover={{ y: -4 }}
                    onClick={() => addToCart(product)}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md"
                >
                    {/* Image & Centered Badge */}
                    <div className="relative h-44 bg-stone-100 p-2">
                        <img
                            src={product.imageUrl}
                            alt={product.name[language]}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max">
              <span className="px-3 py-1 rounded-full bg-white/95 text-[#6B5A4E] text-[10px] font-bold shadow-sm whitespace-nowrap">
                {product.webpBadge}
              </span>
                        </div>
                    </div>

                    {/* Details Row */}
                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-1 text-[#8B7C70] text-xs font-semibold">
                            <Weight className="w-3.5 h-3.5" />
                            <span>{product.weight}</span>
                            {language === 'ar' || language === 'tzm' ? (
                                <span className="ml-auto">{language === 'ar' ? 'الدارجة' : 'ⵜⴰⵎⴰⵣⵉⵖⵜ'}</span>
                            ) : null}
                        </div>

                        <h3 className="font-bold text-stone-900 text-sm">
                            {product.name[language]}
                        </h3>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1.5 text-xs text-stone-500">
                                <Tag className="w-3.5 h-3.5" />
                                <span>Prix</span>
                            </div>
                            <span className="text-sm font-bold text-[#A53A3B]">
                {product.price} DHM
              </span>
                        </div>
                    </div>
                </motion.article>
            ))}
        </section>
    );
};