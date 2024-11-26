'use client';

import { ButtonStyled, Icon, Loader, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { consultDimensions, consultSearchParam } from '@routes';
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
        showDimension(selectedOption.dimension, filtersData) ? (
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
        showDimension(selectedOption.dimension, filtersData) ? (
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
    <div className="flex flex-1 flex-col text-white cursor-pointer min-h-[160px]">
      <Text>{description}</Text>
      <div className="flex flex-col xl:flex-row gap-4 mt-4 justify-between items-center flex-wrap">
        <div className="flex">
          <ButtonStyled style="fillBlack" className="w-full px-2">
            <Text className="font-normal border-white border-r-2 pr-2" textType="span">
              Categoria
            </Text>
            <Text className="font-bold ml-2 text-sm" textType="span">
              {category}
            </Text>
          </ButtonStyled>
        </div>

        <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full items-center">
          {loading ? (
            <div className="flex flex-1 w-full justify-center">
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
      </div>

      <div className="flex flex-1 w-full mt-4">
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

      <div className="flex flex-1 w-full mt-4">
        <Text>{longDescription}</Text>
      </div>
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
  onTabChange?: (_consultType: string, _dimension: string) => void;
  allCargo: any;
  errors: any;
}) => {
  const tabs = [
    {
      consultType: consultSearchParam.CandidateProfile,
      dimension: consultDimensions.CandidateProfile,
      Comp: FilterCandidateProfile,
      title: 'Perfil dos',
      bold: 'Candidatos',
    },
    {
      consultType: consultSearchParam.ElectionResult,
      dimension: consultDimensions.ElectionResult,
      Comp: FilterElectionResult,
      title: 'Resultados das',
      bold: 'Eleições',
    },
    {
      consultType: consultSearchParam.Financing,
      dimension: consultDimensions.Financing,
      Comp: FilterFinancing,
      title: 'Financiamento de',
      bold: 'Campanha',
    },
  ];
  const initialTab = tabs.findIndex(t => t.consultType === initialConsult);

  return (
    <CarouselTabs
      initialTab={initialTab < 0 ? 0 : initialTab}
      tabs={tabs.map(({ title, bold }, idx) => (
        <div key={idx} className="flex">
          <Text className="text-nowrap mr-1">{title}</Text>
          <Text className="font-bold text-nowrap">{bold}</Text>
        </div>
      ))}
      contents={tabs.map(({ Comp }, idx) => (
        <Comp
          key={idx}
          loading={loading}
          onConsult={values => onConsult({ ...values })}
          filtersData={{ years, dimensions: dimensions }}
          handleFilterChange={handleFilterChange}
          selectedOption={selectedOption}
          allCargo={allCargo}
          errors={errors}
        />
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => {
        const { consultType, dimension } = tabs[idx];
        onTabChange(consultType, dimension);
      }}
    />
  );
};
