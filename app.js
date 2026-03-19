const Core = {
    state: JSON.parse(localStorage.getItem('zion_omni_v7')) || { 
        integrity: 0, fuel: 0, mode: 'green', tab: 'spirit', crisis: false 
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.mode);
        setInterval(() => this.monitor(), 1000);
        this.render();
    },

    monitor() {
        const btn = document.getElementById('deposit-btn');
        if (this.state.integrity >= 70) {
            btn.innerHTML = "GOVERNOR_LOCKED";
            btn.className = "w-full h-24 glass border border-red-500 text-red-500 font-black uppercase text-xs cursor-not-allowed";
        } else {
            btn.innerHTML = "DEPOSIT_NECTAR";
            btn.className = "w-full h-24 bg-white text-black font-black uppercase tracking-[1em] text-sm hover:tracking-[1.2em] transition-all duration-500";
        }

        if (this.state.integrity >= 85 && (this.state.mode === 'red' || this.state.mode === 'yellow')) {
            if (!this.state.crisis) this.triggerCrisis();
        }
    },

    triggerCrisis() {
        this.state.crisis = true;
        document.getElementById('right-viewport').innerHTML = `
            <div class="p-10 border-4 border-red-500 bg-red-500/10 rounded animate-pulse">
                <h2 class="text-5xl font-black mb-6 uppercase">Crisis_Relay</h2>
                <p class="text-xl italic mb-10 opacity-80">Pilot Offline. Contact External Scaffolding now.</p>
                <div class="glass p-6 mb-10 border-white/20 text-2xl font-bold">"Did you take your medication?"</div>
                <button onclick="Core.resetCrisis()" class="w-full h-20 bg-white text-black font-black uppercase">I Have Reached Out</button>
            </div>`;
    },

    resetCrisis() { this.state.crisis = false; this.state.integrity = 30; this.applyState('yellow'); this.render(); },

    applyState(modeId) {
        if (this.state.crisis) return;
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        document.documentElement.style.setProperty('--pacer-color', `var(--${modeId})`);
        document.documentElement.style.setProperty('--pacer-speed', data.speed);
        document.getElementById('active-protocol').innerText = `Protocol: ${data.protocol}`;
        
        document.getElementById('tech-display').innerHTML = `
            <h2 class="text-7xl font-black uppercase tracking-tighter text-white mb-6">${data.label}</h2>
            <p class="text-2xl italic opacity-90 border-l-8 pl-10 leading-relaxed font-serif" style="border-color:var(--${modeId})">"${data.tech}"</p>
        `;
        this.renderRightView();
        this.save();
    },

    renderRightView() {
        if (this.state.crisis) return;
        const port = document.getElementById('right-viewport');
        const stateData = KnowledgeBase.states[this.state.mode];
        
        if (this.state.tab === 'vault') {
            const filter = (l) => l.filter(c => c.load <= stateData.limit);
            const items = [...filter(KnowledgeBase.architect), ...filter(KnowledgeBase.zion)];
            port.innerHTML = items.map(v => `
                <div class="glass p-6 mb-4 border-l-4 border-white/10">
                    <div class="text-[9px] opacity-30 font-bold mb-1 uppercase">${v.id}</div>
                    <div class="text-sm font-black uppercase text-white">${v.title}</div>
                    <p class="text-[11px] mt-2 opacity-40 italic">${v.content}</p>
                </div>`).join('');
        } else {
            port.innerHTML = `
                <h2 class="text-4xl font-black uppercase text-white mb-8">The Word</h2>
                <p class="text-2xl italic opacity-80 leading-relaxed mb-12 border-l-2 border-white/10 pl-8">"${stateData.spirit}"</p>
                <div class="p-12 glass border-2 border-white/10 rounded-2xl">
                    <div class="text-[10px] uppercase opacity-30 mb-6 tracking-[0.5em]">Sanity Ring</div>
                    <div class="text-4xl text-white font-bold italic">"${stateData.scripture}"</div>
                </div>`;
        }
    },

    executeDeposit() {
        if (this.state.integrity >= 70) return;
        this.state.integrity += 5; this.state.fuel += 100;
        this.render(); this.save();
    },

    renderMatrix() {
        document.getElementById('state-matrix').innerHTML = Object.keys(KnowledgeBase.states).map(id => `
            <button onclick="Core.applyState('${id}')" class="w-full p-8 glass border border-white/5 text-left hover:border-white/40 mb-4 transition-all">
                <div class="text-xs font-black uppercase text-white tracking-widest">${KnowledgeBase.states[id].label}</div>
            </button>`).join('');
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(4, '0');
    },

    setTab(t) { 
        this.state.tab = t; 
        document.getElementById('tab-spirit').style.opacity = t === 'spirit' ? '1' : '0.2';
        document.getElementById('tab-vault').style.opacity = t === 'vault' ? '1' : '0.2';
        this.renderRightView(); 
    },

    save() { localStorage.setItem('zion_omni_v7', JSON.stringify(this.state)); }
};
window.onload = () => Core.init();
