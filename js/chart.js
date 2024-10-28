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

function mostrarAlerta() {
    const cidade = document.getElementById('cidade').value;
    
    // Dados de alerta para cada cidade
    const alertas = {
        "Porto Alegre": [
            { tipo: "Inundação", nivel: "Alta", descricao: "Risco de inundação devido a chuvas intensas", local: "Vale do Taquari", data: "2024-10-26 14:30" },
            { tipo: "Deslizamento", nivel: "Média", descricao: "Risco de deslizamentos em áreas íngremes", local: "Serra Gaúcha", data: "2024-10-26 14:15" }
        ],
        "Vale do Taquari": [
            { tipo: "Inundação", nivel: "Alta", descricao: "Risco de inundação devido a chuvas intensas", local: "Vale do Taquari", data: "2024-10-26 14:30" }
        ],
        "Serra Gaúcha": [
            { tipo: "Deslizamento", nivel: "Média", descricao: "Risco de deslizamentos em áreas íngremes", local: "Serra Gaúcha", data: "2024-10-26 14:15" }
        ]
    };

    // Exibir alerta caso a cidade tenha dados
    if (cidade && alertas[cidade]) {
        let alertaHTML = `<h3>Status Atual</h3><p>${alertas[cidade].length} alertas ativos na sua região</p>`;
        alertas[cidade].forEach(alerta => {
            alertaHTML += `
                <div class="alerta">
                    <h4>${alerta.tipo} - ${alerta.nivel}</h4>
                    <p>${alerta.descricao}</p>
                    <p><strong>Local:</strong> ${alerta.local} • <strong>Data:</strong> ${alerta.data}</p>
                </div>`;
        });
        document.getElementById('alertaContainer').innerHTML = alertaHTML;
    }
}

const alertItems = [
    { tipo: "Inundação - Alta", descricao: "Risco de inundação devido a chuvas intensas", local: "Vale do Taquari", hora: "2024-10-26 14:30" },
    { tipo: "Deslizamento - Média", descricao: "Risco de deslizamentos em áreas íngremes", local: "Serra Gaúcha", hora: "2024-10-26 14:15" },
    { tipo: "Tempestade - Alta", descricao: "Chuva forte acompanhada de ventos de até 100 km/h", local: "Caxias do Sul", hora: "2024-10-26 13:45" },
    { tipo: "Enchente - Baixa", descricao: "Nível do rio subindo lentamente, sem risco imediato", local: "Santa Maria", hora: "2024-10-26 13:00" },
    { tipo: "Granizo - Média", descricao: "Previsão de granizo em áreas isoladas", local: "Porto Alegre", hora: "2024-10-26 12:30" },
    { tipo: "Calor Extremo - Alta", descricao: "Temperatura acima de 40°C prevista para amanhã", local: "Passo Fundo", hora: "2024-10-25 17:00" },
    { tipo: "Nevoeiro - Baixa", descricao: "Visibilidade reduzida devido a nevoeiro denso", local: "Gramado", hora: "2024-10-26 06:00" },
    { tipo: "Ventos Fortes - Alta", descricao: "Rajadas de vento superiores a 80 km/h", local: "Canela", hora: "2024-10-26 11:30" },
    { tipo: "Alagamento - Média", descricao: "Acúmulo de água em áreas baixas devido a chuvas contínuas", local: "Pelotas", hora: "2024-10-26 15:00" },
    { tipo: "Baixa Umidade - Alta", descricao: "Umidade do ar abaixo de 20%, condições propícias para incêndios", local: "Uruguaiana", hora: "2024-10-26 10:00" },
    { tipo: "Frente Fria - Média", descricao: "Queda significativa de temperatura com ventos gelados", local: "Lajeado", hora: "2024-10-26 09:00" },
    { tipo: "Gelo na Pista - Alta", descricao: "Possibilidade de gelo nas estradas em áreas montanhosas", local: "Nova Petrópolis", hora: "2024-10-26 05:30" },
    { tipo: "Chuvas Torrenciais - Alta", descricao: "Previsão de chuvas intensas nas próximas horas", local: "Bento Gonçalves", hora: "2024-10-26 16:45" },
    { tipo: "Incêndio Florestal - Alta", descricao: "Incêndio florestal ativo, fumaça densa e áreas evacuadas", local: "Erechim", hora: "2024-10-26 14:00" },
    { tipo: "Ondas de Calor - Alta", descricao: "Temperaturas extremas acima de 42°C", local: "Santa Rosa", hora: "2024-10-25 14:30" }
];

function getRandomAlerts() {
    const shuffled = [...alertItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
}

function showAlert() {
    const alertDialog = document.querySelector('.alert-dialog');
    const alertOverlay = document.querySelector('.alert-overlay');
    const alertContent = document.querySelector('.alert-content');
    
    alertContent.innerHTML = ""; // Limpa o conteúdo anterior

    const selectedAlerts = getRandomAlerts();
    selectedAlerts.forEach(alert => {
        const alertItem = document.createElement('div');

        let alertLevelClass = '';
        if (alert.tipo.includes('Baixa')) {
            alertLevelClass = 'baixa';
        } else if (alert.tipo.includes('Média')) {
            alertLevelClass = 'media';
        } else if (alert.tipo.includes('Alta')) {
            alertLevelClass = 'alta';
        }

        alertItem.classList.add('alert-item', alertLevelClass);
        alertItem.innerHTML = `
            <p><strong>${alert.tipo}</strong></p>
            <p>${alert.descricao}</p>
            <p>📍 ${alert.local} • 🕒 ${alert.hora}</p>
        `;
        alertContent.appendChild(alertItem);
    });

    alertDialog.style.display = 'block';
    alertOverlay.style.display = 'block';
}

function closeAlert() {
    document.querySelector('.alert-dialog').style.display = 'none';
    document.querySelector('.alert-overlay').style.display = 'none';
}

function showRegionSelection() {
    document.querySelector('.region-selection').style.display = 'block';
    document.querySelector('.alert-overlay').style.display = 'block';
}

function saveRegion() {
    const selectedRegion = document.getElementById('region-select').value;
    if (selectedRegion) {
        closeRegionSelection();
        showAlert();
    } else {
        alert('Por favor, selecione uma região.');
    }
}

function closeRegionSelection() {
    document.querySelector('.region-selection').style.display = 'none';
    document.querySelector('.alert-overlay').style.display = 'none';
}

function changeCity() {
    const selectedCity = document.getElementById('city-dropdown').value;
    if (selectedCity) {
        showAlert();
    }
}

window.onload = function() {
    showRegionSelection();
};

function toggleText(button) {
    const moreText = button.previousElementSibling.querySelector(".more-text");
    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        button.textContent = "Leia menos";
    } else {
        moreText.style.display = "none";
        button.textContent = "Leia mais";
    }
}

function toggleMenu() {
    const menuLinks = document.getElementById("menu-links");    
    menuLinks.classList.toggle("hidden");
}

function toggleAccessibilityOptions() {
    document.getElementById('accessibility-options').classList.toggle('hidden');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function increaseFontSize() {
    document.body.style.fontSize = '1.5em';
}

function resetAccessibility() {
    document.body.style.fontSize = '';
    document.body.classList.remove('high-contrast');
}