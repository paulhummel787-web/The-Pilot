window.Plugins = {
    recognition: null,
    isListening: false,

    init() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.onresult = (e) => {
                const cmd = e.results[e.results.length-1][0].transcript.toLowerCase();
                if(cmd.includes("deposit") || cmd.includes("execute")) Architect.executeMVS();
            };
        }
    },

    toggleVoice() {
        if(!this.recognition) return alert("Voice Not Supported.");
        this.isListening = !this.isListening;
        const btn = document.getElementById('voice-btn');
        if(this.isListening) {
            this.recognition.start();
            btn.innerHTML = '<i class="fas fa-microphone text-amber-400 animate-pulse text-xl"></i>';
        } else {
            this.recognition.stop();
            btn.innerHTML = '<i class="fas fa-microphone-slash text-xl"></i>';
        }
    }
};

window.addEventListener('DOMContentLoaded', () => Plugins.init());
