const Architect = {
    state: JSON.parse(localStorage.getItem('arch_v26_data')) || {
        color: 'green', integrity: 0, fuel: 0, fox: '', memories: [], wins: []
    },
    recognition: null,
    isListening: false,

    init() {
        this.renderStates();
        this.updateUI();
        this.applyState(this.state.color);
        this.setupVoice();
        this.log("Architect Engine Online.");
    },

    renderStates() {
        const colors = ['yellow', 'red', 'orange', 'purple', 'blue', 'green'];
        const grid = document.getElementById('state-grid');
        grid.innerHTML = colors.map(c => `
            <button onclick="Architect.applyState('${c}')" class="state-btn p-4 glass text-[10px] font-black uppercase tracking-widest" id="btn-${c}" style="--state-color: var(--${c})">${c}</button>
        `).join('');
    },

    applyState(c) {
        this.state.color = c;
        const protocols = {
            yellow: "STATIC: Sensory overload. Close all extra tabs. Simplify the Fox.",
            red: "HEAT: Emotional spike. Follow the breathing pacer for 3 cycles.",
            orange: "THREAT: Nervous system high. Locate 3 physical objects in your room.",
            purple: "PRESSURE: Cognitive loop. Use the Memory tab to dump the logic.",
            blue: "GRAVITY: Energy depleted. Check the Vault for proof of capacity.",
            green: "FLOW: Regulation achieved. Target acquired. Execute."
        };

        const hex = getComputedStyle(document.documentElement).getPropertyValue(`--${c}`);
        document.getElementById('bg-glow').style.background = `radial-gradient(circle at center, ${hex}, transparent 70%)`;
        document.getElementById('guidance-text').innerText = protocols[c];
        document.getElementById('status-panel').style.borderColor = hex;
        
        // UI Updates
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${c}`).classList.add('active');

        // Pacer Logic
        const container = document.getElementById('fox-container');
        container.style.setProperty('--state-color', hex);
        if(['red', 'orange', 'purple'].includes(c)) container.classList.add('pacer-active');
        else container.classList.remove('pacer-active');

        this.save();
    },

    executeMVS() {
        if(this.state.integrity >= 70) {
            this.log("GOVERNOR: 70% Limit reached. Stop and rest.");
            return alert("Governor Active. Mandatory Recovery Period.");
        }
        this.state.integrity += 10;
        this.state.fuel += 20;
        const task = document.getElementById('fox-input').value || "Unnamed Shift";
        this.state.wins.unshift({ task, time: new Date().toLocaleString() });
        this.log(`MVS LOGGED: +20 Fuel. Task: ${task}`);
        this.updateUI();
        this.save();
    },

    saveMemo() {
        const input = document.getElementById('memo-input');
        if(!input.value) return;
        this.state.memories.unshift({ text: input.value, time: new Date().toLocaleTimeString() });
        input.value = '';
        this.log("MEMORY ARCHIVED.");
        this.updateUI();
        this.save();
    },

    switchView(id) {
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('view-' + id).classList.add('active');
        document.getElementById('tab-' + id).classList.add('active');
    },

    updateUI() {
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
        document.getElementById('integrity-bar').style.width = this.state.integrity + '%';
        document.getElementById('integrity-text').innerText = this.state.integrity + '%';
        document.getElementById('fox-input').value = this.state.fox;

        // Render Memory
        document.getElementById('memo-list').innerHTML = this.state.memories.slice(0, 10).map(m => `
            <div class="glass p-4 text-xs border-l-2 border-purple-500">${m.text}</div>
        `).join('');

        // Render Wins
        document.getElementById('win-list').innerHTML = this.state.wins.slice(0, 10).map(w => `
            <div class="glass p-3 text-[10px] flex justify-between border-l-2 border-yellow-500">
                <span class="font-bold">${w.task}</span><span class="opacity-30">${w.time}</span>
            </div>
        `).join('');
    },

    save() {
        this.state.fox = document.getElementById('fox-input').value;
        localStorage.setItem('arch_v26_data', JSON.stringify(this.state));
    },

    log(msg) {
        const term = document.getElementById('log-terminal');
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
        term.innerHTML += `<div class="mb-1 text-white/60"><span class="text-indigo-400">[${time}]</span> > ${msg}</div>`;
        term.scrollTop = term.scrollHeight;
    },

    setupVoice() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!window.SpeechRecognition) return;
        this.recognition = new SpeechRecognition();
        this.recognition.onresult = (e) => {
            const cmd = e.results[e.results.length-1][0].transcript.toLowerCase();
            if(cmd.includes("execute") || cmd.includes("log")) this.executeMVS();
            if(cmd.includes("green")) this.applyState('green');
        };
    },

    toggleVoice() {
        if(!this.recognition) return alert("Voice not supported in this browser.");
        this.isListening = !this.isListening;
        const btn = document.getElementById('voice-btn');
        if(this.isListening) {
            this.recognition.start();
            btn.innerHTML = '<i class="fas fa-microphone text-green-400 animate-pulse text-xl"></i>';
            this.log("Voice Command Listening...");
        } else {
            this.recognition.stop();
            btn.innerHTML = '<i class="fas fa-microphone-slash text-xl"></i>';
            this.log("Mic Deactivated.");
        }
    },

    exportData() {
        const blob = new Blob([JSON.stringify(this.state)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'architect_telemetry.json'; a.click();
    }
};

// Start the OS
window.onload = () => Architect.init();
