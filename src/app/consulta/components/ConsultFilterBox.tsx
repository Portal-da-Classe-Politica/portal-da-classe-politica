'use client';

import { ButtonStyled, Icon, Loader, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { consultSearchParam } from '@routes';
import { Filter } from '../../types';

interface FilterProps {
  loading: boolean;
  onConsult: (_filters: any) => void;
  filtersData: FiltersData;
  handleFilterChange: (_a: any, _b: any) => void;
  selectedOption: any;
  allCargo: any;
  errors: any;
}

interface FiltersData {
  years: {
    type: string;
    values: number[];
  };
  dimensions: Filter;
}

const showDimension = (dimensionId: any, filtersData: FiltersData) => {
  return filtersData?.dimensions?.values?.find(op => op.value === dimensionId)?.label ?? '';
};

const FilterCandidateProfile = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  allCargo,
  errors,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription={
        selectedOption.dimension ? (
          <>
            O resultado do cruzamento entre{' '}
            <Text className="font-bold" textType="span">
              Perfil dos Candidatos & {showDimension(selectedOption.dimension, filtersData)}{' '}
            </Text>
            nos trás informações sobre.
          </>
        ) : (
          <></>
        )
      }
      category="Perfil dos Candidatos"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      allCargo={allCargo}
      errors={errors}
    />
  );
};

const FilterElectionResult = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  allCargo,
  errors,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Resultados das Eleições. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription={
        selectedOption.dimension ? (
          <>
            O resultado do cruzamento entre{' '}
            <Text className="font-bold" textType="span">
              Resultados das Eleições & {showDimension(selectedOption.dimension, filtersData)}
            </Text>{' '}
            nos trás informações sobre.
          </>
        ) : (
          <></>
        )
      }
      category="Resultados das Eleições"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      allCargo={allCargo}
      errors={errors}
    />
  );
};

const FilterFinancing = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
  loading,
  allCargo,
  errors,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Financiamento de Campanha. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription={
        selectedOption.dimension ? (
          <>
            O resultado do cruzamento entre{' '}
            <Text className="font-bold" textType="span">
              Financiamento de Campanha & {showDimension(selectedOption.dimension, filtersData)}
            </Text>
            nos trás informações sobre.
          </>
        ) : (
          <></>
        )
      }
      category="Financiamento de Campanha"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
      loading={loading}
      allCargo={allCargo}
      errors={errors}
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
  allCargo,
  errors,
}: {
  loading: boolean;
  description: string;
  longDescription: string | React.ReactNode;
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
  allCargo: any;
  errors: any;
}) => {
  return (
    <div className="text-white cursor-pointer">
      <Text>{description}</Text>
      <div className="flex flex-col xl:flex-row gap-8 my-8 justify-between items-center flex-wrap">
        <div className="flex flex-1 w-full basis-1/4">
          <ButtonStyled style="fillBlack" size="small" className="w-full">
            <Text className="font-normal border-white border-r-2 pr-2" textType="span">
              Categoria
            </Text>
            <Text className="font-bold ml-2" textType="span">
              {category}
            </Text>
          </ButtonStyled>
        </div>

        <div className="flex flex-1 flex-col lg:flex-row gap-8 w-full items-center basis-1/4 ">
          {loading ? (
            <div className="flex flex-1 justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {filtersData?.dimensions?.values && (
                <div className="!grow w-full">
                  <Select
                    options={filtersData.dimensions.values}
                    defaultValue={filtersData.dimensions.values[0].value}
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
                    onSelect={category => handleFilterChange('dimension', category)}
                  />
                  <Text>{errors?.dimension}</Text>
                </div>
              )}
              {filtersData?.years?.values && (
                <div className="grow lg:self-center w-full">
                  <DatePicker
                    optionsValue={filtersData.years.values}
                    onSelectEnd={end => {
                      return handleFilterChange('finalYear', end);
                    }}
                    onSelectStart={start => handleFilterChange('initialYear', start)}
                    startYearAPI={filtersData.years.values[filtersData.years.values.length - 3]}
                    endYearAPI={filtersData.years.values[filtersData.years.values.length - 1]}
                  />
                </div>
              )}
              <div className="flex flex-col w-full">
                <Select
                  options={allCargo?.values}
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
                  onSelect={category => handleFilterChange(allCargo.key, category)}
                />
                <Text>{errors?.cargosIds}</Text>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-1 w-full">
          <ButtonStyled
            style="fillBlack"
            className="w-full"
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
      </div>
      <Text>{longDescription}</Text>
    </div>
  );
};

export const ConsultFilterBox = ({
  initialConsult,
  onConsult,
  years,
  dimensions,
  handleFilterChange,
  selectedOption,
  loading = false,
  onTabChange = () => {},
  allCargo,
  errors,
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
  allCargo: any;
  errors: any;
}) => {
  const tabs = [
    {
      value: consultSearchParam.CandidateProfile,
      Comp: FilterCandidateProfile,
      title: 'Perfil dos',
      bold: 'Candidatos',
    },
    {
      value: consultSearchParam.ElectionResult,
      Comp: FilterElectionResult,
      title: 'Resultados das',
      bold: 'Eleições',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterFinancing,
      title: 'Financiamento de',
      bold: 'Campanha',
    },
  ];
  const initialTab = tabs.findIndex(t => t.value === initialConsult);

  return (
    <CarouselTabs
      initialTab={initialTab < 0 ? 0 : initialTab}
      tabs={tabs.map(({ title, bold }, idx) => (
        <div key={idx} className="flex">
          <Text className="text-nowrap mr-1">{title}</Text>
          <Text className="font-bold text-nowrap">{bold}</Text>
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
          allCargo={allCargo}
          errors={errors}
        />
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => onTabChange(tabs[idx].value)}
    />
  );
};
