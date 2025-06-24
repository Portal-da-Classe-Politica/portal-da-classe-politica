import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { GraphData, Serie } from '@services/consult/getGraph';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Icon } from '@base/Icon';
import { Text } from '@base/text';
import { ChartOptions } from 'chart.js';

const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), {
  ssr: false,
});

interface BarChartProps {
  graphData: GraphData;
  textCsv?: string;
  onGetCsvFile?: (_params: string) => void;
}

const BarChart = ({ graphData, onGetCsvFile, textCsv }: BarChartProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textCsv) {
      extractCsv(textCsv);
    }
  }, [textCsv]);

  useEffect(() => {
    const data = _mountData();
    setChartData(data);
  }, [graphData]);

  const _mountData = () => {
    const primaryColor = 'rgb(255,102,58)';
    console.log('graphData', graphData);

    return {
      labels: graphData.series.map((serie: Serie) => String(serie.name)), // Convert names to strings
      datasets: [
        {
          axis: 'y',
          label: graphData.seriesName,
          data: graphData.series.map((serie: Serie) => parseFloat(serie.value || '0')),
          backgroundColor: graphData.series.map(() => primaryColor),
          borderColor: graphData.series.map(() => primaryColor),
          borderWidth: 1,
          hoverBackgroundColor: graphData.series.map(() => primaryColor),
          hoverBorderColor: graphData.series.map(() => primaryColor),
        },
      ],
    };
  };

  const _mountOptions = (): ChartOptions<'bar'> => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      tooltip: {
        backgroundColor: 'rgb(245, 245, 245, 0.9)',
        borderWidth: 1,
        borderColor: 'rgba(235, 88, 47, 1)',
        titleColor: 'rgb(31, 31, 31)',
        bodyColor: 'rgb(31, 31, 31)',
        padding: 18,
        usePointStyle: true,
        displayColors: true,
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 15,
          weight: 'bold',
        },
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
  });

  const handleExportImage = async () => {
    if (chartRef.current) {
      chartRef.current.style.opacity = '1';
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = 'redem-grafico.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      chartRef.current.style.opacity = '0';
    }
  };

  const extractCsv = (textCsv: string) => {
    const blob = new Blob([textCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'redem-grafico.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    chartData && (
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
            {graphData?.title}
          </h1>
          <div className="flex flex-col md:flex-row justify-end items-center px-4 gap-4 py-4 w-full md:w-auto">
            <button
              className="flex items-center justify-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors w-full md:w-auto h-12"
              onClick={handleExportImage}
            >
              <Icon type="Image" />
              <Text>Exportar imagem</Text>
            </button>
            <button
              className="flex items-center justify-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors w-full md:w-auto h-12"
              onClick={() => onGetCsvFile && onGetCsvFile('csv')}
            >
              <Icon type="CSV" />
              <Text>Exportar Dados</Text>
            </button>
          </div>
        </div>
        <div className="w-full h-[500px] pt-5">
          <Bar data={chartData} options={_mountOptions()} />
          <div ref={chartRef} className="w-[800px] h-[400px] fixed top-100 left-100 bg-white opacity-0">
            <Bar data={chartData} options={_mountOptions()} />
          </div>
        </div>
      </div>
    )
  );
};

export default BarChart;
