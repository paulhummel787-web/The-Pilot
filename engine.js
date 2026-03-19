const Architect = {
    state: JSON.parse(localStorage.getItem('arch_hive_v27')) || {
        color: 'green', integrity: 0, fuel: 0, fox: '', memories: [], wins: []
    },
    recognition: null,
    isListening: false,

    init() {
        this.renderStates();
        this.applyState(this.state.color);
        this.updateUI();
        this.setupVoice();
        this.log("Hive Mind Online.");
    },

    renderStates() {
        const colors = ['yellow', 'red', 'orange', 'purple', 'blue', 'green'];
        const grid = document.getElementById('state-grid');
        grid.innerHTML = colors.map(c => `
            <button onclick="Architect.applyState('${c}')" class="state-btn p-4 glass text-[9px] font-black uppercase tracking-widest" id="btn-${c}" style="--state-color: var(--${c})">${c}</button>
        `).join('');
    },

    switchView(id) {
        // Core Fix: Remove active from all, add to selected
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        const targetView = document.getElementById('view-' + id);
        const targetTab = document.getElementById('tab-' + id);
        
        if(targetView && targetTab) {
            targetView.classList.add('active');
            targetTab.classList.add('active');
            this.log(`Switched to ${id.toUpperCase()}`);
        }
    },

    applyState(c) {
        this.state.color = c;
        const protocols = {
            yellow: "STATIC: Sensory overload. Close all extra tabs.",
            red: "HEAT: Emotional spike. Sync with pacer.",
            orange: "THREAT: Nervous system high. Focus on breath.",
            purple: "PRESSURE: Cognitive loop. Use memory cells.",
            blue: "GRAVITY: Energy depleted. Check the vault.",
            green: "FLOW: Regulation achieved. Target acquired."
        };

        const hex = getComputedStyle(document.documentElement).getPropertyValue(`--${c}`);
        document.getElementById('bg-glow').style.background = `radial-gradient(circle at center, ${hex}, transparent 70%)`;
        document.getElementById('guidance-text').innerText = protocols[c];
        
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${c}`).classList.add('active');

        const container = document.getElementById('fox-container');
        if(['red', 'orange', 'purple'].includes(c)) container.classList.add('pacer-active');
        else container.classList.remove('pacer-active');

        this.save();
    },

    executeMVS() {
        if(this.state.integrity >= 70) return alert("70% Governor: The Hive requires rest.");
        this.state.integrity += 10;
        this.state.fuel += 25;
        const task = document.getElementById('fox-input').value || "Foraging Path";
        this.state.wins.unshift({ task, time: new Date().toLocaleString() });
        this.log(`NECTAR DEPOSITED: ${task}`);
        this.updateUI();
        this.save();
    },

    saveMemo() {
        const input = document.getElementById('memo-input');
        if(!input.value) return;
        this.state.memories.unshift({ text: input.value, time: new Date().toLocaleTimeString() });
        input.value = '';
        this.log("CELL ARCHIVED.");
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
                <span class="font-bold uppercase">${w.task}</span><span class="opacity-30">${w.time}</span>
            </div>
        `).join('');
    },

    save() {
        this.state.fox = document.getElementById('fox-input').value;
        localStorage.setItem('arch_hive_v27', JSON.stringify(this.state));
    },

    log(msg) {
        const term = document.getElementById('log-terminal');
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        term.innerHTML += `<div class="mb-1"> > <span class="text-amber-500">[${time}]</span> ${msg}</div>`;
        term.scrollTop = term.scrollHeight;
    },

    setupVoice() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!window.SpeechRecognition) return;
        this.recognition = new SpeechRecognition();
        this.recognition.onresult = (e) => {
            const cmd = e.results[e.results.length-1][0].transcript.toLowerCase();
            if(cmd.includes("deposit") || cmd.includes("log")) this.executeMVS();
        };
    },

    toggleVoice() {
        if(!this.recognition) return alert("Voice unsupported.");
        this.isListening = !this.isListening;
        const btn = document.getElementById('voice-btn');
        if(this.isListening) { this.recognition.start(); btn.innerHTML = '<i class="fas fa-microphone text-amber-400 animate-pulse text-xl"></i>'; }
        else { this.recognition.stop(); btn.innerHTML = '<i class="fas fa-microphone-slash text-xl"></i>'; }
    },

    exportData() {
        const blob = new Blob([JSON.stringify(this.state)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'hive_telemetry.json'; a.click();
    }
};

window.onload = () => Architect.init();
