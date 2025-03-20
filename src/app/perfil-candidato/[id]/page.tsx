import { Suspense } from 'react';

import { ButtonStyled, Container, Heading, Icon, Text } from '@base';

import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';

import { LastElectionMap } from '@components/map/LastElectionMap';
import { SpecialContents } from '@components/sections/SpecialContents';
import CandidateProfile from '@components/cadidates/CandidateProfile';
import { Divider } from '@components/Divider';
import TextBetween from '@components/base/text/TextBetween';

import { cleanString, dayjs } from '@utils';
import { CandidateService } from '@services/candidates/CandidateService';
import { formatCurrency } from '@utils/formatCurrency';

import { LastElectionsChart } from '@components/charts/LastElectionsChart';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';

import { KpiBox } from './components/KpiBox';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const candidate = await CandidateService.getCandidateById(id);
  const kpis = await CandidateService.getCandidateKpiById(id);

  const formatAge = (age: string | undefined) => {
    return age ? `${dayjs(age).age()} anos (${dayjs(age).format('DD/MM/YYYY')})` : '-';
  };

  const lastElectionState = cleanString(candidate?.ultima_unidade_eleitoral?.split('-')[0]);

  return (
    <main className="font-montserrat bg-grayMix1">
      <Suspense>
        <section className="pb-12 pt-4 relative bg-white overflow-hidden">
          <DesignSemiCircle theme="dark" />

          <Container>
            <Header style="dark" />

            <div className="flex flex-col mt-12 justify-between items-center text-center">
              <Heading size="H1" className="text-grayMix4">
                Perfil do Candidato
              </Heading>
              <Text size="S1" className="text-orange mt-8">
                Conheça o seu canditado.
              </Text>
            </div>
          </Container>
        </section>

        <section>
          <Container className="flex flex-col items-center mt-24">
            <div className="flex flex-col lg:flex-row w-full gap-8">
              <div className="w-full">
                <div className="flex w-full gap-6 flex-col xl:flex-row place-content-center">
                  <CandidateProfile candidate={candidate} />
                </div>

                <Divider type="orange" bottom="small" top="small" />
                <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-16">
                  <div className="w-full md:w-[50%] flex flex-col gap-3">
                    <TextBetween title="Nome Completo" text={candidate?.nome} />
                    <TextBetween title="Grau de Instrução" text={candidate?.grau_de_instrucao} />
                    <TextBetween title="Partido" text={candidate?.nome_atual} />
                    <TextBetween title="Coligação" text={candidate?.coligacao} />
                    <TextBetween
                      title="Bens declarados na última eleição disputada"
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
                <div className="mt-10 grid grid-cols-2 gap-4 ">
                  {kpis?.map((kpi, idx) => {
                    return kpi.value !== '' ? (
                      <div key={idx} className="">
                        <KpiBox kpi={kpi} variant="orange" />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="mt-20">
          <Container className="flex flex-col items-center">
            <LastElectionsChart title="Histórico de Votações" candidateId={id} />
          </Container>
        </section>

        <section className="mt-8">
          <Container className="flex flex-col items-center">
            <div
              className={`flex flex-col w-full max-h-[800px] p-4 md:p-12 bg-white drop-shadow-lg rounded-lg`}
            >
              <Heading headingLevel={2} className="text-grayMix4 my-4">
                Mapa da votação da última eleição disputada
              </Heading>
              <LastElectionMap state={lastElectionState} candidateId={id} />
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
