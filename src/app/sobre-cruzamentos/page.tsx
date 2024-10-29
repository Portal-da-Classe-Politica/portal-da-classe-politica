'use client';

import { Container, Heading, Text, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import CardIconText from '@components/CardIconText';
import { Divider } from '@components/Divider';
import dynamic from 'next/dynamic';
import DesignSemiCircle from '@components/DesignSemiCircle';

const TableMenu = dynamic(() => import('@components/sections/TableMenu'), {
  ssr: false,
});

const cardIconTexts = [
  {
    title: 'O que é a página Perfil dos Candidatos?',
    text: 'A página Perfil dos Candidatos oferece um perfil detalhado de cada candidato que disputou cargos em uma determinada eleição. Aqui, você encontrará informações essenciais como nome, partido, cargo e situação da candidatura. ',
  },
  {
    title: 'Para que serve a página perfil dos Candidatos? ',
    text: 'A Página de Candidatos permite que os usuários explorem informações detalhadas sobre os candidatos, facilitando a análise de perfis e a comparação entre eles. Ideal para eleitores, pesquisadores e jornalistas que buscam uma visão sistematizada das candidaturas. ',
  },
  {
    title: 'O que são Cruzamentos de Variáveis? ',
    text: 'Cruzamentos de variáveis são combinações de diferentes conjuntos de dados para revelar relações e padrões que não são visíveis quando se analisa cada variável separadamente. No Portal, são 33 variáveis dividias em 4 dimensões: perfil social, votação obtida, prestação de contas e financiamento de campanha. ',
  },
  {
    title: 'Para que servem os Cruzamentos de Variáveis? ',
    text: 'Os Cruzamentos de Variáveis ajudam a identificar tendências, correlações e insights detalhados sobre a dinâmica eleitoral e política, gerando informações úteis para análises mais aprofundadas e a formulação de estratégias baseadas em dados concreto',
  },
  {
    title: 'O que são os Indicadores? ',
    text: 'Os Indicadores são métricas específicas que fornecem uma medida de aspectos-chave das eleições e da política. O Portal disponibiliza 16 índices divididos em quatro dimensões: eleitoral, de ambição política, geográfica e de financiamento eleitoral. ',
  },
  {
    title: 'Para que servem os Indicadores? ',
    text: 'Os Indicadores ajudam a medir e avaliar diferentes aspectos do cenário político e eleitoral, permitindo o acompanhamento de tendências ao longo do tempo. Eles podem ser ferramentas valiosas para pesquisadores, analistas, jornalistas e formuladores de políticas. ',
  },
];

const Page = () => {
  return (
    <main className="font-montserrat">
      <section className="pb-12 pt-4 relative bg-orange overflow-hidden">
        <DesignSemiCircle />

        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              ENTENDA OS INDICADORES
            </Text>
            <Heading size="H1" className="text-white mt-4">
              Entenda como a plataforma exibe os dados e seus indicadores
            </Heading>
          </div>
        </Container>
      </section>

      <section className="mt-10 md:mt-16">
        <Container className="px-0">
          <Heading headingLevel={2} size="H1" className="text-left mb-12 md:max-w-[50%]">
            Perfil dos Candidatos, variáveis e indicadores
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cardIconTexts.map((value, i) => {
              return <CardIconText key={'c' + i} title={value.title} text={value.text} iconType="Mountain" />;
            })}
          </div>
        </Container>
      </section>

      <section className="mt-12 md:mt-28">
        <Container>
          <Divider />
          <TextParagraphImage
            link="/blog/promo-part"
            src="/img/blog/smile.png"
            header={
              'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
            }
            texts={[
              'Os partidos políticos desempenham um papel crucial na política, controlando recursos importantes como cargos, seleção de candidatos (as) e financiamento. Desde 2009, a legislação brasileira obriga os partidos a destinar pelo menos 5% do Fundo Partidário anual para incentivar a participação das mulheres na política. Desde 2015, essa lei tem sido aprimorada, exigindo que os recursos fossem geridos por secretarias de mulheres ou institutos liderados pela secretaria. Ainda que o repasse seja obrigatório, os partidos cumprem essa regra apenas parcialmente, no período de 2009 a 2021. A anistia dada pelos partidos a eles próprios, no caso do não cumprimento da lei, é uma forma de subverter as regras formais que buscam incluir mais mulheres na política. Enquanto isso, o papel de formação política acaba sendo ocupado por organizações sociais e think tanks.',
            ]}
            className="mb-28"
          />

          <TextParagraphImage
            link="/blog/part-fem-lid"
            src="/img/blog/airplane.png"
            header={
              'A participação feminina na liderança partidária e o cumprimento das cotas financeiras para mulheres'
            }
            texts={[
              'Na disputa eleitoral, mulheres, em geral, enfrentam desafios mais rigorosos em comparação aos homens, recebendo menor apoio partidário e possuindo redes de financiamento mais restritas. Este texto mostra como a participação feminina na estrutura organizacional partidária pode atuar como um catalisador da representação política de mulheres por meio da distribuição de recursos financeiros de campanha.',
              'Os dados analisados apontam que diretórios estaduais nos quais mulheres ocuparam a presidência ou a secretaria geral destinaram mais recursos públicos eleitorais às suas candidatas. Além disso, a presença feminina nesses cargos aumenta a chance de os partidos cumprirem as cotas de gênero no financiamento público de campanha.',
            ]}
            reverse
          />

          <hr className="border-t-[3px] border-grayMix2 mt-12 md:mt-36" />
        </Container>
      </section>

      <section className="mt-10 md:mt-20 mb-12">
        <Container>
          <TableMenu />
        </Container>
      </section>
      <GetInContact />
    </main>
  );
};

export default Page;
