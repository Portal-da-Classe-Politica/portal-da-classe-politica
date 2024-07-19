import { Container } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import dynamic from 'next/dynamic';
import { SpecialContents } from '@components/sections/SpecialContents';

const MarkdownSection = dynamic(() => import('@components/sections/MarkdownSection'), {
  ssr: false,
});

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-12 pt-4 overflow-hidden">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <MarkdownSection id={id} />

      <section className="mt-12 mb-20">
        <Container>
          <hr className="border-t-[3px] border-graMix2" />

          <SpecialContents title="Publicações relacionadasPublicações relacionadas" />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
