import Link from "next/link";
import type { CaseSlug } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/get-dictionary";
import { isPublicHttpsUrl, projectLinks } from "@/config/project-links";

type ActionLabels = Pick<CommonDictionary["actions"], "viewCaseStudy" | "visitWebsite" | "openLiveDemo" | "inDevelopment" | "appStore" | "googlePlay">;

type Props = {
    slug: CaseSlug;
    labels: ActionLabels;
    caseStudyHref?: string;
    className?: string;
    liveClassName?: string;
    caseStudyClassName?: string;
    statusClassName?: string;
};

export default function ProjectActions({ slug, labels, caseStudyHref, className, liveClassName, caseStudyClassName, statusClassName }: Props) {
    const links = projectLinks[slug];
    const liveUrl = links?.liveUrl;
    const appStoreUrl = links?.appStoreUrl;
    const googlePlayUrl = links?.googlePlayUrl;
    const liveLabel = slug === "tire-shop" ? labels.openLiveDemo : labels.visitWebsite;
    const hasLinks = Boolean(caseStudyHref || isPublicHttpsUrl(liveUrl) || isPublicHttpsUrl(appStoreUrl) || isPublicHttpsUrl(googlePlayUrl));

    if (!hasLinks && links?.projectStatus !== "in-development") return null;

    return <div className={className}>
        {links?.projectStatus === "in-development" ? <span className={statusClassName}>{labels.inDevelopment}</span> : null}
        {isPublicHttpsUrl(liveUrl) ? <a className={liveClassName} href={liveUrl} target="_blank" rel="noopener noreferrer">{liveLabel} <span aria-hidden="true">↗</span></a> : null}
        {isPublicHttpsUrl(appStoreUrl) ? <a className={liveClassName} href={appStoreUrl} target="_blank" rel="noopener noreferrer">{labels.appStore} <span aria-hidden="true">↗</span></a> : null}
        {isPublicHttpsUrl(googlePlayUrl) ? <a className={liveClassName} href={googlePlayUrl} target="_blank" rel="noopener noreferrer">{labels.googlePlay} <span aria-hidden="true">↗</span></a> : null}
        {caseStudyHref ? <Link className={caseStudyClassName} href={caseStudyHref}>{labels.viewCaseStudy} <span aria-hidden="true">→</span></Link> : null}
    </div>;
}
