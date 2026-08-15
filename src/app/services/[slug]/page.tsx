import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { services } from "@/data/site";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = services.find((item) => item.slug === slug);
    return service ? { title: service.title, description: service.description } : {};
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const service = services.find((item) => item.slug === slug);
    if (!service) notFound();
    return <>
        <PageHero eyebrow="Service" title={service.title} intro={service.description} action={{ label: "Discuss your project", href: "/contact" }} />
        <section className={styles.section}><div className="siteContainer">
            <div className={styles.detailIntro}><h2>Built for the job it needs to do—and the future it needs to support.</h2><p>{service.detail}</p></div>
            <div className={styles.deliverables}>{service.deliverables.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></div>)}</div>
        </div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className={`siteContainer ${styles.split}`}>
            <h2>One team across product and technology.</h2>
            <div className={styles.splitText}><p>We start with the decision the software needs to improve, then work outward into the experience, data, integrations and technical foundation.</p><p>You get a clear delivery path, visible trade-offs and maintainable work that can be understood by the team who will own it next.</p></div>
        </div></section>
        <FinalCta />
    </>;
}
