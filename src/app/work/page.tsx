import type { Metadata } from "next";
import Link from "next/link";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { caseStudies } from "@/data/site";
import styles from "../../scss/pages/pages.module.scss";

export const metadata: Metadata = { title: "Work", description: "Explore software products, platforms and business systems shaped by Built Further." };

export default function WorkPage() {
    return <>
        <PageHero dark eyebrow="Concept case studies" title="Products designed to go further." intro="Representative product profiles showing how strategy, thoughtful design and durable engineering can come together around real operational needs." action={{ label: "Start a project", href: "/contact" }} />
        <section className={styles.section}><div className={`siteContainer ${styles.caseList}`}>
            {caseStudies.map((project) => <article className={styles.caseRow} key={project.slug}>
                <CaseVisual theme={project.theme} name={project.name} />
                <div className={styles.caseCopy}><span>{project.type}</span><h2>{project.name}</h2><p>{project.description}</p><b>{project.outcome}</b><div className={styles.tagList}>{project.services.map((service) => <span key={service}>{service}</span>)}</div><Link className="textLink" href={`/work/${project.slug}`}>View case study <i>→</i></Link></div>
            </article>)}
        </div></section>
        <FinalCta />
    </>;
}
