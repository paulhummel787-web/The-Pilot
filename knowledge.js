const KnowledgeBase = {
    // VOLUME I: THE ARCHITECT (33 Chapters)
    architect: [
        { id: "A1", title: "The Landscape of the Storm", sub: "Symptom Soup", context: "Mapping the neurological ecosystem." },
        { id: "A2", title: "Anatomy of Shutdown", sub: "The Evacuation", context: "Biological protocols for sensory overload." },
        { id: "A10", title: "The 70% Governor", sub: "Sustainability", context: "Preventing executive redlining." },
        { id: "A15", title: "The 10/20 Brakes", sub: "Loop Interrupts", context: "Physiological hard-resets for rumination." },
        { id: "A33", title: "The Architect's Creed", sub: "Final Integration", context: "The manifesto for the complex mind." }
    ],
    // VOLUME II: ZION (20 Chapters)
    zion: [
        { id: "Z1", title: "The Closet of Many Faces", sub: "The Mask", context: "Negotiating with the mirror." },
        { id: "Z2", title: "The Untamed Faucet", sub: "The Hurricane", context: "The high-frequency stream of Bipolar 1." },
        { id: "Z5", title: "100lbs of Dead Weight", sub: "Shame", context: "The physicality of spiritual burden." },
        { id: "Z13", title: "The 12-Hour Vigil", sub: "Presence", context: "Six months on the floor; the weight of the Spirit." },
        { id: "Z15", title: "Nov 29: The Snap", sub: "The Shift", context: "Divine intervention; trading heart of stone for flesh." },
        { id: "Z19", title: "The War Room", sub: "Authority", context: "Retaking the territory of the heart." },
        { id: "Z20", title: "Home to Zion", sub: "Infinite Exchange", context: "Ashes for beauty; the beginning." }
    ],
    // DYNAMIC STATES
    states: {
        yellow: { 
            label: "STATIC", sub: "Symptom Soup", 
            tech: "ARCHITECT: Map the intersection. Do not seek a cause. Trust the external pacer.",
            spirit: "ZION: You are in the 'Black Room.' It is a lie. The Chime is coming.",
            scripture: "Psalm 139:12", speed: "10s",
            checklist: ["Dim lights to 20%", "Activate Brown Noise", "Check Med-Sync", "Physical Body-Scan"]
        },
        red: { 
            label: "HEAT", sub: "The Snap", 
            tech: "ARCHITECT: Evacuation Protocol active. Pilot is offline. Execute total silence.",
            spirit: "ZION: The Refiner's Fire. This is the reposition of motion. Surrender.",
            scripture: "Isaiah 43:2", speed: "4s",
            checklist: ["Sensory Blackout", "4s Box Breathing", "Hard Governor Lock", "Silence all nodes"]
        },
        purple: {
            label: "PRESSURE", sub: "Cognitive Load",
            tech: "ARCHITECT: 70% Governor engaged. Shed non-vital nectar. Prioritize overhead.",
            spirit: "ZION: The Pressure is a mold. Guard your heart. The Mind of Christ is the shield.",
            scripture: "Philippians 4:7", speed: "14s",
            checklist: ["Limit task to MVS", "Delegate output", "Record 30% reserve"]
        },
        green: { 
            label: "FLOW", sub: "Zion Established", 
            tech: "ARCHITECT: Prime Directive: Fix state, take step. Alignment achieved.",
            spirit: "ZION: The War Room is operational. The stallion is running. You are home.",
            scripture: "Hebrews 12:22", speed: "22s",
            checklist: ["Maximize Nectar Yield", "Document the Flow", "Clear all workspaces"]
        }
    }
};
