import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { legalOperator } from "@/config/legal";
import PageHero from "@/components/PageHero";
import styles from "@/scss/legal/legal.module.scss";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() { return [{ lang: "de" }]; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (lang !== "de") return {};
    return { title: "Impressum", description: "Anbieterkennzeichnung von Built Further.", alternates: { canonical: "/de/impressum" }, robots: { index: false, follow: false } };
}

export default async function ImpressumPage({ params }: Props) {
    const { lang } = await params;
    if (lang !== "de") notFound();
    return <>
        <PageHero dark eyebrow="Built Further · Rechtliches" title="Impressum" intro="Angaben zur Anbieterkennzeichnung nach § 5 DDG." />
        <section className={styles.legalSection}>
            <div className={`siteContainer ${styles.singleColumn}`}>
                <article className={styles.document}>
                    <div className={styles.reviewNotice} role="status"><strong>Prüfung vor Veröffentlichung</strong><p>Die Anbieterangaben und Kontaktwege sind bestätigt. Die Prüfung einer gegebenenfalls erforderlichen Information zur Verbraucherstreitbeilegung steht noch aus. Die abgeschaltete EU-Online-Streitbeilegungsplattform wird nicht verlinkt.</p></div>
                    <section className={styles.documentSection}><h2>Angaben gemäß § 5 DDG</h2><p>{legalOperator.name}<br />handelnd unter {legalOperator.businessName}<br />{legalOperator.streetAddress}<br />{legalOperator.postalCode} {legalOperator.city}<br />{legalOperator.countryGerman}</p></section>
                    <section className={styles.documentSection}><h2>Kontakt</h2><p>E-Mail: <a className={styles.emailLink} href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a></p><p>Sie erreichen uns außerdem über das <Link className={styles.emailLink} href="/de/contact">Kontaktformular</Link> auf dieser Website. Eine Telefonnummer wird nicht veröffentlicht.</p></section>
                    <section className={styles.documentSection}><h2>Handelsregister</h2><p>{legalOperator.commercialRegister}.</p></section>
                </article>
            </div>
        </section>
    </>;
}
