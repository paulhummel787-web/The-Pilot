const Core = {
    state: JSON.parse(localStorage.getItem('zion_os_v33')) || { integrity: 0, fuel: 0, currentMode: 'green', rightView: 'spirit' },

    init() {
        this.renderMatrix();
        this.applyState(this.state.currentMode);
        this.render();
        this.log("ZION_OS: Booting Chapter Scripts...");
    },

    renderMatrix() {
        document.getElementById('state-matrix').innerHTML = Object.keys(KnowledgeBase.states).map(id => `
            <button onclick="Core.applyState('${id}')" class="state-btn w-full p-4 border border-white/5 text-left mb-2 transition-all active:scale-95" id="btn-${id}">
                <div class="text-[10px] font-black uppercase tracking-widest">${KnowledgeBase.states[id].label}</div>
                <div class="text-[7px] opacity-40 uppercase italic">${KnowledgeBase.states[id].sub}</div>
            </button>
        `).join('');
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.currentMode = modeId;
        
        document.documentElement.style.setProperty('--pacer-color', `var(--${modeId})`);
        document.documentElement.style.setProperty('--pacer-speed', data.speed);
        
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${modeId}`).classList.add('active');
        document.getElementById('pacer-container').classList.add('pacer-active');

        document.getElementById('tech-display').innerHTML = `
            <div class="animate-pulse text-[8px] text-amber-500/50 mb-2 uppercase tracking-[0.4em]">Arch_OS_Module</div>
            <h2 class="text-3xl font-black text-white uppercase tracking-tighter mb-4">${data.label} NAVIGATION</h2>
            <p class="text-sm italic opacity-80 leading-relaxed font-serif border-l-2 border-amber-500/20 pl-4">"${data.tech}"</p>
        `;

        const checkUI = document.getElementById('calibration-checklist');
        if (['yellow', 'red'].includes(modeId)) {
            checkUI.classList.remove('hidden');
            document.getElementById('checklist-items').innerHTML = data.checklist.map(item => `
                <label class="flex items-center gap-3 text-[10px] opacity-60 hover:opacity-100 py-1"><input type="checkbox" class="h-3 w-3 accent-amber-500"><span>${item}</span></label>
            `).join('');
        } else { checkUI.classList.add('hidden'); }

        this.renderRightView();
        if (this.state.integrity > 50) this.log("BRAKE_CHECK: 10/20 Rule in effect.");
        this.save();
    },

    toggleRightView(view) { this.state.rightView = view; this.renderRightView(); this.save(); },

    renderRightView() {
        const view = this.state.rightView;
        const stateData = KnowledgeBase.states[this.state.currentMode];
        const port = document.getElementById('right-viewport');
        
        document.getElementById('tab-spirit').style.opacity = view === 'spirit' ? '1' : '0.3';
        document.getElementById('tab-vault').style.opacity = view === 'vault' ? '1' : '0.3';

        if (view === 'vault') {
            const mapList = (list, color) => list.map(v => `<div class="p-3 mb-2 border border-${color}-500/10 bg-white/5"><div class="text-[8px] text-${color}-500 font-black mb-1">${v.id}</div><div class="text-[10px] font-bold text-white uppercase">${v.title}</div><div class="text-[9px] opacity-40 italic">${v.sub}</div></div>`).join('');
            port.innerHTML = `<div class="space-y-4">${mapList(KnowledgeBase.architectOS, 'amber')}${mapList(KnowledgeBase.journeyToZion, 'purple')}</div>`;
        } else {
            port.innerHTML = `<div class="animate-in fade-in duration-700"><h2 class="text-xl font-black text-white uppercase tracking-tighter mb-4">${stateData.sub}</h2><p class="text-[14px] italic text-white/90 leading-relaxed mb-6 border-l-2 border-white/10 pl-4">"${stateData.spirit}"</p><div class="p-4 bg-amber-500/5 border border-amber-500/20"><div class="text-[9px] uppercase font-bold text-amber-500 mb-1 tracking-widest">The Sanity Ring</div><div class="text-[12px] text-amber-400 font-medium italic">${stateData.scripture}</div></div></div>`;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) return this.log("GOVERNOR_LOCK: 70% Limit Reached. Fix State.");
        this.state.integrity += 10; this.state.fuel += 100;
        this.render(); this.save();
    },

    log(msg) {
        const log = document.getElementById('system-log');
        log.innerHTML = `<div class="mb-1 border-b border-white/5 pb-1"><span class="opacity-30">[${new Date().toLocaleTimeString()}]</span> ${msg}</div>` + log.innerHTML;
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
    },

    save() { localStorage.setItem('zion_os_v33', JSON.stringify(this.state)); }
};
window.onload = () => Core.init();
