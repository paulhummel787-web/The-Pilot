const Core = {
    // PERSISTENT ENGINE STATE
    state: JSON.parse(localStorage.getItem('apex_hive_v31')) || { 
        integrity: 0, 
        fuel: 0, 
        currentMode: 'green', 
        logs: [], 
        rightView: 'spirit' 
    },

    init() {
        this.renderMatrix();
        this.applyState(this.state.currentMode);
        this.initChart();
        this.render();
        this.log("Zion Engine: Online. Scaffolding Linked.");
    },

    // THE 10/20 BRAKES: Physiological Interrupts
    checkBrakes() {
        if (this.state.integrity > 50) {
            this.log("BRAKE_CHECK: 10 mins ruminating? Change the Body.");
            this.log("BRAKE_CHECK: 20 mins stuck? Change the Location.");
        }
    },

    renderMatrix() {
        document.getElementById('state-matrix').innerHTML = KnowledgeBase.states.map(s => `
            <button onclick="Core.applyState('${s.id}')" class="state-btn w-full p-3 border border-white/5 text-left mb-2" id="btn-${s.id}" style="--pacer-color: var(--${s.id})">
                <div class="text-[10px] font-black uppercase tracking-[0.2em]">${s.label}</div>
                <div class="text-[7px] opacity-40 uppercase italic">${s.sub}</div>
            </button>
        `).join('');
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.currentMode = modeId;
        
        // 1. BIOMETRIC PACER SYNC
        const root = document.documentElement;
        root.style.setProperty('--pacer-color', `var(--${modeId})`);
        root.style.setProperty('--pacer-speed', data.speed);

        // 2. UI HIGHLIGHTS
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${modeId}`).classList.add('active');
        document.getElementById('pacer-container').classList.add('pacer-active');

        // 3. VOLUME I: ARCHITECT OS (TECHNICAL)
        document.getElementById('tech-display').innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <span class="text-[8px] bg-amber-500/10 px-2 py-1 text-amber-500">MANUAL_PAGE_01</span>
                <i class="fas fa-microchip opacity-20 text-xs"></i>
            </div>
            <h2 class="text-2xl font-black text-white uppercase tracking-tighter mb-4">${data.label} NAVIGATION</h2>
            <div class="space-y-4">
                <p class="text-[13px] leading-relaxed text-amber-500/80 italic font-medium">"${data.tech}"</p>
                <div class="p-3 border-l border-white/10 bg-white/5 text-[10px] opacity-60">
                    <strong>THE CREED:</strong> I do not fight my nature—I design for it.
                </div>
            </div>
        `;

        this.renderRightView();
        this.handleChecklist(modeId, data);
        this.checkBrakes();
        this.save();
    },

    handleChecklist(modeId, data) {
        const checkUI = document.getElementById('calibration-checklist');
        if (['yellow', 'red'].includes(modeId)) {
            checkUI.classList.remove('hidden');
            document.getElementById('checklist-items').innerHTML = data.checklist.map(item => `
                <label class="flex items-center gap-3 text-[10px] opacity-60 hover:opacity-100 cursor-pointer py-1">
                    <input type="checkbox" class="h-3 w-3 accent-amber-500"> 
                    <span class="tracking-widest">${item}</span>
                </label>
            `).join('');
        } else { checkUI.classList.add('hidden'); }
    },

    toggleRightView(view) {
        this.state.rightView = view;
        this.renderRightView();
        this.save();
    },

    renderRightView() {
        const view = this.state.rightView;
        const data = KnowledgeBase.states[this.state.currentMode];
        document.getElementById('tab-spirit').className = `text-[10px] font-black uppercase tracking-widest transition-all ${view === 'spirit' ? 'opacity-100 text-amber-500' : 'opacity-30'}`;
        document.getElementById('tab-vault').className = `text-[10px] font-black uppercase tracking-widest transition-all ${view === 'vault' ? 'opacity-100 text-amber-500' : 'opacity-30'}`;
        
        const port = document.getElementById('right-viewport');
        if (view === 'vault') {
            port.innerHTML = KnowledgeBase.vault.map(v => `
                <div class="p-4 mb-3 border border-white/5 bg-white/5 hover:border-amber-500/30 transition-all">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] font-black text-white uppercase">${v.title}</span>
                        <span class="text-[8px] opacity-20">CELL_${v.id}</span>
                    </div>
                    <p class="text-[11px] opacity-50 leading-relaxed">${v.content}</p>
                </div>
            `).join('');
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in duration-700">
                    <span class="text-[8px] opacity-30 uppercase tracking-[0.4em] mb-2 block">Volume II: Spirit</span>
                    <h2 class="text-xl font-black text-white uppercase tracking-tighter mb-4">${data.sub}</h2>
                    <p class="text-[14px] italic text-white/90 leading-relaxed mb-6 border-l-2 border-white/5 pl-4">"${data.spirit}"</p>
                    <div class="p-4 bg-amber-500/5 border border-amber-500/20 rounded-sm">
                        <div class="text-[9px] uppercase font-bold text-amber-500 mb-2 tracking-widest">The Chime of Sanity</div>
                        <div class="text-[12px] text-amber-400 font-medium italic">${data.scripture}</div>
                    </div>
                </div>
            `;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) {
            this.log("CRITICAL: Governor Lock Engaged. Reset State.");
            return;
        }
        this.state.integrity += 10;
        this.state.fuel += 100;
        this.render();
        this.updateChart();
        this.save();
    },

    // ANALYTICS & SYSTEM LOG
    initChart() {
        const ctx = document.getElementById('yieldChart').getContext('2d');
        this.chart = new Chart(ctx, { type: 'line', data: { labels: [1,2,3,4,5,6], datasets: [{ data: [0,0,0,0,0,0], borderColor: '#f59e0b', tension: 0.4, pointRadius: 0, fill: true, backgroundColor: 'rgba(245, 158, 11, 0.05)' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { display: false }, y: { display: false } }, plugins: { legend: false } } });
    },

    updateChart() {
        this.chart.data.datasets[0].data.push(this.state.fuel);
        if(this.chart.data.datasets[0].data.length > 20) this.chart.data.datasets[0].data.shift();
        this.chart.update();
    },

    log(msg) {
        const log = document.getElementById('system-log');
        log.innerHTML = `<div class="mb-1 border-b border-white/5 pb-1"><span class="opacity-30 mr-2">[${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}]</span> ${msg}</div>` + log.innerHTML;
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
    },

    save() { localStorage.setItem('apex_hive_v31', JSON.stringify(this.state)); }
};

window.onload = () => Core.init();
