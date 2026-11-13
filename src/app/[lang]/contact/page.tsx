import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { contactEmail } from "@/config/contact";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { lang } = await params; if (!hasLocale(lang)) return {}; const { contact } = await getDictionary(lang); return localizedMetadata(lang, "/contact", contact.meta.title, contact.meta.description); }

export default async function ContactPage({ params }: Props) {
    const { lang } = await params; if (!hasLocale(lang)) notFound(); const t = await getDictionary(lang);
    return <section className={styles.contactPage}><div className={`siteContainer ${styles.contactGrid}`}><div className={`${styles.contactAside} ${styles.contactIntro}`}><p className="sectionEyebrow">{t.contact.hero.eyebrow}</p><h1>{t.contact.hero.title}</h1><p>{t.contact.hero.description}</p></div><ContactForm t={t.contact.form} submitLabel={t.common.actions.sendBrief} locale={lang} /><aside className={`${styles.contactAside} ${styles.contactSupport}`}><div className={styles.contactDirect}><span>{t.contact.aside.emailLabel}</span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div><div className={styles.contactDirect}><span>{t.contact.aside.locationLabel}</span><p>{t.contact.aside.location}</p></div><div className={styles.contactNext}><h2>{t.contact.aside.nextTitle}</h2><p>{t.contact.aside.nextDescription}</p></div></aside></div></section>;
}
