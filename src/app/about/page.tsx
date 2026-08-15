import type { Metadata } from "next";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { principles } from "@/data/site";
import styles from "../../scss/pages/pages.module.scss";

export const metadata: Metadata = { title: "About", description: "Built Further is a software product partner focused on thoughtful design, durable engineering and long-term ownership." };

export default function AboutPage() {
    return <>
        <PageHero eyebrow="About Built Further" title="We build for the road ahead." intro="Built Further exists for businesses that care about what happens after launch—when products need to adapt, teams need to take ownership and technology has to keep earning its place." action={{ label: "Work with us", href: "/contact" }} />
        <section className={styles.section}><div className={`siteContainer ${styles.split}`}>
            <h2>Serious about software.<br />Practical about delivery.</h2>
            <div className={styles.splitText}><p>Good software starts with understanding the business behind it. That means asking better questions, making trade-offs visible and keeping the product connected to the people who rely on it.</p><p>We bring strategy, design and engineering into one conversation. The result is less lost in translation, more direct access to the people doing the work and a product foundation your business can genuinely own.</p><div className={styles.beliefs}><span>Direct collaboration</span><span>Visible decisions</span><span>Maintainable systems</span><span>Long-term thinking</span></div></div>
        </div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className="siteContainer">
            <div className={styles.heading}><div><p className="sectionEyebrow">What we stand for</p><h2>Built into every<br />engagement.</h2></div><p>These aren&apos;t marketing lines. They are practical standards for the way software is scoped, designed, engineered and handed over.</p></div>
            <div className={styles.principleRows}>{principles.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{description}</p></article>)}</div>
        </div></section>
        <FinalCta />
    </>;
}
