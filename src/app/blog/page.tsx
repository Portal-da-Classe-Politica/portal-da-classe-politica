import { Container, Heading } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { Divider } from '@components/Divider';
import dynamic from 'next/dynamic';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Carousel } from '@components/carousel/Carousel';

const BlogPost = dynamic(() => import('@components/sections/BlogPosts'), {
  ssr: false,
});

const Page = async () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-12 pt-4 relative bg-orange overflow-hidden">
        <DesignSemiCircle />
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Heading size="H1" className="text-white font-bold">
              Explore conhecimento eleitoral baseado em dados científicos
            </Heading>
          </div>
        </Container>
      </section>

      <section className="pb-12 pt-12 md:pt-20">
        <Container className="flex flex-col items-center">
          <div className="flex flex-col h-full md:flex-row gap-4 md:gap-14">
            <Carousel />
          </div>
          <Divider type="darkerGray" top="small" bottom="small" />
          <BlogPost />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
