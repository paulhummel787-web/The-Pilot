const Core = {
    state: JSON.parse(localStorage.getItem('apex_db')) || {
        integrity: 0, fuel: 0, logs: [], cells: []
    },

    init() {
        this.registerSW();
        this.render();
        this.log("Kernel Stabilized. Welcome back, Architect.");
    },

    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js');
        }
    },

    executeDeposit() {
        if (this.state.integrity >= 70) {
            this.log("CRITICAL: Governor locked. Rest required.");
            return;
        }
        const target = document.getElementById('target-input').value || "Routine Operation";
        this.state.integrity += 10;
        this.state.fuel += 50;
        this.state.logs.unshift({ msg: `DEPOSITED: ${target}`, time: new Date().toLocaleTimeString() });
        this.save();
        this.render();
    },

    log(msg) {
        const logger = document.getElementById('system-log');
        const entry = document.createElement('div');
        entry.textContent = `> [${new Date().toLocaleTimeString()}] ${msg}`;
        logger.prepend(entry);
    },

    render() {
        document.getElementById('integrity-label').innerText = `${this.state.integrity}%`;
        document.getElementById('integrity-bar').style.width = `${this.state.integrity}%`;
        
        const vault = document.getElementById('vault-grid');
        vault.innerHTML = this.state.logs.map(l => `
            <div class="p-2 border border-white/5 bg-white/5 text-[9px]">
                <div class="text-white font-bold uppercase">${l.msg}</div>
                <div class="opacity-30">${l.time}</div>
            </div>
        `).join('');
    },

    save() {
        localStorage.setItem('apex_db', JSON.stringify(this.state));
    }
};

window.onload = () => Core.init();
