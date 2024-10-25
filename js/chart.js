// custom-charts.js - Configurações personalizadas de gráficos
const renderChart = (ctx, labels, actualData, forecastData) => {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Nível Atual do Rio (m)',
                    data: actualData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: 'Previsão de Nível (m)',
                    data: forecastData,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    fill: true,
                    borderDash: [5, 5],
                    tension: 0.3,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nível do Rio (m)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
};
