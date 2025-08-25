'use client';

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { GraphData, Serie } from '@services/consult/getGraph';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Icon } from '@base/Icon';
import { Text } from '@base/text';
import { ChartOptions } from 'chart.js';
import Image from 'next/image';

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

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: 480,
      });

      chartRef.current.style.opacity = '0';

      const link = document.createElement('a');
      link.download = 'redem-grafico.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
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

            {onGetCsvFile && (
              <button
                className="flex items-center justify-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors w-full md:w-auto h-12"
                onClick={() => onGetCsvFile('csv')}
              >
                <Icon type="CSV" />
                <Text>Exportar Dados</Text>
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-[500px] pt-5">
          <Bar data={chartData} options={_mountOptions()} />
          <div
            ref={chartRef}
            className="w-[800px] h-[480px] fixed -top-[9999px] -left-[9999px] bg-white opacity-0 p-6"
          >
            <div className="relative w-full h-[400px]">
              <div
                className="absolute top-12 right-0 z-0"
                style={{
                  width: '200px',
                  height: '104px',
                }}
              >
                <Image
                  src="/img/LogoOrange.svg"
                  alt="Logo"
                  width={200}
                  height={104}
                  className="opacity-10 color-black"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '104px',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="relative z-10 w-full h-full">
                <Bar data={chartData} options={_mountOptions()} />
              </div>
            </div>
            <div className="text-sm text-gray-600 text-center mt-4 pt-2">
              Fonte: Portal da Classe Política - INCT ReDem (2025)
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BarChart;
