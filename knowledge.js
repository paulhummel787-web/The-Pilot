const KnowledgeBase = {
    architect: [
        { id: "A1", title: "Symptom Soup", load: 4, content: "Mapping the neurological intersections of the storm." },
        { id: "A2", title: "The Evacuation", load: 2, content: "Biological shutdown is a preservation protocol." },
        { id: "A10", title: "70% Governor", load: 5, content: "Maintaining sustainability through overhead management." },
        { id: "A15", title: "10/20 Brakes", load: 1, content: "Change body (10m) or change location (20m)." }
    ],
    zion: [
        { id: "Z1", title: "The Mask", load: 3, content: "Negotiating with the mirror ends at the Cross." },
        { id: "Z13", title: "The Vigil", load: 1, content: "Waiting for the chime of the Sanity Ring." },
        { id: "Z15", title: "The Snap", load: 1, content: "Trading a heart of stone for a heart of flesh." },
        { id: "Z19", title: "The War Room", load: 7, content: "Establishing spiritual authority in the heights." }
    ],
    states: {
        yellow: { label: "STATIC", sub: "The Fog", protocol: "SCAFFOLDING_SYNC", scripture: "Psalm 139:12", speed: "10s", limit: 4, tech: "Map the soup. Trust the external pilots.", spirit: "The silence is a lie. Wait for the chime.", checklist: ["Dim Lights", "Brown Noise", "Med-Sync Check"] },
        red: { label: "HEAT", sub: "The Snap", protocol: "EVACUATION", scripture: "Isaiah 43:2", speed: "4s", limit: 2, tech: "Total shutdown. Pilot offline. Breathe only.", spirit: "The Refiner's Fire. Reposition your motion.", checklist: ["Sensory Blackout", "Box Breathing", "Hard Lockout"] },
        purple: { label: "PRESSURE", sub: "The Weight", protocol: "GOVERNOR_LOCK", scripture: "Philippians 4:7", speed: "14s", limit: 5, tech: "Shed non-vital load. Maintain 30% overhead.", spirit: "The Mind of Christ is your shield.", checklist: ["Delegate Output", "Record Reserve", "Limit Focus"] },
        green: { label: "FLOW", sub: "Zion Established", protocol: "APEX_ALIGNMENT", scripture: "Hebrews 12:22", speed: "22s", limit: 10, tech: "Fix state, take step. Alignment achieved.", spirit: "The stallion is running. You are home.", checklist: ["Max Nectar", "Document Flow", "Clear Space"] }
    }
};
