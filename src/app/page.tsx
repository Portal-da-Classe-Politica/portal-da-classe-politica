import { Container, Heading, Display, Text, ButtonStyled } from '@base';
import { BoxFerramenta } from '@components/box/BoxFerramenta';
import { BoxData } from '@components/box/BoxData';
import { CardPost } from '@components/CardPost';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { HowToCrossing } from '@components/sections/HowToCrossing';
import { SpecialContents } from '@components/sections/SpecialContents';

const Home = () => {
  return (
    <main className="font-montserrat">
      <section className="bg-orange pb-10 md:pb-[90px] pt-4">
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
              src={'/img/Cruzdados.png'}
              title={'Cruzamentos e Dados Eleitorais'}
              subTitle={'Cruze e analise dezenas de variáveis eleitorais.'}
            />
            <BoxFerramenta
              alt="Indicadores e Índices Especiais"
              src={'/img/Indicadores.png'}
              title={'Indicadores e Índices Especiais'}
              subTitle={'Trinta índices construídos com variáveis eleitorais.'}
            />
            <BoxFerramenta
              alt="Aprenda a usar os Indicadores"
              src={'/img/Aprenda.png'}
              title={'Aprenda a usar os Indicadores'}
              subTitle={'Diversos tutoriais para ajudar você explorar ao máximo o Portal.'}
            />
            <BoxFerramenta
              alt="Comunicação Científica"
              src={'/img/Comunicacao.png'}
              title={'Comunicação Científica'}
              subTitle={'Nosso blog traz análises relevantes e acessíveis sobre a política nacional.'}
            />
          </div>
        </Container>
      </section>
      <section className=" pt-10 md:pt-[90px] pb-14 md:pb-[120px]">
        <Container>
          <div className=" md:max-w-[854px] mb-8">
            <Heading headingLevel={2}>Análises e Treinamentos </Heading>
            <Text size={'B1'}>
              Aprofunde seu conhecimento sobre dados eleitorais com conteúdos e guias que tornarão a sua
              experiência nos uso dos dados eleitorais mais intuitiva e fundamentada.
            </Text>
          </div>
          <div className="flex flex-col h-full md:flex-row gap-4 md:gap-[58px]">
            <div className="h-[370px] md:h-[480px]">
              <CardPost
                alt={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                category={['Leitura de 3min', 'Categoria Aqui']}
                customHeight={250}
                title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                subTitle={
                  'Antes de votar, confira o material informativo que preparamos com tudo que você precisa saber sobre suas opções de voto para prefeito e vereadores da sua cidade.'
                }
                src={'/img/Dados.svg'}
                type="Primary"
              />
            </div>

            <div className="flex flex-col gap-[24px]">
              <div className="md:h-[227px]">
                <CardPost
                  alt={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  type="Secondary"
                  category={['Leitura de 3min', 'Categoria Aqui']}
                  customHeight={90}
                  title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  src={'/img/Dados2.svg'}
                />
              </div>
              <div className="md:h-[227px]">
                <CardPost
                  alt={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  type="Secondary"
                  category={['Leitura de 3min', 'Categoria Aqui']}
                  customHeight={90}
                  title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  src={'/img/Dados2.svg'}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-orange py-10 md:py-[80px]">
        <Container>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="text-white flex-1 flex">
              <div className="max-w-[440px] content-center">
                <Heading headingLevel={2} className="font-bold">
                  Alguns números do Portal da Classe Política
                </Heading>
                <Text size={'B1'} className="py-[24px]">
                  A transparência e o acesso à informação são pilares fundamentais para o fortalecimento da
                  democracia. O acesso fácil e intuitivo aos dados eleitorais possibilita maior participação e
                  fiscalização por parte da sociedade. Para contribuir com esses objetivos, empreendemos
                  grandes esforços tratar e analisar uma quantidade enorme de informações.
                </Text>
                <ButtonStyled style="fillBlack">
                  <Text size={'C1'} className="font-bold">
                    Saiba mais
                  </Text>
                </ButtonStyled>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]	flex-1">
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

      <HowToCrossing className="pt-8 md:pt-[72px] pb-8 md:pb-[78px]" />

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
