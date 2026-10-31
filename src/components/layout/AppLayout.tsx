import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_META } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CatalogView } from '../catalog/CatalogView'; // New combined view
import { CheckoutSidebar } from '../checkout/CheckoutSidebar';

export const AppLayout: React.FC = () => {
    const { language } = useApp();
    const dir = LANGUAGE_META[language].dir;

    return (
        <div dir={dir} className="h-screen bg-[#F9F8F6] text-stone-900 flex font-sans antialiased overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-y-auto">
                {/* We reduced the max-width slightly so the cards fit perfectly without huge gaps */}
                <div className="p-6 md:p-8 max-w-[1000px] mx-auto w-full space-y-6">
                    <TopBar />
                    <CatalogView />
                </div>
            </main>

            <CheckoutSidebar />
        </div>
    );
};