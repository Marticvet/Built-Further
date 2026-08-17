import "server-only";

import type { ContactSubmission } from "@/lib/contact/submission";
import type { MailConfig } from "./transporter";

type EmailMessage = { from: string; to: string; replyTo: string; subject: string; text: string; html: string };

const acknowledgementCopy = {
    en: { subject: "We received your request", greeting: "Hi", thanks: "Thank you for contacting Built Further.", received: "We've received your request and will review it shortly.", referenceIntro: "Your reference number is:", keepReference: "Please keep this reference number if you contact us regarding this request.", regards: "Best regards," },
    bg: { subject: "Получихме вашето запитване", greeting: "Здравейте", thanks: "Благодарим ви, че се свързахте с Built Further.", received: "Получихме вашето запитване и ще го разгледаме скоро.", referenceIntro: "Вашият референтен номер е:", keepReference: "Моля, запазете този номер, ако се свържете с нас относно това запитване.", regards: "Поздрави," },
    de: { subject: "Wir haben Ihre Anfrage erhalten", greeting: "Hallo", thanks: "Vielen Dank für Ihre Nachricht an Built Further.", received: "Wir haben Ihre Anfrage erhalten und werden sie in Kürze prüfen.", referenceIntro: "Ihre Referenznummer lautet:", keepReference: "Bitte bewahren Sie diese Referenznummer auf, falls Sie uns wegen dieser Anfrage kontaktieren.", regards: "Freundliche Grüße," },
} as const;

function escapeHtml(value: string) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

function htmlValue(value: string) {
    return escapeHtml(value).replace(/\n/g, "<br />");
}

function firstName(name: string) {
    return name.split(/\s+/)[0] || name;
}

function emailShell(content: string) {
    return `<!doctype html><html><body style="margin:0;padding:0;background:#f5f7f8;color:#17202a;font-family:Arial,Helvetica,sans-serif;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7f8;"><tr><td style="padding:32px 16px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;"><tr><td style="padding:28px 32px;background:#354658;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:.2px;">Built Further</td></tr><tr><td style="padding:34px 32px;font-size:16px;line-height:1.65;">${content}</td></tr></table></td></tr></table></body></html>`;
}

function notificationFields(submission: ContactSubmission, reference: string) {
    const common: Array<[string, string]> = [
        ["Reference", reference],
        ["Name", submission.name],
        ["Email", submission.email],
        ["Site language", submission.locale.toUpperCase()],
    ];

    if (submission.kind === "project") {
        if (submission.company) common.splice(3, 0, ["Company", submission.company]);
        common.push(["What they are building", submission.projectType], ["Message", submission.message]);
    } else {
        common.push(["Preferred date", submission.date], ["Preferred time", submission.time], ["Timezone", submission.timezone], ["Discussion topic", submission.topic]);
    }

    return common;
}

export function createInternalNotification(submission: ContactSubmission, reference: string, config: MailConfig): EmailMessage {
    const fields = notificationFields(submission, reference);
    const rows = fields.map(([label, value]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e3e8eb;color:#6a7782;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;vertical-align:top;width:34%;">${escapeHtml(label)}</td><td style="padding:10px 0 10px 18px;border-bottom:1px solid #e3e8eb;color:#17202a;font-size:14px;line-height:1.6;word-break:break-word;">${htmlValue(value)}</td></tr>`).join("");
    const text = [
        `Reference: ${reference}`,
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        ...(submission.kind === "project" ? [submission.company ? `Company: ${submission.company}` : "", `What they are building: ${submission.projectType}`, "", "Message:", submission.message] : [`Preferred date: ${submission.date}`, `Preferred time: ${submission.time}`, `Timezone: ${submission.timezone}`, "", "Discussion topic:", submission.topic]),
        "",
        `Site language: ${submission.locale.toUpperCase()}`,
    ].filter(Boolean).join("\n");

    return {
        from: config.from,
        to: config.toAddress,
        replyTo: submission.email,
        subject: `[NEW] [${reference}] Website ${submission.kind === "project" ? "inquiry" : "appointment request"} from ${submission.name}`,
        text,
        html: emailShell(`<p style="margin:0 0 22px;font-size:13px;color:#65727d;letter-spacing:1.5px;text-transform:uppercase;">New website ${submission.kind === "project" ? "inquiry" : "appointment request"}</p><h1 style="margin:0 0 25px;font-size:28px;line-height:1.2;">Reference: ${escapeHtml(reference)}</h1><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>`),
    };
}

export function createCustomerAcknowledgement(submission: ContactSubmission, reference: string, config: MailConfig): EmailMessage {
    const copy = acknowledgementCopy[submission.locale];
    const name = firstName(submission.name);
    const text = [
        `${copy.greeting} ${name},`,
        "",
        copy.thanks,
        copy.received,
        "",
        copy.referenceIntro,
        reference,
        "",
        copy.keepReference,
        "",
        copy.regards,
        "Built Further Team",
        "Software products engineered for what comes next.",
        config.fromAddress,
        "builtfurther.com",
    ].join("\n");

    return {
        from: config.from,
        to: submission.email,
        replyTo: config.fromAddress,
        subject: `[${reference}] ${copy.subject}`,
        text,
        html: emailShell(`<h1 style="margin:0 0 22px;font-size:28px;line-height:1.2;">${escapeHtml(copy.greeting)} ${escapeHtml(name)},</h1><p style="margin:0 0 16px;">${escapeHtml(copy.thanks)}</p><p style="margin:0 0 24px;">${escapeHtml(copy.received)}</p><p style="margin:0 0 8px;font-weight:700;">${escapeHtml(copy.referenceIntro)}</p><p style="margin:0 0 24px;padding:14px 16px;background:#eef7fb;border-left:4px solid #88c7e6;font-family:monospace;font-size:18px;font-weight:700;letter-spacing:.5px;">${escapeHtml(reference)}</p><p style="margin:0 0 28px;">${escapeHtml(copy.keepReference)}</p><p style="margin:0;">${escapeHtml(copy.regards)}<br /><strong>Built Further Team</strong><br /><span style="color:#65727d;">Software products engineered for what comes next.</span><br /><a href="mailto:${escapeHtml(config.fromAddress)}" style="color:#354658;">${escapeHtml(config.fromAddress)}</a><br /><a href="https://builtfurther.com" style="color:#354658;">builtfurther.com</a></p>`),
    };
}
