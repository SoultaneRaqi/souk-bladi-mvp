import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COOPERATIVES, translations } from '../../data/translations';
import { fmt } from '../../utils/format';

export const CooperativesView: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 pb-12">
            <div className="bg-ink rounded-[24px] p-10 text-white relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-zellige opacity-[0.08] pointer-events-none" aria-hidden="true" />
                <h2 className="text-[32px] font-serif font-bold mb-3 relative z-10">{t.coopsTitle}</h2>
                <p className="text-white/90 max-w-lg relative z-10 text-sm">
                    {fmt(t.coopsIntro, { n: COOPERATIVES.length })}
                </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {COOPERATIVES.map((coop) => (
                    <li key={coop.id} className="bg-white p-6 rounded-[20px] border border-line flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start gap-3">
                            <h3 className="text-lg font-bold text-ink">{coop.name[language]}</h3>
                            <span className="px-3 py-1 bg-paper rounded-full text-saffron-deep text-xs font-bold border border-line shrink-0">
                                {t[coop.typeKey]}
                            </span>
                        </div>
                        <div className="flex items-center gap-6 mt-auto">
                            <div className="flex items-center gap-1.5 text-muted text-sm font-semibold">
                                <MapPin className="w-4 h-4" aria-hidden="true" /> {coop.region[language]}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted text-sm font-semibold">
                                <Users className="w-4 h-4" aria-hidden="true" /> {fmt(t.members, { n: coop.members })}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};