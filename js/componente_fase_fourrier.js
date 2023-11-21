// Função para calcular a amplitude da enésima harmônica ímpar
function calcularAmplitude(n, intensidade) {
    return intensidade * 8 / (n**2 * Math.PI**2);
}

// Função para calcular a fase da enésima harmônica em graus
function calcularFase(n, intensidade) {
    return intensidade * ((n % 2 === 0) ? 180 : 0) / 100;
}

// Número de harmônicas a serem consideradas
const numHarmônicas = 10;

// Valor inicial para a intensidade
let intensidade = 100;

// Função para atualizar os gráficos quando a intensidade é alterada
function atualizarGraficos() {
    intensidade = document.getElementById('controleIntensidade').value;
    meuGraficoAmplitude.data.datasets[0].data = valoresN.map((n, index) => ({ x: n, y: calcularAmplitude(n, intensidade) }));
    meuGraficoFase.data.datasets[0].data = valoresN.map((n, index) => ({ x: n, y: calcularFase(n, intensidade) }));
    meuGraficoAmplitude.update();
    meuGraficoFase.update();
}

// Arrays para armazenar os valores de n e suas amplitudes e fases
const valoresN = Array.from({ length: numHarmônicas * 2 }, (_, index) => index + 1);
const valoresAmplitude = valoresN.map(n => calcularAmplitude(n, intensidade));
const valoresFase = valoresN.map(n => calcularFase(n, intensidade));

// Configuração do gráfico de dispersão para amplitude
const contextoAmplitude = document.getElementById('meuGraficoAmplitude').getContext('2d');
const meuGraficoAmplitude = new Chart(contextoAmplitude, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Amplitude',
            data: valoresN.map((n, index) => ({ x: n, y: valoresAmplitude[index] })),
            borderColor: 'blue',
            backgroundColor: 'blue',
            pointRadius: 8,
            pointHoverRadius: 10,
        }]
    },
    options: {
        responsive: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Número da Harmônica (n)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amplitude'
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }
});

// Configuração do gráfico de dispersão para fase
const contextoFase = document.getElementById('meuGraficoFase').getContext('2d');
const meuGraficoFase = new Chart(contextoFase, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Fase (graus)',
            data: valoresN.map((n, index) => ({ x: n, y: valoresFase[index] })),
            borderColor: 'red',
            backgroundColor: 'red',
            pointRadius: 8,
            pointHoverRadius: 10,
        }]
    },
    options: {
        responsive: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Número da Harmônica (n)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Fase (graus)'
                },
                suggestedMin: -10,
                suggestedMax: 190,
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }
});

// Adiciona o evento de input ao controle de intensidade
document.getElementById('controleIntensidade').addEventListener('input', atualizarGraficos);