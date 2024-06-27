import React, { useState } from 'react';
import { Container, Text } from '../base';
import { ChartCard } from './ChartCard';
import { Heading } from '@base';

const dataSeries = {
  electoral: {
    name: 'Número Efetivo de Partidos Eleitoral',
    data: [4000, 3000, 5000, 7000, 6000, 9000, 8000],
  },
  parliamentary: {
    name: 'Número Efetivo de Partidos Parlamentar',
    data: [2000, 4000, 3000, 4000, 3000, 2000, 1000],
  },
};

export const ChartSection = ({ title, description, seriesDescription }: any) => {
  const [selectedSeries, setSelectedSeries] = useState({
    electoral: true,
    parliamentary: true,
  });

  const toggleSeries = series => {
    setSelectedSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  const series = Object.keys(selectedSeries)
    .filter(key => selectedSeries[key])
    .map(key => dataSeries[key]);

  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: ['2014', '2015', '2016', '2017', '2018'],
    },
  };

  return (
    <div>
      <div>
        <Heading headingLevel={2} size="H1" className="mb-4">
          {title}
        </Heading>
        <Text size="S1">{description}</Text>
      </div>

      <div className="flex mt-16">
        <div className="flex w-[30%] mr-4">
          <div className="flex flex-col space-y-2">
            <Text size="B1" className="font-bold">
              Adicione indicadores ao gráfico:
            </Text>
            <Text size="B1">{seriesDescription}</Text>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedSeries.electoral}
                onChange={() => toggleSeries('electoral')}
                className="form-checkbox"
              />
              <span className="ml-2">Número Efetivo de Partidos Eleitoral</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedSeries.parliamentary}
                onChange={() => toggleSeries('parliamentary')}
                className="form-checkbox"
              />
              <span className="ml-2">Número Efetivo de Partidos Parlamentar</span>
            </label>
          </div>
        </div>

        <ChartCard title="Lobortis celeris vulputate mollis" />
      </div>
    </div>
  );
};
