import Image from "next/image";
import type { CaseSlug } from "@/i18n/config";
import CaseVisual from "./CaseVisual";

type ProjectGalleryProps = {
    slug: CaseSlug;
    name: string;
    previewLabel: string;
    imageLabel: string;
};

const webGallery: Partial<Record<CaseSlug, string[]>> = {
    lumynery: ["/work/lumynery/services.jpg", "/work/lumynery/catalog.jpg", "/work/lumynery/contact.jpg", "/work/lumynery/menu-cards.jpg", "/work/lumynery/service-detail.jpg", "/work/lumynery/about.jpg"],
    "tire-shop": ["/work/tire-shop/home.jpg", "/work/tire-shop/search.jpg", "/work/tire-shop/fitment.jpg", "/work/tire-shop/brands.jpg", "/work/tire-shop/about.jpg", "/work/tire-shop/contacts.jpg"],
};

export default function ProjectGallery({ slug, name, previewLabel, imageLabel }: ProjectGalleryProps) {
    const screenshots = webGallery[slug];

    if (screenshots) {
        return <div className="projectScreenshotGrid">
            {screenshots.map((src, index) => <figure key={src}><Image alt={`${name} ${imageLabel} ${index + 1}`} fill sizes="(max-width: 820px) 92vw, 46vw" src={src} unoptimized /></figure>)}
        </div>;
    }

    return <div className="projectMockupGrid">
        <CaseVisual name={name} previewLabel={previewLabel} screen="primary" slug={slug} />
        <CaseVisual name={name} previewLabel={previewLabel} screen="secondary" slug={slug} />
        <CaseVisual name={name} previewLabel={previewLabel} screen="tertiary" slug={slug} />
        <CaseVisual name={name} previewLabel={previewLabel} screen="quaternary" slug={slug} />
        <CaseVisual name={name} previewLabel={previewLabel} screen="quinary" slug={slug} />
        <CaseVisual name={name} previewLabel={previewLabel} screen="senary" slug={slug} />
    </div>;
}
