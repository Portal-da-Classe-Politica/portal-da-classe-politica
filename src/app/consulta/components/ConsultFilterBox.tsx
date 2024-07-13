'use client';

import { ButtonStyled, Icon, Text } from '@base';
import { Select } from '@base/forms';
import { BoxIconAwesome } from '@components/box/BoxIconAwesome';
import { CarouselTabs } from '@components/CarouselTabs';
import { DatePicker } from '@components/DatePicker';

const FilterCandidateProfile = () => {
  return (
    <Filter
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Perfil dos Candidatos"
    />
  );
};
const FilterElectionResult = () => {
  return (
    <Filter
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Resultados das Eleições"
    />
  );
};
const FilterPartyFiliation = () => {
  return (
    <Filter
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Filiação Partidária"
    />
  );
};
const FilterFinancing = () => {
  return (
    <Filter
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Financiamento de Campanha"
    />
  );
};
const FilterElectoralMaps = () => {
  return (
    <Filter
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Mapas Eleitorais"
    />
  );
};
const FilterElectoralResearch = () => {
  return (
    <Filter
      description="Carregamos nesta página os dados do Perfil dos Candidatos. Para fazer um cruzamento escolha uma categoria e o período abaixo:"
      longDescription="O resultado do cruzamento entre Perfil dos Candidatos & {Categoria Selecionada} nos trás informações sobre lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum. Ainda com dúvida? Clique aqui."
      category="Pesquisas Eleitorais"
    />
  );
};

const Filter = ({
  description,
  longDescription,
  category,
}: {
  description: string;
  longDescription: string;
  category: string;
}) => {
  return (
    <div className="text-white">
      <Text>{description}</Text>

      <div className="flex gap-8 my-8">
        <ButtonStyled style="fillBlack" size="small">
          <Text className="font-normal border-white border-r-2 pr-2" textType="span">
            Categoria
          </Text>
          <Text className="font-bold ml-2" textType="span">
            {category}
          </Text>
        </ButtonStyled>

        <Select
          options={[{ label: '1', value: '1' }]}
          placeholder="Sem cruzamento"
          buttonProps={{ style: 'fillGray', className: 'px-[8px] w-full' }}
          prefixComponent={
            <>
              <BoxIconAwesome
                iconType="Table"
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
        />

        <DatePicker />

        <ButtonStyled style="fillBlack" size="small">
          <Text>Gerar Cruzamento</Text>
        </ButtonStyled>
      </div>

      <Text>{longDescription}</Text>
    </div>
  );
};

export const ConsultFilterBox = () => {
  const tabs = [
    { title: 'Perfil dos', bold: 'Candidatos', content: <FilterCandidateProfile /> },
    { title: 'Resultados das', bold: 'Eleições', content: <FilterElectionResult /> },
    { title: 'Filiação', bold: 'Partidária', content: <FilterPartyFiliation /> },
    { title: 'Financiamento de', bold: 'Campanha', content: <FilterFinancing /> },
    { title: 'Mapas', bold: 'Eleitorais', content: <FilterElectoralMaps /> },
    { title: 'Pesquisas', bold: 'Eleitorais', content: <FilterElectoralResearch /> },
  ];

  return (
    <CarouselTabs
      tabs={tabs.map(({ title, bold }, idx) => (
        <div key={idx} className="flex text-black">
          <Text className="text-nowrap mr-1">{title}</Text>
          <Text className="font-bold text-nowrap">{bold}</Text>
        </div>
      ))}
      contents={tabs.map(t => t.content)}
    />
  );
};
