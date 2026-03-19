const Core = {
    state: JSON.parse(localStorage.getItem('zion_sov_v4')) || { integrity: 0, fuel: 0, mode: 'green', tab: 'spirit' },

    init() {
        this.renderMatrix();
        this.applyState(this.state.mode);
        this.render();
        this.log("ZION_SOVEREIGN_OS: All Volumes Interwoven. Online.");
    },

    renderMatrix() {
        document.getElementById('state-matrix').innerHTML = Object.keys(KnowledgeBase.states).map(id => `
            <button onclick="Core.applyState('${id}')" class="state-btn w-full p-5 border border-white/5 text-left transition-all hover:bg-white/5 active:scale-95" id="btn-${id}">
                <div class="text-[12px] font-black uppercase tracking-widest text-white">${KnowledgeBase.states[id].label}</div>
                <div class="text-[8px] opacity-40 uppercase italic mt-1">${KnowledgeBase.states[id].sub}</div>
            </button>
        `).join('');
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        
        // Physiological Override
        const root = document.documentElement;
        root.style.setProperty('--pacer-color', `var(--${modeId})`);
        root.style.setProperty('--pacer-speed', data.speed);
        
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${modeId}`).classList.add('active');
        document.getElementById('pacer-container').className = `glass-pane flex-1 relative overflow-hidden flex flex-col p-8 pacer-active`;

        // Volume I Injection
        document.getElementById('tech-display').innerHTML = `
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter mb-6">${data.label} NAVIGATION</h2>
            <p class="text-lg italic opacity-80 leading-relaxed font-serif border-l-4 border-amber-500/30 pl-6 text-amber-200">"${data.tech}"</p>
        `;

        // Checklist Logic
        const checkUI = document.getElementById('calibration-checklist');
        if (['yellow', 'red', 'purple'].includes(modeId)) {
            checkUI.classList.remove('hidden');
            document.getElementById('checklist-items').innerHTML = data.checklist.map(item => `
                <label class="flex items-center gap-4 text-xs opacity-60 hover:opacity-100 transition-all cursor-pointer bg-white/5 p-2 border border-white/5">
                    <input type="checkbox" class="h-4 w-4 accent-amber-500">
                    <span class="tracking-widest uppercase text-[10px]">${item}</span>
                </label>
            `).join('');
        } else { checkUI.classList.add('hidden'); }

        this.renderRightView();
        this.save();
    },

    setTab(t) { this.state.tab = t; this.renderRightView(); this.save(); },

    renderRightView() {
        const view = this.state.tab;
        const stateData = KnowledgeBase.states[this.state.mode];
        const port = document.getElementById('right-viewport');
        
        document.getElementById('tab-spirit').style.opacity = view === 'spirit' ? '1' : '0.3';
        document.getElementById('tab-vault').style.opacity = view === 'vault' ? '1' : '0.3';

        if (view === 'vault') {
            const list = (items, color, title) => `
                <div class="mb-8">
                    <h3 class="text-[10px] font-black text-${color}-500 mb-4 tracking-[0.5em] uppercase border-b border-${color}-500/20 pb-2">${title}</h3>
                    ${items.map(v => `
                        <div class="p-4 mb-3 border border-white/5 bg-white/2 hover:border-amber-500/40 transition-all group">
                            <div class="flex justify-between items-start">
                                <span class="text-[11px] font-black text-white uppercase group-hover:text-amber-500">${v.title}</span>
                                <span class="text-[8px] opacity-30">${v.id}</span>
                            </div>
                            <div class="text-[9px] opacity-40 italic mt-1">${v.sub}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            port.innerHTML = list(KnowledgeBase.architect, 'amber', 'Volume I: The Architect') + list(KnowledgeBase.zion, 'purple', 'Volume II: Zion');
        } else {
            port.innerHTML = `
                <div class="animate-in slide-in-from-right duration-500">
                    <h2 class="text-3xl font-black text-white uppercase tracking-tighter mb-6">${stateData.sub}</h2>
                    <p class="text-[16px] italic text-white/90 leading-relaxed mb-10 border-l-4 border-amber-500/20 pl-6">"${stateData.spirit}"</p>
                    <div class="p-6 bg-amber-500/5 border-2 border-amber-500/20 rounded-lg shadow-2xl">
                        <div class="text-[10px] uppercase font-black text-amber-500 mb-4 tracking-[0.4em]">The Sanity Ring</div>
                        <div class="text-2xl text-amber-400 font-bold tracking-tight italic">"${stateData.scripture}"</div>
                    </div>
                </div>
            `;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) return this.log("GOVERNOR_LOCK: System Integrity below threshold. Calibration required.");
        this.state.integrity += 10; this.state.fuel += 100;
        this.render(); this.save();
    },

    log(msg) {
        const log = document.getElementById('system-log');
        log.innerHTML = `<div class="mb-2 border-b border-white/5 pb-2"><span class="opacity-30">[${new Date().toLocaleTimeString()}]</span> ${msg}</div>` + log.innerHTML;
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(4, '0');
    },

    save() { localStorage.setItem('zion_sov_v4', JSON.stringify(this.state)); }
};
window.onload = () => Core.init();
