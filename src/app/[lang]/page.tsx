import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseVisual from "@/components/CaseVisual";
import FinalCta from "@/components/FinalCta";
import HeroDashboard from "@/components/HeroDashboard";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../scss/home/home.module.scss";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const { home } = await getDictionary(lang);
    return { ...localizedMetadata(lang, "", home.meta.title, home.meta.description), title: { absolute: home.meta.title } };
}

export default async function Home({ params }: Props) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const t = await getDictionary(lang);
    return <>
        <section className={styles.hero}><div className={styles.heroInner}>
            <div className={styles.copy}>
                <p className={styles.eyebrow}><span aria-hidden="true" />{t.home.hero.eyebrow}</p>
                <h1>{t.home.hero.titleLine1}<br />{t.home.hero.titleLine2} <em>{t.home.hero.titleAccent}</em></h1>
                <p className={styles.intro}>{t.home.hero.description}</p>
                <div className={styles.actions}><Link className={styles.primaryAction} href={localePath(lang, "/contact")}>{t.common.nav.startProject} <span aria-hidden="true">→</span></Link><Link className={styles.secondaryAction} href={localePath(lang, "/work")}>{t.common.actions.viewWork} <span aria-hidden="true">→</span></Link></div>
                <div className={styles.proof}>{t.home.hero.proof.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <HeroDashboard t={t.home.dashboard} accessibility={t.common.accessibility} />
        </div></section>

        <section className={styles.trustStrip} aria-label={t.home.services.eyebrow}><div className="siteContainer">{t.home.capabilities.map((item) => <span key={item}>{item}</span>)}</div></section>

        <section className={styles.servicesSection}><div className="siteContainer">
            <div className={styles.sectionHeading}><div><p className="sectionEyebrow">{t.home.services.eyebrow}</p><h2>{t.home.services.titleLine1}<br />{t.home.services.titleLine2}</h2></div><p>{t.home.services.description}</p></div>
            <div className={styles.serviceGrid}>{t.services.items.map((service, index) => <Link className={`${styles.serviceCard} ${index === 3 ? styles.serviceFeatured : ""}`} href={localePath(lang, `/services/${service.slug}`)} key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.description}</p><b>{t.common.actions.exploreService} <i aria-hidden="true">→</i></b></Link>)}</div>
            <Link className="darkButton" href={localePath(lang, "/services")}>{t.common.actions.exploreServices} <span aria-hidden="true">→</span></Link>
        </div></section>

        <section className={styles.workSection}><div className="siteContainer">
            <div className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}><div><p className="sectionEyebrow sectionEyebrowLight">{t.home.work.eyebrow}</p><h2>{t.home.work.titleLine1}<br />{t.home.work.titleLine2}</h2></div><Link className="textLink" href={localePath(lang, "/work")}>{t.common.actions.seeAllWork} <span aria-hidden="true">→</span></Link></div>
            <div className={styles.workGrid}>{t.work.projects.map((project) => <article className={styles.workCard} key={project.slug}><CaseVisual theme={project.theme} name={project.name} previewLabel={t.common.accessibility.productPreview} /><p className={styles.workType}>{project.type}</p><h3>{project.name}</h3><p>{project.description}</p><div className={styles.tags}>{project.services.map((service) => <span key={service}>{service}</span>)}</div><Link href={localePath(lang, `/work/${project.slug}`)}>{t.common.actions.viewCaseStudy} <span aria-hidden="true">→</span></Link></article>)}</div>
        </div></section>

        <section className={styles.principlesSection}><div className="siteContainer">
            <div className={styles.sectionHeading}><div><p className="sectionEyebrow">{t.home.principles.eyebrow}</p><h2>{t.home.principles.titleLine1}<br />{t.home.principles.titleLine2}</h2></div><p>{t.home.principles.description}</p></div>
            <div className={styles.principlesGrid}>{t.about.principles.map((principle, index) => <article key={principle.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div>
        </div></section>

        <section className={styles.processSection}><div className="siteContainer">
            <div className={styles.sectionHeading}><div><p className="sectionEyebrow">{t.home.process.eyebrow}</p><h2>{t.home.process.title}</h2></div><Link className="textLink" href={localePath(lang, "/process")}>{t.common.actions.seeProcess} <span aria-hidden="true">→</span></Link></div>
            <div className={styles.processLine}>{t.process.steps.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><ul>{step.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </div></section>

        <section className={styles.technologySection}><div className="siteContainer">
            <div className={styles.techIntro}><p className="sectionEyebrow">{t.home.technology.eyebrow}</p><h2>{t.home.technology.titleLine1}<br />{t.home.technology.titleLine2}</h2><p>{t.home.technology.description}</p></div>
            <div className={styles.techGroups}>{t.home.technology.groups.map((group) => <div key={group.category}><h3>{group.category}</h3>{group.items.map((item) => <span key={item}>{item}</span>)}</div>)}</div>
        </div></section>

        <section className={styles.partnershipSection}><div className="siteContainer"><p className="sectionEyebrow">{t.home.partnership.eyebrow}</p><blockquote>“{t.home.partnership.quoteLine1}<br />{t.home.partnership.quoteLine2}”</blockquote><p>{t.home.partnership.description}</p><Link className="textLink" href={localePath(lang, "/about")}>{t.common.actions.whyUs} <span aria-hidden="true">→</span></Link></div></section>
        <FinalCta locale={lang} t={t.common} />
    </>;
}
