const Core = {
    state: JSON.parse(localStorage.getItem('zion_sov_v5')) || { 
        integrity: 0, fuel: 0, mode: 'green', tab: 'spirit', 
        wave: Math.floor(Math.random() * 999), history: [] 
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.mode);
        this.startMonitors();
        this.render();
    },

    // AUTOMATED SYSTEM MONITORS
    startMonitors() {
        setInterval(() => {
            // 1. THE 70% GOVERNOR CHECK
            const btn = document.getElementById('deposit-btn');
            if (this.state.integrity >= 70) {
                btn.innerHTML = "SYSTEM_LOCKED: 70% GOVERNOR";
                btn.className = "mt-8 h-24 glass border-2 border-red-500/50 text-red-500 font-black uppercase tracking-widest cursor-not-allowed";
                if (this.state.mode !== 'red' && this.state.mode !== 'yellow') this.applyState('yellow');
            } else {
                btn.innerHTML = "DEPOSIT_NECTAR";
                btn.className = "mt-8 h-24 glass border-2 border-white/10 text-white font-black uppercase tracking-[1em] hover:bg-white hover:text-black transition-all duration-700";
            }

            // 2. CRISIS RELAY TRIGGER
            if (this.state.mode === 'red' && this.state.integrity > 85) {
                this.triggerCrisisRelay();
            }
        }, 1000);
    },

    triggerCrisisRelay() {
        const port = document.getElementById('right-viewport');
        port.innerHTML = `
            <div class="bg-red-500/20 border-2 border-red-500 p-8 rounded animate-pulse">
                <h2 class="text-4xl font-black mb-4 uppercase">Crisis_Relay_Active</h2>
                <p class="mb-8 opacity-80 uppercase tracking-widest text-xs">Pilot Offline. Scaffolding Required.</p>
                <div class="space-y-4">
                    <div class="glass p-4 border border-white/20">
                        <div class="text-[10px] opacity-40">EXTERNAL PILOT</div>
                        <div class="text-xl font-black uppercase">Contact: Dr. / Support Grid</div>
                    </div>
                    <div class="glass p-4 border border-white/20">
                        <div class="text-[10px] opacity-40">ATMOSPHERIC CALIBRATION</div>
                        <div class="text-xl font-black uppercase">Medication Protocol: Check Sync</div>
                    </div>
                </div>
                <button onclick="Core.applyState('yellow')" class="w-full mt-8 p-4 bg-white text-black font-black uppercase text-xs">I Have Reached Out</button>
            </div>
        `;
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        const root = document.documentElement;
        root.style.setProperty('--pacer-color', `var(--${modeId})`);
        root.style.setProperty('--pacer-speed', data.speed);
        
        document.getElementById('tech-display').innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-6xl font-black tracking-tighter uppercase text-white">${data.label}</h2>
                <div class="text-right">
                    <div class="text-[8px] opacity-30 uppercase tracking-[0.5em]">Protocol</div>
                    <div class="text-xs font-black uppercase">${data.protocol}</div>
                </div>
            </div>
            <p class="text-2xl italic opacity-90 border-l-8 pl-10 font-serif leading-relaxed mb-10" style="border-color:var(--${modeId})">
                "${data.tech}"
            </p>
        `;
        this.renderRightView();
        this.save();
    },

    renderRightView() {
        const view = this.state.tab;
        const stateData = KnowledgeBase.states[this.state.mode];
        const port = document.getElementById('right-viewport');
        
        if (view === 'vault') {
            // OMNI-FILTER: Only show chapters with a LOAD lower than the current state's LIMIT
            const filter = (list) => list.filter(c => c.load <= stateData.limit);
            const arch = filter(KnowledgeBase.architect);
            const zion = filter(KnowledgeBase.zion);

            port.innerHTML = `
                <div class="space-y-6">
                    <div class="text-[10px] font-black opacity-30 tracking-[0.5em] uppercase border-b border-white/10 pb-2">Filter: Capacity_${stateData.limit}</div>
                    ${arch.map(v => `<div class="glass p-6 border-l-2 border-amber-500/40 mb-2"><div class="text-[9px] font-bold opacity-30 uppercase mb-1">${v.id}</div><div class="text-sm font-black text-white uppercase">${v.title}</div></div>`).join('')}
                    ${zion.map(v => `<div class="glass p-6 border-l-2 border-purple-500/40 mb-2"><div class="text-[9px] font-bold opacity-30 uppercase mb-1">${v.id}</div><div class="text-sm font-black text-white uppercase">${v.title}</div></div>`).join('')}
                </div>`;
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in slide-in-from-right duration-1000">
                    <h2 class="text-4xl font-black uppercase text-white mb-8">${stateData.sub}</h2>
                    <p class="text-xl italic opacity-80 leading-relaxed mb-12 border-l-2 border-white/10 pl-8">"${stateData.spirit}"</p>
                    <div class="p-10 glass border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
                        <div class="text-[10px] uppercase font-black opacity-30 mb-4 tracking-[0.5em]">The Sanity Ring</div>
                        <div class="text-3xl text-white font-bold tracking-tight italic">"${stateData.scripture}"</div>
                    </div>
                </div>`;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) return;
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

    save() { localStorage.setItem('zion_sov_v5', JSON.stringify(this.state)); }
};

window.onload = () => Core.init();
