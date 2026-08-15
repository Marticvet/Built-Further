import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { caseSlugs, hasLocale } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string; slug: string }> };
export function generateStaticParams() { return caseSlugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params; if (!hasLocale(lang)) return {}; const { work } = await getDictionary(lang); const project = work.projects.find((item) => item.slug === slug); return project ? localizedMetadata(lang, `/work/${slug}`, `${project.name} ${work.detail.metaSuffix}`, project.description) : {};
}

export default async function CaseStudyPage({ params }: Props) {
    const { lang, slug } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang); const project = t.work.projects.find((item) => item.slug === slug); if (!project) notFound();
    return <><PageHero dark eyebrow={project.type} title={project.name} intro={project.description}><CaseVisual theme={project.theme} name={project.name} previewLabel={t.common.accessibility.productPreview} /></PageHero>
        <section className={styles.section}><div className="siteContainer"><div className={styles.detailIntro}><h2>{t.work.detail.title}</h2><div><p>{t.work.detail.description}</p><div className={styles.tagList}>{project.services.map((service) => <span key={service}>{service}</span>)}</div></div></div><div className={styles.deliverables}>{t.work.detail.stages.map((stage, index) => <div key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></div>)}</div></div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className={`siteContainer ${styles.split}`}><h2>{t.work.detail.outcomeTitle}</h2><div className={styles.splitText}><p>{project.outcome}</p><p>{t.work.detail.outcomeDescription}</p></div></div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
