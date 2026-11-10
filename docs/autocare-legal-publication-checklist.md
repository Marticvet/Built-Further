# AutoCare Hub legal publication checklist

Internal release-preparation record. It is not public-facing copy and does not approve deployment.

## Confirmed information

- The controller identity, postal address and `hello@builtfurther.com` are configured in the Built Further legal pages. No USt-IdNr. is published.
- AutoCare v1 does not enable Fleet, receipt OCR, advertising, analytics or a crash-reporting SDK.
- The Supabase plan is Free. Do not claim managed daily backups. Supabase documents daily managed backups for Pro, Team and Enterprise, and recommends that Free-tier projects create and retain their own exports instead. Database backups do not restore deleted Storage objects. See <https://supabase.com/docs/guides/platform/backups>.
- The app's deletion flow requires an online connection and no pending uploads. It invokes the `delete-account` Edge Function, which removes owned document-storage paths and then calls Supabase Auth administrative user deletion. The app then signs out and clears its local PowerSync store.
- Current AutoCare release evidence records a server-side RevenueCat deletion queue: after Supabase Auth deletion is confirmed, an asynchronous RevenueCat customer-deletion request is made and later confirmation is recorded. This is not immediate deletion, does not cancel an Apple subscription, and its retention/runbook still needs owner and legal approval before being represented as a completed provider deletion.

## Provider dashboard and contract checklist

### Supabase

- [ ] Record the exact production project region for the database, Auth, Storage and any Edge Functions.
- [ ] Record the project’s active log, support-access and manual-export configuration.
- [ ] Confirm whether an external/manual backup exists. If it does, record its processor, region, retention and deletion process. If it does not, say so rather than describing a backup period.
- [ ] Confirm the customer entity and effective Supabase DPA, then retain the current subprocessor list and transfer mechanism decision with the release record.
- [ ] Confirm the post-deletion behavior of application tables, Auth metadata and Storage, including any retention that cannot be removed immediately.

### PowerSync

- [ ] Record the live PowerSync Cloud deployment region, not only the intended `EU` label in release notes.
- [ ] Confirm the effective DPA and retain the current subprocessor list. PowerSync lists AWS and MongoDB for customer sync payloads, with location depending on project deployment; it separately lists US supporting/administrative subprocessors. See <https://powersync.com/legal/subprocessors>.
- [ ] Confirm which account, support or operational metadata may leave the EEA and document the applicable transfer safeguard.
- [ ] Confirm the retention/deletion behavior for synchronized server data, service logs and any local device copy.

### RevenueCat

- [ ] Record the production project, environment and configured App Store integration; do not rely on Test Store evidence for production facts.
- [ ] Confirm the effective DPA, transfer safeguard and current subprocessor list. RevenueCat describes itself as a processor for end-user data and publishes a DPA: <https://www.revenuecat.com/gdpr> and <https://www.revenuecat.com/dpa-2025>.
- [ ] Confirm where the production customer data is processed and the retention/deletion rules that apply to purchase history, entitlement data, aliases and webhook records.
- [ ] Approve a deletion runbook that distinguishes deleting an AutoCare account, deleting a RevenueCat customer and cancelling an Apple subscription. RevenueCat deletion must not be described as cancelling an Apple subscription.

## GDPR lawful-basis working table

This is a proposed processing register for owner and legal approval. Article 6 GDPR requires a documented basis for each processing operation; device permission is not itself a GDPR lawful basis. See <https://eur-lex.europa.eu/eli/reg/2016/679/>.

| Processing purpose | App evidence | Proposed Article 6 basis | Approval needed |
| --- | --- | --- | --- |
| Create account, authenticate, maintain session and reset password | Email/password account and Supabase Auth | Art. 6(1)(b) — performance of the service contract | Confirm account terms and exact Auth logging/retention. |
| Store, synchronize, display, export and delete vehicle, expense, reminder, trip, checklist and document data | Supabase, PowerSync and local-first store | Art. 6(1)(b) — performance of the service contract | Confirm provider regions, deletion behavior and retention schedule. |
| Family-garage invitations and authorized sharing | Family entitlement and garage-access flows | Art. 6(1)(b) — requested sharing feature | Confirm access/retention rules for former members. |
| Determine paid access and restore purchases | RevenueCat entitlement and Apple purchase flows | Art. 6(1)(b) for the user’s subscription/service relationship | Confirm production RevenueCat configuration and processor terms. |
| Respond to support and account requests | `hello@builtfurther.com` support channel | Art. 6(1)(b) where necessary to provide support; otherwise Art. 6(1)(f) | Legitimate-interest assessment (LIA) required for the Art. 6(1)(f) portion. |
| Prevent misuse, secure accounts and investigate service incidents | Authentication/session and provider operational records | Art. 6(1)(f) — security and service integrity | LIA, data-minimisation review, log categories and retention approval required. |
| Optional nearby search or attaching foreground location | User-requested Google Maps/Places feature and foreground permission | Candidate: Art. 6(1)(a) consent for the optional location processing | Owner/legal decision required; document withdrawal, scope and any storage. |
| Device-local reminders/notifications | Device permission and local reminder functionality | No server-side personal-data processing identified for delivery itself | Confirm no remote push/notification provider or related logs are enabled. |
| Statutory accounting, tax or legal-retention records, if any | No final record set or periods documented | Art. 6(1)(c) only where a specific legal obligation applies | Legal approval of each obligation, data category and retention period required. |
| Manual/off-site backup, only if created | Supabase Free does not establish a managed daily backup | Candidate: Art. 6(1)(f) for security/continuity | LIA plus processor, region, safeguards and deletion schedule required before describing it publicly. |

## Consumer-dispute decision record

Do not place either draft on a public page until the owner confirms both employee headcount as of 31 December of the preceding year and the participation policy.

- **Section 36 VSBG:** if the business employed more than ten people at that date, the website and Terms need a clear statement of whether it is willing or required to participate. If it is willing or required, identify the competent body, address, website and participation statement. The statutory exception for ten or fewer people applies only to the general Section 36(1)(1) information duty.
- **Section 37 VSBG:** after an unresolved consumer-contract dispute, give the consumer the competent body’s address and website and state whether participation is voluntary or obligatory, in text form. This workflow is separately required; do not assume the Section 36 headcount exception removes it.
- **Draft only — not participating:** `Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.` Use only after owner/legal confirmation.
- **Draft only — participating or obliged:** identify the actual body by name, address and website and state the applicable obligation or participation commitment. Do not insert a generic body or placeholder.

Authoritative text: <https://www.gesetze-im-internet.de/vsbg/__36.html> and <https://www.gesetze-im-internet.de/vsbg/__37.html>.

## Terms requiring legal approval

- Whether to use a governing-law clause at all, and any consumer-protection savings language.
- Any court-jurisdiction clause affecting consumers.
- Any limitation, cap or exclusion of liability, including availability and data-loss wording.
- The final consumer-dispute statement and the Section 37 response workflow.
- Subscription cancellation, refund and renewal wording alongside Apple’s mandatory terms and non-excludable consumer rights.

## Publication gate

Keep the AutoCare legal routes undeployed until every unchecked provider item and every owner/legal decision above has a dated approval. Removing `noindex` is not a publication-control mechanism and must not substitute for these approvals.
