import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { SpecialContents } from '@components/sections/SpecialContents';
import Avatar from '@components/Avatar';

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
            A participação feminina na liderança partidária e o cumprimento das cotas financeiras para
            mulheres
          </Heading>
          <Text size="C1" className="ml-auto mb-4">
            Maria Cecília Eduardo
          </Text>
          <Text className="mb-3">
            A persistente sub-representação feminina na política é uma questão de grande relevância e
            complexidade. Pesquisas sobre essa temática têm apontado o financiamento de campanhas como um
            fator central na manutenção da desigualdade de gênero nesse processo. Numa disputa eleitoral, a
            maioria das mulheres enfrenta desafios mais rigorosos em comparação aos homens, recebendo menor
            apoio partidário e tendo redes de financiamento mais restritas. Além disso, muitas vezes investem
            menos recursos próprios em suas campanhas, o que limita suas chances de sucesso eleitoral.
          </Text>
          <Text className="mb-3">
            Dentro desse cenário, investigamos como a participação feminina na estrutura organizacional dos
            partidos políticos pode influenciar a distribuição de recursos financeiros de campanha a favor das
            candidatas. Evidências anteriores já indicaram que partidos com maior presença feminina tendem a
            promover maior igualdade de gênero. Além disso, a presença de mulheres em cargos de liderança
            partidária tem sido relacionada com o aumento no número de candidatas e a probabilidade de eleição
            de mulheres, variando conforme o contexto institucional.
          </Text>
          <Text className="mb-3">
            Nas eleições de 2018 e 2022, observamos um aumento significativo na centralidade dos partidos
            políticos. Esse fenômeno se evidenciou pelo fato da maior parte dos fundos mobilizados para as
            disputas eleitorais ter sido direcionada pelas lideranças partidárias. Tal fato destaca o papel
            central dos partidos na gestão e distribuição dos recursos de campanha.
          </Text>
          <Text className="mb-3">
            Nosso levantamento mostrou que a presença de mulheres na presidência estadual e na secretaria
            geral dos partidos está correlacionada a um aumento significativo nos recursos destinados às
            candidatas e na chance de os partidos cumprirem as cotas de gênero no financiamento público de
            campanha. No entanto, a representação feminina em instâncias decisórias dos partidos ainda é
            baixa, como podemos ver na tabela abaixo. No geral, as mulheres ocupam menos de um quinto do total
            de cargos analisados.
          </Text>
          <Text className="mb-3">
            Presença das mulheres nas executivas estaduais dos partidos brasileirosPresença das mulheres nas
            executivas estaduais dos partidos brasileiros
          </Text>
          <table className="table-auto">
            <thead>
              <tr className="border-y-2 border-black ">
                <th className="c23 " colSpan={1} rowSpan={1}>
                  <p className="p-1">Eleição</p>
                </th>
                <th className="c27" colSpan={1} rowSpan={1}>
                  <p className="c6">
                    <span className="c0">Cargo</span>
                  </p>
                </th>
                <th className="c29" colSpan={1} rowSpan={1}>
                  <p className="c6">
                    <span className="c0">% (n)</span>
                  </p>
                </th>
              </tr>
              <tr className="text-center">
                <td colSpan={1} rowSpan={3}>
                  <p>
                    <span>2018</span>
                  </p>
                </td>
                <td className="py-2" colSpan={1} rowSpan={1}>
                  <p>
                    <span>Presidente</span>
                  </p>
                </td>
                <td colSpan={1} rowSpan={1}>
                  <p>
                    <span>9,9 (84)</span>
                  </p>
                </td>
              </tr>
              <tr className="text-center">
                <td className="py-2" colSpan={1} rowSpan={1}>
                  <p>Secretária</p>
                </td>
                <td colSpan={1} rowSpan={1}>
                  <p>
                    <span>16,7 (141)</span>
                  </p>
                </td>
              </tr>
              <tr className="border-b-2 border-black text-center">
                <td className="py-2" colSpan={1} rowSpan={1}>
                  <p className="c6">
                    <span className="c0">Tesoureira</span>
                  </p>
                </td>
                <td className="c28" colSpan={1} rowSpan={1}>
                  <p className="c12">
                    <span className="c0">22,5 (190)</span>
                  </p>
                </td>
              </tr>
              <tr className="text-center">
                <td colSpan={1} rowSpan={3}>
                  <p>
                    <span>2022</span>
                  </p>
                </td>
                <td className="py-2" colSpan={1} rowSpan={1}>
                  <p>
                    <span>Presidente</span>
                  </p>
                </td>
                <td colSpan={1} rowSpan={1}>
                  <p>
                    <span>11,8 (81)</span>
                  </p>
                </td>
              </tr>
              <tr className="text-center">
                <td className="py-2" colSpan={1} rowSpan={1}>
                  <p>Secretária</p>
                </td>
                <td colSpan={1} rowSpan={1}>
                  <p>
                    <span>19,6 (135)</span>
                  </p>
                </td>
              </tr>
              <tr className="border-b-2 border-black text-center">
                <td className="py-2" colSpan={1} rowSpan={1}>
                  <p>
                    <span>Tesoureira</span>
                  </p>
                </td>
                <td colSpan={1} rowSpan={1}>
                  <p>
                    <span>23 (158)</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan={3} rowSpan={1}>
                  <Text size="C1" className="mt-2 mb-3">
                    <span>Fonte: Portal de dados abertos do TSE (elaboração própria).</span>
                  </Text>
                </td>
              </tr>
            </thead>
          </table>
          <Text className="mb-3">
            Esse panorama reflete a necessidade urgente de transformar a cultura política e as estruturas
            partidárias para promover a inclusão e a igualdade de gênero, garantindo que as mulheres tenham as
            mesmas oportunidades de competir e vencer nas eleições. A mudança começa com a reestruturação
            interna dos partidos e o comprometimento com a diversidade e a inclusão, para que possamos avançar
            rumo a uma representação política mais equitativa e justa para as mulheres.
          </Text>
          <Heading headingLevel={2} size="H5" className="w-full font-bold mb-3">
            Resumo
          </Heading>
          <Text className="mb-3">
            Na disputa eleitoral, mulheres, em geral, enfrentam desafios mais rigorosos em comparação aos
            homens, recebendo menor apoio partidário e possuindo redes de financiamento mais restritas. Este
            texto mostra como a participação feminina na estrutura organizacional partidária pode atuar como
            um catalisador da representação política de mulheres por meio da distribuição de recursos
            financeiros de campanha.
          </Text>
          <Text className="mb-3">
            Os dados analisados apontam que diretórios estaduais nos quais mulheres ocuparam a presidência ou
            a secretaria geral destinaram mais recursos públicos eleitorais às suas candidatas. Além disso, a
            presença feminina nesses cargos aumenta a chance de os partidos cumprirem as cotas de gênero no
            financiamento público de campanha.
          </Text>
          <Heading headingLevel={3} size="H5" className="w-full font-bold mb-3">
            Leia o capítulo completo do livro Gênero e Eleições:
          </Heading>
          <Text className="mb-3">
            Eduardo, Maria Cecília e Bruno Fernando da Silva. Mulheres nas Estruturas de Poder Partidário: a
            participação feminina nos partidos e a chance de adesão às cotas. Gênero e Eleições. (no prelo).
            2024.
          </Text>
          <div className="w-full mt-6">
            <Avatar
              type="left"
              src="/img/author/maria.png"
              title="Karolina Roeder"
              text="Doutora em Ciência Política pela Universidade Federal do Paraná. Pesquisadora de pós-doutorado no INCT Representação e Legitimidade Democrática (ReDem). Interessada nos temas participação política de mulheres, financiamento de campanha e gênero e teoria política feminista."
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
