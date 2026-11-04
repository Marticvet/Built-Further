import ScrollToTopLink from "./ScrollToTopLink";
import { localePath, type Locale } from "@/i18n/config";

type BrandProps = { locale: Locale; name: string; ariaLabel: string; inverse?: boolean; compact?: boolean };

export default function Brand({ locale, name, ariaLabel, inverse = false, compact = false }: BrandProps) {
    return (
        <ScrollToTopLink className={`siteBrand ${inverse ? "siteBrandInverse" : ""}`} href={`${localePath(locale)}#top`} aria-label={ariaLabel}>
            <span className="siteBrandMark" aria-hidden="true"><i /><i /><i /></span>
            {!compact && <span>{name}</span>}
        </ScrollToTopLink>
    );
}
