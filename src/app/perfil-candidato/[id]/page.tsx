'use client';

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';

import { GetInContact } from '@/components/sections/GetInContact';
import { CardPost } from '@/components/CardPost';
import { MapComponent } from '@/components/map/MapComponent';

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

          <div className="mt-10 md:mt-[120px]">
            <div className="flex flex-col md:flex-row mb-[30px] gap-4">
              <Heading headingLevel={2} size={'H2'} className="font-bold ">
                Publicações relacionadas
              </Heading>
            </div>
            <div className="flex flex-col flex-wrap gap-4 items-center md:flex-row md:justify-evenly md:gap-3">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="w-[280px] h-[370px]">
                  <CardPost
                    type="Tertiary"
                    category={['Leitura de 3min', 'Categoria Aqui']}
                    title={'Lorem ipsum dolor sit amet sectetur dolor sit'}
                    subTitle={
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis.'
                    }
                    src={'/img/Dados.svg'}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
