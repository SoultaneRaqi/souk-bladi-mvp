// src/components/layout/AppLayout.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_META } from '../../data/translations';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { HeroBanner } from '../catalog/HeroBanner';
import { ProductGrid } from '../catalog/ProductGrid';
import { EthicalDrawer } from '../checkout/EthicalDrawer';

export const AppLayout: React.FC = () => {
    const { language } = useApp();
    const dir = LANGUAGE_META[language].dir;

    return (
        <div dir={dir} className="min-h-screen bg-stone-50 text-stone-900 flex font-sans antialiased">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto space-y-6 overflow-y-auto">
                <TopBar />
                <HeroBanner />
                <ProductGrid />
            </main>
            <EthicalDrawer />
        </div>
    );
};