"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/get-dictionary";

type LanguageSelectorProps = { locale: Locale; t: CommonDictionary["languages"]; accessibilityLabel: string; mobile?: boolean };

export default function LanguageSelector({ locale, t, accessibilityLabel, mobile = false }: LanguageSelectorProps) {
    const pathname = usePathname();
    const suffix = pathname.replace(/^\/(en|bg|de)(?=\/|$)/, "") || "";
    const switchHref = (nextLocale: Locale) => `/api/locale?locale=${nextLocale}&path=${encodeURIComponent(`/${nextLocale}${suffix}`)}`;

    if (mobile) {
        return <div className="languageMobile" aria-label={accessibilityLabel}><span>{t.label}</span><div>{locales.map((option) => <Link className={option === locale ? "isActive" : ""} href={switchHref(option)} key={option}>{option.toUpperCase()}</Link>)}</div></div>;
    }

    return (
        <details className="languageSelector">
            <summary aria-label={accessibilityLabel}>{locale.toUpperCase()} <span aria-hidden="true">⌄</span></summary>
            <div role="list">
                {locales.map((option) => <Link role="listitem" className={option === locale ? "isActive" : ""} href={switchHref(option)} key={option}><span>{t[option]}</span>{option === locale && <b aria-label={t.current}>✓</b>}</Link>)}
            </div>
        </details>
    );
}
