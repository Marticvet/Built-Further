"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { locales, type Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/get-dictionary";

type LanguageSelectorProps = { locale: Locale; t: CommonDictionary["languages"]; accessibilityLabel: string; mobile?: boolean };

const languageFlags: Record<Locale, string> = {
    en: "/flags/gb.svg",
    bg: "/flags/bg.svg",
    de: "/flags/de.svg",
};

export default function LanguageSelector({ locale, t, accessibilityLabel, mobile = false }: LanguageSelectorProps) {
    const pathname = usePathname();
    const selectorRef = useRef<HTMLDetailsElement>(null);
    const closeSelector = useCallback(() => selectorRef.current?.removeAttribute("open"), []);
    const suffix = pathname.replace(/^\/(en|bg|de)(?=\/|$)/, "") || "";
    const switchHref = (nextLocale: Locale) => `/api/locale?locale=${nextLocale}&path=${encodeURIComponent(`/${nextLocale}${suffix}`)}`;

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            const selector = selectorRef.current;
            if (selector?.open && event.target instanceof Node && !selector.contains(event.target)) closeSelector();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeSelector();
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeSelector]);

    if (mobile) {
        return <div className="languageMobile" aria-label={accessibilityLabel}><span>{t.label}</span><div>{locales.map((option) => <Link className={option === locale ? "isActive" : ""} href={switchHref(option)} key={option}><Image className="languageFlag" src={languageFlags[option]} alt="" width={60} height={40} aria-hidden="true" />{option.toUpperCase()}</Link>)}</div></div>;
    }

    return (
        <details className="languageSelector" ref={selectorRef}>
            <summary aria-label={`${accessibilityLabel}: ${t[locale]}`}>
                <span className="languageCurrent"><Image className="languageFlag" src={languageFlags[locale]} alt="" width={60} height={40} aria-hidden="true" />{locale.toUpperCase()}</span>
                <span className="languageChevron" aria-hidden="true">⌄</span>
            </summary>
            <div>
                {locales.map((option) => <Link className={option === locale ? "isActive" : ""} href={switchHref(option)} onClick={closeSelector} key={option}><span className="languageOption"><Image className="languageFlag" src={languageFlags[option]} alt="" width={60} height={40} aria-hidden="true" /><span>{t[option]}</span></span>{option === locale && <b aria-label={t.current}>✓</b>}</Link>)}
            </div>
        </details>
    );
}
