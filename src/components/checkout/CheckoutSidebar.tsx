import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Trash2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const COMMUNES = [
    'Aït Ourir (Al Haouz)',
    'Taliouine (Taroudant)',
    'Tafraout (Tiznit)',
    'Arfoud (Errachidia)',
    'Kelaat M\'Gouna'
];

export const CheckoutSidebar: React.FC = () => {
    const { language, cart, removeFromCart, clearCart } = useApp();
    const t = translations[language];

    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('+212 ');
    const [commune, setCommune] = useState(COMMUNES[0]);
    const [isSuccess, setIsSuccess] = useState(false);

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

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
        <aside className="w-[340px] bg-white border-l border-[#EAE5D9] h-full flex flex-col pt-8 pb-6 px-6 shrink-0 shadow-[-4px_0_24px_rgba(64,51,40,0.02)] overflow-y-auto relative z-30">

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F6F5F2]">
                <h2 className="text-[18px] font-serif font-bold text-[#403328] leading-tight">
                    {t.confirmOrder}
                </h2>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F6F5F2] text-[#7A6B5D] text-[11px] font-bold">
          {cart.length}
        </span>
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
                        <div className="w-16 h-16 rounded-full bg-[#EAF2E8] flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8 text-[#528A46]" />
                        </div>
                        <h3 className="text-[18px] font-bold text-[#403328]">Commande validée !</h3>
                        <p className="text-[13px] text-[#7A6B5D] font-medium leading-relaxed px-4">
                            Votre commande a été enregistrée sans aucune collecte de données superflues.
                        </p>
                    </motion.div>
                ) : cart.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center flex-1 text-center opacity-60"
                    >
                        <ShoppingBag className="w-12 h-12 text-[#DCD5C6] mb-3" />
                        <p className="text-[13px] text-[#8B7C70] font-medium">{t.emptyCart}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="checkout"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col flex-1"
                    >
                        {/* Cart Items List */}
                        <div className="space-y-3 mb-6 max-h-[180px] overflow-y-auto scrollbar-hide pr-1">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        key={item.product.id}
                                        className="flex items-center justify-between p-3 rounded-2xl bg-[#F9F8F6] border border-[#EAE5D9]/60 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 border border-[#EAE5D9]">
                                                <img src={item.product.imageUrl} alt={item.product.name[language]} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-bold text-[#403328] line-clamp-1">{item.product.name[language]}</span>
                                                <span className="text-[11px] font-semibold text-[#8B7C70]">{item.quantity} × {item.product.price} DHM</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-1.5 text-[#A89F93] hover:text-[#B84B4B] hover:bg-white rounded-lg transition-all cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Ethical Checkout Form */}
                        <form onSubmit={handleOrder} className="space-y-4 flex-1 flex flex-col">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A6B5D] mb-1.5">{t.firstName}</label>
                                <input
                                    type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Ex: Karim"
                                    className="w-full px-4 py-2.5 bg-white border border-[#DCD5C6] rounded-xl text-[#403328] text-[13px] font-semibold placeholder:text-[#A89F93] focus:outline-none focus:border-[#CD9532] focus:ring-1 focus:ring-[#CD9532] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A6B5D] mb-1.5">{t.phone}</label>
                                <input
                                    type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-[#DCD5C6] rounded-xl text-[#403328] text-[13px] font-semibold focus:outline-none focus:border-[#CD9532] focus:ring-1 focus:ring-[#CD9532] transition-all"
                                />
                            </div>

                            {/* Solves the GPS problem from the audit */}
                            <div>
                                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A6B5D] mb-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#CD9532]" />
                                    {t.communeLabel}
                                </label>
                                <div className="relative">
                                    <select
                                        value={commune} onChange={(e) => setCommune(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-[#F9F8F6] border border-[#DCD5C6] rounded-xl text-[#403328] text-[13px] font-semibold cursor-pointer appearance-none focus:outline-none focus:border-[#CD9532] focus:ring-1 focus:ring-[#CD9532] transition-all"
                                    >
                                        {COMMUNES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A6B5D]">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-[#F6F5F2]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[13px] font-bold text-[#7A6B5D]">{t.totalLabel}</span>
                                    <span className="text-[20px] font-extrabold text-[#403328]">{total} <span className="text-[12px] text-[#8B7C70]">DHM</span></span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-[#403328] hover:bg-[#5A4A3B] text-white rounded-xl text-[13px] font-bold shadow-lg shadow-[#403328]/10 transition-all cursor-pointer active:scale-[0.98]"
                                >
                                    {t.confirmOrder}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Privacy Badge (Matches Constat 08 requirement exactly) */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FFF9F0] border border-[#F2E5D0] flex items-start gap-3 shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#CD9532] shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed text-[#8C6B36] font-bold">
                    {t.privacyNotice}
                </p>
            </div>
        </aside>
    );
};