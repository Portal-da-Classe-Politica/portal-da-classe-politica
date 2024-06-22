import Image from 'next/image';

const sourceMap = {
  Acessibilidade: '/icons/Acessibilidade.svg',
  Aprenda: '/icons/Aprenda.svg',
  Comunicacao: '/icons/Comunicacao.svg',
  Cruzdados: '/icons/Cruzdados.svg',
  Dados: '/icons/Dados.svg',
  Dados2: '/icons/Dados2.svg',
  Error: '/icons/Error.svg',
  Estrela: '/icons/Estrela.svg',
  Facebook: '/icons/Facebook.svg',
  Headset: '/icons/Headset.svg',
  Indicadores: '/icons/Indicadores.svg',
  LinkedIn: '/icons/LinkedIn.svg',
  Logo: '/icons/Logo.svg',
  Megafone: '/icons/Megafone.svg',
  Twitter: '/icons/Twitter.svg',
  VoltarIcon: '/icons/VoltarIcon.svg',
  YouTube: '/icons/YouTube.sv',
};

export type IconType = keyof typeof sourceMap;

export const Icon = ({ type, size = 12 }: { type: IconType; size?: number }) => {
  return (
    <div className="flex relative w-9 h-9 bg-orange rounded-[10px] items-center justify-center">
      <Image src={sourceMap[type]} height={size} width={size} alt="" />
    </div>
  );
};
