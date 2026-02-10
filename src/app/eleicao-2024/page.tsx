import Image from 'next/image';

import { Container, Heading, Icon, Text, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { ChipContainer } from '@components/ChipContainer';
import CardIconText from '@components/CardIconText';
import Timeline from '@components/timeline/Timeline';
import Link from 'next/link';
import { SpecialContents } from '@components/sections/SpecialContents';
import { WordPressBlogService } from '@services/blog/WordPressBlogService';
import { getBlogPostUrl } from '@utils/blogUrl';

// Force dynamic rendering to avoid build-time WordPress API calls
export const dynamic = 'force-dynamic';

const cardIconTexts = [
  {
    title: 'Partidos e igualdade de gênero',
    icon: <Icon type="One" />,
    text: 'Dos 23 partidos com representação na Câmara dos Deputados, apenas 14 possuem em seus estatutos alguma menção ao princípio de não discriminação e/ou igualdade de gênero. São eles: CIDADANIA, NOVO, PCdoB, PDT, PL, PODE, PSC, PSDB, PSOL, PT, PTB, PV, REDE e REPUBLICANOS.',
  },
  {
    title: 'Partidos e cotas para mulheres',
    icon: <Icon type="Two" />,
    text: 'Nesse mesmo grupo, apenas nove siglas adotam um sistema de quotas ou de reserva de vagas por gênero nas suas Comissões Executivas Nacionais – CIDADANIA, PCdoB, PDT, PSB, PSC, PSDB, PSOL, PT e PV.',
  },
  {
    title: 'Custo financeiro da desigualdade de gênero em 2022',
    icon: <Icon type="Three" />,
    text: 'Segundo dados do Tribunal Superior Eleitoral (TSE), 139 milhões de reais deixaram de ser destinados às candidatas mulheres nas eleições de 2022.',
  },
  {
    title: 'Incentivando a desigualdade de gênero',
    icon: <Icon type="Four" />,
    text: 'De acordo com TSE, 40% dos partidos não cumpriram com a destinação da cota mínima de 30% do financiamento público para mulheres.',
  },
  {
    title: 'Indicador de desigualdade de gênero',
    icon: <Icon type="Five" />,
    text: 'As mulheres representaram 29,4% do total de dirigentes estaduais dos partidos brasileiros, nos anos de 2021 e 2022 (Schaefer et al 2024).',
  },
];

const Page = async () => {
  // Buscar os 2 posts mais recentes do WordPress
  let firstPost, secondPost;
  try {
    const posts = await WordPressBlogService.getAllFormatted();
    [firstPost, secondPost] = posts.slice(0, 2);
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    // Continue rendering without posts
  }
  return (
    <main className="font-montserrat bg-grayMix3">
      <section className="pb-12 pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <section className="mt-16">
        <Container>
          <div className="mb-8">
            <ChipContainer>Eleições 2024</ChipContainer>
          </div>

          <Heading>Eleições 2024: A Persistente Sub-Representação de Mulheres na Política</Heading>

          <div className="flex flex-col md:flex-row mt-8 ">
            <div className="flex flex-col md:flex-row mb-3 md:mb-0">
              <Text size="B1">Autor:</Text>
              <Text size="B1" className="font-bold md:ml-1">
                Maria Cecília Eduardo e Karolina Roeder
              </Text>
            </div>
            <div className="flex md:ml-2">
              <Text size="B1">Data de publicação:</Text>
              <Text size="B1" className="font-bold ml-1">
                20 de fevereiro de 2024
              </Text>
            </div>
          </div>

          <div className="mt-8 mx-auto">
            <div className="w-full h-[400px] relative">
              <Image
                src="/img/blog/mic.png"
                className="rounded-[10px] object-cover"
                fill
                alt="foto microfone"
              />
            </div>
          </div>

          <div className="mt-8">
            <Text size="B1" className="mt-8">
              Apesar dos avanços, a sub-representação feminina na política persiste. Este texto examina as
              razões históricas, culturais e estruturais por trás dessa desigualdade. Desde os séculos XVII e
              XVIII, a divisão entre esferas pública e privada, moldada por pensadores como John Locke e
              Jean-Jacques Rousseau, confinou as mulheres ao espaço doméstico, excluindo-as da política.
            </Text>
            <Text size="B1" className="mt-6">
              O capital homossocial, ou a rede de contatos predominantemente masculina, também impede a
              inclusão feminina. Normas políticas liberais, embora pregando igualdade, muitas vezes não
              abordam barreiras específicas enfrentadas por mulheres, perpetuando a desigualdade.
            </Text>
            <Text size="B1" className="mt-6">
              Medidas como cotas de gênero e campanhas de conscientização têm sido implementadas para mitigar
              essas disparidades, mas é crucial uma abordagem mais crítica e inclusiva. A verdadeira
              democracia exige a participação equitativa das mulheres, rompendo com tradições excludentes e
              promovendo uma representação política mais justa e representativa.
            </Text>
            <Link target="_self" href={getBlogPostUrl('158')}>
              <Text size="B1" className="mt-6 text-orange">
                Leia mais
              </Text>
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          {firstPost && (
            <TextParagraphImage
              link={firstPost.link}
              src={firstPost.img}
              header={firstPost.title}
              texts={[firstPost.description]}
              className="mb-28"
            />
          )}

          {secondPost && (
            <TextParagraphImage
              link={secondPost.link}
              src={secondPost.img}
              header={secondPost.title}
              texts={[secondPost.description]}
              reverse
            />
          )}
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Heading headingLevel={2} size="H1" className="text-center">
            Análise da Participação Feminina nas Eleições Municipais
          </Heading>

          <Text size="B1" className="mt-6">
            A evolução da participação das mulheres nas eleições para o cargo de vereadora no Brasil mostra um
            crescimento constante, mas lento, desde 1992. Naquele ano, as mulheres representavam apenas 7,4%
            do total de eleitos. Esse percentual aumentou para 11,2% em 1996 e continuou subindo de forma
            gradual ao longo dos anos. Em 2020, as mulheres alcançaram 16% dos cargos de vereadora, o maior
            percentual já registrado. Este progresso é significativo, mas ainda revela uma sub-representação
            feminina na política municipal, considerando que elas compõem mais de 50% da população brasileira.
          </Text>
          <Text size="B1" className="mt-6">
            Essa linha do tempo nos permite observar as mudanças ocorridas ao longo das últimas décadas e
            refletir sobre os desafios que ainda persistem. Apesar das conquistas, a participação feminina na
            política é frequentemente limitada por barreiras culturais e institucionais que precisam ser
            enfrentadas. Medidas como a distribuição proporcional de recursos de campanha e o incentivo à
            candidatura de mulheres são passos importantes para alcançar uma representação mais equitativa e
            democrática nas Câmaras Municipais. A análise desses dados reforça a necessidade de continuar
            promovendo políticas de inclusão que garantam uma participação mais significativa das mulheres na
            política brasileira.
          </Text>
          <div className="mt-12 md:mt-24 text-center">
            <Timeline
              className="mt-16"
              items={[
                {
                  icons: ['One', 'Nine', 'Nine', 'Two'],
                  text: 'A participação feminina era de apenas 7,4%',
                },
                {
                  icons: ['One', 'Nine', 'Nine', 'Six'],
                  text: 'A participação feminina vai a 11,2%',
                },
                {
                  icons: ['Two', 'Zero', 'Zero', 'Zero'],
                  text: 'A participação feminina atinge 11,6%',
                },
                {
                  icons: ['Two', 'Zero', 'Zero', 'Four'],
                  text: 'A participação feminina chega a 12,65%A participação feminina chega a 12,65%',
                },
                {
                  icons: ['Two', 'Zero', 'Zero', 'Eight'],
                  text: 'A participação feminina declina para 12,51%',
                },
                {
                  icons: ['Two', 'Zero', 'One', 'Two'],
                  text: 'A participação feminina vai a 13,3%',
                },
                {
                  icons: ['Two', 'Zero', 'One', 'Six'],
                  text: 'A participação feminina atinge 13,5%',
                },
                {
                  icons: ['Two', 'Zero', 'Two', 'Zero'],
                  text: 'A participação feminina alcança 16%',
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Heading headingLevel={2} size="H1" className="mb-8">
            Insights sobre a participação feminina na política
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cardIconTexts.map((v, i) => {
              return (
                <CardIconText
                  customIcon={
                    <>
                      {v?.icon}
                      <div className="icon-o">
                        <Icon type="O" />
                      </div>
                    </>
                  }
                  key={'c' + i}
                  title={v.title}
                  text={v.text}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="mt-20 mb-20">
        <Container>
          <hr className="border-t-[3px] border-graMix2" />

          <SpecialContents title="Publicações relacionadas" />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
