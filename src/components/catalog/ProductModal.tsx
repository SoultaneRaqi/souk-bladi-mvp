import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDialog } from '../../hooks/useDialog';
import { getCoop, translations, type ProductItem } from '../../data/translations';
import { fmt, formatPrice, formatWeight } from '../../utils/format';
import { StatusBadge } from '../common/StatusBadge';

interface Props {
    product: ProductItem;
    onClose: () => void;
}

export const ProductModal: React.FC<Props> = ({ product, onClose }) => {
    const { language, addToCart, cart } = useApp();
    const t = translations[language];
    const titleId = useId();
    const dialogRef = useDialog<HTMLDivElement>(onClose);

    const name = product.name[language];
    const coop = getCoop(product.coopId);
    const inCart = cart.find((item) => item.product.id === product.id);
    const atMax = !!inCart && inCart.quantity >= product.stock;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                aria-hidden="true"
                className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-40"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    tabIndex={-1}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.96 }}
                    className="pointer-events-auto relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-white rounded-[32px] shadow-2xl flex flex-col md:flex-row focus:outline-none"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={t.close}
                        className="absolute top-3 end-3 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm hover:bg-sand cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="w-full md:w-1/2 h-[250px] md:h-auto md:min-h-[420px] relative bg-sand shrink-0">
                        <img src={product.imageUrl} alt={name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-max px-4 py-1.5 bg-white/90 backdrop-blur-md text-ink rounded-full text-xs font-bold border border-white shadow-lg">
                            {fmt(t.webpBadge, { n: product.imageKb })}
                        </span>
                    </div>

                    <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
                        <div className="mb-4 h-6">
                            <StatusBadge status={product.status} />
                        </div>

                        <h2 id={titleId} className="text-[26px] font-serif font-bold text-ink leading-tight mb-2">
                            {name}
                        </h2>
                        <p className="text-muted text-sm font-medium mb-8">
                            {t.producedBy}{' '}
                            <span className="text-saffron-deep font-bold">{coop.name[language]}</span>
                            <span className="text-muted"> · {coop.region[language]}</span>
                        </p>

                        <dl className="space-y-3 mb-8">
                            <div className="flex items-center justify-between p-3.5 bg-paper rounded-xl border border-line">
                                <dt className="text-sm font-bold text-bark">{t.netWeight}</dt>
                                <dd className="text-sm font-bold text-ink">{formatWeight(product.weight, language)}</dd>
                            </div>
                            <div className="flex items-center justify-between p-3.5 bg-paper rounded-xl border border-line">
                                <dt className="text-sm font-bold text-bark">{t.ruralAvailability}</dt>
                                <dd className="text-sm font-bold text-olive">{fmt(t.unitsReady, { n: product.stock })}</dd>
                            </div>
                        </dl>

                        <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-line">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-muted uppercase">{t.priceDirect}</span>
                                <span className="text-[24px] font-extrabold text-terracotta leading-none mt-1">
                                    {formatPrice(product.price, language)}
                                </span>
                            </div>
                            <button
                                type="button"
                                disabled={atMax}
                                onClick={() => { addToCart(product); onClose(); }}
                                className="min-h-11 px-5 bg-ink text-white rounded-xl text-sm font-bold shadow-xl shadow-ink/10 hover:bg-ink-soft transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag className="w-4 h-4" aria-hidden="true" /> {t.addToCartLong}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};