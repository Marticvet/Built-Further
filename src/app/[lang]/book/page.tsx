import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppointmentForm from "@/components/AppointmentForm";
import PageHero from "@/components/PageHero";
import { contactEmail } from "@/config/contact";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import styles from "../../../scss/pages/pages.module.scss";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const { book } = await getDictionary(lang);
    return localizedMetadata(lang, "/book", book.meta.title, book.meta.description);
}

export default async function BookPage({ params }: Props) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const t = await getDictionary(lang);

    return <>
        <PageHero eyebrow={t.book.hero.eyebrow} title={t.book.hero.title} intro={t.book.hero.description} />
        <section className={styles.section}>
            <div className={`siteContainer ${styles.contactGrid}`}>
                <aside className={styles.contactAside}>
                    <h2>{t.book.aside.title}</h2>
                    <p>{t.book.aside.description}</p>
                    <ul className={styles.bookingPoints}>{t.book.aside.points.map((point) => <li key={point}>{point}</li>)}</ul>
                    <p className={styles.bookingNote}>{t.book.aside.note}</p>
                    <div className={styles.contactDirect}><span>{t.book.aside.emailLabel}</span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
                </aside>
                <AppointmentForm t={t.book.form} locale={lang} />
            </div>
        </section>
    </>;
}
