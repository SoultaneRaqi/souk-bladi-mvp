import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useDialog } from '../../hooks/useDialog';
import { LANGUAGE_META, UNTRANSLATED_TZM, translations } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CatalogView } from '../catalog/CatalogView';
import { CooperativesView } from '../views/CooperativesView';
import { MissionView } from '../views/MissionView';
import { CheckoutSidebar } from '../checkout/CheckoutSidebar';

/** Mobile navigation drawer, a proper modal dialog (focus trap + Escape) */
const NavDrawer: React.FC<{ onClose: () => void; label: string }> = ({ onClose, label }) => {
    const ref = useDialog<HTMLDivElement>(onClose);
    return (
        <>
            <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-label={label}
                tabIndex={-1}
                className="fixed inset-y-0 start-0 z-50 lg:hidden focus:outline-none"
            >
                <Sidebar onNavigate={onClose} />
            </div>
        </>
    );
};

export const AppLayout: React.FC = () => {
    const { language, activeTab, isDrawerOpen, setIsDrawerOpen, isNavOpen, setIsNavOpen, announcement } = useApp();
    const { dir, htmlLang } = LANGUAGE_META[language];
    const t = translations[language];

    useEffect(() => {
        document.documentElement.lang = htmlLang;
        document.documentElement.dir = dir;
        document.title = t.docTitle;
    }, [htmlLang, dir, t.docTitle]);

    // Dev helper: tells you exactly which Tamazight strings still need a translator
    useEffect(() => {
        if (import.meta.env.DEV && language === 'tzm') {
            console.info(`[i18n] ${UNTRANSLATED_TZM.length} Tamazight keys still fall back to French:`, UNTRANSLATED_TZM);
        }
    }, [language]);

    // Escape closes the checkout drawer (dialogs handle their own Escape)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsDrawerOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [setIsDrawerOpen]);

    // Move focus into the checkout panel when it opens
    useEffect(() => {
        if (isDrawerOpen) document.getElementById('checkout')?.focus();
    }, [isDrawerOpen]);

    const renderActiveView = () => {
        switch (activeTab) {
            case 'cooperatives': return <CooperativesView />;
            case 'mission': return <MissionView />;
            case 'shop':
            default: return <CatalogView />;
        }
    };

    return (
        <MotionConfig reducedMotion="user">
            <div dir={dir} lang={htmlLang} className="h-dvh bg-paper text-ink flex font-sans antialiased overflow-hidden">

                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:px-5 focus:py-3 focus:rounded-xl focus:bg-ink focus:text-white focus:font-bold focus:shadow-xl"
                >
                    {t.skipToContent}
                </a>

                {/* Screen-reader announcements ("added to cart", "order confirmed"...) */}
                <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                    {announcement}
                </div>

                {/* Desktop sidebar */}
                <div className="hidden lg:block h-full shrink-0 z-20">
                    <Sidebar />
                </div>

                {/* Mobile / tablet navigation drawer */}
                {isNavOpen && <NavDrawer onClose={() => setIsNavOpen(false)} label={t.menu} />}

                <main id="main" tabIndex={-1} className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 focus:outline-none">
                    <div className="p-4 md:p-8 max-w-[1050px] mx-auto w-full">
                        <TopBar />
                        {renderActiveView()}
                    </div>
                </main>

                {/* Checkout: permanent column on xl, drawer below.
                    invisible when closed so keyboard users can't tab into it off-screen. */}
                {isDrawerOpen && (
                    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsDrawerOpen(false)} aria-hidden="true" />
                )}
                <div className={`
                    h-full shrink-0 z-50 transition-all duration-300 ease-in-out
                    xl:relative xl:block xl:translate-x-0 xl:rtl:translate-x-0 xl:visible
                    ${isDrawerOpen
                    ? 'fixed end-0 translate-x-0 visible'
                    : 'fixed end-0 translate-x-full rtl:-translate-x-full invisible'}
                `}>
                    <CheckoutSidebar />
                </div>
            </div>
        </MotionConfig>
    );
};