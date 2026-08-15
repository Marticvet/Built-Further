import Link from "next/link";
import styles from "../scss/pages/pages.module.scss";

type PageHeroProps = {
    eyebrow: string;
    title: string;
    intro: string;
    action?: { label: string; href: string };
    dark?: boolean;
    children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, intro, action, dark = false, children }: PageHeroProps) {
    return (
        <section className={`${styles.pageHero} ${dark ? styles.pageHeroDark : ""} ${children ? "" : styles.pageHeroSolo}`}>
            <div className="siteContainer">
                <div className={styles.pageHeroCopy}>
                    <p className={`sectionEyebrow ${dark ? "sectionEyebrowLight" : ""}`}>{eyebrow}</p>
                    <h1>{title}</h1>
                    <p>{intro}</p>
                    {action && <Link className={dark ? "lightButton" : "darkButton"} href={action.href}>{action.label} <span>→</span></Link>}
                </div>
                {children && <div className={styles.pageHeroVisual}>{children}</div>}
            </div>
        </section>
    );
}
