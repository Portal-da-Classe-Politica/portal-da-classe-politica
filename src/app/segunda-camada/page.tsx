'use client';

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';
import { GetInContact } from '@/components/sections/GetInContact';
import { ChartSection } from '@/components/charts/ChartSection';

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
      <section className="pb-[45px] pt-4 bg-orange">
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              SUBTÍTULO AQUI
            </Text>
            <Heading size="H1" className="text-white mt-4">
              Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis.
            </Heading>
          </div>
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <ChartSection
            title="Eleitorais & Partidários"
            description="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio."
            chartTitle="Lobortis celeris vulputate mollis"
            series={dataSeries}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <ChartSection
            title="Carreira & Representação Política"
            description="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio."
            chartTitle="Lobortis celeris vulputate mollis"
            series={dataSeries}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <ChartSection
            title="Espacial de Votos"
            description="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio."
            chartTitle="Lobortis celeris vulputate mollis"
            series={dataSeries}
          />

          <hr className="border-t-[1px] border-orange mt-16" />
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <ChartSection
            title="Econômicos & Financeiros"
            description="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis."
            seriesTitle="Adicione indicadores ao gráfico:"
            seriesDescription="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio."
            chartTitle="Lobortis celeris vulputate mollis"
            series={dataSeries}
          />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
