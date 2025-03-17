import React from 'react';
import { cva } from 'cva';

import { Text, Heading } from '@base';
import { CandidateKpi } from '@services/candidates/getCandidateKpiById';

const variants = cva('font-montserrat', {
  variants: {
    background: {
      white: 'bg-white',
      orange: 'bg-orange',
    },
    header: {
      white: 'text-orange',
      orange: 'text-white',
    },
    content: {
      white: 'text-black',
      orange: 'text-white',
    },
  },
});

export const KpiBox = ({ variant = 'orange', kpi }: { variant?: 'white' | 'orange'; kpi: CandidateKpi }) => {
  const divClassName = variants({ background: variant });
  const headerClassName = variants({ header: variant });
  const contentClassName = variants({ content: variant });

  const buildHeader = () => {
    if (kpi.unity === 'text') {
      return kpi.name;
    }
    return kpi.unity === '%' ? `${kpi.value}${kpi.unity}` : `${kpi.unity} ${kpi.value}`;
  };

  const buildTitle = () => {
    return kpi.unity === 'text' ? String(kpi.value) : kpi.name;
  };

  return (
    <div className={`flex flex-col h-full p-5 rounded-[10px] ${divClassName}`}>
      <Heading headingLevel={2} className={`font-bold text-h1 md:text-h1 ${headerClassName}`}>
        {buildHeader()}
      </Heading>
      <Text size="B1" className={`font-bold pb-2 ${headerClassName}`}>
        {buildTitle()}
      </Text>
      <Text size="B2" className={`mt-auto ${contentClassName}`}>
        {kpi.description}
      </Text>
    </div>
  );
};
