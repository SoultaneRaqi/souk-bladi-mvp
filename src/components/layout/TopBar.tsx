import React from 'react';
import { Leaf, Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const TopBar: React.FC = () => {
    const { language, setIsDrawerOpen, cartCount } = useApp();
    const t = translations[language];

    return (
        <header className="flex items-center justify-between pb-6 border-b border-stone-200/80">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-semibold">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.ecoOptimized}</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="relative p-2.5 rounded-xl bg-white border border-stone-200/90 hover:border-amber-500 transition-colors cursor-pointer"
                    aria-label={t.cart}
                >
                    <ShoppingBag className="w-4 h-4 text-stone-800" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-[11px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
                    )}
                </button>
            </div>
        </header>
    );
};