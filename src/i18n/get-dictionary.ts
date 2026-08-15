import "server-only";
import type { Locale } from "./config";

const dictionaries = {
    en: () => import("./locales/en").then((module) => module.en),
    bg: () => import("./locales/bg").then((module) => module.bg),
    de: () => import("./locales/de").then((module) => module.de),
};

export function getDictionary(locale: Locale) {
    return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
export type CommonDictionary = Dictionary["common"];
