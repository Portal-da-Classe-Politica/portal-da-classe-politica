import { BarChartCard } from '@components/charts/BarChartCard';
import { LineChartCard } from '@components/charts/LineChartCard';
import { DonutChartCard } from '@components/charts/DonutChartCard';

import { MapResultCard } from './MapResultCard';
import { KpiSection } from './KpiSection';
import { ResultCard } from './ResultCard';

export const ConsultResultDisplay = ({ className = '', result }: { className?: string; result: any }) => {
  if (!result?.success || !result.data) {
    return null;
  }

  const data = result.data;
  switch (data.type) {
    case 'kpi': {
      return <KpiSection data={result.data} />;
    }
    case 'map': {
      return (
        <ResultCard className={className} details={result.details}>
          <MapResultCard title={data.title} label={data.label} series={data.series} />
        </ResultCard>
      );
    }
    case 'line': {
      return (
        <ResultCard className={className} details={result.details}>
          <LineChartCard
            title={data.title}
            yAxisTitle={data?.extraData?.yAxisLabel}
            xAxisTitle={data?.extraData?.xAxisLabel}
            categories={data.xAxis}
            series={data.series}
          />
        </ResultCard>
      );
    }
    case 'bar': {
      return (
        <ResultCard className={`min-h-[300px] ${className}`} details={result.details}>
          <BarChartCard
            title={data.title}
            categories={data.series.map(({ name }: any) => name)}
            series={[
              {
                name: data.seriesName,
                data: data.series.map(({ value }: any) => Number(value ?? 0).toFixed(2)),
              },
            ]}
            metaData={data?.extraData?.bigNumbers}
          />
        </ResultCard>
      );
    }
    case 'donut': {
      return (
        <ResultCard className={className} details={result.details}>
          <DonutChartCard
            title={data.title}
            labels={data.series.map(({ name }: any) => name)}
            series={data.series.map(({ value }: any) => Number(value ?? 0).toFixed(2))}
            topics={data.extraData}
          />
        </ResultCard>
      );
    }
    default:
      return <></>;
  }
};
