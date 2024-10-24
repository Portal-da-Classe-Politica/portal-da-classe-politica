'use client';

import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { SecondLayerChart } from '@components/charts/SecondLayerChart';
import DesignSemiCircle from '@components/DesignSemiCircle';

const dataSeries = {
  electoral: {
    initial: true,
    name: 'Número Efetivo de Partidos Eleitoral',
    data: [400, 500, 800, 200, 300, 600, 700],
    color: '#FF5733', // Warm Orange
  },
  parliamentary: {
    initial: true,
    name: 'Número Efetivo de Partidos Parlamentar',
    data: [200, 400, 600, 300, 500, 700, 800],
    color: '#33FF57', // Vibrant Green
  },
  series1: {
    name: 'Índice de Fracionalização de RAE',
    data: [100, 200, 300, 400, 500, 600, 700],
    color: '#3357FF', // Bright Blue
  },
  series2: {
    name: 'Número de Partidos',
    data: [150, 250, 350, 450, 550, 650, 750],
    color: '#FF33A1', // Hot Pink
  },
  series3: {
    name: 'Variação Eleitoral Média dos Partidos',
    data: [200, 300, 400, 500, 600, 700, 800],
    color: '#FF9633', // Soft Orange
  },
  series4: {
    name: 'Índice de Volatilidade Eleitoral (Pedersen)',
    data: [250, 350, 450, 550, 650, 750, 850],
    color: '#33FFF3', // Aqua
  },
  series5: {
    name: 'Maioria Parlamentar Mínima (RAE)',
    data: [300, 400, 500, 600, 700, 800, 900],
    color: '#C733FF', // Purple
  },
  series6: {
    name: 'Índice de Laakso e Taagepera',
    data: [350, 450, 550, 650, 750, 850, 950],
    color: '#FFD133', // Golden Yellow
  },
  series7: {
    name: 'Quociente Eleitoral',
    data: [100, 450, 350, 500, 600, 750, 650],
    color: '#33A1FF', // Sky Blue
  },
  series8: {
    name: 'Quociente Partidário',
    data: [250, 700, 300, 850, 450, 600, 400],
    color: '#FF5733', // Coral
  },
} as Record<string, any>;

const Page = () => {
  return (
    <main className="font-montserrat">
      <section className="pb-12 pt-4 relative bg-orange overflow-hidden">
        <DesignSemiCircle />

        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              INDICADORES
            </Text>
            <Heading size="H1" className="text-white mt-4">
              Use os Indicadores para avaliar diferentes aspectos do cenário eleitoral ao longo do tempo.
            </Heading>
          </div>
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <SecondLayerChart
            title="Eleitorais & Partidários"
            description="São quatro instrumentos úteis para analisar e compreender a dinâmica das eleições e do sistema eleitoral."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Os indicadores podem ser visualizados simultaneamente."
            chartTitle="Dimensão eleitoral"
            series={dataSeries}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <SecondLayerChart
            title="Carreira & Representação Política"
            description="São quatro instrumentos úteis para analisar e compreender as aspirações e estratégias de carreira dos candidatos."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Os indicadores podem ser visualizados simultaneamente."
            chartTitle="Dimensão de ambição política"
            series={dataSeries}
          />
          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <SecondLayerChart
            title="Espacial de Votos"
            description="São quatro instrumentos úteis para analisar e compreender a distribuição espacial dos votos e a competitividade regional."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Os indicadores podem ser visualizados simultaneamente."
            chartTitle="Dimensão geográfica"
            series={dataSeries}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <SecondLayerChart
            title="Econômicos & Financeiros"
            description="São quatro instrumentos úteis para analisar e compreender as dinâmicas econômica e financeira das campanhas eleitorais."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Os indicadores podem ser visualizados simultaneamente."
            chartTitle="Dimensão de financiamento eleitoral"
            series={dataSeries}
          />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
