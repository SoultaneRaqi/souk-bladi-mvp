import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useApp, type ActiveTab } from '../../context/AppContext';
import { type Language, LANGUAGE_META, translations } from '../../data/translations';

export const Sidebar: React.FC = () => {
    const {
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        setIsDrawerOpen,
        cartCount,
    } = useApp();

    const t = translations[language];
    const languages: Language[] = ['fr', 'ar', 'tzm', 'en'];

    const navItems: { id: ActiveTab | 'cart'; label: string; icon: React.ElementType }[] = [
        { id: 'shop', label: t.shop, icon: Store },
        { id: 'cooperatives', label: t.cooperatives, icon: Users },
        { id: 'cart', label: t.cart, icon: ShoppingBag },
        { id: 'mission', label: t.mission, icon: ShieldCheck },
    ];

    return (
        <aside className="w-64 bg-stone-100/90 border-r border-stone-200/80 min-h-screen flex flex-col justify-between p-5 shrink-0 select-none">
            <div className="space-y-7">
                {/* 4-Language Switcher (FR, Darija, Tamazight, EN) */}
                <div className="grid grid-cols-2 gap-1.5 bg-stone-200/75 p-1.5 rounded-xl border border-stone-300/50">
                    {languages.map((lang) => {
                        const isActive = language === lang;
                        return (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setLanguage(lang)}
                                className={`relative px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                                    isActive
                                        ? 'text-amber-400'
                                        : 'text-stone-600 hover:text-stone-900'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="langActivePill"
                                        className="absolute inset-0 bg-stone-900 rounded-lg shadow-xs"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{LANGUAGE_META[lang].label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Brand Header */}
                <div className="px-1">
                    <h1 className="text-2xl font-serif font-bold text-stone-900 leading-tight">
                        Souk Bladi
                    </h1>
                    <p className="text-[11px] font-medium text-amber-700 uppercase tracking-wider">
                        Terroir & Éthique
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.id !== 'cart' && activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    if (item.id === 'cart') {
                                        setIsDrawerOpen(true);
                                    } else {
                                        setActiveTab(item.id);
                                    }
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                                    isActive
                                        ? 'bg-stone-900 text-stone-50 shadow-xs'
                                        : 'text-stone-700 hover:bg-stone-200/70'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                                    <span>{item.label}</span>
                                </div>
                                {item.id === 'cart' && cartCount > 0 && (
                                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-stone-950">
                    {cartCount}
                  </span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Offline Ready PWA Badge (Constat 07 Solution) */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-950/5 border border-emerald-800/15">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-emerald-900 truncate">
          {t.offlineReady}
        </span>
            </div>
        </aside>
    );
};