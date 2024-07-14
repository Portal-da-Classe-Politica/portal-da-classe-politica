'use client';

import { Container } from '@base/Container';
import { ConsultFilterBox } from './ConsultFilterBox';
import { Text } from '@base/text';
import FilterSidebar from './FilterSideBar';
import { Heading } from '@base/Heading';
import { BarChartCard } from '@components/charts/BarChartCard';
import { ButtonStyled } from '@base/buttons';
import { Icon } from '@base/Icon';
import { LineChartCard } from '@components/charts/LineChartCard';
import { PieChartCard } from '@components/charts/PieChartCard';

export const ConsultSection = ({ initialConsult }: { initialConsult: string }) => {
  const onConsult = (values: any) => {
    console.log(values);
  };

  return (
    <section className="bg-grayMix1">
      <Container className="pt-16">
        <ConsultFilterBox initialConsult={initialConsult} onConsult={onConsult} />
      </Container>
      <Container className="pt-16">
        <div className="flex">
          <div className="w-[25%]">
            <FilterSidebar />
          </div>
          <div className="w-[75%]">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <Heading headingLevel={2} size="H1" className="font-bold">
                Sitamet massa lobortis celeris ue vulputate mollis
              </Heading>
              <div className="flex justify-between">
                <div className="flex gap-2 mt-4">
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
                <div className="flex gap-2 mt-4">
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

            <PieChartCard
              className="mt-12"
              title="Lobortis celeris vulputate"
              labels={['Team A', 'Team B', 'Team C', 'Team D', 'Team E']}
              series={[900, 1000, 500, 700]}
              topics={['consectetur adipis', 'ipsum sectetur adipis', 'ipsum sectetur adipis']}
            />

            <BarChartCard
              className="mt-12"
              title="Lobortis celeris vulputate"
              categories={['Ipsum dolorsit', 'Lorem adipis', 'Lorem adipis', 'Lorem adipis']}
              series={[{ name: 'Ipsum dolorsit', data: [900, 1000, 500, 700] }]}
              metaData={[
                { value: '+35%', label: 'consectetur adipis' },
                { value: '+17%', label: 'ipsum sectetur adipis' },
                { value: '+12%', label: 'ipsum sectetur adipis' },
              ]}
            />

            <LineChartCard
              className="mt-12"
              title="Lobortis celeris vulputate"
              yAxisTitle="Votos"
              xAxisTitle="Ano"
              categories={['2014', '2015', '2016', '2017', '2018', '2019', '2020']}
              series={[
                { name: 'Candidato 01', data: [530, 620, 710, 840, 930, 850, 800] },
                { name: 'Candidato 02', data: [320, 410, 560, 640, 860, 950, 1000] },
              ]}
            />

            <div className="flex gap-4 mt-4 md:mt-16 mb-8 md:mb-16">
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
          </div>
        </div>
      </Container>
    </section>
  );
};
