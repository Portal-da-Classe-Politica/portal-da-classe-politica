'use client';

import { Container, Heading, Text } from '@base';

import { Header } from '@components/sections/Header';
import { BoxImageText } from '@components/box/BoxImageText';
import { GetInContact } from '@components/sections/GetInContact';
import { SpecialContents } from '@components/sections/SpecialContents';

const cards = [
  { text: 'Perfil dos Candidatos', src: '/img/consulta/Profile.png' },
  { text: 'Resultados das Eleições', src: '/img/consulta/Chart.png ' },
  { text: 'Perfil dos Eleitores', src: '/img/consulta/Search.png ' },
  { text: 'Filiação Partidária', src: '/img/consulta/ShakeHand.png' },
  { text: 'Financiamento de Campanha', src: '/img/consulta/Coin.png ' },
  { text: 'Mapas Eleitorais', src: '/img/consulta/Brazil.png ' },
  { text: 'Pesquisas Eleitorais', src: '/img/consulta/PieChart.png  ' },
];

const Page = () => {
  return (
    <main className="font-montserrat">
      <section className="bg-white pb-[45px] pt-4">
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
        <Container className="mb-12">
          <div className="flex justify-center md:justify-normal flex-wrap gap-8">
            {cards.map((card, idx) => (
              <BoxImageText key={idx} text={card.text} src={card.src} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-grayMix1">
        <Container className="pt-16">
          <h1>asdas</h1>
        </Container>
      </section>

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
