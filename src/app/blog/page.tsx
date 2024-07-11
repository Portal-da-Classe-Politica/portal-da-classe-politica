import { Container, Heading, Icon, Select, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { CardPost } from '@components/CardPost';
import { Divider } from '@components/Divider';
import { BoxIcon } from '@components/box/BoxIcon';
import { BlogService } from '@services/blog/BlogService';

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
          <div className="flex">
            <div className="w-[20%]">
              <div className="flex">
                <BoxIcon iconType="Slider" size={10} iconSize="xl" className="bg-white mr-2 text-orange" />
                <Text className="font-bold self-center"> Filtros</Text>
              </div>
            </div>
            <div className="w-[80%]">
              <div className="justify-end flex">
                {filterBlog.length > 0 && (
                  <div className="flex">
                    <Text textType="span" size="L1" className="mr-2 ">
                      Ordenar por:
                    </Text>
                    <Select
                      defaultValue="Alfabética A-Z"
                      placeholder="Alfabética A-Z"
                      options={[
                        { value: 'Alfabética A-Z', label: 'Alfabética A-Z' },
                        { value: 'Alfabética Z-A', label: 'Alfabética Z-A' },
                      ]}
                      buttonProps={{
                        style: 'ghostOrange',
                        className: 'py-[4px] px-[4px] bg-white drop-shadow-md',
                      }}
                      suffixComponent={<Icon type="ArrowDown" className="ml-2  " />}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-wrap gap-4 justify-end ">
                {filterBlog.map((values, index) => {
                  return (
                    <div className="md:h-[370px] w-[302px]" key={index}>
                      <CardPost
                        alt={values.title}
                        type="Tertiary"
                        title={values.title}
                        category={values.categories}
                        customHeight={90}
                        subTitle={values.description}
                        src={values.img}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
