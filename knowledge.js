const KnowledgeBase = {
    // Volume I: Technical Navigation (Architect OS)
    technical: [
        { id: "soup", title: "Symptom Soup", content: "Recognize the blur. When symptoms overlap, stop analyzing. Deploy Atmospheric Calibration.", trigger: "yellow" },
        { id: "shutdown", title: "Anatomy of Shutdown", content: "The snap is physical. External Scaffolding is mandatory. Move to the War Room.", trigger: "red" },
        { id: "scaffold", title: "External Scaffolding", content: "Logic is the first to fail. Rely on the pre-built interface. Trust the code you wrote in Flow.", trigger: "purple" }
    ],

    // Volume II: Spirit (Bleeding Through the Page)
    spiritual: [
        { id: "black-room", title: "The Black Room", content: "In the void, the Mind of Christ is the only light. Zion is not a place, but a state of being.", scripture: "Psalm 23:4", trigger: "blue" },
        { id: "zion", title: "The War Room of Zion", content: "Establishing the Mind of Christ. The snap of Nov 29 was a transition, not an end.", scripture: "Philippians 4:7", trigger: "green" },
        { id: "snap", title: "The Snap", content: "When the mind breaks, the Spirit takes over. Surrender the technical to the eternal.", scripture: "Isaiah 40:31", trigger: "orange" }
    ],

    // Function to find the "Truth" you need based on your current state
    getRelief(state) {
        const tech = this.technical.find(t => t.trigger === state);
        const spirit = this.spiritual.find(s => s.trigger === state);
        return { tech, spirit };
    }
};
