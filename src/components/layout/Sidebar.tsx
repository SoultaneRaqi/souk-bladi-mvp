import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Users, ShoppingCart, Info, Globe, ChevronDown, Check, UserCircle, Settings, Leaf, Zap } from 'lucide-react';
import { useApp, type ActiveTab } from '../../context/AppContext';
import { type Language, LANGUAGE_META, translations } from '../../data/translations';
import { BrandLogo } from '../common/BrandLogo';

export const Sidebar: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
    const { language, setLanguage, activeTab, setActiveTab, setIsDrawerOpen, cartCount } = useApp();
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

    const handleNavClick = (id: ActiveTab | 'cart') => {
        if (id === 'cart') {
            setIsDrawerOpen(true); // opens the drawer below xl
            if (window.matchMedia('(min-width: 1280px)').matches) {
                document.getElementById('checkout')?.focus(); // permanent panel on xl
            }
        } else {
            setActiveTab(id);
        }
        onNavigate?.();
    };

    return (
        <aside className="w-[260px] bg-line h-full flex flex-col justify-between pt-8 pb-6 px-5 shrink-0 border-e border-line-strong/60 shadow-[1px_0_10px_rgba(64,51,40,0.02)] select-none z-20 relative">

            <div className="space-y-9">

                {/* Language dropdown */}
                <div className="relative" ref={langMenuRef}>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        className="flex items-center justify-between w-full px-3.5 py-2.5 bg-line-strong/40 hover:bg-line-strong/70 rounded-2xl transition-all cursor-pointer ring-1 ring-line-strong/50 shadow-sm"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center shadow-inner">
                                <Globe className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[13px] font-bold text-ink" lang={LANGUAGE_META[language].htmlLang}>
                                {LANGUAGE_META[language].label}
                            </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-bark transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isLangMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="absolute top-full start-0 mt-2 w-full bg-paper rounded-2xl shadow-xl shadow-ink/10 ring-1 ring-line-strong overflow-hidden z-50 py-1.5"
                            >
                                {languages.map((lang) => {
                                    const isActive = language === lang;
                                    return (
                                        <button
                                            key={lang}
                                            type="button"
                                            lang={LANGUAGE_META[lang].htmlLang}
                                            onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                                                isActive
                                                    ? 'text-berry bg-line/50'
                                                    : 'text-bark hover:bg-line/30 hover:text-ink'
                                            }`}
                                        >
                                            <span>{LANGUAGE_META[lang].label}</span>
                                            {isActive && <Check className="w-4 h-4 text-berry" />}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Brand logo */}
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
                                onClick={() => handleNavClick(item.id)}
                                className="w-full relative group cursor-pointer block text-start"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavLine"
                                        className="absolute start-0 top-[15%] h-[70%] w-1 bg-ink rounded-e-full"
                                        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                                    />
                                )}
                                <div className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-line-strong/60 text-ink ltr:translate-x-1 rtl:-translate-x-1 shadow-sm ring-1 ring-line-strong/30'
                                        : 'text-bark hover:bg-line-strong/30 hover:text-ink ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1'
                                }`}>
                                    <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-ink' : 'text-muted group-hover:text-ink'}`} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.label}</span>
                                    {item.id === 'cart' && cartCount > 0 && (
                                        <span className="ms-auto min-w-5 h-5 px-1.5 rounded-full bg-berry text-white text-[11px] font-bold flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>

            {/* BOTTOM SECTION */}
            <div className="space-y-3 px-1">

                {/* Guest profile */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-line-strong/50 transition-colors cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-line-strong to-[#CFC7B6] flex items-center justify-center text-bark shadow-inner ring-1 ring-white/20">
                            <UserCircle className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-start">
                            <span className="text-[13px] font-bold text-ink">{t.guest}</span>
                            <span className="text-[10px] font-semibold text-muted group-hover:text-bark">{t.createAccount}</span>
                        </div>
                    </div>
                    <Settings className="w-4 h-4 text-muted group-hover:text-ink transition-colors" />
                </motion.button>

                {/* Green IT metrics + offline badge */}
                <div className="bg-gradient-to-b from-line-strong/40 to-line-strong/20 rounded-2xl p-1.5 ring-1 ring-line-strong/60 shadow-sm relative group">

                    <div className="flex items-center justify-between px-2.5 py-2 cursor-help">
                        <div className="flex items-center gap-1.5 text-bark">
                            <Leaf className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider">{t.ecoScore}</span>
                        </div>
                        <span className="text-[11px] font-bold text-leaf-deep bg-leaf-mist px-2 py-0.5 rounded-md border border-leaf-line">
                            A
                        </span>
                    </div>

                    <div className="absolute bottom-full start-0 mb-2 w-full p-2 bg-ink text-paper text-[10px] font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg flex flex-col gap-1">
                        <div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#E4C381]" /> {t.tipWeight}</div>
                        <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-leaf" /> {t.tipWebp}</div>
                        <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-leaf" /> {t.tipNoVideo}</div>
                    </div>

                    <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-leaf-mist/90 border border-leaf-line/80 shadow-inner">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf"></span>
                        </span>
                        <span className="text-[11px] font-bold text-leaf-deep tracking-tight">
                            {t.offlineReady}
                        </span>
                    </div>
                </div>

            </div>
        </aside>
    );
};