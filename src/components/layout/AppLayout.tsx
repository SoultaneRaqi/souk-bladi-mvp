import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_META } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CatalogView } from '../catalog/CatalogView';
import { CheckoutSidebar } from '../checkout/CheckoutSidebar';

export const AppLayout: React.FC = () => {
    const { language, isDrawerOpen, setIsDrawerOpen } = useApp();
    const dir = LANGUAGE_META[language].dir;

    return (
        <div dir={dir} className="h-screen bg-[#F9F8F6] text-stone-900 flex font-sans antialiased overflow-hidden">

            {/* Left Sidebar: Hidden on small mobile, visible on desktop */}
            <div className="hidden lg:block h-full shrink-0 z-20">
                <Sidebar />
            </div>

            {/* Center Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10">
                <div className="p-4 md:p-8 max-w-[1050px] mx-auto w-full">
                    <TopBar />
                    <CatalogView />
                </div>
            </main>

            {/* Right Checkout Sidebar: Fixed right on huge screens, Overlay Drawer on small screens */}
            <>
                {/* Dark overlay background for mobile/tablet drawer mode */}
                {isDrawerOpen && (
                    <div
                        className="fixed inset-0 bg-[#403328]/40 backdrop-blur-sm z-40 xl:hidden"
                        onClick={() => setIsDrawerOpen(false)}
                    />
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