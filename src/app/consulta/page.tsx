import { Container, Heading, Text } from '@base';

import { Header } from '@components/sections/Header';
import { BoxImageText } from '@components/box/BoxImageText';
import { GetInContact } from '@components/sections/GetInContact';
import { SpecialContents } from '@components/sections/SpecialContents';
import { ConsultSection } from './components/ConsultSection';
import DesignSemiCircle from '@components/DesignSemiCircle';

const cards = [
  { text: 'Perfil dos Candidatos', src: '/img/consulta/Profile.png' },
  { text: 'Resultados das Eleições', src: '/img/consulta/Chart.png ' },
  { text: 'Financiamento de Campanha', src: '/img/consulta/ShakeHand.png' },
];

const Page = ({ searchParams }: { searchParams: { consulta: string | undefined } }) => {
  return (
    <main className="font-montserrat" id="capture">
      <div className="relative">
        <section className="bg-white pb-12 pt-4 ">
          <DesignSemiCircle theme="dark" />

          <Container>
            <Header style="dark" />
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col justify-between items-center md:flex-row">
              <div className="flex flex-2 flex-col">
                <Heading size="D1" className="text-orange">
                  Explorando Dados Eleitorais
                </Heading>
                <Heading size="D2">Cruzamento e Visualização</Heading>
              </div>
              <div className="flex flex-1 pt-4 md:p-[30px]">
                <Text size="S1">
                  Utilize filtros e variáveis para criar gráficos e mapas eleitorais personalizados
                </Text>
              </div>
            </div>
          </Container>
          <Container className="my-12">
            <div className="flex justify-center md:justify-normal flex-wrap gap-8">
              {cards.map((card, idx) => (
                <BoxImageText key={idx} text={card.text} src={card.src} />
              ))}
            </div>
          </Container>
        </section>
      </div>

      <ConsultSection initialConsult={String(searchParams.consulta)} />

      <section className="bg-grayMix1">
        <Container className="pt-24 pb-28">
          <SpecialContents />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
