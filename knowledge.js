const KnowledgeBase = {
    // THE PRIME DIRECTIVE: "Fix the state, then take the step."
    // THE ARCHITECT'S CREED: "I do not fight my nature—I design for it."

    // SECTION A: ATMOSPHERIC CALIBRATION CHECKLIST
    // Triggered automatically during Yellow (Static) or Red (Heat) states.
    checklist: [
        "RECORD_MEDS: Has the last dose been logged?",
        "HYDRATION: 500ml intake confirmed?",
        "LIGHTING: Dimmable/Red shift active?",
        "SENSORY: Noise-canceling or White Noise active?",
        "BIO-CHECK: Are shoulders dropped and jaw relaxed?"
    ],

    // SECTION B: THE VAULT (The 25 Documents + 2 Books)
    // These are accessible via the "02_Vault" tab in the UI.
    vault: [
        { id: "VOL_01", title: "Vol I: Architect OS", content: "Technical Navigation for the Symptom Soup. Focus on External Scaffolding and System Integrity." },
        { id: "VOL_02", title: "Vol II: Spirit", content: "Bleeding Through the Page: The Journey to Zion. Establishing the Mind of Christ." },
        { id: "DOC_03", title: "The Snap: Nov 29", content: "Detailed analysis of the transition event. From logic to spiritual surrender." },
        { id: "DOC_04", title: "External Scaffolding", content: "The blueprint for building interfaces that survive cognitive shutdown." },
        { id: "DOC_05", title: "The War Room", content: "Mental mapping of the space where the Mind of Christ overrides the noise." },
        { id: "DOC_06", title: "Nectar Production", content: "The methodology of yielding high-value output within the 70% Governor limit." },
        { id: "DOC_07", title: "Atmospheric Rules", content: "Specific lighting and sound frequencies for each color state." },
        // Slots 08-25: Awaiting specific text imports
        { id: "DOC_08", title: "Cell_08: Awaiting_Data", content: "Locked." },
        { id: "DOC_09", title: "Cell_09: Awaiting_Data", content: "Locked." },
        { id: "DOC_10", title: "Cell_10: Awaiting_Data", content: "Locked." },
        { id: "DOC_11", title: "Cell_11: Awaiting_Data", content: "Locked." },
        { id: "DOC_12", title: "Cell_12: Awaiting_Data", content: "Locked." },
        { id: "DOC_13", title: "Cell_13: Awaiting_Data", content: "Locked." },
        { id: "DOC_14", title: "Cell_14: Awaiting_Data", content: "Locked." },
        { id: "DOC_15", title: "Cell_15: Awaiting_Data", content: "Locked." },
        { id: "DOC_16", title: "Cell_16: Awaiting_Data", content: "Locked." },
        { id: "DOC_17", title: "Cell_17: Awaiting_Data", content: "Locked." },
        { id: "DOC_18", title: "Cell_18: Awaiting_Data", content: "Locked." },
        { id: "DOC_19", title: "Cell_19: Awaiting_Data", content: "Locked." },
        { id: "DOC_20", title: "Cell_20: Awaiting_Data", content: "Locked." },
        { id: "DOC_21", title: "Cell_21: Awaiting_Data", content: "Locked." },
        { id: "DOC_22", title: "Cell_22: Awaiting_Data", content: "Locked." },
        { id: "DOC_23", title: "Cell_23: Awaiting_Data", content: "Locked." },
        { id: "DOC_24", title: "Cell_24: Awaiting_Data", content: "Locked." },
        { id: "DOC_25", title: "Cell_25: Awaiting_Data", content: "Locked." }
    ],

    // SECTION C: INTERWOVEN STATES
    // Links Technical Navigation (Architect OS) with Spiritual Anchors (Spirit Volume).
    states: [
        {
            id: 'yellow',
            label: 'STATIC',
            sub: 'Symptom Soup',
            tech: "ATMOSPHERIC CALIBRATION: The blur is high. Stop analyzing. Rely on External Scaffolding. Check medication and sensory input.",
            spirit: "THE BLACK ROOM: In the void, the Mind of Christ is the only light. Zion is not lost; it is just quiet.",
            scripture: "Psalm 139:12 - Even the darkness is not dark to You.",
            speed: '8s'
        },
        {
            id: 'red',
            label: 'HEAT',
            sub: 'The Snap',
            tech: "ANATOMY OF SHUTDOWN: System Integrity Critical. Hard-lock the interface. Deploy 4-second box breathing immediately.",
            spirit: "THE WAR ROOM: The fire refines; it does not consume. The battle is already won in the eternal realm.",
            scripture: "Isaiah 43:2 - When you walk through the fire, you shall not be burned.",
            speed: '4s'
        },
        {
            id: 'orange',
            label: 'THREAT',
            sub: 'Friction',
            tech: "DESIGN FOR NATURE: The 'Snap' was a transition. Trust the pre-built logic cells. You designed this OS for this exact moment.",
            spirit: "MOUNT ZION: Wait for the strength that is not your own. You are soaring, even when it feels like falling.",
            scripture: "Isaiah 40:31 - They shall mount up with wings like eagles.",
            speed: '6s'
        },
        {
            id: 'purple',
            label: 'PRESSURE',
            sub: 'Cognitive Load',
            tech: "THE GOVERNOR PROTOCOL: 70% is the hard limit. Every 'Deposit' costs integrity. Prioritize vital nectar; shed the rest.",
            spirit: "PEACE OF CHRIST: Guard your heart. The pressure is a mold, not a crush. The Mind of Christ is your shield.",
            scripture: "Philippians 4:7 - The peace of God, which surpasses all understanding.",
            speed: '10s'
        },
        {
            id: 'blue',
            label: 'GRAVITY',
            sub: 'The Void',
            tech: "VALLEY NAVIGATION: Low energy is a state, not a failure. Use the Neural Pacer to maintain a physiological baseline.",
            spirit: "THE SHEPHERD'S STAFF: Even in the shadow, the OS is active. The Shepherd is the Architect of the valley.",
            scripture: "Psalm 23:4 - I will fear no evil; for You are with me.",
            speed: '12s'
        },
        {
            id: 'green',
            label: 'FLOW',
            sub: 'Apex Alignment',
            tech: "THE PRIME DIRECTIVE: Fix the state, then take the step. High yield mode active. Maximize nectar while integrity is high.",
            spirit: "ZION ESTABLISHED: The journey is realized in the Flow. Bleeding through the page is where the spirit speaks.",
            scripture: "Hebrews 12:22 - You have come to Mount Zion.",
            speed: '19s'
        }
    ]
};
