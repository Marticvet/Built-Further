import type { MetadataRoute } from "next";
import { caseSlugs, locales, serviceSlugs } from "@/i18n/config";

const baseUrl = "https://builtfurther.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const primary = ["", "/services", "/work", "/process", "/about", "/contact", "/book"];
    return locales.flatMap((locale) => [
        ...primary.map((path) => ({ url: `${baseUrl}/${locale}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8 })),
        ...serviceSlugs.map((slug) => ({ url: `${baseUrl}/${locale}/services/${slug}`, changeFrequency: "monthly" as const, priority: .7 })),
        ...caseSlugs.map((slug) => ({ url: `${baseUrl}/${locale}/work/${slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ]);
}
