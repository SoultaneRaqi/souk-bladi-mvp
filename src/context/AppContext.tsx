import React, { createContext, useCallback, useContext, useState } from 'react';
import { type Language, type ProductItem, PRODUCTS_DATA, translations } from '../data/translations';
import { fmt } from '../utils/format';

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
    /** Text for the screen-reader live region (rendered once in AppLayout) */
    announcement: string;
    announce: (message: string) => void;
}

// Put VITE_DEMO=true in .env.local to start with a filled cart for the presentation.
const SEED_DEMO_CART = import.meta.env.VITE_DEMO === 'true';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('fr');
    const [activeTab, setActiveTab] = useState<ActiveTab>('shop');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [announcement, setAnnouncement] = useState('');
    const [cart, setCart] = useState<CartEntry[]>(
        SEED_DEMO_CART ? [{ product: PRODUCTS_DATA[0], quantity: 1 }] : []
    );

    const t = translations[language];

    // Appending a non-breaking space makes a repeated message announce again
    const announce = useCallback((message: string) => {
        setAnnouncement((prev) => (prev === message ? message + '\u00A0' : message));
    }, []);

    const addToCart = (product: ProductItem) => {
        const name = product.name[language];
        const existing = cart.find((item) => item.product.id === product.id);

        if (existing ? existing.quantity >= product.stock : product.stock < 1) {
            announce(fmt(t.maxInCart, { name }));
            return;
        }

        setCart((prev) =>
            existing
                ? prev.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...prev, { product, quantity: 1 }]
        );
        announce(fmt(t.addedAnnouncement, { name }));
    };

    const removeFromCart = (productId: string) => {
        const item = cart.find((i) => i.product.id === productId);
        setCart((prev) => prev.filter((i) => i.product.id !== productId));
        if (item) announce(fmt(t.removedAnnouncement, { name: item.product.name[language] }));
    };

    const updateQuantity = (productId: string, delta: number) => {
        const item = cart.find((i) => i.product.id === productId);
        if (!item) return;
        const next = Math.min(item.product.stock, item.quantity + delta);
        if (next < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, quantity: next } : i))
        );
        announce(fmt(t.quantityAnnouncement, { name: item.product.name[language], n: next }));
    };

    const clearCart = useCallback(() => setCart([]), []);

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
                announcement, announce,
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