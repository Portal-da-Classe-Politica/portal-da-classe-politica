'use client';

import { ButtonStyled, Icon, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';
import { consultSearchParam } from '@routes';
import { Filter } from '../../types';

interface FilterProps {
  // eslint-disable-next-line no-unused-vars
  onConsult: (filters: any) => void;
  filtersData: {
    years: {
      type: string;
      values: number[];
    };
    dimensions: Filter;
  };
  handleFilterChange: (_a: any, _b: any) => void;
  selectedOption: any;
}

const FilterCandidateProfile = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Perfil dos Candidatos"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
    />
  );
};
const FilterElectionResult = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Resultados das Eleições"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
    />
  );
};
const FilterPartyFiliation = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Filiação Partidária"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
    />
  );
};
const FilterFinancing = ({ onConsult, handleFilterChange, selectedOption, filtersData }: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Financiamento de Campanha"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
    />
  );
};
const FilterElectoralMaps = ({ onConsult, handleFilterChange, selectedOption, filtersData }: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Mapas Eleitorais"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
    />
  );
};
const FilterElectoralResearch = ({
  onConsult,
  handleFilterChange,
  selectedOption,
  filtersData,
}: FilterProps) => {
  return (
    <FilterComponent
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Pesquisas Eleitorais"
      onConsult={onConsult}
      filtersData={filtersData}
      handleFilterChange={handleFilterChange}
      selectedOption={selectedOption}
    />
  );
};

const FilterComponent = ({
  description,
  longDescription,
  category,
  onConsult = () => {},
  filtersData,
  handleFilterChange,
  selectedOption,
}: {
  description: string;
  longDescription: string;
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
}) => {
  return (
    <div className="text-white">
      <Text>{description}</Text>

      <div className="flex flex-col xl:flex-row gap-8 my-8">
        <ButtonStyled style="fillBlack" size="small">
          <Text className="font-normal border-white border-r-2 pr-2" textType="span">
            Categoria
          </Text>
          <Text className="font-bold ml-2" textType="span">
            {category}
          </Text>
        </ButtonStyled>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="!grow">
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
              onSelect={category => handleFilterChange('dimension', category)}
            />
          </div>
          <div className="grow md:self-center">
            <DatePicker
              onSelectEnd={end => {
                return handleFilterChange('finalYear', end);
              }}
              onSelectStart={start => handleFilterChange('initialYear', start)}
              startYearAPI={filtersData.years.values[0]}
              endYearAPI={filtersData.years.values[filtersData.years.values.length - 1]}
            />
          </div>
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

export const ConsultFilterBox = ({
  initialConsult,
  onConsult,
  years,
  dimensions,
  handleFilterChange,
  selectedOption,
  onTabChange = () => {},
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
  onTabChange?: (_tab: string) => void;
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
      value: consultSearchParam.PartyFiliation,
      Comp: FilterPartyFiliation,
      title: 'Filiação',
      bold: 'Partidária',
    },
    {
      value: consultSearchParam.Financing,
      Comp: FilterFinancing,
      title: 'Financiamento de',
      bold: 'Campanha',
    },
    {
      value: consultSearchParam.ElectoralMaps,
      Comp: FilterElectoralMaps,
      title: 'Mapas',
      bold: 'Eleitorais',
    },
    {
      value: consultSearchParam.ElectoralResearch,
      Comp: FilterElectoralResearch,
      title: 'Pesquisas',
      bold: 'Eleitorais',
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
          onConsult={values => onConsult({ ...values, filter: value })}
          filtersData={{ years, dimensions: dimensions }}
          handleFilterChange={handleFilterChange}
          selectedOption={selectedOption}
        />
      ))}
      unSelectedClassName="!text-black"
      onTabChange={idx => onTabChange(tabs[idx].value)}
    />
  );
};
