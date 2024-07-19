import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import Image from 'next/image';
import { Divider } from '@components/Divider';
import { SpecialContents } from '@components/sections/SpecialContents';
import Avatar from '@components/Avatar';

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-12  pt-4 overflow-hidden">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <section className="pb-2 pt-12">
        <Container className="flex flex-col items-center">
          <Heading size="H2" className="font-bold">
            A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos
          </Heading>
          <Text size="C1" className="ml-auto mb-4">
            Karolina Roeder
          </Text>
          <Text className="mb-3">
            Os partidos políticos controlam os principais recursos presentes hoje na política: além de cargos
            no Executivo e Legislativo, eles recrutam, selecionam candidatos e distribuem todo o dinheiro
            público que é destinado às eleições e à formação política. Os partidos brasileiros são obrigados,
            desde 2009, a destinar ao menos 5% do Fundo Partidário anual à criação e manutenção de programas
            que incentivem a participação de mulheres na política.
          </Text>
          <Text className="mb-3">
            A partir de 2015 há uma mudança gradativa na legislação para que esse recurso seja gerido pela
            secretaria da mulher do partido ou instituto presidido por ela, tendo CNPJ próprio e autonomia em
            relação às decisões partidárias. Apesar de haver incentivo na legislação, não há obrigação
            expressa de os partidos criarem esse tipo de órgão intrapartidário. Pesquisas futuras podem
            analisar se as agremiações possuem essas seções internas em sua estrutura. Para sabermos primeiro
            se os partidos distribuem os recursos para a promoção da participação da mulher na política,
            analisamos as prestações de contas anuais de dez partidos políticos, de 1996 a 2021
          </Text>
          <Text className="mb-3">
            Os partidos políticos são obrigados, além das prestações de contas eleitorais, a realizar a
            prestação de contas de seus recursos próprios e do Fundo Partidário anualmente. Essas despesas são
            relativas à manutenção da organização. Até 2015 as prestações do órgão nacional dos partidos eram
            entregues fisicamente ao TSE e os dados para essa pesquisa foram obtidos a partir da coleta física
            no TSE e extração desses dados dos relatórios. De 2016 a 2021 estavam disponíveis no Portal de
            Dados Abertos do TSE. Após a coleta e organização dos dados, buscamos aqueles que mencionassem
            “mulher” na prestação.
          </Text>
          <Text className="mb-3">
            Foi somente em 2009, ano da promulgação da lei complementar, que um partido destinou recursos para
            esse fim, o PSB (1,3%). Já em 2010, três partidos destinaram (PT com 0,6%; PSB com 4,3% e PV com
            5,9%) e apenas o PV acima do mínimo. No gráfico 1 abaixo estão os percentuais por ano, de cada
            partido:
          </Text>
          <Text size={'C1'} className="mb-4 w-full">
            Gráfico 1. Percentual do Fundo Partidário destinado à promoção da participação de mulheres, por
            partido
          </Text>
          <p className="mb-2">
            <Image
              src="/img/blog/image1.png"
              width={1300}
              height={400}
              alt="Grafico investimento em piliticas para participação de mulheres"
            />
          </p>
          <Text size={'C2'} className="w-full mb-1">
            Fonte: Prestação de contas anual partidária disponível no Tribunal Superior Eleitoral
          </Text>
          <Text size={'C2'} className="mb-3">
            <span>
              Notas: Os dados de 2017 e 2018 divulgados pelo TSE estão sem a categoria de origem das receitas,
              o que impossibilitou a análise por fonte. Estão ausentes os valores do PPS 2003; PDT 2004, 2005
              e 2007 por não estarem disponíveis no Arquivo do TSE. Todos os valores abaixo de 1% foram
              retirados do gráfico para melhor visualização dos dados. A base de dados está disponível para
              consulta no link:
            </span>
            <span>
              <a
                className="underline text-orange ml-2 hover:text-orangeDark2"
                target="_blank"
                href="https://www.google.com/url?q=https://osf.io/pjkxv/files/osfstorage/65d3e2476c2a400645187a47&amp;sa=D&amp;source=editors&amp;ust=1720886571235971&amp;usg=AOvVaw3P4ajrIm_NaxpDv7RjuE4Y"
              >
                https://osf.io/pjkxv/files/osfstorage/65d3e2476c2a400645187a47
              </a>
            </span>
          </Text>
          <Text className="mb-3">
            Há uma variação considerável nas proporções, como o alto investimento (19 e 22%) do PL em 2020 e
            2021, e nulo nos dois anos anteriores. A partir de 2019 o PT passa a investir mais que 5%, mas nos
            anos anteriores é ínfimo o repasse. O não cumprimento generalizado do repasse pode ser fruto da
            previsão de anistia, como a que ocorreu em 2022, na Emenda Constitucional n. 117 de 2022. Essa
            mesma EC inseriu na constituição o repasse mínimo de 5% do FP à criação e manutenção de programas
            que promovam a participação de mulheres na política e perdoou todos os partidos que não tinham
            cumprido essa regra até aquele momento
            <sup className=" text-orange ml-2 hover:text-orangeDark2">
              <a href="#ftnt1" id="ftnt_ref1">
                [1]
              </a>
            </sup>
          </Text>
          <Text className="mb-3">
            Os incentivos institucionais, mais presentes na última década, pressionam a elite partidária -
            predominantemente branca e masculina - a mudar a sua atuação. Contudo, alguns estudos já têm
            mostrado que os partidos acabam subvertendo as regras formais para continuar o jogando da forma
            com que sempre jogaram. O uso de candidaturas fictícias (laranjas), de comissões provisórias para
            diminuir a supervisão da seleção dos candidatos (as) e, como no caso citado acima, auto anistia em
            caso de não cumprimento do repasse de recursos demonstram como os aspectos informais se sobrepõem
            aos formais. As regras informais que atuam sobre o comportamento dos indivíduos e partidos
            demandam mais investigações.
          </Text>
          <Heading headingLevel={2} size={'H5'} className="w-full mb-3 font-bold">
            Resumo
          </Heading>
          <Text className="mb-3">
            Os partidos políticos desempenham um papel crucial na política, controlando recursos importantes
            como cargos, seleção de candidatos (as) e financiamento. Desde 2009, a legislação brasileira
            obriga os partidos a destinar pelo menos 5% do Fundo Partidário anual para incentivar a
            participação das mulheres na política. Desde 2015, essa lei tem sido aprimorada, exigindo que os
            recursos fossem geridos por secretarias de mulheres ou institutos liderados pela secretaria. Ainda
            que o repasse seja obrigatório, os partidos cumprem essa regra apenas parcialmente, no período de
            2009 a 2021. A anistia dada pelos partidos a eles próprios, no caso do não cumprimento da lei, é
            uma forma de subverter as regras formais que buscam incluir mais mulheres na política. Enquanto
            isso, o papel de formação política acaba sendo ocupado por organizações sociais e think tanks.
          </Text>
          <Heading headingLevel={3} size={'H5'} className="w-full font-bold mb-3">
            Leia o capítulo completo do livro Gênero e Eleições:
          </Heading>
          <p className="w-full">
            Roeder, Karolina. A distribuição de recursos partidários para a promoção da participação política
            das mulheres. Gênero e Eleições . 2024. No prelo.
          </p>
          <Divider bottom="small" top="verysmall" type="orange" />
          <div className="w-full">
            <Text size="C1">
              <a href="#ftnt_ref1" id="ftnt1" className=" text-orange hover:text-orangeDark2">
                [1]
              </a>
              E o mínimo de 30% do FEFC e da parcela do Fundo Partidário destinada às eleições para campanhas
              de candidatas mulheres.
            </Text>
          </div>
          <div className="w-full mt-6">
            <Avatar
              type="left"
              src="/img/author/karolina.png"
              title="Karolina Roeder"
              text=" Doutora em Ciência Política pela UFPR, professora de Ciência Política na UNINTER e pesquisadora do INCT Representação e Legitimidade Democrática ReDem. Pesquisa partidos políticos, estrutura, financiamento e atualmente tem como foco o impacto de instituições formais e informais na representação de mulheres na política."
            />
          </div>
        </Container>
      </section>
      <section className="mt-6 mb-20">
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
