import Link from "next/link";
import Brand from "./Brand";

const serviceLinks = [["SaaS platforms", "/services/saas-platforms"], ["Web applications", "/services/web-applications"], ["Mobile applications", "/services/mobile-applications"], ["Business systems", "/services/business-systems"]] as const;
const exploreLinks = [["Work", "/work"], ["Process", "/process"], ["About", "/about"], ["Contact", "/contact"]] as const;

export default function Footer() {
    return (
        <footer className="footer">
            <div className="siteContainer footerGrid">
                <div className="footerBrand"><Brand inverse /><p>Software products engineered<br />for what comes next.</p></div>
                <div className="footerColumn"><h3>Services</h3>{serviceLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
                <div className="footerColumn"><h3>Explore</h3>{exploreLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
                <div className="footerColumn footerContact"><h3>Start something</h3><Link href="/contact">Tell us about your project <span>→</span></Link><p>Europe · Working globally</p></div>
            </div>
            <div className="siteContainer footerBottom"><span>© {new Date().getFullYear()} Built Further</span><span>Built with intent. Engineered to last.</span></div>
        </footer>
    );
}
