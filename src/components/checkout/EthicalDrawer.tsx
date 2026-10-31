import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const COMMUNES = ['Aït Ourir', 'Taliouine', 'Tafraout', 'Arfoud', 'Chefchaouen'];

export const EthicalDrawer: React.FC = () => {
    const {
        language,
        isDrawerOpen,
        setIsDrawerOpen,
        cart,
        removeFromCart,
        clearCart,
    } = useApp();

    const t = translations[language];
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('+212 ');
    const [commune, setCommune] = useState(COMMUNES[0]);

    const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        setIsDrawerOpen(false);
    };

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        className="fixed inset-0 bg-stone-950/25 z-40"
                    />
                    <motion.aside
                        initial={{ x: language === 'ar' ? '-100%' : '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: language === 'ar' ? '-100%' : '100%' }}
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                        className={`fixed top-0 ${
                            language === 'ar' ? 'left-0 border-r' : 'right-0 border-l'
                        } h-full w-full max-w-sm bg-stone-50 border-stone-200 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto`}
                    >
                        <div className="space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                                <h2 className="text-base font-bold text-stone-900">{t.confirmOrder}</h2>
                                <button
                                    type="button"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200/60 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {cart.length === 0 ? (
                                <p className="text-xs text-stone-500 py-4">{t.emptyCart}</p>
                            ) : (
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {cart.map(({ product, quantity }) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200/80 text-xs"
                                        >
                                            <div>
                                                <p className="font-semibold text-stone-900">{product.name[language]}</p>
                                                <p className="text-stone-500">
                                                    {quantity} × {product.price} DHM
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(product.id)}
                                                className="text-stone-400 hover:text-red-600 cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleOrder} className="space-y-3.5">
                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                                        {t.firstName}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl bg-white border border-stone-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                                        {t.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl bg-white border border-stone-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                                        {t.communeLabel}
                                    </label>
                                    <select
                                        value={commune}
                                        onChange={(e) => setCommune(e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl bg-white border border-stone-300 cursor-pointer"
                                    >
                                        {COMMUNES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-2 flex items-center justify-between text-sm font-bold">
                                    <span>{t.totalLabel}</span>
                                    <span className="text-amber-700">{total} DHM</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={cart.length === 0}
                                    className="w-full py-2.5 rounded-xl bg-stone-900 text-amber-400 text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 cursor-pointer"
                                >
                                    {t.confirmOrder}
                                </button>
                            </form>
                        </div>

                        <div className="mt-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <p className="text-[11px] leading-relaxed text-amber-950 font-medium">
                                {t.privacyNotice}
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};