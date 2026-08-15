import type { Metadata } from "next";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { processSteps } from "@/data/site";
import styles from "../../scss/pages/pages.module.scss";

export const metadata: Metadata = { title: "Process", description: "A transparent software development process from discovery and design through engineering, launch and evolution." };

const descriptions = [
    "We get close to the business, users and constraints before deciding what the product should be.",
    "We make the experience tangible and the technical direction explicit before the build gathers momentum.",
    "Small, reviewed increments keep progress visible, quality high and learning connected to delivery.",
    "A launch is engineered, not improvised—with infrastructure, observability and handover considered early.",
    "We use real product feedback to improve, extend and scale without compromising the foundation.",
];

export default function ProcessPage() {
    return <>
        <PageHero eyebrow="Our process" title="Clarity at every stage." intro="A disciplined but adaptable path from early uncertainty to dependable software—built around frequent decisions, visible progress and shared ownership." action={{ label: "Plan a project", href: "/contact" }}>
            <div className={styles.heroIndex}>{processSteps.map(([title], index) => <span key={title}>{String(index + 1).padStart(2, "0")} · {title}</span>)}</div>
        </PageHero>
        <section className={styles.section}><div className="siteContainer">
            <div className={styles.heading}><div><p className="sectionEyebrow">From idea to production</p><h2>Structure without<br />the theatre.</h2></div><p>Each phase creates the evidence needed for the next. No black boxes, ceremonial handoffs or months spent building in isolation.</p></div>
            <div className={styles.stepsDetailed}>{processSteps.map(([title, items], index) => <article className={styles.stepRow} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{descriptions[index]}</p></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </div></section>
        <FinalCta />
    </>;
}
