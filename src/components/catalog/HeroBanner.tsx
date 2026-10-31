import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

// Logos live in /public/logos/
const SLIDES = [
    {
        logoUrl: '/logos/onssa.png',
        name: 'ONSSA Maroc',
        desc: 'Contrôle & Sécurité Sanitaire Officielle'
    },
    {
        logoUrl: '/logos/label-bio.png',
        name: 'Label Bio Maroc',
        desc: 'Certification Agriculture Biologique'
    },
    {
        logoUrl: '/logos/odco.png',
        name: 'Réseau ODCO',
        desc: 'Registre Officiel des Coopératives'
    }
];

export const HeroBanner: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const ActiveSlide = SLIDES[currentSlide];

    return (
        <section className="relative overflow-hidden rounded-[20px] shadow-sm flex flex-col md:flex-row items-stretch min-h-[220px]">

            {/* Left side */}
            <div className="relative flex-1 bg-honey p-10 md:p-12 flex flex-col justify-center">
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}
                />
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-[38px] md:text-[44px] font-serif font-bold leading-[1.1] tracking-tight text-white mb-4 drop-shadow-sm">
                        {t.heroTitle}
                    </h2>
                    <p className="text-[16px] text-white/95 leading-relaxed font-medium">
                        {t.heroSub}
                    </p>
                </div>
            </div>

            {/* Right side: partner slider */}
            <div className="relative z-10 hidden md:flex flex-col justify-center items-center bg-honey-deep border-s border-white/5 w-[320px] shrink-0 overflow-hidden text-center">

                <div className="absolute top-5 start-0 w-full text-center z-20">
                    <span className="text-[9px] font-extrabold text-white/60 tracking-[0.2em] uppercase">
                        Nos Partenaires Éthiques
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -15 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex flex-col items-center gap-4 px-8 mt-4"
                    >
                        <div className="bg-white p-3 rounded-[24px] shadow-lg shadow-black/10 flex items-center justify-center w-[88px] h-[88px]">
                            <img
                                src={ActiveSlide.logoUrl}
                                alt={ActiveSlide.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    // NOTE: placehold.co is an external request, replace with a local file in Phase 2
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/F6F5F2/A89F93?text=Logo';
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-[18px] font-black text-white tracking-wide uppercase drop-shadow-sm leading-none">
                                {ActiveSlide.name}
                            </h3>
                            <p className="text-[12px] font-semibold text-white/80 leading-snug max-w-[200px] mx-auto">
                                {ActiveSlide.desc}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination dots */}
                <div className="absolute bottom-5 start-0 w-full flex justify-center gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};