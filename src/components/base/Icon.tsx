import Image from 'next/image';

const sourceMap = {
  ArrowRight: '/icons/ArrowRight.svg',
  ArrowDown: '/icons/ArrowDown.svg',
  Error: '/icons/Error.svg',
  Facebook: '/icons/Facebook.svg',
  Headset: '/icons/Headset.svg',
  LinkedIn: '/icons/LinkedIn.svg',
  Megafone: '/icons/Megafone.svg',
  Star: '/icons/Star.svg',
  Twitter: '/icons/Twitter.svg',
  YouTube: '/icons/YouTube.svg',
  Calendar: '/icons/Calendar.svg',
};

export type IconType = keyof typeof sourceMap;

export type PropsIcon = { type: IconType; size?: number; className?: string };

export const Icon = ({ type, size = 64, className = '' }: PropsIcon) => {
  return <Image src={sourceMap[type]} height={size} width={size} className={className} alt="" />;
};
