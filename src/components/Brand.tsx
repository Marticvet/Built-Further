import Link from "next/link";

type BrandProps = { inverse?: boolean; compact?: boolean };

export default function Brand({ inverse = false, compact = false }: BrandProps) {
    return (
        <Link className={`siteBrand ${inverse ? "siteBrandInverse" : ""}`} href="/" aria-label="Built Further home">
            <span className="siteBrandMark" aria-hidden="true"><i /><i /><i /></span>
            {!compact && <span>Built Further</span>}
        </Link>
    );
}
