import Link from "next/link";
import { legalOperator } from "@/config/legal";
import PageHero from "./PageHero";
import styles from "../scss/legal/legal.module.scss";

type Section = {
    id: string;
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    ordered?: boolean;
};

type Document = {
    eyebrow: string;
    title: string;
    intro: string;
    reviewed: string;
    publicationNote: string;
    sections: Section[];
};

const links = [
    ["Privacy Policy", "/en/autocare/privacy"],
    ["Terms of Use", "/en/autocare/terms"],
    ["Support", "/en/autocare/support"],
] as const;

const documents: Record<"privacy" | "terms", Document> = {
    privacy: {
        eyebrow: "AutoCare Hub · Legal",
        title: "Privacy Policy",
        intro: "How AutoCare Hub processes account and vehicle information when you use the mobile application.",
        reviewed: "Last reviewed against the current iOS release source on 5 November 2026.",
        publicationNote: "The controller identity and contact details below are confirmed. Provider-specific retention periods, final processing regions, transfer safeguards and the legal-basis mapping still require verification before deployment.",
        sections: [
            {
                id: "scope-controller",
                title: "1. Scope and controller",
                paragraphs: [
                    `This notice covers the AutoCare Hub mobile application and the related support service. The controller is ${legalOperator.name}, trading as ${legalOperator.businessName}, an ${legalOperator.legalForm} (sole proprietorship), ${legalOperator.streetAddress}, ${legalOperator.postalCode} ${legalOperator.city}, ${legalOperator.country}. For privacy questions or requests, contact ${legalOperator.email}.`,
                    "AutoCare Hub is a vehicle and expense-management service. It is not a driving-safety, mechanical, insurance, tax or legal-advice service.",
                ],
            },
            {
                id: "data",
                title: "2. Information the app processes",
                paragraphs: ["The information processed depends on the features you choose to use."],
                bullets: [
                    "Account data, including your email address, account identifier and any profile details you choose to provide, such as a name, username or telephone number.",
                    "Vehicle and garage data, including vehicle details, mileage, vehicle-identification information where entered, expenses, fuel or charging entries, service and insurance records, reminders, trips, budgets, checklists and reports.",
                    "Documents and images you choose to add, such as receipts and vehicle documents. The app can select a file or capture a document image when you request it.",
                    "Shared-garage information, including invitations, membership and the records made available to authorized Family members.",
                    "Optional foreground location data when you choose to attach a location to an expense or use nearby-services features. The release configuration does not request background-location access.",
                    "Subscription and entitlement data, including the store product, purchase or renewal status and identifiers needed to associate an Apple purchase with your AutoCare account.",
                    "Technical and security data needed to provide the service, such as authentication/session information and provider-side network or error records. The exact provider logging configuration and retention remain to be confirmed before publication.",
                ],
            },
            {
                id: "purposes-bases",
                title: "3. Why we process information",
                paragraphs: [
                    "We process the information above to create and secure accounts; record, display and synchronize vehicle information; provide optional sharing, reminders, documents, exports and nearby-services features; determine paid-feature access; respond to support requests; prevent misuse; and meet legal obligations.",
                    "The intended legal bases are performance of a contract, our legitimate interests in operating and securing the service, consent for device permissions and other optional processing, and legal obligations where applicable. The final mapping of processing purposes to legal bases requires owner and legal review before publication.",
                ],
            },
            {
                id: "sharing",
                title: "4. Recipients and optional features",
                paragraphs: ["The current release source evidences the following processors or recipients where the relevant feature is used:"],
                bullets: [
                    "Supabase for authentication, database, storage and server-side functions.",
                    "PowerSync for local-first synchronization of authorized account data.",
                    "RevenueCat and Apple for subscription entitlement and App Store purchase handling. AutoCare Hub does not collect payment-card details for Apple purchases.",
                    "Google Maps and Places for an optional, user-requested nearby-services or address-search feature.",
                    "People you authorize in a Family garage, for the records shared through that garage’s access controls.",
                ],
            },
            {
                id: "not-enabled",
                title: "5. Functionality not included in this release",
                paragraphs: [
                    "Receipt OCR, scheduled-report delivery and Fleet billing are release-feature flags and are disabled for the initial iOS release. No OCR provider or OCR data flow is described in this draft. The release review also found no advertising, analytics or crash-reporting SDK integration to describe as an AutoCare Hub feature. Provider-side operational logging still needs confirmation before publication.",
                ],
            },
            {
                id: "retention",
                title: "6. Retention, export and deletion",
                paragraphs: [
                    "The app provides an account-data export in Settings and an in-app account-deletion flow. The deletion flow requires an online connection and warns about pending local uploads before deletion proceeds.",
                    "The flow removes the AutoCare cloud account and owned document-storage objects, then clears local-first data from the device. It also sends a separate RevenueCat customer-deletion request for the same AutoCare account identifier. RevenueCat processes that request asynchronously; a successful request is not an immediate confirmation of completion. If a temporary RevenueCat failure occurs, the app retains a server-side deletion request for retry. Deleting an AutoCare account does not cancel an Apple subscription; manage or cancel Apple billing in your Apple Account subscription settings.",
                    "The verified Supabase plan is Free: do not treat it as providing managed daily backups. We have not verified any separate manual export or backup, its location, or its deletion period. Provider records and any backups may therefore remain subject to separate, unconfirmed retention periods. The final retention schedule must be approved before publication.",
                ],
            },
            {
                id: "transfers-rights",
                title: "7. International transfers and your rights",
                paragraphs: [
                    "Service providers may process information in locations outside your country. The production provider regions and any transfer safeguards, including the applicable contractual mechanism, must be confirmed before publication.",
                    "Depending on applicable law, you may have rights to request access, correction, deletion, restriction, objection or portability, to withdraw consent where processing relies on it, and to complain to a data-protection authority. A verified privacy contact and identity-verification process must be approved before these requests can be handled through this notice.",
                ],
            },
            {
                id: "changes",
                title: "8. Changes to this notice",
                paragraphs: ["Any approved public version will show an effective date and will be updated if the service or applicable law changes. Material changes will be communicated when required by law."],
            },
        ],
    },
    terms: {
        eyebrow: "AutoCare Hub · Legal",
        title: "Terms of Use",
        intro: "The proposed consumer-facing terms for using AutoCare Hub and its account-based vehicle-management features.",
        reviewed: "Last reviewed against the current iOS release source on 5 November 2026.",
        publicationNote: "The provider identity and support contact below are confirmed. The final governing-law, liability and consumer-dispute wording still requires legal review before deployment.",
        sections: [
            {
                id: "provider-acceptance",
                title: "1. Provider and acceptance",
                paragraphs: [
                    `AutoCare Hub is provided by ${legalOperator.name}, trading as ${legalOperator.businessName}, an ${legalOperator.legalForm} (sole proprietorship), ${legalOperator.streetAddress}, ${legalOperator.postalCode} ${legalOperator.city}, ${legalOperator.country}. Questions about these Terms can be sent to ${legalOperator.email}.`,
                    "By creating an account or using the service, you agree to the approved version of these Terms and the Privacy Policy. If you do not agree, do not use the service.",
                ],
            },
            {
                id: "accounts-use",
                title: "2. Accounts and responsible use",
                paragraphs: [
                    "You must provide accurate account information, keep your credentials confidential and use the service lawfully. You are responsible for the vehicle, expense and document information you provide and for having the right to share it.",
                    "Do not interfere with the service, attempt unauthorized access, upload unlawful content, use the service to harm others or circumvent access controls. Vehicle records and reminders are organizational tools only; you remain responsible for vehicle safety, maintenance, insurance and legal compliance.",
                ],
            },
            {
                id: "plans",
                title: "3. Free, Plus and Family",
                paragraphs: [
                    "The app may offer Free, Plus and Family access. The current release source uses paid entitlements for premium features and sharing. Feature availability can vary by plan and the app shows the applicable offering before purchase.",
                    "AutoCare Family can share an eligible garage with up to six total members, including the owner. The owner is responsible for invitations and should remove a member’s access when it is no longer appropriate. Fleet is disabled for the initial iOS release and is not offered under these Terms.",
                ],
            },
            {
                id: "subscriptions",
                title: "4. App Store subscriptions",
                paragraphs: [
                    "Plus and Family subscriptions may be offered on monthly and annual auto-renewing terms. Product availability, price, billing period, taxes and any trial terms are shown in the Apple App Store before you confirm a purchase; this draft does not promise any particular price, trial or discount.",
                    "Apple handles billing for iOS purchases. You can manage or cancel an Apple subscription through your Apple Account subscription settings, subject to Apple’s rules. Restore Purchases is available in the app for eligible purchases. Refund requests are handled under Apple’s policies, except where mandatory law provides otherwise.",
                    "If a paid entitlement expires or is no longer active, access to paid features and shared-garage capabilities may end or be limited. Your account and any available Free functionality are governed by the then-current access rules and applicable law.",
                ],
            },
            {
                id: "content",
                title: "5. Your content and our intellectual property",
                paragraphs: [
                    "You keep your rights in content you provide. You grant the limited permissions needed to host, synchronize, back up, display and process that content to operate the service and its requested features.",
                    "AutoCare Hub, its software and its brand are protected by applicable intellectual-property law. These Terms do not transfer ownership of the service to you. Apple’s applicable App Store terms and standard end-user license terms apply alongside these Terms where required and take precedence to the extent they conflict.",
                ],
            },
            {
                id: "availability",
                title: "6. Availability, changes and liability",
                paragraphs: [
                    "We may maintain, update, suspend or change the service when reasonably necessary for security, legal, operational or technical reasons. We do not promise uninterrupted availability or a particular outcome from vehicle data, reminders or reports.",
                    "Nothing in these Terms excludes or limits liability, warranties or consumer rights that cannot lawfully be excluded or limited. The final liability, governing-law and consumer-dispute wording remains subject to legal review before deployment.",
                ],
            },
            {
                id: "ending",
                title: "7. Ending use and changes to these Terms",
                paragraphs: [
                    "You can stop using the service at any time and can request permanent account deletion from Settings. We may suspend or end access for a material breach, misuse, security risk or legal necessity, subject to applicable law.",
                    "An approved public version will show its effective date. If the Terms change materially, notice will be given where required by law.",
                ],
            },
        ],
    },
};

