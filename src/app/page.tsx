'use client';

import Image from 'next/image';

import { Container, Heading, Display, Text, ButtonStyled } from '@base';

import { BoxFerramenta } from '@components/box/BoxFerramenta';
import { BoxData } from '@/components/box/BoxData';
import { CardPost } from '@/components/CardPost';
import { Header } from '@/components/Header';
import { GetInContact } from '@/components/sections/GetInContact';
import { SelectBox } from '@components/SelectBox';

const Home = () => {
  return (
    <main className="font-montserrat">
      <section className="bg-orange pb-10 md:pb-[90px] pt-4">
        <Container>
          <Header style="light" />
          <div className="gap-7 flex flex-col items-center md:mt-10 text-white md:flex-row">
            <div className=" flex-1">
              <div className=" md:max-w-[432px]">
                <Display style={'D1'} className="text-h2 md:text-d1 mb-1">
                  Conheça o Portal Redem
                </Display>
                <Text size={'S1'} className="text-h6 md:text-s1">
                  Transformando dados eleitorais em análises para toda a sociedade
                </Text>
              </div>
            </div>
            <div className="flex-1 ">
              <div className="md:max-w-[460px]">
                <Text size={'B1'}>
                  No Portal Redem os dados eleitorais são analisados e apresentados de forma detalhada. Aqui
                  você encontrará indicadores exclusivos e informações essenciais para compreender dados
                  eleitorais sensíveis. Junte-se a nós e transforme a maneira como você compreende as eleições
                  no Brasil.
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center md:gap-2 md:flex-row md:justify-between mt-12 md:mt-24">
            <BoxFerramenta
              src={'/img/Cruzdados.svg'}
              title={'Cruzamentos e Dados Eleitorais'}
              subTitle={'Consectetur adipiscing uspendisse non odio.'}
            />
            <BoxFerramenta
              src={'/img/Indicadores.svg'}
              title={'Cruzamentos e Dados Eleitorais'}
              subTitle={'Consectetur adipiscing uspendisse non odio.'}
            />
            <BoxFerramenta
              src={'/img/Aprenda.svg'}
              title={'Cruzamentos e Dados Eleitorais'}
              subTitle={'Consectetur adipiscing uspendisse non odio.'}
            />
            <BoxFerramenta
              src={'/img/Comunicacao.svg'}
              title={'Cruzamentos e Dados Eleitorais'}
              subTitle={'Consectetur adipiscing uspendisse non odio.'}
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
                  type="Secondary"
                  category={['Leitura de 3min', 'Categoria Aqui']}
                  customHeight={90}
                  title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  src={'/img/Dados2.svg'}
                />
              </div>
              <div className="md:h-[227px]">
                <CardPost
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
                  Big Numbers
                </Heading>
                <Text size={'B1'} className="py-[24px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa
                  lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam
                  vulputate ipsum.
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
                header="+73"
                title="Pesquisadores e pesquisadoras envolvidos"
                content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
              />
              <BoxData
                header="6243"
                title="Dados processados"
                content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
              />
              <BoxData
                header="+180"
                title="Variáveis"
                content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
              />
              <BoxData
                header="+1200"
                title="Cruzamentos possíveis"
                content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="pt-8 md:pt-[72px] pb-8 md:pb-[78px]">
        <Container>
          <SelectBox
            tabs={[
              {
                title: 'Como fazer os cruzamentos',
                content: (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      <div className="  text-white">
                        <Heading headingLevel={2} className="font-bold pb-3 text-h5 md:text-h1">
                          Como fazer os cruzamentos
                        </Heading>
                        <Text className=" text-[18px] font-bold pb-[20px]">
                          Como fazer os cruzamentosComo fazer os cruzamentos
                        </Text>
                        <Text size={'B2'} className="mt-auto pb-[20px] ">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit
                          amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi
                          mollis ec.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
                          odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis
                          nisi mollis nec. Nam vulputate ipsum. Suspendisse non odio sit amet massa lobortis
                          scelerisque. Integer gravida nulla ipsum.
                        </Text>
                        <ButtonStyled style="fillBlack">
                          <Text className="text-[14px] font-bold">Saiba mais</Text>
                        </ButtonStyled>
                      </div>
                      <div>
                        <div className="w-[320px] md:h-[300px] md:w-[533px] bg-orangeLight1 rounded-lg"></div>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: 'Como fazer os cruzamentos',
                content: (
                  <>
                    <div className="flex flex-col md:flex-row">
                      <div className="  text-white">
                        <Heading headingLevel={2} className="font-bold pb-3">
                          Como fazer os cruzamentos
                        </Heading>
                        <Text className=" text-[18px font-bold pb-[20px]">
                          Como fazer os cruzamentosComo fazer os cruzamentos
                        </Text>
                        <Text size={'B2'} className="mt-auto pb-[20px] ">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit
                          amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi
                          mollis ec.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
                          odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum, in convallis
                          nisi mollis nec. Nam vulputate ipsum. Suspendisse non odio sit amet massa lobortis
                          scelerisque. Integer gravida nulla ipsum.
                        </Text>
                      </div>
                      <div>
                        <div className="w-[320px] md:h-[300px] md:w-[533px] bg-orangeLight1 rounded-lg"></div>
                      </div>
                    </div>
                  </>
                ),
              },
            ]}
          />

          <div className="mt-10 md:mt-[120px]">
            <div className="flex flex-col md:flex-row mb-[30px] gap-4">
              <Heading headingLevel={2} size={'H2'} className="font-bold ">
                Conteúdos especiais
              </Heading>{' '}
              <Text textType="a" size={'C1'} className="text-orange content-end ml-auto flex">
                Ver todos artigos
                <div className="ml-4">
                  <Image src={'/icons/VoltarIcon.svg'} height={16} width={16} className="h-4 w-4" alt="" />
                </div>
              </Text>
              {/* pode ser um botao aqui no lugar do a (depois que estiver pronto)*/}
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-8 md:h-[370px] ">
              <CardPost
                type="Tertiary"
                category={['Leitura de 3min', 'Categoria Aqui']}
                title={'Lorem ipsum dolor sit amet sectetur dolor sit'}
                subTitle={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis.'
                }
                src={'/img/Dados.svg'}
              />
              <CardPost
                type="Tertiary"
                category={['Leitura de 3min', 'Categoria Aqui']}
                title={'Lorem ipsum dolor sit amet sectetur dolor sit'}
                subTitle={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis.'
                }
                src={'/img/Dados.svg'}
              />
              <CardPost
                type="Tertiary"
                category={['Leitura de 3min', 'Categoria Aqui']}
                title={'Lorem ipsum dolor sit amet sectetur dolor sit'}
                subTitle={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis.'
                }
                src={'/img/Dados.svg'}
              />
              <CardPost
                type="Tertiary"
                category={['Leitura de 3min', 'Categoria Aqui']}
                title={'Lorem ipsum dolor sit amet sectetur dolor sit'}
                subTitle={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis.'
                }
                src={'/img/Dados.svg'}
              />
            </div>
          </div>
        </Container>
      </section>
      <GetInContact />
    </main>
  );
};

export default Home;
