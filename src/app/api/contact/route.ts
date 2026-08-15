import { contactEmail, contactFromEmail } from "@/config/contact";

type SubmissionKind = "project" | "appointment";

function value(record: Record<string, unknown>, key: string, maxLength = 4000) {
    const item = record[key];
    return typeof item === "string" ? item.trim().slice(0, maxLength) : "";
}

function validEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

    const submission = body as Record<string, unknown>;
    const kind = submission.kind as SubmissionKind;
    const data = submission.data && typeof submission.data === "object" ? submission.data as Record<string, unknown> : {};
    const locale = value(submission, "locale", 5) || "en";

    // Honeypot fields are invisible to people and help reject basic form bots.
    if (value(data, "website", 200)) return Response.json({ ok: true });

    const name = value(data, "name", 120);
    const email = value(data, "email", 254);
    if (!name || !validEmail(email) || !["project", "appointment"].includes(kind)) {
        return Response.json({ error: "Required fields are missing." }, { status: 400 });
    }

    let subject: string;
    let message: string;

    if (kind === "project") {
        const company = value(data, "company", 160);
        const projectType = value(data, "projectType", 160);
        const projectMessage = value(data, "message");
        if (!projectType || !projectMessage) return Response.json({ error: "Required fields are missing." }, { status: 400 });

        subject = `New Built Further project brief — ${projectType}`;
        message = [
            "New project brief from builtfurther.com",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Company: ${company || "—"}`,
            `Project type: ${projectType}`,
            `Site language: ${locale}`,
            "",
            "Project:",
            projectMessage,
        ].join("\n");
    } else {
        const date = value(data, "date", 20);
        const time = value(data, "time", 20);
        const timezone = value(data, "timezone", 80);
        const topic = value(data, "topic");
        if (!date || !time || !timezone || !topic) return Response.json({ error: "Required fields are missing." }, { status: 400 });

        subject = `New Built Further appointment request — ${date} ${time}`;
        message = [
            "New appointment request from builtfurther.com",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Preferred date: ${date}`,
            `Preferred time: ${time}`,
            `Timezone: ${timezone}`,
            `Site language: ${locale}`,
            "",
            "Discussion topic:",
            topic,
        ].join("\n");
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("Contact form delivery is not configured: RESEND_API_KEY is missing.");
        return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "BuiltFurtherWebsite/1.0" },
        body: JSON.stringify({ from: contactFromEmail, to: [contactEmail], reply_to: email, subject, text: message }),
    });

    if (!emailResponse.ok) {
        console.error("Resend rejected a Built Further form submission.", await emailResponse.text());
        return Response.json({ error: "Email delivery failed." }, { status: 502 });
    }

    return Response.json({ ok: true });
}
