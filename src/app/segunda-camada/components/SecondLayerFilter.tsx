'use client';

import { ButtonStyled, Icon, Loader, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { consultSearchParam } from '@routes';
import { useState } from 'react';

interface FilterProps {
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

const FilterCandidateProfile = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a dinâmica das eleições e do sistema eleitoral."
      category="Perfil dos Candidatos"
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterElectionResult = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as aspirações e estratégias de carreira dos candidatos."
      category="Resultados das Eleições"
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterVote = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a distribuição espacial dos votos e a competitividade regional."
      category="Financiamento de Campanha"
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterFinancing = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as dinâmicas econômica e financeira das campanhas eleitorais."
      category="Financiamento de Campanha"
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterComponent = ({
  description,
  longDescription = '',
  category = '',
  onConsult,
  filters,
}: {
  description: string;
  longDescription?: string;
  category?: string;
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
    setJob(v);
    setUf('');
  };

  const onUfChange = (v: any) => {
    setUf(v);
  };

  const onSubmit = () => {
    onConsult({ indicator, job, uf, finalYear, initialYear });
  };

  const getSelectedJob = () => {
    return filters.jobs[indicator]?.find(j => j.value === job);
  };

  console.log({ indicator, job, uf, finalYear, initialYear });
  return (
    <div className="text-white w-full min-h-[220px]">
      <Text>{description}</Text>
      <Text>{category}</Text>
      <div className="flex gap-4 mt-8 justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex gap-4">
            <Select
              options={filters.indicators}
              defaultValue={indicator}
              placeholder="Sem cruzamento"
              className="inline grow"
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

            <DatePicker
              optionsValue={filters.years}
              onSelectStart={start => setInitialYear(Number(start))}
              onSelectEnd={end => setFinalYear(Number(end))}
              startYearAPI={initialYear}
              endYearAPI={finalYear}
            />
          </div>

          <div className="flex gap-4">
            {indicator && filters.jobs[indicator] && (
              <Select
                options={filters.jobs[indicator]}
                defaultValue={job}
                placeholder="Sem cargo"
                className="inline w-[40%] min-w-[50px]"
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
            )}

            {(getSelectedJob()?.filterByUf || getSelectedJob()?.filterByCity) && (
              <Select
                options={filters.ufs}
                defaultValue={uf}
                placeholder="Selecione estado"
                className="inline w-[40%] min-w-[50px]"
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
            )}
          </div>

          <ButtonStyled style="fillBlack" size="small" onClick={onSubmit}>
            <Text>Gerar Cruzamento</Text>
          </ButtonStyled>
        </div>
      </div>

      <Text>{longDescription}</Text>
    </div>
  );
};

export const SecondLayerFilter = ({
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
        <div key={value} className="text-white w-full">
          {loading ? (
            <div className="flex flex-1 min-h-[220px]">
              <Loader />
            </div>
          ) : (
            <Comp onConsult={onConsult} filters={{ years, indicators, jobs, ufs }} />
          )}
        </div>
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => onTabChange(tabs[idx])}
    />
  );
};
