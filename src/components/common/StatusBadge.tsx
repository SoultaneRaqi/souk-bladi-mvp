import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations, type ProductItem } from '../../data/translations';

export const StatusBadge: React.FC<{ status?: ProductItem['status'] }> = ({ status }) => {
    const { language } = useApp();
    const t = translations[language];

    if (!status) return null;

    const config = {
        new: { label: t.statusNew, className: 'bg-ink' },
        bio: { label: t.statusBio, className: 'bg-olive' },
        popular: { label: t.statusPopular, className: 'bg-terracotta' },
    }[status];

    return (
        <span className={`${config.className} text-paper px-3 py-1 rounded-full text-xs font-bold shadow-sm`}>
            {config.label}
        </span>
    );
};