import { Container, Heading } from '@base';
import { Header } from '@/components/Header';
import { GetInContact } from '@/components/sections/GetInContact';

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-[45px] pt-4 bg-orange">
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Heading size="H1" className="text-white font-bold">
              Fique sempre atualizado com as últimas notícias
            </Heading>
          </div>
        </Container>
      </section>

      <section className="pb-[45px] pt-12 md:pt-32">
        <Container className="flex flex-col items-center">
          <h1>Main Articles</h1>
        </Container>
      </section>

      <section className="pb-[45px] pt-12 md:pt-32">
        <Container className="flex flex-col items-center">
          <h1>Other Articles</h1>
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
