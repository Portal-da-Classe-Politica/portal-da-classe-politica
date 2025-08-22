'use client';

import { Container, Heading, Text } from '@base';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Header } from '@components/sections/Header';
import LineChart from '../../components/charts/LineChart';
import { GraphData } from '@services/consult/getGraph';
import Image from 'next/image';
import Filters from './components/Filters';
import { useState } from 'react';

const Page = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [textCsv, setTextCsv] = useState<string>();
  const [params, setParams] = useState<string>('');

  const getCsvFile = async () => {
    fetch(`/api/consult/graph-csv?${params}`)
      .then(res => res.json())
      .then(data => {
        const textCsv = data as string;
        setTextCsv(textCsv);
      });
  };

  return (
    <main className="font-montserrat">
      <div className="relative">
        <section className="bg-white pb-12 pt-4 ">
          <DesignSemiCircle theme="dark" />
          <Container>
            <Header style="dark" />
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col justify-between items-center md:flex-row mb-20">
              <div className="flex flex-2 flex-col">
                <Heading size="D1" className="text-orange">
                  Explorando Dados Eleitorais
                </Heading>
                <Heading size="D2">Cruzamento e Visualização</Heading>
              </div>
              <div className="flex flex-1 pt-4 md:p-[30px]">
                <Text size="S1">
                  Utilize filtros e variáveis para criar gráficos e mapas eleitorais personalizados
                </Text>
              </div>
            </div>
          </Container>
        </section>
      </div>

      <section className="bg-grayMix1 py-[40px]" id="consult-section">
        <Container>
          <Filters sendGraphData={data => setGraphData(data)} onParamsChange={str => setParams(str)} />
        </Container>
      </section>

      <section className="bg-grayMix1 pb-10" id="graph-section">
        <Container>
          <div className="rounded-lg bg-white shadow-lg border p-[5px] md:p-[30px] size-max w-full">
            {graphData ? (
              <LineChart graphData={graphData} onGetCsvFile={getCsvFile} textCsv={textCsv} />
            ) : (
              <div className="flex flex-col gap-5 justify-center w-full h-[400px] items-center">
                <Image
                  src={require('../../../public/img/GraphIcon.svg')}
                  alt="Ícone de gráfico"
                  width={100}
                  height={100}
                />
                <Text size="B1" textType="span" className="text-gray">
                  O gráfico será exibido aqui
                </Text>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Page;
