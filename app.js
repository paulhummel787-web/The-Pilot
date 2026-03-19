const Core = {
    state: JSON.parse(localStorage.getItem('zion_omni_engine')) || { 
        integrity: 0, fuel: 0, mode: 'green', tab: 'spirit', 
        history: Array(30).fill(0), wave: Math.floor(Math.random() * 100) 
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.mode);
        this.initChart();
        this.render();
        this.log("SUPER_ENGINE: Online. Wave Telemetry Syncing...");
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        
        // 1. DYNAMIC THEMING
        const root = document.documentElement;
        const color = getComputedStyle(root).getPropertyValue(`--${modeId}`).trim();
        root.style.setProperty('--pacer-color', color);
        root.style.setProperty('--pacer-speed', data.speed);
        
        // 2. STATE-DEPENDENT UI INJECTION
        document.getElementById('active-protocol').innerText = data.protocol;
        document.getElementById('tech-display').innerHTML = `
            <div class="animate-pulse text-[10px] opacity-40 mb-4 tracking-[0.5em]">NAV_PROTOCOL: ${data.protocol}</div>
            <h2 class="text-5xl font-black uppercase tracking-tighter mb-6">${data.label}</h2>
            <p class="text-xl italic opacity-90 border-l-8 pl-8 font-serif" style="border-color:${color}">"${data.tech}"</p>
        `;

        this.renderRightView();
        this.save();
    },

    renderRightView() {
        const view = this.state.tab;
        const stateData = KnowledgeBase.states[this.state.mode];
        const port = document.getElementById('right-viewport');
        
        if (view === 'vault') {
            // THE SUPER ENGINE FILTER: Only show chapters tagged for the CURRENT state
            const filterChapters = (list) => list.filter(c => c.tags.includes(this.state.mode));
            
            const arch = filterChapters(KnowledgeBase.architect);
            const zion = filterChapters(KnowledgeBase.zion);

            port.innerHTML = `
                <div class="space-y-6">
                    <div class="text-[10px] font-black opacity-30 tracking-[0.6em] border-b pb-2">INTELLIGENT_VAULT_FILTER: ${this.state.mode.toUpperCase()}</div>
                    ${arch.map(v => `<div class="glass p-4 border-l-2 border-amber-500/50 mb-2"><div class="text-[9px] font-bold opacity-50">${v.id}</div><div class="text-xs font-black uppercase text-white">${v.title}</div><p class="text-[10px] mt-1 opacity-40">${v.content}</p></div>`).join('')}
                    ${zion.map(v => `<div class="glass p-4 border-l-2 border-purple-500/50 mb-2"><div class="text-[9px] font-bold opacity-50">${v.id}</div><div class="text-xs font-black uppercase text-white">${v.title}</div><p class="text-[10px] mt-1 opacity-40">${v.content}</p></div>`).join('')}
                    ${(arch.length + zion.length === 0) ? `<div class="opacity-20 italic">No low-capacity chapters for this state. Focus on the Sanity Ring.</div>` : ''}
                </div>`;
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in duration-1000">
                    <h2 class="text-4xl font-black uppercase tracking-tighter mb-8 text-white">${stateData.sub}</h2>
                    <p class="text-lg italic opacity-80 leading-relaxed mb-12 border-l-2 border-white/10 pl-8">"${stateData.spirit}"</p>
                    <div class="p-10 glass border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
                        <div class="text-[10px] uppercase font-black opacity-30 mb-6 tracking-[0.5em]">The Sanity Ring</div>
                        <div class="text-3xl text-white font-bold tracking-tight italic">"${stateData.scripture}"</div>
                        <i class="fas fa-ring absolute -right-4 -bottom-4 text-[12rem] opacity-5 rotate-12"></i>
                    </div>
                </div>`;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) return this.log("GOVERNOR_LOCK: System Integrity Breach. Restore stability first.");
        this.state.integrity += 10;
        this.state.fuel += 100;
        this.state.history.push(this.state.fuel); this.state.history.shift();
        this.render(); this.save();
    },

    // Standard support functions (renderMatrix, initChart, log, etc.) stay the same as previous build
    // ...
};
