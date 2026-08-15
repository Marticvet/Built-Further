import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactEmail } from "@/config/contact";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, locales } from "@/i18n/config";
import "../globals.css";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const { common } = await getDictionary(lang);
    return {
        metadataBase: new URL("https://builtfurther.com"),
        title: { default: common.meta.defaultTitle, template: `%s | ${common.brand.name}` },
        description: common.meta.defaultDescription,
        keywords: [...common.meta.keywords],
        openGraph: { type: "website", siteName: common.brand.name, title: common.meta.defaultTitle, description: common.meta.defaultDescription, locale: lang },
        twitter: { card: "summary_large_image", title: common.meta.defaultTitle, description: common.meta.defaultDescription },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const dictionary = await getDictionary(lang);
    const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: dictionary.common.brand.name, url: `https://builtfurther.com/${lang}`, description: dictionary.common.meta.defaultDescription, email: contactEmail, knowsAbout: dictionary.common.meta.keywords };
    return (
        <html lang={lang} className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
                <Navbar locale={lang} t={dictionary.common} />
                <main>{children}</main>
                <Footer locale={lang} t={dictionary.common} services={dictionary.services.items} />
            </body>
        </html>
    );
}
