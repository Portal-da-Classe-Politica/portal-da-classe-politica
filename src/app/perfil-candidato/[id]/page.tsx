'use client';

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';

import { GetInContact } from '@/components/sections/GetInContact';
import { MapComponent } from '@/components/map/MapComponent';
import { SpecialContents } from '@/components/sections/SpecialContents';

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
