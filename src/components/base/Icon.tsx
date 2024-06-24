import Image from 'next/image';

const sourceMap = {
  ArrowRight: '/icons/ArrowRight.svg',
  Error: '/icons/Error.svg',
  Facebook: '/icons/Facebook.svg',
  Headset: '/icons/Headset.svg',
  LinkedIn: '/icons/LinkedIn.svg',
  Megafone: '/icons/Megafone.svg',
  Star: '/icons/Star.svg',
  Twitter: '/icons/Twitter.svg',
  YouTube: '/icons/YouTube.svg',
};

export type IconType = keyof typeof sourceMap;

export const Icon = ({ type, size = 64 }: { type: IconType; size?: number }) => {
  return <Image src={sourceMap[type]} height={size} width={size} alt="" />;
};
