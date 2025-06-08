'use client';

import { Container, Heading, Icon, Text } from '@base';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Header } from '@components/sections/Header';
import LineChart from './components/LineChart';
import { GraphData } from '@services/consult/getGraph';
import { BoxImageText } from '@components/box/BoxImageText';
import Image from 'next/image';
import Filters from './components/Filters';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const cards = [
  { text: 'Perfil dos Candidatos', src: '/img/consulta/Head.svg', imgWidth: 130, imgHeight: 110 },
  { text: 'Resultados das Eleições', src: '/img/consulta/Chart.svg', imgWidth: 200, imgHeight: 110 },
  { text: 'Financiamento de Campanha', src: '/img/consulta/Circles.svg', imgWidth: 130, imgHeight: 110 },
];

const Page = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [params, setParams] = useState<string>('');

  const chartRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (chartRef.current) {
      chartRef.current.style.display = 'inline';
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = 'redem-grafico.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      chartRef.current.style.display = 'none';
    }
  };

  const extractCsv = (textCsv: string) => {
    const blob = new Blob([textCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'redem-grafico.csv';
    try {
      document.body.appendChild(link);
      link.click();
    } finally {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const getCsvFile = async () => {
    fetch(`/api/consult/graph-csv?${params}`)
      .then(res => res.json())
      .then(data => {
        const textCsv = data as string;
        extractCsv(textCsv);
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
            <div className="flex flex-col justify-between items-center md:flex-row">
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
          <Container className="my-12 pb-12">
            <div className="flex justify-center md:justify-normal flex-wrap gap-8">
              {cards.map((card, idx) => (
                <BoxImageText
                  key={idx}
                  text={card.text}
                  src={card.src}
                  imgClassName="pt-4"
                  imgWidth={card.imgWidth}
                  imgHeight={card.imgHeight}
                />
              ))}
            </div>
          </Container>
        </section>
      </div>

      <section className="bg-grayMix1 py-[40px]" id="consult-section">
        <Container>
          Parametros: {params}
          <Filters sendGraphData={data => setGraphData(data)} onParamsChange={str => setParams(str)} />
        </Container>
      </section>

      <section className="bg-grayMix1 pb-10" id="graph-section">
        <Container>
          <div className="rounded-lg p-[5px] h-[500px] bg-white shadow-lg border md:p-[30px] md:h-[700px]">
            {graphData ? (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="flex justify-end items-center w-full px-4 gap-4 py-4">
                  <button
                    className="flex items-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors"
                    onClick={handleExportImage}
                  >
                    <Icon type="Image" />
                    <Text>Exportar imagem</Text>
                  </button>
                  <button
                    className="flex items-center gap-2 text-orange border border-orange px-4 py-2 rounded-md hover:bg-orange hover:text-white transition-colors"
                    onClick={getCsvFile}
                  >
                    <Icon type="CSV" />
                    <Text>Exportar Dados</Text>
                  </button>
                </div>
                <LineChart graphData={graphData} />
                {/* Export refer */}
                <div ref={chartRef} className="w-[800px] h-[400px] fixed top-100 left-100 bg-white hidden">
                  <LineChart graphData={graphData} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 justify-center w-full h-full items-center">
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
