import type { PostHog } from "posthog-js";

export const analyticsConsentStorageKey = "built-further-analytics-consent";
export const analyticsConsentEvent = "built-further:open-analytics-consent";

let posthogClient: Promise<PostHog> | undefined;
let posthogInitialized = false;

function getProjectToken() {
    return process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
}

export function isAnalyticsConfigured() {
    return Boolean(getProjectToken());
}

async function loadPostHog() {
    posthogClient ??= import("posthog-js").then(({ default: posthog }) => posthog);
    return posthogClient;
}

export async function enableAnalytics() {
    const projectToken = getProjectToken();
    if (!projectToken || typeof window === "undefined") return;

    const posthog = await loadPostHog();
    if (!posthogInitialized) {
        posthog.init(projectToken, {
            api_host: "/bfx",
            ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://eu.posthog.com",
            defaults: "2026-05-30",
            autocapture: {
                dom_event_allowlist: ["click", "submit"],
                element_allowlist: ["a", "button", "form"],
            },
            capture_pageview: "history_change",
            capture_pageleave: "if_capture_pageview",
            capture_dead_clicks: true,
            capture_heatmaps: true,
            capture_performance: true,
            disable_session_recording: false,
            enable_recording_console_log: false,
            person_profiles: "identified_only",
            respect_dnt: true,
            opt_out_capturing_by_default: true,
            opt_out_persistence_by_default: true,
            session_recording: {
                maskAllInputs: true,
                blockSelector: "[data-analytics-block]",
                collectFonts: false,
                recordCrossOriginIframes: false,
            },
        });
        posthogInitialized = true;
    }

    const wasOptedOut = posthog.has_opted_out_capturing();
    posthog.opt_in_capturing({ captureEventName: "analytics_consent_granted" });
    if (wasOptedOut) posthog.capture("$pageview", { $current_url: window.location.href });
}

export async function disableAnalytics() {
    if (!posthogClient) return;
    const posthog = await posthogClient;
    posthog.opt_out_capturing();
}
