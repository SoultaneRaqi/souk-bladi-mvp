import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, Zap, Cloud } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

// --- CUSTOM HORIZONTAL OLIVE BRANCH ---
const CenterOliveBranch = () => (
    <svg viewBox="0 0 150 40" className="w-32 lg:w-48 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main horizontal curving stem */}
        <path d="M5 20 Q 40 35 75 20 T 145 20" stroke="#403328" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Top Leaves */}
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

        {/* Bottom Leaves */}
        <g>
            <path d="M45 22 Q 50 35 65 30 Q 60 15 45 22 Z" fill="#8FA374" />
            <path d="M45 22 Q 55 28 62 28" stroke="#5C7243" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
        <g>
            <path d="M95 18 Q 100 35 115 30 Q 110 15 95 18 Z" fill="#8FA374" />
            <path d="M95 18 Q 105 28 112 28" stroke="#5C7243" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>

        {/* Golden Olives */}
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
    const { language, setIsDrawerOpen, cartCount } = useApp();
    const t = translations[language];
    const [isEcoMode, setIsEcoMode] = useState(true);

    return (
        <header className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-[#EAE5D9]">

            {/* LEFT: Mobile Menu Toggle & Title */}
            <div className="flex items-center gap-3 w-auto">
                <button className="lg:hidden p-2 -ml-2 text-[#7A6B5D] hover:text-[#403328] transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-[18px] font-serif font-bold text-[#403328] leading-tight">
                        Notre Sélection
                    </h2>
                    <span className="text-[11px] font-bold text-[#CD9532] uppercase tracking-wider">
                        Saison d'Automne
                    </span>
                </div>
            </div>

            {/* CENTER: Decorative Olive Branch (Hidden on mobile to preserve layout) */}
            <div className="hidden md:flex flex-1 justify-center items-center px-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
                <CenterOliveBranch />
            </div>

            {/* RIGHT: Green IT Telemetry Dashboard */}
            <div className="flex items-center gap-3 w-auto">

                <div className="hidden lg:flex items-center bg-white rounded-full border border-[#EAE5D9] shadow-sm p-1">

                    {/* Metric 1: Page Weight */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border-r border-[#F6F5F2]">
                        <div className="p-1 bg-[#EAF2E8] rounded-full"><Zap className="w-3 h-3 text-[#528A46]" /></div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-extrabold text-[#A89F93] uppercase tracking-wider">Poids Page</span>
                            <span className="text-[11px] font-bold text-[#403328] leading-none">142 Ko</span>
                        </div>
                    </div>

                    {/* Metric 2: Carbon Footprint */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border-r border-[#F6F5F2]">
                        <div className="p-1 bg-[#F9F8F6] rounded-full"><Cloud className="w-3 h-3 text-[#7A6B5D]" /></div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-extrabold text-[#A89F93] uppercase tracking-wider">Émission</span>
                            <span className="text-[11px] font-bold text-[#403328] leading-none">0.02g CO₂</span>
                        </div>
                    </div>

                    {/* Metric 3: Interactive Eco Toggle */}
                    <button
                        onClick={() => setIsEcoMode(!isEcoMode)}
                        className="flex items-center gap-2 px-3 py-1.5 cursor-pointer group"
                    >
                        <div className="flex flex-col text-right">
                            <span className="text-[9px] font-extrabold text-[#A89F93] uppercase tracking-wider">Mode Éco</span>
                            <span className={`text-[11px] font-bold leading-none transition-colors ${isEcoMode ? 'text-[#528A46]' : 'text-[#A89F93]'}`}>
                                {isEcoMode ? 'Activé' : 'Désactivé'}
                            </span>
                        </div>
                        <div className={`w-8 h-5 rounded-full p-0.5 transition-colors ${isEcoMode ? 'bg-[#528A46]' : 'bg-[#EAE5D9]'}`}>
                            <motion.div
                                layout
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                                animate={{ x: isEcoMode ? 12 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Cart Button (Opens Right Sidebar on tablets/mobile) */}
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="relative p-3 rounded-full bg-white border border-[#EAE5D9] hover:border-[#CD9532] text-[#403328] transition-all cursor-pointer shadow-sm xl:hidden"
                    aria-label={t.cart}
                >
                    <ShoppingBag className="w-4 h-4" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A53A3B] text-white text-[9px] font-bold flex items-center justify-center shadow-sm ring-2 ring-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};