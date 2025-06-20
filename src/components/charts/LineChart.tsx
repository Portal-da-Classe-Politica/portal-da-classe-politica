import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { GraphData, Serie } from '@services/consult/getGraph';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Icon } from '@base/Icon';
import { Text } from '@base/text';
import FilterModal from '@components/modals/FilterModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredSeries, setFilteredSeries] = useState<Serie[] | undefined>(undefined);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textCsv) {
      extractCsv(textCsv);
    }
  }, [textCsv]);

  useEffect(() => {
    const isBinary = graphData.series.length === 2;
    const isPartyIndicator = graphData.indicator_detail?.party_indicator;

    if (!filteredSeries && isPartyIndicator) {
      if (isPartyIndicator) {
        const sortedSeries = graphData.series
          .map(serie => ({
            ...serie,
            data: serie.data.map(value => parseFloat(value).toString()),
            total: serie.data.reduce((sum, value) => sum + parseFloat(value), 0),
          }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);
        setFilteredSeries(sortedSeries);
      } else {
        setFilteredSeries(graphData.series);
      }
    }

    if (!isPartyIndicator) {
      setFilteredSeries(graphData.series);
    }

    const data = {
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
    setChartData(data);
  }, [graphData, filteredSeries]);

  const handleApplyFilters = (newFilters: { selectedSeries: Serie[] }) => {
    setFilteredSeries(newFilters.selectedSeries);
  };

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
          <Line data={chartData} options={options as any} />
          <div ref={chartRef} className="w-[800px] h-[400px] fixed top-100 left-100 bg-white opacity-0">
            <Line data={chartData} options={options as any} />
          </div>
        </div>
        {graphData?.extraData && (
          <div className="flex gap-2 items-center justify-center mt-5">
            <Text size="B2">{graphData.extraData.yAxisLabel}</Text>|
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
