const App = {
    data: JSON.parse(localStorage.getItem('apex_hive_db')) || {
        fuel: 0, integrity: 0, fox: '', state: 'green', wins: [], memos: []
    },

    init() {
        this.renderStates();
        this.applyState(this.data.state);
        this.updateUI();
        this.log("Architect OS: Initialized.");
    },

    renderStates() {
        const states = [
            { id: 'yellow', label: 'STATIC', color: '#facc15' },
            { id: 'red', label: 'HEAT', color: '#ef4444' },
            { id: 'orange', label: 'THREAT', color: '#f97316' },
            { id: 'purple', label: 'PRESSURE', color: '#8b5cf6' },
            { id: 'blue', label: 'GRAVITY', color: '#3b82f6' },
            { id: 'green', label: 'FLOW', color: '#10b981' }
        ];
        document.getElementById('state-matrix').innerHTML = states.map(s => `
            <button onclick="App.applyState('${s.id}')" class="w-full p-4 border border-white/5 text-left text-[10px] font-bold hover:bg-white/5 transition-all" id="btn-${s.id}">
                ${s.label}
            </button>
        `).join('');
    },

    applyState(s) {
        this.data.state = s;
        const root = document.documentElement;
        const color = getComputedStyle(root).getPropertyValue('--' + s).trim();
        root.style.setProperty('--pacer-color', color);
        
        document.getElementById('pacer-container').className = `glass-pane flex-1 relative flex flex-col items-center justify-center p-8 overflow-hidden ${['red', 'orange', 'purple'].includes(s) ? 'pacer-active' : ''}`;
        
        document.querySelectorAll('#state-matrix button').forEach(b => b.style.borderColor = 'rgba(255,255,255,0.05)');
        document.getElementById(`btn-${s}`).style.borderColor = color;
        
        this.log(`State Shift: ${s.toUpperCase()}`);
        this.save();
    },

    executeMVS() {
        if(this.data.integrity >= 70) {
            this.log("GOVERNOR ACTIVE: System Lock.");
            return alert("Integrity Critical. Rest Required.");
        }
        this.data.integrity += 10;
        this.data.fuel += 50;
        this.data.wins.unshift({ task: document.getElementById('fox-input').value || 'Unlabeled', time: new Date().toLocaleTimeString() });
        this.updateUI();
        this.save();
    },

    saveMemo() {
        const val = document.getElementById('memo-input').value;
        if(!val) return;
        this.data.memos.unshift({ text: val, time: new Date().toLocaleTimeString() });
        document.getElementById('memo-input').value = '';
        this.updateUI();
        this.save();
    },

    switchView(id) {
        document.querySelectorAll('.view-pane').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-node').forEach(b => b.classList.remove('active'));
        document.getElementById('view-' + id).classList.add('active');
        document.getElementById('tab-' + id).classList.add('active');
    },

    updateUI() {
        document.getElementById('fuel-display').innerText = this.data.fuel.toString().padStart(3, '0');
        document.getElementById('integrity-num').innerText = this.data.integrity + '%';
        document.getElementById('integrity-bar').style.width = this.data.integrity + '%';
        
        document.getElementById('win-ledger').innerHTML = this.data.wins.map(w => `
            <div class="glass-pane p-4 flex justify-between text-xs border-l-2 border-amber-500">
                <span class="font-bold">${w.task}</span><span class="opacity-30">${w.time}</span>
            </div>
        `).join('');
    },

    log(msg) {
        const term = document.getElementById('terminal-output');
        term.innerHTML += `<div>> ${msg}</div>`;
        term.scrollTop = term.scrollHeight;
    },

    save() {
        this.data.fox = document.getElementById('fox-input').value;
        localStorage.setItem('apex_hive_db', JSON.stringify(this.data));
    }
};

window.onload = () => App.init();
