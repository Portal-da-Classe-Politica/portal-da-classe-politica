import { useState } from 'react';

import { Text, Heading, Button } from '@base';

const SelectBox = ({ title, subTitle, texto }: { title: string; subTitle: string; texto: string }) => {
  const [selecionado, setSelecionado] = useState(0);
  const abas = ['Como fazer os cruzamentos', 'Como fazer Download dos dados', 'Índices e Indicadores'];

  /* to-do
    refatorar o componente para selecionar
    ficar de olho no markdown
*/
  return (
    <div className="max-w-[1298px]">
      <div className="flex">
        {abas.map((conteudo, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelecionado(index);
              }}
              className={`${
                selecionado === index
                  ? 'bg-orange text-white text-[18px] font-bold rounded-t-[10px] py-4 px-8'
                  : 'text-orange text-[18px]  py-4 px-8'
              }`}
            >
              {conteudo}{' '}
            </div>
          );
        })}
      </div>
      <div className="flex py-10 px-7py-10 px-7 bg-orange">
        <div className="  text-white">
          <Heading headingLevel={2} className="font-bold pb-3">
            {title}
          </Heading>
          <Text className=" text-[18px font-bold pb-[20px]">{subTitle}</Text>
          <Text sizes={'B2'} className="mt-auto pb-[20px] ">
            {texto}
          </Text>
          <Button>
            <Text className="text-[14px] font-bold">Saiba mais</Text>
          </Button>
        </div>
        <div>
          <div className="h-[300px] w-[533px] bg-orangeLight1 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
