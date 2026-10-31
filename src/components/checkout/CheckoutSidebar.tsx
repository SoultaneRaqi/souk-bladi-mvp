import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const COMMUNES = ['Aït Ourir', 'Taliouine', 'Tafraout', 'Arfoud'];

export const CheckoutSidebar: React.FC = () => {
    const { language, clearCart } = useApp();
    const t = translations[language];
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('+212');
    const [commune, setCommune] = useState(COMMUNES[0]);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        alert('Commande validée sans données GPS !');
    };

    return (
        <aside className="w-[320px] bg-white border-l border-stone-200 h-full flex flex-col p-6 shrink-0 overflow-y-auto">
            <h2 className="text-[17px] font-bold text-stone-900 mb-8 border-b border-stone-100 pb-4">
                {t.confirmOrder}
            </h2>

            <form onSubmit={handleOrder} className="space-y-5 flex-1">
                {/* Name Field */}
                <div>
                    <label className="block text-xs text-stone-600 mb-1.5">{t.firstName}</label>
                    <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-[#D09635]"
                    />
                </div>

                {/* Phone Field */}
                <div>
                    <label className="block text-xs text-stone-600 mb-1.5">Mobile Number</label>
                    <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-[#D09635]"
                    />
                </div>

                {/* Commune Field (Replaces GPS) */}
                <div>
                    <label className="block text-xs text-stone-600 mb-1.5">{t.communeLabel}</label>
                    <div className="bg-white border border-stone-300 rounded-lg overflow-hidden">
                        <select
                            value={commune}
                            onChange={(e) => setCommune(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-transparent outline-none cursor-pointer border-b border-stone-200"
                        >
                            {COMMUNES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        {/* Visual list rendering to match mockup */}
                        <div className="bg-stone-50/50">
                            {COMMUNES.slice(0, 3).map((c, i) => (
                                <div key={i} className="px-3 py-2 text-sm text-stone-600 border-b border-stone-100 last:border-0 hover:bg-stone-100">
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>

            {/* Privacy Badge Block */}
            <div className="mt-8 p-4 rounded-xl bg-[#FFF8ED] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C08530] shrink-0" />
                <p className="text-[11px] leading-relaxed text-[#75501B] font-medium">
                    {t.privacyNotice}
                </p>
            </div>
        </aside>
    );
};