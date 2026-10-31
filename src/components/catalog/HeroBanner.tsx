import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const HeroBanner: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];

    return (
        <section className="rounded-3xl bg-gradient-to-br from-amber-700 via-amber-600 to-stone-800 text-stone-50 p-8 md:p-10 shadow-sm">
            <div className="max-w-xl space-y-2.5">
                <h2 className="text-2xl md:text-3xl font-serif font-bold leading-snug">
                    {t.heroTitle}
                </h2>
                <p className="text-sm text-amber-100/90 leading-relaxed">
                    {t.heroSub}
                </p>
            </div>
        </section>
    );
};