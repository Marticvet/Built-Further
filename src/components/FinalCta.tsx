import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/get-dictionary";

export default function FinalCta({ locale, t }: { locale: Locale; t: CommonDictionary }) {
    return (
        <section className="finalCta">
            <div className="siteContainer finalCtaInner">
                <p className="sectionEyebrow sectionEyebrowLight">{t.finalCta.eyebrow}</p>
                <h2>{t.finalCta.titleLine1}<br />{t.finalCta.titleLine2}</h2>
                <div><p>{t.finalCta.prompt} <em>{t.finalCta.accent}</em></p><Link className="lightButton" href={localePath(locale, "/contact")}>{t.actions.discussProject} <span aria-hidden="true">→</span></Link></div>
                <small>{t.finalCta.note}</small>
            </div>
        </section>
    );
}
