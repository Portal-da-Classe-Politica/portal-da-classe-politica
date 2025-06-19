'use client';

import { useCallback, useEffect, useState } from 'react';

import { Container, Heading, Icon, Loader, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';

import { useObjReducer } from '@hooks/useObjReducer';

import {
  SecondLayerFilter,
  SecondLayerSearchValues,
  SecondLayerStaticFilters,
} from './components/SecondLayerFilter';
import LineChart from 'app/cruzamentos/components/LineChart';
import { GraphDataResponse } from '@services/consult/getGraph';
import Collapse from '@base/Collapse';

const Page = () => {
  const [staticFilters, setStaticFilters] = useState<SecondLayerStaticFilters>({
    years: [],
    ufs: [],
    ufVotes: [],
    parties: [],
  });
  const [loadingStaticFilters, setLoadingStaticFilters] = useState(true);

  const [indicatorFilters, setIndicatorFilters] = useState({ indicators: [], jobs: [] });
  const [loadingIndicatorFilters, setLoadingIndicatorFilters] = useState(true);
  const [strParams, setStrParams] = useState('');
  const [indicators, setIndicators] = useState('');
  const [textCsv, setTextCsv] = useState('');

  const [result, setResult] = useObjReducer<{
    loading: boolean;
    data: GraphDataResponse | null;
    error: any | null;
  }>({ loading: false, data: null, error: null });

  const loadStaticFilters = useCallback(async () => {
    setLoadingStaticFilters(true);

    const data = await fetch(`/api/indicators/static-filters`).then(res => res.json());
    setStaticFilters(data);

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

  const onConsult = (consultFilters: SecondLayerSearchValues) => {
    if (result.loading) {
      return;
    }

    const params = new URLSearchParams();
    params.append('initialYear', consultFilters.initialYear);
    params.append('finalYear', consultFilters.finalYear);
    params.append('cargoId', consultFilters.job);
    params.append('electoralUnit', consultFilters.electoralUnit);
    params.append('uf', consultFilters.uf);
    params.append('partyId', consultFilters.partyId);

    setStrParams(params.toString());

    setResult({ loading: true, data: null });

    setIndicators(consultFilters.indicator);

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

  const getCsvFile = () => {
    const url = `/api/indicators/csv/${indicators}?${strParams}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('CSV Data', data);
        const textCsv = data as string;
        setTextCsv(textCsv);
      })
      .catch(error => {
        console.error('Error', error);
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
            staticFilters={staticFilters}
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
                <div className="rounded-lg bg-white shadow-lg border size-max w-full p-[5px] md:p-[30px] size-max w-full">
                  <LineChart graphData={result.data.data} onGetCsvFile={getCsvFile} textCsv={textCsv} />
                  <div className="flex flex-1 flex-col mt-8">
                    {result.data.details.map(({ title, text }) => (
                      <Collapse key={title} title={title} className="mt-4">
                        {text}
                      </Collapse>
                    ))}
                  </div>
                </div>
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
