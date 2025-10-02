'use client';

import Image from 'next/image';

import { Container, Heading, Text, TextParagraph, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import Avatar from '@components/Avatar';
import Timeline from '@components/timeline/Timeline';
import { GetInContact } from '@components/sections/GetInContact';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Constants } from '@constants';

const headerText = [
  {
    title: '2.884.495',
    subtitle: 'Candidaturas computadas ',
    text: 'Número de candidaturas identificadas nos bancos de dados do TSE de 1998 a 2022 ',
  },
  {
    title: '1.822.832 ',
    subtitle: 'Indivíduos candidatos ',
    text: 'Número de pessoas candidatas nos bancos de dados do TSE de 1998 a 2022 ',
  },
  {
    title: '8gb ',
    subtitle: 'Dataframe',
    text: 'Tamanho total do banco de dados computado no Portal da Classe Política ',
  },
  {
    title: '47 planilhas do TSE',
    subtitle: 'Arquivos do TSE ',
    text: 'Número de planilhas tratadas na arquitetura de dados do Portal da Classe Política',
  },
];

const avatarMock = [
  {
    name: 'Adriano Codato',
    text: 'Coordenador do INCT ReDem e Portal da Classe Política. Doutor em Ciência Política (Unicamp) ',
    src: '/img/author/AdrianoCodato.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/adriano-codato-24526628/  ',
      instagram: ' https://www.instagram.com/adrianocodato/ ',
      email: 'mailto:adrianocodato@gmail.com',
      facebook: '',
    },
  },
  {
    name: 'Nilton Sainz ',
    text: 'Coordenador Portal da Classe Política e pesquisador do INCT ReDem. Doutorando em Ciência Política (UFPR) ',
    src: '/img/author/NiltonSainz.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/nilton-sainz/ ',
      instagram: '',
      email: 'mailto:sainznilton@gmail.com',
      facebook: '',
    },
  },
  {
    name: 'Luiz Sebastião D`Avila Filho ',
    text: 'Desenvolvedor Portal da Classe Política e pesquisador INCT ReDem. Bacharel em Ciências Contábeis (FURG) e Análise e desenvolvimento de Sistemas (IFRS) ',
    src: '/img/author/LuizSebastiao.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/luizdavilaf/',
      instagram: '',
      email: 'mailto:luizdavilaf@gmail.com',
      facebook: '',
    },
  },
];

