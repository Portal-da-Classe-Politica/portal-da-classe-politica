'use client';

import { ButtonStyled, Loader, Text } from '@base';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { Constants } from '@constants';
import { useObjReducer } from '@hooks/useObjReducer';
import { consultSearchParam } from '@routes';
import { useCallback, useState } from 'react';
import { FilterSelect } from './FilterSelect';

const presidentId = '9';
const ufVotesPresidentOnly = ['ZZ'];

interface FilterProps {
  onConsult: (_filters: any) => void;
  filters: SecondLayerFilters;
}

export interface SecondLayerStaticFilters {
  years: number[];
  ufs: { label: string; value: string }[];
  ufVotes: { value: string; label: string }[];
  parties: { value: string; label: string }[];
}

export interface SecondLayerSearchValues {
  initialYear: string;
  finalYear: string;
  indicator: string;
  job: string;
  uf: string;
  electoralUnit: string;
  partyId: string;
}

interface SecondLayerFilters {
  years: number[];
  ufs: { label: string; value: string }[];
  ufVotes: { value: string; label: string }[];
  parties: { value: string; label: string }[];
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
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterElectionResult = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as aspirações e estratégias de carreira dos candidatos."
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterVote = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a distribuição espacial dos votos e a competitividade regional."
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterFinancing = ({ onConsult, filters }: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as dinâmicas econômica e financeira das campanhas eleitorais."
      onConsult={onConsult}
      filters={filters}
    />
  );
};

