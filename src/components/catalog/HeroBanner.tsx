import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const HeroBanner: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];

    return (
        <section className="rounded-[1.5rem] bg-gradient-to-r from-[#D09635] to-[#996515] text-white p-8 md:p-10 shadow-sm">
            <div className="max-w-md space-y-3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                    {t.heroTitle}
                </h2>
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium">
                    {t.heroSub}
                </p>
            </div>
        </section>
    );
};