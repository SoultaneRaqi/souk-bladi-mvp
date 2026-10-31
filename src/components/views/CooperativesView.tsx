import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';

const COOPERATIVES = [
    { name: 'Coop. Tighanimine', region: 'Essaouira', members: 42, type: 'Huile d\'Argan' },
    { name: 'Coop. Souktana', region: 'Taliouine', members: 18, type: 'Safran AOP' },
    { name: 'Coop. Ziz Oasis', region: 'Errachidia', members: 56, type: 'Dattes Medjool' },
    { name: 'Coop. Roseraie', region: 'Kelaat M\'Gouna', members: 24, type: 'Cosmétique Bio' },
];

export const CooperativesView: React.FC = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 pb-12">
        <div className="bg-[#403328] rounded-[24px] p-10 text-white relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.05]" />
            <h2 className="text-[32px] font-serif font-bold mb-3 relative z-10">Nos Coopératives Partenaires</h2>
            <p className="text-white/80 max-w-lg relative z-10 text-[14px]">
                Un réseau de 42 coopératives rurales marocaines, engagées pour la qualité, l'éthique et le commerce équitable.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COOPERATIVES.map((coop, i) => (
                <div key={i} className="bg-white p-6 rounded-[20px] border border-[#EAE5D9] flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[18px] font-bold text-[#403328]">{coop.name}</h3>
                        <span className="px-3 py-1 bg-[#F9F8F6] rounded-full text-[#CD9532] text-[10px] font-extrabold uppercase border border-[#EAE5D9]">{coop.type}</span>
                    </div>
                    <div className="flex items-center gap-6 mt-auto">
                        <div className="flex items-center gap-1.5 text-[#8B7C70] text-[12px] font-semibold"><MapPin className="w-4 h-4" /> {coop.region}</div>
                        <div className="flex items-center gap-1.5 text-[#8B7C70] text-[12px] font-semibold"><Users className="w-4 h-4" /> {coop.members} femmes</div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);