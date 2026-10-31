import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

// --- CUSTOM SVG LOGOS FOR MOROCCAN INSTITUTIONS ---

const LogoAB = () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16" fill="none">
        <circle cx="20" cy="20" r="19" fill="#F9F8F6" stroke="#528A46" strokeWidth="2" />
        <path d="M12 28C12 28 8 15 20 10C32 15 28 28 28 28" fill="#528A46" />
        <text x="20" y="25" fill="#FFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">AB</text>
    </svg>
);

const LogoONSSA = () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16" fill="none">
        <path d="M20 4L34 10V20C34 28 20 36 20 36C20 36 6 28 6 20V10L20 4Z" fill="#F9F8F6" stroke="#2B4C7E" strokeWidth="2" />
        <path d="M20 8L30 12.5V20C30 26 20 32 20 32C20 32 10 26 10 20V12.5L20 8Z" fill="#2B4C7E" />
        <text x="20" y="23" fill="#FFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ONSSA</text>
    </svg>
);

const LogoODCO = () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16" fill="none">
        <circle cx="20" cy="20" r="19" fill="#F9F8F6" stroke="#CD9532" strokeWidth="2" />
        <path d="M20 10L23 17H30L24 21.5L26.5 28.5L20 24L13.5 28.5L16 21.5L10 17H17L20 10Z" fill="#CD9532" />
        <text x="20" y="36" fill="#403328" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ODCO</text>
    </svg>
);

// --- 3 MAIN PARTNERS ---
const SLIDES = [
    { logo: LogoONSSA, name: 'ONSSA Maroc', desc: 'Contrôle & Sécurité Sanitaire Officielle' },
    { logo: LogoAB, name: 'Label Bio Maroc', desc: 'Certification Agriculture Biologique' },
    { logo: LogoODCO, name: 'Réseau ODCO', desc: 'Registre Officiel des Coopératives' }
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
    const ActiveLogo = ActiveSlide.logo;

    return (
        <section className="relative overflow-hidden rounded-[20px] shadow-sm flex flex-col md:flex-row items-stretch min-h-[220px]">

            {/* Left Side (Golden Brown with Diamond Pattern) */}
            <div className="relative flex-1 bg-[#CD8F2D] p-10 md:p-12 flex flex-col justify-center">
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

            {/* Right Side Auto-Slider (Focused Single Partner View) */}
            <div className="relative z-10 hidden md:flex flex-col justify-center items-center bg-[#985F18] border-l border-white/5 w-[320px] shrink-0 overflow-hidden text-center">

                {/* Small Header for Context */}
                <div className="absolute top-5 left-0 w-full text-center z-20">
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
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-4 px-8 mt-4"
                    >
                        {/* Large Centered Logo */}
                        <div className="bg-white p-3 rounded-[24px] shadow-lg shadow-black/10">
                            <ActiveLogo />
                        </div>

                        {/* Organization Info */}
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

                {/* Slider Pagination Dots */}
                <div className="absolute bottom-5 left-0 w-full flex justify-center gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
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