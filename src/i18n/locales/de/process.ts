export const process = {
    meta: { title: "Prozess", description: "Ein transparenter Softwareentwicklungsprozess von Discovery und Design über Engineering und Launch bis zur Weiterentwicklung." },
    hero: { eyebrow: "Unser Prozess", title: "Klarheit in jeder Phase.", description: "Ein disziplinierter, aber anpassungsfähiger Weg von früher Unsicherheit zu verlässlicher Software — geprägt von häufigen Entscheidungen, sichtbarem Fortschritt und geteilter Verantwortung.", action: "Projekt planen" },
    overview: { eyebrow: "Von der Idee zur Produktion", titleLine1: "Struktur ohne", titleLine2: "unnötiges Theater.", description: "Jede Phase schafft die Grundlage für die nächste. Keine Blackboxes, zeremoniellen Übergaben oder monatelange Entwicklung in Isolation." },
    steps: [
        { title: "Entdecken", description: "Wir verstehen Unternehmen, Nutzer und Einschränkungen, bevor wir entscheiden, was das Produkt sein sollte.", items: ["Geschäftsziele", "Nutzer", "Anforderungen", "Technische Einschränkungen"] },
        { title: "Gestalten", description: "Wir machen das Erlebnis greifbar und die technische Richtung explizit, bevor die Entwicklung an Tempo gewinnt.", items: ["UX", "Architektur", "Prototyp", "Lieferplan"] },
        { title: "Entwickeln", description: "Kleine, geprüfte Schritte halten Fortschritt sichtbar, Qualität hoch und Lernen mit der Lieferung verbunden.", items: ["Entwicklung", "Tests", "Reviews", "Iteration"] },
        { title: "Starten", description: "Ein Launch wird entwickelt, nicht improvisiert — Infrastruktur, Beobachtbarkeit und Übergabe werden früh bedacht.", items: ["Infrastruktur", "Bereitstellung", "Monitoring", "Schulung"] },
        { title: "Weiterentwickeln", description: "Wir nutzen echtes Produktfeedback, um zu verbessern, zu erweitern und zu skalieren, ohne das Fundament zu gefährden.", items: ["Support", "Optimierung", "Neue Funktionen", "Skalierung"] },
    ],
} as const;
