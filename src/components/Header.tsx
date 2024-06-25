import { cva } from 'cva';

import LogoIcon from './LogoIcon';
import { Button, Icon, Text } from './base';

const variants = cva('', {
  variants: {
    style: {
      light: 'text-white',
      dark: 'text-black',
    },
  },
  defaultVariants: {
    style: 'light',
  },
});

export const Header = ({ style }: { style?: 'light' | 'dark' }) => {
  const classes = variants({ style });
  return (
    <nav>
      <ul className="flex">
        <li>
          <LogoIcon type={style === 'light' ? 'white' : 'orange'} />
        </li>
        <li className={`ml-auto self-center mr-5 ${classes}`}>
          <Text textType="a" size={'L2'} className="font-bold">
            PÁGINA INICIAL
          </Text>
        </li>
        <li className={`flex self-center ${classes} mr-5 inline justify-center items-center`}>
          <Text textType="a" size={'L2'}>
            CONSULTAS
          </Text>
          <Icon type="ArrowDown" size={16} className="ml-1" />
        </li>
        <li className={`self-center ${classes} mr-5`}>
          <Text textType="a" size={'L2'}>
            PROJEÇÕES
          </Text>
        </li>
        <li className={`self-center ${classes} mr-5`}>
          <Text textType="a" size={'L2'}>
            PERFIL DOS CANDIDATOS
          </Text>
        </li>
        <li className={`self-center ${classes} mr-5`}>
          <Text textType="a" size={'L2'}>
            SOBRE O PROJETO
          </Text>
        </li>
        <li className={`self-center ${classes} mr-5`}>
          <Text textType="a" size={'L2'}>
            BLOG
          </Text>
        </li>
        <li className={`self-center ${classes}`}>
          <Button text="ELEIÇÕES 2024" style="fillBlack" />
        </li>
      </ul>
    </nav>
  );
};
