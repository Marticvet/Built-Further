import Image from "next/image";
import type { CaseSlug } from "@/i18n/config";

type CaseVisualProps = {
    slug: CaseSlug;
    name: string;
    previewLabel: string;
    screen?: "primary" | "secondary" | "tertiary";
    eager?: boolean;
};

const webImages: Partial<Record<CaseSlug, string>> = {
    lumynery: "/work/lumynery/home.jpg",
    "tire-shop": "/work/tire-shop/home.jpg",
};

function BrowserVisual({ slug, name, eager }: { slug: CaseSlug; name: string; eager: boolean }) {
    const src = webImages[slug];
    if (!src) return null;

    return <div className="caseBrowser" aria-hidden="true">
        <div className="caseBrowserBar"><i /><i /><i /><span>{name}</span></div>
        <div className="caseBrowserMedia"><Image alt="" fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 900px) 92vw, 52vw" src={src} unoptimized /></div>
    </div>;
}

function FitnessCalories() {
    return <div className="mobileScreen fitnessScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="fitnessTitle"><small>DAILY OVERVIEW</small><b>Calories</b><span>Remaining = Goal − Food + Exercise</span></div>
        <div className="calorieOverview">
            <div className="calorieRing"><strong>2,345</strong><small>remaining</small></div>
            <div className="calorieStats"><span><i className="statRed" /><b>2,345</b><small>Base goal</small></span><span><i className="statOrange" /><b>452</b><small>Exercise</small></span><span><i className="statBlue" /><b>0</b><small>Food</small></span></div>
        </div>
        <div className="macroStrip"><span><b>33g</b><small>Carbs</small></span><span><b>18g</b><small>Fats</small></span><span><b>42g</b><small>Protein</small></span></div>
        <div className="mobileNav"><i>⌂</i><i>◫</i><i>＋</i></div>
    </div>;
}

function FitnessDiary() {
    return <div className="mobileScreen fitnessScreen diaryScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="diaryHeading"><small>TODAY</small><b>Food diary</b><span>1,410 kcal logged</span></div>
        {[["Breakfast", "410"], ["Lunch", "565"], ["Dinner", "435"]].map(([meal, calories], index) => <div className="mealCard" key={meal}><div><b>{meal}</b><span>{calories} kcal</span></div><p>{index === 0 ? "Oats, yoghurt & berries" : index === 1 ? "Chicken salad bowl" : "Salmon & vegetables"}</p><small>＋ Add food</small></div>)}
        <div className="mobileNav"><i>⌂</i><i>◫</i><i>＋</i></div>
    </div>;
}

function FitnessFoodSearch() {
    return <div className="mobileScreen fitnessScreen diaryScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="diaryHeading"><small>FOOD DATABASE</small><b>Add food</b><span>Breakfast · Today</span></div>
        <div className="mobileSearch"><span>⌕</span><p>Search foods</p></div>
        <div className="foodResults">
            {[["Greek yoghurt", "97 kcal · 17g protein"], ["Rolled oats", "150 kcal · 27g carbs"], ["Blueberries", "57 kcal · 14g carbs"]].map(([food, detail]) => <div className="foodResult" key={food}><span><b>{food}</b><small>{detail}</small></span><i>＋</i></div>)}
        </div>
        <div className="mobileNav"><i>⌂</i><i>◫</i><i>＋</i></div>
    </div>;
}

function AutoCareDashboard() {
    return <div className="mobileScreen autoScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="autoHeader"><small>WELCOME BACK</small><b>Your garage</b><span>Keep track of your car&apos;s health</span></div>
        <div className="vehicleCard"><div><small>MAIN VEHICLE</small><b>Vehicle 01</b><span>42,360 km</span></div><i>⌁</i></div>
        <div className="autoSectionTitle"><b>Ownership overview</b><span>This month</span></div>
        <div className="costCards"><span><small>Fuel</small><b>€184</b></span><span><small>Service</small><b>€320</b></span></div>
        <div className="serviceNotice"><i>✓</i><span><b>Next service</b><small>Due in 2,640 km</small></span></div>
        <div className="mobileNav autoNav"><i>⌂</i><i>＋</i><i>◫</i></div>
    </div>;
}

function AutoCareExpenses() {
    return <div className="mobileScreen autoScreen expensesScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="autoHeader"><small>ANALYTICS</small><b>Expenses</b><span>Total ownership costs</span></div>
        <div className="expenseTotal"><small>TOTAL THIS YEAR</small><strong>€2,840</strong><span>12% below last year</span></div>
        <div className="expenseChart"><i /><i /><i /><i /><i /><i /></div>
        <div className="expenseLegend"><span><i className="fuelDot" />Fuel</span><span><i className="serviceDot" />Service</span><span><i className="insuranceDot" />Insurance</span></div>
        <div className="reminderCard"><span>◷</span><div><b>Insurance renewal</b><small>18 days remaining</small></div></div>
        <div className="mobileNav autoNav"><i>⌂</i><i>＋</i><i>◫</i></div>
    </div>;
}

function AutoCareReminder() {
    return <div className="mobileScreen autoScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="autoHeader"><small>MAINTENANCE</small><b>New reminder</b><span>Vehicle 01 · 42,360 km</span></div>
        <div className="reminderSetup">
            <div className="reminderSetupIcon">◷</div>
            <div className="reminderField"><small>SERVICE TYPE</small><b>Oil and filter change</b></div>
            <div className="reminderField"><small>DUE AT</small><b>45,000 km</b></div>
            <div className="reminderToggle"><span><b>Notify me</b><small>Two weeks before</small></span><i /></div>
            <span className="reminderSave">Save reminder</span>
        </div>
        <div className="mobileNav autoNav"><i>⌂</i><i>＋</i><i>◫</i></div>
    </div>;
}

function MobileVisual({ slug, screen }: { slug: "fitness-tracker" | "autocare"; screen: "primary" | "secondary" | "tertiary" }) {
    const fitness = slug === "fitness-tracker";
    const front = fitness
        ? screen === "primary" ? <FitnessCalories /> : screen === "secondary" ? <FitnessDiary /> : <FitnessFoodSearch />
        : screen === "primary" ? <AutoCareDashboard /> : screen === "secondary" ? <AutoCareExpenses /> : <AutoCareReminder />;
    const back = fitness
        ? screen === "primary" ? <FitnessDiary /> : screen === "secondary" ? <FitnessFoodSearch /> : <FitnessCalories />
        : screen === "primary" ? <AutoCareExpenses /> : screen === "secondary" ? <AutoCareReminder /> : <AutoCareDashboard />;

    return <div className="mobileVisualStage" aria-hidden="true">
        <div className="mobileGlow" />
        <div className="phoneFrame phoneBack"><div className="phoneSpeaker" />{back}</div>
        <div className="phoneFrame phoneFront"><div className="phoneSpeaker" />{front}</div>
    </div>;
}

export default function CaseVisual({ slug, name, previewLabel, screen = "primary", eager = false }: CaseVisualProps) {
    const isMobile = slug === "fitness-tracker" || slug === "autocare";

    return <div className={`caseVisual caseVisual-${slug}`} aria-label={previewLabel.replace("{name}", name)}>
        {isMobile ? <MobileVisual slug={slug} screen={screen} /> : <BrowserVisual slug={slug} name={name} eager={eager} />}
    </div>;
}
