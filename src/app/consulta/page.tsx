import { Container, Heading, Text } from '@base';

import { Header } from '@components/sections/Header';
import { BoxImageText } from '@components/box/BoxImageText';
import { GetInContact } from '@components/sections/GetInContact';
import { SpecialContents } from '@components/sections/SpecialContents';
import { ConsultSection } from './components/ConsultSection';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';

const cards = [
  { text: 'Perfil dos Candidatos', src: '/img/consulta/Head.svg', imgWidth: 130, imgHeight: 110 },
  { text: 'Resultados das Eleições', src: '/img/consulta/Chart.svg', imgWidth: 200, imgHeight: 110 },
  { text: 'Financiamento de Campanha', src: '/img/consulta/Circles.svg', imgWidth: 130, imgHeight: 110 },
];

const Page = ({ searchParams }: { searchParams: { consulta: string | undefined } }) => {
  return (
    <main className="font-montserrat">
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
          <Container className="my-12 pb-12">
            <div className="flex justify-center md:justify-normal flex-wrap gap-8">
              {cards.map((card, idx) => (
                <BoxImageText
                  key={idx}
                  text={card.text}
                  src={card.src}
                  imgClassName="pt-4"
                  imgWidth={card.imgWidth}
                  imgHeight={card.imgHeight}
                />
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
