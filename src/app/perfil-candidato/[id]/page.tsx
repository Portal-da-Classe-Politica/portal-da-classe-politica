import { Suspense } from 'react';

import { ButtonStyled, Container, Heading, Icon, Text } from '@base';

import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';

import { MapComponent } from '@components/map/MapComponent';
import { SpecialContents } from '@components/sections/SpecialContents';
import CandidateProfile from '@components/cadidates/CandidateProfile';
import { Divider } from '@components/Divider';
import TextBetween from '@components/base/text/TextBetween';
import { BoxData } from '@components/box/BoxData';
import { ChipContainer } from '@components/ChipContainer';

import { cleanString, dayjs } from '@utils';
import { CandidateService } from '@services/candidates/CandidateService';
import { formatCurrency } from '@utils/formatCurrency';

import { LastElectionsChart } from '@components/charts/LastElectionsChart';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const candidate = await CandidateService.getCandidateById(id);

  const formatAge = (age: string | undefined) => {
    return age ? `${dayjs(age).age()} anos (${dayjs(age).format('DD/MM/YYYY')})` : '-';
  };

  const parseCoalitions = (coalitions: string | undefined) => {
    return coalitions ? coalitions.split('/').map(cleanString) : [];
  };

  const coalitions = parseCoalitions(candidate?.coligacao);
  const lastElectionState = cleanString(candidate?.ultima_unidade_eleitoral?.split('-')[0]);

  return (
    <main className="font-montserrat bg-grayMix1">
      <Suspense>
        <section className="pb-[45px] pt-4 bg-white">
          <Container>
            <Header style="dark" />

            <div className="flex flex-col mt-12 justify-between items-center text-center">
              <Heading size="H1" className="text-grayMix4">
                Consectetur adipiscing elit Suspendisse non odio
              </Heading>
              <Text size="S1" className="text-orange mt-8">
                Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis.
              </Text>
            </div>
          </Container>
        </section>

        <section>
          <Container className="flex flex-col items-center mt-24">
            <div className="flex flex-col lg:flex-row w-full gap-8">
              <div className="w-full">
                <div className="flex gap-6 flex-col xl:flex-row">
                  <CandidateProfile src={'/img/Person.png'} candidate={candidate} />
                  <div>
                    <Text textType="h2" size="B1" className="mb-2 font-bold">
                      Coligações
                    </Text>
                    <div className="flex flex-wrap mt-2 gap-2 mb-2">
                      {coalitions.map(coalition => (
                        <ChipContainer
                          key={coalition}
                          type={
                            candidate?.nome_atual === coalition || candidate?.sigla_partido === coalition
                              ? 'full'
                              : 'ghost'
                          }
                          className="!mr-0"
                        >
                          {coalition}
                        </ChipContainer>
                      ))}
                    </div>
                  </div>
                </div>
                <Divider type="orange" bottom="small" top="small" />
                <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-16">
                  <div className="w-full md:w-[50%] flex flex-col gap-3">
                    <TextBetween title="Nome Completo" text={candidate?.nome} />
                    <TextBetween title="Grau de Instrução" text={candidate?.grau_de_instrucao} />
                    <TextBetween title="Partido" text={candidate?.nome_atual} />
                    <TextBetween title="Coligação" text={candidate?.coligacao} />
                    <TextBetween
                      title="Bens Declarados"
                      text={candidate?.bens_declarados ? formatCurrency(candidate?.bens_declarados) : '-'}
                    />
                  </div>
                  <div className="w-full md:w-[50%] flex flex-col gap-3">
                    <TextBetween title="Gênero" text={candidate?.genero} />
                    <TextBetween title="Cor/Raça" text={candidate?.raca} />
                    <TextBetween title="Idade" text={formatAge(candidate?.data_nascimento)} />
                    <TextBetween title="Cidade de Nascimento" text={candidate?.cidade_nascimento} />
                    <TextBetween title="Ocupação" text={candidate?.ocupacao} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-10 justify-center justify-items-center">
                  <div className="h-[190px] w-[210px]">
                    <BoxData
                      content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                      title="Lorem ipsum dolor"
                      header="+35,7%"
                      variant="orange"
                    />
                  </div>
                  <div className="h-[190px] w-[210px]">
                    <BoxData
                      content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                      title="Lorem ipsum dolor"
                      header="+35,7%"
                      variant="orange"
                    />
                  </div>
                  <div className="h-[190px] w-[210px]">
                    <BoxData
                      content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                      title="Lorem ipsum dolor"
                      header="+35,7%"
                      variant="orange"
                    />
                  </div>
                  <div className="h-[190px] w-[210px]">
                    <BoxData
                      content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                      title="Lorem ipsum dolor"
                      header="+35,7%"
                      variant="orange"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="mt-20">
          <Container className="flex flex-col items-center">
            <div className={`flex flex-col w-full max-h-[800px] p-12 bg-white drop-shadow-lg rounded-lg `}>
              <LastElectionsChart title="Lobortis celeris vulputate" candidateId={id} />
            </div>
          </Container>
        </section>

        <section className="mt-8">
          <Container className="flex flex-col items-center">
            <div className={`flex flex-col w-full max-h-[800px] p-12 bg-white drop-shadow-lg rounded-lg `}>
              <Heading headingLevel={2} className="text-grayMix4 my-4">
                Mapa da votação do 1º turno
              </Heading>
              <MapComponent state={lastElectionState} candidateId={id} />
            </div>
          </Container>
        </section>

        <section className="mt-4 md:mt-16 mb-8 md:mb-16">
          <Container>
            <div className="flex gap-4">
              <ButtonStyled>
                <>
                  <Icon type="Download" className="mx-2" size="xl" />
                  Baixar Cruzamentos em .PDF
                </>
              </ButtonStyled>
              <ButtonStyled>
                <>
                  <Icon type="Download" className="mx-2" size="xl" />
                  Baixar Cruzamentos em .CSV
                </>
              </ButtonStyled>
            </div>
          </Container>
        </section>

        <section className="mt-6 md:mt-20 mb-10 md:mb-20">
          <Container>
            <SpecialContents />
          </Container>
        </section>

        <GetInContact />
      </Suspense>
    </main>
  );
};

export default Page;
