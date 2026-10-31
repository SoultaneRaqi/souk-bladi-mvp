import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_META } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { HeroBanner } from '../catalog/HeroBanner';
import { ProductGrid } from '../catalog/ProductGrid';
import { CheckoutSidebar } from '../checkout/CheckoutSidebar';

export const AppLayout: React.FC = () => {
    const { language } = useApp();
    const dir = LANGUAGE_META[language].dir;

    return (
        <div dir={dir} className="h-screen bg-[#F9F8F6] text-stone-900 flex font-sans antialiased overflow-hidden">
            {/* Fixed Left Sidebar */}
            <Sidebar />

            {/* Scrollable Center Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto">
                <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-6">
                    <TopBar />
                    <HeroBanner />
                    <ProductGrid />
                </div>
            </main>

            {/* Fixed Right Checkout Pane */}
            <CheckoutSidebar />
        </div>
    );
};