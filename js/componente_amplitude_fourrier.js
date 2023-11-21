// Função para calcular a amplitude da enésima harmônica ímpar
function calcularAmplitudeTriangular(n) {
    return 8 / (n**2 * Math.PI**2);
  }
  
  // Número de harmônicas a serem consideradas
  const numHarmonicas = 10;
  
  // Arrays para armazenar os valores de n e suas amplitudes
  const valoresN = [];
  const valoresAmplitude = [];
  
  // Calcula e armazena os valores
  for (let n = 1; n <= numHarmonicas * 2; n += 1) {
    valoresN.push(n);
    valoresAmplitude.push(calcularAmplitudeTriangular(n));
  }
  
  // Configuração do gráfico de dispersão
  const contexto = document.getElementById('meuGrafico').getContext('2d');
  const meuGrafico = new Chart(contexto, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Amplitude',
            data: valoresN.map((n, index) => ({ x: n, y: valoresAmplitude[index] })),
            borderColor: 'blue',
            backgroundColor: 'blue',
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
        }
    }
  });
  