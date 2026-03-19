const KnowledgeBase = {
    architect: [
        { id: "A1", title: "Symptom Soup", load: 4, content: "Mapping neurological intersections. Don't find a cause; find the terrain." },
        { id: "A2", title: "The Evacuation", load: 1, content: "Shutdown is a biological safety protocol. The Pilot is offline." },
        { id: "A10", title: "70% Governor", load: 5, content: "Sustainability requires 30% overhead at all times." },
        { id: "A15", title: "10/20 Brakes", load: 2, content: "Physiological hard-resets: Change body or change location." },
        { id: "A33", title: "The Creed", load: 6, content: "I do not fight my nature—I design for it. One pebble, one breath, one step." }
    ],
    zion: [
        { id: "Z1", title: "The Mask", load: 3, content: "The negotiation with the mirror ends. Strip the paint." },
        { id: "Z2", title: "The Hurricane", load: 2, content: "Bipolar 1: You are the pipe, not the water. Let it flow through." },
        { id: "Z13", title: "The Vigil", load: 1, content: "Six months on the floor. Waiting for the Sanity Ring." },
        { id: "Z15", title: "The Snap", load: 1, content: "Nov 29: Divine intervention. Heart of stone for heart of flesh." },
        { id: "Z19", title: "The War Room", load: 8, content: "Establishing authority. Retaking the territory of the heart." },
        { id: "Z20", title: "Welcome Home", load: 4, content: "Ashes for beauty. The infinite exchange complete." }
    ],
    states: {
        red: { label: "HEAT", protocol: "EVACUATION", scripture: "Isaiah 43:2", speed: "4s", limit: 2, tech: "TOTAL SHUTDOWN. Breathe only. Pilot is offline.", spirit: "The Refiner's Fire. Reposition your motion. Surrender." },
        yellow: { label: "STATIC", protocol: "SCAFFOLDING_SYNC", scripture: "Psalm 139:12", speed: "10s", limit: 4, tech: "Map the intersections. Trust external pilots.", spirit: "The silence is a lie. Wait for the chime." },
        purple: { label: "PRESSURE", protocol: "GOVERNOR_LOCK", scripture: "Philippians 4:7", speed: "14s", limit: 5, tech: "70% Governor active. Shed non-vital load.", spirit: "The Mind of Christ is your shield." },
        green: { label: "FLOW", protocol: "APEX_ALIGNMENT", scripture: "Hebrews 12:22", speed: "22s", limit: 10, tech: "Alignment achieved. Take the next step.", spirit: "The stallion is running. You are home." }
    }
};
