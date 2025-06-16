import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { GraphData } from '@services/consult/getGraph';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Heading } from '@base/Heading';
import { Icon } from '@base/Icon';
import { Text } from '@base/text';

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
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

interface LineChartProps {
  graphData: GraphData;
  textCsv?: string;
  onGetCsvFile?: (_params: string) => void;
}

const LineChart = ({ graphData, onGetCsvFile, textCsv }: LineChartProps) => {
  const [chartData, setChartData] = useState<any>(null);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textCsv) {
      return;
    }

    extractCsv(textCsv);
  }, [textCsv]);

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

  const handleExportImage = async () => {
    if (chartRef.current) {
      chartRef.current.style.opacity = '100%';
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = 'redem-grafico.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      chartRef.current.style.opacity = '0%';
    }
  };

  const extractCsv = (textCsv: string) => {
    const blob = new Blob([textCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'redem-grafico.csv';
    try {
      document.body.appendChild(link);
      link.click();
    } finally {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    chartData && (
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-end items-center w-full px-4 gap-4 py-4">
          <button
            className="flex items-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors"
            onClick={handleExportImage}
          >
            <Icon type="Image" />
            <Text>Exportar imagem</Text>
          </button>
          <button
            className="flex items-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors"
            onClick={() => onGetCsvFile && onGetCsvFile('csv')}
          >
            <Icon type="CSV" />
            <Text>Exportar Dados</Text>
          </button>
        </div>
        <Heading size="H2">{graphData?.title}</Heading>
        <div className="w-full h-[600px] pt-5">
          <Line data={chartData} options={options as any} />
          {/* Export refer */}
          <div ref={chartRef} className="w-[800px] h-[400px] fixed top-100 left-100 bg-white opacity-0">
            <Line data={chartData} options={options as any} />
          </div>
        </div>
      </div>
    )
  );
};

export default LineChart;
