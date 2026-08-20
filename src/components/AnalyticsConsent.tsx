"use client";

import { useEffect, useState } from "react";
import type { CommonDictionary } from "@/i18n/get-dictionary";
import {
    analyticsConsentEvent,
    analyticsConsentStorageKey,
    disableAnalytics,
    enableAnalytics,
    isAnalyticsConfigured,
} from "@/lib/analytics";

type ConsentChoice = "granted" | "denied" | null;

export default function AnalyticsConsent({ t }: { t: CommonDictionary["analytics"] }) {
    const [choice, setChoice] = useState<ConsentChoice>(null);
    const [ready, setReady] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const configured = isAnalyticsConfigured();

    useEffect(() => {
        if (!configured) return;

        const savedChoice = window.localStorage.getItem(analyticsConsentStorageKey);
        const initialChoice: ConsentChoice = savedChoice === "granted" || savedChoice === "denied" ? savedChoice : null;
        const revealConsent = window.setTimeout(() => {
            setChoice(initialChoice);
            setReady(true);
        }, 0);

        if (initialChoice === "granted") void enableAnalytics();

        const openSettings = () => setSettingsOpen(true);
        window.addEventListener(analyticsConsentEvent, openSettings);
        return () => {
            window.clearTimeout(revealConsent);
            window.removeEventListener(analyticsConsentEvent, openSettings);
        };
    }, [configured]);

    if (!configured || !ready || (choice !== null && !settingsOpen)) return null;

    function saveChoice(nextChoice: Exclude<ConsentChoice, null>) {
        window.localStorage.setItem(analyticsConsentStorageKey, nextChoice);
        setChoice(nextChoice);
        setSettingsOpen(false);

        if (nextChoice === "granted") void enableAnalytics();
        else void disableAnalytics();
    }

    return (
        <aside className="analyticsConsent" aria-labelledby="analytics-consent-title">
            <div className="analyticsConsentCopy">
                <p className="sectionEyebrow">{t.eyebrow}</p>
                <h2 id="analytics-consent-title">{t.title}</h2>
                <p>{t.description}</p>
            </div>
            <div className="analyticsConsentActions">
                <button type="button" className="analyticsDecline" onClick={() => saveChoice("denied")}>{t.decline}</button>
                <button type="button" className="analyticsAccept" onClick={() => saveChoice("granted")}>{t.accept}</button>
            </div>
        </aside>
    );
}
