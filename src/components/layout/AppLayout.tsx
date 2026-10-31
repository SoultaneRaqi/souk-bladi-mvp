import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_META } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CatalogView } from '../catalog/CatalogView';
import { CooperativesView } from '../views/CooperativesView';
import { MissionView } from '../views/MissionView';
import { CheckoutSidebar } from '../checkout/CheckoutSidebar';

export const AppLayout: React.FC = () => {
    const { language, activeTab, isDrawerOpen, setIsDrawerOpen, isNavOpen, setIsNavOpen } = useApp();
    const dir = LANGUAGE_META[language].dir;

    useEffect(() => {
        document.documentElement.lang = language === 'tzm' ? 'zgh' : language;
        document.documentElement.dir = dir;
    }, [language, dir]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsDrawerOpen(false);
                setIsNavOpen(false);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [setIsDrawerOpen, setIsNavOpen]);

    const renderActiveView = () => {
        switch (activeTab) {
            case 'cooperatives': return <CooperativesView />;
            case 'mission': return <MissionView />;
            case 'shop':
            default: return <CatalogView />;
        }
    };

    return (
        <div dir={dir} className="h-dvh bg-paper text-stone-900 flex font-sans antialiased overflow-hidden">
            {/* Desktop sidebar */}
            <div className="hidden lg:block h-full shrink-0 z-20">
                <Sidebar />
            </div>

            {/* Mobile / tablet navigation drawer */}
            {isNavOpen && (
                <>
                    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsNavOpen(false)} />
                    <div className="fixed inset-y-0 start-0 z-50 lg:hidden">
                        <Sidebar onNavigate={() => setIsNavOpen(false)} />
                    </div>
                </>
            )}

            <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10">
                <div className="p-4 md:p-8 max-w-[1050px] mx-auto w-full">
                    <TopBar />
                    {renderActiveView()}
                </div>
            </main>

            {/* Checkout: permanent column on xl, drawer below */}
            {isDrawerOpen && (
                <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsDrawerOpen(false)} />
            )}
            <div className={`
                h-full shrink-0 z-50 transition-transform duration-300 ease-in-out
                xl:relative xl:block xl:translate-x-0
                ${isDrawerOpen ? 'fixed right-0 translate-x-0' : 'fixed right-0 translate-x-full xl:translate-x-0'}
            `}>
                <CheckoutSidebar />
            </div>
        </div>
    );
};