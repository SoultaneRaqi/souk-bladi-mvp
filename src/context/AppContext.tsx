import React, { createContext, useContext, useState } from 'react';
import { type Language, type ProductItem, PRODUCTS_DATA } from '../data/translations';

export type ActiveTab = 'shop' | 'cooperatives' | 'mission';

export interface CartEntry {
    product: ProductItem;
    quantity: number;
}

interface AppContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    isNavOpen: boolean;
    setIsNavOpen: (open: boolean) => void;
    cart: CartEntry[];
    addToCart: (product: ProductItem) => void;
    updateQuantity: (productId: string, delta: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartCount: number;
}

// Put VITE_DEMO=true in .env.local to start with a filled cart for the presentation.
const SEED_DEMO_CART = import.meta.env.VITE_DEMO === 'true';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('fr');
    const [activeTab, setActiveTab] = useState<ActiveTab>('shop');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [cart, setCart] = useState<CartEntry[]>(
        SEED_DEMO_CART ? [{ product: PRODUCTS_DATA[0], quantity: 1 }] : []
    );

    const addToCart = (product: ProductItem) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) return prev; // stock cap
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            if (product.stock < 1) return prev;
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart((prev) =>
            prev.flatMap((item) => {
                if (item.product.id !== productId) return [item];
                const next = Math.min(item.product.stock, item.quantity + delta);
                return next < 1 ? [] : [{ ...item, quantity: next }];
            })
        );
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppContext.Provider
            value={{
                language, setLanguage,
                activeTab, setActiveTab,
                isDrawerOpen, setIsDrawerOpen,
                isNavOpen, setIsNavOpen,
                cart, addToCart, updateQuantity, removeFromCart, clearCart,
                cartCount,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within an AppProvider');
    return context;
};