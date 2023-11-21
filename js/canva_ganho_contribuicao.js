function ganho(wn, wc) {
    return 1 / Math.sqrt(1 + Math.pow(wn / wc, 2));
}

function fase(wn, wc) {
    return Math.atan2(-wn, wc) * (180 / Math.PI); // Convertendo para graus
}

const wnRange = document.getElementById('wnRange');
const wcRange = document.getElementById('wcRange');
const wnValue = document.getElementById('wnValue');
const wcValue = document.getElementById('wcValue');

function updateChart() {
    // Obtenha o valor do wnRange
    var wnValue = document.getElementById("wnRange").value;

    // Atualize o texto ao lado do wnRange
    document.getElementById("wnValue").innerText = wnValue;

    wnValue.textContent = wnRange.value;
    wcValue.textContent = wcRange.value;

    const wn = parseFloat(wnRange.value);
    const wc = parseFloat(wcRange.value);

    const gainData = Array.from({ length: 100 }, (_, i) => ganho(wn, wc));
    const phaseData = Array.from({ length: 100 }, (_, i) => fase(wn, wc));

    gainChart.data.datasets[0].data = gainData;
    phaseChart.data.datasets[0].data = phaseData;

    gainChart.update();
    phaseChart.update();
}

const gainCtx = document.getElementById('gainChart').getContext('2d');
const gainChart = new Chart(gainCtx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 100 }, (_, i) => i * 0.6),
        datasets: [{
            label: 'Ganho',
            data: Array.from({ length: 100 }, (_, i) => 0),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
        }],
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                max: 60,
                title: {
                    display: true,
                    text: 'Periodo'
                }
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Ganho(%): 1 = 100%'
                }
            }
        }
    }
});

const phaseCtx = document.getElementById('phaseChart').getContext('2d');
const phaseChart = new Chart(phaseCtx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 100 }, (_, i) => i * 0.6),
        datasets: [{
            label: 'Fase',
            data: Array.from({ length: 100 }, (_, i) => 0),
            fill: false,
            borderColor: 'rgba(192, 75, 192, 1)',
        }],
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                max: 60,
                title: {
                    display: true,
                    text: 'Periodo'
                }
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Fase (graus)'
                }
            }
        }
    }
});


function updateWnRange() {
    // Obtenha o valor do slider_speed
    var speedValue = document.getElementById("slider_speed").value;

    // Atualize o valor do wnRange de acordo com o valor do slider_speed
    document.getElementById("wnRange").value = speedValue;

    // Atualize o texto ao lado do wnRange
    document.getElementById("wnValue").innerText = speedValue;

    // Faça qualquer outra coisa que você precisa fazer com o valor do slider_speed
}

updateChart();
