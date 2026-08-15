import "server-only";

export const contactEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || "martinntsvetanov@gmail.com";
export const contactFromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "Built Further <onboarding@resend.dev>";
