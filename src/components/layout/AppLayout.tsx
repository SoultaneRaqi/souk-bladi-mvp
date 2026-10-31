import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_META } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CatalogView } from '../catalog/CatalogView';
import { CooperativesView } from '../views/CooperativesView';
import { MissionView } from '../views/MissionView';
import { CheckoutSidebar } from '../checkout/CheckoutSidebar';

export const AppLayout: React.FC = () => {
    const { language, activeTab, isDrawerOpen, setIsDrawerOpen } = useApp();
    const dir = LANGUAGE_META[language].dir;

    // View Router
    const renderActiveView = () => {
        switch (activeTab) {
            case 'cooperatives': return <CooperativesView />;
            case 'mission': return <MissionView />;
            case 'shop':
            default: return <CatalogView />;
        }
    };

    return (
        <div dir={dir} className="h-screen bg-[#F9F8F6] text-stone-900 flex font-sans antialiased overflow-hidden">
            <div className="hidden lg:block h-full shrink-0 z-20">
                <Sidebar />
            </div>

            <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10">
                <div className="p-4 md:p-8 max-w-[1050px] mx-auto w-full">
                    <TopBar />
                    {renderActiveView()}
                </div>
            </main>

            <>
                {isDrawerOpen && (
                    <div className="fixed inset-0 bg-[#403328]/40 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsDrawerOpen(false)} />
                )}
                <div className={`
                    h-full shrink-0 z-50 transition-transform duration-300 ease-in-out
                    xl:relative xl:block xl:translate-x-0
                    ${isDrawerOpen ? 'fixed right-0 translate-x-0' : 'fixed right-0 translate-x-full xl:translate-x-0'}
                `}>
                    <CheckoutSidebar />
                </div>
            </>
        </div>
    );
};