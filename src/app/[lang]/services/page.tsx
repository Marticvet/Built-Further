import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { lang } = await params; if (!hasLocale(lang)) return {}; const { services } = await getDictionary(lang); return localizedMetadata(lang, "/services", services.meta.title, services.meta.description); }

export default async function ServicesPage({ params }: Props) {
    const { lang } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang);
    return <><PageHero eyebrow={t.services.hero.eyebrow} title={t.services.hero.title} intro={t.services.hero.description} action={{ label: t.common.actions.discussProject, href: localePath(lang, "/contact") }}><div className={styles.heroIndex}>{t.services.items.map((service, index) => <span key={service.slug}>{String(index + 1).padStart(2, "0")} · {service.shortTitle}</span>)}</div></PageHero>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className="siteContainer"><div className={styles.heading}><div><p className="sectionEyebrow">{t.services.capabilities.eyebrow}</p><h2>{t.services.capabilities.titleLine1}<br />{t.services.capabilities.titleLine2}</h2></div><p>{t.services.capabilities.description}</p></div><div className={styles.serviceList}>{t.services.items.map((service, index) => <Link className={styles.serviceItem} href={localePath(lang, `/services/${service.slug}`)} key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.title}</h2><p>{service.description}</p><b>{t.common.actions.exploreCapability} <i aria-hidden="true">→</i></b></Link>)}</div></div></section>
        <section className={styles.section}><div className="siteContainer"><div className={styles.heading}><div><p className="sectionEyebrow">{t.services.engagement.eyebrow}</p><h2>{t.services.engagement.titleLine1}<br />{t.services.engagement.titleLine2}</h2></div><p>{t.services.engagement.description}</p></div><div className={styles.engagementGrid}>{t.services.engagement.items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
