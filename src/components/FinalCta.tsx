import Link from "next/link";

export default function FinalCta() {
    return (
        <section className="finalCta">
            <div className="siteContainer finalCtaInner">
                <p className="sectionEyebrow sectionEyebrowLight">Start a conversation</p>
                <h2>Have something worth<br />building properly?</h2>
                <div>
                    <p>Let&apos;s build it <em>further.</em></p>
                    <Link className="lightButton" href="/contact">Discuss your project <span aria-hidden="true">→</span></Link>
                </div>
                <small>No obligation. Tell us what you&apos;re building and we&apos;ll tell you how we&apos;d approach it.</small>
            </div>
        </section>
    );
}
