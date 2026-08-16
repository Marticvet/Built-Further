import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import ProjectGallery from "@/components/ProjectGallery";
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
    return <><PageHero dark eyebrow={project.type} title={project.name} intro={project.description}><CaseVisual eager slug={project.slug} name={project.name} previewLabel={t.common.accessibility.productPreview} /></PageHero>
        <section className={styles.section}><div className="siteContainer"><p className="sectionEyebrow">{t.work.detail.overviewEyebrow}</p><div className={styles.caseNarrative}><article><h2>{t.work.detail.challengeTitle}</h2><p>{project.challenge}</p><div className={styles.narrativePoints}><h3>{t.work.detail.challengePointsTitle}</h3><ul>{project.challengeDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article><article><h2>{t.work.detail.solutionTitle}</h2><p>{project.solution}</p><div className={styles.narrativePoints}><h3>{t.work.detail.solutionPointsTitle}</h3><ul>{project.solutionDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article></div><div className={styles.technologyBar}><h3>{t.work.detail.technologyTitle}</h3><div className={styles.tagList}>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div><a className={styles.repositoryLink} href={project.repository} rel="noreferrer" target="_blank">{t.work.detail.repositoryLabel}<span aria-hidden="true">↗</span></a></div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className="siteContainer"><div className={styles.projectGalleryHeading}><p className="sectionEyebrow">{t.work.detail.highlightsEyebrow}</p><h2>{t.work.detail.highlightsTitle}</h2></div><div className={styles.deliverables}>{project.highlights.map((highlight, index) => <div key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><h3>{highlight}</h3></div>)}</div></div></section>
        <section className={`${styles.section} ${styles.projectBuild}`}><div className="siteContainer"><div className={styles.projectGalleryHeading}><p className="sectionEyebrow sectionEyebrowLight">{t.work.detail.buildEyebrow}</p><h2>{t.work.detail.buildTitle}</h2></div><div className={styles.buildGrid}><article><span>01</span><h3>{t.work.detail.approachTitle}</h3><p>{project.approach}</p></article><article><span>02</span><h3>{t.work.detail.architectureTitle}</h3><p>{project.architecture}</p></article><article><span>03</span><h3>{t.work.detail.flowsTitle}</h3><ul>{project.flows.map((flow) => <li key={flow}>{flow}</li>)}</ul></article></div></div></section>
        <section className={styles.section}><div className="siteContainer"><div className={styles.projectGalleryHeading}><p className="sectionEyebrow">{t.work.detail.galleryEyebrow}</p><h2>{t.work.detail.galleryTitle}</h2></div><ProjectGallery slug={project.slug} name={project.name} previewLabel={t.common.accessibility.productPreview} imageLabel={t.work.detail.imageLabel} /></div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className={`siteContainer ${styles.split}`}><h2>{t.work.detail.outcomeTitle}</h2><div className={styles.splitText}><p>{project.outcome}</p><p>{project.outcomeDetail}</p><div className={styles.outcomePoints}><h3>{t.work.detail.outcomePointsTitle}</h3><ul>{project.outcomeDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></div></div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
