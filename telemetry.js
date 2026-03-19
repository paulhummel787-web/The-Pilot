const Telemetry = {
    chart: null,

    init() {
        const ctx = document.getElementById('yieldChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Populated from DB
                datasets: [{
                    label: 'Nectar Yield',
                    data: [],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#f59e0b', font: { size: 8 } } }
                },
                plugins: { legend: { display: false } }
            }
        });
        this.update();
    },

    update() {
        // Sync chart with Core data
        const history = Core.state.logs.slice(0, 10).reverse();
        this.chart.data.labels = history.map(h => h.time);
        this.chart.data.datasets[0].data = history.map((_, i) => (i + 1) * 10); // Mock data for trend
        this.chart.update();
    }
};
