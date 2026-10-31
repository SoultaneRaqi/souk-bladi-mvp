import { LANGUAGE_META, translations, type Language, type ProductItem } from '../data/translations';

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

/** { value: 500, unit: 'ml' } -> "500 ml" (fr/en), "500 مل" (ar) */
export function formatWeight(weight: ProductItem['weight'], language: Language): string {
    const t = translations[language];
    const unit = weight.unit === 'ml' ? t.unitMl : weight.unit === 'g' ? t.unitG : t.unitKg;
    return `${new Intl.NumberFormat(LANGUAGE_META[language].locale).format(weight.value)} ${unit}`;
}

/** fmt('Plus que {n}', { n: 3 }) -> 'Plus que 3' */
export function fmt(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, key: string) =>
        key in values ? String(values[key]) : `{${key}}`
    );
}