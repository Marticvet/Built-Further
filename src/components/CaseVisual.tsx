import Image from "next/image";
import type { CaseSlug } from "@/i18n/config";

type MobileScreenKey = "primary" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary";

type CaseVisualProps = {
    slug: CaseSlug;
    name: string;
    previewLabel: string;
    screen?: MobileScreenKey;
    eager?: boolean;
};

const webImages: Partial<Record<CaseSlug, string>> = {
    lumynery: "/work/lumynery/home.jpg",
    "tire-shop": "/work/tire-shop/home.jpg",
};

const mobileImages: Record<"fitness-tracker" | "autocare", Record<MobileScreenKey, string>> = {
    "fitness-tracker": {
        primary: "/work/fitness-tracker/food-search.png",
        secondary: "/work/fitness-tracker/workouts.png",
        tertiary: "/work/fitness-tracker/quick-add.png",
        quaternary: "/work/fitness-tracker/diary.png",
        quinary: "/work/fitness-tracker/food-detail.png",
        senary: "/work/fitness-tracker/workouts.png",
    },
    autocare: {
        primary: "/work/autocare/add-expense.png",
        secondary: "/work/autocare/add-reminder.png",
        tertiary: "/work/autocare/expenses.png",
        quaternary: "/work/autocare/reminders.png",
        quinary: "/work/autocare/vehicles.png",
        senary: "/work/autocare/vehicle-detail.png",
    },
};

const companionScreen: Record<MobileScreenKey, MobileScreenKey> = {
    primary: "secondary",
    secondary: "tertiary",
    tertiary: "quaternary",
    quaternary: "quinary",
    quinary: "senary",
    senary: "primary",
};

function BrowserVisual({ slug, name, eager }: { slug: CaseSlug; name: string; eager: boolean }) {
    const src = webImages[slug];
    if (!src) return null;

    return <div className="caseBrowser" aria-hidden="true">
        <div className="caseBrowserBar"><i /><i /><i /><span>{name}</span></div>
        <div className="caseBrowserMedia"><Image alt="" fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 900px) 92vw, 52vw" src={src} unoptimized /></div>
    </div>;
}

function PhoneScreenshot({ src, eager }: { src: string; eager: boolean }) {
    return <div className="phoneScreen">
        <Image alt="" fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 620px) 37vw, (max-width: 900px) 28vw, 16vw" src={src} unoptimized />
    </div>;
}

function MobileVisual({ slug, screen, eager }: { slug: "fitness-tracker" | "autocare"; screen: MobileScreenKey; eager: boolean }) {
    const images = mobileImages[slug];

    return <div className="mobileVisualStage" aria-hidden="true">
        <div className="mobileGlow" />
        <div className="phoneFrame phoneBack"><PhoneScreenshot eager={eager} src={images[companionScreen[screen]]} /></div>
        <div className="phoneFrame phoneFront"><PhoneScreenshot eager={eager} src={images[screen]} /></div>
    </div>;
}

export default function CaseVisual({ slug, name, previewLabel, screen = "primary", eager = false }: CaseVisualProps) {
    const isMobile = slug === "fitness-tracker" || slug === "autocare";

    return <div className={`caseVisual caseVisual-${slug}`} aria-label={previewLabel.replace("{name}", name)}>
        {isMobile ? <MobileVisual eager={eager} slug={slug} screen={screen} /> : <BrowserVisual eager={eager} name={name} slug={slug} />}
    </div>;
}
