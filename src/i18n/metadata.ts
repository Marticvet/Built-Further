import type { Metadata } from "next";
import { alternateLanguages, localePath, type Locale } from "./config";

export const homePreviewImage = {
    url: "/home-preview.png",
    width: 1200,
    height: 630,
    alt: "Built Further — Software products engineered to last.",
};

export function localizedMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
    return {
        title,
        description,
        alternates: { canonical: localePath(locale, path), languages: { ...alternateLanguages(path), "x-default": localePath("en", path) } },
        openGraph: { type: "website", title, description, locale, url: localePath(locale, path), images: [homePreviewImage] },
        twitter: { card: "summary_large_image", title, description, images: [homePreviewImage] },
    };
}
