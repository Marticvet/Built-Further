import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutoCareLegalDocument, AutoCareSupport } from "@/components/AutoCareLegalDocument";
import { legalOperator } from "@/config/legal";
import { alternateLanguages, hasLocale, locales, type Locale } from "@/i18n/config";

const documents = ["privacy", "terms", "support"] as const;
type Document = (typeof documents)[number];
type Props = { params: Promise<{ lang: string; document: string }> };

const metadata: Record<Locale, Record<Document, { title: string; description: string }>> = {
    en: { privacy: { title: "AutoCare Hub Privacy Policy", description: "Privacy information for the AutoCare Hub mobile application." }, terms: { title: "AutoCare Hub Terms of Use", description: "Terms for using the AutoCare Hub mobile application." }, support: { title: "AutoCare Hub Support", description: "Support guidance for AutoCare Hub accounts, records, synchronization and subscriptions." } },
    de: { privacy: { title: "AutoCare Hub Datenschutzerklärung", description: "Datenschutzhinweise für die mobile Anwendung AutoCare Hub." }, terms: { title: "AutoCare Hub Nutzungsbedingungen", description: "Bedingungen für die Nutzung der mobilen Anwendung AutoCare Hub." }, support: { title: "AutoCare Hub Hilfe", description: "Hilfe zu AutoCare-Hub-Konten, Fahrzeugdaten, Synchronisierung und Abonnements." } },
    bg: { privacy: { title: "Политика за поверителност на AutoCare Hub", description: "Информация за поверителността за мобилното приложение AutoCare Hub." }, terms: { title: "Условия за ползване на AutoCare Hub", description: "Условия за използване на мобилното приложение AutoCare Hub." }, support: { title: "Поддръжка за AutoCare Hub", description: "Помощ за акаунти, данни за превозни средства, синхронизация и абонаменти в AutoCare Hub." } },
};

function isDocument(value: string): value is Document {
    return documents.includes(value as Document);
}

export function generateStaticParams() {
    return locales.flatMap((lang) => documents.map((document) => ({ lang, document })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, document } = await params;
    if (!hasLocale(lang) || !isDocument(document)) return {};
    const page = metadata[lang][document];
    const path = `/autocare/${document}`;
    return { title: page.title, description: page.description, alternates: { canonical: `/${lang}${path}`, languages: alternateLanguages(path) }, robots: { index: false, follow: false } };
}

export default async function AutoCarePage({ params }: Props) {
    const { lang, document } = await params;
    if (!hasLocale(lang) || !isDocument(document)) notFound();
    return document === "support" ? <AutoCareSupport lang={lang} contactEmail={legalOperator.email} /> : <AutoCareLegalDocument lang={lang} kind={document} contactEmail={legalOperator.email} />;
}
