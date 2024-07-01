'use client';

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';

import { GetInContact } from '@/components/sections/GetInContact';
import { MapComponent } from '@/components/map/MapComponent';
import { SpecialContents } from '@/components/sections/SpecialContents';
import CandidateProfile from '@/components/cadidates/CandidateProfile';
import LastElection from '@/components/LastElection';
import Divider from '@/components/Divider';
import TextBetween from '@/components/base/text/TextBetween';
import { BoxData } from '@/components/box/BoxData';
import CandidateAdversary from '@/components/cadidates/CandidateAdversary';
import { ChipContainer } from '@/components/ChipContainer';
import CandidateFinance from '@/components/cadidates/CandidateFinance';
import ArrowItem from '@/components/ArrowItem';

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-[45px] pt-4 pb-24 bg-white">
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

      <section className="mt-24 mb-40">
        <Container className="flex flex-col items-center">
          <div className={`flex flex-col w-full max-h-[800px] p-4 bg-white drop-shadow-lg rounded-lg `}>
            <MapComponent />
          </div>
        </Container>
      </section>
      <section>
        <Container className="flex flex-col items-center">
          <div className="flex w-full gap-8">
            <div className="w-[75%]">
              <div className="flex gap-6">
                <CandidateProfile src={'/img/Person.png'} />
                <LastElection />
              </div>
              <Divider type="orange" bottom="small" top="small" />
              <div className="flex justify-between gap-16">
                <div className="w-[50%] flex flex-col gap-3">
                  <TextBetween text="Nome Completo" title="Angela Alves Machado" />
                  <TextBetween text="Grau de Instrução" title="Superior Completo" />
                  <TextBetween text="Estado Civil" title="Casado(a)" />
                  <TextBetween text="Partido" title="Partido Socialismo E Liberdade" />
                  <TextBetween text="Coligação" title="PSOL/REDE" />
                  <TextBetween text="Bens Declarados" title="R$ 416.857,0R$ 416.857,0" />
                </div>
                <div className="w-[50%] flex flex-col gap-3">
                  <TextBetween text="Número do Partido" title="50 / PSOL" />
                  <TextBetween text="Ocupação" title="Administrador" />
                  <TextBetween text="Gênero" title="Feminino" />
                  <TextBetween text="Cor/Raça" title="Branca" />
                  <TextBetween text="Idade" title="25 anos (11/07/1977)" />
                  <TextBetween text="Cidade de Nascimento" title="São José dos Pinhas" />
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <BoxData
                  content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                  title="Lorem ipsum dolor"
                  header="+35,7%"
                  variant="orange"
                />
                <BoxData
                  content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                  title="Lorem ipsum dolor"
                  header="+35,7%"
                  variant="orange"
                />
                <BoxData
                  content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                  title="Lorem ipsum dolor"
                  header="+35,7%"
                  variant="orange"
                />
                <BoxData
                  content="Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis"
                  title="Lorem ipsum dolor"
                  header="+35,7%"
                  variant="orange"
                />
              </div>
              <div>grafico</div>
            </div>
            <div className="w-[25%] ">
              <Text textType="h2" size="B1" className="mb-10 font-bold">
                Candidatos Adversários
              </Text>
              <div className="flex flex-col gap-6 mb-6">
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
                <ChipContainer type="ghost" className="mr-0">
                  PSDO
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  PSDB
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Partido Verde
                </ChipContainer>
                <ChipContainer type="full" className="mr-0">
                  PSOL
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  PL
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  PDVS
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  PT
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  PDT
                </ChipContainer>
              </div>
              <Text textType="h2" size="B1" className="mb-6 font-bold">
                Maiores Financiadores
              </Text>
              <div className="w-full flex flex-col gap-3 mb-6">
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
                Maiores Financiadores
              </Text>
              <div className="flex flex-wrap mt-6 gap-2 mb-6">
                <ChipContainer type="ghost" className="mr-0">
                  Saúde
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Educação
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Proteção Ambiental
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Caudado aos Animais
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Liberdade Religiosa
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Privatização
                </ChipContainer>
                <ChipContainer type="ghost" className="mr-0">
                  Diminuição de Impostos
                </ChipContainer>
              </div>
              <Text textType="h2" size="B1" className="mb-6 font-bold">
                Maiores Financiadores
              </Text>
              <div className="flex flex-wrap mt-6 gap-3 mb-6">
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

      <section className="mt-20 mb-20">
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
