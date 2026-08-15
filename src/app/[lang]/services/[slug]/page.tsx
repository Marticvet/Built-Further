import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath, serviceSlugs } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string; slug: string }> };
export function generateStaticParams() { return serviceSlugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params; if (!hasLocale(lang)) return {}; const { services } = await getDictionary(lang); const service = services.items.find((item) => item.slug === slug); return service ? localizedMetadata(lang, `/services/${slug}`, service.title, service.description) : {};
}

export default async function ServiceDetailPage({ params }: Props) {
    const { lang, slug } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang); const service = t.services.items.find((item) => item.slug === slug); if (!service) notFound();
    return <><PageHero eyebrow={t.services.detail.eyebrow} title={service.title} intro={service.description} action={{ label: t.common.actions.discussProject, href: localePath(lang, "/contact") }} />
        <section className={styles.section}><div className="siteContainer"><div className={styles.detailIntro}><h2>{t.services.detail.title}</h2><p>{service.detail}</p></div><div className={styles.deliverables}>{service.deliverables.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></div>)}</div></div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className={`siteContainer ${styles.split}`}><h2>{t.services.detail.teamTitle}</h2><div className={styles.splitText}><p>{t.services.detail.teamParagraph1}</p><p>{t.services.detail.teamParagraph2}</p></div></div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
