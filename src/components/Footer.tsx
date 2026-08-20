import Link from "next/link";
import Brand from "./Brand";
import AnalyticsSettingsButton from "./AnalyticsSettingsButton";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonDictionary, Dictionary } from "@/i18n/get-dictionary";

export default function Footer({ locale, t, services }: { locale: Locale; t: CommonDictionary; services: Dictionary["services"]["items"] }) {
    const exploreLinks = [[t.nav.work, "/work"], [t.nav.process, "/process"], [t.nav.about, "/about"], [t.nav.contact, "/contact"], [t.actions.bookCall, "/book"]] as const;
    return (
        <footer className="footer">
            <div className="siteContainer footerGrid">
                <div className="footerBrand"><Brand locale={locale} name={t.brand.name} ariaLabel={t.accessibility.brandHome} inverse /><p>{t.brand.tagline}</p></div>
                <div className="footerColumn"><h3>{t.footer.services}</h3>{services.slice(0, 4).map((service) => <Link href={localePath(locale, `/services/${service.slug}`)} key={service.slug}>{service.title}</Link>)}</div>
                <div className="footerColumn"><h3>{t.footer.explore}</h3>{exploreLinks.map(([label, path]) => <Link href={localePath(locale, path)} key={path}>{label}</Link>)}</div>
                <div className="footerColumn footerContact"><h3>{t.footer.start}</h3><Link href={localePath(locale, "/contact")}>{t.footer.tellUs} <span aria-hidden="true">→</span></Link><p>{t.footer.location}</p></div>
            </div>
            <div className="siteContainer footerBottom"><span>© {new Date().getFullYear()} {t.footer.copyright}</span><AnalyticsSettingsButton label={t.analytics.settings} /><span>{t.footer.closing}</span></div>
        </footer>
    );
}
