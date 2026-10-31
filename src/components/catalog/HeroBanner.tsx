import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Pause, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations, type TranslationKey } from '../../data/translations';
import { fmt } from '../../utils/format';

// Logos live in /public/logos/
const SLIDES: { logoUrl: string; nameKey: TranslationKey; descKey: TranslationKey }[] = [
    { logoUrl: '/logos/onssa.png', nameKey: 'partnerOnssaName', descKey: 'partnerOnssaDesc' },
    { logoUrl: '/logos/label-bio.png', nameKey: 'partnerBioName', descKey: 'partnerBioDesc' },
    { logoUrl: '/logos/odco.png', nameKey: 'partnerOdcoName', descKey: 'partnerOdcoDesc' },
];

export const HeroBanner: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];
    const reduceMotion = useReducedMotion();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [playing, setPlaying] = useState(true);   // user's pause button
    const [engaged, setEngaged] = useState(false);  // hover / keyboard focus
    const [failed, setFailed] = useState<Record<string, boolean>>({});

    // WCAG 2.2.2: auto-advance only when the user hasn't paused, isn't interacting,
    // and hasn't asked the OS for reduced motion. Also skip when the panel is hidden (mobile).
    const autoplay = playing && !engaged && !reduceMotion;

    useEffect(() => {
        if (!autoplay || !window.matchMedia('(min-width: 768px)').matches) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [autoplay]);

    const slide = SLIDES[currentSlide];
    const slideName = t[slide.nameKey];

    return (
        <section className="relative overflow-hidden rounded-[20px] shadow-sm flex flex-col md:flex-row items-stretch min-h-[220px]">

            {/* Left side */}
            <div className="relative flex-1 bg-honey p-10 md:p-12 flex flex-col justify-center">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}
                />
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-[38px] md:text-[44px] font-serif font-bold leading-[1.1] tracking-tight text-white mb-4">
                        {t.heroTitle}
                    </h2>
                    <p className="text-base text-white leading-relaxed font-medium">
                        {t.heroSub}
                    </p>
                </div>
            </div>

            {/* Right side: partner slider */}
            <div
                role="region"
                aria-label={t.partnersTitle}
                onMouseEnter={() => setEngaged(true)}
                onMouseLeave={() => setEngaged(false)}
                onFocus={() => setEngaged(true)}
                onBlur={() => setEngaged(false)}
                className="relative z-10 hidden md:flex flex-col justify-center items-center bg-honey-deep border-s border-white/10 w-[320px] shrink-0 overflow-hidden text-center"
            >
                <div className="absolute top-4 start-0 w-full text-center z-20 pointer-events-none">
                    <span className="text-xs font-bold text-white/85 tracking-widest uppercase">
                        {t.partnersTitle}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? t.pauseSlider : t.playSlider}
                    className="absolute top-1 end-1 z-30 w-11 h-11 flex items-center justify-center rounded-full text-white/90 hover:bg-white/10 cursor-pointer"
                >
                    {playing ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
                </button>

                <div aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true" className="flex items-center justify-center">
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
                                {failed[slide.logoUrl] ? (
                                    <BadgeCheck className="w-10 h-10 text-honey-deep" aria-hidden="true" />
                                ) : (
                                    <img
                                        src={slide.logoUrl}
                                        alt=""
                                        className="w-full h-full object-contain"
                                        onError={() => setFailed((prev) => ({ ...prev, [slide.logoUrl]: true }))}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-lg font-black text-white tracking-wide uppercase leading-none">
                                    {slideName}
                                </h3>
                                <p className="text-sm font-semibold text-white/90 leading-snug max-w-[220px] mx-auto">
                                    {t[slide.descKey]}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination: 44px hit areas around small dots */}
                <div className="absolute bottom-1 start-0 w-full flex justify-center">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentSlide(i)}
                            aria-label={fmt(t.slideLabel, { n: i + 1 })}
                            aria-current={i === currentSlide ? 'true' : undefined}
                            className="h-11 w-8 flex items-center justify-center cursor-pointer"
                        >
                            <span
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};