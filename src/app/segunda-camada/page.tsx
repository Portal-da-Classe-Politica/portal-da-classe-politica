'use client';

import { Container, Heading, Loader, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { SecondLayerChart } from '@components/charts/SecondLayerChart';
import DesignSemiCircle from '@components/DesignSemiCircle';
import { AllCharts } from './components/AllCharts';
import { useCallback, useEffect, useState } from 'react';
import { consultSearchParam } from '@routes';
import { Filter } from '../types';

const dataSeries = {
  electoral: {
    initial: true,
    name: 'Número Efetivo de Partidos Eleitoral',
    data: [400, 500, 800, 200, 300, 600, 700],
    color: '#FF5733', // Warm Orange
  },
  parliamentary: {
    initial: true,
    name: 'Número Efetivo de Partidos Parlamentar',
    data: [200, 400, 600, 300, 500, 700, 800],
    color: '#33FF57', // Vibrant Green
  },
  series1: {
    name: 'Índice de Fracionalização de RAE',
    data: [100, 200, 300, 400, 500, 600, 700],
    color: '#3357FF', // Bright Blue
  },
  series2: {
    name: 'Número de Partidos',
    data: [150, 250, 350, 450, 550, 650, 750],
    color: '#FF33A1', // Hot Pink
  },
  series3: {
    name: 'Variação Eleitoral Média dos Partidos',
    data: [200, 300, 400, 500, 600, 700, 800],
    color: '#FF9633', // Soft Orange
  },
  series4: {
    name: 'Índice de Volatilidade Eleitoral (Pedersen)',
    data: [250, 350, 450, 550, 650, 750, 850],
    color: '#33FFF3', // Aqua
  },
  series5: {
    name: 'Maioria Parlamentar Mínima (RAE)',
    data: [300, 400, 500, 600, 700, 800, 900],
    color: '#C733FF', // Purple
  },
  series6: {
    name: 'Índice de Laakso e Taagepera',
    data: [350, 450, 550, 650, 750, 850, 950],
    color: '#FFD133', // Golden Yellow
  },
  series7: {
    name: 'Quociente Eleitoral',
    data: [100, 450, 350, 500, 600, 750, 650],
    color: '#33A1FF', // Sky Blue
  },
  series8: {
    name: 'Quociente Partidário',
    data: [250, 700, 300, 850, 450, 600, 400],
    color: '#FF5733', // Coral
  },
} as Record<string, any>;

type filterObjectType = {
  years: {
    type: string;
    values: number[];
  };
  dimensions: Filter;
  sideFilters: Filter[];
};

const emptyFilter: filterObjectType = {
  years: {
    type: '',
    values: [],
  },
  dimensions: {
    type: '',
    title: '',
    key: '',
    values: [],
  },
  sideFilters: [],
};

const Page = () => {
  const [dataFilter, setDataFilter] = useState<filterObjectType>(emptyFilter);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [loadingSideFilters, setLoadingSideFilters] = useState(true);
  const [consultType, setConsultType] = useState(
    consultSearchParam['ElectionResult' as keyof typeof consultSearchParam] ||
      consultSearchParam.CandidateProfile,
  );

  // const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const loadFilters = useCallback(() => {
    setLoadingSideFilters(true);

    fetch(`/api/consult/filters`)
      .then(res => res.json())
      .then(data => {
        setDataFilter(data);
        setLoadingSideFilters(false);
      });
  }, []);

  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  const handleFilterChange = (filterName: any, value: any) => {
    console.log('allala', filterName, value);
    setSelectedOptions((prevFilters: any) => {
      return {
        ...prevFilters,
        [filterName]: value,
      };
    });
  };

  const onTabChange = (value: string) => {
    setConsultType(value);
  };

  const getAllUfs = () => {
    const allUfs = dataFilter.sideFilters.find(filter => filter.title === 'Estado')?.values;
    return allUfs;
  };

  const sendConsult = () => {
    if (loadingResults) {
      return;
    }
    fetch('/api/partidario')
      .then(res => res.json())
      .then(resp => {
        let modifiedvalue: any = resp.data.indicators.map((indicator: any) => ({
          label: indicator.nome,
          value: indicator.id,
          cargos: indicator.cargos,
        }));

        setDataFilter({
          ...dataFilter,
          dimensions: { key: 'partidarios', title: 'partidarios', type: 'select', values: modifiedvalue },
        });
        console.log('vai dar boa', resp);
        console.log('vai dar boa2', dataFilter);

        console.log('respo', modifiedvalue);
      });

    setLoadingResults(true);

    const search = Object.entries(selectedOptions).reduce((r, [key, value]: [string, any]) => {
      const _value = Array.isArray(value) ? value.map(v => v.value).join(',') : value;
      const param = typeof _value === 'object' ? _value.value : _value;
      return `${r}&${key}=${param}`;
    }, `type=${consultType}`);

    fetch(`/api/consult?${search}`)
      .then(res => res.json())
      .then(data => {
        console.log('data consult', data);
        // setResults(data);
      })
      .finally(() => setLoadingResults(false));
  };
  return (
    <main className="font-montserrat">
      <section className="pb-12 pt-4 relative bg-orange overflow-hidden">
        <DesignSemiCircle />

        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              INDICADORES
            </Text>
            <Heading size="H1" className="text-white mt-4">
              Use os Indicadores para avaliar diferentes aspectos do cenário eleitoral ao longo do tempo.
            </Heading>
          </div>
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <AllCharts
            loading={loadingSideFilters}
            initialConsult={'ElectionResult'}
            years={dataFilter.years}
            onConsult={sendConsult}
            dimensions={dataFilter?.dimensions}
            handleFilterChange={handleFilterChange}
            selectedOption={selectedOptions}
            onTabChange={value => onTabChange(value)}
            ufs={getAllUfs()}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
        <Container className="pt-16">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full ">
              {loadingResults ? (
                <div className="flex flex-1 justify-center items-center">
                  <Loader variant="Sync" color="#EB582F" />
                </div>
              ) : (
                <SecondLayerChart
                  title="Eleitorais & Partidários"
                  description="São quatro instrumentos úteis para analisar e compreender a dinâmica das eleições e do sistema eleitoral."
                  seriesTitle="Adicione indicadores ao gráfico:"
                  seriesDescription="Os indicadores podem ser visualizados simultaneamente."
                  chartTitle="Dimensão eleitoral"
                  series={dataSeries}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
