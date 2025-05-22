import { Header } from '@components/sections/Header';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Container } from '@base/Container';
import { TextParagraph } from '@base/text';

const Page = () => {
  return (
    <main className="font-montserrat bg-orange">
      <section className="pb-12 relative pt-4 overflow-hidden">
        <DesignSemiCircle />
        <Container>
          <Header style="light" />
        </Container>
      </section>

      <section className="pb-12 pt-12 md:pt-16 bg-white">
        <Container className="flex flex-col items-center">
          <TextParagraph
            title={'Lorem ipsum dolor sit amet'}
            texts={[
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            ]}
          />

          <iframe
            src="/docs/documentacao-site-portal.pdf#toolbar=0"
            width="100%"
            height="600px"
            className="border border-gray-300 mt-16 bg-white"
            title="Documento PDF"
            style={{ backgroundColor: 'white' }}
          ></iframe>
        </Container>
      </section>
    </main>
  );
};

export default Page;
