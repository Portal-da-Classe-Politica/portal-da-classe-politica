'use client';

import Image from 'next/image';

import { Constants } from '@constants';
const { loremTitle, lorem } = Constants;

import { Container, Heading, Icon, Text, TextParagraphImage } from '@base';
import { Header } from '@/components/sections/Header';
import { GetInContact } from '@/components/sections/GetInContact';
import { ChipContainer } from '@/components/ChipContainer';
import CardIconText from '@/components/CardIconText';
import Timeline from '@/components/timeline/Timeline';
import Avatar from '@/components/Avatar';
import { RelatedArticles } from '@/components/sections/RelatedArticles';

const cardIconTexts = ['1', '1', '1', '1', '1', '1'];

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix3">
      <section className="pb-[45px] pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <section className="mt-16">
        <Container>
          <div className="mb-8">
            <ChipContainer>Leitura 3 min</ChipContainer>
            <ChipContainer>Categoria Aqui</ChipContainer>
          </div>

          <Heading>Eleições 2024 - Lorem ipsum dolor sit amet sectetur dolor sit</Heading>

          <div className="flex mt-8">
            <div className="flex">
              <Text size="B1">Autor:</Text>
              <Text size="B1" className="font-bold ml-1">
                Matheus Alencar
              </Text>
            </div>
            <div className="flex ml-2">
              <Text size="B1">Data de publicação:</Text>
              <Text size="B1" className="font-bold ml-1">
                20 de fevereiro de 2024
              </Text>
            </div>
          </div>

          <div className="mt-8">
            <Image
              src="/img/Dados.svg"
              className="rounded-t-[10px] w-full"
              width={1300}
              height={400}
              alt=""
            />
          </div>

          <div className="mt-8">
            <Text size="B1">Legenda: Lorem ipsum dolor sit amet sectetur dolor sit.</Text>
          </div>

          <div className="mt-8">
            <Text size="B1" className="mt-8">
              {lorem}
              {lorem}
            </Text>
            <Text size="B1" className="mt-8">
              {lorem}
              {lorem}
            </Text>
            <Text size="B1" className="mt-8">
              {lorem}
              {lorem}
            </Text>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <TextParagraphImage
            src="/img/Dados.svg"
            header={loremTitle}
            texts={[lorem, lorem]}
            className="mb-28"
          />

          <TextParagraphImage src="/img/Dados.svg" header={loremTitle} texts={[lorem, lorem]} reverse />
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Heading headingLevel={2} size="H1" className="text-center">
            {loremTitle}
          </Heading>

          <Text size="B1" className="mt-6">
            {lorem}
            {lorem}
          </Text>
          <Text size="B1" className="mt-6">
            {lorem}
            {lorem}
          </Text>
          <div className="mt-12 md:mt-24 text-center">
            <Timeline
              className="mt-16"
              items={[
                {
                  title: '2015',
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
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Heading headingLevel={2} size="H1" className="mb-8">
            {loremTitle}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cardIconTexts.map((v, i) => {
              return <CardIconText key={'c' + i} title={'Consectetur adipiscing pendisse'} text={lorem} />;
            })}
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Heading headingLevel={2} size="H1" className="text-center">
            {loremTitle}
          </Heading>

          <Text size="B1" className="mt-6">
            {lorem}
            {lorem}
          </Text>
        </Container>
      </section>

      <section className="mt-20">
        <Container className="flex justify-between items-end flex-col md:flex-row gap-4">
          <Avatar
            type="left"
            src="/img/Person.png"
            title="Matheus Alencar"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio."
          />

          <div className="flex text-orange font-bold justify-center items-center">
            <Text size="C1" className="mr-2">
              Publicações do Autor
            </Text>
            <Icon type="ArrowRight" size="xs" />
          </div>
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <hr className="border-t-[3px] border-graMix2" />

          <RelatedArticles />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
