const KnowledgeBase = {
    // VOLUME I: THE ARCHITECT OS (33 Chapters)
    architect: [
        { id: "A1", title: "Landscape of the Storm", sub: "Symptom Soup", tags: ["yellow", "blue"], content: "The Pilot is navigating a high-density fog. Mapping intersections is the only priority." },
        { id: "A2", title: "Anatomy of Shutdown", sub: "Evacuation Protocol", tags: ["red", "orange"], content: "The prefrontal cortex has left the cockpit. Decision-making is now a biological impossibility." },
        { id: "A15", title: "10/20 Brakes", sub: "Physiological Reset", tags: ["purple", "yellow"], content: "10 mins ruminating = Change the Body. 20 mins stuck = Change the Location." },
        { id: "A33", title: "The Architect's Creed", sub: "The Manifesto", tags: ["green"], content: "I do not fight my nature—I design for it. I am the Pilot of a complex craft." }
    ],
    // VOLUME II: JOURNEY TO ZION (20 Chapters)
    zion: [
        { id: "Z1", title: "The Closet of Many Faces", sub: "The Mask", tags: ["yellow", "orange"], content: "The negotiation with the mirror ends here. Strip the paint; find the created face." },
        { id: "Z2", title: "The Untamed Faucet", sub: "The Hurricane", tags: ["red", "purple"], content: "The high-frequency stream of Bipolar 1. You are not the water; you are the pipe." },
        { id: "Z13", title: "The 12-Hour Vigil", sub: "Tangible Presence", tags: ["blue", "purple"], content: "Six months on the floor. The weight of the Spirit is heavier than the weight of the clay." },
        { id: "Z15", title: "Nov 29: The Snap", sub: "The Shift", tags: ["red"], content: "The single chime of divine intervention. The laughing pills go silent. The heart of stone is traded." },
        { id: "Z19", title: "The War Room", sub: "Authority", tags: ["green"], content: "Retaking the territory of the heart. Establishing spiritual sovereignty." }
    ],
    states: {
        yellow: { label: "STATIC", sub: "Symptom Soup", protocol: "ATMOSPHERIC_CALIBRATION", speed: "10s", scripture: "Psalm 139:12", tech: "ARCHITECT: Map the intersections. Trust the external scaffolding.", spirit: "ZION: You are in the Black Room. Wait for the Sanity Ring." },
        red: { label: "HEAT", sub: "The Snap", protocol: "EVACUATION_PROTOCOL", speed: "4s", scripture: "Isaiah 43:2", tech: "ARCHITECT: Total shutdown. Decouple from language. Breathe only.", spirit: "ZION: The Refiner's Fire. Reposition your motion. Surrender now." },
        purple: { label: "PRESSURE", sub: "Cognitive Load", protocol: "GOVERNOR_LOCK", speed: "14s", scripture: "Philippians 4:7", tech: "ARCHITECT: 70% Governor engaged. Shed all non-essential nectar.", spirit: "ZION: The Mind of Christ is your shield. The pressure is a mold." },
        green: { label: "FLOW", sub: "Zion Established", protocol: "APEX_ALIGNMENT", speed: "22s", scripture: "Hebrews 12:22", tech: "ARCHITECT: Prime Directive Active. Fix state, then take the step.", spirit: "ZION: The stallion is running. You are home. Stand up." }
    }
};
