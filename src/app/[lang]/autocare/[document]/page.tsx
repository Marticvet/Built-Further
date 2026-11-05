import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutoCareLegalDocument, AutoCareSupport } from "@/components/AutoCareLegalDocument";
import { legalOperator } from "@/config/legal";

const documents = ["privacy", "terms", "support"] as const;
type Document = (typeof documents)[number];
type Props = { params: Promise<{ lang: string; document: string }> };

const metadata: Record<Document, { title: string; description: string }> = {
    privacy: { title: "AutoCare Hub Privacy Policy", description: "Privacy information for the AutoCare Hub mobile application." },
    terms: { title: "AutoCare Hub Terms of Use", description: "Terms for using the AutoCare Hub mobile application." },
    support: { title: "AutoCare Hub Support", description: "Support guidance for AutoCare Hub accounts, records, synchronization and subscriptions." },
};

function isDocument(value: string): value is Document {
    return documents.includes(value as Document);
}

export function generateStaticParams() {
    return documents.map((document) => ({ lang: "en", document }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, document } = await params;
    if (lang !== "en" || !isDocument(document)) return {};
    const page = metadata[document];
    return { title: page.title, description: page.description, alternates: { canonical: `/en/autocare/${document}` }, robots: { index: false, follow: false } };
}

export default async function AutoCarePage({ params }: Props) {
    const { lang, document } = await params;
    if (lang !== "en" || !isDocument(document)) notFound();
    return document === "support" ? <AutoCareSupport contactEmail={legalOperator.email} /> : <AutoCareLegalDocument kind={document} contactEmail={legalOperator.email} />;
}
