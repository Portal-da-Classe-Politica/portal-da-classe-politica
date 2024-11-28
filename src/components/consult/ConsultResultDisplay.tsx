import { BarChartCard } from '@components/charts/BarChartCard';
import { LineChartCard } from '@components/charts/LineChartCard';
import { DonutChartCard } from '@components/charts/DonutChartCard';

import { MapResultCard } from './MapResultCard';
import { KpiSection } from './KpiSection';

export const ConsultResultDisplay = ({ className = '', result }: { className?: string; result: any }) => {
  if (!result?.success || !result.data) {
    return null;
  }

  if (result.type === 'kpi' || result.data.type === 'kpi') {
    return <KpiSection data={result.data} />;
  }

  const data = result.data;
  switch (data.type) {
    case 'map': {
      return (
        <MapResultCard className={className} title={data.title} label={data.label} series={data.series} />
      );
    }
    case 'line': {
      return (
        <LineChartCard
          className={className}
          title={data.title}
          yAxisTitle={data?.extraData?.yAxisLabel}
          xAxisTitle={data?.extraData?.xAxisLabel}
          categories={data.xAxis}
          series={data.series}
        />
      );
    }
    case 'bar': {
      return (
        <BarChartCard
          className={className}
          title={data.title}
          categories={data.series.map(({ name }: any) => name)}
          series={[
            {
              name: data.seriesName,
              data: data.series.map(({ value }: any) => value),
            },
          ]}
          metaData={data?.extraData?.bigNumbers}
        />
      );
    }
    case 'donut': {
      return (
        <DonutChartCard
          className={className}
          title={data.title}
          labels={data.series.map(({ name }: any) => name)}
          series={data.series.map(({ value }: any) => value)}
          topics={data.extraData}
        />
      );
    }
    default:
      return <></>;
  }
};
