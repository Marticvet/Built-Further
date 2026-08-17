import { hasLocale, type Locale } from "@/i18n/config";

export type ProjectSubmission = {
    kind: "project";
    locale: Locale;
    name: string;
    email: string;
    company: string;
    projectType: string;
    message: string;
};

export type AppointmentSubmission = {
    kind: "appointment";
    locale: Locale;
    name: string;
    email: string;
    date: string;
    time: string;
    timezone: string;
    topic: string;
};

export type ContactSubmission = ProjectSubmission | AppointmentSubmission;

export type SubmissionResult =
    | { status: "valid"; submission: ContactSubmission }
    | { status: "honeypot" }
    | { status: "invalid" };

type FieldResult = { value: string; valid: boolean };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function object(value: unknown): Record<string, unknown> | null {
    return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function field(record: Record<string, unknown>, key: string, maxLength: number, multiline = false): FieldResult {
    const raw = record[key];
    if (raw === undefined) return { value: "", valid: true };
    if (typeof raw !== "string") return { value: "", valid: false };

    const value = raw.trim();
    return { value, valid: value.length <= maxLength && (multiline || !/[\r\n]/.test(value)) };
}

function validDate(value: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validTime(value: string) {
    const match = /^(\d{2}):(\d{2})$/.exec(value);
    return Boolean(match && Number(match[1]) < 24 && Number(match[2]) < 60);
}

export function parseContactSubmission(body: unknown): SubmissionResult {
    const request = object(body);
    const data = request && object(request.data);
    if (!request || !data || (request.kind !== "project" && request.kind !== "appointment")) return { status: "invalid" };

    // Bots that populate this visually hidden field are acknowledged without sending mail.
    if (typeof data.website === "string" && data.website.trim()) return { status: "honeypot" };

    const localeValue = field(request, "locale", 5);
    const locale: Locale = localeValue.valid && hasLocale(localeValue.value) ? localeValue.value : "en";
    const name = field(data, "name", 140);
    const email = field(data, "email", 254);

    if (!name.valid || !name.value || !email.valid || !emailPattern.test(email.value)) return { status: "invalid" };

    if (request.kind === "project") {
        const company = field(data, "company", 180);
        const projectType = field(data, "projectType", 160);
        const message = field(data, "message", 5000, true);
        if (!company.valid || !projectType.valid || !projectType.value || !message.valid || !message.value) return { status: "invalid" };

        return { status: "valid", submission: { kind: "project", locale, name: name.value, email: email.value, company: company.value, projectType: projectType.value, message: message.value } };
    }

    const date = field(data, "date", 10);
    const time = field(data, "time", 5);
    const timezone = field(data, "timezone", 100);
    const topic = field(data, "topic", 5000, true);
    if (!date.valid || !validDate(date.value) || !time.valid || !validTime(time.value) || !timezone.valid || !timezone.value || !topic.valid || !topic.value) return { status: "invalid" };

    return { status: "valid", submission: { kind: "appointment", locale, name: name.value, email: email.value, date: date.value, time: time.value, timezone: timezone.value, topic: topic.value } };
}
