import { Container } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { RelatedArticles } from '@components/sections/RelatedArticles';
import dynamic from 'next/dynamic';

const MarkdownSection = dynamic(() => import('@components/sections/MarkdownSection'), {
  ssr: false,
});

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-[45px] pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <MarkdownSection id={id} />

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
