export type Service = {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    detail: string;
    deliverables: string[];
};

export type CaseStudy = {
    slug: string;
    name: string;
    type: string;
    description: string;
    services: string[];
    outcome: string;
    theme: "blue" | "sand" | "mint";
};

export const services: Service[] = [
    {
        slug: "saas-platforms",
        title: "SaaS Platforms",
        shortTitle: "SaaS",
        description: "Scalable multi-user platforms, dashboards, subscription systems and cloud applications.",
        detail: "We turn a product vision into a secure, maintainable SaaS foundation—covering the experience, architecture and operational detail needed to grow with confidence.",
        deliverables: ["Product strategy", "Multi-tenant architecture", "Subscriptions and billing", "Admin and analytics"],
    },
    {
        slug: "web-applications",
        title: "Web Applications",
        shortTitle: "Web",
        description: "Complex browser-based products and operational systems made clear, fast and reliable.",
        detail: "From customer portals to data-rich operational tools, we create web applications around the real work people need to accomplish every day.",
        deliverables: ["UX and prototyping", "Frontend engineering", "API development", "Quality assurance"],
    },
    {
        slug: "mobile-applications",
        title: "Mobile Applications",
        shortTitle: "Mobile",
        description: "Native-feeling mobile experiences designed for the way your customers actually move.",
        detail: "We design and engineer focused mobile products that feel at home on every device and stay connected to the systems behind your business.",
        deliverables: ["Mobile product design", "Cross-platform development", "Backend integration", "Store readiness"],
    },
    {
        slug: "business-systems",
        title: "Business Systems",
        shortTitle: "Systems",
        description: "Internal tools, portals, workflow systems and automation built around your operation.",
        detail: "We replace fragmented spreadsheets and repetitive processes with tools that make work visible, consistent and easier to improve.",
        deliverables: ["Process discovery", "Internal portals", "Workflow automation", "System integrations"],
    },
    {
        slug: "ai-automation",
        title: "AI & Automation",
        shortTitle: "AI",
        description: "Practical AI-enabled workflows, integrations and intelligent automation with clear value.",
        detail: "We find the places where intelligent automation removes friction, then build governed systems that keep people in control.",
        deliverables: ["Opportunity mapping", "AI workflow design", "Model integration", "Evaluation and monitoring"],
    },
    {
        slug: "modernisation",
        title: "Modernisation",
        shortTitle: "Modernise",
        description: "Rebuilding outdated applications and architectures for the next stage of growth.",
        detail: "We help teams move beyond brittle legacy systems through a measured plan that protects business continuity while improving the foundation.",
        deliverables: ["Technical audit", "Modernisation roadmap", "Incremental rebuild", "Cloud migration"],
    },
];

export const caseStudies: CaseStudy[] = [
    {
        slug: "meridian",
        name: "Meridian",
        type: "Concept profile · FinTech SaaS",
        description: "A financial operations platform rebuilt around a clear, scalable event-driven architecture.",
        services: ["Product Design", "Web Development", "Cloud"],
        outcome: "A resilient platform foundation designed for faster product evolution.",
        theme: "blue",
    },
    {
        slug: "northstar",
        name: "Northstar",
        type: "Concept profile · Logistics",
        description: "One operational view connecting planning, field teams and real-time delivery information.",
        services: ["Discovery", "UX Design", "Systems Engineering"],
        outcome: "A simpler workflow and one reliable source of operational truth.",
        theme: "sand",
    },
    {
        slug: "lumen",
        name: "Lumen",
        type: "Concept profile · ClimateTech",
        description: "A decision-support product that turns complex environmental data into clear next actions.",
        services: ["Product Strategy", "Data Visualisation", "Platform"],
        outcome: "Complex information made useful for day-to-day decisions.",
        theme: "mint",
    },
];

export const principles = [
    ["Built beyond launch", "We engineer foundations that can support the product after version one."],
    ["Built for change", "Clear architecture makes future features easier rather than progressively harder."],
    ["Built for ownership", "Maintainable code, documentation and systems your business actually owns."],
    ["Built together", "Direct access to the people designing and engineering your product."],
] as const;

export const processSteps = [
    ["Discover", ["Business goals", "Users", "Requirements", "Technical constraints"]],
    ["Design", ["UX", "Architecture", "Prototype", "Delivery plan"]],
    ["Engineer", ["Development", "Testing", "Reviews", "Iteration"]],
    ["Launch", ["Infrastructure", "Deployment", "Monitoring", "Training"]],
    ["Evolve", ["Support", "Optimisation", "New features", "Scaling"]],
] as const;

export const technologies = [
    ["Frontend", ["React", "Next.js", "TypeScript"]],
    ["Backend", ["Node.js", ".NET", "Python"]],
    ["Infrastructure", ["AWS", "Azure", "Docker", "PostgreSQL"]],
    ["Mobile", ["React Native", "Flutter"]],
] as const;
