import "server-only";

import { randomBytes } from "node:crypto";

export function createInquiryReference(date = new Date()) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const random = randomBytes(3).toString("hex").toUpperCase();
    return `BF-${year}${month}${day}-${random}`;
}
