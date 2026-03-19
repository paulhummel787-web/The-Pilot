window.Architect = {
    state: JSON.parse(localStorage.getItem('arch_master_v28')) || {
        color: 'green', integrity: 0, fuel: 0, fox: '', memories: [], wins: []
    },

    init() {
        this.renderStates();
        this.applyState(this.state.color);
        this.updateUI();
        this.log("Architect Engine Online.");
    },

    renderStates() {
        const colors = ['yellow', 'red', 'orange', 'purple', 'blue', 'green'];
        const grid = document.getElementById('state-grid');
        grid.innerHTML = colors.map(c => `
            <button onclick="Architect.applyState('${c}')" class="state-btn p-4 glass" id="btn-${c}" style="--state-color: var(--${c})">${c}</button>
        `).join('');
    },

    switchView(id) {
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('view-' + id).classList.add('active');
        document.getElementById('tab-' + id).classList.add('active');
    },

    applyState(c) {
        this.state.color = c;
        const hex = getComputedStyle(document.documentElement).getPropertyValue(`--${c}`);
        document.getElementById('bg-glow').style.background = `radial-gradient(circle at center, ${hex}, transparent 70%)`;
        
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${c}`).classList.add('active');

        const container = document.getElementById('fox-container');
        if(['red', 'orange', 'purple'].includes(c)) container.classList.add('pacer-active');
        else container.classList.remove('pacer-active');

        this.save();
    },

    executeMVS() {
        if(this.state.integrity >= 70) return alert("70% Governor Active: Stop and Rest.");
        this.state.integrity += 10;
        this.state.fuel += 25;
        const task = document.getElementById('fox-input').value || "Manual Shift";
        this.state.wins.unshift({ task, time: new Date().toLocaleString() });
        this.log(`DEPOSIT: +25 Fuel. Task: ${task}`);
        this.updateUI();
        this.save();
    },

    saveMemo() {
        const input = document.getElementById('memo-input');
        if(!input.value) return;
        this.state.memories.unshift({ text: input.value, time: new Date().toLocaleTimeString() });
        input.value = '';
        this.updateUI();
        this.save();
    },

    updateUI() {
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
        document.getElementById('integrity-bar').style.width = this.state.integrity + '%';
        document.getElementById('integrity-text').innerText = this.state.integrity + '%';
        document.getElementById('fox-input').value = this.state.fox;

        document.getElementById('memo-list').innerHTML = this.state.memories.map(m => `
            <div class="glass p-4 text-xs border-l-2 border-amber-500">${m.text}</div>
        `).join('');

        document.getElementById('win-list').innerHTML = this.state.wins.map(w => `
            <div class="glass p-3 text-[10px] flex justify-between border-l-2 border-amber-400">
                <span class="font-bold">${w.task}</span><span class="opacity-30">${w.time}</span>
            </div>
        `).join('');
    },

    save() {
        this.state.fox = document.getElementById('fox-input').value;
        localStorage.setItem('arch_master_v28', JSON.stringify(this.state));
    },

    log(msg) {
        const term = document.getElementById('log-terminal');
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        term.innerHTML += `<div>> [${time}] ${msg}</div>`;
        term.scrollTop = term.scrollHeight;
    },

    exportData() {
        const blob = new Blob([JSON.stringify(this.state)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'hive_telemetry.json'; a.click();
    }
};

window.onload = () => Architect.init();
