import type { CaseSlug } from "@/i18n/config";

export type ProjectStatus = "live" | "in-development";

export type ProjectLink = {
    liveUrl?: string;
    appStoreUrl?: string;
    googlePlayUrl?: string;
    projectStatus?: ProjectStatus;
    showDevelopmentCredit?: boolean;
};

export const projectLinks: Partial<Record<CaseSlug, ProjectLink>> = {
    lumynery: { liveUrl: "https://lumynery.com/", projectStatus: "live", showDevelopmentCredit: true },
    "tire-shop": { liveUrl: "https://tiresshop.netlify.app/", projectStatus: "live" },
    "fitness-tracker": { projectStatus: "in-development" },
    autocare: { projectStatus: "in-development" },
};

export function isPublicHttpsUrl(value: string | undefined) {
    try {
        return Boolean(value && new URL(value).protocol === "https:");
    } catch {
        return false;
    }
}
