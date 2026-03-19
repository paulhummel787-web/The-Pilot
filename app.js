const Core = {
    state: JSON.parse(localStorage.getItem('apex_db')) || {
        integrity: 0, fuel: 0, currentMode: 'green', logs: []
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.currentMode);
        this.render();
        if(window.Telemetry) Telemetry.init();
    },

    renderMatrix() {
        const matrix = document.getElementById('state-matrix');
        matrix.innerHTML = KnowledgeBase.states.map(s => `
            <button onclick="Core.applyState('${s.id}')" class="w-full p-4 border border-white/5 text-left hover:bg-white/5 transition-all group" id="btn-${s.id}">
                <div class="text-[10px] font-black group-hover:text-white uppercase">${s.label}</div>
                <div class="text-[7px] opacity-30 uppercase italic">${s.sub}</div>
            </button>
        `).join('');
    },

    applyState(modeId) {
        const state = KnowledgeBase.states.find(s => s.id === modeId);
        this.state.currentMode = modeId;

        // Visual Shift
        const color = getComputedStyle(document.documentElement).getPropertyValue('--' + modeId).trim();
        document.documentElement.style.setProperty('--pacer-color', color);
        document.getElementById('pacer-container').className = `glass-pane flex-1 flex flex-col p-6 relative overflow-hidden ${['red', 'orange', 'purple'].includes(modeId) ? 'pacer-active' : ''}`;

        // INTERWEAVE THE VOLUMES
        document.getElementById('tech-display').innerHTML = `
            <h2 class="text-2xl font-black text-white uppercase">${state.tech.title}</h2>
            <p class="text-sm italic opacity-60 mt-4 leading-relaxed">${state.tech.content}</p>
        `;
        document.getElementById('spirit-display').innerHTML = `
            <h2 class="text-xl font-black text-white uppercase tracking-tighter">${state.spirit.title}</h2>
            <p class="text-[13px] italic opacity-80 mt-4 leading-relaxed">${state.spirit.content}</p>
            <div class="mt-6 p-3 bg-amber-500/5 border-l-2 border-amber-500/40 text-[10px] text-amber-500 italic">
                ${state.spirit.scripture}
            </div>
        `;

        this.save();
    },

    executeDeposit() {
        if(this.state.integrity >= 70) return alert("GOVERNOR LOCK: Fix the state, then take the step.");
        this.state.integrity += 10;
        this.state.fuel += 100;
        this.state.logs.unshift({ msg: "Nectar Deposited", time: new Date().toLocaleTimeString() });
        this.render();
        this.save();
        if(window.Telemetry) Telemetry.update();
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
    },

    save() { localStorage.setItem('apex_db', JSON.stringify(this.state)); }
};
window.onload = () => Core.init();
