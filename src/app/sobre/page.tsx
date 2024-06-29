'use client';

import Image from 'next/image';

import { Constants } from '@constants';
const { loremTitle, lorem } = Constants;

import { Container, Heading, Text, TextParagraph, TextParagraphImage } from '@base';
import { Header } from '@/components/Header';
import Avatar from '@/components/Avatar';
import Timeline from '@/components/timeline/Timeline';

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

const avatarMock = ['João Almeida', 'Daniel Almeida', 'Pedro Rocha'];

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

          <div className="flex flex-wrap justify-center gap-10 md:gap-20 mt-12 md:mt-24">
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

      <section className="pb-[45px] pt-12 md:pt-32 bg-white">
        <Container className="flex flex-col items-center">
          <TextParagraph title={loremTitle} texts={[lorem, lorem]} />

          <div className="mt-12 md:mt-24">
            <Image src="/img/Dados.svg" width={1300} height={400} alt="" />
          </div>

          <div className="mt-12 md:mt-24 text-center max-w-[600px]">
            <Heading size="H2" className="font-bold mb-5">
              {loremTitle}
            </Heading>
            <Text size="B1">{lorem.substring(0, 98)}</Text>
          </div>

          <div className="md:mt-24 mt-12 text-center flex flex-wrap gap-14 justify-center md:justify-normal">
            {avatarMock.map((item, i) => {
              return (
                <Avatar
                  key={i}
                  src="/img/Person.png"
                  title={item}
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio."
                />
              );
            })}
          </div>

          <TextParagraph className="md:mt-24 mt-12" title={loremTitle} texts={[lorem, lorem, lorem, lorem]} />

          <div className="mt-12 md:mt-24 text-center">
            <Timeline
              items={[
                {
                  title: '2014',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio.',
                },

                {
                  title: '2018',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio.',
                },
                {
                  title: '2020',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio.',
                },
                {
                  title: '2023',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio.',
                },
                {
                  title: '2025',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio.',
                },
              ]}
            />
          </div>

          <div className="mt-12 md:mt-24 mb-12 md:mb-48">
            <TextParagraphImage src="/img/Dados.svg" header={loremTitle} texts={[lorem]} />
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Page;
