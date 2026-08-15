import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { lang } = await params; if (!hasLocale(lang)) return {}; const { process } = await getDictionary(lang); return localizedMetadata(lang, "/process", process.meta.title, process.meta.description); }

export default async function ProcessPage({ params }: Props) {
    const { lang } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang);
    return <><PageHero eyebrow={t.process.hero.eyebrow} title={t.process.hero.title} intro={t.process.hero.description} action={{ label: t.process.hero.action, href: localePath(lang, "/contact") }}><div className={styles.heroIndex}>{t.process.steps.map((step, index) => <span key={step.title}>{String(index + 1).padStart(2, "0")} · {step.title}</span>)}</div></PageHero>
        <section className={styles.section}><div className="siteContainer"><div className={styles.heading}><div><p className="sectionEyebrow">{t.process.overview.eyebrow}</p><h2>{t.process.overview.titleLine1}<br />{t.process.overview.titleLine2}</h2></div><p>{t.process.overview.description}</p></div><div className={styles.stepsDetailed}>{t.process.steps.map((step, index) => <article className={styles.stepRow} key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{step.title}</h2><p>{step.description}</p></div><ul>{step.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
