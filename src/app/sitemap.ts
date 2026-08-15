import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/data/site";

const baseUrl = "https://builtfurther.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const primary = ["", "/services", "/work", "/process", "/about", "/contact"];
    return [
        ...primary.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8 })),
        ...services.map(({ slug }) => ({ url: `${baseUrl}/services/${slug}`, changeFrequency: "monthly" as const, priority: .7 })),
        ...caseStudies.map(({ slug }) => ({ url: `${baseUrl}/work/${slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ];
}
