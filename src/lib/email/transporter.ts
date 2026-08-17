import "server-only";

import nodemailer from "nodemailer";

export class MailConfigurationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MailConfigurationError";
    }
}

export type MailConfig = {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    from: string;
    fromAddress: string;
    toAddress: string;
};

function requiredEnvironment(name: string) {
    const value = process.env[name]?.trim();
    if (!value) throw new MailConfigurationError(`${name} is required for contact email delivery.`);
    return value;
}

function validEmailAddress(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

export function getMailConfig(): MailConfig {
    const host = requiredEnvironment("SMTP_HOST");
    const portValue = requiredEnvironment("SMTP_PORT");
    const secureValue = requiredEnvironment("SMTP_SECURE");
    const user = requiredEnvironment("SMTP_USER");
    const pass = requiredEnvironment("SMTP_PASS");
    const fromName = requiredEnvironment("MAIL_FROM_NAME");
    const fromAddress = requiredEnvironment("MAIL_FROM_ADDRESS");
    const toAddress = requiredEnvironment("MAIL_TO_ADDRESS");
    const port = Number(portValue);

    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new MailConfigurationError("SMTP_PORT must be a valid port number.");
    if (secureValue !== "true" && secureValue !== "false") throw new MailConfigurationError("SMTP_SECURE must be true or false.");
    if (!validEmailAddress(user) || !validEmailAddress(fromAddress) || !validEmailAddress(toAddress)) throw new MailConfigurationError("SMTP and mail addresses must be valid email addresses.");
    if (/\r|\n/.test(fromName)) throw new MailConfigurationError("MAIL_FROM_NAME cannot contain new lines.");
    if (user.toLowerCase() !== fromAddress.toLowerCase()) throw new MailConfigurationError("MAIL_FROM_ADDRESS must match the authenticated SMTP mailbox.");

    return { host, port, secure: secureValue === "true", user, pass, from: `${fromName} <${fromAddress}>`, fromAddress, toAddress };
}

export function createMailTransporter(config: MailConfig) {
    return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: { user: config.user, pass: config.pass },
    });
}
