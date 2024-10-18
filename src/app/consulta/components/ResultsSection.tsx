import { Text } from '@base/text';
import { Heading } from '@base/Heading';
import { BarChartCard } from '@components/charts/BarChartCard';
import { ButtonStyled } from '@base/buttons';
import { Icon } from '@base/Icon';
import { LineChartCard } from '@components/charts/LineChartCard';
import { DonutChartCard } from '@components/charts/DonutChartCard';
import { MapResultCard } from './MapResultCard';

export const ResultsSection = ({ results }: { results: any[] }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-8">
        <Heading headingLevel={2} size="H1" className="font-bold">
          Sitamet massa lobortis celeris ue vulputate mollis
        </Heading>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <div>
              <Heading headingLevel={2} size="H2" className="font-bold text-orange">
                303%
              </Heading>
              <Heading headingLevel={2} size="H2" className="font-bold">
                vulputate ipsum
              </Heading>
            </div>
            <Text className="mx-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet{' '}
            </Text>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <div>
              <Heading headingLevel={2} size="H2" className="font-bold text-orange">
                +1042
              </Heading>
              <Heading headingLevel={2} size="H2" className="font-bold">
                vulputate ipsum
              </Heading>
            </div>
            <Text className="mx-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet{' '}
            </Text>
          </div>
        </div>
      </div>

      {results.map((result, idx) => {
        if (!result?.success || !result.data) {
          return null;
        }

        const data = result.data;
        switch (data.type) {
          case 'map': {
            return (
              <MapResultCard
                key={idx}
                className="mt-12"
                title={data.title}
                label={data.label}
                series={data.series}
              />
            );
          }
          case 'line': {
            return (
              <LineChartCard
                key={idx}
                className="mt-12"
                title={data.title}
                yAxisTitle={data.extraData.yAxisLabel}
                xAxisTitle={data.extraData.xAxisLabel}
                categories={data.xAxis}
                series={data.series}
              />
            );
          }
          case 'bar': {
            return (
              <BarChartCard
                key={idx}
                className="mt-12"
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
                key={idx}
                className="mt-12"
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
      })}

      <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-16 mb-8 md:mb-16">
        <ButtonStyled>
          <>
            <Icon type="Download" className="mx-2" size="xl" />
            Baixar Cruzamentos em .PDF
          </>
        </ButtonStyled>
        <ButtonStyled>
          <>
            <Icon type="Download" className="mx-2" size="xl" />
            Baixar Cruzamentos em .CSV
          </>
        </ButtonStyled>
      </div>
    </>
  );
};
