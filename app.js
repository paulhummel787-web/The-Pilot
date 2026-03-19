renderRightView() {
        const view = this.state.rightView;
        const stateData = KnowledgeBase.states[this.state.currentMode];
        const port = document.getElementById('right-viewport');
        
        // Tab Highlighting
        document.getElementById('tab-spirit').style.opacity = view === 'spirit' ? '1' : '0.3';
        document.getElementById('tab-vault').style.opacity = view === 'vault' ? '1' : '0.3';

        if (view === 'vault') {
            const vol1 = KnowledgeBase.architectOS.map(v => `
                <div class="p-3 mb-2 border border-amber-500/10 bg-white/5">
                    <div class="text-[8px] text-amber-500 font-black mb-1">VOL I: ${v.id}</div>
                    <div class="text-[10px] font-bold text-white uppercase">${v.title}</div>
                    <div class="text-[9px] opacity-40 italic mt-1">${v.sub}</div>
                </div>
            `).join('');

            const vol2 = KnowledgeBase.journeyToZion.map(v => `
                <div class="p-3 mb-2 border border-purple-500/10 bg-white/5">
                    <div class="text-[8px] text-purple-400 font-black mb-1">VOL II: ${v.id}</div>
                    <div class="text-[10px] font-bold text-white uppercase">${v.title}</div>
                    <div class="text-[9px] opacity-40 italic mt-1">${v.sub}</div>
                </div>
            `).join('');

            port.innerHTML = `<div class="space-y-4">${vol1}${vol2}</div>`;
        } else {
            port.innerHTML = `
                <div class="animate-in fade-in duration-700">
                    <h2 class="text-2xl font-black text-white uppercase tracking-tighter mb-4">${stateData.sub}</h2>
                    <p class="text-[14px] italic text-white/80 leading-relaxed mb-6 border-l-2 border-amber-500/30 pl-4">${stateData.spirit}</p>
                    <div class="p-4 bg-amber-500/5 border border-amber-500/20">
                        <div class="text-[9px] uppercase font-bold text-amber-500 mb-1">The Sanity Ring</div>
                        <div class="text-[12px] text-amber-400 italic">${stateData.scripture}</div>
                    </div>
                </div>
            `;
        }
    }
