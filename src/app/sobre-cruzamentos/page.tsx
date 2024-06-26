'use client';

import { Constants } from '@constants';
const { loremTitle, lorem } = Constants;

import { Container, Heading, Text } from '@base';
import { Header } from '@/components/Header';
import { TextParagraphImage } from '@/components/base/text/TextParagraphImage';
import { GetInContact } from '@/components/sections/GetInContact';

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
        <Container>
          <Heading headingLevel={2} size="H1" className="text-left">
            {loremTitle}
          </Heading>
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

      <section className="mt-20 mb-12">
        <Container>
          <Heading headingLevel={2} size="H1" className="text-left">
            {loremTitle}
          </Heading>
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
