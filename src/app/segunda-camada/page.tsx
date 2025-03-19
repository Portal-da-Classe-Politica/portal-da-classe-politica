'use client';

import { useCallback, useEffect, useState } from 'react';

import { Container, Heading, Icon, Loader, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';

import { SecondLayerFilter } from './components/SecondLayerFilter';
import { ConsultResultDisplay } from '@components/consult/ConsultResultDisplay';
import { useObjReducer } from '@hooks/useObjReducer';

type filterObjectType = {
  years: number[];
  ufs: string[];
};

const Page = () => {
  const [staticFilter, setStaticFilter] = useState<filterObjectType>({
    years: [],
    ufs: [],
  });
  const [loadingStaticFilters, setLoadingStaticFilters] = useState(true);

  const [indicatorFilters, setIndicatorFilters] = useState({ indicators: [], jobs: [] });
  const [loadingIndicatorFilters, setLoadingIndicatorFilters] = useState(true);

  const [result, setResult] = useObjReducer({ loading: false, data: null, error: null });

  const loadStaticFilters = useCallback(async () => {
    setLoadingStaticFilters(true);

    const data = await fetch(`/api/indicators/static-filters`).then(res => res.json());
    setStaticFilter({ years: data.years, ufs: data.ufs });

    setLoadingStaticFilters(false);
  }, []);

  useEffect(() => {
    loadStaticFilters();
    fetch(`/api/indicators/electoral`)
      .then(res => res.json())
      .then(data => {
        setIndicatorFilters(data);
      })
      .finally(() => setLoadingIndicatorFilters(false));
  }, [loadStaticFilters]);

  const onTabChange = (tab: any) => {
    setLoadingIndicatorFilters(true);
    fetch(tab.fetchFilter)
      .then(res => res.json())
      .then(data => {
        setIndicatorFilters(data);
      })
      .finally(() => setLoadingIndicatorFilters(false));
  };

  const onConsult = (consultFilters: any) => {
    if (result.loading) {
      return;
    }

    const params = new URLSearchParams();
    params.append('initialYear', consultFilters.initialYear);
    params.append('finalYear', consultFilters.finalYear);
    params.append('cargoId', consultFilters.job);
    params.append('electoralUnit', consultFilters.electoralUnit);
    params.append('uf', consultFilters.uf);

    setResult({ loading: true, data: null });
    console.log('chama carai');
    const url = `/api/indicators/${consultFilters.indicator}?${params.toString()}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.debug('Resultados', data);
        setResult({ loading: false, data: data.result, error: null });
      })
      .catch(error => {
        console.error('Error', error);
        setResult({ loading: false, data: null, error });
      });
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
          <SecondLayerFilter
            loading={loadingStaticFilters || loadingIndicatorFilters}
            years={staticFilter.years}
            ufs={staticFilter?.ufs}
            indicators={indicatorFilters.indicators}
            jobs={indicatorFilters.jobs}
            onConsult={onConsult}
            onTabChange={value => onTabChange(value)}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
        <Container className="pt-16">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full ">
              {result.loading ? (
                <div className="flex flex-1 justify-center items-center">
                  <Loader variant="Sync" color="#EB582F" />
                </div>
              ) : result.data ? (
                <ConsultResultDisplay result={result.data} />
              ) : result.error ? (
                <div className="flex flex-1 justify-center items-center drop-shadow-lg rounded-lg bg-white py-5 px-7 rounded-[10px]">
                  <Icon type="Error" size="2x" className="text-orange mr-4" />
                  <Text>
                    Infelizmente esse indicador não está disponível no momento. Por favor, escolha outros
                    filtros.
                  </Text>
                </div>
              ) : (
                <></>
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
