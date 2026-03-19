const KnowledgeBase = {
    // VOLUME I: ARCHITECT (33 Chapters)
    architect: [
        { id: "A1", title: "Symptom Soup", tags: ["yellow", "green"], content: "The complex mind lives in an ecosystem of overlapping currents." },
        { id: "A2", title: "The Evacuation", tags: ["red", "yellow"], content: "Shutdown is a protective biological protocol. The Pilot is offline." },
        { id: "A15", title: "10/20 Brakes", tags: ["yellow", "purple", "green"], content: "Physiological hard-resets for cognitive loops." },
        { id: "A33", title: "The Creed", tags: ["green", "yellow", "purple", "red"], content: "I do not fight my nature—I design for it." }
    ],
    // VOLUME II: ZION (20 Chapters)
    zion: [
        { id: "Z1", title: "The Mask", tags: ["yellow", "green"], content: "Strip the paint. Find the created face." },
        { id: "Z13", title: "The Vigil", tags: ["red", "purple"], content: "Six months on the floor. The weight of the Spirit." },
        { id: "Z15", title: "The Snap", tags: ["red"], content: "November 29: Trading the heart of stone for flesh." },
        { id: "Z19", title: "The War Room", tags: ["green"], content: "Retaking the land. Establishing authority." }
    ],
    states: {
        yellow: { label: "STATIC", sub: "The Fog", protocol: "SCAFFOLDING_SYNC", tech: "ARCHITECT: Map the intersection. Trust the external pilots.", spirit: "ZION: The silence is a lie. Wait for the chime.", scripture: "Psalm 139:12", speed: "10s", checklist: ["Dim Lights 20%", "Brown Noise ON", "Check Med-Sync"] },
        red: { label: "HEAT", sub: "The Snap", protocol: "EVACUATION", tech: "ARCHITECT: Total shutdown. Pilot is offline. Breathe only.", spirit: "ZION: The Refiner's Fire. Reposition your motion. Surrender.", scripture: "Isaiah 43:2", speed: "4s", checklist: ["Sensory Blackout", "Box Breathing", "Hard Governor Lock"] },
        purple: { label: "PRESSURE", sub: "The Weight", protocol: "GOVERNOR_LOCK", tech: "ARCHITECT: 70% Governor active. Shed non-vital load.", spirit: "ZION: The Mind of Christ is your shield. Guard the heart.", scripture: "Philippians 4:7", speed: "14s", checklist: ["Limit tasks", "Delegate output", "Record 30% Reserve"] },
        green: { label: "FLOW", sub: "Zion", protocol: "APEX_ALIGNMENT", tech: "ARCHITECT: Fix state, take step. Alignment achieved.", spirit: "ZION: The stallion is running. You are home.", scripture: "Hebrews 12:22", speed: "22s", checklist: ["Max Nectar", "Document Flow", "Clear Workspace"] }
    }
};
