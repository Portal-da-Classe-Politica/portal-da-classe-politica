'use client';

import { ButtonStyled, Loader, Text } from '@base';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { Constants } from '@constants';
import { useObjReducer } from '@hooks/useObjReducer';
import { consultSearchParam } from '@routes';
import { useCallback, useState } from 'react';
import { FilterSelect } from './FilterSelect';

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
  console.log('filters carai', filters);
  const [values, setValues] = useObjReducer({
    initialYear: (filters?.years && filters?.years[0]) ?? 2020,
    finalYear: (filters?.years && filters?.years[filters.years.length - 1]) ?? 2024,
    indicator: (filters?.indicators && filters?.indicators[0]?.value) ?? '',
    job: '',
    uf: '',
    electoralUnit: '',
  });

  const [errors, setErrors] = useObjReducer({
    indicator: '',
    job: '',
    uf: '',
    electoralUnit: '',
  });

  const [electoralUnits, setElectoralUnits] = useState([]);
  const [loadingElectoralUnits, setLoadingElectoralUnits] = useState(false);

  const loadElectoralUnits = useCallback((ufId: string) => {
    setLoadingElectoralUnits(true);
    fetch(`/api/electoralUnit?abrangecyId=${Constants.abrangency.municipal}&uf=${ufId}`)
      .then(res => res.json())
      .then(data => {
        setElectoralUnits(data);
      })
      .catch(error => console.info(error))
      .finally(() => setLoadingElectoralUnits(false));
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

    if (getSelectedJob()?.filterByCity) {
      loadElectoralUnits(uf.code);
    }
  };

  const onElectoralUnitChange = (value: any) => {
    setValues({ electoralUnit: value });
  };

  // :: Form Validation and Submit
  const validateForm = () => {
    const errors = { indicator: '', job: '', uf: '', electoralUnit: '' };

    if (!values.indicator) {
      errors.indicator = 'Selecione um indicador';
    }

    if (!values.job) {
      errors.job = 'Selecione um cargo';
    }

    if ((getSelectedJob()?.filterByUf || getSelectedJob()?.filterByCity) && !values.uf) {
      errors.uf = 'Selecione um estado';
    }

    if (getSelectedJob()?.filterByCity && !values.electoralUnit) {
      errors.electoralUnit = 'Selecione uma cidade';
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

  return (
    <div className="text-white w-full min-h-[220px]">
      <Text>{description}</Text>
      <Text>{category}</Text>
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

            {(getSelectedJob()?.filterByUf || getSelectedJob()?.filterByCity) && (
              <div className="inline md:w-[40%] min-w-[50px]">
                <FilterSelect
                  options={filters.ufs}
                  defaultValue={values.uf}
                  placeholder="Selecione um estado"
                  label="Estado"
                  onSelect={onUfChange}
                  error={errors.uf}
                />
              </div>
            )}

            {getSelectedJob()?.filterByCity &&
              (loadingElectoralUnits ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <div className="inline md:w-[40%] min-w-[50px]">
                  <FilterSelect
                    options={electoralUnits}
                    defaultValue={values.electoralUnit}
                    placeholder="Selecione um cidade"
                    label="Cidade"
                    onSelect={onElectoralUnitChange}
                    error={errors.electoralUnit}
                  />
                </div>
              ))}
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
      fetchFilter: '/api/indicators/electoral',
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
            <div className="flex flex-1 min-h-[220px] justify-center items-center">
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
