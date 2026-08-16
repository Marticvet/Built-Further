import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { lang } = await params; if (!hasLocale(lang)) return {}; const { work } = await getDictionary(lang); return localizedMetadata(lang, "/work", work.meta.title, work.meta.description); }

export default async function WorkPage({ params }: Props) {
    const { lang } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang);
    return <><PageHero dark eyebrow={t.work.hero.eyebrow} title={t.work.hero.title} intro={t.work.hero.description} action={{ label: t.common.nav.startProject, href: localePath(lang, "/contact") }} />
        <section className={styles.section}><div className={`siteContainer ${styles.caseList}`}>{t.work.projects.map((project) => <article className={styles.caseRow} key={project.slug}><CaseVisual slug={project.slug} name={project.name} previewLabel={t.common.accessibility.productPreview} /><div className={styles.caseCopy}><span>{project.type}</span><h2>{project.name}</h2><p>{project.description}</p><b>{project.outcome}</b><div className={styles.tagList}>{project.services.map((service) => <span key={service}>{service}</span>)}</div><Link className="textLink" href={localePath(lang, `/work/${project.slug}`)}>{t.common.actions.viewCaseStudy} <i aria-hidden="true">→</i></Link></div></article>)}</div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
