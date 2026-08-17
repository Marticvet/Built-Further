"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import styles from "../scss/pages/pages.module.scss";

type ContactFormProps = { t: Dictionary["contact"]["form"]; submitLabel: string; locale: Locale };
type Errors = Partial<Record<"name" | "email" | "projectType" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ t, submitLabel, locale }: ContactFormProps) {
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
        if (!values.projectType) nextErrors.projectType = t.errors.projectType;
        if (!String(values.message || "").trim()) nextErrors.message = t.errors.message;
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        setStatus("sending");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kind: "project", locale, data: values }),
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
            <div className={styles.field}><label htmlFor="name">{t.name}</label><input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className={styles.fieldError}>{errors.name}</span>}</div>
            <div className={styles.field}><label htmlFor="email">{t.email}</label><input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <span id="email-error" className={styles.fieldError}>{errors.email}</span>}</div>
            <div className={styles.field}><label htmlFor="company">{t.company}</label><input id="company" name="company" autoComplete="organization" /></div>
            <div className={styles.field}><label htmlFor="project-type">{t.projectType}</label><select id="project-type" name="projectType" defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "type-error" : undefined}><option value="" disabled>{t.selectOne}</option>{t.options.map((option) => <option key={option}>{option}</option>)}</select>{errors.projectType && <span id="type-error" className={styles.fieldError}>{errors.projectType}</span>}</div>
            <div className={`${styles.field} ${styles.fieldFull}`}><label htmlFor="message">{t.message}</label><textarea id="message" name="message" placeholder={t.placeholder} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <span id="message-error" className={styles.fieldError}>{errors.message}</span>}</div>
            <div className={styles.honeypot} aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <button className="darkButton" type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : submitLabel} <span aria-hidden="true">→</span></button>
            {status === "success" && reference && <div className={`${styles.formStatus} ${styles.formSuccess}`} role="status"><p>{t.success}</p><p className={styles.formReference}>{t.reference}: <strong>{reference}</strong></p><p>{t.confirmationSent.replace("{email}", confirmationEmail)}</p></div>}
            {status === "error" && <p className={`${styles.formStatus} ${styles.formFailure}`} role="alert">{t.sendError}</p>}
        </form>
    );
}
