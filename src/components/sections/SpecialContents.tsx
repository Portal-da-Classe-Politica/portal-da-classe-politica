import Image from 'next/image';

import { Heading, Text } from '@base';
import { CardPost } from '../CardPost';

export const SpecialContents = () => {
  return (
    <div className="mt-10 md:mt-[120px]">
      <div className="flex flex-col md:flex-row mb-[30px] gap-4">
        <Heading headingLevel={2} size={'H2'} className="font-bold ">
          Conteúdos especiais
        </Heading>
        <Text textType="a" size={'C1'} className="text-orange content-end ml-auto flex">
          Ver todos artigos
          <div className="ml-4">
            <Image src={'/icons/VoltarIcon.svg'} height={16} width={16} className="h-4 w-4" alt="" />
          </div>
        </Text>
      </div>
      <div className="flex flex-col flex-wrap gap-4 items-center md:flex-row md:justify-evenly md:gap-3">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="w-[280px] h-[370px]">
            <CardPost
              alt="Lorem ipsum dolor sit amet sectetur dolor sit"
              type="Tertiary"
              category={['Leitura de 3min', 'Categoria Aqui']}
              title={'Lorem ipsum dolor sit amet sectetur dolor sit'}
              subTitle={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis.'
              }
              src={'/img/Dados.svg'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
