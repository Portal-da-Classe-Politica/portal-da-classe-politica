'use client';

import Image from 'next/image';

import { Container, Heading, Text, TextParagraph, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import Avatar from '@components/Avatar';
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
              Conheça os grandes números do Portal da Classe Política e seus idealizadores
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
            title={'Democratização e transparência dos dados eleitorais no Brasil'}
            texts={[
              'O Portal da Classe Política traduz a complexidade dos dados eleitorais brasileiros em conhecimento acessível. Desde 1998, o Tribunal Superior Eleitoral (TSE) publica um imenso volume de informações sobre candidaturas, votações, patrimônio pessoal, finanças de campanha e prestações de contas. Sem tratamento técnico, esses dados permanecem distantes do cidadão.',
              'Ao oferecer acesso facilitado a esses dados, o Portal permite que a sociedade civil se informe e fiscalize o processo eleitoral com mais rigor e autonomia. Além disso, transforma essa matéria-prima em fonte de informações sistemáticas para pesquisas em Ciência Política, Economia, Sociologia Política e Comunicação, aprofundando a compreensão sobre o sistema político brasileiro.',
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
              'O Portal da Classe Política integra os produtos técnicos e científicos do INCT Representação e Legitimidade Democrática (ReDem). Criado em 2023, o ReDem busca compreender a crise da democracia no Brasil relacionando três dimensões: valores e percepções dos eleitores, regras e instituições eleitorais e a composição da classe política para explicar como esses fatores combinados afetam a legitimidade da representação.',
              'O Portal surgiu como uma iniciativa inédita de transparência e acesso a informações eleitorais. Em junho de 2023, a partir de um projeto desenvolvido no Instituto Federal do Rio Grande do Sul, Luiz Sebastião D’Avila Filho criou uma API pública de análise do perfil de candidatos. Essa plataforma foi ampliada com a colaboração de dois pesquisadores do INCT ReDem, Adriano Codato e Nilton Sainz, e ganhou corpo em agosto de 2023, com o desenvolvimento de uma arquitetura de banco de dados e um design interdisciplinar. ',
              'Em outubro de 2023, a equipe foi expandida com a entrada da empresa ARW Political Advisory, responsável pelo primeiro desenho da interface e pelos sistemas de cruzamento e visualização de dados. Em dezembro de 2024 o ReDem reassumiu a tarefa de estruturar o Portal com uma série de aperfeiçoamentos metodológicos e técnicos: seleção e tratamento dos múltiplos conjuntos de dados do TSE, padronização de variáveis, definição de índices e indicadores e produção de visualizações interativas. ',
              'O Portal da Classe Política é a principal plataforma de acesso e análise sobre candidaturas, partidos e resultados eleitorais no Brasil, reunindo rigor científico e utilidade pública. ',
            ]}
          />

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
