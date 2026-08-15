import Link from "next/link";
import { lang } from "next/root-params";
import { common as en } from "@/i18n/locales/en/common";
import { common as bg } from "@/i18n/locales/bg/common";
import { common as de } from "@/i18n/locales/de/common";
import { hasLocale, localePath } from "@/i18n/config";

const dictionaries = { en, bg, de };

export default async function NotFound() {
    const routeLocale = await lang();
    const locale = routeLocale && hasLocale(routeLocale) ? routeLocale : "en";
    const t = dictionaries[locale];
    return <section className="notFoundPage"><div className="notFoundCode" aria-hidden="true">404</div><div className="siteContainer notFoundContent"><div className="notFoundCopy"><p className="sectionEyebrow">{t.notFound.eyebrow}</p><h1>{t.notFound.title}</h1><p>{t.notFound.description}</p><Link className="darkButton" href={localePath(locale)}>{t.notFound.action} <span aria-hidden="true">→</span></Link></div></div></section>;
}
