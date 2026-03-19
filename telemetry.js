const Telemetry = {
    isListening: false,
    recognition: null,

    init() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(window.SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.onresult = (e) => {
                const cmd = e.results[e.results.length - 1][0].transcript.toLowerCase();
                if(cmd.includes("deposit") || cmd.includes("log")) App.executeMVS();
                if(cmd.includes("clear")) { App.data.memos = []; App.updateUI(); }
            };
        }
    },

    toggleVoice() {
        if(!this.recognition) return;
        this.isListening = !this.isListening;
        const mic = document.getElementById('mic-node');
        if(this.isListening) {
            this.recognition.start();
            mic.innerHTML = '<i class="fas fa-microphone text-green-400"></i>';
            App.log("Voice Link: Established.");
        } else {
            this.recognition.stop();
            mic.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            App.log("Voice Link: Severed.");
        }
    }
};

window.addEventListener('DOMContentLoaded', () => Telemetry.init());
