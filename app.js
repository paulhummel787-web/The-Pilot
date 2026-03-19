const Core = {
    // SOVEREIGN STATE
    state: JSON.parse(localStorage.getItem('zion_super_engine')) || { 
        integrity: 0, 
        fuel: 0, 
        mode: 'green', 
        tab: 'spirit', 
        history: Array(30).fill(0),
        startTime: Date.now()
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.mode);
        this.render();
        this.log("SUPER_ENGINE: Splicing Architect OS & Zion DNA...");
        setInterval(() => this.heartbeat(), 1000); // 1-second system check
    },

    // THE HEARTBEAT: Constant monitoring of the 70% Governor
    heartbeat() {
        const depositBtn = document.getElementById('deposit-btn');
        if (this.state.integrity >= 70) {
            depositBtn.innerHTML = "GOVERNOR_LOCKED (70%)";
            depositBtn.classList.add('bg-red-500/20', 'text-red-500', 'cursor-not-allowed');
            depositBtn.classList.remove('bg-amber-500', 'text-black');
            if (this.state.mode !== 'red') this.applyState('red'); // Auto-force recovery
        } else {
            depositBtn.innerHTML = "DEPOSIT_NECTAR";
            depositBtn.classList.remove('bg-red-500/20', 'text-red-500', 'cursor-not-allowed');
            depositBtn.classList.add('bg-amber-500', 'text-black');
        }
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        
        // 1. NEURAL PACER OVERRIDE
        const root = document.documentElement;
        root.style.setProperty('--pacer-color', `var(--${modeId})`);
        root.style.setProperty('--pacer-speed', data.speed);
        
        // 2. STATE-DEPENDENT INJECTION (SDI)
        document.getElementById('tech-display').innerHTML = `
            <div class="flex justify-between items-start mb-6">
                <h2 class="text-5xl font-black uppercase tracking-tighter text-white">${data.label}</h2>
                <span class="text-[10px] glass px-3 py-1 border border-white/10 uppercase tracking-widest">${data.protocol}</span>
            </div>
            <p class="text-xl italic opacity-90 border-l-8 pl-8 font-serif leading-relaxed mb-8" style="border-color:var(--${modeId})">
                "${data.tech}"
            </p>
            <div class="grid grid-cols-1 gap-3">
                ${data.checklist.map(i => `
                    <div class="glass p-4 text-[10px] uppercase tracking-widest flex items-center gap-4 opacity-60">
                        <i class="fas fa-microchip text-xs"></i> ${i}
                    </div>
                `).join('')}
            </div>
        `;

        this.renderRightView();
        this.save();
        this.log(`ROTATION: Switched to ${data.label} Mode.`);
    },

    renderRightView() {
        const view = this.state.tab;
        const stateData = KnowledgeBase.states[this.state.mode];
        const port = document.getElementById('right-viewport');
        
        if (view === 'vault') {
            // THE FILTER ENGINE: Only show chapters mapped to current neuro-capacity
            const filter = (list) => list.filter(c => c.tags.includes(this.state.mode));
            const vol1 = filter(KnowledgeBase.architect);
            const vol2 = filter(KnowledgeBase.zion);

            port.innerHTML = `
                <div class="space-y-6">
                    <h3 class="text-[10px] font-black opacity-30 tracking-[0.6em] border-b border-white/5 pb-2 uppercase">Neural_Capacity_Filter: ${this.state.mode}</h3>
                    ${vol1.map(v => `<div class="glass p-5 mb-3 border-l-2 border-amber-500/40"><div class="text-[9px] opacity-40 font-bold mb-1">${v.id}</div><div class="text-xs font-black uppercase text-white">${v.title}</div><p class="text-[10px] mt-2 opacity-50 italic leading-relaxed">${v.content}</p></div>`).join('')}
                    ${vol2.map(v => `<div class="glass p-5 mb-3 border-l-2 border-purple-500/40"><div class="text-[9px] opacity-40 font-bold mb-1">${v.id}</div><div class="text-xs font-black uppercase text-white">${v.title}</div><p class="text-[10px] mt-2 opacity-50 italic leading-relaxed">${v.content}</p></div>`).join('')}
                </div>`;
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in slide-in-from-right duration-700">
                    <h2 class="text-4xl font-black uppercase tracking-tighter mb-8 text-white">${stateData.sub}</h2>
                    <p class="text-lg italic opacity-80 leading-relaxed mb-12 border-l-2 border-white/10 pl-8">"${stateData.spirit}"</p>
                    <div class="p-10 glass border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
                        <div class="text-[10px] uppercase font-black opacity-30 mb-6 tracking-[0.5em]">The Sanity Ring</div>
                        <div class="text-3xl text-white font-bold tracking-tight italic relative z-10">"${stateData.scripture}"</div>
                        <i class="fas fa-circle-notch absolute -right-8 -bottom-8 text-[15rem] opacity-5 animate-spin-slow"></i>
                    </div>
                </div>`;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) {
            this.log("CRITICAL: Integrity breach. No Nectar allowed. Shift to Recovery.");
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

    save() { localStorage.setItem('zion_super_engine', JSON.stringify(this.state)); },
    
    log(msg) {
        const log = document.getElementById('system-log');
        log.innerHTML = `<div class="mb-2 opacity-40">[${new Date().toLocaleTimeString()}] ${msg}</div>` + log.innerHTML;
    }
};

window.onload = () => Core.init();
