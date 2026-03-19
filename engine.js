const Architect = {
    state: JSON.parse(localStorage.getItem('arch_mod_v1')) || {
        color: 'green', integrity: 0, fuel: 0, fox: '', memories: [], wins: []
    },

    init() {
        this.renderStates();
        this.updateUI();
        this.applyState(this.state.color);
    },

    renderStates() {
        const colors = ['yellow', 'red', 'orange', 'purple', 'blue', 'green'];
        const grid = document.getElementById('state-grid');
        grid.innerHTML = colors.map(c => `
            <button onclick="Architect.applyState('${c}')" class="state-btn p-4 glass text-[10px] font-bold uppercase">${c}</button>
        `).join('');
    },

    applyState(c) {
        this.state.color = c;
        const protocols = {
            red: "HEAT: Critical Spike. Breathe with the pacer.",
            green: "FLOW: Optimal. Execute now.",
            blue: "GRAVITY: Low Energy. Review the Vault."
        };
        document.getElementById('guidance-text').innerText = protocols[c] || "Calibrating State...";
        document.body.style.boxShadow = `inset 0 0 100px var(--${c})`;
        
        const container = document.getElementById('fox-container');
        if(['red', 'orange'].includes(c)) container.classList.add('pacer-active');
        else container.classList.remove('pacer-active');
        
        this.save();
    },

    executeMVS() {
        if(this.state.integrity >= 70) return alert("70% Governor: Mandatory Rest.");
        this.state.integrity += 10;
        this.state.fuel += 25;
        this.updateUI();
        this.save();
    },

    updateUI() {
        document.getElementById('fuel-display').innerText = this.state.fuel.toString().padStart(3, '0');
        document.getElementById('integrity-bar').style.width = this.state.integrity + '%';
    },

    save() {
        localStorage.setItem('arch_mod_v1', JSON.stringify(this.state));
    }
};

window.onload = () => Architect.init();
