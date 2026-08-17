"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import styles from "../scss/pages/pages.module.scss";

type AppointmentFormProps = { t: Dictionary["book"]["form"]; locale: Locale };
type Errors = Partial<Record<"name" | "email" | "date" | "time" | "timezone" | "topic", string>>;
type Status = "idle" | "sending" | "success" | "error";

export default function AppointmentForm({ t, locale }: AppointmentFormProps) {
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<Status>("idle");
    const [reference, setReference] = useState<string | null>(null);
    const [confirmationEmail, setConfirmationEmail] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        setStatus("idle");
        setReference(null);
        const form = new FormData(formElement);
        const values = Object.fromEntries(form.entries());
        const nextErrors: Errors = {};
        if (!String(values.name || "").trim()) nextErrors.name = t.errors.name;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email || ""))) nextErrors.email = t.errors.email;
        if (!values.date) nextErrors.date = t.errors.date;
        if (!values.time) nextErrors.time = t.errors.time;
        if (!values.timezone) nextErrors.timezone = t.errors.timezone;
        if (!String(values.topic || "").trim()) nextErrors.topic = t.errors.topic;
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        setStatus("sending");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kind: "appointment", locale, data: values }),
            });
            const result: unknown = await response.json().catch(() => null);
            if (!response.ok || !result || typeof result !== "object" || !("success" in result) || result.success !== true || !("reference" in result) || typeof result.reference !== "string") throw new Error("Submission failed");
            formElement.reset();
            setErrors({});
            setReference(result.reference);
            setConfirmationEmail(String(values.email).trim());
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    return (
        <form className={styles.contactForm} onSubmit={submit} noValidate>
            <div className={styles.field}><label htmlFor="appointment-name">{t.name}</label><input id="appointment-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "appointment-name-error" : undefined} />{errors.name && <span id="appointment-name-error" className={styles.fieldError}>{errors.name}</span>}</div>
            <div className={styles.field}><label htmlFor="appointment-email">{t.email}</label><input id="appointment-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "appointment-email-error" : undefined} />{errors.email && <span id="appointment-email-error" className={styles.fieldError}>{errors.email}</span>}</div>
            <div className={styles.field}><label htmlFor="appointment-date">{t.date}</label><input id="appointment-date" name="date" type="date" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "appointment-date-error" : undefined} />{errors.date && <span id="appointment-date-error" className={styles.fieldError}>{errors.date}</span>}</div>
            <div className={styles.field}><label htmlFor="appointment-time">{t.time}</label><select id="appointment-time" name="time" defaultValue="" aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "appointment-time-error" : undefined}><option value="" disabled>{t.timePlaceholder}</option>{t.times.map((time) => <option key={time}>{time}</option>)}</select>{errors.time && <span id="appointment-time-error" className={styles.fieldError}>{errors.time}</span>}</div>
            <div className={`${styles.field} ${styles.fieldFull}`}><label htmlFor="appointment-timezone">{t.timezone}</label><select id="appointment-timezone" name="timezone" defaultValue="" aria-invalid={Boolean(errors.timezone)} aria-describedby={errors.timezone ? "appointment-timezone-error" : undefined}><option value="" disabled>{t.timezonePlaceholder}</option>{t.timezones.map((timezone) => <option key={timezone}>{timezone}</option>)}</select>{errors.timezone && <span id="appointment-timezone-error" className={styles.fieldError}>{errors.timezone}</span>}</div>
            <div className={`${styles.field} ${styles.fieldFull}`}><label htmlFor="appointment-topic">{t.topic}</label><textarea id="appointment-topic" name="topic" placeholder={t.placeholder} aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "appointment-topic-error" : undefined} />{errors.topic && <span id="appointment-topic-error" className={styles.fieldError}>{errors.topic}</span>}</div>
            <div className={styles.honeypot} aria-hidden="true"><label htmlFor="appointment-website">Website</label><input id="appointment-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <button className="darkButton" type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.submit} <span aria-hidden="true">→</span></button>
            {status === "success" && reference && <div className={`${styles.formStatus} ${styles.formSuccess}`} role="status"><p>{t.success}</p><p className={styles.formReference}>{t.reference}: <strong>{reference}</strong></p><p>{t.confirmationSent.replace("{email}", confirmationEmail)}</p></div>}
            {status === "error" && <p className={`${styles.formStatus} ${styles.formFailure}`} role="alert">{t.sendError}</p>}
        </form>
    );
}
