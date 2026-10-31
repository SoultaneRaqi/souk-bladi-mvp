import React from 'react';
import { motion } from 'framer-motion';
import { Weight, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, translations } from '../../data/translations';

export const ProductGrid: React.FC = () => {
    const { language, addToCart } = useApp();
    const t = translations[language];

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS_DATA.map((product) => (
                <motion.article
                    key={product.id}
                    whileHover={{ y: -6 }}
                    onClick={() => addToCart(product)}
                    className="bg-white rounded-[24px] border border-[#EAE5D9] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
                >
                    {/* Image & Centered Floating Badge */}
                    <div className="relative h-[200px] bg-[#F6F5F2] p-2.5">
                        <div className="w-full h-full rounded-[18px] overflow-hidden">
                            <img
                                src={product.imageUrl}
                                alt={product.name[language]}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* The Pill Badge exactly as shown in the design */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-max z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-[#F6F5F2] text-[#7A6B5D] text-[11px] font-bold shadow-sm border border-[#EAE5D9]">
                {product.webpBadge}
              </span>
                        </div>
                    </div>

                    {/* Details Row */}
                    <div className="pt-7 pb-5 px-5 flex flex-col flex-1 justify-between gap-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[#8B7C70] text-[12px] font-semibold">
                                <Weight className="w-3.5 h-3.5" />
                                <span>{product.weight}</span>
                                {/* Language indicator logic from the mockup */}
                                {(language === 'ar' || language === 'tzm') && (
                                    <span className="ml-auto text-[#A89F93]">
                    {language === 'ar' ? 'الدارجة' : 'ⵜⴰⵎⴰⵣⵉⵖⵜ'}
                  </span>
                                )}
                            </div>

                            <h3 className="font-bold text-[#403328] text-[15px] leading-tight">
                                {product.name[language]}
                            </h3>
                        </div>

                        {/* Pricing Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#F6F5F2]">
                            <div className="flex items-center gap-1.5 text-[12px] text-[#8B7C70] font-medium">
                                <Tag className="w-3.5 h-3.5" />
                                <span>Prix</span>
                            </div>
                            <span className="text-[15px] font-extrabold text-[#B84B4B]">
                {product.price} DHM
              </span>
                        </div>
                    </div>
                </motion.article>
            ))}
        </section>
    );
};