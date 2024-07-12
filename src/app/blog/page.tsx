import { Container, Heading } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { CardPost } from '@components/CardPost';
import { Divider } from '@components/Divider';
import { BlogService } from '@services/blog/BlogService';
import dynamic from 'next/dynamic';
const BlogPost = dynamic(() => import('@components/sections/BlogPosts'), {
  ssr: false,
});

const Page = async () => {
  const filterBlog = await BlogService.getAllBlog();
  console.log('getblog', filterBlog);

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
          <div className="flex flex-col h-full md:flex-row gap-4 md:gap-[58px]">
            <div className="h-[370px] md:h-[480px]">
              <CardPost
                alt={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                category={['Leitura de 3min', 'Categoria Aqui']}
                customHeight={250}
                title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                subTitle={
                  'Antes de votar, confira o material informativo que preparamos com tudo que você precisa saber sobre suas opções de voto para prefeito e vereadores da sua cidade.'
                }
                src={'/img/Dados.svg'}
                type="Primary"
              />
            </div>

            <div className="flex flex-col gap-[24px]">
              <div className="md:h-[227px]">
                <CardPost
                  alt={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  type="Secondary"
                  category={['Leitura de 3min', 'Categoria Aqui']}
                  customHeight={90}
                  title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  src={'/img/Dados2.svg'}
                />
              </div>
              <div className="md:h-[227px]">
                <CardPost
                  alt={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  type="Secondary"
                  category={['Leitura de 3min', 'Categoria Aqui']}
                  customHeight={90}
                  title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
                  src={'/img/Dados2.svg'}
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
