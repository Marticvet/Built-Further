import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { caseStudies } from "@/data/site";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = caseStudies.find((item) => item.slug === slug);
    return project ? { title: `${project.name} Case Study`, description: project.description } : {};
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const project = caseStudies.find((item) => item.slug === slug);
    if (!project) notFound();
    return <>
        <PageHero dark eyebrow={project.type} title={project.name} intro={project.description}><CaseVisual theme={project.theme} name={project.name} /></PageHero>
        <section className={styles.section}><div className="siteContainer">
            <div className={styles.detailIntro}><h2>A product foundation designed to keep moving.</h2><div><p>The work brought the product experience, operational requirements and technical architecture into one coherent system.</p><div className={styles.tagList}>{project.services.map((service) => <span key={service}>{service}</span>)}</div></div></div>
            <div className={styles.deliverables}><div><span>01</span><h3>Understand the operation</h3></div><div><span>02</span><h3>Clarify the product</h3></div><div><span>03</span><h3>Engineer the foundation</h3></div><div><span>04</span><h3>Enable the next stage</h3></div></div>
        </div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className={`siteContainer ${styles.split}`}><h2>The outcome.</h2><div className={styles.splitText}><p>{project.outcome}</p><p>The product is structured so future decisions can be made deliberately, with less friction between the business, the experience and the technology beneath it.</p></div></div></section>
        <FinalCta />
    </>;
}
