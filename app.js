const Core = {
    state: JSON.parse(localStorage.getItem('apex_db')) || {
        integrity: 0, fuel: 0, currentMode: 'green', logs: []
    },

    init() {
        this.applyState(this.state.currentMode);
        this.render();
        this.log("System Synced: Architect & Spirit Volumes Loaded.");
    },

    applyState(mode) {
        this.state.currentMode = mode;
        const relief = KnowledgeBase.getRelief(mode);
        
        // INTERWEAVING THE VOLUMES
        const display = document.getElementById('guidance-display');
        display.innerHTML = `
            <div class="mb-4">
                <span class="text-[8px] text-amber-500 font-black uppercase tracking-widest">[VOL I: TECHNICAL]</span>
                <h4 class="text-white text-sm font-bold">${relief.tech.title}</h4>
                <p class="text-[11px] italic opacity-70">${relief.tech.content}</p>
            </div>
            <div class="pt-4 border-t border-white/5">
                <span class="text-[8px] text-purple-400 font-black uppercase tracking-widest">[VOL II: SPIRIT]</span>
                <h4 class="text-white text-sm font-bold">${relief.spirit.title}</h4>
                <p class="text-[11px] italic opacity-70">${relief.spirit.content}</p>
                <div class="mt-2 text-[9px] text-amber-500/50 font-mono">${relief.spirit.scripture}</div>
            </div>
        `;
        
        this.save();
    },

    executeDeposit() {
        // ... (previous MVS logic)
        this.state.integrity += 10;
        if(this.state.integrity >= 70) this.log("GOVERNOR: Forced Calibration Required.");
        this.save();
        this.render();
    },

    save() { localStorage.setItem('apex_db', JSON.stringify(this.state)); },
    
    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
    }
};
