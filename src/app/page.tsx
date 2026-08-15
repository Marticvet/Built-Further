import Link from "next/link";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import HeroDashboard from "@/components/HeroDashboard";
import { caseStudies, principles, processSteps, services, technologies } from "@/data/site";
import styles from "../scss/home/home.module.scss";

const capabilities = ["Web Platforms", "SaaS Products", "Mobile Apps", "Business Systems", "Cloud Engineering"];

export default function Home() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.copy}>
                        <p className={styles.eyebrow}><span aria-hidden="true" />Custom software development</p>
                        <h1>Software products<br />engineered to <em>last.</em></h1>
                        <p className={styles.intro}>Custom software, SaaS platforms and digital products designed around your business — and engineered for long-term growth.</p>
                        <div className={styles.actions}>
                            <Link className={styles.primaryAction} href="/contact">Start a project <span aria-hidden="true">→</span></Link>
                            <Link className={styles.secondaryAction} href="/work">View our work <span aria-hidden="true">→</span></Link>
                        </div>
                        <div className={styles.proof}><span>Strategy-led</span><span>Built to scale</span><span>Long-term partners</span></div>
                    </div>
                    <HeroDashboard />
                </div>
            </section>

            <section className={styles.trustStrip} aria-label="Our capabilities">
                <div className="siteContainer">{capabilities.map((item) => <span key={item}>{item}</span>)}</div>
            </section>

            <section className={styles.servicesSection}>
                <div className="siteContainer">
                    <div className={styles.sectionHeading}>
                        <div><p className="sectionEyebrow">What we build</p><h2>Software built around<br />the business behind it.</h2></div>
                        <p>Products that solve the right problem today without creating a bigger one tomorrow.</p>
                    </div>
                    <div className={styles.serviceGrid}>
                        {services.map((service, index) => (
                            <Link className={`${styles.serviceCard} ${index === 3 ? styles.serviceFeatured : ""}`} href={`/services/${service.slug}`} key={service.slug}>
                                <span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.description}</p><b>Explore service <i>→</i></b>
                            </Link>
                        ))}
                    </div>
                    <Link className="darkButton" href="/services">Explore all services <span>→</span></Link>
                </div>
            </section>

            <section className={styles.workSection}>
                <div className="siteContainer">
                    <div className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}>
                        <div><p className="sectionEyebrow sectionEyebrowLight">Product profiles</p><h2>Products designed<br />to go further.</h2></div>
                        <Link className="textLink" href="/work">See all work <span>→</span></Link>
                    </div>
                    <div className={styles.workGrid}>
                        {caseStudies.map((project) => (
                            <article className={styles.workCard} key={project.slug}>
                                <CaseVisual theme={project.theme} name={project.name} />
                                <p className={styles.workType}>{project.type}</p><h3>{project.name}</h3><p>{project.description}</p>
                                <div className={styles.tags}>{project.services.map((service) => <span key={service}>{service}</span>)}</div>
                                <Link href={`/work/${project.slug}`}>View case study <span>→</span></Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.principlesSection}>
                <div className="siteContainer">
                    <div className={styles.sectionHeading}>
                        <div><p className="sectionEyebrow">Why Built Further</p><h2>Built for what<br />comes next.</h2></div>
                        <p>Software should create options for the future, not limit them. These principles shape every decision we make.</p>
                    </div>
                    <div className={styles.principlesGrid}>{principles.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
                </div>
            </section>

            <section className={styles.processSection}>
                <div className="siteContainer">
                    <div className={styles.sectionHeading}><div><p className="sectionEyebrow">Our process</p><h2>From idea to production.</h2></div><Link className="textLink" href="/process">See how we work <span>→</span></Link></div>
                    <div className={styles.processLine}>{processSteps.map(([title, details], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul></article>)}</div>
                </div>
            </section>

            <section className={styles.technologySection}>
                <div className="siteContainer">
                    <div className={styles.techIntro}><p className="sectionEyebrow">Technologies</p><h2>Modern tools.<br />Chosen with purpose.</h2><p>We choose technology for product fit, maintainability and the team that will own it—not because it is fashionable.</p></div>
                    <div className={styles.techGroups}>{technologies.map(([category, items]) => <div key={category}><h3>{category}</h3>{items.map((item) => <span key={item}>{item}</span>)}</div>)}</div>
                </div>
            </section>

            <section className={styles.partnershipSection}>
                <div className="siteContainer"><p className="sectionEyebrow">A product-first partnership</p><blockquote>“Understand the product,<br />not just the specification.”</blockquote><p>We work beside your team to challenge assumptions, make trade-offs visible and keep every technical decision connected to the business.</p><Link className="textLink" href="/about">Why work with us <span>→</span></Link></div>
            </section>
            <FinalCta />
        </>
    );
}
