'use client';

import { Constants } from '@constants';
const { loremTitle } = Constants;

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';
import { GetInContact } from '@/components/sections/GetInContact';
import { ChartSection } from '@/components/charts/ChartSection';

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
          <Heading headingLevel={2} size="H1" className="text-left mb-12">
            {loremTitle}
          </Heading>

          <ChartSection
            title="Eleitorais & Partidários"
            description="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis."
            seriesDescription="Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio."
          />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
