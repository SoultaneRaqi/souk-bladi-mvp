import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const MissionView: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 pb-12">
            <div className="bg-honey rounded-[24px] p-10 text-white shadow-sm">
                <h2 className="text-[32px] font-serif font-bold mb-3">{t.missionTitle}</h2>
                <p className="text-white/90 max-w-lg text-[14px]">
                    {t.missionIntro}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-6 rounded-[20px] border border-line shadow-sm">
                    <div className="w-10 h-10 bg-leaf-soft rounded-full flex items-center justify-center mb-4"><Zap className="w-5 h-5 text-olive" /></div>
                    <h3 className="text-[16px] font-bold text-ink mb-2">{t.ecoHeading}</h3>
                    <ul className="space-y-2 text-bark text-[13px] font-medium">
                        <li>• {t.eco1}</li>
                        <li>• {t.eco2}</li>
                        <li>• {t.eco3}</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-[20px] border border-line shadow-sm">
                    <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mb-4"><ShieldCheck className="w-5 h-5 text-saffron" /></div>
                    <h3 className="text-[16px] font-bold text-ink mb-2">{t.privacyHeading}</h3>
                    <ul className="space-y-2 text-bark text-[13px] font-medium">
                        <li>• {t.privacy1}</li>
                        <li>• {t.privacy2}</li>
                        <li>• {t.privacy3}</li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};