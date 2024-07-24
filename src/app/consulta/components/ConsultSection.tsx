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
import { useEffect, useState } from 'react';
// import CompleteSelect from '@base/forms/CompleteSelect';
// import { useState } from 'react';

export type selectObject = { title: string; type: string; values: { value: number; label: string }[] };

type selectObjectWithoutTitle = { type: string; values: { value: number; label: string }[] };

type filterObjectType = {
  anos: {
    type: string;
    values: number[];
  };
  dimensions: selectObjectWithoutTitle;
  sideFilters: {
    cargosIds: selectObject;
    categoriasOcupacoes: selectObject;
    genero: selectObject;
    isElected: selectObject;
    partidos: selectObject;
    unidadesEleitoraisIds: selectObject;
  };
};

const emptyFilter: filterObjectType = {
  anos: {
    type: '',
    values: [],
  },
  dimensions: {
    type: '',
    values: [],
  },
  sideFilters: {
    cargosIds: {
      title: '',
      type: '',
      values: [],
    },
    categoriasOcupacoes: {
      title: '',
      type: '',
      values: [],
    },
    genero: {
      title: '',
      type: '',
      values: [],
    },
    isElected: {
      title: '',
      type: '',
      values: [],
    },
    partidos: {
      title: '',
      type: '',
      values: [],
    },
    unidadesEleitoraisIds: {
      title: '',
      type: '',
      values: [],
    },
  },
};

export const ConsultSection = ({ initialConsult }: { initialConsult: string }) => {
  const onConsult = (values: any) => {
    console.debug(values);
  };

  const [dataFilter, setDataFilter] = useState<filterObjectType>(emptyFilter);

  useEffect(() => {
    fetch(`/api/consult`)
      .then(res => res.json())
      .then(data => {
        setDataFilter(data);
      });
  }, []);

  useEffect(() => {
    console.log('dados aqui', dataFilter);
  }, [dataFilter]);
  // const options = [
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   // Add more options as needed
  // ];
  // const [selectedOption, setSelectedOption] = useState<any>({value: '', label: ''});

  return (
    <section className="bg-grayMix1">
      <Container className="pt-16">
        <ConsultFilterBox
          initialConsult={initialConsult}
          years={dataFilter.anos}
          onConsult={onConsult}
          dimensions={dataFilter?.dimensions}
        />
      </Container>
      {/* <Container>
        <CompleteSelect
          placeholder="Teste"
          selectedOption={selectedOption}
          options={options}
          onSelect={value => setSelectedOption(value)}
        />
      </Container> */}
      <Container className="pt-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[25%]">
            <FilterSidebar sideFilters={dataFilter.sideFilters} />
          </div>
          <div className="w-full md:w-[75%]">
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
              categories={['Candidato A', 'Candidato B', 'Candidato C', 'Candidato D']}
              series={[{ name: 'votos', data: [900, 1000, 500, 700] }]}
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
          </div>
        </div>
      </Container>
    </section>
  );
};
