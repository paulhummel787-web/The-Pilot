const KnowledgeBase = {
    architectOS: [
        { id: "A01", title: "Landscape of the Storm", sub: "Symptom Soup", content: "Stop seeking a single 'cause.' The internal atmosphere is a dynamic ecosystem. Map the intersection of the storm." },
        { id: "A02", title: "Anatomy of Shutdown", sub: "The Evacuation", content: "Shutdown is a biological protocol. The brain's 'Pilot' goes offline to preserve resources. This is not a failure of will." },
        { id: "A10", title: "The 70% Governor", sub: "Sustainability", content: "Redlining leads to executive burnout. Preserve 30% overhead for long-term system stability." },
        { id: "A15", title: "The 10/20 Brakes", sub: "Loop Interrupts", content: "10 mins ruminating? Change the body. 20 mins stuck? Change the location. Hard-coded interrupts." },
        { id: "A33", title: "The Architect's Creed", sub: "The Manifesto", content: "I do not fight my nature—I design for it. One pebble, one breath, one step. I am the Architect of my stability." }
    ],
    journeyToZion: [
        { id: "Z01", title: "The Closet of Many Faces", sub: "Art of the Mask", content: "The negotiation with the mirror. Take off the paint to find the created identity." },
        { id: "Z02", title: "The Untamed Faucet", sub: "Bipolar 1 Hurricane", content: "A high-frequency stream of consciousness. Anchoring in the midst of the gale." },
        { id: "Z05", title: "100lbs of Dead Weight", sub: "Weight of Shame", content: "Shame has mass. Lay the lead at the foot of the Cross to begin the ascent." },
        { id: "Z06", title: "The Pills are Laughing", sub: "Chemical Silence", content: "The hollow sedation of addiction meeting the first chime of sanity." },
        { id: "Z13", title: "The 12-Hour Vigil", sub: "Tangible Presence", content: "Six months on the floor leading to the moment of Seeking. The weight of the Spirit." },
        { id: "Z15", title: "November 29: The Snap", sub: "Reposition of Motion", content: "The single chime of divine intervention. Trading a heart of stone for a heart of flesh." },
        { id: "Z19", title: "The War Room of Zion", sub: "Retaking the Land", content: "Establishing spiritual authority. The battle for the territory of the heart." }
    ],
    states: {
        yellow: { label: "STATIC", sub: "Symptom Soup", tech: "ARCHITECT: Map the intersections. Stabilize the terrain.", spirit: "SPIRIT: You are in the Black Room. Wait for the chime.", scripture: "Psalm 139:12", speed: '10s', checklist: ["Dim Lights 20%", "Brown Noise ON", "Check Med-Sync"] },
        red: { label: "HEAT", sub: "The Snap", tech: "ARCHITECT: Evacuation Protocol active. Pilot is offline.", spirit: "SPIRIT: The Refiner's Fire. Reposition your motion.", scripture: "Isaiah 43:2", speed: '4s', checklist: ["Sensory Deprivation", "4s Box Breathing", "Governor Lock: 70%"] },
        green: { label: "FLOW", sub: "Zion Established", tech: "ARCHITECT: Prime Directive Active. Fix state, take step.", spirit: "SPIRIT: Welcome home to Zion. The story is beginning.", scripture: "Hebrews 12:22", speed: '20s', checklist: ["Maximize Nectar", "Clear Surfaces", "Hydration 500ml"] }
    }
};
