import { Container, Heading, Display, Text } from '@base';
import { BoxFerramenta } from '@components/box/BoxFerramenta';
import { BoxData } from '@components/box/BoxData';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { SpecialContents } from '@components/sections/SpecialContents';
import { routes } from '@routes';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Carousel } from '@components/carousel/Carousel';

const Home = () => {
  return (
    <main className="font-montserrat">
      <section className="bg-orange pb-10 md:pb-20 pt-4 relative overflow-hidden">
        <DesignSemiCircle position="top" />
        <Container>
          <Header style="light" />
          <div className="gap-7 flex flex-col items-center md:mt-10 text-white md:flex-row">
            <div className=" flex-1">
              <div className=" md:max-w-[472px]">
                <Display style={'D1'} className="text-h2 md:text-d1 mb-1">
                  Portal da Classe Política
                </Display>
                <Text size={'S1'} className="text-h6 md:text-s1">
                  Democratizando o acesso ao conhecimento
                </Text>
              </div>
            </div>
            <div className="flex-1 ">
              <div className="md:max-w-[460px]">
                <Text size={'B1'}>
                  Seja bem-vindo(a) ao Portal da Classe Política! A partir do uso intensivo de dados e da
                  expertise de profissionais de ciência política, produzimos análises úteis e acessíveis,
                  mesmo para quem não é especialista no assunto. Fazemos isso porque, além de produzir
                  informação, queremos democratizar o acesso ao conhecimento, estimulando a participação,
                  conectando pessoas, produzindo inovação e impacto social.
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center md:gap-2 md:flex-row md:justify-between mt-12 md:mt-24">
            <BoxFerramenta
              alt="Cruzamentos e Dados Eleitorais"
              src={'/img/Cruzdados.svg'}
              title={'Cruzamentos e Dados Eleitorais'}
              subTitle={'Cruze e analise dezenas de variáveis eleitorais.'}
              href={routes.cruzamentos}
            />
            <BoxFerramenta
              alt="Indicadores e Índices Especiais"
              src={'/img/Indicadores.svg'}
              title={'Indicadores e Índices Especiais'}
              subTitle={'Trinta índices construídos com variáveis eleitorais.'}
              href={routes.projections}
            />
            <BoxFerramenta
              alt="Aprenda a usar os Indicadores"
              src={'/img/Aprenda.svg'}
              title={'Aprenda a usar os Indicadores'}
              subTitle={'Diversos tutoriais para ajudar você explorar ao máximo o Portal.'}
              href={routes.aboutCrossing}
            />
            <BoxFerramenta
              alt="Comunicação Científica"
              src={'/img/Comunicacao.svg'}
              title={'Comunicação Científica'}
              subTitle={'Nosso blog traz análises relevantes e acessíveis sobre a política nacional.'}
              href={routes.blog}
            />
          </div>
        </Container>
      </section>

      <section className=" pt-10 md:pt-20 pb-14 md:pb-20">
        <Container>
          <div className=" md:max-w-[854px] mb-8">
            <Heading headingLevel={2}>Análises e Treinamentos </Heading>
            <Text size={'B1'}>
              Aprofunde seu conhecimento sobre dados eleitorais com conteúdos e guias que tornarão a sua
              experiência nos uso dos dados eleitorais mais intuitiva e fundamentada.
            </Text>
          </div>
          <div className="m-auto">
            <Carousel />
          </div>
        </Container>
      </section>

      <section className="bg-orange py-10 md:py-20">
        <Container>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="text-white flex-1 flex">
              <div className="max-w-[440px] content-center">
                <Heading headingLevel={2} className="font-bold">
                  Alguns números do Portal da Classe Política
                </Heading>
                <Text size={'B1'} className="py-6">
                  A transparência e o acesso à informação são pilares fundamentais para o fortalecimento da
                  democracia. O acesso fácil e intuitivo aos dados eleitorais possibilita maior participação e
                  fiscalização por parte da sociedade. Para contribuir com esses objetivos, empreendemos
                  grandes esforços tratar e analisar uma quantidade enorme de informações.
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6	flex-1">
              <BoxData
                header="2.884.495 "
                title="Candidaturas computadas "
                content="Número de candidaturas identificadas nos bancos de dados do TSE de 1998 a 2022"
              />
              <BoxData
                header="1.822.832 "
                title="Indivíduos candidatos "
                content="Número de pessoas candidatas nos bancos de dados do TSE de 1998 a 2022 "
              />
              <BoxData
                header="8gb "
                title="Dataframe "
                content="Tamanho total do banco de dados computado no Portal da Classe Política "
              />
              <BoxData
                header="47 planilhas"
                title="Arquivos do TSE "
                content="Número de planilhas tratadas na arquitetura de dados do Portal da Classe Política "
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-6 md:mt-20 mb-10 md:mb-20">
        <Container>
          <SpecialContents />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Home;
