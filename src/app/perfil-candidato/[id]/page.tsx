import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';

import { GetInContact } from '@components/sections/GetInContact';
import { MapComponent } from '@components/map/MapComponent';
import { SpecialContents } from '@components/sections/SpecialContents';
import CandidateProfile from '@components/cadidates/CandidateProfile';
import LastElection from '@components/LastElection';
import { Divider } from '@components/Divider';
import TextBetween from '@components/base/text/TextBetween';
import { BoxData } from '@components/box/BoxData';
import CandidateAdversary from '@components/cadidates/CandidateAdversary';
import { ChipContainer } from '@components/ChipContainer';
import CandidateFinance from '@components/cadidates/CandidateFinance';
import ArrowItem from '@components/ArrowItem';

import { cleanString, dayjs } from '@utils';
import { CandidateService } from '@services/candidates/CandidateService';
import { formatCurrency } from '@utils/formatCurrency';

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
            <div className="w-full lg:w-[75%]">
              <div className="flex gap-6 flex-col xl:flex-row">
                <CandidateProfile src={'/img/Person.png'} candidate={candidate} />
                <LastElection />
              </div>
              <Divider type="orange" bottom="small" top="small" />
              <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-16">
                <div className="w-full md:w-[50%] flex flex-col gap-3">
                  <TextBetween title="Nome Completo" text={candidate?.nome} />
                  <TextBetween title="Grau de Instrução" text={candidate?.grau_de_instrucao} />
                  <TextBetween title="Partido" text={candidate?.sigla} />
                  <TextBetween title="Coligação" text={candidate?.coligacao} />
                  <TextBetween
                    title="Bens Declarados"
                    text={candidate?.bens_declarados ? formatCurrency(candidate?.bens_declarados) : '-'}
                  />
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-3">
                  <TextBetween title="Número do Partido" text="---" />
                  <TextBetween title="Ocupação" text={candidate?.ocupacao} />
                  <TextBetween title="Gênero" text={candidate?.genero} />
                  <TextBetween title="Cor/Raça" text={candidate?.raca} />
                  <TextBetween title="Idade" text={formatAge(candidate?.data_nascimento)} />
                  <TextBetween title="Cidade de Nascimento" text="---" />
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
                </div>{' '}
                <div className="h-[190px] w-[210px]">
                  <BoxData
                    content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                    title="Lorem ipsum dolor"
                    header="+35,7%"
                    variant="orange"
                  />
                </div>{' '}
                <div className="h-[190px] w-[210px]">
                  <BoxData
                    content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                    title="Lorem ipsum dolor"
                    header="+35,7%"
                    variant="orange"
                  />
                </div>
              </div>
              <div>grafico</div>
            </div>
            <div className="w-full lg:w-[25%]">
              <Text textType="h2" size="B1" className="mb-10 font-bold">
                Candidatos Adversários
              </Text>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-6 mb-6">
                <CandidateAdversary
                  name="Sergio Nakatani"
                  political="PT"
                  vice="Masanobu Nakatan"
                  src="/img/Person.png"
                />
                <CandidateAdversary
                  name="Sergio Nakatani"
                  political="PT"
                  vice="Masanobu Nakatan"
                  src="/img/Person.png"
                />
                <CandidateAdversary
                  name="Sergio Nakatani"
                  political="PT"
                  vice="Masanobu Nakatan"
                  src="/img/Person.png"
                />
              </div>

              <Text textType="h2" size="B1" className="mb-10 font-bold">
                Coligações
              </Text>
              <div className="flex flex-wrap mt-6 gap-2 mb-6">
                {coalitions.map(coalition => (
                  <ChipContainer
                    key={coalition}
                    type={candidate?.sigla === coalition ? 'full' : 'ghost'}
                    className="!mr-0"
                  >
                    {coalition}
                  </ChipContainer>
                ))}
              </div>

              <Text textType="h2" size="B1" className="mb-6 font-bold">
                Maiores Financiadores
              </Text>
              <div className="w-full flex flex-col  gap-3 mb-6">
                <CandidateFinance
                  city=" São Paulo/SP"
                  date="23/11/2023"
                  name="Matheus Pedro"
                  value="R$ 134.091.632,53"
                />
                <CandidateFinance
                  city=" São Paulo/SP"
                  date="23/11/2023"
                  name="Matheus Pedro"
                  value="R$ 134.091.632,53"
                />
                <CandidateFinance
                  city=" São Paulo/SP"
                  date="23/11/2023"
                  name="Matheus Pedro"
                  value="R$ 134.091.632,53"
                />
                <CandidateFinance
                  city=" São Paulo/SP"
                  date="23/11/2023"
                  name="Matheus Pedro"
                  value="R$ 134.091.632,53"
                />
              </div>
              <Text textType="h2" size="B1" className="mb-6 font-bold">
                Principais Causas
              </Text>
              <div className="flex flex-wrap mt-6 gap-2 mb-6">
                <ChipContainer type="ghost" className="!mr-0">
                  Saúde
                </ChipContainer>
                <ChipContainer type="ghost" className="!mr-0">
                  Educação
                </ChipContainer>
                <ChipContainer type="ghost" className="!mr-0">
                  Proteção Ambiental
                </ChipContainer>
                <ChipContainer type="ghost" className="!mr-0">
                  Caudado aos Animais
                </ChipContainer>
                <ChipContainer type="ghost" className="!mr-0">
                  Liberdade Religiosa
                </ChipContainer>
                <ChipContainer type="ghost" className="!mr-0">
                  Privatização
                </ChipContainer>
                <ChipContainer type="ghost" className="!mr-0">
                  Diminuição de Impostos
                </ChipContainer>
              </div>
              <Text textType="h2" size="B1" className="mb-6 font-bold">
                Proposta de Governo
              </Text>
              <div className="flex flex-wrap mt-6 gap-3 mb-3 md:mb-6">
                <ArrowItem>
                  <Text size="C1">Sanear as Finanças, Transparência e Melhoria da Gestão Pública</Text>
                </ArrowItem>
                <ArrowItem>
                  <Text size="C1">
                    Aumentar a efetividade nas Políticas Públicas e Promover a Elevação da Qualidade de vida
                  </Text>
                </ArrowItem>
                <ArrowItem>
                  <Text size="C1">Promover a Segurança Pública-Construir uma cultura de paz</Text>
                </ArrowItem>
                <ArrowItem>
                  <Text size="C1">Valorizar a Identidade cultural e o desenvolvimento dos esportes</Text>
                </ArrowItem>
                <ArrowItem>
                  <Text size="C1">
                    Promover um novo ciclo de desenvolvimento econômico com geração de emprego
                  </Text>
                </ArrowItem>
                <ArrowItem>
                  <Text size="C1">
                    Retomar a capacidade de investimentos em Infraestrutura para o desenvolvimento econômico e
                    social
                  </Text>
                </ArrowItem>
                <ArrowItem>
                  <Text size="C1">
                    Sustentabilidade dos recursos naturais - responsabilidade com a atual e futuras gerações
                  </Text>
                </ArrowItem>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24 mb-40">
        <Container className="flex flex-col items-center">
          <div className={`flex flex-col w-full max-h-[800px] p-4 bg-white drop-shadow-lg rounded-lg `}>
            <MapComponent state={lastElectionState} candidateId={id} />
          </div>
        </Container>
      </section>

      <section className="mt-6 md:mt-20 mb-10 md:mb-20">
        <Container>
          <hr className="border-t-[3px] border-graMix2" />
          <SpecialContents />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
