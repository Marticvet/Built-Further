import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { lang } = await params; if (!hasLocale(lang)) return {}; const { about } = await getDictionary(lang); return localizedMetadata(lang, "/about", about.meta.title, about.meta.description); }

export default async function AboutPage({ params }: Props) {
    const { lang } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang);
    return <><PageHero eyebrow={t.about.hero.eyebrow} title={t.about.hero.title} intro={t.about.hero.description} action={{ label: t.about.hero.action, href: localePath(lang, "/contact") }} />
        <section className={styles.section}><div className={`siteContainer ${styles.split}`}><h2>{t.about.intro.titleLine1}<br />{t.about.intro.titleLine2}</h2><div className={styles.splitText}><p>{t.about.intro.paragraph1}</p><p>{t.about.intro.paragraph2}</p><div className={styles.beliefs}>{t.about.intro.beliefs.map((belief) => <span key={belief}>{belief}</span>)}</div></div></div></section>
        <section className={`${styles.section} ${styles.sectionWash}`}><div className="siteContainer"><div className={styles.heading}><div><p className="sectionEyebrow">{t.about.principlesIntro.eyebrow}</p><h2>{t.about.principlesIntro.titleLine1}<br />{t.about.principlesIntro.titleLine2}</h2></div><p>{t.about.principlesIntro.description}</p></div><div className={styles.principleRows}>{t.about.principles.map((principle, index) => <article key={principle.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{principle.title}</h2><p>{principle.description}</p></article>)}</div></div></section>
        <FinalCta locale={lang} t={t.common} /></>;
}
