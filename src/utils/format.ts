import { LANGUAGE_META, type Language } from '../data/translations';

const cache = new Map<Language, Intl.NumberFormat>();

/** 180 -> "180 MAD" (fr), "180 د.م." (ar), "MAD 180" (en) */
export function formatPrice(amount: number, language: Language): string {
    let formatter = cache.get(language);
    if (!formatter) {
        formatter = new Intl.NumberFormat(LANGUAGE_META[language].locale, {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        cache.set(language, formatter);
    }
    return formatter.format(amount);
}

/** fmt('Plus que {n}', { n: 3 }) -> 'Plus que 3' */
export function fmt(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, key: string) =>
        key in values ? String(values[key]) : `{${key}}`
    );
}