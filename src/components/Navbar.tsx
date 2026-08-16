import Link from "next/link";
import Brand from "./Brand";
import LanguageSelector from "./LanguageSelector";
import MobileNavigation from "./MobileNavigation";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/get-dictionary";
import styles from "../scss/navbar/navbar.module.scss";

export default function Navbar({ locale, t }: { locale: Locale; t: CommonDictionary }) {
    const links = [[t.nav.home, ""], [t.nav.services, "/services"], [t.nav.work, "/work"], [t.nav.process, "/process"], [t.nav.about, "/about"]] as const;
    return (
        <header className={styles.header}>
            <nav className={styles.navbar} aria-label={t.accessibility.mainNavigation}>
                <Brand locale={locale} name={t.brand.name} ariaLabel={t.accessibility.brandHome} />
                <div className={styles.navigationLinks}>{links.map(([label, path]) => <Link key={path} href={localePath(locale, path)}>{label}</Link>)}</div>
                <div className={styles.desktopLanguage}><LanguageSelector locale={locale} t={t.languages} accessibilityLabel={t.accessibility.selectLanguage} /></div>
                <Link className={styles.startProject} href={localePath(locale, "/contact")}>{t.nav.startProject} <span aria-hidden="true">→</span></Link>
                <MobileNavigation locale={locale} t={t} links={links} />
            </nav>
        </header>
    );
}
