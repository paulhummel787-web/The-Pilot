/**
 * ARCHITECT OS: PLUGIN MODULE V1.0
 * Features: Speech Recognition & Bio-Feedback Triggers
 */

const Plugins = {
    recognition: null,
    isListening: false,

    init() {
        this.setupVoice();
        console.log("PLUGINS_LOADED: Voice Logic Active.");
    },

    setupVoice() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!window.SpeechRecognition) return console.log("VOICE_UNSUPPORTED");

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;

        this.recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
            this.processCommand(transcript);
        };
    },

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            Architect.logSystemEvent("VOICE: MIC_OFF");
        } else {
            this.recognition.start();
            this.isListening = true;
            Architect.logSystemEvent("VOICE: LISTENING_FOR_COMMANDS...");
        }
        this.updateVoiceUI();
    },

    processCommand(cmd) {
        Architect.logSystemEvent(`VOICE_RECOGNIZED: "${cmd}"`);
        
        if (cmd.includes("execute") || cmd.includes("log")) {
            Architect.executeMVS();
        } 
        else if (cmd.includes("state green") || cmd.includes("flow")) {
            Architect.applyState('green');
        }
        else if (cmd.includes("state red") || cmd.includes("emergency")) {
            Architect.applyState('red');
        }
        else if (cmd.includes("clear memory")) {
            Architect.state.memories = [];
            Architect.save();
            Architect.updateUI();
        }
    },

    updateVoiceUI() {
        const btn = document.getElementById('voice-toggle-btn');
        if (this.isListening) {
            btn.classList.add('text-green-400', 'animate-pulse');
            btn.innerHTML = '<i class="fas fa-microphone"></i>';
        } else {
            btn.classList.remove('text-green-400', 'animate-pulse');
            btn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        }
    }
};

// Auto-init plugins
window.addEventListener('DOMContentLoaded', () => Plugins.init());
