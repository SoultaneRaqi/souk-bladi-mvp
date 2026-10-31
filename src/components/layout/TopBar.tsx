import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, Zap, Cloud } from 'lucide-react';
import { useApp, type ActiveTab } from '../../context/AppContext';
import { LANGUAGE_META, translations } from '../../data/translations';

// --- CUSTOM HORIZONTAL OLIVE BRANCH ---
const CenterOliveBranch = () => (
    <svg viewBox="0 0 150 40" className="w-32 lg:w-48 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5 20 Q 40 35 75 20 T 145 20" stroke="#403328" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        <g>
            <path d="M25 24 Q 30 5 45 10 Q 40 25 25 24 Z" fill="#5C7243" />
            <path d="M25 24 Q 35 15 42 12" stroke="#8FA374" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
        <g>
            <path d="M75 20 Q 80 5 95 10 Q 90 25 75 20 Z" fill="#5C7243" />
            <path d="M75 20 Q 85 15 92 12" stroke="#8FA374" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
        <g>
            <path d="M115 18 Q 125 5 140 10 Q 130 25 115 18 Z" fill="#5C7243" />
            <path d="M115 18 Q 125 15 137 12" stroke="#8FA374" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>

        <g>
            <path d="M45 22 Q 50 35 65 30 Q 60 15 45 22 Z" fill="#8FA374" />
            <path d="M45 22 Q 55 28 62 28" stroke="#5C7243" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
        <g>
            <path d="M95 18 Q 100 35 115 30 Q 110 15 95 18 Z" fill="#8FA374" />
            <path d="M95 18 Q 105 28 112 28" stroke="#5C7243" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>

        <g transform="translate(40, 10) rotate(20)">
            <ellipse cx="0" cy="0" rx="4" ry="6" fill="#B98838" />
            <path d="M -2 -3 Q 0 0 -2 3" stroke="#E4C381" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
        <g transform="translate(85, 28) rotate(-20)">
            <ellipse cx="0" cy="0" rx="3.5" ry="5.5" fill="#B98838" />
            <path d="M -1.5 -2.5 Q 0 0 -1.5 2.5" stroke="#E4C381" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
        <g transform="translate(130, 8) rotate(40)">
            <ellipse cx="0" cy="0" rx="4" ry="6" fill="#B98838" />
            <path d="M -2 -3 Q 0 0 -2 3" stroke="#E4C381" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
    </svg>
);

export const TopBar: React.FC = () => {
    const { language, setIsDrawerOpen, setIsNavOpen, cartCount, activeTab } = useApp();
    const t = translations[language];
    const isRtl = LANGUAGE_META[language].dir === 'rtl';
    const [isEcoMode, setIsEcoMode] = useState(true);

    const title: Record<ActiveTab, string> = {
        shop: t.selectionTitle,
        cooperatives: t.cooperatives,
        mission: t.mission,
    };

    // The toggle thumb must travel the other way in RTL
    const thumbX = isEcoMode ? (isRtl ? -12 : 12) : 0;

    return (
        <header className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-line">

            {/* LEFT: mobile menu toggle & title */}
            <div className="flex items-center gap-3 w-auto">
                <button
                    type="button"
                    onClick={() => setIsNavOpen(true)}
                    aria-label={t.menu}
                    className="lg:hidden p-2 -ms-2 text-bark hover:text-ink transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-[18px] font-serif font-bold text-ink leading-tight">
                        {title[activeTab]}
                    </h2>
                    {activeTab === 'shop' && (
                        <span className="text-[11px] font-bold text-saffron-deep uppercase tracking-wider">
                            {t.season}
                        </span>
                    )}
                </div>
            </div>

            {/* CENTER: decorative branch (hidden on mobile) */}
            <div className="hidden md:flex flex-1 justify-center items-center px-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
                <CenterOliveBranch />
            </div>

            {/* RIGHT: Green IT telemetry + cart button */}
            <div className="flex items-center gap-3 w-auto">

                <div className="hidden lg:flex items-center bg-white rounded-full border border-line shadow-sm p-1">

                    <div className="flex items-center gap-2 px-3 py-1.5 border-e border-sand">
                        <div className="p-1 bg-leaf-soft rounded-full"><Zap className="w-3 h-3 text-leaf" /></div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-extrabold text-muted uppercase tracking-wider">{t.ecoPageWeight}</span>
                            {/* TODO Phase 6: compute from performance.getEntriesByType('resource') */}
                            <span className="text-[11px] font-bold text-ink leading-none" dir="ltr">142 KB</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 border-e border-sand">
                        <div className="p-1 bg-paper rounded-full"><Cloud className="w-3 h-3 text-bark" /></div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-extrabold text-muted uppercase tracking-wider">{t.ecoEmission}</span>
                            <span className="text-[11px] font-bold text-ink leading-none" dir="ltr">0.02 g CO₂</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsEcoMode(!isEcoMode)}
                        aria-pressed={isEcoMode}
                        className="flex items-center gap-2 px-3 py-1.5 cursor-pointer group"
                    >
                        <div className="flex flex-col text-end">
                            <span className="text-[9px] font-extrabold text-muted uppercase tracking-wider">{t.ecoMode}</span>
                            <span className={`text-[11px] font-bold leading-none transition-colors ${isEcoMode ? 'text-leaf' : 'text-muted'}`}>
                                {isEcoMode ? t.on : t.off}
                            </span>
                        </div>
                        <div className={`w-8 h-5 rounded-full p-0.5 transition-colors ${isEcoMode ? 'bg-leaf' : 'bg-line'}`}>
                            <motion.div
                                layout
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                                animate={{ x: thumbX }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </div>
                    </button>
                </div>

                {/* Cart button (opens the checkout drawer below xl) */}
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="relative p-3 rounded-full bg-white border border-line hover:border-saffron text-ink transition-all cursor-pointer shadow-sm xl:hidden"
                    aria-label={t.cart}
                >
                    <ShoppingBag className="w-4 h-4" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-berry text-white text-[9px] font-bold flex items-center justify-center shadow-sm ring-2 ring-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};