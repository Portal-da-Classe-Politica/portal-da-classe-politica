'use client';

import { Container, Heading, Loader, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import DesignSemiCircle from '@components/DesignSemiCircle';
import { SecondLayerFilter } from './components/SecondLayerFilter';
import { useCallback, useEffect, useState } from 'react';
import { LineChartCard } from '@components/charts/LineChartCard';

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

  const [loadingResults, setLoadingResults] = useState(false);
  const [result, setResult] = useState<any>(null);

  const loadStaticFilters = useCallback(async () => {
    setLoadingStaticFilters(true);

    const data = await fetch(`/api/indicators/static-filters`).then(res => res.json());
    setStaticFilter({ years: data.years, ufs: data.ufs });

    setLoadingStaticFilters(false);
  }, []);

  useEffect(() => {
    loadStaticFilters();
    fetch(`/api/indicators/party`)
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
    if (loadingResults) {
      return;
    }

    const params = new URLSearchParams();
    params.append('initialYear', consultFilters.initialYear);
    params.append('finalYear', consultFilters.finalYear);
    params.append('cargoId', consultFilters.job);
    params.append('electoralUnit', consultFilters.electoralUnit);
    params.append('uf', consultFilters.uf);

    setLoadingResults(true);
    fetch(`/api/indicators/${consultFilters.indicator}?${params.toString()}`)
      .then(res => res.json())
      .then(data => setResult(data.data))
      .catch(error => console.error('Failed to fetch indicators', error))
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
              {loadingResults ? (
                <div className="flex flex-1 justify-center items-center">
                  <Loader variant="Sync" color="#EB582F" />
                </div>
              ) : result ? (
                <LineChartCard
                  title={result.title}
                  yAxisTitle={result.extraData.yAxisLabel}
                  xAxisTitle={result.extraData.xAxisLabel}
                  categories={result.xAxis}
                  series={result.series}
                />
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
