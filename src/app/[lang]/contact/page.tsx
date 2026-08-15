import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { contactEmail } from "@/config/contact";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localePath } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { lang } = await params; if (!hasLocale(lang)) return {}; const { contact } = await getDictionary(lang); return localizedMetadata(lang, "/contact", contact.meta.title, contact.meta.description); }

export default async function ContactPage({ params }: Props) {
    const { lang } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang);
    return <><PageHero dark eyebrow={t.contact.hero.eyebrow} title={t.contact.hero.title} intro={t.contact.hero.description} action={{ label: t.common.actions.bookCall, href: localePath(lang, "/book") }} />
        <section className={styles.section}><div className={`siteContainer ${styles.contactGrid}`}><aside className={styles.contactAside}><h2>{t.contact.aside.title}</h2><p>{t.contact.aside.description}</p><div className={styles.contactDirect}><span>{t.contact.aside.emailLabel}</span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div><div className={styles.contactDirect}><span>{t.contact.aside.locationLabel}</span><p>{t.contact.aside.location}</p></div></aside><ContactForm t={t.contact.form} submitLabel={t.common.actions.sendBrief} locale={lang} /></div></section>
    </>;
}
