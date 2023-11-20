// Obtém o elemento canvas e seu contexto
var ctx = document.getElementById('frequencia_corte_canva').getContext('2d');

// Inicializa o gráfico com um conjunto de dados de exemplo
var initialLabels = [];
var initialData = [];
var initialFrequenciaMaxima = 65;

// Popula os rótulos e os dados de exemplo
for (var i = 0; i <= initialFrequenciaMaxima; i++) {
  initialLabels.push(i);
  initialData.push(1);
}

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: initialLabels,
    datasets: [{
      label: 'Amplitude',
      data: initialData,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Frequência (Hz)'
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Amplitude'
        }
      }
    }
  }
});

// Adiciona um ouvinte de eventos ao input range para atualizar o gráfico
document.getElementById('amplitudeSlider').addEventListener('input', function() {
  updateChart(this.value * 60);
});

// Função para atualizar o gráfico com base no ponto de amplitudeSlider
function updateChart(amplitudeSlider) {
  var labels = [];
  var data = [];
  var frequenciaMaxima = 65;

  // Popula os rótulos e os dados
  for (var i = 0; i <= frequenciaMaxima; i++) {
    labels.push(i);
    if (i <= amplitudeSlider) {
      data.push(1); // Amplitude constante
    } else {
      // Amplitude linear decrescente após o ponto de amplitudeSlider
      data.push(1 - (i - amplitudeSlider) / (frequenciaMaxima - amplitudeSlider));
    }
  }

  // Atualiza os dados do gráfico
  myChart.data.labels = labels;
  myChart.data.datasets[0].data = data;

  // Atualiza o gráfico
  myChart.update();
}

// Inicializa o gráfico com o valor padrão do ponto de amplitudeSlider
updateChart(document.getElementById('amplitudeSlider').value * 60);