const supportSections: Section[] = [
    { id: "get-started", title: "Getting started", ordered: true, bullets: ["Create an account with your email address and add your first vehicle.", "Record fuel, charging, service, insurance or general expenses from the relevant section.", "Create maintenance or renewal reminders and allow notifications if you want device alerts.", "Sign in to the same account on another authorized device to synchronize your records when a connection is available."] },
    { id: "account", title: "Registration, sign-in and password reset", paragraphs: ["AutoCare Hub uses email-and-password accounts. If you cannot sign in, first check the email address you registered with and your network connection.", "Use Forgot password from the sign-in screen to request a reset link for the account email address. Follow the link from the reset email to complete the password update in the app. If you no longer have access to the registered email address, contact support from an address that can help identify the account without sending your password or authentication codes."] },
    { id: "records", title: "Vehicles, expenses and documents", paragraphs: ["Add a vehicle first, then use the vehicle and expense flows to record mileage, fuel or charging, servicing, insurance and other ownership costs. You can add vehicle documents or receipts by choosing a file or capturing a document image when prompted.", "Only add information you are entitled to store or share. Do not send vehicle documents or sensitive records by email unless support specifically asks for a safe, necessary excerpt."] },
    { id: "sync", title: "Offline use and synchronization", paragraphs: ["AutoCare Hub is local-first: changes are saved on the device and synchronize to your authorized account when a connection is available. Settings shows storage and synchronization status, including pending uploads and a retry action after a sync error.", "If there are pending changes, reconnect and allow synchronization to finish before signing out, deleting the app or moving to a new device. Uninstalling before pending changes are synchronized can make local-only changes unavailable."] },
    { id: "subscriptions", title: "Plus, Family and Restore Purchases", paragraphs: ["Subscription availability and pricing are presented by the App Store before purchase. Plus and Family access is managed in the app’s Subscription area. Family supports an eligible shared garage with up to six total members, including the owner.", "If a recognized Apple purchase is not reflected in AutoCare Hub, open Subscription and choose Restore Purchases before contacting support. This does not create a new charge."] },
    { id: "cancel", title: "Canceling an Apple subscription", paragraphs: ["To cancel an iOS subscription, use your Apple Account subscription settings. Apple controls billing and any refund process for App Store purchases. Canceling stops future renewal under Apple’s rules; access can remain available until the current paid period ends."] },
    { id: "data", title: "Exporting or deleting your account", paragraphs: ["Settings includes Export all account data and Delete account permanently. Export produces a local data file that you can share using the device’s sharing options. Account deletion requires an online connection and cannot proceed while uploads are pending.", "The account-deletion flow also requests deletion of the matching RevenueCat customer profile. RevenueCat processes deletion asynchronously and an accepted request is not immediate confirmation. Temporary request failures are retained for retry. Deleting your AutoCare account does not cancel an Apple subscription; manage or cancel Apple billing in your Apple Account subscription settings.", "For a privacy request or if you cannot access the app, contact support once the approved privacy contact is published. Do not include passwords, reset links, full payment-card data, government identifiers or full sensitive documents in your request."] },
    { id: "report-issue", title: "Report a technical issue", paragraphs: ["Tell us the app version, device model, operating-system version, what you expected, what happened and the steps that reproduce the issue. Non-sensitive screenshots can help. Do not send passwords, authentication codes or payment information."] },
];

