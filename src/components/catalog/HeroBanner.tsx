import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const HeroBanner: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];

    return (
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#CD9532] via-[#B37E22] to-[#8F5D13] text-white p-10 md:p-12 shadow-sm">
            {/* Subtle background texture overlay to make it look premium */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 max-w-lg space-y-4">
                <h2 className="text-[38px] md:text-[42px] font-serif font-bold leading-[1.1] tracking-tight text-[#FFFDF9]">
                    {t.heroTitle}
                </h2>
                <p className="text-[15px] text-white/90 leading-relaxed font-medium max-w-md">
                    {t.heroSub}
                </p>
            </div>
        </section>
    );
};