import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ApexChart from 'react-apexcharts';

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

export const Chart = () => {
  const [selectedSeries, setSelectedSeries] = useState({
    electoral: true,
    parliamentary: true,
  });

  const series = Object.keys(selectedSeries)
    .filter(key => selectedSeries[key])
    .map(key => dataSeries[key]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        tools: {
          zoom: false,
          download: false,
          pan: false,
        },
      },
    },
    xaxis: {
      categories: ['2014', '2015', '2016', '2017', '2018'],
    },
  };

  return <ApexChart options={options} series={series} type="line" height={600} />;
};
