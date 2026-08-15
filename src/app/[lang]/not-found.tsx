"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { common as en } from "@/i18n/locales/en/common";
import { common as bg } from "@/i18n/locales/bg/common";
import { common as de } from "@/i18n/locales/de/common";
import { hasLocale, localePath } from "@/i18n/config";
import styles from "../../scss/pages/pages.module.scss";

const dictionaries = { en, bg, de };

export default function NotFound() {
    const params = useParams<{ lang?: string }>();
    const locale = params.lang && hasLocale(params.lang) ? params.lang : "en";
    const t = dictionaries[locale];
    return <section className={`${styles.pageHero} ${styles.pageHeroSolo}`}><div className="siteContainer"><div className={styles.pageHeroCopy}><p className="sectionEyebrow">{t.notFound.eyebrow}</p><h1>{t.notFound.title}</h1><p>{t.notFound.description}</p><Link className="darkButton" href={localePath(locale)}>{t.notFound.action} <span aria-hidden="true">→</span></Link></div></div></section>;
}
