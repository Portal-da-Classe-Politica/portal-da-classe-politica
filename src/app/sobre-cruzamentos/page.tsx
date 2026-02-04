import dynamic from 'next/dynamic';

import { Container, Heading, Icon, Text, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import CardIconText from '@components/CardIconText';
import { Divider } from '@components/Divider';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { WordPressBlogService } from '@services/blog/WordPressBlogService';

const TableMenu = dynamic(() => import('@components/sections/TableMenu'), {
  ssr: false,
});

const cardIconTexts = [
  {
    title: 'O que é a página Perfil dos Candidatos?',
    icon: <Icon type="One" />,
    text: 'A página Perfil dos Candidatos oferece um perfil detalhado de cada candidato que disputou cargos em uma determinada eleição. Aqui, você encontrará informações essenciais como nome, partido, cargo e situação da candidatura. ',
  },
  {
    title: 'Para que serve a página perfil dos Candidatos? ',
    icon: <Icon type="Two" />,
    text: 'A Página de Candidatos permite que os usuários explorem informações detalhadas sobre os candidatos, facilitando a análise de perfis e a comparação entre eles. Ideal para eleitores, pesquisadores e jornalistas que buscam uma visão sistematizada das candidaturas. ',
  },
  {
    title: 'O que são Cruzamentos de Variáveis? ',
    icon: <Icon type="Three" />,
    text: 'Cruzamentos de variáveis são combinações de diferentes conjuntos de dados para revelar relações e padrões que não são visíveis quando se analisa cada variável separadamente. No Portal, são 33 variáveis dividias em 4 dimensões: perfil social, votação obtida, prestação de contas e financiamento de campanha. ',
  },
  {
    title: 'Para que servem os Cruzamentos de Variáveis? ',
    icon: <Icon type="Four" />,
    text: 'Os Cruzamentos de Variáveis ajudam a identificar tendências, correlações e insights detalhados sobre a dinâmica eleitoral e política, gerando informações úteis para análises mais aprofundadas e a formulação de estratégias baseadas em dados concreto',
  },
  {
    title: 'O que são os Indicadores? ',
    icon: <Icon type="Five" />,
    text: 'Os Indicadores são métricas específicas que fornecem uma medida de aspectos-chave das eleições e da política. O Portal disponibiliza 16 índices divididos em quatro dimensões: eleitoral, de ambição política, geográfica e de financiamento eleitoral. ',
  },
  {
    title: 'Para que servem os Indicadores? ',
    icon: <Icon type="Six" />,
    text: 'Os Indicadores ajudam a medir e avaliar diferentes aspectos do cenário político e eleitoral, permitindo o acompanhamento de tendências ao longo do tempo. Eles podem ser ferramentas valiosas para pesquisadores, analistas, jornalistas e formuladores de políticas. ',
  },
];

const Page = async () => {
  // Buscar os 2 posts mais recentes do WordPress
  const posts = await WordPressBlogService.getAllFormatted();
  const [firstPost, secondPost] = posts.slice(0, 2);
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
            {cardIconTexts.map((v, i) => {
              return (
                <CardIconText
                  key={'c' + i}
                  title={v.title}
                  text={v.text}
                  customIcon={
                    <>
                      {v?.icon}
                      <div className="icon-o">
                        <Icon type="O" />
                      </div>
                    </>
                  }
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="mt-12 md:mt-28">
        <Container>
          <Divider />
          {firstPost && (
            <TextParagraphImage
              link={firstPost.link}
              src={firstPost.img}
              header={firstPost.title}
              texts={[firstPost.description]}
              className="mb-28"
            />
          )}

          {secondPost && (
            <TextParagraphImage
              link={secondPost.link}
              src={secondPost.img}
              header={secondPost.title}
              texts={[secondPost.description]}
              reverse
            />
          )}

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
