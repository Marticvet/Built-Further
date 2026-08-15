export const locales = ["en", "bg", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "built-further-locale";
export const serviceSlugs = ["saas-platforms", "web-applications", "mobile-applications", "business-systems", "ai-automation", "modernisation"] as const;
export const caseSlugs = ["meridian", "northstar", "lumen"] as const;

export function hasLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
    return `/${locale}${path === "/" ? "" : path}`;
}

export function alternateLanguages(path = "") {
    return Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)]));
}
