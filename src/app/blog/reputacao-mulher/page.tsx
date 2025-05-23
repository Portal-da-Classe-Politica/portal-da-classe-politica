import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { Divider } from '@components/Divider';
import { SpecialContents } from '@components/sections/SpecialContents';
import Avatar from '@components/Avatar';
import Image from 'next/image';
import { Constants } from '@constants';
/* eslint-disable no-use-before-define */
const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-12 pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <section className="pb-2 pt-12">
        <Container className="flex flex-col items-center">
          <Heading size="H2" className="font-bold">
            A Persistente Sub-Representação de Mulheres na Política
          </Heading>
          <Text size="C1" className="ml-auto mb-4 mt-2">
            Maria Cecília Eduardo e Karolina Roeder
          </Text>
          <div
            style={{ width: '100%', maxHeight: '400px', overflow: 'hidden', borderRadius: '10px' }}
            className="mb-4"
          >
            <Image
              src={Constants.images.reputacaoMulher}
              layout="responsive"
              width={700}
              height={400}
              objectFit="cover"
              alt={'vote'}
            />
          </div>
          <Text className="mb-6 text-blog">
            Apesar dos avanços nas últimas décadas, as mulheres ainda enfrentam uma sub-representação
            significativa na política. Este texto explora as razões históricas, culturais e estruturais que
            perpetuam essa desigualdade, destacando como a divisão entre as esferas pública e privada, o
            capital homossocial e as normas políticas liberais contribuem para a exclusão das mulheres. Além
            disso, analisa as medidas que têm sido implementadas para mitigar essas desigualdades e sugere a
            necessidade de uma abordagem crítica e inclusiva para alcançar uma representação política
            verdadeiramente democrática. Apesar dos avanços nas últimas décadas, as mulheres ainda enfrentam
            uma sub-representação significativa na política.
          </Text>
          <Text className="mb-6 text-blog">
            Este texto explora as razões históricas, culturais e estruturais que perpetuam essa desigualdade,
            destacando como a divisão entre as esferas pública e privada, o capital homossocial e as normas
            políticas liberais contribuem para a exclusão das mulheres. Além disso, analisa as medidas que têm
            sido implementadas para mitigar essas desigualdades e sugere a necessidade de uma abordagem
            crítica e inclusiva para alcançar uma representação política verdadeiramente democrática.
          </Text>
          <Text className="mb-6 text-blog">
            A participação das mulheres na política é um tema que precisa ser visto sob a perspectiva da
            história e das estruturas sociais. As democracias modernas, desde os séculos XVII e XVIII, foram
            construídas com base em uma divisão clara entre o público e o privado. Pensadores como John Locke
            e Jean-Jacques Rousseau ajudaram a definir essa separação, onde o espaço privado, associado ao lar
            e à maternidade, era visto como o "universo feminino", enquanto a esfera pública, ligada à
            política e à sociedade civil, era considerada "masculina".
          </Text>
          <Text className="mb-6 text-blog">
            Essa divisão não só limitou as mulheres ao espaço doméstico, mas também desvalorizou o trabalho
            realizado nesse ambiente e reforçou estereótipos de gênero que ainda hoje dificultam a plena
            participação das mulheres na esfera pública. Os direitos e a liberdade civil, conforme defendidos
            por muitos, eram privilégios masculinos. Carole Pateman destaca que "a liberdade civil não é
            universal – é um atributo masculino e depende do direito patriarcal".
          </Text>
          <Text className="mb-6 text-blog">
            Teóricas feministas criticam a ideia de que as normas políticas liberais são neutras e universais.
            Nancy Fraser, Carole Pateman e Jane Mansbridge apontam que essas normas são baseadas em padrões
            culturais que favorecem alguns grupos sobre outros, resultando em um tratamento privilegiado para
            os homens. Na prática, a suposta neutralidade das regras políticas perpetua a desigualdade de
            gênero.
          </Text>
          <Text className="mb-6 text-blog">
            Mesmo com mudanças no modelo de organização do Estado liberal, suas instituições ainda não são
            neutras em termos de gênero. As relações desiguais entre homens e mulheres são mantidas pelas
            estruturas existentes, limitando o desenvolvimento pleno das capacidades das mulheres e sua
            autodeterminação.
          </Text>
          <Text className="mb-6 text-blog">
            Mulheres de todas as classes e etnias foram por muito tempo excluídas da participação política
            formal. Mesmo após a conquista do direito ao voto, ainda existem barreiras informais que impedem a
            paridade de participação. As desigualdades materiais e culturais perpetuadas pela dominação
            masculina continuam a ser um obstáculo para uma representação política democrática.
          </Text>
          <Text className="mb-6 text-blog">
            O conceito de capital homossocial, no campo do institucionalismo feminista, ajuda a entender a
            exclusão sistemática das mulheres em contextos em que práticas informais prevalecem. Elin
            Bjarnegård chama a atenção para as redes clientelistas, onde a confiança{' '}
          </Text>
          <Text className="mb-6 text-blog">
            é crucial e a previsibilidade é mais provável entre homens devido à importância dada ao capital
            homossocial nas redes clientelistas. Isso perpetua a exclusão das mulheres, que não são vistas
            como membros ativos nessas redes, mesmo que possuam níveis equivalentes ou superiores de capital
            cultural e social.
          </Text>
          <Text className="mb-6 text-blog">
            O capital homossocial enfatiza a tendência de homens colaborarem com outros homens em ambientes
            competitivos e instáveis, como a política. Nesses contextos, os indivíduos privilegiam as conexões
            com aqueles possuem recursos importantes, normalmente homens, e preferem colaborar com aqueles que
            lhes conferem previsibilidade. A similaridade funciona como um atalho cognitivo, nesse sentido,
            dando previsibilidade aos integrantes da rede e colaborando com a exclusão de mulheres.{' '}
          </Text>
          <Text className="mb-6 text-blog">
            Para combater essa desigualdade, medidas como a distribuição proporcional de recursos financeiros
            para candidatas mulheres, implementada no Brasil em 2018, são essenciais. Kristin Wylie mostrou
            que essa medida nivelou mais o campo de disputa e aumentou a ambição política das mulheres. No
            entanto, a distribuição de recursos ainda é controlada por partidos que muitas vezes mantêm regras
            informais com viés de gênero.
          </Text>
          <Text className="mb-6 text-blog">
            Quando um grupo dominante estabelece as normas, aqueles que não se encaixam são percebidos como
            desviantes ou inferiores. As instituições políticas, mesmo em democracias, ainda carregam um viés
            de gênero que restringe a entrada de mulheres nos espaços de decisão. Portanto, a análise da
            participação feminina na política deve considerar que as regras e dinâmicas foram estabelecidas
            sob critérios masculinos, demandando medidas específicas para reduzir as desvantagens das mulheres
            na representação política.
          </Text>
          <Text className="mb-6 text-blog">
            Em suma, o gênero molda as interações sociais nas instituições políticas, criando obstáculos
            informais que dificultam a entrada das mulheres na política. Entender a teoria da representação é
            crucial para reconhecer a importância da presença feminina no processo político.
          </Text>

          <Heading headingLevel={3} size={'H5'} className="w-full font-bold mb-3">
            Referências Bibliográficas
          </Heading>
          <p className="w-full mb-2 text-[12px]">
            Araújo, Clara. Gênero e acesso ao poder legislativo no Brasil: as cotas entre as instituições e a
            cultura. Revista Brasileira de Ciência Política, Brasília, n. 2, p. 23-59, jul.-dez. 2009.
          </p>
          <p className="w-full mb-2 text-[12px]">
            Biroli, Flávia. Gênero e Política no Noticiário das Revistas Semanais Brasileiras: ausências e
            estereótipos. Cadernos Pagu, São Paulo, v. 34, p. 269-299, 2009.{' '}
          </p>
          <p className="w-full mb-2 text-[12px]">
            Coleman, J. S. (1990) Foundations of Social Theory, Cambridge, MA, and London, UK, The Belknap
            Press of Harvard University Press.
          </p>

          <p className="w-full mb-2 text-[12px]">
            Verge, T., Claveria, S., & Waylen, G. (2017). Party office, male homosocial capital and gendered
            political recruitment. Gender and Informal Institutions, 91-114.
          </p>

          <p className="w-full mb-2 text-[12px]">
            Walby, Sylvia. Gender transformations. London: Routledge, 1997.
          </p>

          <p className="w-full mb-2 text-[12px]">
            Walby, Sylvia. The future of feminism. London: Polity Press, 2011.
          </p>

          <p className="w-full mb-2 text-[12px]">
            Young, Iris M. Justice and the Politics of Difference. Princeton: Princeton University Press,
            1990.
          </p>

          <Divider bottom="small" top="verysmall" type="orange" />

          <div className="w-full mt-6 flex lg:flex-row flex-col lg:gap-5">
            <div>
              <Avatar
                type="left"
                src="/img/author/karolina.png"
                title="Karolina Roeder"
                text=" Doutora em Ciência Política pela UFPR, professora de Ciência Política na UNINTER e pesquisadora do INCT Representação e Legitimidade Democrática ReDem. Pesquisa partidos políticos, estrutura, financiamento e atualmente tem como foco o impacto de instituições formais e informais na representação de mulheres na política."
              />
            </div>
            <div>
              <Avatar
                type="left"
                src="/img/author/maria.png"
                title="Maria Cecília Eduardo"
                text="Doutora em Ciência Política pela Universidade Federal do Paraná. Pesquisadora de pós-doutorado no INCT Representação e Legitimidade Democrática (ReDem). Interessada nos temas participação política de mulheres, financiamento de campanha e gênero e teoria política feminista."
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="mt-6 mb-20">
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