export function AutoCareLegalDocument({ kind, contactEmail }: { kind: "privacy" | "terms"; contactEmail: string }) {
    const document = documents[kind];
    return <DocumentLayout document={document} contactEmail={contactEmail} />;
}

export function AutoCareSupport({ contactEmail }: { contactEmail: string }) {
    const document: Document = {
        eyebrow: "AutoCare Hub · Support",
        title: "Help with your vehicle records.",
        intro: "Practical help for accounts, vehicle tracking, synchronization and App Store subscriptions.",
        reviewed: "Support guidance reviewed against the current iOS release source on 5 November 2026.",
        publicationNote: `Customer inquiries for AutoCare Hub are directed to ${legalOperator.email}. This page does not promise a response time or support availability.`,
        sections: supportSections,
    };
    return <DocumentLayout document={document} contactEmail={contactEmail} support />;
}

function DocumentLayout({ document, contactEmail, support = false }: { document: Document; contactEmail: string; support?: boolean }) {
    return <>
        <PageHero dark eyebrow={document.eyebrow} title={document.title} intro={document.intro} />
        <section className={styles.legalSection}>
            <div className={`siteContainer ${styles.legalGrid}`}>
                <aside className={styles.toc} aria-label="On this page">
                    <p>On this page</p>
                    <nav>{document.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title.replace(/^\d+\.\s/, "")}</a>)}</nav>
                </aside>
                <article className={styles.document}>
                    <div className={styles.reviewNotice} role="status"><strong>Publication review</strong><p>{document.publicationNote}</p></div>
                    <div className={styles.documentMeta}><span>{document.reviewed}</span>{support ? <a className="darkButton" href={`mailto:${contactEmail}?subject=AutoCare%20Hub%20support`}>Contact support <span aria-hidden="true">→</span></a> : null}</div>
                    {document.sections.map((section) => <section id={section.id} key={section.id} className={styles.documentSection}>
                        <h2>{section.title}</h2>
                        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {section.bullets ? section.ordered ? <ol>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ol> : <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                    </section>)}
                    <section className={styles.related} aria-labelledby="autocare-legal-links"><p className="sectionEyebrow">AutoCare Hub</p><h2 id="autocare-legal-links">Related information</h2><div>{links.map(([label, href]) => <Link href={href} key={href}>{label} <span aria-hidden="true">→</span></Link>)}</div></section>
                </article>
            </div>
        </section>
    </>;
}
