'use client';

import { useState } from 'react';
import { LineItem } from './LineItem';
import { Heading, Text } from './base';

const topics = [
  {
    title: 'Perfil dos Candidatos ',
    subTopic: [
      'Acesso à Página Principal',
      'Seleção da Eleição',
      'Visualização da Lista de Candidatos',
      'Seleção do Candidato',
      'Informações do Perfil',
    ],
    text: `Acesso à Página Principal: ao entrar na página principal do Portal da Classe Política, procure pela seção Perfil dos Candidatos  

Seleção da Eleição: escolha a eleição de interesse no menu suspenso ou na lista disponível. Isso pode incluir eleições municipais, estaduais ou federais.  

Visualização da Lista de Candidatos: após selecionar a eleição, uma lista completa dos candidatos que disputaram cargos estará disponível. Esta lista incluirá informações básicas como nome, partido, cargo e situação da candidatura. 

Seleção do Candidato: clique no nome de qualquer candidato na lista para acessar um perfil mais detalhado.  

Informações do Perfil: A página de perfil do candidato apresentará uma visão completa das seguintes informações, nome, estado, grau de instrução, partido ou coligação, bens declarados, ocupação, gênero, raça, idade e cidade de origem. `,
  },
  {
    title: 'Cruzamentos de Variáveis',
    subTopic: [
      'Acesse o Portal da Classe Política',
      'Escolha as Variáveis para Cruzamento',
      'Escolha a eleição desejada',
      'Execute o Cruzamento',
    ],
    text: `Acesse o Portal da Classe Política: navegue até a seção de "Cruzamentos e Dados Eleitorais”.  

Escolha as Variáveis para Cruzamento: na página de análises, você verá uma lista de dimensões e variáveis.  

Selecione duas variáveis que você deseja cruzar. por exemplo, escolha "Gênero" e "Nível de instrução”. 

Escolha a eleição desejada: você poderá optar por eleições municipais, estaduais ou federais. 

Execute o Cruzamento: clique em "Gerar Cruzamento". `,
  },
  {
    title: 'Indicadores ',
    subTopic: [
      'Acesse o Portal da Classe Política',
      'Escolha as quatro dimensões temáticas disponíveis',
      'Escolha o indicador desejado',
      'Visualize o indicador',
      'Adicione outros indicadores',
    ],
    text: `Acesse o Portal da Classe Política: navegue até a seção de "Indicadores”. 

Escolha as quatro dimensões temáticas disponíveis: eleitoral, de ambição política, geográfica e de financiamento eleitoral.  

Escolha o indicador desejado: são quatro indicadores disponíveis em cada dimensão temática. 

Visualize o indicador: o índice escolhido será projetado no gráfico ao lado. 

Adicione outros indicadores: você também poderá adicionar outros indicadores da mesma dimensão temática ao gráfico e visualizar as trajetórias simultaneamente. `,
  },
];

const TitleText = {
  title: 'Perfil de candidatos, variáveis e índices',
  text: `O Portal da Classe Política disponibiliza ao público três conjuntos principais de informações que podem ser muito úteis para análises detalhadas e abrangentes do cenário político nacional. 

O primeiro deles apresenta informações sobre o Perfil dos Candidatos e oferece perfis completos de quem disputou quaisquer cargos eletivos entre 1998 e 2022, incluindo informações essenciais como nome, faixa etária, grau de instrução, partido, cargo, bens declarados etc. 

O segundo conjunto de informações se baseia em 33 variáveis, divididas em quatro dimensões: perfil social, votação obtida, prestação de contas e financiamento de campanha. Aqui, o usuário pode realizar cruzamentos entre essas variáveis, relacionado diferentes conjuntos de dados em busca padrões e associações. 

Por fim, o Portal apresenta um conjunto de 16 indicadores, também divididos em quatro dimensões temáticas: eleitoral; de ambição política; geográfica; e de financiamento de campanha. O objetivo principal aqui é disponibilizar um conjunto de indicadores para iluminar aspectos-chave das eleições. `,
};

type TextProp = {
  title: string;
  text: string;
};

const TableMenu = () => {
  const [selectedText, setSelectedText] = useState<TextProp>(TitleText);

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
          {topics.map((valueTopic, i) => (
            <div key={'a' + i}>
              <Text textType="h3" size="B2" className="font-bold">
                {valueTopic.title}
              </Text>
              <ul>
                {valueTopic.subTopic.map((valueSub, i) => (
                  <li
                    className="my-2"
                    key={'b' + i}
                    onClick={() => setSelectedText({ title: valueTopic.title, text: valueTopic.text })}
                  >
                    <LineItem type="thin">
                      <Text size="B2">{valueSub}</Text>
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
