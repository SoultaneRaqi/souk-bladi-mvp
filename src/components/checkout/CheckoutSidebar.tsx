import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Trash2, CheckCircle2, ShoppingBag, Minus, Plus, X, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COMMUNES, LANGUAGE_META, translations } from '../../data/translations';
import { formatPrice } from '../../utils/format';

// +212 / 00212 / 0, then 5, 6 or 7, then 8 digits (spaces, dots and dashes ignored)
const MA_PHONE = /^(?:\+212|00212|0)[5-7]\d{8}$/;

const inputClass = (invalid: boolean) =>
    `w-full min-h-11 px-4 py-2.5 bg-white border rounded-xl text-ink text-base font-semibold placeholder:text-muted focus:outline-none focus:ring-2 transition-all ${
        invalid
            ? 'border-berry focus:border-berry focus:ring-berry/30'
            : 'border-line-strong focus:border-saffron-deep focus:ring-saffron/30'
    }`;

export const CheckoutSidebar: React.FC = () => {
    const { language, cart, cartCount, updateQuantity, removeFromCart, clearCart, setIsDrawerOpen, announce } = useApp();
    const t = translations[language];
    const isRtl = LANGUAGE_META[language].dir === 'rtl';
    const slide = isRtl ? -20 : 20;

    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('+212 ');
    const [commune, setCommune] = useState(COMMUNES[0].id);
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
    const [isSuccess, setIsSuccess] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    useEffect(() => {
        if (!isSuccess) return;
        const id = setTimeout(() => {
            clearCart();
            setIsSuccess(false);
            setFirstName('');
            setPhone('+212 ');
            setErrors({});
        }, 3000);
        return () => clearTimeout(id);
    }, [isSuccess, clearCart]);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();

        const next: { name?: string; phone?: string } = {};
        if (!firstName.trim()) next.name = t.nameRequired;
        if (!MA_PHONE.test(phone.replace(/[\s.-]/g, ''))) next.phone = t.phoneInvalid;
        setErrors(next);

        if (next.name) { nameRef.current?.focus(); return; }
        if (next.phone) { phoneRef.current?.focus(); return; }

        setIsSuccess(true);
        announce(`${t.orderDone} ${t.orderDoneText}`);
    };

    return (
        <aside
            id="checkout"
            tabIndex={-1}
            aria-label={t.cart}
            className="w-[min(340px,100vw)] bg-white border-s border-line h-full flex flex-col pt-8 pb-6 px-6 shrink-0 shadow-[0_0_24px_rgba(64,51,40,0.04)] overflow-y-auto relative z-30 focus:outline-none"
        >

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand">
                <h2 className="text-lg font-serif font-bold text-ink leading-tight">
                    {t.confirmOrder}
                </h2>
                <div className="flex items-center gap-1">
                    <span className="flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-sand text-bark text-xs font-bold">
                        {cartCount}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(false)}
                        aria-label={t.close}
                        className="xl:hidden w-11 h-11 flex items-center justify-center text-bark hover:text-ink rounded-full hover:bg-sand cursor-pointer"
                    >
                        <X className="w-5 h-5" aria-hidden="true" />
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
                            <CheckCircle2 className="w-8 h-8 text-leaf" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-bold text-ink">{t.orderDone}</h3>
                        <p className="text-sm text-bark font-medium leading-relaxed px-4">
                            {t.orderDoneText}
                        </p>
                    </motion.div>
                ) : cart.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center flex-1 text-center"
                    >
                        <ShoppingBag className="w-12 h-12 text-line-strong mb-3" aria-hidden="true" />
                        <p className="text-sm text-muted font-medium">{t.emptyCart}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="checkout"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col flex-1"
                    >
                        {/* Cart items */}
                        <ul className="space-y-3 mb-6 max-h-[260px] overflow-y-auto scrollbar-hide pe-1">
                            <AnimatePresence>
                                {cart.map((item) => {
                                    const name = item.product.name[language];
                                    return (
                                        <motion.li
                                            layout
                                            initial={{ opacity: 0, x: slide }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -slide }}
                                            key={item.product.id}
                                            className="p-3 rounded-2xl bg-paper border border-line/60 flex flex-col gap-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 border border-line">
                                                    <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="flex-1 min-w-0 text-sm font-bold text-ink line-clamp-2">{name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    aria-label={`${t.remove} : ${name}`}
                                                    className="w-11 h-11 -me-2 flex items-center justify-center text-muted hover:text-brick hover:bg-white rounded-lg transition-all cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div role="group" aria-label={name} className="flex items-center rounded-lg border border-line-strong bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.product.id, -1)}
                                                        aria-label={t.decrease}
                                                        className="w-11 h-11 flex items-center justify-center text-bark hover:text-ink cursor-pointer"
                                                    >
                                                        <Minus className="w-4 h-4" aria-hidden="true" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold text-ink">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.product.id, 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                        aria-label={t.increase}
                                                        className="w-11 h-11 flex items-center justify-center text-bark hover:text-ink cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <Plus className="w-4 h-4" aria-hidden="true" />
                                                    </button>
                                                </div>
                                                <span className="text-sm font-bold text-ink">
                                                    {formatPrice(item.product.price * item.quantity, language)}
                                                </span>
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </AnimatePresence>
                        </ul>

                        {/* Ethical checkout form */}
                        <form onSubmit={handleOrder} noValidate className="space-y-4 flex-1 flex flex-col">
                            <div>
                                <label htmlFor="co-name" className="block text-xs font-bold uppercase tracking-wider text-bark mb-1.5">
                                    {t.firstName}
                                </label>
                                <input
                                    id="co-name" ref={nameRef}
                                    type="text" required autoComplete="given-name"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                                    placeholder={t.namePlaceholder}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? 'co-name-error' : undefined}
                                    className={inputClass(!!errors.name)}
                                />
                                {errors.name && (
                                    <p id="co-name-error" role="alert" className="mt-1.5 text-sm font-semibold text-berry">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="co-phone" className="block text-xs font-bold uppercase tracking-wider text-bark mb-1.5">
                                    {t.phone}
                                </label>
                                <input
                                    id="co-phone" ref={phoneRef}
                                    type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: undefined })); }}
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? 'co-phone-error' : 'co-phone-hint'}
                                    className={`${inputClass(!!errors.phone)} text-start`}
                                />
                                {errors.phone ? (
                                    <p id="co-phone-error" role="alert" className="mt-1.5 text-sm font-semibold text-berry">{errors.phone}</p>
                                ) : (
                                    <p id="co-phone-hint" className="mt-1.5 text-xs font-medium text-muted">{t.phoneHint}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="co-commune" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bark mb-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-saffron-deep" aria-hidden="true" />
                                    {t.communeLabel}
                                </label>
                                <div className="relative">
                                    <select
                                        id="co-commune"
                                        value={commune} onChange={(e) => setCommune(e.target.value)}
                                        className="w-full min-h-11 ps-4 pe-10 py-2.5 bg-paper border border-line-strong rounded-xl text-ink text-base font-semibold cursor-pointer appearance-none focus:outline-none focus:border-saffron-deep focus:ring-2 focus:ring-saffron/30 transition-all"
                                    >
                                        {COMMUNES.map((c) => (
                                            <option key={c.id} value={c.id}>{c.label[language]}</option>
                                        ))}
                                    </select>
                                    <ChevronDown aria-hidden="true" className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-bark" />
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-sand">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-bark">{t.totalLabel}</span>
                                    <span className="text-xl font-extrabold text-ink">{formatPrice(total, language)}</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full min-h-12 bg-ink hover:bg-ink-soft text-white rounded-xl text-sm font-bold shadow-lg shadow-ink/10 transition-all cursor-pointer active:scale-[0.98]"
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
                <ShieldCheck className="w-5 h-5 text-saffron-deep shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-cream-ink font-semibold">
                    {t.privacyNotice}
                </p>
            </div>
        </aside>
    );
};