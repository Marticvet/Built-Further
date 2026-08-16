import Image from "next/image";
import type { CaseSlug } from "@/i18n/config";

type CaseVisualProps = {
    slug: CaseSlug;
    name: string;
    previewLabel: string;
    screen?: MobileScreenKey;
    eager?: boolean;
};

type MobileScreenKey = "primary" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary";

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

function FitnessMacros() {
    return <div className="mobileScreen fitnessScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="fitnessTitle"><small>WEEKLY INSIGHT</small><b>Macro balance</b><span>Average intake · Last 7 days</span></div>
        <div className="macroDashboard">
            {[["Protein", "74%", "macroPurple"], ["Carbohydrates", "61%", "macroOrange"], ["Fats", "48%", "macroBlue"]].map(([name, value, style]) => <div className="macroProgress" key={name}><span><b>{name}</b><small>{value}</small></span><i><em className={style} style={{ width: value }} /></i></div>)}
        </div>
        <div className="nutritionTrend"><span><b>Consistency</b><small>Five-day trend</small></span><div>{[45, 63, 52, 78, 69, 84, 74].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
        <div className="mobileNav"><i>⌂</i><i>◫</i><i>＋</i></div>
    </div>;
}

function FitnessFoodDetail() {
    return <div className="mobileScreen fitnessScreen diaryScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="diaryHeading"><small>FOOD DETAIL</small><b>Greek yoghurt</b><span>Plain · 2% fat</span></div>
        <div className="foodHero"><i>YG</i><span><strong>97</strong><small>kcal / 100g</small></span></div>
        <div className="nutritionGrid"><span><b>17g</b><small>Protein</small></span><span><b>6g</b><small>Carbs</small></span><span><b>2g</b><small>Fat</small></span><span><b>0g</b><small>Fibre</small></span></div>
        <div className="portionRow"><span><small>PORTION</small><b>150 grams</b></span><strong>− &nbsp; 1 &nbsp; ＋</strong></div>
        <span className="fitnessSave">Add to breakfast</span>
        <div className="mobileNav"><i>⌂</i><i>◫</i><i>＋</i></div>
    </div>;
}

function FitnessMealEditor() {
    return <div className="mobileScreen fitnessScreen diaryScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="diaryHeading"><small>MEAL ENTRY</small><b>Edit breakfast</b><span>Tuesday, 18 August</span></div>
        <div className="mealEditorCard">
            <div><small>FOOD</small><b>Rolled oats</b></div>
            <div><small>AMOUNT</small><b>80 grams</b></div>
            <div><small>ENERGY</small><b>300 kcal</b></div>
        </div>
        <div className="mealSummary"><span><small>Protein</small><b>10g</b></span><span><small>Carbs</small><b>54g</b></span><span><small>Fat</small><b>6g</b></span></div>
        <span className="fitnessSave">Save changes</span>
        <small className="removeEntry">Remove from diary</small>
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

function AutoCareVehicle() {
    return <div className="mobileScreen autoScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="autoHeader"><small>VEHICLE PROFILE</small><b>Vehicle 01</b><span>Active vehicle</span></div>
        <div className="vehicleProfileHero"><i>⌁</i><span><b>42,360 km</b><small>Current odometer</small></span></div>
        <div className="vehicleFacts"><span><small>YEAR</small><b>2021</b></span><span><small>FUEL</small><b>Petrol</b></span><span><small>BODY</small><b>SUV</b></span><span><small>PLATE</small><b>AC 2048</b></span></div>
        <div className="serviceNotice"><i>✓</i><span><b>Documents complete</b><small>Insurance valid until March</small></span></div>
        <div className="mobileNav autoNav"><i>⌂</i><i>＋</i><i>◫</i></div>
    </div>;
}

function AutoCareMap() {
    return <div className="mobileScreen autoScreen mapScreenMock">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="autoHeader"><small>NEARBY</small><b>Gas stations</b><span>Within 5 kilometres</span></div>
        <div className="miniMap"><i className="mapRoad mapRoadOne" /><i className="mapRoad mapRoadTwo" /><span className="mapPin pinOne">●</span><span className="mapPin pinTwo">●</span><span className="mapPin pinThree">●</span><b>⌖</b></div>
        <div className="stationList"><span><i>1</i><b>City Fuel</b><small>1.2 km · Open</small></span><span><i>2</i><b>North Station</b><small>2.8 km · Open</small></span></div>
        <div className="mobileNav autoNav"><i>⌂</i><i>＋</i><i>◫</i></div>
    </div>;
}

function AutoCareFuelEntry() {
    return <div className="mobileScreen autoScreen">
        <div className="mobileStatus"><span>9:41</span><span>● ◒</span></div>
        <div className="autoHeader"><small>NEW EXPENSE</small><b>Add fuel</b><span>Vehicle 01 · Today</span></div>
        <div className="fuelEntryCard">
            <div><small>ODOMETER</small><b>42,360 km</b></div>
            <div><small>VOLUME</small><b>46.8 litres</b></div>
            <div><small>PRICE / LITRE</small><b>€1.74</b></div>
            <div><small>TOTAL</small><strong>€81.43</strong></div>
        </div>
        <div className="reminderToggle"><span><b>Full tank</b><small>Used for consumption reports</small></span><i /></div>
        <span className="reminderSave">Save fuel expense</span>
        <div className="mobileNav autoNav"><i>⌂</i><i>＋</i><i>◫</i></div>
    </div>;
}

function MobileVisual({ slug, screen }: { slug: "fitness-tracker" | "autocare"; screen: MobileScreenKey }) {
    const fitness = slug === "fitness-tracker";
    const fitnessScreens = { primary: <FitnessCalories />, secondary: <FitnessDiary />, tertiary: <FitnessFoodSearch />, quaternary: <FitnessMacros />, quinary: <FitnessFoodDetail />, senary: <FitnessMealEditor /> };
    const autoScreens = { primary: <AutoCareDashboard />, secondary: <AutoCareExpenses />, tertiary: <AutoCareReminder />, quaternary: <AutoCareVehicle />, quinary: <AutoCareMap />, senary: <AutoCareFuelEntry /> };
    const backScreen: Record<MobileScreenKey, MobileScreenKey> = { primary: "secondary", secondary: "tertiary", tertiary: "quaternary", quaternary: "quinary", quinary: "senary", senary: "primary" };
    const front = fitness ? fitnessScreens[screen] : autoScreens[screen];
    const back = fitness ? fitnessScreens[backScreen[screen]] : autoScreens[backScreen[screen]];

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
