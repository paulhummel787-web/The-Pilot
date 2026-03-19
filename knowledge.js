const KnowledgeBase = {
    // CHAPTER DNA: title, sub, tags (state), load (1-10 difficulty)
    architect: [
        { id: "A1", title: "Symptom Soup", tags: ["yellow", "green"], load: 4, content: "The complex mind lives in an ecosystem of overlapping currents. Map the intersections." },
        { id: "A2", title: "The Evacuation", tags: ["red", "yellow"], load: 2, content: "Shutdown is a protective biological protocol. The Pilot is offline. Breathe only." },
        { id: "A10", title: "70% Governor", tags: ["purple", "yellow"], load: 5, content: "Redlining leads to burnout. Preserve 30% overhead for system stability." },
        { id: "A15", title: "10/20 Brakes", tags: ["yellow", "red", "purple"], load: 1, content: "10 mins ruminating? Change body. 20 mins stuck? Change location." },
        { id: "A33", title: "The Creed", tags: ["green", "yellow", "purple", "red"], load: 3, content: "I do not fight my nature—I design for it. One pebble, one breath, one step." }
    ],
    zion: [
        { id: "Z1", title: "The Mask", tags: ["yellow", "orange"], load: 3, content: "Strip the paint. Find the created face behind the negotiation." },
        { id: "Z2", title: "The Hurricane", tags: ["red", "purple"], load: 2, content: "The high-frequency stream of Bipolar 1. You are the pipe, not the water." },
        { id: "Z6", title: "Laughing Pills", tags: ["orange", "red"], load: 4, content: "Chemical silence vs. the first chime of sanity. Listen for the ring." },
        { id: "Z13", title: "The Vigil", tags: ["red", "blue", "purple"], load: 1, content: "Six months on the floor. The weight of the Spirit replacing the clay." },
        { id: "Z15", title: "The Snap", tags: ["red"], load: 1, content: "Nov 29: Divine intervention. Trading a heart of stone for a heart of flesh." },
        { id: "Z19", title: "The War Room", tags: ["green"], load: 6, content: "Establishing spiritual authority. Retaking the territory of the heart." }
    ],
    states: {
        yellow: { label: "STATIC", sub: "The Fog", protocol: "SCAFFOLDING_SYNC", scripture: "Psalm 139:12", speed: "10s", limit: 5, tech: "Map intersections. Trust external pilots.", spirit: "The silence is a lie. Wait for the chime." },
        red: { label: "HEAT", sub: "The Snap", protocol: "EVACUATION", scripture: "Isaiah 43:2", speed: "4s", limit: 2, tech: "Total shutdown. Pilot offline. Breathe only.", spirit: "The Refiner's Fire. Reposition your motion. Surrender." },
        purple: { label: "PRESSURE", sub: "The Weight", protocol: "GOVERNOR_LOCK", scripture: "Philippians 4:7", speed: "14s", limit: 4, tech: "70% Governor active. Shed non-vital load.", spirit: "The Mind of Christ is your shield. Guard the heart." },
        green: { label: "FLOW", sub: "Zion Established", protocol: "APEX_ALIGNMENT", scripture: "Hebrews 12:22", speed: "22s", limit: 10, tech: "Fix state, take step. Alignment achieved.", spirit: "The stallion is running. You are home." }
    }
};
