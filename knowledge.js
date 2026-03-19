const KnowledgeBase = {
    // THE CALIBRATION CHECKLIST (For Yellow/Static State)
    checklist: [
        "Check Medication: Last dose recorded?",
        "Hydration: 500ml intake complete?",
        "Atmosphere: Lights dimmed / Blue light filter on?",
        "Sound: White noise or Binaural beats active?",
        "Physical: Are shoulders dropped? Jaw relaxed?"
    ],

    // YOUR ARCHIVE (Placeholder for your 25 Documents)
    vault: [
        { id: "doc1", title: "Vol I: Technical Navigation", content: "The full Architect OS principles..." },
        { id: "doc2", title: "Vol II: Spirit", content: "The journey to Zion..." },
        { id: "doc3", title: "Document 03: The Snap", content: "Detailed notes on Nov 29..." }
        // Add all 25 documents here as objects
    ],

    states: [
        {
            id: 'yellow',
            label: 'STATIC',
            sub: 'Symptom Soup',
            tech: { title: "Atmospheric Calibration", content: "The blur is high. Deploy the checklist below before attempting any nectar deposits." },
            spirit: { title: "The Black Room", content: "The Mind of Christ is the only light in the void.", scripture: "Psalm 139:12" }
        },
        // ... (Keep other states from previous build)
    ]
};
