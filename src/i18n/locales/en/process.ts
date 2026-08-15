export const process = {
    meta: { title: "Process", description: "A transparent software development process from discovery and design through engineering, launch and evolution." },
    hero: { eyebrow: "Our process", title: "Clarity at every stage.", description: "A disciplined but adaptable path from early uncertainty to dependable software—built around frequent decisions, visible progress and shared ownership.", action: "Plan a project" },
    overview: { eyebrow: "From idea to production", titleLine1: "Structure without", titleLine2: "the theatre.", description: "Each phase creates the evidence needed for the next. No black boxes, ceremonial handoffs or months spent building in isolation." },
    steps: [
        { title: "Discover", description: "We get close to the business, users and constraints before deciding what the product should be.", items: ["Business goals", "Users", "Requirements", "Technical constraints"] },
        { title: "Design", description: "We make the experience tangible and the technical direction explicit before the build gathers momentum.", items: ["UX", "Architecture", "Prototype", "Delivery plan"] },
        { title: "Engineer", description: "Small, reviewed increments keep progress visible, quality high and learning connected to delivery.", items: ["Development", "Testing", "Reviews", "Iteration"] },
        { title: "Launch", description: "A launch is engineered, not improvised—with infrastructure, observability and handover considered early.", items: ["Infrastructure", "Deployment", "Monitoring", "Training"] },
        { title: "Evolve", description: "We use real product feedback to improve, extend and scale without compromising the foundation.", items: ["Support", "Optimisation", "New features", "Scaling"] },
    ],
} as const;
