'use client';

import { useState } from 'react';
import { LineItem } from './LineItem';
import { Heading, Text } from './base';

const topics = [
  {
    title: 'Perfil dos Candidatos ',
    subTopics: [
      {
        key: 's1-01',
        title: 'Acesso à Página Principal',
        text: 'Acesso à Página Principal: ao entrar na página principal do Portal da Classe Política, procure pela seção Perfil dos Candidatos  ',
      },
      {
        key: 's1-02',
        title: 'Seleção da Eleição',
        text: 'Seleção da Eleição: escolha a eleição de interesse no menu suspenso ou na lista disponível. Isso pode incluir eleições municipais, estaduais ou federais.  ',
      },
      {
        key: 's1-03',
        title: 'Visualização da Lista de Candidatos',
        text: 'Visualização da Lista de Candidatos: após selecionar a eleição, uma lista completa dos candidatos que disputaram cargos estará disponível. Esta lista incluirá informações básicas como nome, partido, cargo e situação da candidatura. ',
      },
      {
        key: 's1-04',
        title: 'Seleção do Candidato',
        text: 'Seleção do Candidato: clique no nome de qualquer candidato na lista para acessar um perfil mais detalhado.  ',
      },
      {
        key: 's1-05',
        title: 'Informações do Perfil',
        text: 'Informações do Perfil: A página de perfil do candidato apresentará uma visão completa das seguintes informações, nome, estado, grau de instrução, partido ou coligação, bens declarados, ocupação, gênero, raça, idade e cidade de origem. `,',
      },
    ],
  },
  {
    title: 'Cruzamentos de Variáveis',
    subTopics: [
      {
        key: 's2-01',
        title: 'Acesse o Portal da Classe Política',
        text: 'Acesse o Portal da Classe Política: navegue até a seção de "Cruzamentos e Dados Eleitorais”. ',
      },
      {
        key: 's2-02',
        title: 'Escolha as Variáveis para Cruzamento',
        text: 'Escolha as Variáveis para Cruzamento: na página de análises, você verá uma lista de dimensões e variáveis.\nSelecione duas variáveis que você deseja cruzar. por exemplo, escolha "Gênero" e "Nível de instrução”. ',
      },
      {
        key: 's2-03',
        title: 'Escolha a eleição desejada',
        text: 'Escolha a eleição desejada: você poderá optar por eleições municipais, estaduais ou federais. ',
      },
      {
        key: 's2-04',
        title: 'Execute o Cruzamento',
        text: 'Execute o Cruzamento: clique em "Gerar Cruzamento".',
      },
    ],
  },
  {
    title: 'Indicadores ',
    subTopics: [
      {
        key: 's3-01',
        title: 'Acesse o Portal da Classe Política',
        text: 'Acesse o Portal da Classe Política: navegue até a seção de "Indicadores”.',
      },
      {
        key: 's3-02',
        title: 'Escolha as quatro dimensões temáticas disponíveis',
        text: 'Escolha as quatro dimensões temáticas disponíveis: eleitoral, de ambição política, geográfica e de financiamento eleitoral.',
      },
      {
        key: 's3-03',
        title: 'Escolha o indicador desejado',
        text: 'Escolha o indicador desejado: são quatro indicadores disponíveis em cada dimensão temática. ',
      },
      {
        key: 's3-04',
        title: 'Visualize o indicador',
        text: 'Visualize o indicador: o índice escolhido será projetado no gráfico ao lado. ',
      },
      {
        key: 's3-05',
        title: 'Adicione outros indicadores',
        text: 'Adicione outros indicadores: você também poderá adicionar outros indicadores da mesma dimensão temática ao gráfico e visualizar as trajetórias simultaneamente. `,',
      },
    ],
  },
];

const TitleText = {
  key: 'root',
  title: 'Perfil de candidatos, variáveis e índices',
  text: `O Portal da Classe Política disponibiliza ao público três conjuntos principais de informações que podem ser muito úteis para análises detalhadas e abrangentes do cenário político nacional. 

O primeiro deles apresenta informações sobre o Perfil dos Candidatos e oferece perfis completos de quem disputou quaisquer cargos eletivos entre 1998 e 2022, incluindo informações essenciais como nome, faixa etária, grau de instrução, partido, cargo, bens declarados etc. 

O segundo conjunto de informações se baseia em 33 variáveis, divididas em quatro dimensões: perfil social, votação obtida, prestação de contas e financiamento de campanha. Aqui, o usuário pode realizar cruzamentos entre essas variáveis, relacionado diferentes conjuntos de dados em busca padrões e associações. 

Por fim, o Portal apresenta um conjunto de 16 indicadores, também divididos em quatro dimensões temáticas: eleitoral; de ambição política; geográfica; e de financiamento de campanha. O objetivo principal aqui é disponibilizar um conjunto de indicadores para iluminar aspectos-chave das eleições. `,
};

type TextProp = {
  key?: string;
  title: string;
  text: string;
};

const TableMenu = () => {
  const [selectedText, setSelectedText] = useState<TextProp>(TitleText);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');

  const onTextSelected = (subTopic: TextProp) => {
    setSelectedText({ title: subTopic.title, text: subTopic.text });
    setSelectedSubtopic(subTopic.key ?? '');
  };

  return (
    <>
      <Heading
        headingLevel={2}
        size="H1"
        onClick={() => {
          setSelectedText(TitleText);
        }}
        className="text-left mb-12 cursor-pointer"
      >
        Três pilares do Portal da classe Políticae
      </Heading>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="max-w-[300px]">
          {topics.map((topic, i) => (
            <div key={'a' + i}>
              <Text textType="h3" size="B2" className="font-bold">
                {topic.title}
              </Text>
              <ul>
                {topic.subTopics.map(subTopic => (
                  <li key={subTopic.key} className="my-2" onClick={() => onTextSelected(subTopic)}>
                    <LineItem type="thin" selected={subTopic.key === selectedSubtopic}>
                      <Text size="B2">{subTopic.title}</Text>
                    </LineItem>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <Heading headingLevel={2} className="font-bold" size="H2">
            {selectedText.title}
          </Heading>
          <Text size="B1" className="mt-4">
            {selectedText.text}
          </Text>
        </div>
      </div>
    </>
  );
};

export default TableMenu;
