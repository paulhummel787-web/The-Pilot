const Core = {
    // Persistent state using LocalStorage for UI settings
    // IndexedDB will be used for the heavy 25+ documents in the next step
    state: JSON.parse(localStorage.getItem('apex_db')) || {
        integrity: 0, 
        fuel: 0, 
        logs: [], 
        vault: [] 
    },

    init() {
        this.render();
        this.log("Architect OS: Online. Persistent Storage Active.");
        if (window.Telemetry) Telemetry.init();
    },

    // Handle the 70% Hard Governor logic
    executeDeposit() {
        if (this.state.integrity >= 70) {
            this.log("GOVERNOR_LOCK: 70% threshold reached. Cease operations.");
            this.triggerAlert();
            return;
        }

        const input = document.getElementById('target-input');
        const taskName = input.value || "Standard Logic Cycle";
        
        this.state.integrity += 10;
        this.state.fuel += 100;
        this.state.logs.unshift({ msg: taskName, time: new Date().toLocaleTimeString() });
        
        input.value = "";
        this.save();
        this.render();
        if (window.Telemetry) Telemetry.update();
    },

    // Save a "Cell" (One of your 25 documents)
    addDocument(title, content) {
        this.state.vault.unshift({ title, content, date: new Date().toLocaleDateString() });
        this.save();
        this.render();
    },

    triggerAlert() {
        const hud = document.getElementById('integrity-label');
        hud.classList.add('text-red-500', 'animate-pulse');
        setTimeout(() => hud.classList.remove('animate-pulse'), 3000);
    },

    log(msg) {
        const logger = document.getElementById('system-log');
        const entry = document.createElement('div');
        entry.className = "border-l border-amber-500/30 pl-2 mb-1";
        entry.innerHTML = `<span class="opacity-30">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        logger.prepend(entry);
    },

    render() {
        // Update HUD
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        
        // Render the Vault (Your Documents)
        const vaultGrid = document.getElementById('vault-grid');
        vaultGrid.innerHTML = this.state.vault.map(doc => `
            <div class="p-3 border border-amber-500/10 bg-white/5 hover:bg-amber-500/5 transition-all group">
                <div class="text-[10px] font-black text-white group-hover:text-amber-500 uppercase">${doc.title}</div>
                <div class="text-[8px] opacity-30 mt-1">${doc.date}</div>
            </div>
        `).join('') || '<div class="opacity-20 text-[9px] text-center mt-10">VAULT_EMPTY: AWAITING_DATA</div>';
    },

    save() {
        localStorage.setItem('apex_db', JSON.stringify(this.state));
    }
};

window.onload = () => Core.init();
