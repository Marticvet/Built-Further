import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { services } from "@/data/site";
import styles from "../../scss/pages/pages.module.scss";

export const metadata: Metadata = { title: "Services", description: "Product strategy, design and software engineering for SaaS platforms, web applications, mobile apps and business systems." };

export default function ServicesPage() {
    return <>
        <PageHero eyebrow="Services" title="Software shaped around the challenge." intro="From first product decisions to long-term evolution, we bring product thinking, design and engineering together around the result your business needs." action={{ label: "Discuss your project", href: "/contact" }}>
            <div className={styles.heroIndex}>{services.map((service, index) => <span key={service.slug}>{String(index + 1).padStart(2, "0")} · {service.shortTitle}</span>)}</div>
        </PageHero>
        <section className={styles.section}><div className="siteContainer">
            <div className={styles.heading}><div><p className="sectionEyebrow">Capabilities</p><h2>From product idea<br />to working system.</h2></div><p>Choose a focused capability or bring us a challenge that crosses several. We shape the right team and approach around the work.</p></div>
            <div className={styles.serviceList}>{services.map((service, index) => <Link className={styles.serviceItem} href={`/services/${service.slug}`} key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.title}</h2><p>{service.description}</p><b>Explore capability <i>→</i></b></Link>)}</div>
        </div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className="siteContainer">
            <div className={styles.heading}><div><p className="sectionEyebrow">Ways to work together</p><h2>The right shape<br />for the work.</h2></div><p>Clear expectations, direct communication and a delivery model suited to where your product is now.</p></div>
            <div className={styles.engagementGrid}>
                <article><span>01</span><h3>Product foundation</h3><p>Define the opportunity, reduce uncertainty and leave with a validated direction, architecture and delivery plan.</p></article>
                <article><span>02</span><h3>End-to-end build</h3><p>A focused product team takes your software from discovery through design, engineering and launch.</p></article>
                <article><span>03</span><h3>Continuous evolution</h3><p>Long-term product and engineering support for improvements, new capabilities and responsible scaling.</p></article>
            </div>
        </div></section>
        <FinalCta />
    </>;
}
