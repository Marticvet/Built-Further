"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/get-dictionary";
import styles from "../scss/navbar/navbar.module.scss";

type MobileNavigationProps = {
    locale: Locale;
    t: CommonDictionary;
    links: ReadonlyArray<readonly [string, string]>;
};

export default function MobileNavigation({ locale, t, links }: MobileNavigationProps) {
    const menuRef = useRef<HTMLDetailsElement>(null);
    const closeMenu = useCallback(() => menuRef.current?.removeAttribute("open"), []);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            const menu = menuRef.current;
            if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) closeMenu();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu();
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeMenu]);

    return <details className={styles.mobileMenu} ref={menuRef}>
        <summary aria-label={t.accessibility.openNavigation}><span /><span /></summary>
        <div onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) closeMenu();
        }}>
            <LanguageSelector mobile locale={locale} t={t.languages} accessibilityLabel={t.accessibility.selectLanguage} />
            {links.map(([label, path]) => <Link key={path} href={localePath(locale, path)}>{label}</Link>)}
            <Link href={localePath(locale, "/contact")}>{t.nav.contact}</Link>
            <Link href={localePath(locale, "/book")}>{t.actions.bookCall}</Link>
        </div>
    </details>;
}
