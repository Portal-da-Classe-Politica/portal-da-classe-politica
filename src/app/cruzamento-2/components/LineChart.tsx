import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { GraphData } from '@services/consult/getGraph';
import { useEffect, useState } from 'react';

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#333',
        font: {
          size: 12,
          family: 'Arial, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#555',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'rgba(167, 167, 167, 0.2)',
      },
    },
    y: {
      ticks: {
        color: '#555',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'rgba(200, 200, 200, 0.2)',
      },
    },
  },
};

interface LineChartProps {
  graphData: GraphData;
  title?: string;
}

const binaryColorMap = new Map([
  [0, '#264653'], // Azul petróleo escuro
  [1, '#E76F51'], // Vermelho queimado
]);

const multiCategoryColorMap = new Map([
  [0, '#264653'], // Azul petróleo escuro
  [1, '#2A9D8F'], // Verde água
  [2, '#E9C46A'], // Amarelo areia
  [3, '#F4A261'], // Laranja claro
  [4, '#E76F51'], // Vermelho queimado
  [5, '#A5B173'], // Verde oliva claro
  [6, '#C55A73'], // Rosa queimado
  [7, '#2F493C'], // Verde musgo escuro
  [8, '#79742B'], // Amarelo mostarda escuro
]);

const LineChart = ({ graphData, title = 'Teste' }: LineChartProps) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const isBinary = graphData.series.length === 2;

    const data = {
      labels: graphData.xAxis,
      datasets: graphData.series.map((serie, index) => {
        const primaryColor = isBinary ? binaryColorMap.get(index) : multiCategoryColorMap.get(index);
        // const opacity = `${primaryColor}20`;

        return {
          label: serie.name,
          data: serie.data.map(value => parseFloat(value)),
          borderColor: primaryColor,
          backgroundColor: 'transparent',
          // backgroundColor: opacity,
          pointBackgroundColor: primaryColor,
          pointBorderColor: 'white',
          pointHoverBackgroundColor: 'white',
          pointHoverBorderColor: primaryColor,
          pointRadius: 4, // Tamanho do ponto
          pointHoverRadius: 6, // Tamanho ao passar o mouse
          fill: true,
          tension: 0.3,
        };
      }),
    };
    setChartData(data);
  }, [graphData]);

  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>{title}</h1>
      {chartData && <Line data={chartData} options={options as any} />}
    </div>
  );
};

export default LineChart;
