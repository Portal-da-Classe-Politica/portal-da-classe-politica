'use client';

import { ButtonStyled, Icon, Loader, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { consultSearchParam } from '@routes';
import { Filter } from '../../types';
import { useState } from 'react';

interface FilterProps {
  loading: boolean;
  onConsult: (_filters: any) => void;
  filtersData: {
    years: {
      type: string;
      values: number[];
    };
    dimensions: Filter;
  };
  handleFilterChange: (_a: any, _b: any) => void;
  selectedOption: any;
  ufs: any;
}

const FilterCandidateProfile = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  ufs,
}: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a dinâmica das eleições e do sistema eleitoral."
      category="Perfil dos Candidatos"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      ufs={ufs}
    />
  );
};

const FilterElectionResult = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  ufs,
}: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as aspirações e estratégias de carreira dos candidatos."
      category="Resultados das Eleições"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      ufs={ufs}
    />
  );
};

const FilterVote = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  ufs,
}: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender a distribuição espacial dos votos e a competitividade regional."
      category="Financiamento de Campanha"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      ufs={ufs}
    />
  );
};

const FilterFinancing = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  ufs,
}: FilterProps) => {
  return (
    <FilterComponent
      description="São quatro instrumentos úteis para analisar e compreender as dinâmicas econômica e financeira das campanhas eleitorais."
      category="Financiamento de Campanha"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      ufs={ufs}
    />
  );
};

const FilterComponent = ({
  loading,
  description,
  longDescription,
  category,
  onConsult = () => {},
  filtersData,
  handleFilterChange,
  selectedOption,
  ufs,
}: {
  loading: boolean;
  description: string;
  longDescription?: string;
  category: string;
  onConsult: (_: any) => void;
  handleFilterChange: (_a: any, _b: any) => void;
  filtersData: {
    years: {
      type: string;
      values: number[];
    };
    dimensions: { type: string; values: { value: number; label: string }[] };
  };
  selectedOption: any;
  ufs: any;
}) => {
  const [cargo, setCargo] = useState<any>([]);

  const changeCargo = (dataSelected: any) => {
    const newCargo =
      findPosition(dataSelected)?.cargos?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) || [];
    setCargo(newCargo);
  };

  const findPosition = (dataSelected: any = ''): any => {
    return filtersData?.dimensions?.values?.find(
      data => data.value === (dataSelected || selectedOption.dimension),
    );
  };

  const verifyIfCanState = () => {
    const selected = findPosition()
      ?.cargos.find((cargo: any) => cargo.id === selectedOption.position)
      ?.agregacao_regional.find((reg: any) => reg === 'UF')
      ? true
      : false;
    return selected;
  };

  return (
    <div className="text-white w-full">
      <Text>{description}</Text>
      <>{console.log(category)}</>
      <div className="flex flex-col xl:flex-row gap-8 mt-8 justify-between">
        <div className="flex flex-col md:flex-row gap-8 flex-wrap">
          {loading ? (
            <div className="flex flex-1">
              <Loader />
            </div>
          ) : (
            <>
              {filtersData?.dimensions?.values && (
                <div className="grow">
                  <Select
                    options={filtersData.dimensions.values}
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
                          Categoria
                        </Text>
                      </>
                    }
                    suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                    onSelect={category => {
                      handleFilterChange('dimension', category);
                      changeCargo(category);
                    }}
                  />
                </div>
              )}
              <>{console.log('selected data', selectedOption)}</>
              <>{console.log('ufs', ufs)}</>
              <>
                {console.log(
                  'selected data2',
                  filtersData?.dimensions?.values.find(data => data.value === selectedOption.dimension),
                )}
              </>
              <>{console.log('selected data3', filtersData?.dimensions?.values)}</>

              {findPosition() && (
                <div className="grow">
                  <Select
                    options={cargo}
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
                          Categoria
                        </Text>
                      </>
                    }
                    suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                    onSelect={category => handleFilterChange('position', category)}
                  />
                </div>
              )}
              {verifyIfCanState() && (
                <Select
                  options={ufs}
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
                  onSelect={category => handleFilterChange('ufs', category)}
                />
              )}
              {filtersData?.years?.values && (
                <div className="grow md:self-center">
                  <DatePicker
                    onSelectEnd={end => {
                      return handleFilterChange('finalYear', end);
                    }}
                    optionsValue={filtersData.years.values}
                    onSelectStart={start => handleFilterChange('initialYear', start)}
                    startYearAPI={filtersData.years.values[filtersData.years.values.length - 2]}
                    endYearAPI={filtersData.years.values[filtersData.years.values.length - 1]}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <ButtonStyled
          style="fillBlack"
          size="small"
          onClick={() =>
            onConsult({
              initialYear: selectedOption.initialYear,
              finalYear: selectedOption.finalYear,
              dimension: selectedOption.dimension,
            })
          }
        >
          <Text>Gerar Cruzamento</Text>
        </ButtonStyled>
      </div>

      <Text>{longDescription}</Text>
    </div>
  );
};

export const AllCharts = ({
  initialConsult,
  onConsult,
  years,
  dimensions,
  handleFilterChange,
  selectedOption,
  loading = false,
  onTabChange = () => {},
  ufs,
}: {
  initialConsult?: string;
  // eslint-disable-next-line no-unused-vars
  onConsult: (filters: any) => void;
  years: {
    type: string;
    values: number[];
  };
  dimensions: Filter;
  handleFilterChange: (_a: any, _b: any) => void;
  selectedOption: any;
  loading: boolean;
  onTabChange?: (_tab: string) => void;
  ufs: any;
}) => {
  const tabs = [
    {
      value: consultSearchParam.CandidateProfile,
      Comp: FilterCandidateProfile,
      title: 'Eleitorais & Partidários',
    },
    {
      value: consultSearchParam.ElectionResult,
      Comp: FilterElectionResult,
      title: 'Carreira & Representação Política',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterVote,
      title: 'Espacial de Votos',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterFinancing,
      title: 'Econômicos & Financeiros',
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
          onConsult={values => onConsult({ ...values, filter: value })}
          filtersData={{ years, dimensions: dimensions }}
          handleFilterChange={handleFilterChange}
          selectedOption={selectedOption}
          ufs={ufs}
        />
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => onTabChange(tabs[idx].value)}
    />
  );
};
