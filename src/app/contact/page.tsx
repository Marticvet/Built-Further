import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import styles from "../../scss/pages/pages.module.scss";

export const metadata: Metadata = { title: "Contact", description: "Tell Built Further about the software product, platform or business system you want to build." };

export default function ContactPage() {
    return <>
        <PageHero dark eyebrow="Start a project" title="Tell us what you're building." intro="Share the opportunity, the problem or even the rough idea. We'll help you make sense of the next useful step." />
        <section className={styles.section}><div className={`siteContainer ${styles.contactGrid}`}>
            <aside className={styles.contactAside}><h2>A useful first conversation.</h2><p>You don&apos;t need a finished specification. A little context about the business, the users and where you are today is enough to begin.</p><div className={styles.contactDirect}><span>Prefer email?</span><a href="mailto:hello@builtfurther.com">hello@builtfurther.com</a></div><div className={styles.contactDirect}><span>Location</span><p>Europe · Working globally</p></div></aside>
            <form className={styles.contactForm} action="mailto:hello@builtfurther.com" method="post" encType="text/plain">
                <div className={styles.field}><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required /></div>
                <div className={styles.field}><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
                <div className={styles.field}><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" /></div>
                <div className={styles.field}><label htmlFor="project-type">What are you building?</label><select id="project-type" name="project-type" defaultValue=""><option value="" disabled>Select one</option><option>SaaS platform</option><option>Web application</option><option>Mobile application</option><option>Business system</option><option>Modernisation</option><option>Something else</option></select></div>
                <div className={`${styles.field} ${styles.fieldFull}`}><label htmlFor="message">A little about the project</label><textarea id="message" name="message" placeholder="What are you trying to achieve? Where are you today?" required /></div>
                <button className="darkButton" type="submit">Send project brief <span>→</span></button>
            </form>
        </div></section>
    </>;
}
