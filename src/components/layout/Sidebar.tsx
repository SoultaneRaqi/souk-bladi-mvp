import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Users, ShoppingCart, Info, Globe, ChevronDown, Check, UserCircle, Settings, Leaf, Zap } from 'lucide-react';
import { useApp, type ActiveTab } from '../../context/AppContext';
import { type Language, LANGUAGE_META, translations } from '../../data/translations';
import { BrandLogo } from '../common/BrandLogo';

export const Sidebar: React.FC = () => {
    const { language, setLanguage, activeTab, setActiveTab } = useApp();
    const t = translations[language];

    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const languages: Language[] = ['fr', 'ar', 'tzm', 'en'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems: { id: ActiveTab | 'cart'; label: string; icon: React.ElementType }[] = [
        { id: 'shop', label: t.shop, icon: Store },
        { id: 'cooperatives', label: t.cooperatives, icon: Users },
        { id: 'cart', label: t.cart, icon: ShoppingCart },
        { id: 'mission', label: t.mission, icon: Info },
    ];

    return (
        <aside className="w-[260px] bg-[#EAE5D9] h-full flex flex-col justify-between pt-8 pb-6 px-5 shrink-0 border-r border-[#DCD5C6]/60 shadow-[1px_0_10px_rgba(64,51,40,0.02)] select-none z-20 relative">

            <div className="space-y-9">

                {/* Modern Language Dropdown */}
                <div className="relative" ref={langMenuRef}>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        className="flex items-center justify-between w-full px-3.5 py-2.5 bg-[#DCD5C6]/40 hover:bg-[#DCD5C6]/70 rounded-2xl transition-all cursor-pointer ring-1 ring-[#DCD5C6]/50 shadow-sm"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-[#403328] text-white flex items-center justify-center shadow-inner">
                                <Globe className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[13px] font-bold text-[#403328]">
                {LANGUAGE_META[language].label}
              </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#7A6A4E] transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isLangMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="absolute top-full left-0 mt-2 w-full bg-[#F9F8F6] rounded-2xl shadow-xl shadow-[#403328]/10 ring-1 ring-[#DCD5C6] overflow-hidden z-50 py-1.5"
                            >
                                {languages.map((lang) => {
                                    const isActive = language === lang;
                                    return (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                                                isActive
                                                    ? 'text-[#A53A3B] bg-[#EAE5D9]/50'
                                                    : 'text-[#7A6B5D] hover:bg-[#EAE5D9]/30 hover:text-[#403328]'
                                            }`}
                                        >
                                            <span>{LANGUAGE_META[lang].label}</span>
                                            {isActive && <Check className="w-4 h-4 text-[#A53A3B]" />}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Brand Logo */}
                <div className="px-1">
                    <BrandLogo />
                </div>

                {/* Navigation */}
                <nav className="space-y-1.5 px-1 pt-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                key={item.id}
                                type="button"
                                onClick={() => item.id !== 'cart' && setActiveTab(item.id)}
                                className="w-full relative group cursor-pointer block text-left"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavLine"
                                        className="absolute left-0 top-[15%] h-[70%] w-1 bg-[#403328] rounded-r-full"
                                        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                                    />
                                )}
                                <div className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#DCD5C6]/60 text-[#403328] translate-x-1 shadow-sm ring-1 ring-[#DCD5C6]/30'
                                        : 'text-[#7A6B5D] hover:bg-[#DCD5C6]/30 hover:text-[#403328] group-hover:translate-x-1'
                                }`}>
                                    <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-[#403328]' : 'text-[#9C8F80] group-hover:text-[#403328]'}`} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.label}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>

            {/* BOTTOM SECTION */}
            <div className="space-y-3 px-1">

                {/* Interactive Guest Profile */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#DCD5C6]/50 transition-colors cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DCD5C6] to-[#CFC7B6] flex items-center justify-center text-[#7A6B5D] shadow-inner ring-1 ring-white/20">
                            <UserCircle className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[13px] font-bold text-[#403328]">Invité</span>
                            <span className="text-[10px] font-semibold text-[#8B7C70] group-hover:text-[#7A6B5D]">Créer un compte</span>
                        </div>
                    </div>
                    <Settings className="w-4 h-4 text-[#A89F93] group-hover:text-[#403328] transition-colors" />
                </motion.button>

                {/* Green IT Audit Metrics (with Hover Tooltip) & Offline Badge */}
                <div className="bg-gradient-to-b from-[#DCD5C6]/40 to-[#DCD5C6]/20 rounded-2xl p-1.5 ring-1 ring-[#DCD5C6]/60 shadow-sm relative group">

                    {/* Eco Score Block */}
                    <div className="flex items-center justify-between px-2.5 py-2 cursor-help">
                        <div className="flex items-center gap-1.5 text-[#7A6B5D]">
                            <Leaf className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider">Éco-Score</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#3A5D2D] bg-[#D6E3D1] px-2 py-0.5 rounded-md border border-[#C2D6BA]">
              A
            </span>
                    </div>

                    {/* Hidden Tooltip that appears on hover (Explains the audit fixes) */}
                    <div className="absolute bottom-full left-0 mb-2 w-full p-2 bg-[#403328] text-[#F9F8F6] text-[10px] font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg flex flex-col gap-1">
                        <div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#E4C381]"/> 140 Ko Total</div>
                        <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#528A46]"/> Images WebP</div>
                        <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#528A46]"/> 0 Vidéo Autoplay</div>
                    </div>

                    {/* Offline Badge */}
                    <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#D6E3D1]/90 border border-[#C2D6BA]/80 shadow-inner">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#528A46] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#528A46]"></span>
            </span>
                        <span className="text-[11px] font-bold text-[#3A5D2D] tracking-tight">
              {t.offlineReady}
            </span>
                    </div>
                </div>

            </div>
        </aside>
    );
};