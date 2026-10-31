import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

export const MissionView: React.FC = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 pb-12">
        <div className="bg-honey rounded-[24px] p-10 text-white shadow-sm">
            <h2 className="text-[32px] font-serif font-bold mb-3">Green IT & NumVert</h2>
            <p className="text-white/90 max-w-lg text-[14px]">
                Notre plateforme est conçue selon les principes de la sobriété numérique et du respect total de la vie privée.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-[20px] border border-line shadow-sm">
                <div className="w-10 h-10 bg-leaf-soft rounded-full flex items-center justify-center mb-4"><Zap className="w-5 h-5 text-olive" /></div>
                <h3 className="text-[16px] font-bold text-ink mb-2">Sobriété Numérique</h3>
                <ul className="space-y-2 text-bark text-[13px] font-medium">
                    <li>• Images 100% format WebP</li>
                    <li>• Aucune vidéo en autoplay</li>
                    <li>• DOM allégé et requêtes minimisées</li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-line shadow-sm">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mb-4"><ShieldCheck className="w-5 h-5 text-saffron" /></div>
                <h3 className="text-[16px] font-bold text-ink mb-2">Privacy by Design</h3>
                <ul className="space-y-2 text-bark text-[13px] font-medium">
                    <li>• Aucune collecte de carte d'identité (CIN)</li>
                    <li>• Zéro tracking GPS pour la livraison</li>
                    <li>• Communes rurales utilisées pour l'adressage</li>
                </ul>
            </div>
        </div>
    </motion.div>
);