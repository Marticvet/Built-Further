import Link from "next/link";
import Brand from "./Brand";
import styles from "../scss/navbar/navbar.module.scss";

const links = [["Home", "/"], ["Services", "/services"], ["Work", "/work"], ["Process", "/process"], ["About", "/about"]] as const;

export default function Navbar() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar} aria-label="Main navigation">
                <Brand />
                <div className={styles.navigationLinks}>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
                <Link className={styles.startProject} href="/contact">Start a project <span aria-hidden="true">→</span></Link>
                <details className={styles.mobileMenu}>
                    <summary aria-label="Open navigation"><span /><span /></summary>
                    <div>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact">Contact</Link></div>
                </details>
            </nav>
        </header>
    );
}