const Page = () => {
  return (
    <main className="font-montserrat bg-orange">
      <section className="pb-12 relative pt-4 overflow-hidden">
        <DesignSemiCircle />

        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              SOBRE O PROJETO
            </Text>
            <Heading size="H1" className="text-white mt-4 md:w-[80%]">
              Conheça a trajetória do Portal da Classe Política e seus idealizadores
            </Heading>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-20 mt-12 md:mt-24">
            {headerText.map((item, idx) => (
              <div key={idx} className="max-w-[220px]">
                <Heading size="H2" className="text-white font-bold mb-2">
                  {item.title}
                </Heading>
                <Heading size="H6" className="text-white font-bold mb-2">
                  {item.subtitle}
                </Heading>
                <Text size="B1" className="text-white">
                  {item.text}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 pt-12 md:pt-32 bg-white">
        <Container className="flex flex-col items-center">
          <TextParagraph
            title={'Democratização e transparência de dados eleitorais no Brasil'}
            texts={[
              'O Portal da Classe Política surge a partir de uma necessidade clara: tornar os dados eleitorais acessíveis e compreensíveis para toda a população, em especial para aqueles que não possuem conhecimento técnico em tratamento de dados. O Tribunal Superior Eleitoral (TSE) disponibiliza um vasto conjunto de dados desde 1998, incluindo informações sobre candidaturas, resultados de votações, financiamento de campanha e gastos e contas eleitorais. No entanto, a complexidade e o volume desses dados dificultam o seu uso por parte da sociedade civil. ',
              'A transparência e o acesso à informação são pilares fundamentais para o fortalecimento da democracia. O acesso fácil e intuitivo aos dados eleitorais possibilita maior participação e fiscalização por parte da sociedade, promovendo a integridade do processo eleitoral. Além disso, esses dados são essenciais para a pesquisa acadêmica em diversas áreas, como Ciência Política, Economia, Sociologia, Comunicação etc. contribuindo para um entendimento mais profundo e crítico do sistema eleitoral brasileiro. Com isso, o Portal da Classe Política representa um avanço significativo na promoção desses princípios ao tornar-se a principal fonte de acesso a informações eleitorais incorporadas por ferramentas intuitivas de análise e exploração de dados. ',
            ]}
          />

          <div className="mt-12 md:mt-24">
            <Image src="/img/Dados.svg" width={1300} height={400} alt="" />
          </div>

          <div className="mt-12 md:mt-24 text-center max-w-[600px]">
            <Heading size="H2" className="font-bold mb-5">
              Conheça os idealizadores do Portal da Classe Política
            </Heading>
            {/* <Text size="B1">{lorem.substring(0, 98)}</Text> */}
          </div>

          <div className="md:mt-24 mt-12 text-center flex flex-wrap gap-14 justify-center md:justify-normal">
            {avatarMock.map((item, i) => {
              return (
                <Avatar key={i} src={item.src} title={item.name} text={item.text} social={item.social} />
              );
            })}
          </div>

          <TextParagraph
            className="md:mt-24 mt-12"
            title={'Trajetória do Portal da Classe Política'}
            texts={[
              'O Portal da Classe Política está inserido no rol de produtos técnicos e científicos elaborados pelo INCT Representação e Legitimidade Democrática (ReDem). Criado em 2023, o ReDem tem como objetivo analisar as crises das democracias através de uma lente tridimensional, relacionando valores e percepções dos eleitores, instituições e regras eleitorais, e a morfologia da classe política nacional, para explicar como essas dimensões afetam o déficit de legitimidade da representação política. ',
              'Em consonância com os objetivos do instituto, o Portal da Classe Política surge como uma iniciativa de transparência e acesso a informações eleitorais, fundamentais para o fortalecimento da democracia no país. A ideia do portal começou a ganhar forma em junho de 2023, a partir de um projeto de criação de uma API pública de análise de candidatos, concebido no âmbito do Instituto Federal do Rio Grande do Sul, de autoria de Luiz Sebastião D`Avila Filho. Esse projeto inicial motivou a criação de uma plataforma completa, capaz de tratar grandes conjuntos de dados do Tribunal Superior Eleitoral (TSE) e providenciar ferramentas simplificadas e intuitivas para o acesso aos dados eleitorais. ',
              'Desde o início, o projeto contou com a colaboração do INCT ReDem, representado pelo Prof. Adriano Codato e pelo pesquisador Nilton Sainz, que contribuíram significativamente para a construção da plataforma. Em agosto de 2023, o projeto avançou com a elaboração de uma estrutura de arquitetura de bancos de dados e um design interdisciplinar, visando atender aos principais objetivos do projeto. Assim nasceu o Portal da Classe Política. Em outubro de 2023, a equipe de construção do projeto se expandiu com a inclusão da empresa ARW Political Advisory, que desenvolveu os parâmetros de experiência do usuário; a interface; e o sistema cruzamentos, análises e visualização de dados do Portal. ',
              'O Portal da Classe Política é resultado de esforços metodológicos e técnicos constantes. Esses esforços incluem a seleção cuidadosa dos conjuntos de dados do TSE, o tratamento de variáveis, categorização, estudos e discussões sobre a implementação de índices e indicadores sobre a classe política, até a visualização gráfica dos dados. Esse processo consolidou o Portal como a principal iniciativa de transparência e acesso a dados sobre a classe política brasileira. ',
            ]}
          />

          <div className="mt-12 md:mt-24 text-center">
            <Timeline
              items={[
                {
                  title: '03/2023',
                  icons: ['Location'],
                  text: 'Instalação do Instituto Representação e Legitimidade democrática na UFPR ',
                },
                {
                  title: '06/2023',
                  icons: ['Location'],
                  text: 'A construção da API pública com base em dados do TSE para a análise de candidatos e início dos bancos de dados ',
                },
                {
                  title: '08/2023 ',
                  icons: ['Location'],
                  text: 'Consolidação do projeto com a incorporação da API e uma proposta de acesso e transparência de dados sobre classe política ',
                },
                {
                  title: '02/2024',
                  icons: ['Location'],
                  text: 'Realização de estudos sobre seleção dos conjuntos e processamentos de dados, seleção das variáveis e escolhas dos índices e indicadores ',
                },
                {
                  title: '02/2024',
                  icons: ['Location'],
                  text: 'Definição dos parâmetros e experiência do usuário e construção do sistema de cruzamentos, análises e visualização de dados. ',
                },
              ]}
            />
          </div>

          <div className="mt-12 md:mt-24 mb-12 md:mb-48">
            <TextParagraphImage
              link="/news/promo-part"
              src={Constants.images.promoPart}
              header={
                'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
              }
              texts={[
                'Os partidos políticos desempenham um papel crucial na política, controlando recursos importantes como cargos, seleção de candidatos (as) e financiamento. Desde 2009, a legislação brasileira obriga os partidos a destinar pelo menos 5% do Fundo Partidário anual para incentivar a participação das mulheres na política. Desde 2015, essa lei tem sido aprimorada, exigindo que os recursos fossem geridos por secretarias de mulheres ou institutos liderados pela secretaria. Ainda que o repasse seja obrigatório, os partidos cumprem essa regra apenas parcialmente, no período de 2009 a 2021. A anistia dada pelos partidos a eles próprios, no caso do não cumprimento da lei, é uma forma de subverter as regras formais que buscam incluir mais mulheres na política. Enquanto isso, o papel de formação política acaba sendo ocupado por organizações sociais e think tanks.',
              ]}
              className="mb-28"
            />
          </div>
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
