const Core = {
    state: JSON.parse(localStorage.getItem('zion_omni_v41')) || { 
        integrity: 0, fuel: 0, mode: 'green', tab: 'spirit', 
        history: Array(20).fill(0), wave: Math.floor(Math.random() * 99) 
    },
    chart: null,

    init() {
        this.renderMatrix();
        this.initChart();
        this.applyState(this.state.mode);
        this.render();
        this.log("SYSTEM: Omni-Logic Synchronized.");
    },

    initChart() {
        const ctx = document.getElementById('telemetryChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: { 
                labels: this.state.history.map((_, i) => i),
                datasets: [{ 
                    data: this.state.history, 
                    borderColor: 'rgba(255,255,255,0.5)', 
                    borderWidth: 1, 
                    tension: 0.4, 
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: 'rgba(255,255,255,0.02)'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { display: false }, y: { display: false } }, plugins: { legend: false } }
        });
    },

    renderMatrix() {
        document.getElementById('state-matrix').innerHTML = Object.keys(KnowledgeBase.states).map(id => `
            <button onclick="Core.applyState('${id}')" class="w-full p-6 glass border border-white/5 text-left transition-all hover:border-white/40 active:scale-95 mb-2" id="btn-${id}">
                <div class="text-xs font-black uppercase text-white tracking-widest">${KnowledgeBase.states[id].label}</div>
                <div class="text-[8px] opacity-40 uppercase italic mt-1">${KnowledgeBase.states[id].sub}</div>
            </button>
        `).join('');
    },

    applyState(modeId) {
        const data = KnowledgeBase.states[modeId];
        this.state.mode = modeId;
        const root = document.documentElement;
        const color = getComputedStyle(root).getPropertyValue(`--${modeId}`).trim();
        
        root.style.setProperty('--pacer-color', color);
        root.style.setProperty('--pacer-speed', data.speed);
        
        document.querySelectorAll('button').forEach(b => b.classList.remove('border-white/60'));
        document.getElementById(`btn-${modeId}`).classList.add('border-white/60');
        
        document.getElementById('tech-display').innerHTML = `
            <h2 class="text-5xl font-black uppercase tracking-tighter mb-8 text-white">${data.label} NAVIGATION</h2>
            <div class="space-y-6">
                <p class="text-xl italic opacity-90 leading-relaxed font-serif border-l-8 pl-8" style="border-color: ${color}">"${data.tech}"</p>
                <div class="p-6 bg-white/5 border border-white/10 rounded uppercase text-[10px] tracking-widest leading-loose">
                    ${data.checklist.map(i => `<div><i class="fas fa-check mr-3 opacity-30"></i>${i}</div>`).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('active-protocol').innerText = data.label;
        document.getElementById('wave-id').innerText = this.state.wave;
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
            const list = (items, title) => `
                <div class="mb-10">
                    <h3 class="text-[10px] font-black opacity-30 mb-6 tracking-[0.6em] uppercase border-b border-white/10 pb-2">${title}</h3>
                    ${items.map(v => `
                        <div class="p-6 mb-4 glass border border-white/5 hover:border-white/40 transition-all group cursor-crosshair">
                            <div class="flex justify-between items-start">
                                <span class="text-xs font-black text-white uppercase group-hover:tracking-widest transition-all">${v.title}</span>
                                <span class="text-[8px] opacity-20">${v.id}</span>
                            </div>
                            <div class="text-[10px] opacity-40 italic mt-2">${v.sub}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            port.innerHTML = list(KnowledgeBase.architect, 'Volume I: Architect OS') + list(KnowledgeBase.zion, 'Volume II: Zion');
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in slide-in-from-right duration-1000">
                    <h2 class="text-4xl font-black text-white uppercase tracking-tighter mb-8">${stateData.sub}</h2>
                    <p class="text-lg italic text-white/80 leading-relaxed mb-12 border-l-2 border-white/10 pl-8">"${stateData.spirit}"</p>
                    <div class="p-10 glass border-2 border-white/10 rounded-xl relative overflow-hidden">
                        <div class="text-[10px] uppercase font-black opacity-30 mb-6 tracking-[0.5em]">The Sanity Ring</div>
                        <div class="text-3xl text-white font-bold tracking-tight italic relative z-10">"${stateData.scripture}"</div>
                        <i class="fas fa-quote-right absolute right-4 bottom-4 text-8xl opacity-5 pointer-events-none"></i>
                    </div>
                </div>
            `;
        }
    },

    executeDeposit() {
        if(this.state.integrity >= 70) {
            this.log("GOVERNOR: Integrity lock engaged. Perform manual reset.");
            return;
        }
        this.state.integrity += 10;
        this.state.fuel += 100;
        this.state.history.push(this.state.fuel);
        this.state.history.shift();
        this.chart.update();
        this.render();
        this.save();
    },

    log(msg) {
        const log = document.getElementById('system-log');
        log.innerHTML = `<div><span class="opacity-20 mr-2">[${new Date().toLocaleTimeString()}]</span> ${msg}</div>` + log.innerHTML;
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(4, '0');
    },

    save() { localStorage.setItem('zion_omni_v41', JSON.stringify(this.state)); }
};
window.onload = () => Core.init();
