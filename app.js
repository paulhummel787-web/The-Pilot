const Core = {
    state: JSON.parse(localStorage.getItem('apex_db')) || {
        integrity: 0, fuel: 0, currentMode: 'green', logs: []
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.currentMode);
        this.render();
        if(window.Telemetry) Telemetry.init();
        this.log("Architect OS: Construction Phase Complete. Systems Interwoven.");
    },

    renderMatrix() {
        const matrix = document.getElementById('state-matrix');
        matrix.innerHTML = KnowledgeBase.states.map(s => `
            <button onclick="Core.applyState('${s.id}')" 
                    class="state-btn w-full p-4 border border-white/5 text-left group" 
                    id="btn-${s.id}" 
                    style="--pacer-color: var(--${s.id})">
                <div class="text-[10px] font-black uppercase tracking-widest">${s.label}</div>
                <div class="text-[7px] opacity-30 uppercase italic">${s.sub}</div>
            </button>
        `).join('');
    },

    applyState(modeId) {
        const stateData = KnowledgeBase.states.find(s => s.id === modeId);
        this.state.currentMode = modeId;

        // 1. SET THE ATMOSPHERE
        const root = document.documentElement;
        const color = getComputedStyle(root).getPropertyValue('--' + modeId).trim();
        root.style.setProperty('--pacer-color', color);

        // 2. SET THE PACER SPEED (Biometric Override)
        // Red/Orange = Fast Box Breathing (4s) | Green = Deep Flow (19s) | Blue = Rest (12s)
        const speeds = { red: '4s', orange: '6s', yellow: '8s', purple: '10s', blue: '12s', green: '19s' };
        root.style.setProperty('--pacer-speed', speeds[modeId]);

        // 3. UPDATE THE HUD
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${modeId}`).classList.add('active');
        
        document.getElementById('pacer-container').className = `glass-pane flex-1 flex flex-col p-6 relative overflow-hidden pacer-active`;

        // 4. INJECT THE INTERWOVEN VOLUMES
        document.getElementById('tech-display').innerHTML = `
            <div class="animate-pulse text-[8px] text-amber-500/50 mb-2 uppercase">Calibration: Active</div>
            <h2 class="text-3xl font-black text-white uppercase tracking-tighter">${stateData.tech.title}</h2>
            <p class="text-sm italic opacity-60 mt-4 leading-relaxed">${stateData.tech.content}</p>
        `;

        document.getElementById('spirit-display').innerHTML = `
            <div class="text-[8px] text-white/20 mb-2 uppercase tracking-[0.4em]">Volume II: The Mind of Christ</div>
            <h2 class="text-2xl font-black text-white uppercase tracking-tighter">${stateData.spirit.title}</h2>
            <p class="text-[14px] italic opacity-80 mt-4 leading-relaxed">${stateData.spirit.content}</p>
            <div class="mt-8 p-4 bg-amber-500/5 border-l-2 border-amber-500/40 text-[10px] text-amber-500 italic">
                <i class="fas fa-quote-left opacity-30 mr-2"></i>${stateData.spirit.scripture}
            </div>
        `;

        this.log(`ROTATION: Shifted to ${modeId.toUpperCase()} Mode.`);
        this.save();
    },

    executeDeposit() {
        if(this.state.integrity >= 70) {
            this.log("GOVERNOR_LOCK: Prime Directive violation. Fix state first.");
            return;
        }
        this.state.integrity += 10;
        this.state.fuel += 50;
        this.state.logs.unshift({ msg: "Nectar Deposit", time: new Date().toLocaleTimeString() });
        this.render();
        this.save();
        if(window.Telemetry) Telemetry.update();
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
    },

    save() { localStorage.setItem('apex_db', JSON.stringify(this.state)); },

    log(msg) {
        const logger = document.getElementById('system-log');
        const entry = document.createElement('div');
        entry.className = "mb-1 border-l border-white/5 pl-2";
        entry.innerHTML = `<span class="opacity-20">[${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span> ${msg}`;
        logger.prepend(entry);
    }
};

window.onload = () => Core.init();
