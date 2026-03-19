const KnowledgeBase = {
    // THE ARCHITECT'S CREED: "I do not fight my nature—I design for it."

    // VOL I: ARCHITECT OS (Technical Navigation)
    architectOS: [
        { id: "A01", title: "The Landscape of the Storm", sub: "Symptom Soup", content: "Recognize that the internal atmosphere is a shifting ecosystem. Map the intersections of anxiety, restlessness, and fog." },
        { id: "A02", title: "The Anatomy of Shutdown", sub: "The Evacuation", content: "The Pilot goes offline to preserve resources. This is a biological protocol, not a failure of will." },
        { id: "A10", title: "The 70% Governor", sub: "Sustainable Yield", content: "Redlining at 100% leads to executive burnout. Preserve 30% overhead for system stability." },
        { id: "A15", title: "The 10/20 Brakes", sub: "Loop Interrupts", content: "10 mins ruminating? Change the Body. 20 mins stuck? Change the Location." },
        { id: "A22", title: "Atmospheric Calibration", sub: "Medication & Environment", content: "Adjusting the external to stabilize the internal. Lighting, sound, and chemical balance." },
        { id: "A30", title: "External Scaffolding", sub: "Interdisciplinary Support", content: "Trusted friends and doctors act as External Pilots when your own Pilot has evacuated." },
        { id: "A33", title: "The Architect's Creed", sub: "Final Integration", content: "I am the Pilot of a complex craft. I cannot control the weather, but I possess the tools to navigate it." }
        // Full 33-chapter index mapped in the Vault...
    ],

    // VOL II: A JOURNEY TO ZION (Spiritual Journey)
    journeyToZion: [
        { id: "Z01", title: "The Closet of Many Faces", sub: "The Art of the Mask", content: "The negotiation with the mirror. Taking off the paint to find the created identity." },
        { id: "Z02", title: "The Untamed Faucet", sub: "Bipolar 1 Hurricane", content: "A high-frequency stream of consciousness. Anchoring in the midst of the storm." },
        { id: "Z05", title: "100lbs of Dead Weight", sub: "Physicality of Shame", content: "Shame has mass. Lay the lead at the foot of the Cross to begin the ascent." },
        { id: "Z06", title: "The Pills are Laughing", sub: "Chemical vs Spiritual", content: "The hollow sedation of addiction meeting the chime of sanity." },
        { id: "Z13", title: "The 12-Hour Vigil", sub: "Tangible Presence", content: "The moment of seeking on the floor. The weight of the Spirit replacing the weight of the clay." },
        { id: "Z15", title: "November 29: The Snap", sub: "Reposition of Motion", content: "The single chime of divine intervention. Trading the heart of stone for a heart of flesh." },
        { id: "Z19", title: "The War Room of Zion", sub: "Retaking the Land", content: "Establishing spiritual authority. The battle for the territory of the heart." },
        { id: "Z20", title: "Welcome Home to Zion", sub: "The Infinite Exchange", content: "Ashes for beauty. Your story is no longer bleeding; it is beginning." }
    ],

    // SYSTEM STATES (The Interwoven Logic)
    states: {
        yellow: {
            label: "STATIC",
            sub: "Symptom Soup",
            tech: "ARCHITECT OS: Map the intersections. Do not seek a 'cause'—stabilize the terrain.",
            spirit: "JOURNEY TO ZION: You are in the 'Black Room.' The silence is a lie. Wait for the chime.",
            scripture: "Psalm 139:12",
            speed: '8s',
            checklist: ["Dim lights to 20%", "Activate Brown Noise", "Check Med-Sync"]
        },
        red: {
            label: "HEAT",
            sub: "The Snap",
            tech: "ARCHITECT OS: Evacuation Protocol active. The Pilot is offline. Hard-lock decisions.",
            spirit: "JOURNEY TO ZION: The Refiner's Fire. Reposition your motion. Do not negotiate with the mirror.",
            scripture: "Isaiah 43:2",
            speed: '4s',
            checklist: ["Total Deprivation", "4s Box Breathing", "Governor Lock: 70%"]
        },
        green: {
            label: "FLOW",
            sub: "Zion Established",
            tech: "ARCHITECT OS: Prime Directive: Fix the state, take the step. Yield Nectar.",
            spirit: "JOURNEY TO ZION: The War Room is active. Your story is beginning. Stand up.",
            scripture: "Hebrews 12:22",
            speed: '19s',
            checklist: ["Maximize Nectar", "Clear Workspace", "500ml Hydration"]
        }
    }
};
