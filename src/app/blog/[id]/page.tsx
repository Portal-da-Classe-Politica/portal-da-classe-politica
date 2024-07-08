import { Container } from '@base';
import { Header } from '@components/sections/Header';

import { GetInContact } from '@components/sections/GetInContact';
import { RelatedArticles } from '@components/sections/RelatedArticles';

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-[45px] pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <section className="pb-[45px] pt-12 md:pt-32">
        <Container className="flex flex-col items-center">
          <h1>Artigo</h1>
        </Container>
      </section>

      <section className="mt-12 mb-20">
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
