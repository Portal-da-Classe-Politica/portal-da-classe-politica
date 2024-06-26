'use client';

import { Constants } from '@constants';
const { loremTitle, lorem } = Constants;

import { Container, Heading, Text, TextParagraphImage } from '@base';
import { Header } from '@/components/Header';
import { GetInContact } from '@/components/sections/GetInContact';
import CardIconText from '@/components/CardIconText';
import { LineItem } from '@/components/LineItem';

const vectorData = ['1', '1', '1', '1', '1', '1'];
const vectorData2 = ['1', '1', '1', '1'];

const Page = () => {
  return (
    <main className="font-montserrat">
      <section className="pb-[45px] pt-4 bg-orange">
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Text size="S1" className="text-white font-bold">
              ENTENDA OS INDICADORES
            </Text>
            <Heading size="H1" className="text-white mt-4">
              Entenda como a plataforma exibe os dados e seus indicadores
            </Heading>
          </div>
        </Container>
      </section>
      <section className="mt-16">
        <Container className="px-0">
          <Heading headingLevel={2} size="H1" className="text-left mb-12 max-w-[50%]">
            {loremTitle}
          </Heading>
          <div className="grid grid-cols-3 gap-10">
            {vectorData.map((v, i) => {
              return <CardIconText key={'c' + i} title={'Consectetur adipiscing pendisse'} text={lorem} />;
            })}
          </div>
        </Container>
      </section>
      <section className="mt-28">
        <Container>
          <hr className="border-t-[3px] border-[#D9D9D9] mb-14" />

          <TextParagraphImage
            src="/img/Dados.svg"
            header={loremTitle}
            texts={[lorem, lorem]}
            className="mb-28"
          />

          <TextParagraphImage src="/img/Dados.svg" header={loremTitle} texts={[lorem, lorem]} reverse />

          <hr className="border-t-[3px] border-[#D9D9D9] mt-36" />
        </Container>
      </section>
      ]
      <section className="mt-20 mb-12">
        <Container>
          <Heading headingLevel={2} size="H1" className="text-left mb-12">
            {loremTitle}
          </Heading>
          <div className="flex gap-8">
            <div className="max-w-[300px]">
              {vectorData2.map((v, i) => {
                return (
                  <div key={'a' + i}>
                    <Text textType="h3" size="B2" className="font-bold">
                      Tópicos Tema 01
                    </Text>
                    <ul>
                      {vectorData2.map((v, i) => {
                        return (
                          <li className="my-2" key={'b' + i}>
                            <LineItem type="thin">
                              <Text size="B2"> Nam vulpue ipsum</Text>
                            </LineItem>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="flex-1">
              <Heading headingLevel={2} className="mb-6 font-bold" size="H2">
                Consectetur adipiscing elit suspendisse non odio
              </Heading>
              <Text size="B1">{lorem}</Text>
            </div>
          </div>
        </Container>
      </section>
      <GetInContact />
    </main>
  );
};

export default Page;