const FilterComponent = ({
  description,
  longDescription = '',
  onConsult,
  filters,
}: {
  description: string;
  longDescription?: string;
  onConsult: (_filters: any) => void;
  filters: SecondLayerFilters;
  requiresUfVotes?: boolean;
}) => {
  const [values, setValues] = useObjReducer({
    initialYear: (filters?.years && filters?.years[0]) ?? 2020,
    finalYear: (filters?.years && filters?.years[filters.years.length - 1]) ?? 2024,
    indicator: (filters?.indicators && filters?.indicators[0]?.value) ?? '',
    job: '',
    uf: '',
    electoralUnit: '',
    partyId: '',
  });

  const [errors, setErrors] = useObjReducer({
    indicator: '',
    job: '',
    uf: '',
    electoralUnit: '',
    partyId: '',
  });

  const [electoralUnits, setElectoralUnits] = useState([]);
  const [loadingElectoralUnits, setLoadingElectoralUnits] = useState(false);

  // Distribuição de votos por regiao ou Índice de Concentração Regional do Voto
  const isDVR = ['9', '10'].includes(values.indicator);

  // Índice de Concentração Regional do Voto
  const isCVR = ['10'].includes(values.indicator);

  const loadElectoralUnits = useCallback((ufId: string) => {
    setLoadingElectoralUnits(true);

    if (isDVR) {
      fetch(`/api/indicators/static-filters/ufVotes/${ufId}`)
        .then(res => res.json())
        .then(data => {
          setElectoralUnits(data);
        })
        .catch(error => console.info(error))
        .finally(() => setLoadingElectoralUnits(false));
    } else {
      fetch(`/api/electoralUnit?abrangecyId=${Constants.abrangency.municipal}&uf=${ufId}`)
        .then(res => res.json())
        .then(data => {
          setElectoralUnits(data);
        })
        .catch(error => console.info(error))
        .finally(() => setLoadingElectoralUnits(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // :: Change Handlers
  const onIndicatorChange = (value: any) => {
    setValues({ indicator: value, job: '', uf: '', electoralUnit: '' });
  };

  const onJobChange = (value: any) => {
    setValues({ job: value, uf: '', electoralUnit: '' });
  };

  const onUfChange = (value: any, uf: any) => {
    setValues({ uf: value, electoralUnit: '' });

    if (
      (getSelectedJob()?.filterByCity && Number(value) !== Constants.brazil) ||
      (isDVR && value !== 'Brasil')
    ) {
      loadElectoralUnits(uf.code || uf.value);
    }
  };

  const onElectoralUnitChange = (value: any) => {
    setValues({ electoralUnit: value });
  };

  const onPartyChange = (value: any) => {
    setValues({ partyId: value });
  };

  // :: Form Validation and Submit
  const validateForm = () => {
    const errors = { indicator: '', job: '', uf: '', electoralUnit: '', partyId: '' };

    if (!values.indicator) {
      errors.indicator = 'Selecione um indicador';
    }

    if (!values.job) {
      errors.job = 'Selecione um cargo';
    }

    if ((getSelectedJob()?.filterByUf || getSelectedJob()?.filterByCity) && !values.uf) {
      errors.uf = 'Selecione um estado';
    }

    if (
      (isFilterByCityRequired() && !values.electoralUnit) ||
      (isDVR && !values.electoralUnit && values.uf !== 'Brasil')
    ) {
      errors.electoralUnit = 'Selecione uma cidade';
    }

    if (isCVR && !values.partyId) {
      errors.partyId = 'Selecione um Partido';
    }

    setErrors(errors);
    return errors;
  };

  const onSubmit = () => {
    const errors = validateForm();
    if (Object.values(errors).some(v => Boolean(v))) {
      return;
    }

    onConsult(values);
  };

  // :: Gets
  const getJob = (value: any) => {
    return filters.jobs[values.indicator]?.find(j => j.value === value);
  };

  const getSelectedJob = () => getJob(values.job);

  const isFilterByCityRequired = () => {
    return getSelectedJob()?.filterByCity && Number(values.uf) !== Constants.brazil;
  };

  return (
    <div className="text-white w-full min-h-[220px]">
      <Text>{description}</Text>
      <div className="flex gap-4 mt-8 justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex flex-1">
              <FilterSelect
                options={filters.indicators}
                defaultValue={values.indicator}
                placeholder="Sem cruzamento"
                className="inline grow"
                label="Indicador"
                onSelect={onIndicatorChange}
                error={errors.indicator}
              />
            </div>

            <DatePicker
              optionsValue={filters.years}
              onSelectStart={start => setValues({ initialYear: Number(start) })}
              onSelectEnd={end => setValues({ finalYear: Number(end) })}
              startYearAPI={values.initialYear}
              endYearAPI={values.finalYear}
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            {values.indicator && filters.jobs[values.indicator] && (
              <div className="inline md:w-[40%] min-w-[50px]">
                <FilterSelect
                  options={filters.jobs[values.indicator]}
                  defaultValue={values.job}
                  placeholder="Sem cargo"
                  label="Cargo"
                  onSelect={onJobChange}
                  error={errors.job}
                />
              </div>
            )}

            {isCVR && (
              <div className="inline md:w-[40%] min-w-[50px]">
                <FilterSelect
                  options={filters.parties}
                  defaultValue={values.partyId}
                  placeholder="Partido"
                  label="Partido"
                  onSelect={onPartyChange}
                  error={errors.partyId}
                  searchable
                />
              </div>
            )}

            {isDVR ? (
              <>
                {values.job && (
                  <div className="inline md:w-[40%] min-w-[50px]">
                    <FilterSelect
                      options={
                        String(values.job) !== presidentId
                          ? filters.ufVotes.filter(op => !ufVotesPresidentOnly.includes(op.value))
                          : filters.ufVotes
                      }
                      defaultValue={values.uf}
                      placeholder="Selecione um estado"
                      label="Estado"
                      onSelect={onUfChange}
                      error={errors.uf}
                      searchable
                    />
                  </div>
                )}

                {values.uf &&
                  values.uf !== 'Brasil' &&
                  (loadingElectoralUnits ? (
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  ) : (
                    <div className="inline md:w-[40%] min-w-[50px]">
                      <FilterSelect
                        options={electoralUnits}
                        defaultValue={values.electoralUnit}
                        placeholder="Selecione uma cidade"
                        label="Cidade"
                        onSelect={onElectoralUnitChange}
                        error={errors.electoralUnit}
                        searchable
                      />
                    </div>
                  ))}
              </>
            ) : (
              <>
                {(getSelectedJob()?.filterByUf || getSelectedJob()?.filterByCity) && (
                  <div className="inline md:w-[40%] min-w-[50px]">
                    <FilterSelect
                      options={filters.ufs}
                      defaultValue={values.uf}
                      placeholder="Selecione um estado"
                      label="Estado"
                      onSelect={onUfChange}
                      error={errors.uf}
                      searchable
                    />
                  </div>
                )}

                {values.uf &&
                  isFilterByCityRequired() &&
                  (loadingElectoralUnits ? (
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  ) : (
                    <div className="inline md:w-[40%] min-w-[50px]">
                      <FilterSelect
                        options={electoralUnits}
                        defaultValue={values.electoralUnit}
                        placeholder="Selecione uma cidade"
                        label="Cidade"
                        onSelect={onElectoralUnitChange}
                        error={errors.electoralUnit}
                        searchable
                      />
                    </div>
                  ))}
              </>
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
  initialConsult = 'Eleitorais Partidários',
  staticFilters,
  indicators,
  jobs,
  onConsult = () => {},
  onTabChange = () => {},
  loading = false,
}: {
  initialConsult?: string;
  staticFilters: SecondLayerStaticFilters;
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
      title: 'Eleitorais e Partidários',
      fetchFilter: '/api/indicators/electoral',
    },
    {
      value: consultSearchParam.ElectionResult,
      Comp: FilterElectionResult,
      title: 'Carreira e Representação Política',
      fetchFilter: '/api/indicators/party',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterVote,
      title: 'Espacial de Votos',
      fetchFilter: '/api/indicators/geographical',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterFinancing,
      title: 'Econômicos e Financeiros',
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
            <div className="flex flex-1 min-h-[220px] justify-center items-center">
              <Loader />
            </div>
          ) : (
            <Comp
              onConsult={onConsult}
              filters={{
                years: staticFilters.years,
                indicators,
                jobs,
                ufs: staticFilters.ufs,
                ufVotes: staticFilters.ufVotes,
                parties: staticFilters.parties,
              }}
            />
          )}
        </div>
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => onTabChange(tabs[idx])}
    />
  );
};
