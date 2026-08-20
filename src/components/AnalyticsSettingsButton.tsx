"use client";

import { analyticsConsentEvent } from "@/lib/analytics";

export default function AnalyticsSettingsButton({ label }: { label: string }) {
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return null;
    return <button type="button" className="footerPrivacyButton" onClick={() => window.dispatchEvent(new Event(analyticsConsentEvent))}>{label}</button>;
}
