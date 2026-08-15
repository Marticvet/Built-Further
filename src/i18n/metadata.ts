import type { Metadata } from "next";
import { alternateLanguages, localePath, type Locale } from "./config";

export function localizedMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
    return {
        title,
        description,
        alternates: { canonical: localePath(locale, path), languages: { ...alternateLanguages(path), "x-default": localePath("en", path) } },
        openGraph: { type: "website", title, description, locale, url: localePath(locale, path) },
        twitter: { card: "summary_large_image", title, description },
    };
}
