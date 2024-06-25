'use client';

import Image from 'next/image';

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';
import { TextParagraph } from '@/components/base/text/TextParagraph';

const headerText = [
  {
    title: '+73',
    subtitle: 'consectetur adipis',
    text: 'Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis',
  },
  {
    title: '6243',
    subtitle: 'consectetur adipis',
    text: 'Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis',
  },
  {
    title: '+179',
    subtitle: 'consectetur adipis',
    text: 'Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis',
  },
  {
    title: '140.00',
    subtitle: 'consectetur adipis',
    text: 'Consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis',
  },
];

const loremTitle = 'Consectetur adipiscing elit Suspendisse non odio';
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus tellus sed velit imperdiet, non pharetra orci volutpat. Vestibulum ultricies massa at ligula maximus, ullamcorper vestibulum enim auctor. Aenean purus felis, lobortis ultrices mi at, ultrices dignissim justo.';

const Page = () => {
  return (
    <main className="font-montserrat bg-orange">
      <section className="pb-[45px] pt-4">
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              SOBRE O PROJETO
            </Text>
            <Heading size="H1" className="text-white mt-4">
              Conheça a trajetória do REDEM e seus idealizadores
            </Heading>
          </div>

          <div className="flex justify-center gap-20 mt-24">
            {headerText.map((item, idx) => (
              <div key={idx} className="max-w-[220px]">
                <Heading size="H2" className="text-white font-bold">
                  {item.title}
                </Heading>
                <Heading size="H6" className="text-white font-bold">
                  {item.subtitle}
                </Heading>
                <Text size="B1" className="text-white">
                  {item.text}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-[45px] pt-32 bg-white">
        <Container className="flex flex-col items-center">
          <TextParagraph title={loremTitle} texts={[lorem, lorem]} />

          <div className="mt-24">
            <Image src="/img/Dados.svg" width={1300} height={400} alt="" />
          </div>

          <div className="mt-24 text-center max-w-[600px]">
            <Heading size="H2" className="font-bold">
              {loremTitle}
            </Heading>
            <Text size="B1">{lorem.substring(0, 98)}</Text>
          </div>

          <div className="mt-24 text-center">
            <p>Place Holder - Heads</p>
          </div>

          <TextParagraph className="mt-24" title={loremTitle} texts={[lorem, lorem, lorem, lorem]} />

          <div className="mt-24 text-center">
            <p>Place Holder - Images</p>
          </div>

          <div className="mt-24 mb-48">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <Image
                  src="/img/Dados.svg"
                  layout="responsive"
                  className="w-full h-auto"
                  width={50}
                  height={30}
                  alt=""
                />
              </div>
              <div className="w-full md:w-1/2 p-4">
                <h2 className="text-left text-2xl font-bold mb-4">{loremTitle}</h2>
                <p>{lorem}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Page;
