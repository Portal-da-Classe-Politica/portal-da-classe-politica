import { Container, Heading } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { CardPost } from '@components/CardPost';
import { Divider } from '@components/Divider';
import dynamic from 'next/dynamic';
import DesignSemiCircle from '@components/DesignSemiCircle';
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

      <section className="pb-12 pt-12 md:pt-32">
        <Container className="flex flex-col items-center">
          <div className="flex flex-col h-full md:flex-row gap-4 md:gap-14">
            <div className="h-[370px] md:h-[480px]">
              <CardPost
                alt={' Eleição 2024: A Persistente Sub-Representação de Mulheres na Política'}
                category={['Leitura de 5min']}
                customHeight={250}
                title={'Eleição 2024: A Persistente Sub-Representação de Mulheres na Política'}
                subTitle={
                  'Partidos controlam recursos políticos vitais e desde 2009, devem investir 5% do Fundo Partidário anual para fomentar a participação feminina na política.'
                }
                src={'/img/blog/mic.png'}
                type="Primary"
                href="/blog/reputacao-mulher"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="md:h-[227px]">
                <CardPost
                  alt={
                    'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
                  }
                  type="Secondary"
                  category={['Leitura de 5min']}
                  customHeight={90}
                  title={
                    'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
                  }
                  src={'/img/blog/smile.png'}
                  href="/blog/promo-part"
                />
              </div>
              <div className="md:h-[227px]">
                <CardPost
                  alt={
                    'A participação feminina na liderança partidária e o cumprimento das cotas financeiras para mulheres '
                  }
                  type="Secondary"
                  category={['Leitura de 5min']}
                  customHeight={90}
                  title={
                    'A participação feminina na liderança partidária e o cumprimento das cotas financeiras para mulheres '
                  }
                  src={'/img/blog/airplane.png'}
                  href="/blog/part-fem-lid"
                />
              </div>
            </div>
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
