'use client';

import { Container } from '@base/Container';
import { ConsultFilterBox } from './ConsultFilterBox';
import FilterSidebar from './FilterSideBar';

import { useCallback, useEffect, useState } from 'react';
import { Filter } from '../../types';
import { consultDimensions, consultSearchParam } from '@routes';
import { ResultsSection } from './ResultsSection';
import { Loader } from '@base/Loader';

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

export const ConsultSection = ({ initialConsult }: { initialConsult: string }) => {
  const [dataFilter, setDataFilter] = useState<filterObjectType>(emptyFilter);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [loadingSideFilters, setLoadingSideFilters] = useState(true);
  const [consultType, setConsultType] = useState(
    consultSearchParam[initialConsult as keyof typeof consultSearchParam] ||
      consultSearchParam.CandidateProfile,
  );
  const [errors, setErrors] = useState<any>({ cargosIds: '', dimension: '' });

  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const loadFilters = useCallback((dimension: string) => {
    setLoadingSideFilters(true);

    fetch(`/api/consult/filters?dimension=${dimension}`)
      .then(res => res.json())
      .then(data => {
        setDataFilter(data);

        const firstDimension = data?.dimensions.values[0];
        setSelectedOptions({ dimension: firstDimension.value });

        setLoadingSideFilters(false);
      });
  }, []);

  useEffect(() => {
    loadFilters(consultDimensions.CandidateProfile);
  }, [loadFilters]);

  const handleFilterChange = (filterName: any, value: any) => {
    setSelectedOptions((prevFilters: any) => {
      return {
        ...prevFilters,
        [filterName]: value,
      };
    });
    setErrors({ cargosIds: '', dimension: '' });
  };

  const onTabChange = (consultType: string, dimension: string) => {
    setConsultType(consultType);
    loadFilters(dimension);
    setErrors({ cargosIds: '', dimension: '' });
  };

  const sendConsult = () => {
    if (loadingResults) {
      return;
    }

    setLoadingResults(true);

    const search = Object.entries(selectedOptions).reduce((r, [key, value]: [string, any]) => {
      const _value = Array.isArray(value) ? value.map(v => v.value).join(',') : value;
      const param = typeof _value === 'object' ? _value.value : _value;
      return `${r}&${key}=${param}`;
    }, `type=${consultType}`);

    fetch(`/api/consult?${search}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
      })
      .finally(() => setLoadingResults(false));
  };

  const validateForm = () => {
    const errors = { cargosIds: '', dimension: '' };

    if (!selectedOptions.cargosIds) {
      errors.cargosIds = 'Selecione o cargo';
    }

    if (!selectedOptions.dimension && typeof selectedOptions.dimension !== 'number') {
      errors.dimension = 'Selecione a categoria';
    }
    setErrors(errors);

    return errors;
  };

  const onSubmit = () => {
    const errors = validateForm();
    if (Object.values(errors).some(v => Boolean(v))) {
      return;
    }

    sendConsult();
  };

  return (
    <section className="bg-grayMix1">
      <Container className="pt-16">
        <ConsultFilterBox
          loading={loadingSideFilters}
          initialConsult={initialConsult}
          years={dataFilter.years}
          onConsult={onSubmit}
          dimensions={dataFilter?.dimensions}
          handleFilterChange={handleFilterChange}
          selectedOption={selectedOptions}
          onTabChange={onTabChange}
          allCargo={dataFilter.sideFilters.filter(filter => filter.title === 'Cargos')[0]}
          errors={errors}
        />
      </Container>
      <Container className="pt-16">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[25%]">
            <FilterSidebar
              loading={loadingSideFilters}
              sideFilters={dataFilter.sideFilters}
              onApplyFilter={sendConsult}
              selectedOptions={selectedOptions}
              handleFilterChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-col w-full md:w-[75%]">
            {loadingResults ? (
              <div className="flex flex-1 justify-center items-center">
                <Loader variant="Sync" color="#EB582F" />
              </div>
            ) : (
              <ResultsSection results={results} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
