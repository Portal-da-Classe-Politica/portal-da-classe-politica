'use client';

import { ButtonStyled, Icon, Loader, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { consultSearchParam } from '@routes';
import { useState } from 'react';

interface FilterProps {
  loading: boolean;
  onConsult: (_filters: any) => void;
  filters: SecondLayerFilters;
}

interface SecondLayerFilters {
  years: number[];
  ufs: { label: string; value: string }[];
  indicators: { label: string; value: string }[];
  jobs: Record<
    string,
    {
      label: string;
      value: string;
      filterByUf: string;
      filterByCity: string;
    }[]
  >;
}

const FilterCandidateProfile = ({ loading, onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a dinâmica das eleições e do sistema eleitoral."
      category="Perfil dos Candidatos"
      loading={loading}
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterElectionResult = ({ loading, onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as aspirações e estratégias de carreira dos candidatos."
      category="Resultados das Eleições"
      loading={loading}
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterVote = ({ loading, onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a distribuição espacial dos votos e a competitividade regional."
      category="Financiamento de Campanha"
      loading={loading}
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterFinancing = ({ loading, onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as dinâmicas econômica e financeira das campanhas eleitorais."
      category="Financiamento de Campanha"
      loading={loading}
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterComponent = ({
  description,
  longDescription = '',
  category = '',
  loading,
  onConsult,
  filters,
}: {
  description: string;
  longDescription?: string;
  category?: string;
  loading: boolean;
  onConsult: (_filters: any) => void;
  filters: SecondLayerFilters;
}) => {
  const [indicator, setIndicator] = useState(filters?.indicators[0]?.value ?? '');
  const [job, setJob] = useState('');
  const [uf, setUf] = useState('');

  const [initialYear, setInitialYear] = useState(filters.years[filters.years.length - 2] ?? 2020);
  const [finalYear, setFinalYear] = useState(filters.years[filters.years.length - 1] ?? 2024);

  const onIndicatorChange = (value: any) => {
    setIndicator(value);
    setJob('');
    setUf('');
  };

  const onJobChange = (v: any) => {
    console.log({ job: v });
    setJob(v);
    setUf('');
  };

  const onUfChange = (v: any) => {
    console.log({ uf: v });
    setUf(v);
  };

  const onSubmit = () => {
    onConsult({ indicator, job, uf, finalYear, initialYear });
  };

  return (
    <div className="text-white w-full">
      <Text>{description}</Text>
      <Text>{category}</Text>
      <div className="flex flex-col xl:flex-row gap-8 mt-8 justify-between">
        <div className="flex flex-col md:flex-row gap-8 flex-wrap">
          {loading ? (
            <div className="flex flex-1">
              <Loader />
            </div>
          ) : (
            <>
              <div className="grow">
                <Select
                  options={filters.indicators}
                  defaultValue={indicator}
                  placeholder="Sem cruzamento"
                  className="inline"
                  buttonProps={{ style: 'fillGray', className: 'px-2 w-full' }}
                  prefixComponent={
                    <>
                      <BoxIcon
                        icon="Table"
                        size={6}
                        iconSize="sm"
                        className="bg-white text-orange drop-shadow-md rounded-md mr-2"
                      />
                      <Text className="font-normal border-black border-r-2 pr-2 mr-2" textType="span">
                        Indicador
                      </Text>
                    </>
                  }
                  suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                  onSelect={onIndicatorChange}
                />
              </div>

              {indicator && filters.jobs[indicator] && (
                <div className="grow">
                  <Select
                    options={filters.jobs[indicator]}
                    defaultValue={job}
                    placeholder="Sem cargo"
                    className="inline"
                    buttonProps={{ style: 'fillGray', className: 'px-2 w-full' }}
                    prefixComponent={
                      <>
                        <BoxIcon
                          icon="Table"
                          size={6}
                          iconSize="sm"
                          className="bg-white text-orange drop-shadow-md rounded-md mr-2"
                        />
                        <Text className="font-normal border-black border-r-2 pr-2 mr-2" textType="span">
                          Cargo
                        </Text>
                      </>
                    }
                    suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                    onSelect={onJobChange}
                  />
                </div>
              )}

              <Select
                options={filters.ufs}
                defaultValue={uf}
                placeholder="Selecione estado"
                className="inline"
                buttonProps={{ style: 'fillGray', className: 'px-2 w-full' }}
                prefixComponent={
                  <>
                    <BoxIcon
                      icon="Table"
                      size={6}
                      iconSize="sm"
                      className="bg-white text-orange drop-shadow-md rounded-md mr-2"
                    />
                    <Text className="font-normal border-black border-r-2 pr-2 mr-2" textType="span">
                      Estado
                    </Text>
                  </>
                }
                suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                onSelect={onUfChange}
              />

              <div className="grow md:self-center">
                <DatePicker
                  optionsValue={filters.years}
                  onSelectStart={start => setInitialYear(Number(start))}
                  onSelectEnd={end => setFinalYear(Number(end))}
                  startYearAPI={initialYear}
                  endYearAPI={finalYear}
                />
              </div>

              <ButtonStyled style="fillBlack" size="small" onClick={onSubmit}>
                <Text>Gerar Cruzamento</Text>
              </ButtonStyled>
            </>
          )}
        </div>
      </div>

      <Text>{longDescription}</Text>
    </div>
  );
};

export const AllCharts = ({
  initialConsult = 'Eleitorais & Partidários',
  years,
  ufs,
  indicators,
  jobs,
  onConsult = () => {},
  onTabChange = () => {},
  loading = false,
}: {
  initialConsult?: string;
  years: number[];
  ufs: any;
  indicators: any;
  jobs: any;
  onTabChange?: (_tab: any) => void;
  onConsult: (_filters: any) => void;
  loading: boolean;
}) => {
  const tabs = [
    {
      value: consultSearchParam.CandidateProfile,
      Comp: FilterCandidateProfile,
      title: 'Eleitorais & Partidários',
      fetchFilter: '/api/indicators/party',
    },
    {
      value: consultSearchParam.ElectionResult,
      Comp: FilterElectionResult,
      title: 'Carreira & Representação Política',
      fetchFilter: '/api/indicators/party',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterVote,
      title: 'Espacial de Votos',
      fetchFilter: '/api/indicators/party',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterFinancing,
      title: 'Econômicos & Financeiros',
      fetchFilter: '/api/indicators/finance',
    },
  ];
  const initialTab = tabs.findIndex(t => t.value === initialConsult);

  return (
    <CarouselTabs
      initialTab={initialTab < 0 ? 0 : initialTab}
      tabs={tabs.map(({ title }, idx) => (
        <div key={idx} className="flex">
          <Text className="text-nowrap mr-1">{title}</Text>
        </div>
      ))}
      contents={tabs.map(({ value, Comp }) => (
        <Comp
          key={value}
          loading={loading}
          onConsult={onConsult}
          filters={{ years, indicators, jobs, ufs }}
        />
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => onTabChange(tabs[idx])}
    />
  );
};
