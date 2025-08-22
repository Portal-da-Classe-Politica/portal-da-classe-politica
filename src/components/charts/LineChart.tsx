import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { GraphData, Serie } from '@services/consult/getGraph';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Icon } from '@base/Icon';
import { Text } from '@base/text';
import FilterModal from '@components/modals/FilterModal';
import { ChartOptions } from 'chart.js';
import Image from 'next/image';

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
});

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredSeries, setFilteredSeries] = useState<Serie[] | undefined>(undefined);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textCsv) {
      extractCsv(textCsv);
    }
  }, [textCsv]);

  useEffect(() => {
    const isPartyIndicator: boolean = !!graphData.indicator_detail?.party_indicator;

    if (!filteredSeries && isPartyIndicator) {
      if (isPartyIndicator) {
        const sortedSeries = graphData.series
          .map(serie => ({
            ...serie,
            data: serie.data?.map(value => parseFloat(value).toString()),
            total: serie.data?.reduce((sum, value) => sum + parseFloat(value), 0),
          }))
          .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
          .slice(0, 5);
        setFilteredSeries(sortedSeries);
      } else {
        setFilteredSeries(graphData.series);
      }
    }

    if (!isPartyIndicator) {
      setFilteredSeries(graphData.series);
    }

    const data = _mountData(isPartyIndicator);
    setChartData(data);
  }, [graphData, filteredSeries]);

  const _mountData = (isPartyIndicator: boolean) => {
    const isBinary: boolean = graphData.series.length === 2;

    return {
      labels: graphData.xAxis,
      datasets:
        filteredSeries?.map((serie, index) => {
          const primaryColor =
            isPartyIndicator && serie?.color
              ? serie.color
              : isBinary
                ? binaryColorMap.get(index)
                : multiCategoryColorMap.get(index);

          return {
            label: serie.name,
            data: serie.data,
            borderColor: primaryColor,
            backgroundColor: 'transparent',
            pointBackgroundColor: primaryColor,
            pointBorderColor: 'white',
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: primaryColor,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.3,
          };
        }) || [],
    };
  };

  const _mountOptions = (): ChartOptions<'line'> => {
    const unit = graphData.indicator_detail?.unit;

    const options: ChartOptions<'line'> = {
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
          backgroundColor: 'rgb(245, 245, 245, 0.9)', //
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
          callbacks: {
            label: function (context: any) {
              let value = context.parsed.y;
              if (unit === 'money') {
                value = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                return `${context.dataset.label}: R$ ${value}`;
              }
              if (unit === 'percentage' || unit === 'percent' || unit === 'Porcentagem') {
                value = value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
                return `${context.dataset.label}: % ${value}`;
              }
              return `${context.dataset.label}: ${value}`;
            },
            title: function (context: any) {
              return context[0]?.label || '';
            },
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
            callback: function (value: number | string) {
              let formattedValue = value;

              const numericValue = typeof value === 'string' ? Number(value) : value;

              if (unit === 'money') {
                formattedValue = numericValue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
                return `R$ ${formattedValue}`;
              }
              if (unit === 'percentage' || unit === 'percent' || unit === 'Porcentagem') {
                formattedValue = numericValue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                });
                return `% ${formattedValue}`;
              }
              return formattedValue;
            },
          },
          grid: {
            color: 'rgba(200, 200, 200, 0.2)',
          },
        },
      },
    };

    return options;
  };

  const handleApplyFilters = (newFilters: { selectedSeries: Serie[] }) => {
    setFilteredSeries(newFilters.selectedSeries);
  };

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

  const isFilterApplied = filteredSeries?.length !== graphData.series.length;

  return (
    chartData && (
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
            {graphData?.title}
          </h1>
          <div className="flex flex-col md:flex-row justify-end items-center px-4 gap-4 py-4 w-full md:w-auto">
            {graphData?.indicator_detail?.party_indicator && (
              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors w-full md:w-auto h-12 ${
                  isFilterApplied
                    ? 'bg-orange text-white border border-orange'
                    : 'bg-white text-orange border border-orange hover:bg-orange hover:text-white'
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                <Icon type="Filter" />
                <Text>Filtro de partido</Text>
              </button>
            )}
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
          <Line data={chartData} options={_mountOptions()} />
          <div
            ref={chartRef}
            className="w-[800px] h-[480px] fixed -top-[9999px] -left-[9999px] bg-white opacity-0 p-6"
          >
            <div className="relative w-full h-[400px]">
              <div
                className="absolute inset-0 flex items-center justify-center z-0"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  src="/img/LogoOrange.svg"
                  alt="Logo"
                  width={400}
                  height={208}
                  className="opacity-10"
                  style={{
                    maxWidth: '400px',
                    maxHeight: '208px',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="relative z-10 w-full h-full">
                <Line data={chartData} options={_mountOptions()} />
              </div>
            </div>
            <div className="text-sm text-gray-600 text-center mt-4 pt-2">
              Fonte: Portal da Classe Política - INCT ReDem (2025)
            </div>
          </div>
        </div>
        {graphData?.extraData && (
          <div className="flex flex-col items-center justify-center mt-5 md:flex-row md:gap-2">
            <span className="text-orange font-semibold whitespace-nowrap">Eixo Y:</span>
            <Text size="B2">{graphData.extraData.yAxisLabel}</Text>
            <span className="invisible md:visible">|</span>
            <span className="text-orange font-semibold whitespace-nowrap">Eixo X:</span>
            <Text size="B2">{graphData.extraData.xAxisLabel}</Text>
          </div>
        )}
        {graphData?.indicator_detail?.party_indicator && (
          <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApplyFilters={handleApplyFilters}
            series={graphData.series}
            filteredSeries={filteredSeries}
          />
        )}
      </div>
    )
  );
};

export default LineChart;
