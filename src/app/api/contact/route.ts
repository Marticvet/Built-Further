import { parseContactSubmission } from "@/lib/contact/submission";
import { createCustomerAcknowledgement, createInternalNotification } from "@/lib/email/templates";
import { createInquiryReference } from "@/lib/email/reference";
import { createMailTransporter, getMailConfig, MailConfigurationError } from "@/lib/email/transporter";

export const runtime = "nodejs";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const result = parseContactSubmission(body);
    if (result.status === "invalid") return Response.json({ error: "Please check the form and try again." }, { status: 422 });
    if (result.status === "honeypot") return new Response(null, { status: 204 });

    const reference = createInquiryReference();
    console.info("Built Further contact request accepted.", { kind: result.submission.kind, reference });

    try {
        const config = getMailConfig();
        const transporter = createMailTransporter(config);
        await transporter.sendMail(createInternalNotification(result.submission, reference, config));
        console.info("Built Further internal notification sent.", { reference });
        await transporter.sendMail(createCustomerAcknowledgement(result.submission, reference, config));
        console.info("Built Further customer acknowledgement sent.", { reference });
        return Response.json({ success: true, reference });
    } catch (error) {
        const category = error instanceof MailConfigurationError ? "configuration" : "smtp-delivery";
        const errorCode = typeof error === "object" && error && "code" in error && typeof error.code === "string" ? error.code : undefined;
        console.error("Built Further contact delivery failed.", { category, reference, errorCode });
        return Response.json({ error: "We couldn't send your request. Please try again or contact us directly at hello@builtfurther.com." }, { status: error instanceof MailConfigurationError ? 503 : 502 });
    }
}
