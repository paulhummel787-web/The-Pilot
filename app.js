/**
 * ZION SOVEREIGN ENGINE v6.0
 * Protocol: Hard-Coded Scaffolding & Crisis Relay
 */

const Core = {
    state: JSON.parse(localStorage.getItem('zion_omni_v6')) || { 
        integrity: 0, 
        fuel: 0, 
        mode: 'green', 
        tab: 'spirit',
        isCrisis: false,
        waveHistory: Array(20).fill(0)
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.mode);
        this.render();
        // Start the Sovereign Monitor (Runs every 1.5s)
        setInterval(() => this.systemMonitor(), 1500);
        this.log("SOVEREIGN_ENGINE: Monitoring Wave Telemetry...");
    },

    /* ==========================================================================
       🚨 THE SOVEREIGN MONITOR (The 70% Governor & Crisis Relay)
       ========================================================================== */
    systemMonitor() {
        // 1. THE 70% GOVERNOR: Physical lockout of productivity
        const depositBtn = document.getElementById('deposit-btn');
        if (this.state.integrity >= 70) {
            depositBtn.innerHTML = "GOVERNOR_LOCKED: RESTORE INTEGRITY";
            depositBtn.classList.add('opacity-50', 'cursor-not-allowed', 'border-red-500/50');
            depositBtn.classList.remove('hover:bg-white');
        } else {
            depositBtn.innerHTML = "DEPOSIT_NECTAR";
            depositBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'border-red-500/50');
            depositBtn.classList.add('hover:bg-white');
        }

        // 2. THE CRISIS RELAY: Automatic UI Takeover
        if (this.state.integrity >= 85 && (this.state.mode === 'red' || this.state.mode === 'yellow')) {
            if (!this.state.isCrisis) this.triggerCrisisRelay();
        }
    },

    triggerCrisisRelay() {
        this.state.isCrisis = true;
        this.log("CRITICAL: Crisis Relay Triggered. External Pilot required.");
        const port = document.getElementById('right-viewport');
        port.innerHTML = `
            <div class="p-10 border-4 border-red-600 bg-red-900/20 rounded-lg animate-pulse">
                <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tighter text-center">Protocol: EVACUATION</h2>
                <p class="text-xl text-red-200 italic mb-10 border-l-4 border-red-500 pl-6 leading-relaxed">
                    "The Pilot is offline. The Architect has signaled for External Scaffolding. Do not negotiate with the mirror."
                </p>
                <div class="grid grid-cols-1 gap-6 mb-10">
                    <div class="glass p-6 border-white/20">
                        <div class="text-[10px] uppercase opacity-40 mb-2">Primary Scaffolding</div>
                        <div class="text-2xl font-bold">Contact: [EMERGENCY_PILOT_NAME]</div>
                    </div>
                    <div class="glass p-6 border-white/20">
                        <div class="text-[10px] uppercase opacity-40 mb-2">Atmospheric Calibration</div>
                        <div class="text-2xl font-bold italic">"Did you take your medication today?"</div>
                    </div>
                </div>
                <button onclick="Core.resetCrisis()" class="w-full h-20 bg-white text-black font-black uppercase text-sm tracking-widest shadow-2xl">
                    I Have Contacted My Support Grid
                </button>
            </div>
        `;
        this.save();
    },

    resetCrisis() {
        this.state.isCrisis = false;
        this.state.integrity = 40; // Force integrity back to a manageable level
        this.applyState('yellow');
        this.log("RELAY_RESET: System integrity restored to 40%.");
        this.render();
    },

    /* ==========================================================================
       🛠️ CORE ENGINE FUNCTIONS
       ========================================================================== */
    applyState(modeId) {
        if (this.state.isCrisis) return; // Block state changes during Crisis
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        
        // Physiological Sync
        const root = document.documentElement;
        root.style.setProperty('--pacer-color', `var(--${modeId})`);
        root.style.setProperty('--pacer-speed', data.speed);
        
        // Dynamic UI Rewrite
        document.getElementById('tech-display').innerHTML = `
            <div class="flex justify-between items-start mb-8">
                <h2 class="text-6xl font-black text-white tracking-tighter uppercase">${data.label}</h2>
                <div class="text-right glass px-4 py-2 border-white/10 uppercase text-[9px] tracking-widest">
                    P: ${data.protocol}
                </div>
            </div>
            <p class="text-2xl italic opacity-90 border-l-8 pl-10 font-serif leading-relaxed mb-10" style="border-color:var(--${modeId})">
                "${data.tech}"
            </p>
            <div class="grid grid-cols-1 gap-3">
                ${data.checklist.map(i => `
                    <div class="glass p-5 border-white/5 opacity-60 text-[10px] tracking-widest uppercase flex items-center gap-4">
                        <i class="fas fa-microchip text-xs"></i> ${i}
                    </div>
                `).join('')}
            </div>
        `;

        this.renderRightView();
        this.save();
    },

    executeDeposit() {
        if (this.state.integrity >= 70) {
            this.log("GOVERNOR_LOCK: You are bleeding through the page. Rest required.");
            return;
        }
        this.state.integrity += 5;
        this.state.fuel += 100;
        this.render();
        this.save();
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(4, '0');
    },

    save() { localStorage.setItem('zion_omni_v6', JSON.stringify(this.state)); },

    log(msg) {
        const log = document.getElementById('system-log');
        log.innerHTML = `<div class="mb-2 opacity-30 tracking-widest">[${new Date().toLocaleTimeString()}] ${msg}</div>` + log.innerHTML;
    },

    renderRightView() {
        if (this.state.isCrisis) return; // Port is occupied by Crisis Relay
        const view = this.state.tab;
        const stateData = KnowledgeBase.states[this.state.mode];
        const port = document.getElementById('right-viewport');
        
        if (view === 'vault') {
            // Intelligent Neural Filtering
            const filter = (list) => list.filter(c => c.load <= stateData.limit);
            const v1 = filter(KnowledgeBase.architect);
            const v2 = filter(KnowledgeBase.zion);

            port.innerHTML = `
                <div class="space-y-6">
                    <h3 class="text-[10px] font-black opacity-30 tracking-[0.6em] border-b border-white/5 pb-2 uppercase">Neural_Capacity: ${stateData.limit}/10</h3>
                    ${v1.map(v => `<div class="glass p-6 border-l-2 border-amber-500/40"><div class="text-[9px] opacity-30 font-bold mb-1 uppercase">${v.id}</div><div class="text-sm font-black text-white uppercase">${v.title}</div><p class="text-[10px] mt-2 opacity-50 italic">${v.content}</p></div>`).join('')}
                    ${v2.map(v => `<div class="glass p-6 border-l-2 border-purple-500/40"><div class="text-[9px] opacity-30 font-bold mb-1 uppercase">${v.id}</div><div class="text-sm font-black text-white uppercase">${v.title}</div><p class="text-[10px] mt-2 opacity-50 italic">${v.content}</p></div>`).join('')}
                </div>`;
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in duration-1000">
                    <h2 class="text-4xl font-black uppercase text-white mb-8 tracking-tighter">${stateData.sub}</h2>
                    <p class="text-xl italic opacity-80 leading-relaxed mb-12 border-l-2 border-white/10 pl-8">"${stateData.spirit}"</p>
                    <div class="p-10 glass border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
                        <div class="text-[10px] uppercase font-black opacity-30 mb-6 tracking-[0.5em]">The Sanity Ring</div>
                        <div class="text-4xl text-white font-bold tracking-tight italic">"${stateData.scripture}"</div>
                    </div>
                </div>`;
        }
    }
};

window.onload = () => Core.init();
