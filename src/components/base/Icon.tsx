import Image from 'next/image';

const sourceMap = {
  Error: '/icons/Error.svg',
  Estrela: '/icons/Estrela.svg',
  Facebook: '/icons/Facebook.svg',
  Headset: '/icons/Headset.svg',
  LinkedIn: '/icons/LinkedIn.svg',
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
