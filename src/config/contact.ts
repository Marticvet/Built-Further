import "server-only";

export const contactEmail = process.env.MAIL_TO_ADDRESS?.trim() || "hello@builtfurther.com";
