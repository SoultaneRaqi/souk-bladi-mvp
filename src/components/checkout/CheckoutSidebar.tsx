import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Trash2, CheckCircle2, ShoppingBag, Minus, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const COMMUNES = [
    'Aït Ourir (Al Haouz)',
    'Taliouine (Taroudant)',
    'Tafraout (Tiznit)',
    'Arfoud (Errachidia)',
    "Kelaat M'Gouna",
];

export const CheckoutSidebar: React.FC = () => {
    const { language, cart, cartCount, updateQuantity, removeFromCart, clearCart, setIsDrawerOpen } = useApp();
    const t = translations[language];

    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('+212 ');
    const [commune, setCommune] = useState(COMMUNES[0]);
    const [isSuccess, setIsSuccess] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSuccess(true);
        setTimeout(() => {
            clearCart();
            setIsSuccess(false);
            setFirstName('');
            setPhone('+212 ');
        }, 3000);
    };

    return (
        <aside
            id="checkout"
            tabIndex={-1}
            aria-label={t.cart}
            className="w-[min(340px,100vw)] bg-white border-s border-line h-full flex flex-col pt-8 pb-6 px-6 shrink-0 shadow-[-4px_0_24px_rgba(64,51,40,0.02)] overflow-y-auto relative z-30 focus:outline-none"
        >

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand">
                <h2 className="text-[18px] font-serif font-bold text-ink leading-tight">
                    {t.confirmOrder}
                </h2>
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-sand text-bark text-[11px] font-bold">
                        {cartCount}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(false)}
                        aria-label={t.close}
                        className="xl:hidden p-2 text-bark hover:text-ink rounded-full hover:bg-sand cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center flex-1 text-center space-y-3"
                    >
                        <div className="w-16 h-16 rounded-full bg-leaf-soft flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8 text-leaf" />
                        </div>
                        <h3 className="text-[18px] font-bold text-ink">Commande validée !</h3>
                        <p className="text-[13px] text-bark font-medium leading-relaxed px-4">
                            Votre commande a été enregistrée sans aucune collecte de données superflues.
                        </p>
                    </motion.div>
                ) : cart.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center flex-1 text-center opacity-60"
                    >
                        <ShoppingBag className="w-12 h-12 text-line-strong mb-3" />
                        <p className="text-[13px] text-muted font-medium">{t.emptyCart}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="checkout"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col flex-1"
                    >
                        {/* Cart items */}
                        <div className="space-y-3 mb-6 max-h-[220px] overflow-y-auto scrollbar-hide pe-1">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        key={item.product.id}
                                        className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-paper border border-line/60"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 border border-line">
                                                <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[12px] font-bold text-ink line-clamp-1">{item.product.name[language]}</span>
                                                <span className="text-[11px] font-semibold text-muted">{item.product.price * item.quantity} DHM</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0">
                                            <div className="flex items-center rounded-lg border border-line-strong bg-white">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.product.id, -1)}
                                                    aria-label={t.decrease}
                                                    className="w-8 h-8 flex items-center justify-center text-bark hover:text-ink cursor-pointer"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-6 text-center text-[12px] font-bold text-ink" aria-live="polite">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.product.id, 1)}
                                                    disabled={item.quantity >= item.product.stock}
                                                    aria-label={t.increase}
                                                    className="w-8 h-8 flex items-center justify-center text-bark hover:text-ink cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id)}
                                                aria-label={t.remove}
                                                className="p-2 text-muted hover:text-brick hover:bg-white rounded-lg transition-all cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Ethical checkout form */}
                        <form onSubmit={handleOrder} className="space-y-4 flex-1 flex flex-col">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-bark mb-1.5">{t.firstName}</label>
                                <input
                                    type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Ex: Karim"
                                    className="w-full px-4 py-2.5 bg-white border border-line-strong rounded-xl text-ink text-[13px] font-semibold placeholder:text-muted focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-bark mb-1.5">{t.phone}</label>
                                <input
                                    type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-line-strong rounded-xl text-ink text-[13px] font-semibold focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-bark mb-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-saffron" />
                                    {t.communeLabel}
                                </label>
                                <div className="relative">
                                    <select
                                        value={commune} onChange={(e) => setCommune(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-paper border border-line-strong rounded-xl text-ink text-[13px] font-semibold cursor-pointer appearance-none focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                                    >
                                        {COMMUNES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <div aria-hidden="true" className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-bark">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-sand">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[13px] font-bold text-bark">{t.totalLabel}</span>
                                    <span className="text-[20px] font-extrabold text-ink">{total} <span className="text-[12px] text-muted">DHM</span></span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-ink hover:bg-ink-soft text-white rounded-xl text-[13px] font-bold shadow-lg shadow-ink/10 transition-all cursor-pointer active:scale-[0.98]"
                                >
                                    {t.confirmOrder}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Privacy badge */}
            <div className="mt-6 p-4 rounded-2xl bg-cream border border-cream-line flex items-start gap-3 shrink-0">
                <ShieldCheck className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed text-cream-ink font-bold">
                    {t.privacyNotice}
                </p>
            </div>
        </aside>
    );
};