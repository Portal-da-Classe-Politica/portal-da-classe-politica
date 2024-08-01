'use client';

import { Container } from '@base/Container';
import { ConsultFilterBox } from './ConsultFilterBox';
import FilterSidebar from './FilterSideBar';

import { useCallback, useEffect, useState } from 'react';
import { Filter } from '../../types';
import { consultSearchParam } from '@routes';
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
  const [consult, setConsult] = useState(
    consultSearchParam[initialConsult as keyof typeof consultSearchParam] ||
      consultSearchParam.CandidateProfile,
  );

  const [results, setResults] = useState([]);
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
    setSelectedOptions((prevFilters: any) => {
      return {
        ...prevFilters,
        [filterName]: value,
      };
    });
  };

  const onTabChange = (value: string) => {
    setConsult(value);
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
    }, `consulta=${consult}`);

    fetch(`/api/consult?${search}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .finally(() => setLoadingResults(false));
  };

  return (
    <section className="bg-grayMix1">
      <Container className="pt-16">
        <ConsultFilterBox
          loading={loadingSideFilters}
          initialConsult={initialConsult}
          years={dataFilter.years}
          onConsult={sendConsult}
          dimensions={dataFilter?.dimensions}
          handleFilterChange={handleFilterChange}
          selectedOption={selectedOptions}
          onTabChange={value => onTabChange(value)}
        />
      </Container>

      <Container className="pt-16">
        <div className="flex flex-col md:flex-row">
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
